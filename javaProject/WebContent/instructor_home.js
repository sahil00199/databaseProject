/**
 * Sample javascript file. Read the contents and understand them,
 * then modify this file for your use case.
 */

var myTable;
$(document).ready(function() {
    /*myTable = $("#usersTable").DataTable({
        columns: [{data:"courseid"}, {data:"last_timestamp"}, {data:"num_msgs"}]
    });
   
    */
    document.getElementById("content").innerHTML = "Search Conversations:  <input id=\"showConv\" type=\"text\"/>" +
            "<table id = \"contentTable\" class = \"display\">" +
            "<thead><tr>" +
            "<th>Course ID</th>" +
            "<th>Year</th>" +
            "<th>Semester</th>" +
            "</tr></thead></table>"+
            " <a id=\"linker\" href=\"google.com\">CreateConversation</a>" +
            "<div id=\"newConvo\"></div><br><br>" +
            "</body>" +
            "</html>";
    contentTable = $("#contentTable").DataTable({searching: false,
        columns: [{data:"courseid"}, {data:"year"}, {data:"semester"}]
    });
    contentTable.ajax.url("AllSections").load();
    $("#linker").click(function(e)
    {
        e.preventDefault();
        showCreateSection();
    }  );
    $('#contentTable tbody').on( 'click', 'tr', function () {
        if ( $(this).hasClass('selected') ) {
            $(this).removeClass('selected');
        }
        else {
            contentTable.$('tr.selected').removeClass('selected');
            $(this).addClass('selected');
        }
       
        modifyTable(contentTable.row(this).data()["courseid"]);
        //$('#trial').html(contentTable.row(this).data()["courseid"]);
    } );
   
    $("#showConv").autocomplete({
        source : function(request,response){
            var xhttp;
            xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function(){
                 if (this.readyState == 4 && this.status == 200){
                     json= JSON.parse(this.responseText);
                     response(json.data);
                 }
                 }
            xhttp.open("GET", "AutoCompleteUser?partial="+request.term+"&location=top", true);
              xhttp.send();}
    });
    $("#showConv").autocomplete({
        select: function(event,ui){
            if(event.type=="autocompleteselect")
                {
                    modifyTable(ui.item.label);
                }
           
        }
    });
   
   
   
    //load div contents asynchronously, with a call back function
    //alert("Page loaded. Click to load div contents.");
    //$("#content").load("content.html", function(response){   
    //callback function
        //alert("Div loaded. Size of content: " + response.length + " characters.");
    //});
    $
});

function resetTable()
{
	document.getElementById("content").innerHTML = "Search Conversations:  <input id=\"showConv\" type=\"text\"/>" + "<table id = \"contentTable\" class = \"display\">" +
    "<thead><tr>" +
    "<th>Course ID</th>" +
    "<th>Year</th>" +
    "<th>Semester</th>" +
    "</tr></thead></table>  <br>"+
    " <a id=\"linker\" href=\"google.com\">CreateConversation</a>" +
    "<div id=\"newConvo\"></div><br><br>" +
    "</body>" +
    "</html>";
    document.getElementById("newConvo").innerHTML = "";
    contentTable = $("#contentTable").DataTable({searching:false,
    columns: [{data:"courseid"}, {data:"year"}, {data:"semester"}]
    });
    contentTable.ajax.url("AllSections").load();
      $("#newconversation").on('submit', function ()
                {
                    createNewConversation($("#conversation").val());
                    return false;
                });
    $('#contentTable tbody').on( 'click', 'tr', function () {
        if ( $(this).hasClass('selected') ) {
            $(this).removeClass('selected');
        }
        else {
            contentTable.$('tr.selected').removeClass('selected');
            $(this).addClass('selected');
        }
       
        modifyTable(contentTable.row(this).data()["courseid"]);
        //$('#trial').html(contentTable.row(this).data()["courseid"]);
    } );
    $('#contentTable_filter label input').autocomplete({
        source : function(request,response){
            var xhttp;
            xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function(){
                 if (this.readyState == 4 && this.status == 200){
                     json= JSON.parse(this.responseText);
                     response(json.data);
                 }
                 }
            xhttp.open("GET", "AutoCompleteUser?partial="+request.term+"&location=top", true);
              xhttp.send();}
    });
    $("#showConv").autocomplete({
        source : function(request,response){
            var xhttp;
            xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function(){
                 if (this.readyState == 4 && this.status == 200){
                     json= JSON.parse(this.responseText);
                     response(json.data);
                 }
                 }
            xhttp.open("GET", "AutoCompleteUser?partial="+request.term+"&location=top", true);
              xhttp.send();}
    });
    $("#showConv").autocomplete({
        select: function(event,ui){
            if(event.type=="autocompleteselect")
                {
                    modifyTable(ui.item.label);
                }
           
        }
    });
   
       $("#linker").click(function(e)
                {
                    e.preventDefault();
                    showCreateSection();
                }  );
}

