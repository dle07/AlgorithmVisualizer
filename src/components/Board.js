import React from 'react';
import Row from './Row';
import './../styling/NQueens.css'

export default function Board(props) {
    return (
        <div className = "BoardContainer">
        {props.board.map(arr =>(
            <Row arr = {arr} />
        ))}
        </div>
    )
}
