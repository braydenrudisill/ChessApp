import React from 'react'
import Cell from './Cell'

function Row(props) {
    return (
        <div className='row'>
            {props.arr.map( (cell,index) => {
                return (
                    <Cell
                        key={index}
                        rowIndex={props.rowIndex}
                        index={index}
                        cell={cell}
                        handlePieceClick={props.handlePieceClick}
                        chess={props.chess}
                        highlighted={props.highlighted}
                        promote={props.promote}
                    />
                )
            })}
        </div>
    )
}

export default Row
