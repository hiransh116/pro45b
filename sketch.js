var aprochingMosquitos,fearedMosquitos,can,aprochingMosquitosImg,fearedMosquitosImg,canImg;
var spray,sprayImg;
var count=0;
var sprayGroup;
var aprochingMosquitosGroup;
var edges;
var visibility=255;
var cityImg,city;
var life=10;
var strongMosquito,strongMosquitoImg;
var strongMosquitoGroup;
var scientist,scientistImg;
var speechBubble,speechBubbleImg;
var heart,heartImg;


function preload(){
 aprochingMosquitosImg=loadImage('aproching mosquito.png');
 fearedMosquitosImg=loadImage('fearing mosquitoes.png');
 sprayImg=loadImage('spray1.png');
 canImg=loadImage('canimg.png');
 cityImg=loadImage('cityImg.jpg');
 strongMosquitoImg=loadImage('strong mosquitoes.png');
 scientistImg=loadImage('scientistImg.png');
 speechBubbleImg=loadImage('speech bubble.png');
 heartImg=loadImage('heart.png');


}
function setup() {
  createCanvas(displayWidth,displayHeight-120);
  
  can=createSprite(200,200);
 can.addImage('c',canImg);
 can.scale=0.4;
 can.velocityY=0;
 can.visible=false;
 sprayGroup=new Group();
 aprochingMosquitosGroup=new Group();
 strongMosquitoGroup= new Group();
 scientist=createSprite(200,500);
 scientist.addImage('scientist',scientistImg);

 speechBubble=createSprite(scientist.x+250,scientist.y-150);
 speechBubble.addImage('speech',speechBubbleImg);
 heart=createSprite(85,90);
 heart.addImage('heart',heartImg);
 heart.scale=0.6;



}

function draw() {
  background(cityImg); 
 edges= createEdgeSprites();
 can.collide(edges);
  can.velocityY=0;
  if(keyWentDown('space')){
    var spray=createSprite(can.x+13,can.y-68);
    spray.x=can.x+13;
    spray.y=can.y-68;
   spray.addImage('s',sprayImg);
   spray.scale=0.7;
  sprayGroup.add(spray);
   }
    if(keyWentUp('space')){
      sprayGroup.destroyEach();
    }
   if(keyDown(UP_ARROW)){
    can.velocityY=-7;
    
  }
  if(keyDown(DOWN_ARROW)){
    can.velocityY=7;  
  }
 
   
  for(var i=0;i<aprochingMosquitosGroup.length;i++){
    
    if(aprochingMosquitosGroup.get(i)!==null && sprayGroup.isTouching(aprochingMosquitosGroup)){
     count=count+5;
     aprochingMosquitosGroup.get(i).destroy();
    }
 } 
    for(var o=0;o<strongMosquitoGroup.length;o++){
      if(strongMosquitoGroup.get(o)!==null&& sprayGroup.isTouching(strongMosquitoGroup)){
         count=count+20;
         strongMosquitoGroup.get(o).destroy();
      }
    }
   for( var h=0;h<aprochingMosquitosGroup.lenght;h++){
     if(aprochingMosquitosGroup.get(i)!==null&&aprochingMosquitosGroup.isTouching(edges[0])){
       life=life-1;
     }
   }
   for( var k=0;k<strongMosquitoGroup.lenght;k++){
    if(strongMosquitoGroup.get(i)!==null&&strongMosquitoGroup.isTouching(edges[0])){
      life=life-2;
    }
  }

   
 
  textSize(36);
  fill('red');
  text('score:'+count,770,100);


  textSize(36);
  text(':'+life,120,100);
  drawSprites();
  if(frameCount<125){
    textSize(20);
    text('city has been infected by mosquitoes',speechBubble.x-130,speechBubble.y-140);
  }else if(frameCount>125&&frameCount<250){
    textSize(20);
    text('use the spray to kill mosquitoes',speechBubble.x-130,speechBubble.y-110);
  }else if(frameCount>250&&frameCount<375){
    textSize(20);
    text('use up and down arrow to move and space to spray',speechBubble.x-190,speechBubble.y-80);
  }else if(frameCount>375){
    scientist.visible=false;
    speechBubble.visible=false;
    can.visible=true;
    spawnMosquitos();
  }

 // spawnMosquitos();

}

function spawnMosquitos(){
  if(frameCount%100===0){
  var aprochingMosquitos=createSprite(displayWidth,random(1,520));
  aprochingMosquitos.velocityX=- (6 + 3*count/200);
  aprochingMosquitos.addImage('m',aprochingMosquitosImg);
  aprochingMosquitos.addImage('a',fearedMosquitosImg);
  aprochingMosquitos.scale=0.3;
  aprochingMosquitos.lifetime=800;
  aprochingMosquitos.depth=can.depth;
  can.depth = can.depth+1;
  aprochingMosquitosGroup.add(aprochingMosquitos);
  }
  if(frameCount%250===0){
    var strongMosquito=createSprite(displayWidth,random(1,520));
    strongMosquito.addImage('s',strongMosquitoImg);
    strongMosquito.velocityX=- (6 + 3*count/150);
    strongMosquito.scale=0.6;
    strongMosquito.lifetime=800;
    strongMosquito.depth=can.depth;
    strongMosquito.depth=strongMosquito.depth+1;
    strongMosquitoGroup.add(strongMosquito);
  }
}

  
  

