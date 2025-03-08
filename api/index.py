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
                "name": event["EventName"],
                "country": event["Country"],
                "location": event["Location"],
                "race_date": str(event["EventDate"]),
            }
            
            events.append(event_data)
        return {"year": year, "events": events}
    except Exception as e:
        return {"error": str(e)}
    
@app.get("/api/py/race_podium/")
async def get_race_podium(year: int, round_number: int):
    try:
        podium = ergast.get_race_results(year, round_number, result_type='raw', limit=3)[0]["Results"]

        session = fastf1.get_session(year, round_number, 5)

        race_podium = []
        for driver in podium:
            if round_number != 0:
                podium_data = {
                    "position": int(driver["position"]),
                    "driver_code": driver["Driver"]["code"],
                    "given_name": driver["Driver"]["givenName"],
                    "family_name": driver["Driver"]["familyName"],
                    "team": driver["Constructor"]["name"],
                    "team_color": fastf1.plotting.get_team_color(driver["Constructor"]["name"], session)
                }
                race_podium.append(podium_data)
        return {"podium": race_podium}
    except Exception as e:
        return {"error": str(e)}