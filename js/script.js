const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
let contentWrapper = document.getElementById('content');
let modal_result = document.getElementById('modal-result');
let overlay = document.getElementById('overlay');
let btn_close = document.getElementById('btn-close');

const ground = new Image();
ground.src = "img/bg.png";

const foodImg = new Image();
foodImg.src = "img/food.png";

let k = 140;

let box = 32;

let schote = 0;
let food = {
	x: Math.floor((Math.random() * 17 + 1)) * box,
	y: Math.floor((Math.random() * 15 + 2)) * box,
};


let snake = [];
snake[0] = {
	x: 9 * box,
	y: 10 * box,
};

let color_snake = ["#0000FF", "#00FFFF", "#008080", "#000080"]

let dir;

document.addEventListener("keydown", deraction);

function deraction(e){
	if(e.keyCode == 65 && dir != "right")
		dir = "left"
	else if(e.keyCode == 68 && dir != "left") 
		dir = "right"
	else if(e.keyCode == 87 && dir != "down")
		dir = "up"
	else if(e.keyCode == 83 && dir != "up") 
		dir = "down"
}

function gameover(){
	contentWrapper.innerHTML = "GAMEOVER"
	modal_result.style.display = 'block';
}

function Close_modal(){
		modal_result.style.display = 'none';
		location.reload();
}

function eatTeal(head, arr) {
	for(let i = 0; i < arr.length; i++){
		if(head.x == arr[i].x && head.y == arr[i].y){
			clearInterval(game);
			gameover();

		}
	}
}



function Otrisovka(){
	ctx.drawImage(ground, 0, 0 );
	ctx.drawImage(foodImg, food.x, food.y );
		for(let i = 0; i < snake.length; ++i){	
			// color_color = Math.floor(Math.random() * 9);
			// ctx.fillStyle = i == 0 ? color_snake[3] : color_snake[Math.floor(Math.random() * 2)];
			
			if (i % 2 == 0){
				ctx.fillStyle = color_snake[1];

				}

			if (i % 2 != 0){
				ctx.fillStyle = color_snake[3];
				}
			
			if (i == 0){
				ctx.fillStyle = "red";
			}
			ctx.fillRect(snake[i].x, snake[i].y, box, box);
}

	ctx.fillStyle = "white";
	ctx.font = "50px Arial";
	ctx.fillText(schote, box * 1.5, box * 1.2);
	let snakeX = snake[0].x;
	let snakeY = snake[0].y;
	if(snakeX == food.x && snakeY == food.y){
		schote += 100;
		food = {
			x: Math.floor((Math.random() * 17 + 1)) * box,
			y: Math.floor((Math.random() * 15 + 2)) * box,
			};		
		for(let j = 0; j < snake.length; j++){
			if(food.x == snake[j].x && food.y == snake[j].y){
				food = {
				x: Math.floor((Math.random() * 17 + 1)) * box,
				y: Math.floor((Math.random() * 15 + 2)) * box,
			};	
			j = 0;
			}
		}

	}
	else{
		snake.pop();
	}



	if(snakeX < box || snakeX > box * 17 || snakeY < box * 2 || snakeY > box * 16){
		clearInterval(game);
		gameover();

	}

	if(dir == "left") snakeX -= box;
	if(dir == "right") snakeX += box;
	if(dir == "up") snakeY -= box;
	if(dir == "down") snakeY += box;

	let new_head = {
		x: snakeX,
		y: snakeY,
	};

	eatTeal(new_head, snake);

	snake.unshift(new_head);

};

let game = setInterval(Otrisovka, k);


overlay.addEventListener('click', Close_modal);
btn_close.addEventListener('click', Close_modal);

