export{sleep, getDeepCopy}


function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
  }
  

function getDeepCopy(board){
  let res = [];
  let row = [];
  for(let i = 0; i < board.length ; i++){
    res.push([...board[i]]);
  }

  return res;
}