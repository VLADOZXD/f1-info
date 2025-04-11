from fastapi import APIRouter
import fastf1
import fastf1.utils
import uuid

router = APIRouter(prefix="/api/py/schedule", tags=["Schedule"])

@router.get("/{year}")
async def get_schedule(year: int):
    try:
        schedule = fastf1.get_event_schedule(year)

        events = []
        for _, event in schedule.iterrows():
            event_data = {
                "id": str(uuid.uuid4()),
                "round": event["RoundNumber"],
                "name": event["OfficialEventName"],
                "country": event["Country"],
                "start_event_date": fastf1.utils.to_datetime(event["Session1DateUtc"]),
                "end_event_date": fastf1.utils.to_datetime(event["EventDate"]),
            }
            
            events.append(event_data)
        return {"year": year, "events": events}
    except Exception as e:
        return {"error": str(e)}