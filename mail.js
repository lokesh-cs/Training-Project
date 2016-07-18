
var O=new Array();
//var c=[];
$(document).ready(function(){
	$(".composebox").hide();
	$("#restore").hide();
	$("#back").hide();
	clr="#D3D3D3";
	var last="#inbox";
	var current;
	var lastlen=0;
	inboxObj = [
	{"email":"abc@gmail.com","subject":"Hello","text":"Hello, This is abc. "},
	{"email":"xyz@gmail.com","subject":"MA","text":"Mail Application"},
	{"email":"klm@gmail.com","subject":"Ask Name","text":"Tell your name"},
	{"email":"klm@gmail.com","subject":"fhshghs","text":"abcdefghijklmnop"}
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
		//$("#restore").hide();
		var l=O.length;
		$("#back").hide();
		$(".composebox").hide();
		$("#all").show();
		$("#all1").show();
		$("#refresh").show();
		$("#delete").show();
		
		$('#all').prop('checked', false);
		$(last).css({'color':'black'});
		$(current).css({'color':'#cc0000'});
		$("#mailtable").remove();
		var tmp1='<div id="mailtable" style="background-color:#FFFFFF;">'
		tmp1=tmp1+'<div class="mbox"><table style="width:80%">'
		l=O.length;
		while(l>0){
			var tmp=O[l-1];
			//console.log("display"+(l-1));
			tmp1=tmp1+'<tr style="background-color:#D3D3D3;\"><td><input type="checkbox" class="chk" id="'+(l-1)+'">';
			tmp1=tmp1+('</td><th width=20%>'+tmp["email"]+'</th><td width=20%><strong>'+tmp["subject"]);
			tmp1=tmp1+('</strong></td><td width=60%>'+tmp["text"]+"</td>");
			l--;
		}
		tmp1=tmp1+('</table></div>');
		$("#mailtable1").append(tmp1);
	}
	
	$("#inbox").click(function(){
		$("#restore").hide();
		current="#inbox";
		//i={};
		/*$.ajax({
			type:'GET',
			url: 'http://localhost:8080/inbox',
			data : i,
			//contentType:"application/json",
			success: function(data){
				console.log(data);
			},
			error: function(err) {
				console.log(err);
			}
		});*/
		/*for(i=0;i<inboxObj.length;i++){
			c[i]="#D3D3D3";
		}*/
		O=inboxObj;
		display();
		last="#inbox";
	});

	$("#sent").click(function(){
		$("#restore").hide();
		current="#sent"
		O=sentobj;
		display();
		last="#sent";
	});
	$("#draft").click(function(){
		$("#restore").hide();
		current="#draft"
		O=draftobj;
		display();
		last="#draft";
	});
	$("#trash").click(function(){
		
		current="#trash"
		O=trashobj;
		display();
		last="#trash";
		$("#restore").show();
	});
	$("#compose").click(function(){
		$("#mid").val("Email Id");
		$("#subject").val("Subject");
		$("#txt").val("Content");
		$(".composebox").show();
		
	});
	
	$("#close").click(function(){
		if(($('#mid').val()!="" && $('#mid').val()!="Email Id")|| ($('#subject').val()!="" && $('#subject').val()!="Subject")|| ($('#txt').val()!="" && $('#txt').val()!="Content")) {
			if($('#mid').val()!="Email Id")
				mid=$('#mid').val();
			else
				mid="";
			if($('#subject').val()!="Subject")
				subject=$('#subject').val();
			else
				subject="";
			if($('#txt').val()!="Content")
				txt=$('#txt').val();
			else 
				txt="";
			createJSON(mid,subject,txt,draftobj);
		}
		$(".composebox").hide();
	});
	$("#send").click(function(){
		
		var mid=$('#mid').val();
		var subject=$('#subject').val();
		if($('#txt').val()!="Content")
			txt=$('#txt').val();
		else 
			txt="";
		if(mid!="" && mid!="Email Id"){
			var i;
			if(subject=="" || subject=="Subject"){
				i=confirm("send mail without subject");
				subject="";
			}
			if((subject!="" && subject!="Subject")|| i){
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
	$(document).on('dblclick','tr',function(){
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
		tmp=tmp+"<div style=\"margin-left:10px; margin-top:5px;\"><font size='4' ><b>"+$(this).find('td').eq(1).text()+"</b></font></div>";
		tmp=tmp+'<div style="margin-left:10px; margin-top:2px;max-width:70%;word-wrap:break-word;">'+$(this).find('td').eq(2).text()+'</div>';
		tmp=tmp+"</div>";
		$("#mailtable1").append(tmp);
		//O[ix]["color"]="#FFFFFF";
		//$("#titlemail").append("<div id=\"mailtable\">"+$(this).find('th').eq(0).text() +"<br />"+$(this).find('td').eq(0).text()+"<br />"+$(this).find('td').eq(1).text()+"<\div>");
	});
	$("#refresh").click(function(){
		$('#all').prop('checked', false);
		display();
		
	});
	$("#back").click(function(){
		display();
	});
	$( "#mid" ).focus(function() {
		if(this.value=='Email Id'){
			this.value='';
			this.style.color='black';
		}
		else
			this.style.color='black';
		
	});
	$( "#mid" ).blur(function() {
		if(this.value==''){
			this.value='Email Id';
			this.style.color='#D3D3D3';
		}
		else
			this.style.color='black';
	});
	$( "#txt" ).focus(function() {
		if(this.value=='Content'){
			this.value='';
			this.style.color='black';
		}
		else
			this.style.color='black';
		
	});
	$( "#subject" ).blur(function() {
		if(this.value==''){
			this.value='Subject';
			this.style.color='#D3D3D3';
		}
		else
			this.style.color='black';
	});
	$( "#subject" ).focus(function() {
		if(this.value=='Subject'){
			this.value='';
			this.style.color='black';
		}
		else
			this.style.color='black';
		
	});
	$( "#txt" ).blur(function() {
		if(this.value==''){
			this.value='Content';
			this.style.color='#D3D3D3';
		}
		else
			this.style.color='black';
	});
});

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
/*	function toggle1(){
		var l=O.length;
		var chkcnt=0;
		console.log("toggle1");
		for( i=l-1;i>=0;i--){
			if($('#' + i).is(":checked")){
				c[i]="#FFFF00";
				chkcnt++;
			}
			else
				c[i]="#D3D3D3";
		}
		display();
	}*/