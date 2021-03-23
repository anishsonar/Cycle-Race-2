var path,mainCyclist, obstacle1, obstacle2, obstacle3, gameOver, opponent1,opponent2,opponent3 ; 
var pathImg,mainRacerImg1,mainRacerImg1, obstacle1Img, obstacle2Img, obstacle3Img, gameOverImg, opponent1Img1, opponent1Img2, opponent2Img1, opponent2Img2, opponent3Img1, opponent3Img2;
var cycleBell;

var END =0;
var PLAY =1;
var gameState = PLAY;
var select_Sprites;
var distance=0;

function preload(){
  pathImg = loadImage("images/Road.png");
  mainRacerImg1 = loadAnimation("images/mainPlayer1.png","images/mainPlayer2.png");
  mainRacerImg2= loadAnimation("images/mainPlayer3.png");
  
opponent1Img1 = loadAnimation("opponent1.png","opponent2.png");
//opponent1Img2 = loadAnimation("opponent3.png");
opponent1Img2 = loadImage("opponent3.png");
opponent2Img1 = loadAnimation("opponent4.png","opponent5.png");
//opponent2Img2 = loadAnimation("opponent6.png");
opponent2Img2 = loadImage("opponent6.png");
opponent3Img1 = loadAnimation("opponent7.png","opponent8.png");
opponent3Img2 = loadAnimation("opponent9.png");
opponent3Img2 = loadImage("opponent9.png"); 
      
obstacle1Img = loadImage("obstacle1.png");
obstacle2Img = loadImage("obstacle2-1.png");
obstacle3Img = loadImage("obstacle3-1.png");
gameOverImg = loadImage("gameover.png");
cycleBell = loadSound("sound/bell.mp3");
  
}

function setup(){
  
createCanvas(500,300);
  
// Moving background
path=createSprite(100,150);
path.addImage(pathImg);


//creating boy running
mainCyclist  = createSprite(180,150,20,20);
mainCyclist.addAnimation("SahilRunning",mainRacerImg1);
mainCyclist.scale=0.07;

  obstacle1G = new Group();
  obstacle2G = new Group();
  obstacle3G = new Group();
  opponent1G = new Group();
  opponent2G = new Group();
  opponent3G = new Group();
}

function draw() {
  background(0);
  drawSprites();
  
  textSize(20);
  fill(255);
  text("Distance: "+ distance,350,30);
  
  if(gameState===PLAY){

   mainCyclist.y = World.mouseY;
  
   edges= createEdgeSprites();
   mainCyclist.collide(edges);
   mainCyclist.setCollider("rectangle",0,0,50,50);
  //code to reset the background
    
  if(path.x < 0 ){
    path.x = width/2;
  }
  frameRate(40) ;
distance=distance + Math.round  (getFrameRate()/40);
path.velocityX = -(6+2*distance/150);
  
    
    
    if (frameCount % 100 == 0){
  select_Sprites = Math.round(random(1,6)) ;
     createObstacle1();
     createObstacle2();
     createObstacle3();
      createOpponent1();
      createOpponent2();
      createOpponent3();
    }

    
   if(keyDown("SPACE")){
     cycleBell.play() ;  
   }    
    
if (mainCyclist.isTouching(opponent1G)) {
cycleBell.play() ;
opponent1.addAnimation("Opponent1",opponent1Img2);    
}
    
if (opponent2G.isTouching(mainCyclist)) {
cycleBell.play() ;
opponent2.addAnimation("Opponent2",opponent2Img2);    
}
if (opponent3G.isTouching(mainCyclist)) {
cycleBell.play() ;
opponent3.addAnimation("Opponent3",opponent3Img2);   
}

    if (obstacle1G.isTouching(mainCyclist)) {
      mainCyclist.addAnimation("SahilRunning",mainRacerImg2);
        obstacle1G.destroyEach();
        obstacle2G.destroyEach();
        obstacle3G.destroyEach();
        gameState = END;
    }
      
      if (obstacle2G.isTouching(mainCyclist)) {
         mainCyclist.addAnimation("SahilRunning",mainRacerImg2);
        obstacle1G.destroyEach();
        obstacle2G.destroyEach();
        obstacle3G.destroyEach();
        gameState = END;
    }
      
    if (obstacle3G.isTouching(mainCyclist)) {
       mainCyclist.addAnimation("SahilRunning",mainRacerImg2);  
      obstacle1G.destroyEach();
        obstacle2G.destroyEach();
        obstacle3G.destroyEach();
        gameState = END;
    }
 }
  
   if(gameState === END){
    gameOver = createSprite(250,150,20,20);
    gameOver.addImage(gameOverImg);
    path.velocityX = 0;
     
   }    
  
  if(keyDown("UP_ARROW")){
     RESET() ;  
  } 
  
}

function createObstacle1(){
  if(select_Sprites == 1){
 obstacle1 = createSprite (490,random(50,270),20,20);
 obstacle1.addImage(obstacle1Img) ;
 obstacle1.scale = random (0.1, 0.12) ;
 obstacle1.velocityX = -(6+2*distance/150);
 obstacle1.setLifetime = 100;
 obstacle1G.add(obstacle1);
  }
}

function createObstacle2(){
  if(select_Sprites == 2){
 obstacle2 = createSprite (490, random (50,270),20,20);
 obstacle2.addImage(obstacle2Img) ;
 obstacle2.scale = random (0.1, 0.12) ;
 obstacle2.velocityX = -(6+2*distance/150);
 obstacle2.setLifetime = 100;
 obstacle2G.add(obstacle2);
  }
}
function createObstacle3(){
  if(select_Sprites == 3){
 obstacle3 = createSprite (490, random (50,270),20,20);
 obstacle3.addImage(obstacle3Img) ;
 obstacle3.scale = random (0.1, 0.12) ;
 obstacle3.velocityX = -(6+2*distance/150);
 obstacle3.setLifetime = 100;
 obstacle3G.add(obstacle3);
  }
}

function createOpponent1(){
  if(select_Sprites == 4){
opponent1 = createSprite (490, random (50,270),20,20);
opponent1.addAnimation("Opponent1",opponent1Img1,opponent1Img2 );
opponent1.scale=0.07;
 opponent1.velocityX = -(6+1*distance/150);
 opponent1.setLifetime = 100;
 opponent1G.add(opponent1);
  }
}

function createOpponent2(){
  if(select_Sprites == 5){
opponent2 = createSprite (490, random (50,270),20,20);
opponent2.addAnimation("Opponent2",opponent2Img1,opponent2Img2 );
opponent2.scale=0.07;
 opponent2.velocityX = -(6+1*distance/150);
 opponent2.setLifetime = 100;
 opponent2G.add(opponent2);
  }
}

function createOpponent3(){
  if(select_Sprites == 6){
opponent3 = createSprite (490, random (50,270),20,20);
opponent3.addAnimation("Opponent3",opponent3Img1,opponent3Img2 );
opponent3.scale=0.07;
 opponent3.velocityX = -(6+1*distance/150);
 opponent3.setLifetime = 100;
 opponent3G.add(opponent3);
  }
}

function RESET(){
 gameState = PLAY; 
 gameOver.visible = false;
 mainCyclist.addAnimation("SahilRunning",mainRacerImg1);
 distance=0;
}
