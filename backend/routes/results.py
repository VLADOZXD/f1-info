from fastapi import APIRouter, HTTPException
import fastf1
from fastf1.ergast import Ergast
import pandas as pd
import uuid

from ..utils.get_team_color import get_team_color

router = APIRouter(prefix="/api/py/results", tags=["Results"])

ergast = Ergast()

@router.get("")
def get_session_results(year: int, round: str, session_type: str):
    try:
        session_type = session_type.lower()
        session_type_map = {
            "qualifying": "Qualifying",
            "q": "Qualifying",
            "race": "Race",
            "r": "Race",
            "sprint": "Sprint",
            "s": "Sprint"
        }

        session_type = session_type_map.get(session_type, session_type)

        session = fastf1.get_session(year, round, session_type)

        session.load(
            laps=False,
            telemetry=False,
            weather=False,
            messages=False,
        )

        if session.results['Position'].isnull().any():
            return []

        if (session_type == "Qualifying"):
            results = session.results[['Position', 'DriverNumber', 'FullName', 'TeamName', 'Q1', 'Q2', "Q3"]].copy()
            results.loc[:, 'Position'] = results['Position'].fillna(0).astype(int)

            for col in ['Q1', 'Q2', 'Q3']:
                results[col] = results[col].astype(str).apply(
                    lambda x: 
                    f"{pd.to_timedelta(x).seconds//60}:{str(pd.to_timedelta(x).seconds % 60).zfill(2)}.{int(pd.to_timedelta(x).microseconds/1000):03}"
                    if pd.notnull(x) and isinstance(pd.to_timedelta(x), pd.Timedelta) else ''
                    )

            results.columns = ['position', 'driver_number', 'driver', 'team_name', 'q1', 'q2', 'q3']

            return results.to_dict(orient='records')
        
        elif (session_type == "Race" or session_type == "Sprint"):
            results = session.results[['Position', 'DriverNumber', 'FullName', 'TeamName', 'Points']]
            results.loc[:, 'Position'] = results['Position'].fillna(0).astype(int)

            results.columns = ['position', 'driver_number', 'driver', 'team_name', 'points']

            return results.to_dict(orient='records')
        
    except Exception as e:
        raise HTTPException(status_code=404, detail=str(e))

    
@router.get("/races-podium")
async def get_races_podium(year: int):
    try:
        podium_by_race = {}
    
        for position in [1, 2, 3]:
            response = ergast.get_race_results(year, results_position=position, result_type='raw')
            for race in response:
                rnd = int(race['round'])
                race_name = race['raceName']
                driver = race['Results'][0]

                podium_data = {
                    "id": str(uuid.uuid4()),
                    "position": int(driver["position"]),
                    "driver_code": driver["Driver"]["code"],
                    "team_color": get_team_color(year, rnd, driver["Constructor"]["name"]) if year > 2017 else "#b8b8b8"
                }

                if rnd not in podium_by_race:
                    podium_by_race[rnd] = {
                        "raceName": race_name,
                        "podium": []
                    }

                podium_by_race[rnd]["podium"].append(podium_data)

        podium_list = []
        for rnd in podium_by_race.keys():
            race_data = podium_by_race[rnd]
            podium_list.append(race_data)

        return podium_list
    except Exception as e:
        raise HTTPException(status_code=404, detail=str(e))
    