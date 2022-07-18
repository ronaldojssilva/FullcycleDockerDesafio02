const express = require('express')
const app = express()
const port = 3000
const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'nodedb'
};




 
app.get('/', (req, res) => {



    const mysql = require('mysql')
    const connection = mysql.createConnection(config)
    
    // CREATE TABLE IF NOT EXISTS
    let sql = `CREATE TABLE IF NOT EXISTS people (name VARCHAR(10))`;
    connection.query(sql);
    
    sql = `INSERT INTO people (name) values ('Ronaldo')`;
    connection.query(sql);
    

    //res.send('<h1>Full Cycle no node</h1>')
    res.write('<h1>Full Cycle no node</h1>')

    
    connection.query("SELECT * FROM people", function (err, result, fields) {
       if (err) throw err;

       res.write("<table>");
       res.write("<tr>");
       for(var column in result[0]){
            res.write("<td><label>" + column + "</label></td>");
            res.write("</tr>");
            for(var row in result){
                res.write("<tr>");
                for(var column in result[row]){
                    res.write("<td><label>" + result[row][column] + "</label></td>");       
                }
                res.write("</tr>");         
            }
            res.write("</table>");
            res.send();
            connection.end()
        }
    });

})

app.listen(port, ()=>{
    console.log('Rodando na porta ' + port)


})