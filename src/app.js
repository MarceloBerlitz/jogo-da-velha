'use strict';

let matrix;

let state;

let gameOver = false;

const x = '<span class="x">X</span>';
const o = '<span class="o">O</span>';

let title = document.getElementsByTagName('h1').item(0);

const changeState = () => state = !state;

const fillMatrix = (i) => {
    if(i <= 3) {
        matrix[0][i-1] = state;
        return;
    }
    if(i <= 6) {
        matrix[1][i-4] = state;
        return;
    }
    matrix[2][i-7] = state;
};

const verifyWin = () => {
    if (verifyLines()) return true;
    if (verifyCols()) return true;
    return verifyDiagonals();
};

const verifyLines = () => {
    return matrix.some(line => {
        return line
            .filter(cell => cell != null).length === 3
            && line.some((item, index, array) => array
            .every(it => it === item));
    });
};

const verifyCols = () => {
    let result;
    for(let i = 0; i <=2; i ++) {
        const line = matrix.map(item => item[i]);
        result = line
            .filter(cell => cell != null).length === 3
            && line.some((item, index, array) => array
            .every(it => it === item));
            if(result) return true;
    }
};

const verifyDiagonals = () => {
    if(matrix[1][1] != null) {
        if (matrix[0][0] === matrix[1][1] && matrix[2][2] === matrix[1][1]) return true;
        return (matrix[0][2] === matrix[1][1] && matrix[2][0] === matrix[1][1]);
    } else {
        return false;
    }
};

const addEventAndClear = (cell, i) => {
    const btn = document.getElementById(cell);
    btn.innerHTML = null;
    btn.addEventListener('click', () => {
        if(!btn.innerHTML) {
            if(!verifyWin()) {
                btn.innerHTML = state ? x : o;
                fillMatrix(i);
                changeState();
                title.innerHTML = `Vez de ${ state ? x : o }`;
                verifyTie();
            }
            if(verifyWin()) {
                if(!gameOver) {
                    title.innerHTML = `${state ? o : x} ganhou! <a href="#">Jogar novamente</a>`;
                    addEventPlayAgain();
                    gameOver = true;
                }
            }
        }
    });
};

const verifyTie = () => {
    if(matrix.every(line => line.every(item => item != null)) && !verifyWin()) {
        title.innerHTML = `Empate! <a href="#">Jogar novamente</a>`;
        addEventPlayAgain();
        gameOver = true;
    }
};

const addEventPlayAgain = () => {
    document.getElementsByTagName('a').item(0).addEventListener('click', () => {
        startGame();
    });
};

const startGame = () => {
    gameOver = false;
    matrix = [
        [null, null, null],
        [null, null, null],
        [null, null, null]
    ];
    state = true;
    title.innerHTML = 'Vez de ' + x;
    let counter = 1;
    for(; counter <= 9; counter++) {
        addEventAndClear(`button-${counter}`, counter);
    }
};

startGame();