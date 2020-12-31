import React, {useState,useEffect} from 'react'
import Chess from 'chess.js'
import useEventListener from './useEventListener'
import GameBoard from './GameBoard'

function GameLogic() {

    const [chess, setChess] = useState(new Chess('rnbQ3r/pppp1Pbp/3k2pn/8/8/6P1/PPPP3P/RNBQKBNR w KQ - 1 11'))
    const [highlighted, setHighlighted] = useState([0,[]])
    const [key, update] = useState(0)

    useEffect(()=>{
        fetch('https://localhost:4000/games')
            .then(response=>response.json())
            .then(data=>{
                chess.load_pgn(data)
                console.log(data)
            })
    },[])

    useEventListener('keydown', event=>{
        if(event.keyCode === 37){
        }
        if(event.keyCode === 39){
        }
    })

    // console.log(moves)
    useEffect( () => {
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
        <GameBoard
            chess={chess}
            handlePieceClick={handlePieceClick}
            highlighted={highlighted}
            promote={promote}
        />
    )
}

export default GameLogic
