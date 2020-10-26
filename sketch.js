var trex, trex_running, trex_collided;
var ground, ground_image, invisible_ground;
var clouds, cloudImage, cloudsGroup;
var obstacle, obstacleGroup, ob1, ob2, ob3, ob4, ob5, ob6;
var score = 0;
var bgColor = 180;
var PLAY = 1, END = 0, gameState = PLAY;
var gameOver, gameOverImage, restart, restartImage;

function preload(){
  trex_running =  loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = 
    loadImage("trex_collided.png");
  ground_image = 
  loadImage("ground2.png");
  cloudImage = loadImage("cloud.png");
  
  ob1 = loadImage("obstacle1.png");
  ob2 = loadImage("obstacle2.png");
  ob3 = loadImage("obstacle3.png");
  ob4 = loadImage("obstacle4.png");  
  ob5 = loadImage("obstacle5.png");
  ob6 = loadImage("obstacle6.png");  
  
  gameOverImage = loadImage("gameOver.png");
  restartImage = loadImage("restart.png");

}

function setup() {
  createCanvas(600,200);
  
  trex = createSprite(50,180,20,50);  
  trex.addAnimation("running", trex_running)
  trex.addAnimation("collided", trex_collided);
  trex.scale = 0.5;
 
  ground = createSprite(200,180,400,20);
  ground.addImage("ground", ground_image);
  ground.velocityX = -2;
  
  invisible_ground = createSprite(200,190,400,10);
  invisible_ground.visible = false;
  
  cloudsGroup = new Group();
  
  obstacleGroup = new Group();
  
  gameOver = createSprite(300,100);
  gameOver.addImage("gameOver", gameOverImage);
  gameOver.visible = false;
  gameOver.scale = 0.5;
  restart = createSprite(300,140);
  restart.addImage("restart", restartImage);
  restart.visible = false;
  restart.scale = 0.5;
}

function draw() {
  background(bgColor);
  
  console.log(gameState);
  
  text("Score: " + score, 500, 50);
  
  if(gameState === PLAY){
    
    //day & night mode
    if(score%100 === 0){
      bgColor = 50;
    }
    if(score%200 === 0){
      bgColor = 180;
    }
    
     score = score+Math.round(getFrameRate()/60);
    
     ground.velocityX = -(6 + 3*score/100);
  
    if(keyDown("space")){
     trex.velocityY = -10;
    }
  
     trex.velocityY = trex.velocityY + 0.8;

  
    if(ground.x<0){
     ground.x = ground.width/2;
    }
    
    spawnClouds();
    spawnObstacles();
    
    //End the game when trex is touching the obstacle
    if(obstacleGroup.isTouching(trex)){
      gameState = END;
    }
  }
  
  if(gameState === END){
    gameOver.visible = true;
    restart.visible = true;
    
    ground.velocityX = 0;
    trex.velocityY = 0;
    obstacleGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);
    
    trex.changeAnimation("collided", trex_collided );
    
    obstacleGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
    
    if(mousePressedOver(restart)) {
      reset();
    }
  }
  
  
    
  trex.collide(invisible_ground);
  
 
  
  drawSprites();
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    cloud = createSprite(600,120,40,10);
    cloud.y = Math.round(random(80, 120));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 200;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    //add each cloud to the group
    cloudsGroup.add(cloud);
  }
  
}

function reset(){
  gameState = PLAY;
  
  gameOver.visible = false;
  restart.visible = false;
  
  obstacleGroup.destroyEach();
  cloudsGroup.destroyEach();
  
  trex.changeAnimation("running", trex_running);
  
  score = 0;
  
}

function spawnObstacles() {
  if(frameCount % 60 === 0) {
    obstacle = createSprite(600,165,10,40);
    obstacle.velocityX = - (6 + 3*score/100);
    
    //generate random obstacles
    var rand = Math.round(random(1,6));
    
    switch(rand){
      case 1:obstacle.addImage(ob1);
      break;
      case 2:obstacle.addImage(ob2);
      break;
      case 3:obstacle.addImage(ob3);
      break;
      case 4:obstacle.addImage(ob4);
      break;
      case 5:obstacle.addImage(ob5);
      break;
      case 6:obstacle.addImage(ob6);
      break;
      default:break;
    }
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 100;
    //add each obstacle to the group
    obstacleGroup.add(obstacle);
  }
}


