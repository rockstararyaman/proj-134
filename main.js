Status = "";
objects = [];
song1 = "";

function preload() {
    song1 = loadSound("music.mp3");
}



function setup() {
    canvas = createCanvas(420, 340);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(420, 340);
    video.hide();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";


}

function modelLoaded() {

    console.log('Model is Loaded!!');
    Status = true;
}

function draw() {
    image(video, 0, 0, 420, 340);

    if (Status != "") {

      r = random(255);
      g = random(255);
      b = random(255);

       objectDetector.detect(video, gotResult);
        for (i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "Status : Object Detected";
         document.getElementById("baby").innerHTML = "Baby Detected";
            fill(r,g,b);
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x, objects[i].y);
            noFill();
            stroke(r,g,b);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }

    }

    if (objects[i].label == "person") {
        document.getElementById("number_of_objects").innerHTML ="Baby Found";
        console.log("stop");song1.stop();
    }
 
    else {
        document.getElementById("number_of_objects").innerHTML = "Baby Not Found";
        console.log("play");song.play();
    }
    if(objects.length == 0) {
        document.getElementById("number_of_objects").innerHTML = "Baby Not Found";
        console.log("play");song.play();
    }
}


function gotResult(error, results) {
    if (error) {
        console.log(error);
    }
    console.log(results);
    objects = results;
}

function play() {
    song.play();
    song.setVolume(1);
    song.rate(1);
}