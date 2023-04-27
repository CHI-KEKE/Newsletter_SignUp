const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.listen(process.env.PORT || 3000,function(){
    console.log("Port on 3000!!!!!!!!!!")
})


app.get("/",function(req,res){
    res.sendFile(__dirname + "/signup.html")
})

app.post("/",function(req,res){
    let first = req.body.fname
    let last = req.body.lname
    let mail = req.body.email

    let data = {
      members: [
        {
          email_address: mail,
          status: "subscribed",
          merge_fields:{
            FNAME:first,
            LNAME:last,
          }
        },
      ]
    };
    const jsontoChimp = JSON.stringify(data);
    const url = "https://us21.api.mailchimp.com/3.0/lists/8ecef01daf";
    const options = {
      method: "POST",
      auth: "allen:22eda9c8e4ba2903263cb97d66ea00f1-us21",
    }; 

    const Chimprequest = https.request(url,options,function(ChimpResponse){

        if (ChimpResponse.statusCode === 200){
            res.sendFile(__dirname + "/success.html")
        }
        else{
            res.sendFile(__dirname + "/failure.html")
        }

        ChimpResponse.on("data",function(data){
            console.log(JSON.parse(data))
        })
    })
    Chimprequest.write(jsontoChimp);
    Chimprequest.end()

})

app.post("/failure",function(req,res){
    res.redirect("/")
})




//dc
//us21

//list id
 //8ecef01daf

 //api
//  22eda9c8e4ba2903263cb97d66ea00f1-us21