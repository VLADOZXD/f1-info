from fastapi import APIRouter, HTTPException
import fastf1
from datetime import timedelta
import uuid

router = APIRouter(prefix="/api/py/schedule", tags=["Schedule"])

SESSION_ORDERS = {
    "conventional": [
        "Practice 1", "Practice 2", "Practice 3", "Qualifying", "Race"
    ],
    "sprint": [
        "Practice 1", "Qualifying", "Practice 2", "Sprint", "Race"
    ],
    "sprint_shootout": [
        "Practice 1", "Qualifying", "Sprint Shootout", "Sprint", "Race"
    ],
    "sprint_qualifying": [
        "Practice 1", "Sprint Qualifying", "Sprint", "Qualifying", "Race"
    ], 
    "testing": [
        "Practice 1", "Practice 2", "Practice 3"
    ],
}

SESSION_DURATIONS = {
    "Qualifying": timedelta(hours=1),
    "Race": timedelta(hours=2),
    "Sprint": timedelta(hours=1),
    "Sprint Qualifying": timedelta(hours=0.75),
    "Sprint Shootout": timedelta(hours=0.75),
}

@router.get("")
async def get_schedule(year: int):
    try:
        schedule = fastf1.get_event_schedule(year)

        events = []
        for _, event in schedule.iterrows():
            event_data = {
                "id": str(uuid.uuid4()),
                "round": event["RoundNumber"],
                "name": event["EventName"],
                "country": event["Country"],
                "official_name": event["OfficialEventName"],
                "start_event_date": event["Session1DateUtc"],
                "end_event_date": event["EventDate"] if event.is_testing() else event["Session5DateUtc"],
            }
            
            events.append(event_data)
        return {"year": year, "events": events}
    except Exception as e:
        raise HTTPException(status_code=404, detail=str(e))
    
@router.get("/event")
async def get_event_schedule(year: int, round: str):
    try:
        schedule = fastf1.get_event_schedule(year)
        event = schedule.get_event_by_name(round)
        event_format = event["EventFormat"]
        session_order = SESSION_ORDERS.get(event_format, None)

        sessions = []
        session_range = range(1, len(session_order) + 1)

        for i in session_range:
            name_key = f"Session{i}"
            date_key = f"{name_key}DateUtc"
            session_name = event[name_key]
            start = event[date_key]
            duration = SESSION_DURATIONS.get(session_name, timedelta(hours=1))
            end_time = start + duration
            sessions.append({
                "id": str(uuid.uuid4()),
                "name": session_name,
                "event_start": start,
                "event_end": end_time,
                })
         
        sessions.sort(key=lambda s: session_order.index(s["name"]))

        event_data = {
            "year": year,
            "country": event["Country"],
            "name": event["EventName"],
            "official_name": event["OfficialEventName"],
            "event_format": event_format,
            "sessions": sessions
        }

        return {"event": event_data}

    except Exception as e:
        raise HTTPException(status_code=404, detail=str(e))