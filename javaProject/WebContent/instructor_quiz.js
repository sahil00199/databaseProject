var helpers = 
{
    buildList: function(result, list)
    {
        // Remove current options
        list.html('');
        if(result != ''){
        	$.each(result, function(k, v) {
        		console.log(v);
        		if(v.isObjective){
        			var k1 = k+1;
        			var question = "<p>Q."+ k1.toString() + ")" + v.problem + "</p>";
        			question+= "<ol>" ;
        			answer = "<p>Answer: <br>";
        			var xhttp;
        			xhttp = new XMLHttpRequest();
        			xhttp.onreadystatechange = function() {
        			  if (this.readyState == 4 && this.status == 200) {
        				var response = JSON.parse(this.responseText);
        				if(response.status){
        					var i=1;
        					for(option in response.data){
        						question+= "<li>" + option.opt + "</li>";
        						
        						if(option.isCorrect){
        							answer += i.toString()+ "<br>";
        						}
        						i=i+1;
        					}
        					question +="</ol>";
        					answer+="</p>";
        					question+=answer;
        				}
        				else{
        					document.getElementById("error").innerHTML = response.message;
        					console.log(response.message);
        				}
        			    
        			  }
        			};
        			
        			xhttp.open("GET", "QuestionOption?qid=" + v.qid, true);
        			xhttp.send();
        			list.append(question);
                }
        		else{
        			var k1 = k+1;
        			var question = "<p>Q."+ k1.toString() + ")" + v.problem + "</p>";
        			
        			answer = "<p>Answer: <br>";
        			var xhttp;
        			xhttp = new XMLHttpRequest();
        			xhttp.onreadystatechange = function() {
        			  if (this.readyState == 4 && this.status == 200) {
        				var response = JSON.parse(this.responseText);
        				if(response.status){
        					var i=1;
        					for(option in response.data){
        						
        						if(option.isCorrect){
        							answer += option.opt + "<br>";
        						}
        					}
        					answer+="</p>";
        					question+=answer;
        				}
        				else{
        					document.getElementById("error").innerHTML = response.message;
        					console.log(response.message);
        				}
        			    
        			  }
        			};
        			
        			xhttp.open("GET", "QuestionOption?qid=" + v.qid, true);
        			xhttp.send();
        			list.append(question);
        		}
            });
        }
    }
}
$(document).ready(function() {
//	document.title = "Course:"
    document.getElementById("content").innerHTML =
            "<div id = \"contentList\"></div><br>";
    document.getElementById("heading").innerHTML =
        "Quiz";
    $.ajax({
        type: "GET",
        url: "InstructorQuizDetails",
        data: {"qzid": qzid},
        success: function(data){
//        	console.log(data);
        	var data1 = (jQuery.parseJSON(data));
        //	console.log(data1);
        	if(data1.status){
	            helpers.buildList(
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
});

