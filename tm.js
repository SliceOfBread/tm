
var hexSpace = [];
var tempValues = [-30,-28,-26,-24,-22,-20,-18,-16,-14,-12,-10,-8,-6,-4,-2,0,2,4,6,8];
var currentTemperature = 0;
var game = {currTemp:-30,
    currOceans:9,
    currO2:0,
    currGen:1};
var oceansLeft = 9;
var currentOxygen = 0;
var maps = {
    "Tharsis":{
        mapBonus:{plants:[0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,10,11,11,12,13,14,15,16,17,18,18,19,20,21,22,23,24,24],
            steel:[38,39,39,42,51,52,52,53,53,54,54],
            titanium:[10,49,59,59],
            card:[26,43,45,50,50,58],
            heat:[],
            ocean:[],
            money:[]},
        mapNames:{"Arsia Mons":0, "Noctis City":2, "Pavonis Mons":10, "Ascraeus Mons":26, "Tharsis Tholis":42, "Ganymede Colony":61, "Phobos Space Haven": 62},
        oceanSpace:[3,4,5,19,21,23,24,50,54,58,59,60]},
    "Hellas":{ 
        mapBonus:{plants:[8,10,12,20,22,24,26,28,36,36,38,40,40,42,42,44,46,48,50,52,52,54,54,56,56,58,60],
            steel:[3,3,13,14,16,16,18,21,30,32,39,46,58],
            titanium:[9,25,25,37,47,49],
            card:[0,5,31,38,41],
            heat:[6,6,6,43,43,45,45,53,53,57,57],
            ocean:[55],
            money:[55]},
        mapNames:{"Ganymede Colony":61, "Phobos Space Haven": 62},
        oceanSpace:[5,6,7,10,19,20,21,22,25,26,40,52]},
    "Elysium":{
        mapBonus:{plants:[0,0,1,1,2,2,3,3,4,4,5,5,5,6,6,7,7,8,10,11,12,13,14,15,16,16,17,18,19,20,21,22,24,34],
            steel:[9,24,27,33,39,39,47,47,50,50,51,58,59,59],
            titanium:[8,25,26,26,40,54],
            card:[30,38,38,38,55,56,57,60],
            heat:[],
            ocean:[],
            money:[]},
        mapNames:{"Arsia Mons":8, "Elysium Mons":26, "Olympus Mons":38, "Hescates Tholus":40, "Ganymede Colony":61, "Phobos Space Haven": 62},
        oceanSpace:[3,16,20,22,34,36,46,48,52,54,56,58]},
        };
var mapBonus = {plants:[0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,10,11,11,12,13,14,15,16,17,18,18,19,20,21,22,23,24,24],
    steel:[38,39,39,42,51,52,52,53,53,54,54],
    titanium:[10,49,59,59],
    card:[26,43,45,50,50,58],
    ocean:[],
    money:[]};
var mapNames = {"Arsia Mons":0, "Noctis City":2, "Pavonis Mons":10, "Ascraeus Mons":26, "Tharsis Tholis":42, "Ganymede Colony":61, "Phobos Space Haven": 62};
var oceanSpace = [3,4,5,19,21,23,24,50,54,58,59,60];
var assetTypes = ["MC", "Steel", "Titanium", "Plants", "Energy", "Heat", "TR"];
var asset2Num = {MC:0, Steel:1, Titanium:2, Plants:3, Energy:4, Heat:5, TR:6};
var plant = "\uD800\uDDF2";
var steel = "\u2692";
var titanium = ["\u2605", "\u272E"];
var card = "\uD83C\uDCA0";  
var heat = "\u2307\u2307\u2307";
var plantImg = {};
var steelImg = {};
var titaniumImg = {};
var cardImg = {};
var cityImg = {};
var doublewaveImg = {};
var energyImg = {};
var factoryImg = {};
var marsImg = {};
var moholeImg = {};
var pawprintsImg = {};
var prohibitImg = {};
var radioactiveImg = {};
var volcanoImg = {};
var checkerImg = {};
var numPlayers = 2;
var currentPlayer = 1;
var firstPlayer = 1;
var maxPlayers = 5;
var awardsFunded = 0;
var awardPrices = [8,14,20,"?","?"];
var milestonesFunded = 0;
var milestoneFundedBy = {"terraformer":0,"mayor":0,"gardener":0,"builder":0,"planner":0};
var awardFunded = {"landlord":0, "banker":0, "scientist":0, "thermalist":0, "miner":0};
var freeOceanTile = 0;
var processingHistory = 0;
var blinkColor = 0;
var blinkColors = ["#000000","#300000","#600000","#900000","#b00000","#e00000"];
var canvasWidth = 850;
var canvasHeight = 800;
var cScale = .5;
var g_diam = canvasHeight / 9;
var g_radiusSquared = g_diam * g_diam / 4;
var placingTile = 0;
var msgPrepend = "";
var useStorage = 0;
var touchX, touchY;
var PIx2 = Math.PI * 2;
var ctx;
var g_valueObject;
var rc2hex = [[],[],[],[],[],[],[],[],[],[]];

function resetAll() {
    game.currGen = 1;
    currentTemperature = 0;
    oceansLeft = 9;
    currentOxygen = 0;
    currentPlayer = 1;
    firstPlayer = 1;
    highlightFirstPlayer();
    document.getElementById("genbutton").innerHTML = 1;
    awardsFunded = 0;
    for (var l_i in awardFunded) {
        awardFunded[l_i] = 0;
    }
    for (var l_i in milestoneFundedBy) {
        milestoneFundedBy[l_i] = 0;
    }
    milestonesFunded = 0;
    document.getElementById("gamelog").value = "";
    var l_tmp = document.getElementsByClassName("manda");
    for (var i=0; i<l_tmp.length; i++) {
        l_tmp[i].style.borderColor = "black";
        l_tmp[i].style.borderWidth = "1px";
    }
    for (var p=1; p <= numPlayers; p++) {
        for (var b=0; b < assetTypes.length; b++) {
            document.getElementById("p" + p + "b" + b).innerHTML = 0;
            if (b === 6) {
                document.getElementById("p" + p + "b" + b).innerHTML = 20;
                if (numPlayers == 1) document.getElementById("p" + p + "b" + b).innerHTML = 14;
                continue;
            }
            document.getElementById("a" + p + "b" + b).innerHTML = 0;
        }
    }
    for (var h=0; h<hexSpace.length; h++) {
        hexSpace[h].reset();
    }
    updateGP();
    drawSheet();
}

