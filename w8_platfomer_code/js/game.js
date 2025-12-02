
var c = document.querySelector(`canvas`)
var ctx = c.getContext(`2d`)
var fps = 1000/60
var timer = setInterval(main, fps)

function main()
{
    ctx.clearRect(0,0,c.width,c.height); 
    state()
}

//setup
var state;
var button = new GameObject();
var avatar = new GameObject();
var ground = new GameObject();
var platform = new GameObject();
var wall = new GameObject();
var level = new GameObject();
var platform2 = new GameObject();
var walltwo = new GameObject();
var platform3 = new GameObject();
var platform4 = new GameObject();
var winnerplatform = new GameObject();
var button2 = new GameObject();
var button3 = new GameObject();


function init()
{
    state = menu
avatar.setImage ("#player")
    avatar.color = `green`;

    level.x = 0; 
    level.y = 0;

    ground.color = `crimson`;
    ground.w = c.width;
    ground.h = c.height*.25;
    ground.y = c.height - ground.h/2;
    ground.world = level

    platform.w = 200;
    platform.h = 34;
    platform.color = `blue`
    platform.x = 200;
    platform.y = 100;
    platform.world = level

    wall.h = 1000000;
    wall.w = 30;
    wall.color = `orange`
    wall.x = 800;
    wall.y = 800;
    wall.world = level

    platform2.w = 200;
    platform2.h = 34;
    platform2.color = 'gold'
    platform2.x = 300;
    platform2.y = -150;
    platform2.world = level

    walltwo.h = 1000000;
    walltwo.w = 30;
    walltwo.color = `silver`
    walltwo.x = 15;
    walltwo.y = 500;
    walltwo.world = level

    platform3.w = 200;
    platform3.h = 34;
    platform3.color = 'gray'
    platform3.x = 600;
    platform3.y = -400;
    platform3.world = level

    platform4.w = 200;
    platform4.h = 34;
    platform4.color = 'purple'
    platform4.x = 700;
    platform4.y = -650;
    platform4.world = level

    winnerplatform.w = 200;
    winnerplatform.h = 34;
    winnerplatform.color = 'green'
    winnerplatform.x = 400;
    winnerplatform.y = -900;
    winnerplatform.world = level

}

init();

/*---------------Game Screens (states)----------------*/
function menu()
{
    if(clicked(button))
    {
        state = game;
        button.clicked = false;
    }
 button.render()
    ctx.font = "26px Aerial"
    ctx.fillStyle = "white"
    ctx.fillText("START",362,256)
    
   
}

function win()
{
    if(clicked(button2))
    {
        state = game;
        button2.clicked = false;
        avatar.x = 500;
        avatar.y = 1150;
    }

    button2.render()
    ctx.font = "20px Aerial"
    ctx.fillStyle = "white"
    ctx.fillText("Play again?",356,256)

}
function lose()
{
if(clicked(button3))
    {
        state = game;
        button3.clicked = false;
        avatar.x = 500;
        avatar.y = 100;
    }
    button3.render()
    ctx.font = "20px Aerial"
    ctx.fillStyle = "white"
    ctx.fillText("Try again?",357,256)
}

function game()
{
    if(sp == true && avatar.canJump == true)
    {
        avatar.canJump = false;
        avatar.vy = -25;
    }

    if(a == true)
    {
        avatar.vx += -1;
    }
    if(d == true)
    {
        avatar.vx += 1;
    }

    avatar.vx *= .85;
    avatar.vy += 1;
    avatar.move();

    //used to move the level. 
    var offset = {x:avatar.vx, y:avatar.vy}

    while(ground.isOverPoint(avatar.bottom()))
    {
        avatar.vy = 0;
        avatar.y--;
        offset.y--;
        avatar.canJump = true;
    }
    while(platform.isOverPoint(avatar.bottom()) && avatar.vy >= 0)
    {
        avatar.vy = 0;
        avatar.y--;
        offset.y--;
        avatar.canJump = true;
    }
      while(platform2.isOverPoint(avatar.bottom()) && avatar.vy >= 0)
    {
        avatar.vy = 0;
        avatar.y--;
        offset.y--;
        avatar.canJump = true;
    }
    while(wall.isOverPoint(avatar.right()) && avatar.vx >= 0)
    {
        avatar.vx = 0;
        avatar.x--;
        offset.x--;
        state = lose;
    }
 
    while(platform3.isOverPoint(avatar.bottom()) && avatar.vy >= 0)
    {
        avatar.vy = 0;
        avatar.y--;
        offset.y--;
        avatar.canJump = true;
    }
  
    while(walltwo.isOverPoint(avatar.left()) && avatar.vx <= 0)
    {
        avatar.vx = 0;
        avatar.x++;
        offset.x++;
        state = lose;
    }

while(platform4.isOverPoint(avatar.bottom()) && avatar.vy >= 0)
    {
        avatar.vy = 0;
        avatar.y--;
        offset.y--;
        avatar.canJump = true;
    }

    while(winnerplatform.isOverPoint(avatar.bottom()) && avatar.vy >= 0)
    {
        avatar.vy = 0;
        avatar.y--;
        offset.y--;
        avatar.canJump = true;
        state = win;
    }


    /*-------Level movement threshold----*/
    //if(avatar.x > 500 || avatar.x < 300)
    //{
        //Level movement code
        //level.x -= offset.x;
        //avatar.x -= offset.x;
        //level.y -= offset.y;
        //avatar.y -= offset.y;
    //}

    //
        var dx = c.width/2 - avatar.x
        var dy = c.height/2 - avatar.y
        
        level.x += dx*.05; 
        avatar.x += dx*.05; 
        level.y += dy*.15; 
        avatar.y += dy*.15; 
    //
    

    ground.render();
    platform.render();
    wall.render();
    avatar.graphic();
    platform2.render();
    walltwo.render();
    platform3.render();
    platform4.render();
    winnerplatform.render();
    
}



