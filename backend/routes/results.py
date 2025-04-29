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

@router.get("/podium")
async def get_race_podium(year: int, round: int):
    try:
        podium = ergast.get_race_results(year, round, result_type='raw', limit=3)[0]["Results"]

        race_podium = []
        for driver in podium:
            if round != 0:
                podium_data = {
                    "id": str(uuid.uuid4()),
                    "position": int(driver["position"]),
                    "driver_code": driver["Driver"]["code"],
                    "team_color": get_team_color(year, round, driver["Constructor"]["name"]) if year > 2017 else "#b8b8b8"
                }
                race_podium.append(podium_data)
        return {"podium": race_podium}
    except Exception as e:
        raise HTTPException(status_code=404, detail=str(e))