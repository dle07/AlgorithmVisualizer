
/*
Plan: We want to try and place a queen recurisvely in each row.
If there's ever a problem we have to return false and backtrack. Revert back to a empty cell, unplace the queen
--------------------------------------------
Base Cases
If row == n it means we've reached the end of the array.We should record our result and return false to keep permutating more


------------------------------------------

1)Check if it violates row, col, diagonal


*/
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

const isValidBounds = (x,y,n) =>{ //used to check diagonal bounds
    if(x < 0 || x >=n || y < 0 || y>= n ) return false;
    return true;
}

const canPlace = (x, y, n,board) => {   //essentially valid bounds

    if( rowSet[x] || colSet[y]) return false;  //Is the row/column occupied?
    let xTemp,yTemp;
    for( let i = 0 ; i < 4 ;i++){ //Check diagonals
        xTemp = x + dx[i];
        yTemp = y + dy[i];
        while( isValidBounds(xTemp,yTemp,n)){
            if(board[xTemp][yTemp] == 'Q') return false;
            xTemp += dx[i];
            yTemp += dy[i];
        }
    } 
    return true;
}


const backTrack = ( row,n,board,solutions ) => {

    if( row == n ){  //we've found a solution, just return to false to continue our search
        solutions.push(board);
        return false;
    }
    for( let i = 0; i < n ; i++){
        if(canPlace(row,i,board)){
            board[row][i] = 'Q';
            cache(row,i);
            if(!backTrack(row + 1)){  //It means our assumption that we had a valid board failed, backtrack
                board[row][i] = '-';  //set it back to empty
                deCache(row,i);
            }
        }
        
    }

    return false; //We've exhausted all possible placements for our assumption backtrack!!!
}


const solveHandler = (n,board,solutions) =>{
    rowSet = new Array(n);  //Initialize row buckets
    colSet = new Array(n); //Initialize colBuckets

    for(let i = 0; i < n; i++){
            rowSet[i] = false;
            colSet[i] = false;
        }

    backTrack( 0, n, board, solutions );
}

