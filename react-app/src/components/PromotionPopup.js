import React, {useState,useEffect} from 'react'
import './popup.css'
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

function PromotionPopup(props) {
    const [visible,setVisible] = useState(false)

    useEffect(()=>{
        // if (visible) console.log('i should be seen rn')
    },[visible])
    // console.log('visible:',visible)
    return (
        <div className='inner'>
            {
                !visible?
                <div onMouseUp={()=>{
                    setVisible(!visible)
                    // console.log(visible)
                }}>
                    <img src={dot2} style={{height:50}} />
                </div>
                :
                <div className='promotewindow'>
                    <img
                        src={bq}
                        style={{height:50}}
                        onClick={()=>props.promote('q',props.ri,props.ci)}
                    />
                    <br />
                    <img
                        src={br}
                        style={{height:50}}
                        onClick={()=>props.promote('r',props.ri,props.ci)}
                    />
                </div>
            }
        </div>
    )
}

export default PromotionPopup
