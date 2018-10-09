var helpers = 
{
    buildList: function(result, list)
    {
        // Remove current options
        list.html('');
        if(result != ''){
        	$.each(result, function(k, v) {
//        		console.log(v);
                list.append("<h3> <a href = \"StudentSection?secid=" + v.secid + "\"> " +
                		v.courseid + " : " + v.coursename + ", " + v.semester +  ", " + v.year + 
                		"</a></h3>");
            });
        }
    }
}
$(document).ready(function() {
    document.getElementById("content").innerHTML =
            "<div id = \"contentList\"></div><br>";

    $.ajax({
        type: "GET",
        url: "StudentSections",
        success: function(data){
        	console.log(data);
        	var data1 = (jQuery.parseJSON(data));
        	console.log(data1);
        	if(data1.status){
	            helpers.buildList(
	                data1.data,
	                $('#contentList')
	            );
        	}
        	else{
        		alert(data1.message);
        		window.location.replace("logout");
        	}
        }
    });   
});
