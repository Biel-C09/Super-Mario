const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine;
var world; 
var bg_Img;
var canvas;
var monster;
var monsterDead;
var slime;
var slimeDead
var mario;
var marioImg;
var invisibleGround1;
var invisibleGround2;
var invisibleGround3;
var invisibleGround4;
var invisibleEdge1;
var invisibleEdge2;
var edgePortal1;
var edgePortal2;
var laser;
var power;
var cloudsGroup;
var cloudImg;
var cloud;

var lives = 5;
var gamestate = "serve";

function preload(){
  bg_Img = loadImage("background.png");
  monster = loadAnimation("glob-monster1.png", "glob-monster2.png", "glob-monster3.png", "glob-monster4.png");
  monsterDead = loadImage("glob_monster_dead.png");
  tp1 = loadImage("poço.png");
  tp2 = loadImage("poço.png");
  laser = loadImage("laser.gif");
  marioImg = loadAnimation("mario-1.png", "mario-2.png");
  cloudImg = loadImage("cloud.png");
}

function setup() {
 canvas = createCanvas(1525,700);
 engine = Engine.create();
 world = engine.world;

 mario = createSprite(762,350);
 mario.addAnimation("runing", marioImg);
 mario.scale = 0.80;

 slime = createSprite(762,547);
 slime.addAnimation("running", monster);
 slime.scale = 7;
 slime.velocityX = -3

 slime.setCollider("circle",0,0,16)
 //slime.debug = true;

 portal1 = createSprite(100,582);
 portal1.addImage(tp1);
 portal1.scale = 0.50;
 portal1.setCollider("circle", 0,0,215);
 //portal1.debug = true;

 portal2 = createSprite(1423,582);
 portal2.addImage(tp2);
 portal2.scale = 0.50;
 portal2.setCollider("circle",0,0,215);
 //portal2.debug = true;

 power = createSprite(600,600);
 power.addImage(laser);
 power.visible = false;
 power.velocityX = 0;
 

 invisibleGround1 = createSprite(763,664,1525,70);
 invisibleGround1.visible = false;

 invisibleGround2 = createSprite(763,402,402,40)
 invisibleGround2.visible = false;

  mario.setCollider("circle",0,0,40);
  //mario.debug = true;

  invisibleGround3 = createSprite(99,630,155,10);
  invisibleGround3.visible = false;

  invisibleGround4 = createSprite(1424,630,155,10);
  invisibleGround4.visible = false;

  invisibleEdge1 = createSprite(1,350,2,700);
  invisibleEdge1.visible = false;

  invisibleEdge2 = createSprite(1524,350,2,700);
  invisibleEdge2.visible = false;

  edgePortal1 = createSprite(195,585,2,87);
  edgePortal1.visible = false;

  edgePortal2 = createSprite(1328,585,2,87);
  edgePortal2.visible = false;

  cloudsGroup = createGroup();
}

function draw() {
   background(bg_Img);
   Engine.update(engine);
   
  //mover mario com os botões
  if(keyDown("up_arrow")&& mario.y >= 570) {
    mario.velocityY = -23;
  }
  mario.velocityY = mario.velocityY +1
  
  
   if(keyDown("left_arrow")) {
    mario.x = mario.x -10
    text.visible = false;
  }
   
   if(keyDown("right_arrow")) {
    mario.x = mario.x +10
  }
  
  //invisible Grounds
  
  if(mario.isTouching(slime)){
    mario.x = 762;
    mario.y = 350;
  }
  
  if(mario.isTouching(invisibleGround3)) {
    mario.x = 1423;
    mario.y = 580;
  }

  if(mario.isTouching(invisibleGround4)) {
    mario.x = 99;
    mario.y = 580;
  }
  //slime
  if(slime.isTouching(portal1)) {
    slime.velocity.x = 2*3;
  }
  
  if(slime.isTouching(portal2)) {
    slime.velocity.x = -3*4;
  }

  if(mario.isTouching(slime)) {
    lifeover();
  }  
 
  //power
  if(keyDown("a")) {
    power.velocityX = -10;
    power.visible = true;
  }

    if(keyDown("d")) {
  power.velocityX = 10;
  power.visible = true;
 }

 spawnClouds();

 cloudsGroup.setLifetimeEach(-1);

 cloudsGroup.setVelocityXEach(-4);

 if(mario.isTouching(slime)) {
  lives = lives -1
}

mario.collide(invisibleGround1);
mario.collide(invisibleGround2);
mario.collide(invisibleEdge1);
mario.collide(invisibleEdge2);
mario.collide(edgePortal1);
mario.collide(edgePortal2);


 //textos
 
  textSize(20);
   fill('black')
  text("Use as setas para se mover, ",640,120);
  
  textSize(20);
  fill('black')
  text("aperte A para atirar para esquerda e",600,145);
  
  textSize(20);
  fill('black')
  text("aperte D para atirar para direita !!",620,170);
  
  textSize(20);
  fill("red");
  text("Vidas :  "+lives, 30,35)
  
  drawSprites()
}

function spawnClouds() {
  //escreva o código aqui para gerar as nuvens
  if (frameCount % 60 === 0) {
     cloud = createSprite(1590,250,40,10);
    cloud.y = Math.round(random(50,200));
    cloud.addImage(cloudImg);
    cloud.scale = 2;
    cloud.velocityX = -10;
    
     //atribuir tempo de vida à variável
    cloud.lifetime = 900;
    
    //ajustar a profundidade
    cloud.depth = mario.depth;
    mario.depth = mario.depth + 1;
    
    //adicionando nuvem ao grupo
   cloudsGroup.add(cloud);
  }
}

function lifeover() {
  lives = lives - 1;
  if(lives>=1) {
    gamestate = "serve";
  }
}
