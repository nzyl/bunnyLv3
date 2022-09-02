const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var rope,fruit,ground;
var fruit_con;
var fruit_con_2;
var fruit_con_3;

var bg_img;
var food;
var rabbit;

var button,button2,button3,blower;
var bunny;
var blink,eat,sad;
var mute_btn;

var fr,rope2,rope3;

var bk_song;
var cut_sound;
var sad_sound;
var eating_sound;
var air;
var canW;
var canH;

function preload()
{
  bg_img = loadImage('background.png');
  food = loadImage('melon.png');
  rabbit = loadImage('Rabbit-01.png');

  bk_song = loadSound('sound1.mp3');
  sad_sound = loadSound("sad.wav")
  cut_sound = loadSound('rope_cut.mp3');
  eating_sound = loadSound('eating_sound.mp3');
  air = loadSound('air.wav');

  blink = loadAnimation("blink_1.png","blink_2.png","blink_3.png");
  eat = loadAnimation("eat_0.png" , "eat_1.png","eat_2.png","eat_3.png","eat_4.png");
  sad = loadAnimation("sad_1.png","sad_2.png","sad_3.png");
  
  blink.playing = true;
  eat.playing = true;
  sad.playing = true;
  sad.looping= false;
  eat.looping = false; 
}

function setup() {
  var isMobile=/iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  
  if(isMobile){
    canW=displayWidth;
    canH=displayHeight;
    createCanvas(canW+80,canH);
  }
  else{
    canW=windowWidth;
    canH=windowHeight;
    createCanvas(canW,canH);
  }

  frameRate(80);

  bk_song.play();
  bk_song.setVolume(0.5);

  engine = Engine.create();
  world = engine.world;
  
  button = createImg('cut_btn.png');
  button.position(50,30);
  button.size(50,50);
  button.mouseClicked(drop);

  button2 = createImg('cut_btn.png');
  button2.position(300,25);
  button2.size(50,50);
  button2.mouseClicked(drop2);

  button3 = createImg('cut_btn.png');
  button3.position(330,150);
  button3.size(50,50);
  button3.mouseClicked(drop3);

  mute_btn = createImg('mute.png');
  mute_btn.position(400,20);
  mute_btn.size(50,50);
  mute_btn.mouseClicked(mute);
  
  rope = new Rope(7,{x:70,y:30});

  rope2 = new Rope(7,{x:320,y:25});

  rope3 = new Rope(5,{x:350,y:150});

  ground = new Ground(canW/2,canH-10,canW,20);

  blink.frameDelay = 20;
  eat.frameDelay = 20;

  var r=Math.round(random(10,600));

  bunny = createSprite(r,canH-100,100,100);
  bunny.scale = 0.2;

  bunny.addAnimation('blinking',blink);
  bunny.addAnimation('eating',eat);
  bunny.addAnimation('crying',sad);
  bunny.changeAnimation('blinking');
  
  fruit = Bodies.circle(300,300,20);
  Matter.Composite.add(rope.body,fruit);

  fruit_con = new Link(rope,fruit);
  fruit_con2 = new Link(rope2,fruit);
  fruit_con3 = new Link(rope3,fruit);

  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)
  
}

function draw() 
{
  background(51);
  image(bg_img,0,0,canW,canH);

  push();
  imageMode(CENTER);
  if(fruit!=null){
    image(food,fruit.position.x,fruit.position.y,70,70);
  }
  pop();

  rope.show();
  rope2.show();
  rope3.show();

  Engine.update(engine);
  ground.show();

  drawSprites();

  if(collide(fruit,bunny)==true)
  {
    bunny.changeAnimation('eating');
    eating_sound.play();
  }


  if(fruit!=null && fruit.position.y>=canH-40)
  {
    gameOver();
    bunny.changeAnimation('crying');
    bk_song.stop();
    sad_sound.play();
    fruit=null;
    
   }
   
}

function drop()
{
  cut_sound.play();
  rope.break();
  fruit_con.detach();
  fruit_con = null; 
}

function collide(body,sprite)
{
  if(body!=null)
        {
         var d = dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y);
          if(d<=80)
            {
              World.remove(engine.world,fruit);
               fruit = null;
               return true; 
            }
            else{
              return false;
            }
         }
}


function mute()
{
  if(bk_song.isPlaying())
     {
      bk_song.stop();
     }
     else{
      bk_song.play();
     }
}

function drop2(){
  cut_sound.play();
  rope2.break();
  fruit_con2.detach();
  fruit_con2 = null; 
}


function drop3(){
  cut_sound.play();
  rope3.break();
  fruit_con3.detach();
  fruit_con3 = null; 
}

function gameOver() {
  swal(
    {
      title: `Game Over!!!`,
      text: "Thanks for playing!!",
      imageUrl:
        "https://media.us1.twilio.com/MEd69a60adc2b92422dc72cbbb3182f046?Expires=1662087420&Signature=GdXz~HVjk5cu~~tdO36Ey61zj3cq-2Nwy4aRFYZlCQefavyoHk-qP7BgdAIzdJ4U8PbMkkxXFUKrJXb~m8HJ6QlmNy~eGvQCrUBKNDAiNYtyA~4k38-u~9Z0xl4p-cc3TLadxQdzaF6b68q2C5isXBIQDV0sGRZ4woP2hs7PQTxOeMCrHV2tfZFOF5l4Tg-xdiPEdhENO06yxJdNWFg1zQ7~k929sNVwEQlL8DWszbW3qcQlmq9pliI1vjBIfWSDWG~wiog2Avjsx3hOddMScXAWhv5HWfW7wmSEQWal7xPPsPYSpVl-uYm7q~Zv-gktCuJZMRxNla1YaiGvA7~6TQ__&Key-Pair-Id=APKAJWF6YVTMIIYOF3AA",
      imageSize: "150x150",
      confirmButtonText: "Play Again"
    },
    function(isConfirm) {
      if (isConfirm) {
        location.reload();
      }
    }
  );
}