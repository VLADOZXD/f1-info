from fastapi import FastAPI
import fastf1
import fastf1.core
import fastf1.plotting
from fastf1.ergast import Ergast
import os

app = FastAPI(docs_url="/api/py/docs", openapi_url="/api/py/openapi.json")

if not os.path.exists('./api/__pycache__'):
    os.makedirs('./api/__pycache__')
fastf1.Cache.enable_cache('./api/__pycache__') 

ergast = Ergast()

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
    
@app.get("/api/py/team-color/")
async def get_team_color(year: int, round_number: int, constructor_name: str):
    try:
        session = fastf1.get_session(year, round_number, 5)

        team_color = fastf1.plotting.get_team_color(constructor_name, session)
       
        return team_color
    except Exception as e:
        return {"error": str(e)}