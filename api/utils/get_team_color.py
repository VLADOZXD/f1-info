import fastf1

def get_team_color(year: int, round: int, constructor_name: str):
    try:
        session = fastf1.get_session(year, round, 5)

        team_color = fastf1.plotting.get_team_color(constructor_name, session)
       
        return team_color
    except Exception as e:
        return {"error": str(e)}