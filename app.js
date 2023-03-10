const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");

const app = express();

app.use(bodyParser.urlencoded({
    extended: true
}));

app.get("/", function (req, res) {

    res.sendFile(__dirname + "/index.html");

        
});

app.post("/", function(req, res){
    

    const query = req.body.cityName;
    const apiKey= "6b4304bfe2cc5a318c43b73a2d1be4eb";
    const units = "metric";


    const url = "https://api.openweathermap.org/data/2.5/weather?q=" +query+ "&units=" +units+ "&appid=" +apiKey;

    https.get(url, function(response){
        console.log(response.statusCode);

        response.on("data", function(data){
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const desc = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imageURL = "http://openweathermap.org/img/wn/"+icon+"@2x.png";

            res.write("<p>The Weather currently is " +desc+"</p>");
            res.write("<h1>Temperature in "+ query+" is " +temp+ " degree celcius </h1>");
            res.write("<img src =" +imageURL+ ">");
            res.send();
        });

    });


});



app.listen(3000, function(){
    console.log("Server is running on port 3000")
});