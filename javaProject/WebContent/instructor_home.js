
function buildList(result, list)
{
    // Remove current options
    list.html('');
    if(result != ''){
    	$.each(result, function(k, v) {
//        		console.log(v);
            list.append("<h3> <a href = \"InstructorSection?secid=" + v.secid + "\"> " +
            		v.courseid + " : " + v.coursename + ", " + v.semester +  ", " + v.year + 
            		"</a></h3>");
        });
    }
}

$(document).ready(function() {
    document.getElementById("content").innerHTML =
	    	"<h4>New Section:</h3>" +
	    	"<form id=\"newSection\" onsubmit=\"createNewSection(this.course.value, this.year.value, this.semester.value)\">" +
	        " Course ID: <input type=\"text\" id = \"course\" name=\"courseid\">"+
	        " Year: <input type=\"text\" id = \"year\" name=\"year\">"+
	        " Semester: <input type=\"text\" id = \"semester\" name=\"semester\">"+
	        "<input class=\"button\" name=\"submit\" type=\"submit\" value=\"Submit\" />"+
	        "</form>"+
            "<div id = \"contentList\"></div><br>";
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
            xhttp.open("GET", "AutoCompleteSection?partial="+request.term, true);
            xhttp.send();
        }
    });
    loadSections();
});

function loadSections(){
	$('#contentList').html('');
	$.ajax({
        type: "GET",
        url: "InstructorSections",
        success: function(data){
        	console.log(data);
        	var data1 = (jQuery.parseJSON(data));
        	console.log(data1);
        	if(data1.status){
	            buildList(
	                data1.data,
	                $('#contentList')
	            );
        	}
        	else{
        		window.location.replace("illegalAccess.html");
        		console.log(data1.message);
        	}
        }
    }); 
}
function createNewSection(courseid, year, semester)
{
	var xhttp;
    xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
         if (this.readyState == 4 && this.status == 200){
		    json_object = JSON.parse(this.responseText);
		    if(!(json_object.status)){
		        alert("Section not created due to some error");
		    }
		    else{
		        alert("Section created successfully!");
		    }
		    loadSections();
         }
    }
    xhttp.open("GET", "CreateSection?courseID="+courseid+"&year="+year+"&semester="+semester, true);
    xhttp.send();
}

