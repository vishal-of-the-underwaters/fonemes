const express = require("express");
const path = require('path');
const bp = require('body-parser');
const db = require('./read-table.js');
const all = require('./backup.js');
const update = require('./update-item.js');
const add = require('./create-item.js')

app = express();
app.use(bp.urlencoded({ extended: false }));
app.use(bp.json());
app.use(express.static(path.join(__dirname, "/html")));


app.get('/retrieve', (req,res) =>{
    var result = db.fetchData(req.query.username).then((data) =>{

        console.log(data.Item.content);
        res.send(JSON.stringify(data));

    }).catch((err) =>{
        console.log(err);
    });

});
var user_cache = new Set();
var list =[];

app.get('/startup', (req,res) =>{
    var result = all.fetch().then((data) =>{

        data.Items.forEach(function(i) {
            user_cache.add(i.username);
           list.push(i);
        });
        res.send(JSON.stringify(list));
        list = [];
    }).catch((err) =>{
        console.log(err);
    });

});


app.post('/newpost', (req,res) =>{
    var data= req.body;
    var uname = data[0].value;
    if (user_cache.has(uname)){
        update.updateItem(data[0].value,data[1].value, data[2].value);
    }
    else{
        add.addItem(data[0].value, data[1].value, data[2].value);
    }
    console.log(data);
});

app.listen(8000, () => {
        console.log("Listening on port 8000");
});
