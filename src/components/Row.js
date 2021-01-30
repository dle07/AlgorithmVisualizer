import React from 'react'
import './../styling/NQueens.css'

export default function Row(props) {
    
    
    return (
        <div className = "Row">
        {props.arr.map((elem,index) => (
            <div id= "Cell" >{elem == true? "Q" : ""}</div>
        ))}
        </div>
    )
}
/*
{props.arr.map((elem,index)=>(
            <div className = "cell">{elem}</div>
        ))}

*/