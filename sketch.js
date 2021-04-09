var balloon;
var balloonImage1, balloonImage2;
var database;
var balloonPosition;

function preload()
{
   bg =loadImage("cityImage.png");

   balloonImage1=loadAnimation("hotairballoon1.png");
   balloonImage2=loadAnimation("hotairballoon1.png","hotairballoon1.png",
   "hotairballoon1.png","hotairballoon2.png","hotairballoon2.png",
   "hotairballoon2.png","hotairballoon3.png","hotairballoon3.png","hotairballoon3.png");
}


function setup() 
{
  createCanvas(1500, 700);
  database = firebase.database();

  balloon = createSprite(250, 250, 150, 150);
  balloon.addAnimation("hotAirBalloon", balloonImage1);
  balloon.scale = 0.5;

  balloonPosition = database.ref("balloon/position");
  balloonPosition.on("value", readPosition);
  
  
}


function draw() 
{
  background(bg);

  if(keyDown(LEFT_ARROW))
  {
    changePosition(-10, 0);
    balloon.addAnimation("hotAirBalloon", balloonImage2);
  }

  else if(keyDown(RIGHT_ARROW))
  {
    changePosition(+10, 0)
    balloon.addAnimation("hotAirBalloon", balloonImage2);
  }

  else if(keyDown(UP_ARROW))
  {
    changePosition(0, -10);
    balloon.addAnimation("hotAirBalloon", balloonImage2);
    balloon.scale = balloon.scale - 0.01;
  }

  else if(keyDown(DOWN_ARROW))
  {
    changePosition(0, +10);
    balloon.addAnimation("hotAirBalloon", balloonImage2);
    balloon.scale = balloon.scale + 0.01;
  }

  drawSprites();
  fill(0);
  stroke("white");
  textSize(25);
  text("Use the arrow keys to move the hot air balloon!", 40, 40);
}

function readPosition(data)
{
  position = data.val();
  balloon.x = position.x;
  balloon.y = position.y;
}

function changePosition(x,y)
{
  database.ref("balloon/position").set(
    {
    "x": position.x + x,
    "y": position.y + y
    }
  )
}