function zoom(d) {
    if (d == 'plus') {
        if (cScale < 2) {
            cScale += 0.25;
        }
    } else {
        if (cScale > 0.375) {
            cScale -= 0.25;
        }
    }
    let canvasObj = document.getElementById("playarea");
    canvasObj.width = canvasWidth*cScale;
    canvasObj.height = canvasHeight*cScale;
    ctx.scale(cScale, cScale);
    drawSheet();
}

function addMsg(msg) {
    var gamelogObj = document.getElementById("gamelog");
	gamelogObj.value += msgPrepend + msg + ";\n";
	gamelogObj.scrollTop = gamelogObj.scrollHeight;
    if (msgPrepend) {
        msgPrepend = "";
    }
}


function openTab(evt, name) {
    var x, tabcontent, tablinks;
    var flag = 0;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (x = 0; x < tabcontent.length; x++) {
        if ((tabcontent[x].id == name) && (tabcontent[x].style.display == "block")) {
            flag = 1;
        }
        tabcontent[x].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (x = 0; x < tablinks.length; x++) {
        tablinks[x].className = tablinks[x].className.replace(" active", "");
    }
    if ((name == "Play") && (document.getElementById("history").value.length < 5)) {
        // start of new game
        var l_txt = "numplayers:" + numPlayers + ":";
        for (var l_p=1; l_p <= numPlayers; l_p++) {
            l_txt += playerName(l_p) + ":";
        }
        document.getElementById("history").value = l_txt + "\n";
        addMsg(new Date());
        if (typeof(automataStart) !== "undefined") {
            automataStart();
        }
        
    }
    if (name == "Score") {
        updateScores();
    }
    if (!flag) {
      document.getElementById(name).style.display = "block";
      evt.currentTarget.className += " active";
      document.getElementById("gamelog").scrollTop = document.getElementById("gamelog").scrollHeight;
      document.getElementById("history").scrollTop = document.getElementById("history").scrollHeight;
    }
}

var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = canvasWidth*cScale;
        this.canvas.height = canvasHeight*cScale;
        this.canvas.onmousedown = function() {process_mousedown(event);};
        this.canvas.onmouseup = function() {process_mouseup(event);};
        //this.canvas.onmousemove = function() {process_mousemove(event);};
        this.canvas.ontouchstart = function() {process_touchstart(event);};
        this.canvas.ontouchend = function() {process_touchend(event);};
        //this.canvas.ontouchmove = function() {process_touchmove(event);};
        this.canvas.id = "playarea";
        //this.canvas.style.clear = "left";
        //this.canvas.style.float = "left";
        this.context = this.canvas.getContext("2d");
        ctx = this.canvas.getContext("2d");
        ctx.scale(cScale, cScale);
        if (document.getElementById("canvasholder")) {
            document.getElementById("canvasholder").appendChild(this.canvas);
        } else {
            document.getElementById("Play").appendChild(this.canvas);
        }
        //for (var n=0; n < document.body.childNodes.length; n++) {
            //if (document.body.childNodes[n].id == "firstelement") {
                //document.body.insertBefore(this.canvas, document.body.childNodes[n+1]);
                //break;
            //}
        //}
        var hexNum = 0;
        for (var r=0; r<5; r++) {
            for (var c=0; c < 9-r; c++) {
                if (r===0) {
                    hexSpace[hexNum] = new makeHexSpace(hexNum, canvasWidth/2+(c-4)*g_diam, canvasHeight/2, 5, c+1);
                    rc2hex[5][c+1] = hexNum;
                } else {
                    hexSpace[hexNum] = new makeHexSpace(hexNum, canvasWidth/2+(c-4+r*0.5)*g_diam, canvasHeight/2 + g_diam*.866*r, 5+r, c+1);
                    rc2hex[5+r][c+1] = hexNum;
                    hexNum++;
                    hexSpace[hexNum] = new makeHexSpace(hexNum, canvasWidth/2+(c-4+r*0.5)*g_diam, canvasHeight/2 - g_diam*.866*r, 5-r, c+1);
                    rc2hex[5-r][c+1] = hexNum;
                }
                hexNum++;
            }
        }
        for (var i=0; i<hexSpace.length; i++) {
            var x=0;
            for (var j=0; j<hexSpace.length; j++) {
                if (i==j) continue;
                if (hexSpace[i].isNextTo(hexSpace[j].x, hexSpace[j].y)) {
                    hexSpace[i].neighbors[x++] = j;
                }
            }
            if (x > 6) {
                window.alert("neighbor function out of bounds");
            }
        }
        // add Ganymede colony
        hexSpace[hexNum] = new makeHexSpace(hexNum, canvasWidth/2-4*g_diam, canvasHeight/2 - 2.4*g_diam, 0, 0);
        hexSpace[hexNum].offPlanet = 1;
        hexNum++;
        // Phobos Space Haven
        hexSpace[hexNum] = new makeHexSpace(hexNum, canvasWidth/2-3.5*g_diam, canvasHeight/2 - 3.5*g_diam, 0, 1);
        hexSpace[hexNum].offPlanet = 1;
        hexNum++;
        
        for (var b in mapBonus) {
            // b is "plants", "steel", "titanium" or "card"
            for (var x=0; x < mapBonus[b].length; x++) {
                hexSpace[mapBonus[b][x]].addBonus(b);
            }
        }
        for (var b in mapNames) {
            hexSpace[mapNames[b]].name = b;
            if ((b == "Noctis City") || (b == "Ganymede Colony") || (b == "Phobos Space Haven")) {
                hexSpace[mapNames[b]].reserved = true;
            }
        }
        for (var r=0; r < oceanSpace.length; r++) {
            hexSpace[oceanSpace[r]].ocean = 1;
            hexSpace[oceanSpace[r]].reserved = true;
        }
             
    }
}

