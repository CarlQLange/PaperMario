/**
 * @author Carl Lange
 */

var stage,
	mario,
	box,
	frontLeftX = -500,
	frontLeftY = 400,
	frontLeftZ = -500,
	groundDepth = 1000,
	groundWidth = 1200
	;

function main(){
	init();
	
	//requestAnimationFrame(animate);
}

function init(){
	stage = Sprite3D.createCenteredContainer().setClassName("stage");
	//stage.setTransformOrigin("500px", "0px")
	

	
	makeBox(frontLeftX, frontLeftY, frontLeftZ, groundWidth, 50, groundDepth);
	
	addBackgroundLayers();
	
	//now let's get italian all up in this biznitch
	mario = new Sprite3D(null, true)
				  .setClassName("mario")
				  .setTileSize(160,160)
				  .setTilePosition(1,1);
	
	stage.addChild(mario);
	
	makeBox(200,-500,-200, 200, 200, 200);
	
	
	document.addEventListener("keypress", onKeyPress);
}

function makeBox(x,y,z, width, height, depth){
	var boxes = new Array(5);
	//I know, I know, leave me alone
	
	boxes[0] = new Sprite3D(null, true)
				  .setId("boxFront")
				  .setTransformOrigin("0px", "0px")
				  .setPosition(x,y,z)
				  .setSize(width,height);
	boxes[1] = new Sprite3D(null, true)
				  .setId("boxBack")
	 			  .setTransformOrigin("0px", "0px")
				  .setPosition(x,y,z-depth)
				  .setSize(width,height);
	boxes[2] = new Sprite3D(null, true)
				  .setId("boxLeft")
				  .rotateY(90)
				  .setTransformOrigin("0px", "0px")
				  .setPosition(x,y,z)
				  .setSize(depth,height);
	boxes[3] = new Sprite3D(null, true)
				  .setId("boxRight")
				  .rotateY(90)
				  .setTransformOrigin("0px", "0px")
				  .setPosition(x+width,y,z)
				  .setSize(depth,height)
	boxes[4] = new Sprite3D(null, true)
				  .setId("boxTop")
				  .setTransformOrigin("0px", "0px")
				  .setPosition(x,y,z)
				  .rotateX(-90)
				  .setSize(width,depth);
	boxes[5] = new Sprite3D(null, true)
				  .setId("boxBottom")
				  .setTransformOrigin("0px", "0px")
				  .setPosition(x,y+height,z)
				  .rotateX(-90)
				  .setSize(width,depth);
				  
	for (var i = 0; i<boxes.length;i++){
		boxes[i].setClassName("box")
				.update();
		
		stage.addChild(boxes[i]);
		
	}
}

function addBackgroundLayers(){
	var diff = 500;
	stage.addChild(new Sprite3D()
			  .addClassName("background1")
			  .setPosition(frontLeftX,-frontLeftY,frontLeftZ-groundDepth-(diff*1))
			  .setSize(groundWidth,1000)
			  .update()
)	;
	stage.addChild(new Sprite3D()
			  .addClassName("background2")
			  .setPosition(frontLeftX,-frontLeftY,frontLeftZ-groundDepth-(diff*2))
			  .setSize(groundWidth,1000)
			  .update()	);
	stage.addChild(new Sprite3D()
			  .addClassName("background3")
			  .setPosition(frontLeftX,-frontLeftY,frontLeftZ-groundDepth-(diff*3))
			  .setSize(groundWidth,1000)
			  .update()
	);
}

function jump(){
	//do some physics here
	mario.moveY(-30);
}

/**
 * Pan camera (stage) relatively by x, y, z.
 */
function panCamera(x,y,z){
	if (x != 0){
		stage.setCSS("-webkit-perspective-origin-x", parseInt((stage.getCSS("-webkit-perspective-origin-x").replace("px","")))-x +"px");
		stage.moveX(+x).update();
	}
	if (y != 0){
		stage.setCSS("-webkit-perspective-origin-y", parseInt((stage.getCSS("-webkit-perspective-origin-y").replace("px","")))-y +"px");
		stage.moveY(+y).update();
	}
	if (z != 0){
		stage.setCSS("-webkit-perspective-origin-z", parseInt((stage.getCSS("-webkit-perspective-origin-z").replace("px","")))-z +"px");
		stage.moveZ(+z).update();
	}
}

function onKeyPress(e){
	var key = event.keyCode || event.which;
	var keychar = String.fromCharCode(key);

	if (keychar == "w"){
		mario.moveZ(-50);
	}
	if (keychar == "a"){
		mario.moveX(-50);
	}
	if (keychar == "s"){
		mario.moveZ(50);
	}
	if (keychar == "d"){
		mario.moveX(50);
	}
	if (keychar == "e"){
		jump();
	}
	if (keychar == "j"){
		panCamera(50,0,0);
	}
	if (keychar == "l"){
		panCamera(-50,0,0);
	}
	if (keychar == "i"){
		panCamera(0, 50,0);
	}
	if (keychar == "k"){
		panCamera(0,-50,0);
	}
	
	mario.update();
}
