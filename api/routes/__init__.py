from fastapi import APIRouter
from .schedule import router as schedule_router
from .standings import router as standings_router
from .results import router as results_router

router = APIRouter()

router.include_router(schedule_router)
router.include_router(standings_router)
router.include_router(results_router)