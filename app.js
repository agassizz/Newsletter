const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/signup.html");
});


app.post("/", function (req, res){

    var firstName= req.body.fName;
    var lastName= req.body.lName;
    var email= req.body.email;

    var data ={
        members: [
            {
                email_address: email,
                status: "subscribed"
               
            }
        ]
    };

});

var jsonData = JSON.stringify(data);

var options = {
    url: "https://us3.api.mailchimp.com/3.0/lists/0851183fd1",
    method: "POST",
    headers: {
        "Authorization": "Jimi bbdc45d5e990bd64c79dd565c01f825e-us3"
    },

    body:jsonData
};

request(options, function (error, response, body) {
    if (error) {
        res.sendFile(__dirname + "/failure.html");
    } else {
        if (response.statusCode === 200) {
            res.sendFile(__dirname + "/success.html");
        } else {
            res.sendFile(__dirname + "/failure.html");
        }
    }

});


app.listen(3000, function () {
    console.log("Server successfully running on Port 3000");
});



// API KEY 
//bbdc45d5e990bd64c79dd565c01f825e - us3

//lIST ID
// 0851183fd1