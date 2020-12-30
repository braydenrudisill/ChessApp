import React, {useState,useEffect} from 'react'
import Chess from 'chess.js'
import Row from './Row'
import MoveList from './MoveList'
import useEventListener from './useEventListener'


function GameBoard() {

    const [chess, setChess] = useState(new Chess())
    const [answer, setAnswer] = useState([])
    const [highlighted, setHighlighted] = useState([0,[]])
    const [key, update] = useState(0)
    const [stockfish, setStockFish] = useState( new Worker('./stockfish.js'));

    useEffect(()=>{

    },[])

    useEventListener('keydown', event=>{
        console.log(event.keyCode)
        if(event.keyCode === 32){
            fetch('http://localhost:4000/puzzles')
                .then(response=>response.json())
                .then(({data})=>{
                    const fen = data[0].pos.replace('\"','').replace('\"','')
                    if(!chess.load_pgn(fen)){chess.load(fen)} // If can't load by pgn, load by fen
                    console.log(data[0].solution.split(' '))
                    console.log(fen)
                    setChess(chess)
                    update(key+1)
                    stockfish.postMessage('uci')
                })
        }
        if(event.keyCode === 39){
        }
    })
    stockfish.onmessage = (e) => {
        // console.log(e.data)
        if(e.data==='uciok') {
            stockfish.postMessage('setoption name Hash value 32')
            stockfish.postMessage('isready')
        }
        else if(e.data==='readyok') {
            stockfish.postMessage('ucinewgame')
            stockfish.postMessage('position fen '+ chess.fen())
            console.log('fen', chess.fen())
            stockfish.postMessage('go movetime 1000')// go wtime 60000 btime 60000 winc 2000 binc 2000
        }
        else if(e.data.indexOf('bestmove')>-1){
            console.log("FOUND BEST MOVE", e.data.slice(9,13))
            // chess.move(e.data.slice(9,13),{sloppy: true})
            setChess(chess)
            update(key+1)
        }
    }

    // console.log(moves)
    useEffect( () => {
        // stockfish.postMessage('uci')
    },[])

    const handlePieceClick = (event, rowIndex, cellIndex) => {
        console.log('clack')
        const square = 'abcdefgh'[cellIndex] + '87654321'[rowIndex]
        if(highlighted[1].indexOf(square)===-1 && chess.board()[rowIndex][cellIndex]!=null){
            const moves = chess.moves({square: square, verbose:true})
            const highlighted_sq = []
            for (let i=0; i<moves.length; i++) {
                highlighted_sq.push(moves[i].to)
            }
            setHighlighted([square,highlighted_sq])
        }
        else {
            chess.move({from: highlighted[0], to:square})
            setHighlighted([0,[]])
            if (chess.in_checkmate()) {
                console.log('checkmate!')
            }
            else if (chess.in_stalemate()){
                console.log('stalemate!')
            }
            else if (chess.in_draw()){
                console.log('draw')
            }
            else if(chess.game_over()){
                console.log('game over!')
            }
            else {
                // stockfish.postMessage('uci')
            }
        }
    }

    const promote = (piece, rowIndex, cellIndex)=>{
        console.log('uvu')
        const square = 'abcdefgh'[cellIndex] + '87654321'[rowIndex]
        chess.move(highlighted[0]+square+'='+piece, {sloppy:true})
        setHighlighted([0,[]])
        update(key+1)
    }


    return (
        <div className='container'>
            <div className='board'>
                {chess.board().map( (row,index) => {
                    return(
                        <Row
                            key={index}
                            arr={row}
                            handlePieceClick={handlePieceClick}
                            rowIndex={index}
                            chess={chess}
                            highlighted={highlighted}
                            promote={promote}
                        />
                    )})
                }
            </div>
        </div>
    )
}

export default GameBoard
