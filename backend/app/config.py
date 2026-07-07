import os
from pathlib import Path

from dotenv import load_dotenv

BASE_DIR = Path(__file__).resolve().parent.parent.parent
TEMPLATE_DIR = BASE_DIR / "frontend" / "templates"
STATIC_DIR = BASE_DIR / "frontend" / "static"
DEFAULT_DATABASE_URI = f"sqlite:///{BASE_DIR / 'marketcompare.db'}"

load_dotenv(BASE_DIR / ".env")


def get_database_uri() -> str:
    return os.getenv("DATABASE_URL", DEFAULT_DATABASE_URI)
