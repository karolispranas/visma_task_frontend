# Visma java internshiptask

## Build instructions
- Install Visual studio code
- Have Live server add-on installed [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer))
- Clone this repository
- Navigate to the bottom right corner of the screen
- Press "go live" button

## Technology stack
- JavaScript 
I chose to write the front-end of this application using JavaScript, because I recently i had some experiance with this language.
Main front-end functionality can be found at the [script.js](https://github.com/karolispranas/visma_task_frontend/blob/main/src/scripts/script.js),
here all requests are sent to the API, as well as some layout functions.
Functionality for the search bars filtering of the meeting table can be found at [search.js](https://github.com/karolispranas/visma_task_frontend/blob/main/src/scripts/search.js) file. 
- HTML/CSS
code of the web page can be found in [index.html](https://github.com/karolispranas/visma_task_frontend/blob/main/src/pages/index.html)

## Functionality
User of this application can add a new meeting, invite other co-workers to the newly created meeting, cancel their invitation and delete the meeting
if he doesn't want to host it anymore. Since this application has no authentication functionality the user can't be changed and is always kept logged in
as Admin, however he may only cancel his own created meetings, and it's important to add that the person responsible for the meeting must attend the meeting
and cannot be removed from it.
