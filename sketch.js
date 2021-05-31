const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var box1, cash1,cash3;
var backgroundImg,platform;
var hero, slingshot;

var gameState = "onSling";
var bg = "sprites/bg1.png";
var score = 0;

function preload() {
    getBackgroundImg();
}

function setup(){
    var canvas = createCanvas(1200,600);
    engine = Engine.create();
    world = engine.world;


    ground = new Ground(600,height,1200,20);
    platform = new Ground(150, 505, 300, 170);

    box1 = new Box(700,320,70,70);
    box2 = new Box(920,320,70,70);
    box3 = new Box(700,240,70,70);
    box4 = new Box(920,240,70,70);
    box5 = new Box(920,160,70,70);
    box6 = new Box(700,160,70,70);
    box7 = new Box(810,80,70,70);

    log1 = new Log(810,260,300, PI/2);
    log3 =  new Log(810,180,300, PI/2);
    log4 =  new Log(810,100,300, PI/2);
    log5 = new Log(760,80,150, PI/7);
    log6 = new Log(870,80,150, -PI/7);

    cash1 = new Pig(810, 350);
    cash4=new Pig(810,125);
    cash3 = new Pig(810, 220);

    hero = new Bird(200,300);

    //log6 = new Log(230,180,80, PI/2);
    slingshot = new SlingShot(hero.body,{x:200, y:250});
}

function draw(){
    if(backgroundImg)
        background(backgroundImg);
    
        noStroke();
        textSize(35)
        fill("white")
        text("Score  " + score, width-300, 50)
    
    Engine.update(engine);
    //strokeWeight(4);
    box1.display();
    box2.display();
    box3.display();
    box4.display();
    box5.display();
    box6.display();
    box7.display();

    cash1.display();
    cash1.score();
    cash3.display();
    cash3.score();
    cash4.display();
    cash4.score();

    log1.display();
    log3.display();
    log4.display();
    log5.display();
    log6.display();
    
    ground.display();
    hero.display();
    platform.display();
    //log6.display();
    slingshot.display();    
}

function mouseDragged(){
    //if (gameState!=="launched"){
        Matter.Body.setPosition(hero.body, {x: mouseX , y: mouseY});
    //}
}


function mouseReleased(){
    slingshot.fly();
    gameState = "launched";
}

function keyPressed(){
    if(keyCode === 32){
        hero.trajectory=[]
        Matter.Body.setPosition(hero.body,{x:200,y:50})
       slingshot.attach(hero.body);
    }
}

async function getBackgroundImg(){
    var response = await fetch("http://worldtimeapi.org/api/timezone/Asia/Kolkata");
    var responseJSON = await response.json();

    var datetime = responseJSON.datetime;
    var hour = datetime.slice(11,13);
    
    if(hour>=0600 && hour<=1900){
        bg = "sprites/bg1.png";
    }
    else{
        bg = "sprites/bg2.jpg";
    }

    backgroundImg = loadImage(bg);
    console.log(backgroundImg);
}