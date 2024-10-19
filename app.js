let get = document.querySelector(".take");
const arr = [];
for (let i = 0; i < 9; i++) {
    arr[i] = [];
    for (let j = 0; j < 9; j++) {
        let input = document.createElement("input");
        input.type = 'text';
        input.classList.add("box");
        input.maxLength = 1; 
        input.pattern = "[1-9]"; 
        get.appendChild(input);
        arr[i][j] = input;
    }
}
let mapr = [];
let mapc = [];
const num = 0;
let mapb = [];
function solve() {
    for (let i = 0; i < 9; i++) {
        mapr[i] = [];
        mapc[i] = [];
        for (let j = 0; j < 10; j++) {
            mapr[i][j] = num;
            mapc[i][j] = num;
        }
    }
    for (let i = 0; i < 3; i++) {
        mapb[i] = [];
        for (let j = 0; j < 3; j++) {
            mapb[i][j] = [];
            for (let k = 0; k <= 9; k++) {
                mapb[i][j][k] = num;
            }
        }
    }

}
function reset() {
    let want = document.querySelector(".sf");
    want.innerText = "Please enter a valid Sudoku puzzle";
    mapc = [];
    mapr = [];
    mapb = [];
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            arr[i][j].value = "";
        }
    }
}
let boxes = document.querySelectorAll(".box");
let summit = document.querySelector("form button");

const stoi = (data) => {
    try {
        return Number(data);
    }
    catch {
        return "INVALID";
    }
}

const solveans = () =>{
    for(let i=0;i<9;i++){
        for(let j=0;j<9;j++){
             if(arr[i][j].value==""){
                for(let k=1;k<=9;k++){
                    if(mapc[j][k] || mapr[i][k] || mapb[Math.floor(i/3)][Math.floor(j/3)][k]){}
                    else{
                        mapc[j][k] =1;
                        mapr[i][k] =1; 
                        mapb[Math.floor(i/3)][Math.floor(j/3)][k] = 1;
                        arr[i][j].value = k;
                        console.log(arr[i][j].value);
                        if(solveans())return true;
                        mapc[j][k] = 0;
                        mapr[i][k] = 0; 
                        mapb[Math.floor(i/3)][Math.floor(j/3)][k] = 0;
                        arr[i][j].value = "";
                    }
                }
                return false;
             }
        }
    }
    return true;
}
const check = () => {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (arr[i][j].value != "") {
                let fount = stoi(arr[i][j].value);
                if (isNaN(fount) || fount <= 0 || fount > 9) {
                    let want = document.querySelector(".sf");
                    want.innerText = "Invalid input. Please enter numbers 1-9 only.";
                    return;
                } else {
                    if (mapr[i][fount] || mapc[j][fount] || mapb[Math.floor(i / 3)][Math.floor(j / 3)][fount]) {
                        let want = document.querySelector(".sf");
                        want.innerText = "Invalid Sudoku. Please check your input.";
                        return;
                    } else {
                        mapr[i][fount] = 1;
                        mapc[j][fount] = 1;
                        mapb[Math.floor(i / 3)][Math.floor(j / 3)][fount] = 1;
                    }
                }
            }
        }
    }
    if(solveans()){
        let want = document.querySelector(".sf");
        want.innerText = "Your Sudoku puzzle has been solved!";
    } else {
        let want = document.querySelector(".sf");
        want.innerText = "This Sudoku puzzle has no solution.";
    }
}
summit.addEventListener('click', (event) => {
    event.preventDefault();
    solve();
    check();
})
