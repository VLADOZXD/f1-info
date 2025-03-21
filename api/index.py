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