function checkFinished() {
    if (!oceansLeft && (currentOxygen >= 14) && (currentTemperature >= tempValues.length-1)) {
        ctx.drawImage(checkerImg, canvasWidth - 140, 30, 120, 120);
    }
}

function highlightFirstPlayer() {
    for (var p=1; p <= numPlayers; p++) {
        document.getElementById("pn" + p).innerHTML = playerName(p);
        document.getElementById("spn" + p).innerHTML = playerName(p);
    }
    if (typeof dupSolo != "undefined") {
        document.getElementById("pn" + firstPlayer).innerHTML = playerName(firstPlayer);
    } else {
        document.getElementById("pn" + firstPlayer).innerHTML = playerName(firstPlayer) + "<img src='circle1.png' alt='(1)' height='30px'>";
    }
}

function increaseAsset(a,p,n) {
    var aObj = document.getElementById("a" + p + "b" + a);
    aObj.innerHTML = Number(aObj.innerHTML) + n;
    msgPrepend = "--";
    addMsg(playerName(p) + " gains " + n + " " + assetTypes[a]);
}

function increaseO2(p) {
    if (playerName(p) == "Dummy") return;
    if (currentOxygen < 14) {
        currentOxygen++;
        checkFinished();
        if (!msgPrepend) addHist(p,"increase",1,"oxygen");
        addMsg(playerName(p) + " increases O2 to " + currentOxygen);
        msgPrepend = "--";
        clickProdMore("p" + p + "b6"); //increaseAsset(asset2Num["TR"],p,1);
        if (currentOxygen === 8) {
            // add bonus temp
            msgPrepend = "--";
            increaseTemp(p);
        }
        updateGP();
    }
    
}

function increaseTemp(p) {
    if (currentTemperature < tempValues.length-1) {
        currentTemperature++;
        checkFinished();
        if (!msgPrepend) addHist(p,"increase",1,"temp");
        addMsg(playerName(p) + " increases Temp to " + tempValues[currentTemperature]);
        msgPrepend = "--";
        clickProdMore("p" + p + "b6"); //increaseAsset(asset2Num["TR"],p,1);
        if ((currentTemperature === 3) || (currentTemperature === 5)) {
            // increase heat prod
            msgPrepend = "--";
            clickProdMore("p" + p + "b5");
        }
        if ((tempValues[currentTemperature] === 0)  && (oceansLeft)){
            // free ocean tile
            freeOceanTile = p;
            makeMsg(document.getElementById("oceanmsg"), "->" + playerName(p) + " gets to place an Ocean tile<-")
        }
        updateGP();
    }
}