function modifyTable(courseid)
{
	var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function()
    {
        if (this.readyState == 4 && this.status == 200)
        {
            var currentData = JSON.parse(this.responseText).data;
            var currentStr = "<table class = \"display\"> <tr> <th> Course ID </th>" +
             "<th> Year </th> <th> Semester </th> </tr>";
             for (var i = 0 ; i < currentData.length ; i ++)
                 {
                     currentStr += "<tr>";
                     currentStr += "<td>" + currentData[i].courseid + " </td>";
                     currentStr += "<td>" + currentData[i].year + " </td>";
                     currentStr += "<td>" + currentData[i].semester + " </td>";
                     currentStr += "</tr>";
                     //document.getElementById("txtHint").innerHTML += currentStr;
                 }
            currentStr += "</table>";
            currentStr += "<form id=newmessage>";
            currentStr += " Enter your message: <input type=\"text\" id = \"message\">";
            currentStr += "<input type=\"hidden\" name=\"courseid\" value=\""+courseid+"\" />";
            currentStr += "<input type=\"submit\"";
            currentStr += "<input class=\"button\" name=\"submit\" type=\"submit\" " ;
            currentStr += "value=\"Submit\" />";
            currentStr += "</form>"+ "<br>"+
            " <a id=\"linker\" href=\"google.com\">CreateConversation</a>" +
            "<div id=\"newConvo\"></div><br><br>" +
            "</body>" +
            "</html>" ;

             document.getElementById("content").innerHTML = currentStr;
                 $("#newmessage").on('submit', function ()
                {
                    createNewMessage(courseid,$("#message").val());
                    return false;
                });
                 $("#linker").click(function(e)
                            {
                                e.preventDefault();
                                showCreateSection();
                            }  );

        }
    };
      
    xhttp.open("GET", "ConversationDetail?other_id=" + courseid, true);
    xhttp.send();
}

function autohelper(request,response)
{
    var xhttp;
    xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
         if (this.readyState == 4 && this.status == 200){
             json= JSON.parse(this.responseText);
             response(json.data);
         }
         }
    xhttp.open("GET", "AutoCompleteUser?partial="+request.term, true);
      xhttp.send();
    
}

function showCreateSection()
{
    var currentHTML =     "<form id=\"newconversation\" onsubmit=\"createNewConversation(this.course.value, this.year.value, this.semester.value)\">" +
    " Enter the courseid: <input type=\"text\" id = \"course\" name=\"courseid\">"+
    " Enter the year: <input type=\"text\" id = \"year\" name=\"year\">"+
    " Enter the semester: <input type=\"text\" id = \"semester\" name=\"semester\">"+
    //"<input type=\"submit\""
    "<input class=\"button\" name=\"submit\" type=\"submit\" " +
    "value=\"Submit\" />"+
    "</form>";
    document.getElementById("newConvo").innerHTML = currentHTML;
    $("#course").autocomplete({
        source : function(request,response){
            var xhttp;
            xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function(){
                 if (this.readyState == 4 && this.status == 200){
                     json= JSON.parse(this.responseText);
                     response(json.data);
                 }
                 }
            xhttp.open("GET", "AutoCompleteSection?partial="+request.term+"&location=bottom", true);
              xhttp.send();}
    });
}


function createNewConversation(courseid, year, semester)
{
	var xhttp;
    xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
         if (this.readyState == 4 && this.status == 200){
    json_object = JSON.parse(this.responseText);
    if(!(json_object.status))
        {
        alert("Conversation not created due to some error");
        }else
        {
            alert("New conversation created successfully!");
        }
         }
         resetTable();
    }
    xhttp.open("GET", "CreateSection?courseID="+courseid+"&year="+year+"&semester="+semester, true);
      xhttp.send();
}


function createNewMessage(courseid,message)
{
	var xhttp;
    xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
         if (this.readyState == 4 && this.status == 200){
    json_object = JSON.parse(this.responseText);
    if(!(json_object.status))
        {
        	alert("Unable to create new course at this moment. Please try again later");
        }
         }
         modifyTable(courseid);
    }
    xhttp.open("GET", "NewMessage?other_id="+courseid+"&msg="+message, true);
      xhttp.send();
     
     
     

}
