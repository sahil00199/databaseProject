$(document).ready(function() {
    document.getElementById("content").innerHTML =
        " <a id=\"linker\" href=\"google.com\">Create Section</a><br><div id=\"newConvo\"></div>" +
//	    	"<form id=\"newSection\" onsubmit=\"createNewSection(this.course.value, this.year.value, this.semester.value)\">" +
//	        " Course ID: <input type=\"text\" id = \"course\" name=\"courseid\">"+
//	        " Year: <input type=\"text\" id = \"year\" name=\"year\">"+
//	        " Semester: <input type=\"text\" id = \"semester\" name=\"semester\">"+
//	        "<input class=\"button\" name=\"submit\" type=\"submit\" value=\"Submit\" />"+
//	        "</form>"+
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