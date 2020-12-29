const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
//
const app = express();

const SELECT_ALL_MOVES = 'select moves from moves';

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'goldenpinecone',
    database: 'otbchess'
});

app.use(cors());

app.get('/', (req,res) => {
    res.send('hello from the chess server')
});

app.get('/games', (req,res) => {
    pool.getConnection( (err,connection) => {
        if (err) {
            return res.send(err)
            console.log(err);
        }
        else {
            const id = Math.round(Math.random()*100+6142).toString()
            console.log(id);
            connection.query(SELECT_ALL_MOVES+' where game_id='+id+';', (err, results) => {
                if(err) {
                    return res.send(err)
                }
                else {
                    console.log(results)
                    return res.json({
                        data:results
                    })
                }
            });
        }

    });
})

app.get('/products/add', (req,res) => {
    const { moves, id } = req.query;
    console.log(moves,id);
    res.send('adding product');
})

app.listen(4000, () => {
    console.log("Chess server listening on port 4000");
});
