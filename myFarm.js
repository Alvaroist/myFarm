var canvas = document.getElementById("canvas");
var backgroundCanva = canvas.getContext("2d");

var pictures = [];
    pictures["cow"]= "images/vaca.png";
    pictures["pig"]= "images/cerdo.png";
    pictures["chicken"]= "images/pollo.png";

var background ={
  image: new Image(),
  url:"images/farm.png",
  load: false
};

background.image.src=background.url;

var arrowKey={ 
  UP: 38,
  DOWN: 40,
  LEFT: 37,
  RIGHT: 39,
  CTRL: 17
};

var positionX = [];
var positionY = [];
var pointer = 0;
var animals=[];

var quantityOfanimals = random(1,10);

class farmAnimal{
  constructor(n,id){
    this.name=n;
    this.image=new Image();
    this.image.src=pictures[this.name];
    this.idAnimal=id;
  }
  showFarmAnimal(x,y) {
    backgroundCanva.drawImage(this.image,x,y);
  }
}

for(var i=1; i<= quantityOfanimals; i++){
  if (i%2==0){
    animals.push(new farmAnimal("cow",i));
  }else{
    animals.push(new farmAnimal("pig",i));
  }
}
console.log(quantityOfanimals);

background.image.addEventListener("load",loadBackground);
addEventListener("keyup",selectPicture);

function selectPicture(keyUp){
  var distance=15;
  console.log(keyUp.keyCode);
  switch (keyUp.keyCode){
    case arrowKey.UP:
      if (positionY[pointer]-distance >=0){
        positionY[pointer]-=distance;
      }
      layUpImage();
      break;
    case arrowKey.DOWN:
      if(positionY[pointer]+distance <=420){
        positionY[pointer]+=distance;
      }
      layUpImage();
      break;
    case arrowKey.LEFT:
      if(positionX[pointer]-distance >=0){
        positionX[pointer]-=distance;
      }
      layUpImage();
      break;
    case arrowKey.RIGHT:
      if(positionX[pointer]+distance <= 420){
        positionX[pointer]+=distance;
      }
      layUpImage();
      break;
    case arrowKey.CTRL:
      pointer +=1;
      layUpImage();
      break;
  }
}

function loadBackground(){
  background.load=true;
  layUpImage();
}

function layUpImage(){
  if(background.load == true){//It draws the background
    backgroundCanva.drawImage(background.image,0,0);
  }
  var i=0;
  if(positionX.length==0){//ramdomly shows the animal pictures
    for(var animal of animals){
      var x=random(0,420);
      positionX[i]=x;
      var y=random(0,420);
      positionY[i]=y;
      animal.showFarmAnimal(x,y);
      i+=1;
    }
    console.log(positionX);
  }else{//shows the current position of every picture
    var j=0;
    for(let animal of animals){
      animal.showFarmAnimal(positionX[j],positionY[j]);
      j+=1;
    }
  }
  selectorControl();
}

function random(max,min){
  var randomNumber;
  randomNumber=Math.floor(Math.random()*(max-min+1)+min);
  return randomNumber;
}

function selectorControl(){
  backgroundCanva.strokeStyle="blue";
  backgroundCanva.lineWidth=1;
  if(pointer<=positionX.length-1){  
    backgroundCanva.strokeRect(positionX[pointer],positionY[pointer],80,80);
  }else{
    pointer=0;
    backgroundCanva.strokeRect(positionX[pointer],positionY[pointer],80,80);
  }
}