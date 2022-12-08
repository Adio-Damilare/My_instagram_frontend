import React from 'react'

function Isloading() {
    return (
        <div id='isloadingSuges' className='container-fluid'> 
        <div>
            <div className="spinner-border  text-danger  spinning" style={{height:"100px",width:"100px"}} role="status">
                <span className="sr-only"></span>
            </div>
        </div>
        </div>
    )
}

export default Isloading