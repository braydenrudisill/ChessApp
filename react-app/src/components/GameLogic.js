import React, {useState,useEffect} from 'react'
import useEventListener from './useEventListener'
import GameBoard from './GameBoard'

function GameLogic() {
    let [board,setBoard] = useState([
        ['2r','2n','2b','2q','2k','2b','2n','2r'],
        ['2p','2p','2p','2p','2p','2p','2p','2p'],
        ['',  '',  '',  '',  '',  '',  '',  ''  ],
        ['',  '',  '',  '',  '',  '',  '',  ''  ],
        ['',  '',  '',  '',  '',  '',  '',  ''  ],
        ['',  '',  '',  '',  '',  '',  '',  ''  ],
        ['1p','1p','1p','1p','1p','1p','1p','1p'],
        ['1r','1n','1b','1q','1k','1b','1n','1r']
    ])
    let [activePlayer, setActivePlayer] = useState('1')

    let [moves, setMoves] = useState([board])

    let [move, setMove] = useState(-1)
    // Hook

    useEffect(()=>{
        setMove(move+1)
    },[moves])

    useEventListener('keydown', event=>{
        if(event.keyCode === 37){
            if(move<1){return}
            setMove(move-1)
            setBoard(moves[move-1])
        }
        if(event.keyCode === 39){
            if(move>moves.length-2){return}
            setMove(move+1)
            setBoard(moves[move+1])
        }
    })

    // console.log(moves)
    useEffect( () => {
    },[])

    const handlePieceClick = (event, rowIndex, cellIndex) => {
        let cell = board[rowIndex][cellIndex]

        if (cell.indexOf('a') > -1) {return;}
        let check= false;
        let possibleMoves;
        if (cell.indexOf(activePlayer) > -1) {
            for(let i=0; i<8;i++){
                for(let j=0; j<8; j++){
                    [possibleMoves,check] = findAllPossibleMoves(i, j, board, activePlayer)
                    if(check){break;}
                }
                if(check){break;}
            }
            // if(check) {console.log('check:',check)}

            board = board.map( row => row.map( cell => cell.replace('a', '')))
            board[rowIndex][cellIndex] += 'a'
            highlightPossibleMoves(rowIndex, cellIndex,check)
            setBoard(board)
        }

        else if(cell.indexOf('h') !== -1) {
            setBoard(executeMove(rowIndex, cellIndex, board, activePlayer))
            if(winDetection(board,activePlayer)) {
                console.log(activePlayer + ' won the game!')
            }
            else {
                setActivePlayer(activePlayer==='1' ? '2' : '1')
                // if(activePlayer == '2') {
                //     setTimeout( () => {ai()}, 50)
                // }
            }
        }
    }

    const isChecked = (cell, activeplayer) => {
        let check = ''
        let player
        // console.log('cell',cell)
        if(cell.indexOf('k')>-1){check=cell}
        if(cell.indexOf('1')>-1){player='1'}
        else if(cell.indexOf('2')>-1){player='2'}
        else {player=activeplayer}
        // if(player!=activeplayer &&check!=''){console.log('wow',check,cell,player,activeplayer)}
        // console.log(player,activeplayer)
        return (player!=activeplayer &&check!='') ? check : ''
    }

    const executeMove = (rowIndex, cellIndex, board, activePlayer) => {

        let activePiece
        for (let i=0; i<board.length; i++) {
            for (let j=0; j<board[i].length; j++) {
                if(board[i][j].indexOf('a') > -1) {
                    activePiece = board[i][j]
                }
            }
        }

        // let deletions = board[rowIndex][cellIndex].match(/d\d\d/g);
        // if (typeof deletions !== undefined && deletions !== null && deletions.length>0) {
        //     for (let k=0; k<deletions.length; k++) {
        //         let deleteCoords = deletions[k].replace('d','').split('')
        //         board[deleteCoords[0]][deleteCoords[1]] = ''
        //     }
        // }

        board = board.map( row => row.map( cell => cell.replace(activePiece,'')
                                                       .replace('h','').trim()))


        board[rowIndex][cellIndex] = activePiece.replace('a','')
        setMoves(moves.concat([board]))
        // console.log(moves)
        // console.log(board)
        // TODO: handle pawn promotion here
        setBoard(board)
        let check
        let possibleMoves
        for(let i=0; i<8;i++){
            for(let j=0; j<8; j++){
                [possibleMoves,check] = findAllPossibleMoves(i, j, board, activePlayer)
                if(check){break;}
            }
            if(check){break;}
        }
        if(check){console.log('check')}
        return board
    }

    const highlightPossibleMoves = (rowIndex, cellIndex,checked) => {
        // Unhighlight prev highlighted squares
        board = board.map( row => row.map( cell => cell.replace('h','')
            .replace(/d\d\d/g, '').trim()))

        let [possibleMoves,check] = findAllPossibleMoves(rowIndex, cellIndex, board, activePlayer,checked)
        if (possibleMoves.length === 0) {return; }

        for (let j=0; j<possibleMoves.length; j++) {
            let buildHighlightTag = 'h'
            for (let k=0; k<possibleMoves[j].wouldDelete.length; k++) {
                buildHighlightTag += 'd' + String(possibleMoves[j].wouldDelete[k].targetRow)
                    + String(possibleMoves[j].wouldDelete[k].targetCell)+' '
            }
            board[possibleMoves[j].targetRow][possibleMoves[j].targetCell] += buildHighlightTag
        }
        setBoard(board)
    }

    const findAllPossibleMoves = (rowIndex, cellIndex, board, activePlayer,checked) => {
        let possibleMoves = []
        if(checked){console.log(checked)}

        let check = ''

        let player = 0
        if(board[rowIndex][cellIndex].indexOf('1')>-1){player=1}
        if(board[rowIndex][cellIndex].indexOf('2')>-1){player=2}
        let directionOfMotion = player === 2 ? 1:-1
        let piece = board[rowIndex][cellIndex].replace('a','')
                                              .replace('h','')
                                              .replace('2','')
                                              .replace('1','')
        let cull = false
        if(checked && checked.indexOf(String(player))>-1 ) {
            cull = true;
        }

        // console.log('piece selected: ' + piece)

        switch (piece) {
            case 'p':
                let move = [1]
                if (rowIndex===1&&player===2||rowIndex===6&&player===1) {move.push(2)}
                for( let i=0; i<move.length; i++ ) {
                    if(board[rowIndex+directionOfMotion*move[i]][cellIndex]!==''){break}
                    possibleMoves.push({targetRow: rowIndex+directionOfMotion*move[i], //(rowIndex===1||rowIndex===6)?2:1
                                        targetCell: cellIndex,
                                        wouldDelete: []})
                }

                [-1,1].forEach((d, i) => {
                    if(board[rowIndex+directionOfMotion][cellIndex+d]!==''){
                        let cel = cellIndex+d
                        if(!(cel>7||cel<0)){
                            check = check.concat(isChecked(board[rowIndex+directionOfMotion][cellIndex+d],player))
                            if(check!=='') {console.log('checku ',check,'player',player,'place',board[rowIndex+directionOfMotion][cellIndex+d])}
                            possibleMoves.push({targetRow: rowIndex+directionOfMotion, //(rowIndex===1||rowIndex===6)?2:1
                                                targetCell: cellIndex+d,
                                                wouldDelete: []})
                        }
                    }
                });


                break;
            case 'b':
                [1,-1].forEach((d, i) => {
                    for(let i=rowIndex-1; i>-1; i--) {
                        let cel = cellIndex+d*(i-rowIndex)
                        if(cel>7||cel<0){break}
                        check = check.concat(isChecked(board[i][cel],activePlayer))
                        possibleMoves.push({targetRow: i, //(rowIndex===1||rowIndex===6)?2:1
                                            targetCell: cel,
                                            wouldDelete: []})
                        if(board[i][cellIndex+d*(i-rowIndex)]!==''){break}
                    }
                    for(let i=rowIndex+1; i<8; i++) {
                        let cel = cellIndex+d*(i-rowIndex)
                        if(cel>7||cel<0){break}
                        check = check.concat(isChecked(board[i][cel],activePlayer))
                        possibleMoves.push({targetRow: i, //(rowIndex===1||rowIndex===6)?2:1
                                            targetCell: cel,
                                            wouldDelete: []})
                        if(board[i][cel]!==''){break}
                    }
                })
                break;
            case 'n':
                let knightx = [2, 1, -1, -2, -2, -1, 1, 2]
                let knighty = [1, 2, 2, 1, -1, -2, -2, -1]

                for (let i=0; i<8; i++){
                    try {
                        if(board[rowIndex + knightx[i]][cellIndex + knighty[i]]){}
                    }
                    catch(e){
                        continue;
                    }
                    let cel = cellIndex+knighty[i]
                    if(cel>7||cel<0){continue}
                    check = check.concat(isChecked(board[rowIndex+knightx[i]][cel],player))
                    possibleMoves.push({targetRow: rowIndex + knightx[i],
                                        targetCell: cellIndex + knighty[i],
                                        wouldDelete: []})
                }
                break;
            case 'k':
                let kingx = [1, 1, 1, -1, -1, -1, 0, 0]
                let kingy = [1, 0, -1, 1, 0, -1, 1, -1]
                for (let i=0; i<8; i++){
                    try {
                        if(board[rowIndex + kingx[i]][cellIndex + kingy[i]]){}
                    }
                    catch(e){
                        continue;
                    }
                    let cel = cellIndex+kingy[i]
                    if(cel>7||cel<0){continue}
                    possibleMoves.push({targetRow: rowIndex + kingx[i],
                                        targetCell: cellIndex + kingy[i],
                                        wouldDelete: []})
                }
                break;
            case 'r':
                for(let i=rowIndex-1; i>-1; i--) {
                    possibleMoves.push({targetRow: i, //(rowIndex===1||rowIndex===6)?2:1
                                        targetCell: cellIndex,
                                        wouldDelete: []})
                    check = check.concat(isChecked(board[i][cellIndex],player))
                    if(board[i][cellIndex]!==''){break}
                }
                for(let i=rowIndex+1; i<8; i++) {
                    possibleMoves.push({targetRow: i, //(rowIndex===1||rowIndex===6)?2:1
                                        targetCell: cellIndex,
                                        wouldDelete: []})
                    check = check.concat(isChecked(board[i][cellIndex],player))
                    if(board[i][cellIndex]!==''){break}
                }
                for(let i=cellIndex-1; i>-1; i--) {
                    possibleMoves.push({targetRow: rowIndex, //(rowIndex===1||rowIndex===6)?2:1
                                        targetCell: i,
                                        wouldDelete: []})
                    check = check.concat(isChecked(board[rowIndex][i],player))
                    if(board[rowIndex][i]!==''){break}
                }
                for(let i=cellIndex+1; i<8; i++) {
                    possibleMoves.push({targetRow: rowIndex, //(rowIndex===1||rowIndex===6)?2:1
                                        targetCell: i,
                                        wouldDelete: []})
                    check = check.concat(isChecked(board[rowIndex][i],player))
                    if(board[rowIndex][i]!==''){break}
                }
                break;
            case 'q':

                [1,-1].forEach((d, i) => {
                    for(let i=rowIndex-1; i>-1; i--) {
                        let cel = cellIndex+d*(i-rowIndex)
                        if(cel>7||cel<0){break}
                        possibleMoves.push({targetRow: i, //(rowIndex===1||rowIndex===6)?2:1
                                            targetCell: cel,
                                            wouldDelete: []})
                        check = check.concat(isChecked(board[i][cel],player))
                        if(board[i][cel]!==''){break}
                    }
                    for(let i=rowIndex+1; i<8; i++) {
                        let cel = cellIndex+d*(i-rowIndex)
                        if(cel>7||cel<0){break}
                        possibleMoves.push({targetRow: i, //(rowIndex===1||rowIndex===6)?2:1
                                            targetCell: cel,
                                            wouldDelete: []})
                        check = check.concat(isChecked(board[i][cel],player))
                        if(board[i][cel]!==''){break}
                    }
                })
                for(let i=rowIndex-1; i>-1; i--) {
                    possibleMoves.push({targetRow: i, //(rowIndex===1||rowIndex===6)?2:1
                                        targetCell: cellIndex,
                                        wouldDelete: []})
                    check = check.concat(isChecked(board[i][cellIndex],player))
                    if(board[i][cellIndex]!==''){break}
                }
                for(let i=rowIndex+1; i<8; i++) {
                    possibleMoves.push({targetRow: i, //(rowIndex===1||rowIndex===6)?2:1
                                        targetCell: cellIndex,
                                        wouldDelete: []})
                    check = check.concat(isChecked(board[i][cellIndex],player))
                    if(board[i][cellIndex]!==''){break}
                }
                for(let i=cellIndex-1; i>-1; i--) {
                    possibleMoves.push({targetRow: rowIndex, //(rowIndex===1||rowIndex===6)?2:1
                                        targetCell: i,
                                        wouldDelete: []})
                    check = check.concat(isChecked(board[rowIndex][i],player))
                    if(board[rowIndex][i]!==''){break}
                }
                for(let i=cellIndex+1; i<8; i++) {
                    possibleMoves.push({targetRow: rowIndex, //(rowIndex===1||rowIndex===6)?2:1
                                        targetCell: i,
                                        wouldDelete: []})
                    check = check.concat(isChecked(board[rowIndex][i],player))
                    if(board[rowIndex][i]!==''){break}
                }
                break;

            default:

        }
        if (cull){
            possibleMoves.filter( move => {
                [_,checked )
            })
        }
        // if (possibleMoves.length===0) {console.log(board)}
        return [possibleMoves,check]
    }

    const winDetection = (board, activePlayer) => false

    return (
        <GameBoard board={board} handlePieceClick={handlePieceClick} moves={moves}/>
    )
}

export default GameLogic
