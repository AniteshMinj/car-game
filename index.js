score=0;
cross=true;//used to track if car crashed
gameover=false;//indicate game is over or not

audio = new Audio('CarBGM.mp3');//background music for game
audiogo = new Audio('car_accident.mp3');//background music when car crash
setInterval(() => {
    if(!gameover)
    audio.play();//plays game music CarBGM
}, 1000);
document.onkeydown = function (e) {   //event handling function for key press
    
    console.log("key code is: ", e.keyCode); //e.keycode give ascci code of key

    if (e.keyCode == 38) {   //keycode for up arrow
        let race = document.querySelector(".race");//queryselector to select html class id etc
        race.classList.add('animrace'); //adds animrace class to classlist race
        setTimeout(() => {
            race.classList.remove('animrace');//removes animrace to classlist race
        }, 2000);
        console.log("hello", race);
    }
    if (e.keyCode == 39) {   //keycode for right arrow
        let lwheel = document.querySelector('#lwheel');//selects left wheel of our car
        lwheel.classList.add('animwheel');// adds animwheel class to classlist lwheel
        let rwheel = document.querySelector('#rwheel');//selects rightwheel of our car
        rwheel.classList.add('animwheel');// adds animwheel class to classlist rwheel
        let race = document.querySelector(".race");//selects full car along with wheels
        let raceX = parseInt(window.getComputedStyle(race, null).getPropertyValue('left'));//taking the left css property race and parsing it
        race.style.left = raceX + 10 + "px";//moving car 10 px forward
        setTimeout(() => {
            lwheel.classList.remove('animwheel');// removes animwheel class from classlist lwheel to stop wheel rotation
            rwheel.classList.remove('animwheel');// removes animwheel class from classlist rwheel to stop wheel rotation
        }, 700);
    }
    if (e.keyCode == 37) {   //keycode for left arrow
        let lwheel = document.querySelector('#lwheel');//selects left wheel of our car
        lwheel.classList.add('animrwheel');// adds animrwheel class to classlist lwheel so that wheel rotate in reverse dir
        let rwheel = document.querySelector('#rwheel');//selects rightwheel of our car
        rwheel.classList.add('animrwheel');// adds animrwheel class to classlist rwheel so that wheel rotate in reverse dir
        let race = document.querySelector(".race");//selects full car along with wheels
        let raceX = parseInt(window.getComputedStyle(race, null).getPropertyValue('left'));//taking the left css property race and parsing it
        race.style.left = (raceX - 10) + "px";//moving car 10 px backward
        setTimeout(() => {
            lwheel.classList.remove('animrwheel');// removes animrwheel class from classlist lwheel to stop wheel rotation
            rwheel.classList.remove('animrwheel');// removes animrwheel class from classlist rwheel to stop wheel rotation
        }, 700);
    }
    if (e.keyCode == 70) {   //keycode for F
        let race = document.querySelector(".race");//select class race
        race.classList.add('animfront');// animrear class is added to move up front of car
        setTimeout(() => {
            race.classList.remove('animfront');
        }, 2000);
        console.log("hello", race);
    }
    if (e.keyCode == 82) {   //keycode for R
        let race = document.querySelector(".race");//select class race
        race.classList.add('animrear');// animrear class is added to move up rear of car
        setTimeout(() => {
            race.classList.remove('animrear');
        }, 2000);
        console.log("hello", race);
    }
}

setInterval(() => {
    car = document.querySelector(".race");//select class race
    let gamestatus=document.querySelector(".gamestatus");//select class gamestatus
    mcar = document.querySelector("#monstercar");//select class monstercar

    ocarX = parseInt(window.getComputedStyle(car, null).getPropertyValue('left'));//gets the left css offset of car
    ocarY = parseInt(window.getComputedStyle(car, null).getPropertyValue('top'));//gets the top css offset of car

    omcarX = parseInt(window.getComputedStyle(mcar, null).getPropertyValue('left'));//gets the left css offset of monster car
    omcarY = parseInt(window.getComputedStyle(mcar, null).getPropertyValue('top'));//gets the top css offset of monster car

    offsetX = Math.abs(ocarX - omcarX);//cal absolute difference between offsetX(left) of car and monster car
    offsetY = Math.abs(ocarY - omcarY);//cal absolute difference between offsetY(top) of car and monster car

    console.log("offsetX :", offsetX);
    // console.log("offsetY :", offsetY);
    if (offsetX < 100 && offsetY < 100 && !gameover) { // checks collision of car and monster car  by offset
        mcar.classList.remove('animonster');// if collided than remove monster car animation(movement)
        gamestatus.innerHTML="Game Over!!!<br>Click Play Button to start over";// upadtes game over
        score-=1;// to remove extra extra added during collision
        gameover=true;// setting gameover to indicate and stop game animation as required
        audiogo.play();//playing crashing sound 
        setTimeout(() => {            // timeout is used to pause music after 1s
            audio.pause();
            audiogo.pause();
        }, 1000);
    }
    else if (offsetX < 145 && !gameover && cross) { //checks if car succesfully jumps and cross monster car
        // audio.play();
        score += 1;//updates score
        cross = false;//sets cross false to stop control to enter into this loop when car crossed monster car and updated scores once
        setTimeout(() => {
            updateScore(score);//calls updates function to update the score in html document 
            cross = true;//sets cross true so that it can enter loop in next iteration of monster car
        }, 1000);        
    }
       
    
}, 10);

function updateScore(score) {
    scoreCount=document.querySelector(".scoreCont");
    console.log("score is:",score);
    scoreCount.innerHTML = "Your Score: " + (score);//update score in user screen
}

//         race = document.querySelector('#race');
//         raceB = parseInt(window.getComputedStyle(race, null).getPropertyValue('bottom'));
//         race.style.bottom = raceB + 400 + "px";