from fastapi import APIRouter, HTTPException
from fastf1.ergast import Ergast
import uuid

from ..utils.get_team_color import get_team_color

router = APIRouter(prefix="/api/py/standings", tags=["Standings"])

ergast = Ergast()

@router.get("/driver/{year}")
async def get_driver_standings(year: int):
    try:
        standings_data = ergast.get_driver_standings(year, result_type='raw')[0]

        round = standings_data["round"]

        driver_standings = standings_data["DriverStandings"]

        standings = []
        for driver in driver_standings:
            team_name = driver['Constructors'][-1]['name']

            driver_data = {
                "id": str(uuid.uuid4()),
                "position": driver["positionText"],
                "points": driver["points"],
                "driver_name": f"{driver['Driver']['givenName']} {driver['Driver']['familyName']}",
                "team_name": team_name,
                "team_color": get_team_color(year, round, team_name) if year > 2017 else "#b8b8b8"
            }
            standings.append(driver_data)
        return standings
    except Exception as e:
        raise HTTPException(status_code=404, detail=str(e))
        
@router.get("/constructor/{year}")
async def get_constructor_standings(year: int):
    try:
        standings_data = ergast.get_constructor_standings(year, result_type='raw')[0]

        constructor_standings = standings_data["ConstructorStandings"]

        standings = []
        for constructor in constructor_standings:
            construcor_name = constructor['Constructor']['name']

            constructor_data = {
                "id": str(uuid.uuid4()),
                "position": constructor["positionText"],
                "points": constructor["points"],
                "constructor_name": construcor_name,
                "team_color": get_team_color(year, 1, construcor_name) if year > 2017 else "#b8b8b8"
            }
            standings.append(constructor_data)
        return standings
    except Exception as e:
        raise HTTPException(status_code=404, detail=str(e)) 