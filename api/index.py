from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import fastf1
import fastf1.core
import fastf1.plotting
from fastf1.ergast import Ergast
import os
from dotenv import load_dotenv

from .utils.get_team_color import get_team_color

load_dotenv()

allowed_origins = os.getenv("FASTAPI_API_URL", "").split(",")

app = FastAPI(docs_url="/api/py/docs", openapi_url="/api/py/openapi.json")

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["GET"],  
    allow_headers=["*"],
)

ergast = Ergast()

if not os.path.exists('./api/__pycache__'):
    os.makedirs('./api/__pycache__')
fastf1.Cache.enable_cache('./api/__pycache__') 

@app.get("/api/py/schedule/{year}")
async def get_schedule(year: int):
    try:
        schedule = fastf1.get_event_schedule(year)

        events = []
        for _, event in schedule.iterrows():
            event_data = {
                "round": event["RoundNumber"],
                "name": event["OfficialEventName"],
                "country": event["Country"],
                "start_event_date": event["Session1DateUtc"].strftime("%Y-%m-%dT%H:%M:%SZ"),
                "end_event_date": event["EventDate"].strftime("%Y-%m-%dT%H:%M:%SZ"),
            }
            
            events.append(event_data)
        return {"year": year, "events": events}
    except Exception as e:
        return {"error": str(e)}
    
@app.get("/api/py/race-podium/")
async def get_race_podium(year: int, round: int):
    try:
        podium = ergast.get_race_results(year, round, result_type='raw', limit=3)[0]["Results"]

        race_podium = []
        for driver in podium:
            if round != 0:
                podium_data = {
                    "position": int(driver["position"]),
                    "driver_code": driver["Driver"]["code"],
                    "team_color": get_team_color(year, round, driver["Constructor"]["name"]) if year > 2017 else "#b8b8b8"
                }
                race_podium.append(podium_data)
        return {"podium": race_podium}
    except Exception as e:
        return {"error": str(e)}

@app.get("/api/py/driver-standings/{year}")
async def get_driver_standings(year: int):
    try:
        standings_data = ergast.get_driver_standings(year, result_type='raw')[0]

        round = standings_data["round"]

        driver_standings = standings_data["DriverStandings"]

        standings = []
        for driver in driver_standings:
            team_name = driver['Constructors'][-1]['name']

            driver_data = {
                "position": driver["positionText"],
                "points": driver["points"],
                "driver_name": f"{driver['Driver']['givenName']} {driver['Driver']['familyName']}",
                "team_name": team_name,
                "team_color": get_team_color(year, round, team_name) if year > 2017 else "#b8b8b8"
            }
            standings.append(driver_data)
        return {"driver_standings": standings}
    except Exception as e:
        return {"error": str(e)}
        
@app.get("/api/py/constructor-standings/{year}")
async def get_constructor_standings(year: int):
    try:
        standings_data = ergast.get_constructor_standings(year, result_type='raw')[0]

        constructor_standings = standings_data["ConstructorStandings"]

        standings = []
        for constructor in constructor_standings:
            construcor_name = constructor['Constructor']['name']

            constructor_data = {
                "position": constructor["positionText"],
                "points": constructor["points"],
                "construcor_name": construcor_name,
                "team_color": get_team_color(year, 1, construcor_name) if year > 2017 else "#b8b8b8"
            }
            standings.append(constructor_data)
        return {"constructor_standing": standings}
    except Exception as e:
        return {"error": str(e)}  