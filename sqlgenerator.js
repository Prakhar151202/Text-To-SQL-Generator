//jshint esversion:6
const mysql = require('mysql2');
const express = require("express");
const ejs = require('ejs');
const bodyParser = require("body-parser");
// const {exec} = require('node:child_process');
var fs = require('fs');

var a = './a'
var exec =  require('child_process').exec;

// exec(cmd, function(err, stdout, stderr) {
//         console.log(stdout);
// })

const app = express();
app.use(bodyParser.urlencoded({extended:"true"}));
app.use(express.static("public"));
app.set('view engine', 'ejs');

const connection = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:""
});
connection.connect(function(err){
    if(err) throw err;
    console.log("Connected");
   })
app.get("/" , function(req,res){
    res.render('home');
});

app.post("/",function(req,res){
    var content = req.body.command1;
    fs.writeFile('general.txt', content, err => {
        if (err) {
            console.error(err);
        } 
    })
   
    exec(a, (error, stdout, stderr) => {
        if (error) {
          throw error;
        }
        var data = fs.readFileSync('sql.txt', 'utf8');
        
        connection.query(data, function (err, results, fields) {
            console.log("sql connected");
            if (err) throw err;
            if(data.split(' ')[1]=='update' || data.split(' ')[1]=='delete'){
                const st = 'select * from student;'
                connection.query(st, function (err, results, fields) {
                    if (err) throw err;
                    
                    res.render("output", {results: results,data:data});
                });
            }else{
                res.render("output", {results: results,data:data});
            }
            
            
        });
    })
});

app.listen(8087,function(){
    console.log("server is running on http://localhost:8087");
});

//jshint esversion:6
// const mysql = require('mysql2');
// const express = require("express");
// const ejs = require('ejs');
// const bodyParser = require("body-parser");
// const { exec } = require('child_process');
// const fs = require('fs');

// const app = express();
// app.use(bodyParser.urlencoded({extended: "true"}));
// app.use(express.static("public"));
// app.set('view engine', 'ejs');

// const connection = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "prakhar12345",
//     database: "compilers"
// });
// connection.connect(function(err){
//     if(err) throw err;
//     console.log("Connected");
//    })
// app.get("/", function(req, res){
//     res.render('home');
// });

// app.post("/", function(req, res){
//     var content = req.body.command1;
//     fs.writeFile('input.txt', content, err => {
//         if (err) {
//             console.error(err);
//         } 

//     });
   
//     exec('a', (error, stdout, stderr) => {
//         if (error) {
//             console.error(error); // Log any error from the execution
//             throw error;
//         }
//         console.log("Command executed successfully"); // Log success message
//         var data = fs.readFileSync('out.txt', 'utf8');

//         connection.query(data, function (err, results, fields) {
//             if (err) {
//                 console.error(err); // Log any database query error
//                 throw err;
//             }
//             console.log("SQL query executed successfully"); // Log success message
//             if(data.split(' ')[1] == 'update' || data.split(' ')[1] == 'delete'){
//                 const st = 'select * from student;';
//                 connection.query(st, function (err, results, fields) {
//                     if (err) {
//                         console.error(err); // Log any secondary database query error
//                         throw err;
//                     }
//                     console.log("Secondary SQL query executed successfully"); // Log success message
//                     res.render("output", {results: results, data: data});
//                 });
//             } else {
//                 res.render("output", {results: results, data: data});
//             }
//         });
//     });
// });

// app.listen(8087, function(){
//     console.log("Server is running on http://localhost:8087"); // Log server start message
// });
