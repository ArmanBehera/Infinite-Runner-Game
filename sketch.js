var monkey , monkey_running, monkey_stop;
var banana ,bananaImage1, bananaImage2, obstacle, obstacleImage1;
var foodGroup, obstacleGroup;
var score;
var survivalTime = 0;
var ground;

// Defining game states
var PLAY = 1;
var END = 0;
var gameState = PLAY;

var bg;

function preload(){
  
  // Loading the animation of the monkey
  monkey_running = loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  // Loading imaage of the banana
  bananaImage1 = loadImage("banana.png");
  bananaImage2 = loadImage("banana2.png");

  // Loading image of obstacle
  obstacleImage1 = loadImage("Rock1.png");

  // Loading the image of the background
  bg = loadImage("background.jpg");

  monkey_stop = loadImage("sprite_0.png");

}

function setup() {
  
  canvas = createCanvas(displayWidth, displayHeight - 100);
  
  // Creating a new food and banana group
  foodGroup = new Group();
  obstacleGroup = new Group();
  
  monkey = createSprite(0, 330);
  monkey.addAnimation("monkeyRunning", monkey_running);
  monkey.velocityX = 4;
  monkey.scale = 0.2;
  
  ground = createSprite(displayWidth / 2, displayHeight - 300, 20000, 10);
  ground.velocityX = -3;
  ground.shapeColor = "green";

}

function draw() {
  
  // console.log(monkey.y);
  background(bg);
  monkey.collide(ground);

  camera.position.x = monkey.x + 300;
  camera.position.y = 230;
  
  if (gameState === PLAY){
    
  // Updating the survival time
  survivalTime = Math.ceil(frameCount / frameRate());
    
    if (keyDown("space") && monkey.y > 430){
    
      monkey.velocityY = -20;
    }
    
    food();
    obstacles();
    
    // if monkey touches the banana group
    if (monkey.isTouching(foodGroup)){
    
      foodGroup.destroyEach();
      survivalTime += 1;
      
    }
    
    // If monkey touches the obstacle group
    if (monkey.isTouching(obstacleGroup)){
      
      gameState = END;
    
      textSize(20);
      fill("red");
      textFont("Algerian");
      text("You finished the game!!", displayWidth - 800, 200);

    }
  }
  // If the game finishes
  if (camera.position.x > 19000){

    monkey.velocityX = 0;
    textSize(20);
    text("You finished the game!!", camera.position.x, camera.position.y);
    
  }
  
  if (gameState === END){
    
    monkey.velocityX = 0;

    obstacleGroup.setVelocityXEach(0);
    foodGroup.setVelocityXEach(0);
    
    ground.velocityX = 0;
    
    obstacleGroup.setLifetimeEach(-1);
    foodGroup.setLifetimeEach(-1);
    
    survivalTime = survivalTime;
    
    textSize(40);
    fill("red");
    textFont("Algerian");
    text("Game Over!!", camera.position.x - 200, camera.position.y - 100);

    // Displaying the survival time
    text("Survival Time : " +survivalTime, camera.position.x - 200, camera.position.y);

  }
  
  // Assigning gravity effect to the monkey
  monkey.velocityY += 0.8;

  drawSprites();
}

function food(){
  
  if (camera.position.x % 300 === 0){
    
    banana = createSprite(camera.position.x + 500, displayHeight - 300);
    
    // Creating a random number for the y axis of the banana
    var rand1 = Math.round(random(displayHeight - 800, displayHeight - 600));
    banana.y = rand1;
    
    // Creating a radnom number for the assigning of the images
    var rand2 = Math.round(random(1, 2));

    if (rand2 === 1){

      banana.addImage(bananaImage1);
      banana.scale = 0.1;
    }

    else if(rand2 === 2){

      banana.addImage(bananaImage2);
      banana.scale = 0.05;
    }

    banana.lifetime = 600;
    banana.velocityX = -5;
       
    foodGroup.add(banana);
  }
  
}

function obstacles(){
  
  if (camera.position.x % 500 === 0){
    
    // Creating a obstacle sprite
    obstacle = createSprite(camera.position.x + 500, displayHeight - 340);

    // Adiing image to the obstacle
    obstacle.addImage(obstacleImage1);
    obstacle.scale = 0.06;

    // Giving lifetime for despawning
    obstacle.lifetime = 150;

    // Giving velocity to the obstacle
    obstacle.velocityX = -4;
    obstacleGroup.add(obstacle);
  }
  
}