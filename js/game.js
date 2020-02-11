const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const ctverec = 20;

const foodImg = new Image();
foodImg.src = "img/food1.png";

let snake = [];

snake[0] = {
    x : 17 * ctverec,
    y : 17 * ctverec 
}

let jidlo = {
    x : Math.floor(Math.random()*34+1) * ctverec,
    y : Math.floor(Math.random()*33+2) * ctverec
}

let skore = 0;

// Funkce pro ovládání hada
let s;

document.addEventListener("keydown", pohyb);

function pohyb(event){
    let key = event.keyCode;

    if(key == 37 && s != "DOPRAVA"){
        s = "DOLEVA";
    }

    else if(key == 38 && s != "DOLŮ"){
        s = "NAHORU";
    }

    else if(key == 39 && s != "DOLEVA"){
        s = "DOPRAVA";
    }

    else if(key == 40 && s != "NAHORU"){
        s = "DOLŮ";
    }
}

// Funkce k prověření kolize

function collision(hlava, pole){
    for(let i = 0; i < pole.length; i++){
        if(hlava.x == pole[i].x && hlava.y == pole[i].y){
            return true;
        }
    }
    return false;
}

// Funkce pro vykreslení na canvas

function vykresli(){

    for(let i = 0; i < snake.length; i++){
        ctx.fillStyle = (i == 0)? "green" : "white";
        ctx.fillRect(snake[i].x, snake[i].y, ctverec, ctverec);

        ctx.strokeStyle = "red";
        ctx.strokeRect(snake[i].x,snake[i].y,ctverec, ctverec);
    }

    /*ctx.fillStyle = "red";
    ctx.fillRect(jidlo.x, jidlo.y, ctverec, ctverec);*/

    ctx.drawImage(foodImg, jidlo.x, jidlo.y);
    
    // Aktuální pozice hlavy
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    /*// Odebrání poslední části hada
    snake.pop();*/

    // Směr
    if(s == "DOLEVA"){
        snakeX -= ctverec;
    }
    if(s == "NAHORU"){
        snakeY -= ctverec;
    }
    if(s == "DOPRAVA"){
        snakeX += ctverec;
    }
    if(s == "DOLŮ"){
        snakeY += ctverec;
    }

    // Zvětšení hada
    if(snakeX == jidlo.x && snakeY == jidlo.y){
        skore++;
        jidlo = {
            x : Math.floor(Math.random()*34+1) * ctverec,
            y : Math.floor(Math.random()*33+2) * ctverec
        }
    }
    else{
        snake.pop();
    }

    // Posunutí hada

    let novaHlava = {
        x : snakeX,
        y : snakeY
    }

    // Konec hry
    if(snakeX < 0 || snakeX > 35 * ctverec || snakeY > 35 * ctverec || snakeY < 0 || collision(novaHlava, snake)){
        clearInterval(hra);
    }

    snake.unshift(novaHlava);

    ctx.font = "45px Calibri";
    ctx.fillStyle = "black";
    ctx.fillText(skore, 30, 35);
}

let hra = setInterval(vykresli,100);