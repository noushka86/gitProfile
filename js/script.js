window.onload = function(){

var urlRoot="https://api.github.com/users/"
// var urlRepo="https://api.github.com/users/"


function putIn(property, element, responseData, isImage){
	var r=responseData[property];
	if(isImage==1)
	{
		$(element)[0].src=r;
		$(element)[0].style.width='230px';
		$(element)[0].style.height='230px';
		$(element)[0].style.borderRadius="2%";
		$('#hr-img')[0].style.visibility='visible';
	}
	else{
		$(element)[0].innerHTML=r;
	}

}

function putInDate(property, element, responseData){
	var months=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov"
	,"Dec"];
	var d=new Date(responseData[property]);
	$(element)[0].innerHTML="joined on "+months[d.getUTCMonth()-1]+
	" "+d.getDate()+", "+d.getUTCFullYear();
}

function logData(responseData){
	console.log(responseData)
	putIn("avatar_url","#profile-pic",responseData,1);	
	putIn("name","#name",responseData);
	putIn("login","#login",responseData);
	putIn("location","#location",responseData);
	putIn("email","#email",responseData);
	putIn("blog","#blog",responseData);
	putInDate("created_at","#join-date",responseData);
}
//"2015-09-17T15:04:05Z"

function DateDiff(dateOfUpdate){
var Ctdate=new Date();
var UDate=new Date(dateOfUpdate);
	var elapsed=Ctdate-UDate;
	
	return "updated "+ Math.floor(elapsed/86400000)+" days ago";

}

function createRepoList(responseData){
	var ulElement=$('#repo-list')[0];
	// ulElement.innerHTML="";
	console.log(responseData)
	// console.log(ulElement)
	responseData.forEach(function(repo){
		var newListItem=document.createElement('li');
		var newATag=document.createElement('a');
		var newLine=document.createElement('hr');
		var newUpdated=document.createElement('p');
		newUpdated.innerHTML=DateDiff(repo.updated_at);
		newUpdated.style.fontSize="13px";
		newUpdated.style.color="#888888";
		newATag.innerHTML=repo.name;
		newATag.href=repo.clone_url;
		newATag.style.textDecoration="none";
		newATag.style.color="#4078c0";
		
		newListItem.appendChild(newATag);
		ulElement.appendChild(newListItem);
		newListItem.appendChild(newUpdated);
		ulElement.appendChild(newLine);

	})
	

}
function doAjax(query){
console.log(query);
var ajaxParamsProfile = {
			url: urlRoot+""+query,
			success: logData,
			
		}


$.ajax(ajaxParamsProfile)


var ajaxParamsRepo = {
		url: urlRoot+""+query+"/repos",
		success: createRepoList,
		
	}

$.ajax(ajaxParamsRepo)

}

function cleanPage(){
$('#search-bar')[0].value="";
$('#right-panel>*').html('');
$('#left-panel>*').html('');
$('#profile-pic').src="";

}

	function searchProfile(){
		var query=$('#search-bar')[0].value;
			cleanPage();
			location.hash=query;
	}
	window.onhashchange = function(){
		doAjax(location.hash.replace('#',""));
	}

	$('#search-button')[0].onclick=searchProfile;
	$('#search-bar')[0].onkeypress=function(event){
		if(event.keyCode===13)
			searchProfile();
	}


doAjax(location.hash  ?  location.hash.replace('#',"")  :  'noushka86')

}


// var x = function(argument) {
// 	this.f=function(){}
// 	var y = 5
// 	console.log(y)
// 	var init = function(argument) {
		
// 	}
// }
// new x
// x.init()




