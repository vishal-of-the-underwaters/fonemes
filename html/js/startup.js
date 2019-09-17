var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
if (this.readyState == 4 && this.status == 200) {

    var obj = JSON.parse(this.responseText);

    render(obj);
}
};

xhttp.open("GET", "/startup", true);
xhttp.send();


function render(data){

    var c = document.getElementById('home');
    c.innerHTML="";
    for(j=0;j<data.length;j++){
        if (j>20) break;
        console
        for (i=0;i<data[j].title.length;i++){
            s='';
            s+='<div class="col-sm-4 panel panel-body">';
            s+='<h3>'+data[j].title[i]+'</h3>';
            s+='<h4>By '+data[j].username+'</h4>';
            s+='<p>' + data[j].content[i] + '</p></div>';
            c.insertAdjacentHTML('beforeend', s);
        }
    }
}
