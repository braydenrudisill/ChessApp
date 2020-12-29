import React from 'react'
import br from './icons/good-br.png'
import bn from './icons/bad-nb.png'
import bb from './icons/bad-bb.png'
import bq from './icons/bad-qb.png'
import bk from './icons/bad-kb.png'
import bp from './icons/good-bp2.png'

import wr from './icons/good-wr.png'
import wn from './icons/bad-nw.png'
import wb from './icons/bad-bw.png'
import wq from './icons/bad-qw.png'
import wk from './icons/bad-kw.png'
import wp from './icons/good-wp2.png'
import dot from './icons/dot.png'
import dot2 from './icons/dot2.png'

function Cell(props) {
    let name = 'cell'
    for (let i=0; i<props.cell.length; i++){
        if(props.cell[i]!=='') { name += ' cell-' +props.cell[i]; }
    }

    let map = {
        '2r': br,
        '2n': bn,
        '2b': bb,
        '2q': bq,
        '2k': bk,
        '2p': bp,
        '1r': wr,
        '1n': wn,
        '1b': wb,
        '1q': wq,
        '1k': wk,
        '1p': wp,
        'h': dot2,
    }
    let piece = props.cell.replace('a','')

    if(piece.indexOf('h')>-1&&piece.length>1){piece=piece.replace('h','')}


    return(
        <div className={name}>
            <div onClick={ e => props.handlePieceClick(e,props.rowIndex,props.index)}>
                <img
                    row-index={props.rowIndex}
                    cell-index={props.index}
                    className={'gamePiece'}
                    src={map[piece]}
                    style={{visibility: props.cell===''?'hidden':'visible'}}
                    alt={piece}
                />
            </div>

        </div>
    )
}

export default Cell
