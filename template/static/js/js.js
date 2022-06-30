/*
    Creación de variables para la funcionalidad del juego 
    var canvasWidth = 960;     //Ancho del lienzo canvas
    var canvasHeight = 450;    //Altura del lienzo canvas
    var player;                //Variable para el jugador
    var playerYPosition = 200; //Variable para la posición del jugador
    var fallSpeed = 0;
    var interval = setInterval(updateCanvas, 20);
    var isJumping = false;
    var jumpSpeed = 0;
    var block;
*/ 
var canvasWidth = 960;
var canvasHeight = 450;

var player;
var playerYPosition = 200;

var fallSpeed = 0;
var interval = setInterval(updateCanvas, 20);

var isJumping = false;
var jumpSpeed = 0;

var block;

// Creación de un puntaje 0 al iniciar el juego 
var score = 0;
// Creación de la variable etiqueta, para el score del puntaje
var scoreLabel;

/*
creación de la función startGame()
player = new createPlayer(30, 30, 10);
block = new createBlock();
*/
function startGame() {
    gameCanvas.start();
    player = new createPlayer(30, 30, 10);
    block = new createBlock(); //Asignamos la variable block a un valor createBlock()
    // Asignación de puntale en la etiqueta scorelabel() 
    scoreLabel = new createScoreLabel(10, 30);
}

var gameCanvas = {
    canvas: document.createElement("canvas"),
    start: function() {
        this.canvas.width = canvasWidth;
        this.canvas.height = canvasHeight;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    }
}

/*
    Creación de un jugador oponente 
*/
function createPlayer(width, height, x) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = playerYPosition;
    
    /*
        Función draw, permite dibujar a el jugador en el lienzo 
        este será un cuadrado de color fucsia
    */
    this.draw = function() {
        ctx = gameCanvas.context;
        ctx.fillStyle = "fuchsia";
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    /*
        Creamos la función makeFall para
        que el bloque se detenga tan pronto como toque el suelo */
    this.makeFall = function() {
        if (!isJumping) {
            this.y += fallSpeed;
            fallSpeed += 0.1;
            this.stopPlayer();
        }
    }
    /*
        Creación de la función stopPlayer (parar jugador)
    */
    this.stopPlayer = function() {
        var ground = canvasHeight - this.height;
        if (this.y > ground) {
            this.y = ground;
        }
    }

    /*
        Función para que el jugador salte
    */
    this.jump = function() {
        if (isJumping) {
            this.y -= jumpSpeed;
            jumpSpeed += 0.4;//Velocidad de salto
        }
    }
}

/*
    Creaciónd e la función createBlock()
*/
function createBlock() {
    var width = randomNumber(10, 50);
    var height = randomNumber(10, 200);
    var speed = randomNumber(2, 6);
    
    this.x = canvasWidth;
    this.y = canvasHeight - height;
    
    //Dibuja el jugador oponente
    this.draw = function() {
        ctx = gameCanvas.context;
        ctx.fillStyle = "white";
        ctx.fillRect(this.x, this.y, width, height);
    }
    //Función para el opnonte 
    this.attackPlayer = function() {
        this.x -= speed;
        this.returnToAttackPosition();
    }
    this.returnToAttackPosition = function() {
        if (this.x < 0) {
            width = randomNumber(10, 50);
            height = randomNumber(50, 200);
            speed = randomNumber(4, 6);
            this.y = canvasHeight - height;
            this.x = canvasWidth;
            // Aumenta el puntaje del block jugador
            score++;
        }
    }
}

/*
    Función para detectar la colición o choque entre bloques jugadores
    y se detenga el juego una vez que ocurra una colisión.
*/
function detectCollision() {
    var playerLeft = player.x
    var playerRight = player.x + player.width;
    var blockLeft = block.x;
    var blockRight = block.x + block.width;
    
    var playerBottom = player.y + player.height;
    var blockTop = block.y;
    
    if (playerRight > blockLeft && 
        playerLeft < blockLeft && 
        playerBottom > blockTop) {
        
        gameCanvas.stop();
    }
}

/*
    Función para la etiqueta del puntaje o marcador del juego
*/
function createScoreLabel(x, y) {
    this.score = 0;  
    this.x = x;
    this.y = y;
    this.draw = function() {
        ctx = gameCanvas.context;
        ctx.font = "30px Marker Felt";
        ctx.fillStyle = "white";
        ctx.fillText(this.text, this.x, this.y);
    }
}

/*
    Crea una función que redibuje el canvas
     y se reinicie el juego al recargar la pag
*/
function updateCanvas() {
    detectCollision();
    
    ctx = gameCanvas.context;
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    
    player.makeFall();
    player.draw();
    player.jump();
    
    block.draw();
    block.attackPlayer();
    
    // Redibuja el puntaje y actualiza el valor 
    scoreLabel.text = "SCORE: " + score;
    scoreLabel.draw();
}

function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function resetJump() {
    jumpSpeed = 0;
    isJumping = false;
}

document.body.onkeyup = function(e) {
    if (e.keyCode == 32) {
        isJumping = true;
        setTimeout(function() { resetJump(); }, 1000);
    }
}