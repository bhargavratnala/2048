let board = [[0,0,0,0],
            [0,0,0,0],
            [0,0,0,0],
            [0,0,0,0]];

let indexToCell = [
                    ['cell1', 'cell2', 'cell3', 'cell4'],
                    ['cell5', 'cell6', 'cell7', 'cell8'],
                    ['cell9', 'cell10', 'cell11', 'cell12'],
                    ['cell13', 'cell14', 'cell15', 'cell16']
                ]

let moves = 0;
let gameover = false;

// add random number to board
function addNumber(){
    let emptyList = [];
    for(let i = 0; i < 4; i++){
        for(let j = 0; j < 4; j++){
            if(board[i][j] === 0){
                emptyList.push([i, j]);
            }
        }
    }
    if(emptyList.length === 0){
        gameover = true;
        return;
    }
    let randomIndex = Math.floor(Math.random() * emptyList.length);
    let randomCell = emptyList[randomIndex];
    let randomValue = Math.random() < 0.9 ? 2 : 4;
    board[randomCell[0]][randomCell[1]] = randomValue;
    let cell = document.getElementById(indexToCell[randomCell[0]][randomCell[1]]);
    cell.innerHTML = randomValue;
    cell.className = `val${randomValue} cell`;
}

// start game
function start(){
    addNumber();
    addNumber();
}

start();

// console.table(board);

// move cells
function moveCellsHorizontal(istart, jstart, iend, jend, jInc, prevStart, inc){
    for(let i = istart; i < iend; i++){
        let prev = prevStart;
        for(let j = jstart; (j < jend && jInc === 1) || (j > jend && jInc === -1); j = j + jInc){
            if(board[i][j] === 0 || j === prev){
                continue;
            }
            if(board[i][prev] === 0){
                board[i][prev] = board[i][j];
                board[i][j] = 0;
                let upCell = document.getElementById(indexToCell[i][prev]);
                let downCell = document.getElementById(indexToCell[i][j]);
                upCell.innerHTML = board[i][prev];
                downCell.innerHTML = '';
                upCell.className = `val${board[i][prev]} cell`;
                downCell.className = `cell`;
            }
            else{
                if(board[i][j] === board[i][prev]){
                    board[i][prev] *= 2;
                    board[i][j] = 0;
                    let upCell = document.getElementById(indexToCell[i][prev]);
                    let downCell = document.getElementById(indexToCell[i][j]);
                    upCell.innerHTML = board[i][prev];
                    downCell.innerHTML = '';
                    upCell.className = `val${board[i][prev]} cell`;
                    downCell.className = `cell`;
                    prev = prev + inc;
                }
                else{
                    prev = prev + inc;
                    if(prev !== j){
                        board[i][prev] = board[i][j];
                        board[i][j] = 0;
                        let upCell = document.getElementById(indexToCell[i][prev]);
                        let downCell = document.getElementById(indexToCell[i][j]);
                        upCell.innerHTML = board[i][prev];
                        downCell.innerHTML = '';
                        upCell.className = `val${board[i][prev]} cell`;
                        downCell.className = `cell`;
                    }
                }
            }
        }
    }
    addNumber();
}

function moveCellsVertical(istart, jstart, iend, jend, jInc, prevStart, inc){
    for(let i = istart; i < iend; i++){
        let prev = prevStart;
        for(let j = jstart; (j < jend && jInc === 1) || (j > jend && jInc === -1); j = j + jInc){
            if(board[j][i] === 0 || j === prev){
                continue;
            }
            if(board[prev][i] === 0){
                board[prev][i] = board[j][i];
                board[j][i] = 0;
                let upCell = document.getElementById(indexToCell[prev][i]);
                let downCell = document.getElementById(indexToCell[j][i]);
                upCell.innerHTML = board[prev][i];
                downCell.innerHTML = '';
                upCell.className = `val${board[prev][i]} cell`;
                downCell.className = `cell`;
            }
            else{
                if(board[j][i] === board[prev][i]){
                    board[prev][i] *= 2;
                    board[j][i] = 0;
                    let upCell = document.getElementById(indexToCell[prev][i]);
                    let downCell = document.getElementById(indexToCell[j][i]);
                    upCell.innerHTML = board[prev][i];
                    downCell.innerHTML = '';
                    upCell.className = `val${board[prev][i]} cell`;
                    downCell.className = `cell`;
                    prev = prev + inc;
                }
                else{
                    prev = prev + inc;
                    if(prev !== j){
                        board[prev][i] = board[j][i];
                        board[j][i] = 0;
                        let upCell = document.getElementById(indexToCell[prev][i]);
                        let downCell = document.getElementById(indexToCell[j][i]);
                        upCell.innerHTML = board[prev][i];
                        downCell.innerHTML = '';
                        upCell.className = `val${board[prev][i]} cell`;
                        downCell.className = `cell`;
                    }
                }
            }
        }
    }
    addNumber();
}

window.addEventListener('keydown', event =>{
    if(event.code === 'ArrowUp' || event.code === 'KeyW'){
        moveCellsVertical(0, 1, 4, 4, 1, 0, 1)
        moves++;
    }
    if(event.code === 'ArrowDown' || event.code === 'KeyS'){
        moveCellsVertical(0, 2, 4, -1, -1, 3, -1)
        moves++;
    }
    if(event.code === 'ArrowLeft' || event.code === 'KeyA'){
        moveCellsHorizontal(0, 1, 4, 4, 1, 0, 1);
        moves++;
    }
    if(event.code === 'ArrowRight' || event.code === 'KeyD'){
        moveCellsHorizontal(0, 2, 4, -1, -1, 3, -1);
        moves++;
    }
    document.getElementById('moves').innerHTML = moves;
    // console.table(board);
})