function makeHexSpace(num, ix, iy, ir, ic) {
    this.x = ix;
    this.y = iy;
    this.r = ir;
    this.c = ic;
    this.num = num;
    this.bonus = {plants:0, steel:0, titanium:0, card:0, ocean:0, money:0, heat:0};
    this.name = "";
    this.ocean = 0;
    this.offPlanet = 0;
    this.reserved = 0;
    this.tile = "";
    this.ownedBy = 0;
    this.neighbors = [];
    
    this.reset = function() {
        this.tile = "";
        this.ownedBy = 0;
    }
    
    this.addBonus = function(b) {
        this.bonus[b]++;
    }
    this.clearBonuses = function() {
        for (let b in mapBonus) {
            this.bonus[b] = 0;
        }
    }
    this.addTile = function(p) {
        this.tile = document.getElementById("selecttile").value;
        this.ownedBy = p;
        if (this.tile == "Ocean") {
            if (!oceansLeft) {
                this.tile = "";
                this.ownedBy = 0;
                freeOceanTile = 0;
                document.getElementById("oceanmsg").style.display = "none";
                return;
            } else {
                oceansLeft--;
                checkFinished();
                addMsg(playerName(p) + " places Ocean tile (r:" + this.r + " c:" + this.c + " loc:" + this.num + ")");
                addHist(p,"tile",this.num,this.tile);
                msgPrepend = "--";
                clickProdMore("p" + p + "b6"); //increaseAsset(asset2Num["TR"],p,1);
                updateGP();
                if (freeOceanTile == p) {
                    freeOceanTile = 0;
                    document.getElementById("oceanmsg").style.display = "none";
                }
            }
        } else if (this.tile == "Greenery") {
            addMsg(playerName(p) + " places Greenery tile (r:" + this.r + " c:" + this.c + " loc:" + this.num + ")");
            addHist(p,"tile",this.num,this.tile);
            msgPrepend = "--";
            increaseO2(p);
        } else {
            addMsg(playerName(p) + " places " + this.tile + " tile (r:" + this.r + " c:" + this.c + " loc:" + this.num + ")");
            addHist(p,"tile",this.num,this.tile);
        }
        // TBD add ocean (and -money) bonus
        if (this.bonus.ocean) {
            let aObj = document.getElementById("a" + p + "b0");
            aObj.innerHTML = Number(aObj.innerHTML) - 6;
            msgPrepend = "--";
            addMsg(playerName(p) + " pays 6 " + assetTypes[0]);
            
            freeOceanTile = p;
            makeMsg(document.getElementById("oceanmsg"), "->" + playerName(p) + " gets to place an Ocean tile<-");
        }
        if (this.bonus.heat) increaseAsset(asset2Num["Heat"],p,this.bonus.heat);
        if (this.bonus.plants) increaseAsset(asset2Num["Plants"],p,this.bonus.plants);
        if (this.bonus.steel) increaseAsset(asset2Num["Steel"],p,this.bonus.steel);
        if (this.bonus.titanium) increaseAsset(asset2Num["Titanium"],p,this.bonus.titanium);
        if (this.bonus.card == 1) {
            msgPrepend = "--";
            addMsg(playerName(p) + " gains 1 card");
            makeMsg(document.getElementById("clickawaymsg"), "->" + playerName(p) + " takes 1 card<-");
        } else if (this.bonus.card > 1) {
            msgPrepend = "--";
            addMsg(playerName(p) + " gains " + this.bonus.card + " cards");
            makeMsg(document.getElementById("clickawaymsg"), "->" + playerName(p) + " takes " + this.bonus.card + " cards<-");
        }
        if (this.bonus.card && (typeof(botGotCard) !== "undefined")) {
            botGotCard(p, this);
        } 
        for (var h=0; h < hexSpace.length; h++) {
            if ((hexSpace[h].tile == "Ocean") && hexSpace[h].isNextTo(this.x, this.y)) {
                // placing tile next to Ocean get $2 bonus
                increaseAsset(asset2Num["MC"], p, 2);
            }
        }
            
    }
    this.blink = function() {
        //ctx.beginPath();
        //ctx.strokeStyle = blinkColors[blinkColor];
        //ctx.lineWidth = 2;
        //ctx.arc(this.x, this.y, g_diam/2 , 0, PIx2);
        //ctx.stroke();
        fillHex(this.x, this.y, "", blinkColors[blinkColor]);
    }
    this.drawMarker = function() {
        if (this.ownedBy == 999) return;
        ctx.beginPath();
        ctx.fillStyle = "#303030";
        ctx.fillRect(this.x-8, this.y+12, 20, 20);
        ctx.beginPath();
        ctx.fillStyle = document.getElementById("pn" + this.ownedBy).style.background;
        ctx.fillRect(this.x-10, this.y+10, 20, 20);
    }
    this.draw = function() {
        //ctx.beginPath();
        //ctx.strokeStyle = "black";
        //ctx.lineWidth = 2;
        //ctx.arc(this.x, this.y, g_diam/2 , 0, PIx2);
        //ctx.stroke();
        fillHex(this.x, this.y, "", "black");
        if (this.ocean) {
            // https://stackoverflow.com/questions/16494262/how-to-draw-a-circle-with-centered-fadeing-out-gradients-with-html5-canvas
            ctx.beginPath();
            var gradient = ctx.createRadialGradient(this.x, this.y, 5, this.x, this.y, g_diam/2+10);
            gradient.addColorStop(0, 'orange');
            gradient.addColorStop(1, '#8080ff');
            fillHex(this.x, this.y, gradient, "");
            //ctx.fillStyle = gradient;
            //ctx.arc(this.x, this.y, g_diam/2 , 0, PIx2);
            //ctx.fill();
        }
        if (this.offPlanet) {
            // https://stackoverflow.com/questions/16494262/how-to-draw-a-circle-with-centered-fadeing-out-gradients-with-html5-canvas
            ctx.beginPath();
            var gradient = ctx.createRadialGradient(this.x, this.y, 5, this.x, this.y, g_diam/2+10);
            gradient.addColorStop(0, 'white');
            gradient.addColorStop(1, 'black');
            fillHex(this.x, this.y, gradient, "");
            //ctx.fillStyle = gradient;
            //ctx.arc(this.x, this.y, g_diam/2 , 0, PIx2);
            //ctx.fill();
        }
        this.blink();
        var icons = [];
        for (var x in this.bonus) {
            if (this.bonus[x]) {
                for (var n=0; n < this.bonus[x]; n++) {
                    icons.push(x);
                }
            }
        }
        var l_x, l_y;
        let xoffset = [[],[10],[20,0],[30,10,-10]];
        let yoffset = [[],[45],[40,40],[37,45,37]];
        for (var n=0; n < icons.length; n++) {
            ctx.font = "20px Arial";
            //l_y = this.y - 40;
            //l_x = this.x + n*20 - 20;
            l_y = this.y - yoffset[icons.length][n];
            l_x = this.x - xoffset[icons.length][n];
            if (icons[n] == "plants") {
                ctx.drawImage(plantImg, l_x, l_y, 12, 20);
            } else if (icons[n] == "steel") {
                ctx.drawImage(steelImg, l_x, l_y, 20, 20);
            } else if (icons[n] == "titanium") {
                ctx.drawImage(titaniumImg, l_x, l_y, 20, 20);
            } else if (icons[n] == "card") {
                ctx.drawImage(cardImg, l_x, l_y, 15, 20);
            } else if (icons[n] == "ocean") {
                ctx.drawImage(oceanImg, l_x, l_y, 21, 20);
            } else if (icons[n] == "money") {
                ctx.beginPath();
                ctx.fillStyle = "yellow";
                ctx.fillRect(l_x, l_y, 20, 20);
                ctx.beginPath();
                ctx.fillStyle = "gold";
                ctx.fillRect(l_x+2, l_y+2, 16, 16);
                ctx.font = "bold 16px Arial";
                ctx.fillStyle = "black";
                ctx.textAlign = "center";
                ctx.fillText("-6", l_x+10, l_y+16);
            } else if (icons[n] == "heat") {
                ctx.beginPath();
                ctx.fillStyle = "#cb0000";
                ctx.fillRect(l_x, l_y, 18, 18);
                ctx.drawImage(heatImg, l_x, l_y, 16, 18);
            }   
        }
        if (this.name != "") {
            var l_fsize = 12;
            if (this.name == "Noctis City") l_fsize = 18; 
            ctx.font = "bold " + l_fsize + "px Arial";
            ctx.fillStyle = "black";
            ctx.textAlign = "center";
            var splitname = this.name.split(' ');
            for (var y=0; y < splitname.length; y++) {
                ctx.fillText(splitname[y], this.x, this.y + y*l_fsize);
            }
        }
        
        // temp to show tile numbers
                //ctx.fillStyle = "black";
                //ctx.textAlign = "center";
                //ctx.fillText(this.num, this.x, this.y);
                
        switch (this.tile) {
            case "":
                break;
            case "Ocean":
                //ctx.beginPath();
                //ctx.fillStyle = "#000099";
                //ctx.arc(this.x, this.y, g_diam/2 , 0, PIx2);
                //ctx.fill();
                fillHex(this.x, this.y, "#000099", "");
                ctx.drawImage(doublewaveImg, this.x-30, this.y-30, 40, 14);
                ctx.drawImage(doublewaveImg, this.x-10, this.y-10, 40, 14);
                ctx.drawImage(doublewaveImg, this.x-20, this.y+15, 40, 14);
                break;
            case "City":
                //ctx.beginPath();
                //ctx.fillStyle = "grey";
                //ctx.arc(this.x, this.y, g_diam/2 , 0, PIx2);
                //ctx.fill();
                fillHex(this.x, this.y, "grey", "");
                ctx.drawImage(cityImg, this.x-35, this.y-40, 70, 73);
                break;
            case "Greenery":
                //ctx.beginPath();
                //ctx.fillStyle = "#006900";
                //ctx.arc(this.x, this.y, g_diam/2 , 0, PIx2);
                //ctx.fill();
                fillHex(this.x, this.y, "#006900", "");
                ctx.drawImage(plantImg, this.x-30, this.y-30, 22, 37);
                ctx.drawImage(plantImg, this.x+15, this.y-10, 22, 37);
                ctx.drawImage(plantImg, this.x+0, this.y-40, 22, 37);
                break;
            case "Capital":
                //ctx.beginPath();
                //ctx.fillStyle = "white";
                //ctx.arc(this.x, this.y, g_diam/2 , 0, PIx2);
                //ctx.fill();
                fillHex(this.x, this.y, "white", "");
                ctx.drawImage(cityImg, this.x-35, this.y-40, 70, 73);
                break;
            case "CommercialDistrict":
                //ctx.beginPath();
                //ctx.fillStyle = "#802b00";
                //ctx.arc(this.x, this.y, g_diam/2 , 0, PIx2);
                //ctx.fill();
                fillHex(this.x, this.y, "#802b00", "");
                ctx.fillStyle = "black";
                ctx.font = "50px Arial";
                ctx.textAlign = "center";
                ctx.fillText("\u20AC", this.x, this.y+0);
                break;
            case "EcologicalZone":
                //ctx.beginPath();
                //ctx.fillStyle = "#802b00";
                //ctx.arc(this.x, this.y, g_diam/2 , 0, PIx2);
                //ctx.fill();
                fillHex(this.x, this.y, "#802b00", "");
                ctx.drawImage(pawprintsImg, this.x-40, this.y-40, 76, 76);
                break;
            case "IndustrialCenter":
                //ctx.beginPath();
                //ctx.fillStyle = "#802b00";
                //ctx.arc(this.x, this.y, g_diam/2 , 0, PIx2);
                //ctx.fill();
                fillHex(this.x, this.y, "#802b00", "");
                break;
            case "LavaFlows":
                //ctx.beginPath();
                //ctx.fillStyle = "#802b00";
                //ctx.arc(this.x, this.y, g_diam/2 , 0, PIx2);
                //ctx.fill();
                fillHex(this.x, this.y, "#802b00", "");
                ctx.drawImage(volcanoImg, this.x-30, this.y-40, 60, 60);
                break;
            case "MiningArea":
            case "MiningRights":
                //ctx.beginPath();
                //ctx.fillStyle = "#802b00";
                //ctx.arc(this.x, this.y, g_diam/2 , 0, PIx2);
                //ctx.fill();
                fillHex(this.x, this.y, "#802b00", "");
                ctx.drawImage(steelImg, this.x-35, this.y-40, 70, 70);
                break;
            case "MoholeArea":
                //ctx.beginPath();
                //ctx.fillStyle = "#802b00";
                //ctx.arc(this.x, this.y, g_diam/2 , 0, PIx2);
                //ctx.fill();
                fillHex(this.x, this.y, "#802b00", "");
                ctx.drawImage(moholeImg, this.x-32, this.y-40, 64, 75);
                break;
            case "NaturalPreserve":
                //ctx.beginPath();
                //ctx.fillStyle = "#802b00";
                //ctx.arc(this.x, this.y, g_diam/2 , 0, PIx2);
                //ctx.fill();
                fillHex(this.x, this.y, "#802b00", "");
                ctx.drawImage(marsImg, this.x-30, this.y-40, 57, 79);
                break;
            case "NuclearZone":
                //ctx.beginPath();
                //ctx.fillStyle = "#802b00";
                //ctx.arc(this.x, this.y, g_diam/2 , 0, PIx2);
                //ctx.fill();
                fillHex(this.x, this.y, "#802b00", "");
                ctx.drawImage(radioactiveImg, this.x-32, this.y-40, 64, 63);
                break;
            case "RestrictedArea":
                //ctx.beginPath();
                //ctx.fillStyle = "#802b00";
                //ctx.arc(this.x, this.y, g_diam/2 , 0, PIx2);
                //ctx.fill();
                fillHex(this.x, this.y, "#802b00", "");
                ctx.drawImage(prohibitImg, this.x-35, this.y-40, 70, 70);
                break;
        }
        switch (this.tile) {
            case "":
            case "Ocean":
                break;
            default:
                this.drawMarker();
        }
    }
    this.wasClicked = function(xIn, yIn) {
        xAdj = xIn / cScale;
        yAdj = yIn / cScale;
        if ((xAdj-this.x)*(xAdj-this.x) + (yAdj-this.y)*(yAdj-this.y) < g_radiusSquared) {
            return(1);
        }
        return(0);
    }
    this.isNextTo = function(xIn, yIn) {
        var distSq = (xIn-this.x)*(xIn-this.x) + (yIn-this.y)*(yIn-this.y);
        // if center to center distance ~ g_diam then the location is adjacent
        // note that we need to ensure space is not itself
        if ((distSq < (g_diam * g_diam + 2)) && (distSq > 5))  {
            return(1);
        }
        return(0);
    }
}

