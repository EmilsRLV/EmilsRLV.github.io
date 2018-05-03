function pathFinding(object, x, y) {
    this.fontSize = fontSize;
    this.font = font; 
    this.x = x;
    this.y = y;
    this.update = function() {
        ctx = myGameArea.context;
        ctx.font = this.fontSize + " " + this.font;
        ctx.fillStyle = color;
        ctx.fillText(this.text, this.x, this.y);
    }
}

function loadDoc() {
  /*var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      document.getElementById("demo").innerHTML = this.responseText;
    }
  };
  xhttp.open("GET", "ajax_info.txt", true);
  xhttp.send();*/
  for(ji=0;ji<myGamePiece.length;ji++){
    lD(ji);
  }
}

function lD(i){
  var x = myGamePiece[i].x; 
  var y = myGamePiece[i].y;
  var pos = {
    x: x,
    y: y,
    i: i,
    ti: 0
  };
  $.ajax({
    type:'POST',
    data:pos,
    url:'actives.php',
    success:function(data) {
      var rez=JSON.parse(data);
      console.log(rez);
      myGamePiece[i].x=rez.x; 
      myGamePiece[i].y=rez.y;
    }
  });
}

function loadDoc1() {
  for(ji=0;ji<myGamePiece.length;ji++){
    lD1(ji)
    
  }
}

function lD1(i){
  var x = myGamePiece[i].x; 
  var y = myGamePiece[i].y;
  var pos = {
    x: x,
    y: y,
    i: i+1,
    ti: 1
  };
  $.ajax({
    type:'POST',
    data:pos,
    url:'actives.php',
    success:function(data) {
      console.log(data);
    }
  });
}

function loadDoc2() {
  for(ji=myGamePiece.length;ji<myGamePiece.length+10;ji++){
    lD2(ji)
    
  }
}

function lD2(i){
  var x = 0; 
  var y = 0+i*50;
  var pos = {
    x: x,
    y: y,
    ti: 2
  };
  $.ajax({
    type:'POST',
    data:pos,
    url:'actives.php',
    success:function(data) {
      console.log(data);
    }
  });
}
/*
function loadDoc4() {
  var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            myFunction2(this);
        }
    };
    xhttp.open("GET", "cd_catalog.xml", true);
    xhttp.send();
}
function myFunction2(xml) {
    var xmlDoc = xml.responseXML;
    var x = xmlDoc.getElementsByTagName('ARTIST');
    x[0].setAttribute("category","food");
    document.getElementById("demo").innerHTML =
    x[0].getAttribute("category");
}

function loadDoc2() {
  var xhttp, xmlDoc, txt, x, i;
    xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      xmlDoc = this.responseXML;
      txt = "";
      x = xmlDoc.getElementsByTagName("ARTIST");
      for (i = 0; i < x.length; i++) {
        txt = txt + x[i].childNodes[0].nodeValue + "<br>";
      }
      document.getElementById("demo").innerHTML = txt;
      }
    };
    xhttp.open("GET", "cd_catalog.xml", true);
    xhttp.send();
}
function loadDoc3() {
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      myFunction(this);
    }
  };
  xmlhttp.open("GET", "cd_catalog.xml", true);
  xmlhttp.send();
}
function myFunction(xml) {
  var i;
  var xmlDoc = xml.responseXML;
  var table="<tr><th>Artist</th><th>Title</th></tr>";
  var x = xmlDoc.getElementsByTagName("CD");
  for (i = 0; i <x.length; i++) { 
    table += "<tr><td>" +
    x[i].getElementsByTagName("ARTIST")[0].childNodes[0].nodeValue +
    "</td><td>" +
    x[i].getElementsByTagName("TITLE")[0].childNodes[0].nodeValue +
    "</td></tr>";
  }
  document.getElementById("demo").innerHTML = table;
}*/