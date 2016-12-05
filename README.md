# J316-Organizer

This project is created to provide a confortable control panel for creating and managing of organizational plans. 

## Dependencies
The project consist of 3 modules: Frontend (j316-organizer-client), Backend (j316-organizer) and notifications Backend (j316-notificator). 

## Running locally
To run the project locally you need to run the backend on the same maschine as well or provide reverse proxy settings to 
connect to forward backend requests to it.

Run `ng serve --proxy-config proxy.conf.json` for a dev server. Navigate to `http://localhost:4200/`. 
The app will automatically reload if you change any of the source files. 

Application configuration is based on the environmental properties defined in the src/environment folder.


