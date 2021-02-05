const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req, res){
    res.sendFile(__dirname+ "/signup.html");
});

app.post("/", function(req, res){

    var firstName= req.body.fName;
    var lastName= req.body.fName;
    var email=req.body.email;

    var data ={
      members: [
          {
            email_address: email,
            status:"subscribed",
            merge_fields:{
                FNAME:firstName,
                LNAME:lastName
            }
          }
      ]
    };

    var jsonData = JSON.stringify(data);

    var options = {
        url: `https://us3.api.mailchimp.com/3.0/lists/974b497858`,
        method:"POST",
        headers: {
            "Authorization": "Pascalog fd0adf541692a2400047125817327048-us3"
        },
        body: jsonData
    };

    request(options, function(error, response, body){
       
        if(error) {
            
            res.sendFile(__dirname +"/failure.html");
        }else {
            if(response.statusCode ===200) {
              res.sendFile(__dirname+ "/success.html");
            }else{
                res.sendFile(__dirname +"/failure.html");
            }
        }
    });

});



app.post("/failure", function(req, res) {
    res.redirect("/");
});

app.listen(process.env.PORT || 8080, function () {
    console.log("Server successfully running on Port 8080");
});


