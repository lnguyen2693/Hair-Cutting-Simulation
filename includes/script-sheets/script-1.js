let canvas_x = window.innerWidth;
let canvas_y = window.innerHeight;

let bg_1;
let bg_2;
let bg_3;
let bg_4;
let bg_5;
let eyes_closed;
let bg_arr;
let ec = true;
let timer = 0;
let bg_i = 0;


let bg;
let cutting;

function setup() {

    createCanvas(canvas_x, canvas_y);
    hair_setup();
    noStroke();
    bg = bg_1;
    // add later: load more bg image to create bg animation
}

function preload() {
    bg_1 = loadImage('/includes/media/images/bg1.jpeg');
    bg_2 = loadImage('../includes/media/images/bg2.jpeg');
    bg_3 = loadImage('../includes/media/images/bg3.jpeg');
    bg_4 = loadImage('../includes/media/images/bg4.jpeg');
    bg_5 = loadImage('../includes/media/images/bg5.jpeg');
    eyes_closed = loadImage('../includes/media/images/eyes_closed.jpeg');
    bg_arr =  [bg_1, bg_2, bg_3, bg_4, bg_5, eyes_closed]
}

function draw() {
    if (!cutting) get_bg();
    background(bg);
    let yy = 0;
    for (var y = 0; y < 10; y += 5) {
      for (var x = 0; x < width; x++) { 
        stroke(0);
        
        var direction = noise(x / 250.0 + millis()/6000.0, y / 250.0, millis()/10000.0)*(TWO_PI*2.0);
        if (hairMap.get(x).val < canvas_y) {
            hairMap.get(x).val += 0.03;
        }

        yy = hairMap.get(x).val;
        line(x, y, (sin(direction)*50.0)+x, (cos(direction)*50.0)+ yy);
    
        }
    }
}

function get_bg() {

    if (ec) {
        // bg0-4
        if (millis() >= 1600+timer) {
            bg_i = (bg_i + 1) % 5;
            print(bg_i);
            bg = bg_arr[bg_i];
            timer = millis();
            
        }

        if (millis() >= 1400+timer) {
            ec = false;
        }
       
    } else {
        bg = eyes_closed;
        if (millis() >= 1500+timer) {
            ec = !ec;
            // timer = millis();
        }
    }
}

// create a map to store the length of each hair
const hairMap = new Map();

function hair_setup() {
    for ( let i = 0; i < canvas_x; i++) {

        if (i > width/4 && i < 3*(width/4)) {
            hairMap.set(i, {val: 100});
        } else {
            hairMap.set(i, {val: 500});
        }

    }
}

function mousePressed() {
    cutting = true;
    print("cutting" + mouseX);
    bg = loadImage('../includes/media/images/eyes_closed.jpeg');
    
}

function mouseReleased() {
    cutting = false;
}

function mouseDragged() {
    hairCut();
    print(hairMap.get(mouseX).val);
}

function hairCut() {
    if (hairMap.get(mouseX).val > mouseY)
    {
        hairMap.get(mouseX).val = mouseY;
    }

}



