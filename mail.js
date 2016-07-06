var O=new Array();
$(document).ready(function(){
	$(".composebox").hide();
	$("#restore").hide();
	$("#back").hide();
	var last="#inbox";
	var current;
	var lastlen=0;
	inboxObj = [
	{"email":"abc@gmail.com","subject":"Hello","text":"Hello, This is abc. ","color":"#F0FFFF"},
	{"email":"xyz@gmail.com","subject":"MA","text":"Mail Application","color":"#F0FFFF"},
	{"email":"klm@gmail.com","subject":"Ask Name","text":"Tell your name","color":"#F0FFFF"},
	{"email":"klm@gmail.com","subject":"fhshghs","text":"abcdefghijklmnop","color":"#F0FFFF"}
	];
	sentobj=new Array();
	draftobj=new Array();
	trashobj=new Array();
	//var O=new Array();
	var createJSON=function(emailid,subject,txt,obj) {
		tmp={};
		tmp["email"]=emailid;
		tmp["subject"]=subject;
		tmp["text"]=txt;
		tmp["color"]="#F0FFFF";
        
		console.log(tmp["text"]);
        obj.push(tmp);
    }
	var display=function(){
		$("#restore").hide();
		var l=O.length;
		$("#back").hide();
		$(".composebox").hide();
		$("#all").show();
		$("#all1").show();
		$("#refresh").show();
		$("#delete").show();
		
		$('#all').prop('checked', false);
		$(last).css({'background-color':'#cc0000'});
		$(current).css({'background-color':'#FFD800'});
		$("#mailtable").remove();
		var tmp1='<div id="mailtable" style="background-color:#FFFFFF;"><div class="chkbox">'
		while(l>0){
			 tmp1=tmp1+'<input type="checkbox" class="chk" id="'+(l-1)+'">'
			 l--;
		}
		tmp1=tmp1+'</div><div class="mbox"><table >'
		l=O.length;
		while(l>0){
			var tmp=O[l-1];
			tmp1=tmp1+('<tr style="background-color:'+tmp["color"]+';\"><th>'+tmp["email"]+'</th><td><strong>'+tmp["subject"])
			tmp1=tmp1+('</strong></td><td>'+tmp["text"]);
			l--;
		}
		tmp1=tmp1+('</table></div></div>');
		$("#titlemail").append(tmp1);
	}
	
	$("#inbox").click(function(){
		current="#inbox"
		O=inboxObj;
		display(O);
		last="#inbox";
	});

	$("#sent").click(function(){
		current="#sent"
		O=sentobj;
		display(O);
		last="#sent";
	});
	$("#draft").click(function(){
		current="#draft"
		O=draftobj;
		display(O);
		last="#draft";
	});
	$("#trash").click(function(){
		
		current="#trash"
		O=trashobj;
		display(O);
		last="#trash";
		$("#restore").show();
	});
	$("#compose").click(function(){
		$("#mid").val("");
		$("#subject").val("");
		$("#txt").val("");
		$(".composebox").show();
		
	});
	
	$("#close").click(function(){
		if($('#mid').val()!="" || $('#subject').val()!="" || $('#txt').val()!=""){
			var mid=$('#mid').val();
			var subject=$('#subject').val();
			var txt=$('#txt').val();
			createJSON(mid,subject,txt,draftobj);
		}
		$(".composebox").hide();
	});
	$("#send").click(function(){
		
		var mid=$('#mid').val();
		var subject=$('#subject').val();
		var txt=$('#txt').val();
		if(mid!=""){
			var i;
			if(subject==""){
				i=confirm("send mail without subject");
			}
			if(subject!="" || i){
				createJSON(mid,subject,txt,sentobj);
				$(".composebox").hide();
			}
		}
		else
			confirm("Please enter email-id");
		
	});
	$("#delete").click(function(){
		$('#all').prop('checked', false);
		var l=O.length;
		for( i=l-1;i>=0;i--){
			if($('#' + i).is(":checked")){
				if(last!="#trash"){
					var tmp=O[i];
					tmp["from"]=O;
					trashobj.push(O[i]);
				}
				O.splice(i,1);
			}
		}
		display();
	});
	$("#restore").click(function(){
		$('#all').prop('checked', false);
		var l=O.length;
		for( i=l-1;i>=0;i--){
			if($('#' + i).is(":checked")){
				
				var tmp=O[i];
				var tmp1={};
				tmp1["email"]=tmp["email"];
				tmp1["subject"]=tmp["subject"];
				tmp1["text"]=tmp["text"];
				tmp["from"].push(tmp1);
				
				O.splice(i,1);
			}
		}
		display();
	});
	$(document).on('click','tr',function(){
		$("#back").show();
		$('#all').prop('checked', false);
		$(".composebox").hide();
		$("#mailtable").remove();
		$("#all").hide();
		$("#all1").hide();
		$("#delete").hide();
		$("#refresh").hide();
		var tmp="<div id=\"mailtable\" style=\"background-color:#FFFFFF;\">"
		tmp=tmp+"<div style=\"margin-left:10px; margin-top:5px;\"><font color='#800080' size='4' ><b>"+$(this).find('th').eq(0).text()+"</b></font></div>";
		tmp=tmp+"<div style=\"margin-left:10px; margin-top:5px;\"><font size='4' ><b>"+$(this).find('td').eq(0).text()+"</b></font></div>";
		tmp=tmp+'<div style="margin-left:10px; margin-top:2px;">'+$(this).find('td').eq(1).text()+'</div>';
		tmp=tmp+"</div>";
		$("#titlemail").append(tmp);
		//O[ix]["color"]="#FFFFFF";
		//$("#titlemail").append("<div id=\"mailtable\">"+$(this).find('th').eq(0).text() +"<br />"+$(this).find('td').eq(0).text()+"<br />"+$(this).find('td').eq(1).text()+"<\div>");
	});
	$("#refresh").click(function(){
		$('#all').prop('checked', false);
		display(O);
		
	});
	$("#back").click(function(){
		display(O);
	});
});
	function open1(ix){
		$("#back").show();
		$('#all').prop('checked', false);
		$(".composebox").hide();
		$("#mailtable").remove();
		$("#all").hide();
		$("#all1").hide();
		$("#delete").hide();
		$("#refresh").hide();
		var tmp="<div id=\"mailtable\" style=\"background-color:#FFFFFF;\">"
		tmp=tmp+"<div style=\"margin-left:10px; margin-top:5px;\"><font color='#800080' size='4' ><b>"+O[ix]["email"]+"</b></font></div>";
		tmp=tmp+"<div style=\"margin-left:10px; margin-top:5px;\"><font size='4' ><b>"+O[ix]["subject"]+"</b></font></div>";
		tmp=tmp+'<div style="margin-left:10px; margin-top:2px;">'+O[ix]["text"]+'</div>';
		tmp=tmp+"</div>";
		$("#titlemail").append(tmp);
		O[ix]["color"]="#FFFFFF";
	}
	function toggle(){
		l=O.length;
		for(i=0;i<l;i++){
			if($('#all').is(":checked")){
				$('.chk').prop('checked', true);
			}
			else{
				$('.chk').prop('checked', false);
			}	
		}
	}