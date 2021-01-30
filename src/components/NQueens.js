    /*
Plan: We want to try and place a queen recurisvely in each row.
If there's ever a problem we have to return false and backtrack. Revert back to a empty cell, unplace the queen
--------------------------------------------
Base Cases
If row == n it means we've reached the end of the array.We should record our result and return false to keep permutating more
------------------------------------------

1)Check if it violates row, col, diagonal

*/
import React, {  useState } from 'react'
import Board from './Board';
import * as Util from './../utils/utility';
import './../styling/NQueens.css'

const wait = miliSeconds => {
    return new Promise((resolve,reject) =>{
        setTimeout(()=>{resolve("Success")},miliSeconds)
    });
}

export default function NQueens(){
    var frames = [];
    const [speed,setSpeed] = useState(500);
    const [board, setBoard] = useState([]);  //Our board
    const [n, setN] = useState(1);
    const [active, setActive] = useState(false);
    const [solutions, setSolutions] = useState([]); //Stores all of our solutions to display in the end!


    var rowSet = [];
    var colSet = [];
    
    var dx = [-1,1,1,-1];//Direction vectors for checking diagonals, goes NE, SE, SW, NW respectively
    var dy = [1,1,-1,-1]; 

    const cache = (x,y) => {
        rowSet[x] = true;
        colSet[y] = true;
    }
    const deCache = (x,y) =>{
        rowSet[x] = false;
        colSet[y] = false;
    }

    const isValidBounds = (x,y) =>{ //used to check diagonal bounds
        if(x < 0 || x >= n || y < 0 || y >= n ) return false;
        return true;
    }

    const canPlace = (x, y) => {   //essentially valid bounds

        if( rowSet[x] || colSet[y]) return false;  //Is the row/column occupied?
        let xTemp,yTemp;
        for( let i = 0 ; i < 4 ;i++){ //Check diagonals
            xTemp = x + dx[i];
            yTemp = y + dy[i];
            while( isValidBounds(xTemp,yTemp) ){
                if(board[xTemp][yTemp] == true) return false;
                xTemp += dx[i];
                yTemp += dy[i];
            }
        } 
        return true;
    }
    

    const  backTrack = ( row ) => {
        if( row == n ){  //we've found a solution, just return to false to continue our search
            let deepCopy = Util.getDeepCopy(board);
            solutions.push(deepCopy);
            setSolutions(solutions);
            return false;
        }
        let tempArray = [...board]; 
        
        for( let i = 0; i < n ; i++){
            if(canPlace(row,i)){
                tempArray[row][i] = true;  //"Places it there"
                setBoard(tempArray);
                cache(row,i);
                frames.push(Util.getDeepCopy(board));
                if(!backTrack(row + 1)){
                    deCache(row,i);
                    tempArray[row][i] = false;
                    setBoard(tempArray);
                    frames.push(Util.getDeepCopy(board));
                }
            }
            
            
        }
        return false; //We've exhausted all possible placements for our assumption backtrack!!!
    }

    const solveHandler =  async () =>{
        while(solutions.length){
            solutions.pop();
        }
        setSolutions( solutions );
        setBoard([]);
        backTrack(0);
        console.log("Printing Solutions");
        console.log(solutions);

        console.log(frames);

        for(let i = 0; i < frames.length; i++){
            await wait(speed);
            setBoard(frames[i]);
            await wait(speed);
        }
    }
    //==============================================================================================================================================
    const msHandler = (e) =>{
        setSpeed(e.target.value);
    }
    const  dimHandler = (e) =>{   // const means you can change this function 
        setN( e.target.value );
    }
    
    const generateHandler = (e) => {  //Generate the nxn board,
        e.preventDefault();  // By default, when pressing a button, the page refreshes, this prevents it

        rowSet = new Array(n);  //Initialize row buckets
        colSet = new Array(n); //Initialize colBuckets
        for(let i = 0; i < n; i++){
            rowSet[i] = false;
            colSet[i] = false;
        }
        


        let newBoard =  Array(n);

        for( let i = 0; i < n; i++){  
            let temp = [];
            for( let j = 0; j < n;j ++){
                temp.push(false);
            }
            newBoard[i] = temp;
        }
        setBoard( newBoard );
        setActive(true);
    }
    

        return (
            <div>
                <form>
                <label>Dimension Of Board:
                <input type = "number" name = "dimension" min = "1" max = "8" onChange = { dimHandler } />
                <button onClick = { generateHandler }>Generate</button>
                </label>
                <label>Speed (In Miliseconds)
                <input type = "number" name = "ms" min  = "1" onChange = {msHandler} />
                </label>
                </form>
                
                {active === true? <Board className = "BoardContainer" board = {board} n = {n} /> : null  /*Let's generate the board */ } 
                {active === true? <button onClick = { solveHandler }>Solve</button> : null }

            </div>
        )
    
}