function fillHex(x, y, fillColor, strokeColor) {
    var root3 = 1.73;
    ctx.beginPath();
    ctx.moveTo(x, y + g_diam / root3);
    for (var i = 0.5; i < 7; i++) {
        ctx.lineTo(x + g_diam / root3 * Math.cos(i * 2 * Math.PI / 6), y + g_diam / root3 * Math.sin(i * 2 * Math.PI / 6));
    }
    if (strokeColor != "" && strokeColor != null && strokeColor != undefined) {
        ctx.strokeStyle = strokeColor;
        ctx.stroke();
    }

    if (fillColor != ""  && fillColor != null && fillColor != undefined) {
        ctx.fillStyle = fillColor;
        ctx.fill();
    }
}

function makeMsg(o, msg) {
    o.innerHTML = msg;
    o.style.display = "block";
}


function startGame() {
    document.getElementById("defaultOpen").click();
    changeNumPlayers(Number(document.getElementById("selectplayers").value)) ;
    myGameArea.start();
    plantImg = document.getElementById("plantimg");
    steelImg = document.getElementById("steelimg");
    titaniumImg = document.getElementById("titaniumimg");
    cardImg = document.getElementById("cardimg");
    cityImg = document.getElementById("cityimg");
    doublewaveImg = document.getElementById("doublewaveimg");
    energyImg = document.getElementById("energyimg");
    factoryImg = document.getElementById("factoryimg");
    heatImg = document.getElementById("heatimg");
    marsImg = document.getElementById("marsimg");
    moholeImg = document.getElementById("moholeimg");
    oceanImg = document.getElementById("oceanimg");
    pawprintsImg = document.getElementById("pawprintsimg");
    prohibitImg = document.getElementById("prohibitimg");
    radioactiveImg = document.getElementById("radioactiveimg");
    volcanoImg = document.getElementById("volcanoimg");
    checkerImg = document.getElementById("checkerimg");
    changePlayerColor(document.getElementById("selectcolorp1"));
    drawSheet();
    updateGP();
    if (typeof(automataStart) !== "undefined") {
        setCurrentPlayer(1);
    } else {
        clickPlayer(1);
    }
    highlightFirstPlayer();
    if (typeof(Storage) !== "undefined") {
        useStorage = 1;
    } else {
        window.alert("Note: Browser does not support local storage. Data will NOT be saved!");
    }
}

