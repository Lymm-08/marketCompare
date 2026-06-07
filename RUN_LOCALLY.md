LOCAL RUN INSTRUCTIONS (PRIVATE)

This file contains local-only instructions and credentials examples. It is ignored by Git.

1) Create local `.env` for backend

 - Copy the example and fill your local MySQL credentials:

   backend\.env (create this file):

   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_db_password_here
   DB_NAME=contacerta_db
   PORT=3001

2) Start MySQL (Windows example)

 - Open PowerShell as Administrator and run:

   net start MySQL80

 - If your service has a different name, replace `MySQL80` accordingly.

3) Initialize database (creates schema + seed)

 - In a PowerShell terminal:

   cd C:\Users\emily\Documents\TCC-comparador-de-precos\backend
   npm install
   npm run init-db

4) Run backend + frontend together (single link)

 - From the repo root run:

   cd C:\Users\emily\Documents\TCC-comparador-de-precos
   npm install
   npm run start-all

 - This will start the Express backend (serving the frontend static files) on `http://localhost:3001`.

5) Troubleshooting

 - If `npm run init-db` fails with connection errors, ensure MySQL is running and `.env` has correct creds.
 - If port 3001 is in use, edit `package.json` scripts to use another PORT or stop the process using that port.

6) Fallback (no local MySQL)

 - If you cannot run MySQL, you can still test the frontend using the JSON mirror file:
   `backend/data/products.json`. To use it, the backend must be running and the model will read/write this file for local testing.
