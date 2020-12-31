import React from 'react'
import Row from './Row'
import MoveList from './MoveList'
function GameBoard(props) {
    return (
        <div className='container'>
            <div className='board'>
                {props.chess.board().map( (row,index) => {
                    return(
                        <Row
                            key={index}
                            arr={row}
                            handlePieceClick={props.handlePieceClick}
                            rowIndex={index}
                            chess={props.chess}
                            highlighted={props.highlighted}
                            promote={props.promote}
                        />
                    )})
                }
            </div>
        </div>
    )
}

export default GameBoard
