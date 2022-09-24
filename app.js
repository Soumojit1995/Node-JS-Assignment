console.log('hello world');
const http = require("http");
const url = require('url');
const PORT = 5000;
const fs = require("fs");

const server = http.createServer(async (req, res) => {
    const query=  url.parse(req.url, true);    
    
    if (query.pathname === "/age" && req.method === "GET") {
        birthday=query.query.year+'-'+query.query.month+'-'+query.query.day
        birthday=new Date(birthday);
        var ageDifference = Date.now() - birthday.getTime();
        if(ageDifference>0){
            var age = new Date(ageDifference); 
            age=Math.abs(age.getUTCFullYear() - 1970);
            age = (age > 0) ? age : 0;

        }else{
            age=0
        }
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(`<p>Hello ${query.query.name}</p>`);
        res.write(`<p>You are currently  ${age} years old</p>`);
        res.end();
    }
    
    else if (query.pathname === "/vegetables" && req.method === "GET") {
        var response = {'result': JSON.parse(fs.readFileSync('vegetables.json'))};
        res.statusCode = 200;
        res.setHeader('content-Type', 'Application/json');
        res.end(JSON.stringify(response))
    }
    else if (query.pathname === "/metrics" && req.method === "GET") {
        let message;
        if(query.query.object=='circle'){
            var metric=query.query.metric;
            var radius=query.query.radius;
            let value= parseFloat(3.14159*Math.pow(radius, 2)).toFixed(2);
            message=`${query.query.metric} of ${query.query.object} is ${value}`;

        }
        else if(query.query.object=='sphere'){
            var metric=query.query.metric;
            var radius=query.query.radius;
            let value;
            if(query.query.metric=='volume'){
                value= parseFloat((4/3)*((3.14159*Math.pow(radius, 3)))).toFixed(2);
            }
            else if(query.query.metric=='surfaceArea'){

                value= parseFloat((4*(3.14159*Math.pow(radius, 2)))).toFixed(2);
            }else{

            }
            message=`${query.query.metric} of ${query.query.object} is ${value}`;
        }


        res.statusCode = 200;
        res.setHeader('content-Type', 'Application/json');
        res.write(`${message}`);
        res.end(JSON.stringify(response))
    }
    // If no route present
    else {
        res.writeHead(404, { "Content-Type": "text/html" });
        res.end(JSON.stringify({ message: "Route not found" }));
    }

});
server.listen(PORT, () => {
    console.log(`server started on port: ${PORT}`);
});