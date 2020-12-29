import React from 'react'
import Row from './Row'
import MoveList from './MoveList'
function GameBoard(props) {
    return (
        <div className='container'>
            <div className='board'>
                {props.board.map( (row,index) => {
                    return(
                        <Row
                            key={index}
                            arr={row}
                            handlePieceClick={props.handlePieceClick}
                            rowIndex={index}
                        />
                    )})
                }
            </div>
            <div className='clear' />
            <MoveList board={props.board} moves={props.moves}/>
        </div>
    )
}

export default GameBoard
