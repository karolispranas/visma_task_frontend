# Visma java internshiptask

## Build instructions
- Install Visual studio code
- have Live server add-on installed
- Clone this repository
- Navigate to the bottom right corner of the screen
- Press "go live" button

## My choises for building this web application
I chose to write the fron-end of this application using JavaScript, because I recently did a project for a university using similar setup.
All the main functionality of the front-end can be found in the scripts/script.js file, here all requests are sent to the API, as well as some layout
functions. the functionality of search bars to filter the meeting table can be found in sripts/search.js file and the HTML code of the web page can
be found in pages/index.html

## Functionality
The user of this application an add a new meeting, invite other coworkers to the newly created meeting, cancel their invitation and delete the meeting
if he doesn't want to host it anymore. Since this application has no authentication functionality the user can't be changed and is always kept logged in
as admin, however he may only cancel his own created meetings, and it's important to add that the person responsible for the meeting must attend the meeting
and cannot be removed from it.
