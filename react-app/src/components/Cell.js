import React, {useState, useEffect} from 'react'
import PromotionPopup from './PromotionPopup'
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

    let [isDragging, setIsDragging] = useState(false)
    let [x,setX] = useState(0)
    let [y,setY] = useState(0)
    let [initX,setInitX] = useState(0)
    let [initY,setInitY] = useState(0)

    const handleMouseDown = ({ clientX, clientY }) => {
        window.addEventListener('movemove', e=>console.log('hey'))
        // window.addEventListener('mouseup', handleMouseUp)
        setInitX(clientX)
        setInitY(clientY)
        setX(clientX)
        setY(clientY)
        setIsDragging(true)
        console.log('click!',clientX,clientY)
    }
    const handleMouseMove = ({clientX, clientY}) => {
        if (!isDragging) return
        setX(clientX)
        setY(clientY)
        console.log(clientX,clientY)
        console.log(clientX-initX,clientY-initY)
    }
    // console.log(props.highlighted)

    let map = {
        'r' : {'w' : wr, 'b' : br},
        'n' : {'w' : wn, 'b' : bn},
        'b' : {'w' : wb, 'b' : bb},
        'q' : {'w' : wq, 'b' : bq},
        'k' : {'w' : wk, 'b' : bk},
        'p' : {'w' : wp, 'b' : bp},
    }

    return(
        <div className={'cell'}>
            <img
                className={'gamePiece'}
                src={piece && map[piece.type][piece.color]}
                alt={piece && piece.color+piece.type}
                style={{visibility: piece ? 'visible':'hidden', left: (x-initX)+'px',top: (y-initY)+'px', zIndex:1000}}
                onMouseDown={e => {
                    props.handlePieceClick(e,props.rowIndex,props.index)
                    handleMouseDown(e)
                }}
                onMouseMove={handleMouseMove}
                draggable={'false'}
            />
            {props.highlighted[1].indexOf(cell_name)>-1 &&
             <img
                className={'gamePiece'}
                src={dot2}
                alt={'dot'}
                onClick={ e => props.handlePieceClick(e,props.rowIndex,props.index)}
            />
            }

            {props.highlighted[0]!=0 &&
             props.chess.get(props.highlighted[0]).type==='p' &&
             '07'.indexOf(props.rowIndex)>-1 &&
             props.highlighted[1].indexOf(cell_name)>-1 &&
             <PromotionPopup promote={props.promote} ri={props.rowIndex} ci={props.index} className={'popups'}/>}
        </div>
    )
}

export default Cell
