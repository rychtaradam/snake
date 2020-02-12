const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const ctverec = 20;

// Načtení obrázku
const obrazekJidla = new Image();
obrazekJidla.src = "img/jidlo.png";

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
function kolize(hlava, pole){
    for(let i = 0; i < pole.length; i++){
        if(hlava.x == pole[i].x && hlava.y == pole[i].y){
            location.reload();
            return true;
        }
    }
    return false;
}

// Funkce pro vykreslení na canvas
function vykresli(){
    
    ctx.beginPath();
    ctx.strokeStyle = "white";
    ctx.fillStyle = "white";
    ctx.rect(0, 0, 700, 700);
    ctx.stroke();
    ctx.fill();

    for(let i = 0; i < snake.length; i++){
        ctx.fillStyle = (i == 0)? "green" : "white";
        ctx.fillRect(snake[i].x, snake[i].y, ctverec, ctverec);

        ctx.strokeStyle = "black";
        ctx.strokeRect(snake[i].x,snake[i].y,ctverec, ctverec);
    }

    // Vykreslení jídla
    ctx.drawImage(obrazekJidla, jidlo.x, jidlo.y);
    
    // Aktuální pozice hlavy
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    // Určení směru
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
    if(snakeX < 0 || snakeX > 34 * ctverec || snakeY > 34 * ctverec || snakeY < 0 || kolize(novaHlava, snake)){
        location.reload();
    }

    snake.unshift(novaHlava);

    // Vykreslení bodů
    ctx.font = "45px Calibri";
    ctx.fillStyle = "black";
    ctx.fillText(skore, 30, 35);
}

// Nastavení intervalu
let hra = setInterval(vykresli,100);