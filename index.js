// 
const express= require('express');
const mysql=require('mysql2');


const app=express();
let connection_str={
  host:"localhost",
  user:"root",
  password:"Samsung@2000",
  database:"world"
}
  query_str="select * from city limit 5";

const cr_connection=mysql.createConnection(connection_str);


const getcity=(req, res)=>
{
  cr_connection.execute(query_str, (err, results, fields)=> {
    if (err) throw err
      // console.log(fields);// contains extra meta data about results, if available
      // console.log(results);  // results contains rows returned by server
  res.send(results);
    })

}

app.get('/getcity', getcity) 

app.listen(3000)





  //execute will internally call prepare and query
  // prepare is used to prepare the query and query is used to execute the query


  // prepare is a step where the SQL statement is parsed, validated, and optimized by the database before actual execution.

 