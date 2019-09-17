var x = document.getElementById('new-entry');
x.style.display = "none";

function newEntry()
{
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}


function handleForm(){
  newEntry();
  var arr = $('form').serializeArray();
  var data = JSON.stringify(arr);

  var c = document.getElementById('home');
  s='';
  s+='<div class="col-sm-4 panel panel-body">';
  s+='<h3>'+arr[0].value+'</h3>';
  s+='<h4>By '+arr[1].value+'</h4>';
  s+='<p>' + arr[2].value + '</p></div>';
  c.insertAdjacentHTML('afterbegin', s);

  $.ajax({
       type: "POST",
       contentType: "application/json",
       url: "/newpost",
       data: data
    }).done(function(){

    });
}


var temp;

function fetchposts()
{

    var user = $('form').serializeArray()[0]["value"];
    //so that if the user clicks twice, database is not accessed both times
    if (temp == user)
        return;
    temp = user;

    var c = document.getElementById('posts-output');
    c.innerHTML="";
    data = sendRequest(user,c);

}

function sendRequest(user,c){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {

        var obj = JSON.parse(this.responseText);
        t = obj.Item.title;
        co = obj.Item.content;
        renderHTML(c, t,co);
    }
  };

  xhttp.open("GET", "/retrieve?username="+user, true);
  xhttp.send();
}

function renderHTML(c, t, co){

    for (i=0;i<t.length;i++){
        s='';
        s+='<div class="col-sm-4 panel panel-body">';
        s+='<h3>'+t[i]+'</h3>';
        s+='<p>' + co[i] + '</p></div>';
        c.insertAdjacentHTML('beforeend', s);
    }
}
