from fastapi import APIRouter
from fastf1.ergast import Ergast
import uuid

from ..utils.get_team_color import get_team_color

router = APIRouter(prefix="/api/py/results", tags=["Results"])

ergast = Ergast()

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
        return {"error": str(e)}