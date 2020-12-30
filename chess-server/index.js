const express = require('express')
const cors = require('cors')
const mysql = require('mysql')
//
const app = express()

const SELECT_ALL_MOVES = 'select moves from moves'
const SELECT_ALL_PUZZLES = 'select * from puzzles2'

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

app.get('/puzzles', (req,res) => {
    process.stdout.write('connection ')

    pool.getConnection( (err,connection) => {
        // console.log('connected')
        if (err) {
            console.log(err)
            return res.send(err)
        }
        else {
            const id = Math.round(Math.random()*100).toString()
            console.log(id);
            connection.query(SELECT_ALL_PUZZLES+' where game_id='+id+';', (err, results) => {
                if(err) {
                    console.log(err)
                    return res.send(err)
                }
                else {
                    // console.log(results)
                    return res.json({
                        data:results
                    })
                }

            });
        }
        connection.release()

    });
})

app.get('/games', (req,res) => {
    process.stdout.write('connection ')

    pool.getConnection( (err,connection) => {
        // console.log('connected')
        if (err) {
            console.log(err)
            return res.send(err)
        }
        else {
            const id = Math.round(Math.random()*100+6142).toString()
            console.log(id);
            connection.query(SELECT_ALL_MOVES+' where game_id='+id+';', (err, results) => {
                if(err) {
                    console.log(err)
                    return res.send(err)
                }
                else {
                    // console.log(results)
                    return res.json({
                        data:results
                    })
                }

            });
        }
        connection.release()

    });
})

app.get('/products/add', (req,res) => {
    const { moves, id } = req.query
    console.log(moves,id)
    res.send('adding product')
})

app.listen(4000, () => {
    console.log("Chess server listening on port 4000")
});