function clickCancel(th) {
    // cancel placing
    document.getElementById("selecttile").style.display = "none";
    document.getElementById("selecttilecancel").style.display = "none";
    clearInterval(placeTileInt);
    blinkColor = 0;
    blinkSpaces();
    blinkColor = 0;
    placingTile = 0;
}

function clickFund(th) {
    let pt = th.parentNode.id;
    switch (pt) {
        case "milestones":
        case "terraformer":
        case "mayor":
        case "gardener":
        case "builder":
        case "planner":
            makeMsg(document.getElementById("clickawaymsg"), playerName(currentPlayer) + " needs to pay 8MC for " + th.id + " milestone"); 
            milestonesFunded++;
            addMsg(playerName(currentPlayer) + " claims " + th.id + " Milestone");
            addHist(currentPlayer,"claim",th.id,0);
            milestoneFundedBy[th.id] = currentPlayer;
            break;
        case "awards":
        case "landlord":
        case "banker":
        case "scientist":
        case "thermalist":
        case "miner":
            makeMsg(document.getElementById("clickawaymsg"), playerName(currentPlayer) + " needs to pay " + awardPrices[awardsFunded] + "MC for " + th.id + " award"); 
            awardsFunded++;
            addMsg(playerName(currentPlayer) + " funds " + th.id + " Award");
            addHist(currentPlayer,"claim",th.id,0);
            awardFunded[th.id] = 1;
            break;
    }
    th.style.borderColor = document.getElementById("pn" + currentPlayer).style.background;
    th.style.borderWidth = "7px";
}

function blinkSpaces() {
    for (var s=0; s < hexSpace.length; s++) {
        if (hexSpace[s].tile == "") {
            hexSpace[s].blink();
        }
    }
    blinkColor = (blinkColor + 1) % blinkColors.length;
}

function changePlayerColor(obj) {
    // player names are in pn[1|2]
    for (var p=1; p <= maxPlayers; p++) {
        var pnObj = document.getElementById("pn" + p);
        var spnObj = document.getElementById("spn" + p);
        var pnBackground = document.getElementById("selectcolorp" + p).value;
        var pnColor = "white";
        if ((pnBackground == "red") || (pnBackground == "yellow")) {
            pnColor = "black";
        }
        if (pnBackground == "green") {
            pnBackground = "lime";
            pnColor = "black";
        }
        document.getElementById("pn" + p).style.color = pnColor;
        document.getElementById("pn" + p).style.background = pnBackground;
        document.getElementById("spn" + p).style.color = pnColor;
        document.getElementById("spn" + p).style.background = pnBackground;
        if (typeof(automataStart) !== "undefined") {
            document.getElementById("benpl"+p).style.color = pnColor;
            document.getElementById("benpl"+p).style.background = pnBackground;
        }
        if (typeof dupSolo != "undefined") break;
    }
    drawSheet();
}

