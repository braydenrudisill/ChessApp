import React from 'react'
import br from './icons/good-br2.png'
import bn from './icons/good-bn.png'
import bb from './icons/good-bb.png'
import bq from './icons/good-bq.png'
import bk from './icons/good-bk.png'
import bp from './icons/good-bp2.png'

import wr from './icons/good-wr2.png'
import wn from './icons/good-wn.png'
import wb from './icons/good-wb.png'
import wq from './icons/good-wq.png'
import wk from './icons/good-wk.png'
import wp from './icons/good-wp2.png'
import dot from './icons/dot.png'
import dot2 from './icons/dot2.png'

function Cell(props) {
    let piece = props.chess.board()[props.rowIndex][props.index]
    let cell_name = 'abcdefgh'[props.index] + '87654321'[props.rowIndex]
    // console.log(props.highlighted)

    let map = {
        'r' : {'w' : wr, 'b' : br},
        'n' : {'w' : wn, 'b' : bn},
        'b' : {'w' : wb, 'b' : bb},
        'q' : {'w' : wq, 'b' : bq},
        'k' : {'w' : wk, 'b' : bk},
        'p' : {'w' : wp, 'b' : bp}
    }
    // console.log(props.chess.board())

    if(piece){
        return(
            <div className={'cell'}>
                <div onClick={ e => props.handlePieceClick(e,props.rowIndex,props.index)}>
                    <img
                        row-index={props.rowIndex}
                        cell-index={props.index}
                        className={'gamePiece'}
                        src={map[piece.type][piece.color]}
                        style={{visibility: props.cell===''?'hidden':'visible'}}
                        alt={piece.color+piece.type}
                    />
                </div>
            </div>
        )
    }
    else if(props.highlighted[1].length!=0 && props.highlighted[1].indexOf(cell_name)>-1){
        return (
            <div className={'cell'}>
                <div onClick={ e => props.handlePieceClick(e,props.rowIndex,props.index)}>
                    <img
                        row-index={props.rowIndex}
                        cell-index={props.index}
                        className={'gamePiece'}
                        src={dot2}
                        alt={'highlighted'}
                    />
                </div>
            </div>
        )
    }
    else {
        return(
            <div className={'cell'}>
            </div>
        )
    }
}

export default Cell
