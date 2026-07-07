import os
from pathlib import Path

from dotenv import load_dotenv

load_dotenv(Path(__file__).resolve().parent.parent / '.env')

DATABASE_URL = os.getenv('DATABASE_URL', '')

if not DATABASE_URL:
    raise SystemExit('Defina DATABASE_URL no arquivo .env antes de executar este script.')

print('DATABASE_URL configurada:', DATABASE_URL)