function changeTile(th) {
    th.style.color = "white";
    switch (th.value) {
        case "Ocean":
            th.style.background = "blue";
            break;
        case "City":
            th.style.background = "grey";
            th.style.color = "black";
            break;
        case "Greenery":
            th.style.background = "green";
            break;
        case "Capital":
            th.style.background = "white";
            th.style.color = "black";
            break;
        default:
            th.style.background = "#802b00";
            th.style.color = "black";
            break;
    }
}

function clickIncO2(p) {
    increaseO2(p);
}

function clickIncTemp(p) {
    increaseTemp(p);
}

function clickPlaceTile(p) {
    document.getElementById("selecttile").style.display = "inline-block";
    changeTile(document.getElementById("selecttile"));
    document.getElementById("selecttilecancel").style.display = "inline-block";
    if (!placingTile) {
        placingTile = p;
        placeTileInt = setInterval(blinkSpaces, 100);
    }
}

function clickProdLess(i) {
    var productionObj = document.getElementById(i);
    var l_p = Number(i.slice(1,2));
    var t = Number(i.slice(3,4));
    var tmpmin = 0;
    if (t==0) tmpmin = -5;
    if (Number(productionObj.innerHTML) > tmpmin) {
        productionObj.innerHTML = Number(productionObj.innerHTML) - 1;
        addHist(l_p,"production",-1,assetTypes[t]);
        addMsg(playerName(l_p) + " reduces " + assetTypes[t] + " production by 1");
    }
}

function clickProdMore(i) {
    var productionObj = document.getElementById(i);
    var l_p = Number(i.slice(1,2));
    var t = Number(i.slice(3,4));
    productionObj.innerHTML = Number(productionObj.innerHTML) + 1;
    if (!msgPrepend) addHist(l_p,"production",1,assetTypes[t]);
    addMsg(playerName(l_p) + " increases " + assetTypes[t] + " production by 1");
}

function clickCalcButton(bObject) {
    var txt = bObject.innerHTML; // button pressed
    var l_p = g_valueObject.id.slice(1,2);
    var l_t = g_valueObject.id.slice(3,4);
    var l_amt = Number(document.getElementById("spendgainamt").innerHTML);
    if (txt == "+") {
        g_valueObject.innerHTML = Number(g_valueObject.innerHTML) + l_amt;
        document.getElementById("spendgain").style.display = "none";
        addMsg(playerName(l_p) + " gains " + l_amt + " " + assetTypes[l_t]);
        addHist(l_p,"asset",l_amt,assetTypes[l_t]);
    } else if (txt == "-") {
        g_valueObject.innerHTML = Number(g_valueObject.innerHTML) - l_amt;
        document.getElementById("spendgain").style.display = "none";
        addMsg(playerName(l_p) + " spends " + l_amt + " " + assetTypes[l_t]);
        addHist(l_p,"asset",-l_amt,assetTypes[l_t]);
    } else if (txt == "C") {
        document.getElementById("spendgainamt").innerHTML = 0;
    } else if (txt == "x") {
        document.getElementById("spendgain").style.display = "none";
    } else {
        if (l_amt) {
            // if amt != 0, append button pressed
            document.getElementById("spendgainamt").innerHTML = document.getElementById("spendgainamt").innerHTML + txt;
        } else {
            // if amt was 0, replace with button pressed
            document.getElementById("spendgainamt").innerHTML = txt;
        }
    }
}

function clickSpendGain(e, bObject) {
    g_valueObject = bObject; // remember object clicked so we can update later
    var bId = bObject.id;
    var p = bId.slice(1,2);
    var bNum = bId.slice(3,4);
    document.getElementById("spendgaintype").innerHTML = bObject.innerHTML + " " + assetTypes[bNum];
    document.getElementById("spendgainamt").innerHTML = 0;
    document.getElementById("spendgain").style.display = "table";
}

function clickUndo() {
    var l_tmp = document.getElementById("history").value;
    var l_p = l_tmp.lastIndexOf("\n", l_tmp.length-2);
    if (l_p >= 0) {
        document.getElementById("history").value = l_tmp.slice(0,l_p+1);
    } else {
        document.getElementById("history").value = "";
    }
    resetAll();
    clickApply();
}

function nameDone(n) {
    var pbox = document.getElementById("pn" + n);
    var tbox = document.getElementById("tname" + n);
    if (tbox.value.length > 0) {
        pbox.innerHTML = tbox.value;
    } else {
        tbox.value = pbox.innerHTML;
    }
    highlightFirstPlayer();
    //pbox.style.display = "block";
    //tbox.style.display = "none";
}
    
function drawSheet() {
    
    ctx = myGameArea.context;
    
    // background (space)
    ctx.beginPath();
    ctx.fillStyle = "#101010";
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
    
    // planet
    ctx.beginPath();
    ctx.fillStyle = "#ffb833";
    ctx.arc(canvasWidth/2, canvasHeight/2,canvasHeight/2 , 0, PIx2);
    ctx.fill();
    ctx.beginPath();
            var gradient = ctx.createRadialGradient(canvasWidth/2, canvasHeight/2, g_diam*2, canvasWidth/2, canvasHeight/2, g_diam*4.5);
            gradient.addColorStop(0, '#ffb833');
            gradient.addColorStop(1, '#b37400');
            ctx.fillStyle = gradient;
    ctx.arc(canvasWidth/2, canvasHeight/2,canvasHeight/2 , 0, PIx2);
    ctx.fill();
    
    // spaces on planet
    for (var h=0; h < hexSpace.length; h++) {
        hexSpace[h].draw();
    }
    checkFinished();
    
}

