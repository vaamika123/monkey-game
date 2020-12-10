var gameState = "play";
var monkey , monkey_running;
var bananaImage, obstacleImage;
var FoodGroup, obstacleGroup;
var score = 0;
var ground,invisiableground;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
 
}

function setup() {
  createCanvas(400, 400);
  
  monkey = createSprite(80,315,20,20);
  monkey.addAnimation("running" ,monkey_running);
  monkey.scale = 0.1;
  
  ground = createSprite(400,350,600,5);
  ground.velocityX = -4;
  ground.x= ground.width/2;
  ground.visible = true;
  
  invisiableground =createSprite(300,350,600,5);
  invisiableground.visible = false;
  
  obstacleGroup = new Group();
  bananaGroup = new Group();
  
}


function draw() {
  background(220);
             
  stroke("white");
  textSize(20);
  fill("black");
  text("score: "+score,300,100);
  
  if (gameState === "play"){
  
  ground.velocityX = -2;
  if(ground.x < 0){
    ground.x = ground.width/2;
  }
  
  console.log(monkey.y)
  if(keyDown("space")&& monkey.y >= 315){
    monkey.velocityY = -12
  }
  
  //add gravity
  monkey.velocityY = monkey.velocityY + 0.5 ; 
    
    
  if(monkey.isTouching(bananaGroup)){
    
    score = score +1;
    bananaGroup.destroyEach()
  }  
  
  if(monkey.isTouching(obstacleGroup)){
    gameState = "end";
    obstacleGroup.destroyEach();
    bananaGroup.destroyEach();
    obstacleGroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0);
    
  }
  }
    
    if(gameState==="end"){
      
    ground.destroy();  
    monkey.destroy();  
    obstacleGroup.destroyEach();
    bananaGroup.destroyEach();
    obstacleGroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0);  
    
    text("Gameover", 150,200)
    textSize(35);
    
    
  }
  
  monkey.collide(invisiableground)
  obstacles10();
  
  drawSprites()
}

function obstacles10(){
  
  if(frameCount% 100===0){
  
  var obst = createSprite(400,330,20,20);
  obst.addImage(obstaceImage)
  obst.lifetime = 100;
  obst.velocityX = -4;
  obst.scale= 0.1;
    
  var banana =createSprite(0,Math.round(random(200,250)),20,20);
  banana.addImage(bananaImage);
  banana.lifetime =100;
  banana.velocityX = obst.velocityX;
  banana.x = obst.x;
  banana.scale = 0.1;
    
  bananaGroup.add(banana);
  obstacleGroup.add(obst);
  }
  
}






