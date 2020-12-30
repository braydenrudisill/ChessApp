import React, {useState,useEffect} from 'react'
import Chess from 'chess.js'
import useEventListener from './useEventListener'
import GameBoard from './GameBoard'

function GameLogic() {

    const [chess, setChess] = useState(new Chess())
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


    return (
        <GameBoard chess={chess} handlePieceClick={handlePieceClick} highlighted={highlighted}/>
    )
}

export default GameLogic