function updateGP() {
    for (var c=0; c < tempValues.length; c++) {
        document.getElementById("sctemp" + tempValues[c]).style.borderWidth = "1px";
        document.getElementById("sctemp" + tempValues[c]).style.borderColor = "black";
    }
    document.getElementById("sctemp" + tempValues[currentTemperature]).style.borderWidth = "4px";
    document.getElementById("sctemp" + tempValues[currentTemperature]).style.borderColor = "white";
    
    for (var c=0; c <= 14; c++) {
        document.getElementById("scO2" + c).style.borderWidth = "1px";
        document.getElementById("scO2" + c).style.borderColor = "black";
    }
    document.getElementById("scO2" + currentOxygen).style.borderWidth = "4px";
    document.getElementById("scO2" + currentOxygen).style.borderColor = "white";
    
    document.getElementById("scoceans").style.borderWidth = "4px";
    document.getElementById("scoceans").style.borderColor = "white";
    document.getElementById("scoceans").innerHTML = oceansLeft;
}

function clickBoard(xIn, yIn) {
    if (placingTile) {
        // to determine tile space clicked, the distance of click
        // to center (x,y) must be less than g_diam/2. 
        // since deltaX^2 + deltaY^2 = (g_diam/2)^2 we
        // just compare squared values
        // Note this could be faster as only odd nums are below mid-line
        for (var h=0; h < hexSpace.length; h++) {
            if ((hexSpace[h].ownedBy === 0) && hexSpace[h].wasClicked(xIn, yIn)) {
                hexSpace[h].addTile(placingTile);
                clickCancel();
                drawSheet();
                break;
            }
        }
    }
}

function playerName(p) {
    return(document.getElementById("tname" + p).value);
}

function processHistory() {
    var cmd = document.getElementById("history").value.split("\n");
    var l_s = [];
    var l_p;
    processingHistory = 1;
    for (var n=0; n < cmd.length; n++) {
        if (cmd[n].length < 3) continue;
        // assume that if a clickawaymsg was present and something happened after
        // that the message was cleared
        document.getElementById("clickawaymsg").style.display = "none";
        l_s = cmd[n].split(":");
        // action playernum data data2
        l_p = Number(l_s[1]);
        switch (l_s[0].slice(0,2)) {
            case "ac": // action: pl_num : card# : -
                break;
            case "mo": // move: pl_num : card# : toLoc
                break;
            case "re": // resource: pl_num : card# : amt
                break;
            
            case "as": // asset : pl_num : amt : type
                g_valueObject = document.getElementById("a" + l_p + "b" + asset2Num[l_s[3]]);
                if (Number(l_s[2]) < 0) {
                    document.getElementById("spendgainamt").innerHTML = l_s[2].substring(1);
                    clickCalcButton({innerHTML:"-"});
                } else {
                    document.getElementById("spendgainamt").innerHTML = l_s[2];
                    clickCalcButton({innerHTML:"+"});
                }
                break;
            case "cl": // claim : pl_num : name : -
                currentPlayer = l_p;
                clickFund(document.getElementById(l_s[2]));
                // TODO remove clickaway msg?
                break;
            case "ge": // generation : - : endGenNum : -
                clickProduction(document.getElementById("genbutton"));
                break;
            case "in": // increase : pl_num : 1 : oxygen/temp
                if (l_s[3] == "oxygen") {
                    increaseO2(l_p);
                } else if (l_s[3] == "temp") {
                    increaseTemp(l_p);
                }
                break;
            case "pr": // production : pl_num : amt : type
                var l_b = "p" + l_p + "b" + asset2Num[l_s[3]];
                if (Number(l_s[2]) > 0) {
                    clickProdMore(l_b);
                } else {
                    clickProdLess(l_b);
                }
                break;
            case "ti": // tile : pl_num : locNum : type
                document.getElementById("selecttile").value = l_s[3];
                hexSpace[Number(l_s[2])].addTile(l_p);
                break;
            case "nu": // numplayers : num : pname1 : [pname2:...]
                for (var l_pn=1; l_pn <= l_p; l_pn++) {
                    document.getElementById("tname" + l_pn).value = l_s[l_pn + 1];
                    nameDone(l_pn);
                }
                document.getElementById("selectplayers").value = l_p;
                changeNumPlayers(l_p);
                break;
        }
    }
    drawSheet();
    processingHistory = 0;
}

// mouse/touch functions
function process_mousedown(e) {
    var rect = document.getElementById("playarea").getBoundingClientRect();
    touchX = e.clientX - rect.left;
    touchY = e.clientY - rect.top;
}

function process_mouseup(e) {
    var rect = document.getElementById("playarea").getBoundingClientRect();
    touchX = e.clientX - rect.left;
    touchY = e.clientY - rect.top;
    clickBoard(touchX, touchY);
}

function process_mousemove(e) {
    var rect = document.getElementById("playarea").getBoundingClientRect();
    touchX = e.clientX - rect.left;
    touchY = e.clientY - rect.top;
}

function process_touchstart(e) {
    // on touch devices, browser may also call corresponding mouse event
    //   using preventDefault to stop that
    if (e.touches.length === 1) {
        e.preventDefault();
        var rect = document.getElementById("playarea").getBoundingClientRect();
        touchX = e.touches[0].clientX - rect.left;
        touchY = e.touches[0].clientY - rect.top;
    } // ignore multi-finger touches
}

function process_touchend(e) {
    // on touch devices, browser may also call corresponding mouse event
    //   using preventDefault to stop that
    //e.preventDefault();
    // Note that touchend returns a list of fingers still on screen so
    //  when a single finger is picked up, the list is null and we
    // have no x,y coordinates. Use saved coordinates from touchstart/touchmove
    clickBoard(touchX, touchY);
}

function process_touchmove(e) {
    // on touch devices, browser may also call corresponding mouse event
    //   using preventDefault to stop that
    if (e.touches.length === 1) {
        e.preventDefault();
        var rect = document.getElementById("playarea").getBoundingClientRect();
        touchX = e.touches[0].clientX - rect.left;
        touchY = e.touches[0].clientY - rect.top;
    }// ignore multi-finger touches
}



