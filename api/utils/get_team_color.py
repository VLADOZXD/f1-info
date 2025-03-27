import fastf1
import fastf1.plotting

def get_team_color(year: int, round: int, constructor_name: str):
    try:
        session = fastf1.get_session(year, round, "R")

        team_color = fastf1.plotting.get_team_color(constructor_name, session, colormap="official")
       
        return team_color
    except Exception as e:
        return {"error": str(e)}