$(document).ready(function(){
    $("#myModal").on('hide.bs.modal', function(){
        var Table = document.getElementById("Attendees");
	    Table.innerHTML = "";
    });

    $("#employeeModal").on('hide.bs.modal', function(){
        var Table = document.getElementById("Employees");
	    Table.innerHTML = "";
    });
  });

 
  

function newMeeting(){

    var http = new XMLHttpRequest();

    var name = document.getElementById("Name").value;
    var responsiblePerson = "Admin"
    var description = document.getElementById("Description").value;
    var category = document.getElementById("Category").value;
    var type = document.getElementById("Type").value;
    var startDate = document.getElementById("StartDate").value;
    var endDate = document.getElementById("EndDate").value;

    if(name==""){
        Swal.fire('Name must be provided');
    }else 
    if(description==""){
        Swal.fire('Description must be provided');
    }else
    if(category==""){
        Swal.fire('Category must be provided');
    }else
    if(type==""){
        Swal.fire('Type must be provided');
    }else
    if(startDate==""){
        Swal.fire('Start date must be provided');
    }else
    if(endDate==""){
        Swal.fire('End date must be provided');
    }else{

    const json = {"Name": name,"ResponsiblePerson": responsiblePerson,"Description": description,"Category": category,"Type": type,"StartDate": startDate,"EndDate": endDate}

    http.open("POST", "http://localhost:8080/meetings/add")
    http.onload = () => location.reload();
    http.setRequestHeader('Content-Type', 'application/json');
    http.send(JSON.stringify(json));
    }
}


function getMeetings(){
    var http = new XMLHttpRequest();
    http.open("GET", "http://localhost:8080/meetings/get")
    http.onload = () => displayMeetings(http);
    http.send();
}

function displayMeetings(http){
    const txt = http.responseText;
    const obj = JSON.parse(txt);
    for (let i = 0; i < obj.length; i++){
        $('#Meetings').append('<tr class="test" id="'+i+'"> <td id="name">'+ obj[i].name + '</td><td id="responsiblePerson'+i+'">' + obj[i].responsiblePerson + '</td><td id="description">' + obj[i].description + '</td><td id="category">' + obj[i].category + '</td><td id="type">' + obj[i].type + '</td><td id="startDate">' + obj[i].startDate + '</td><td id="endDate">' + obj[i].endDate + '</td><td id="membersAmound">' + obj[i].members.length + '</td><td> <Button data-toggle="modal" data-target="#myModal" onClick="sendDataToModal('+i+')">Attendees</Button> <Button onClick="deleteMeeting('+i+')">Delete</Button> <Button data-toggle="modal" data-target="#employeeModal" onClick="getAllRemainingEmployees('+i+')">Add employees</Button> </td></tr>' )
    }
}

function sendDataToModal(id){
    var name = document.getElementById("Meetings").rows[id+2].cells[0].innerHTML
    document.getElementById("attendeeModalTitle").innerHTML = name;
    getAllMeetingAttendees(id);
}

function deleteMeeting(id){
    var responsiblePerson = document.getElementById("Meetings").rows[id+2].cells[1].innerHTML
    console.log(responsiblePerson);
    var user = "Admin"
    if(responsiblePerson==user){
        var http = new XMLHttpRequest();
        const json = {"Id": id,"User": user}
        http.open("POST", "http://localhost:8080/meetings/delete")
        http.onload = () => location.reload();
        http.setRequestHeader('Content-Type', 'application/json');
        http.send(JSON.stringify(json));
    }else{
        Swal.fire('You don\'t have permission to delete this meeting');
    }

}

function getAllRemainingEmployees(id){
    var http = new XMLHttpRequest();
    const json = {"Id": id}
    http.open("POST", "http://localhost:8080/meetings/remaining")
    http.onload = () => displayRemainingEmployees(http, id);
    http.setRequestHeader('Content-Type', 'application/json');
    http.send(JSON.stringify(json));
}

function getAllMeetingAttendees(id){
    var http = new XMLHttpRequest();

    const json = {"Id": id}

    http.open("POST", "http://localhost:8080/meetings/attendees")
    http.onload = () => displayAtendees(http, id);
    http.setRequestHeader('Content-Type', 'application/json');
    http.send(JSON.stringify(json));
}

function displayAtendees(http, id){
    const txt = http.responseText;
    const obj = JSON.parse(txt);
    for (let i = 0; i < obj.length; i++){
        $('#Attendees').append('<tr class="test" id="'+i+'"> <td id="name">'+ obj[i] + '</td><td> <Button onClick="removeEmployee('+id+',\''+obj[i]+'\')">Delete</Button></td></tr>' )
    }
}

function displayRemainingEmployees(http, id){
    var name = document.getElementById("Meetings").rows[id+2].cells[0].innerHTML
    document.getElementById("employeeModalTitle").innerHTML = name;
    const txt = http.responseText;
    const obj = JSON.parse(txt);
    for (let i = 0; i < obj.length; i++){
        $('#Employees').append('<tr class="test" id="'+i+'"> <td id="name">'+ obj[i] + '</td><td> <Button onClick="addEmployee('+id+', \''+obj[i]+'\' )">Invite</Button></td></tr>' )
    }
}

function addEmployee(id, name){
    var http = new XMLHttpRequest();
    const json = {"Id": id, "Name": name}
    http.open("POST", "http://localhost:8080/meetings/addEmployee")
    http.onload = () => location.reload();
    http.setRequestHeader('Content-Type', 'application/json');
    http.send(JSON.stringify(json));
}

function removeEmployee(id, name){
    var responsiblePerson = document.getElementById("Meetings").rows[id+2].cells[1].innerHTML
    if(responsiblePerson==name){
        Swal.fire('Cannot delete this attendee, he is responsible for this meeting');
    }else{
        var http = new XMLHttpRequest();
        const json = {"Id": id, "Name": name, "ResponsiblePerson": responsiblePerson}
        http.open("POST", "http://localhost:8080/meetings/deleteEmployee")
        http.onload = () => location.reload();
        http.setRequestHeader('Content-Type', 'application/json');
        http.send(JSON.stringify(json));
    }
    
}



