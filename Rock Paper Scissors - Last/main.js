var a1 = ['rock' , 'paper' , 'scissors']
let wins = localStorage.getItem('wins') || 0;
let losses = localStorage.getItem('losses') || 0;
let ties = localStorage.getItem('ties') || 0;
display();
function random(arr) {
    let num = Math.floor(Math.random() * 3);
    return arr[num];
}
function select(player){
    let computer = random(a1);
    if (player == computer) {
        ties ++;
        document.querySelector('.p1').innerHTML='Tie';
        display();
    }
    else if ((player == 'rock' && computer == 'scissors') ||
            (player == 'paper' && computer == 'rock') ||
            (player == 'scissors' && computer == 'paper')){
                wins ++;
                document.querySelector('.p1').innerHTML='You win!';
                display();
                }
    else {
        losses ++;
        document.querySelector('.p1').innerHTML='You lose!';
        display();
    }
}

function reset() {
    wins = 0;
    losses = 0;
    ties = 0
    display();
}

function display(){
    let x = document.querySelector('.p2');
    x.innerHTML = `Wins= ${wins} losses= ${losses} ties= ${ties}`;
    localStorage.setItem('wins',wins);
    localStorage.setItem('losses',losses);
    localStorage.setItem('ties',ties);
}

let isAutoPlaying = false ;
let intervalID ; 
let text = document.querySelector('.auto');

function autoPlay() {
    if (!isAutoPlaying) {
        intervalID = setInterval(function Auto(){
            let auto = Math.floor(Math.random() * 3);
            let autoChoice = a1[auto];
            select(autoChoice)
        },1000);
        isAutoPlaying = true;
        text.classList.add('started');
        text.innerHTML = 'stop auto play';
    }else {
            clearInterval(intervalID);
            isAutoPlaying = false
            text.classList.remove('started');
            text.innerHTML = 'auto play';
    }
};

document.body.addEventListener('keydown',(event) => {
if (event.key == 'r') {
    select('rock');
}
else if (event.key == 't') {
    select('paper');
}
else if (event.key == 'y') {
    select('scissors');
}
});
