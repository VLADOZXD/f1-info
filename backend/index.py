from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import fastf1
import os
from dotenv import load_dotenv

from .routes import router as api_router

load_dotenv()

allowed_origins = os.getenv("URL", "").split(",")

app = FastAPI(docs_url="/api/py/docs", openapi_url="/api/py/openapi.json")

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["GET"],  
    allow_headers=["*"],
)

if not os.path.exists('./backend/__pycache__'):
    os.makedirs('./backend/__pycache__')
fastf1.Cache.enable_cache('./backend/__pycache__') 

fastf1.set_log_level('WARNING')

app.include_router(api_router)