import React from 'react'

function MoveList(props) {

    const moveFromBoard = (board1,board2) => {
        let diffs = []
        for(let i=0; i<board1.length; i++){
            for(let j=0; j<board1[i].length; j++){
                if (board1[i][j]!==board2[i][j]) {diffs.push([i,j])}
            }
        }
        if (board1[diffs[0][0]][diffs[0][1]] !== '') {diffs=diffs.reverse()}
        return board2[diffs[0][0]][diffs[0][1]].replace('1','').replace('2','').replace('p','').replace('a','').replace('h','')+
            mapx[diffs[0][1]]  + (8-(diffs[0][0]))
    }

    const mapx = {
        0: 'a',
        1: 'b',
        2: 'c',
        3: 'd',
        4: 'e',
        5: 'f',
        6: 'g',
        7: 'h',
    }

    let move = ''
    for (let i=0; i <props.moves.length-1; i++){
        move = move.concat(moveFromBoard(props.moves[i],props.moves[i+1]))
        move += ' '
    }
    // console.log('pos',move)
    return(
        <h1>
            {move}
        </h1>
    )
}

export default MoveList
