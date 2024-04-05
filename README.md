Its a SQL query generator in response to general English Text. 

For eg -  

    " Please give me all the information of the student whose roll is 128 ". 

This will generate a sql query -

    " select * from student where Roll = 128; "

Rules are written in sql.l file. Since english is a vast language the rules are limited and one can expand those to incorporate more queries. sql.yacc file will create a parse tree for the given grammar rules.

Create Table for testing the query :

    - Create Database in mysql. Use it to create a table with name student.
    - create table student(
      id INTEGER,
      name varchar(255),
      roll INTEGER unique,
      cpi double,
     );
    - Use table.txt for test data.

Change the details for database in node app :

    const connection = mysql.createConnection({
    host:"localhost",
    user: "your username",
    password: "your password",
    database: "Database name you have used to create table"
    });


To Run the Project: 

  
    - lex sql.l
    - yacc -d sql.y
    - cc lex.yy.c y.tab.c -o sql

    - node sqlgenerator.js

On clicking the port address, test one the texts present in queries.txt in the node app textarea. Leave a line between text and cursor and present Submit to generate the result. The written text will appear in general.txt and generated query will appear in sql.txt which will be used by node application to fetch the result from database "Students".

<img width="1223" alt="Screenshot 2024-04-06 at 1 04 29 AM" src="https://github.com/Prakhar151202/Text-To-SQL-Generator/assets/116758420/4879bab5-033d-4136-b486-db3faa3cdf0c">
