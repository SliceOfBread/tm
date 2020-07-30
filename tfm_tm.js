var greeneryOnly = 0;


function addHist(hplayer, haction, hdata, hdata2) {
    if (processingHistory) return;
    var historyObj = document.getElementById("history");
    historyObj.value +=  haction + ":" + hplayer + ":" + hdata + ":" + hdata2 + ":\n";
    historyObj.scrollTop = historyObj.scrollHeight;
    if (useStorage) {
        localStorage.setItem("travelformingmars", historyObj.value);
    }
}

function clickLoad() {
    if (typeof(Storage) !== "undefined") {
        if (localStorage.travelformingmars) {
            document.getElementById("history").value = localStorage.getItem("travelformingmars");
            document.getElementById("history").scrollTop = document.getElementById("history").scrollHeight;
        } else {
            window.alert("No data found!");
        }
    }
}

function clickApply() {
    processHistory();
}

function clickClear() {
    document.getElementById("history").value = "";
    //localStorage.removeItem("travelformingmars");
}

function changeMap(m) {
    let ma = document.getElementsByClassName("manda");
    for (let x=0; x < ma.length; x++) {
        ma[x].style.display = "none";
    }
    ma = document.getElementsByClassName("ma" + m.toLowerCase());
    for (let x=0; x < ma.length; x++) {
        ma[x].style.display = "table-cell";
    }

    mapBonus = maps[m].mapBonus;
    mapNames = maps[m].mapNames;
    oceanSpace = maps[m].oceanSpace;
    
    for (let s=0; s < hexSpace.length; s++) {
        hexSpace[s].clearBonuses();
        hexSpace[s].name = "";
        hexSpace[s].ocean = 0;
        hexSpace[s].reserved = false;
    }
    for (let b in mapBonus) {
        // b is "plants", "steel", "titanium" or "card"
        for (var x=0; x < mapBonus[b].length; x++) {
            hexSpace[mapBonus[b][x]].addBonus(b);
        }
    }
    
    for (let b in mapNames) {
        hexSpace[mapNames[b]].name = b;
        if ((b == "Noctis City") || (b == "Ganymede Colony") || (b == "Phobos Space Haven")) {
            hexSpace[mapNames[b]].reserved = true;
        }
    }
    for (let r=0; r < oceanSpace.length; r++) {
        hexSpace[oceanSpace[r]].ocean = 1;
        hexSpace[oceanSpace[r]].reserved = true;
    }
    drawSheet();

}

function changeNumPlayers(n) {
    numPlayers = Number(n);
    var trObj = document.getElementById("p1b6");
    if (numPlayers === 1) {
        trObj.innerHTML = 14;
        if (typeof dupSolo == "undefined") document.getElementById("manda").style.display = "none";
    } else {
        trObj.innerHTML = 20;
        document.getElementById("manda").style.display = "table";
    }
    if (typeof dupSolo == "undefined") for (var p=1; p<=maxPlayers; p++) {
        if (p <= numPlayers) {
            document.getElementById("player" + p).style.display = "table-row";
            document.getElementById("player" + p + "2").style.display = "table-row";
            document.getElementById("splayer" + p).style.display = "table-row";
            document.getElementById("tname" + p).style.display = "inline-block";
            document.getElementById("selectcolorp" + p).style.display = "inline-block";
        } else {
            document.getElementById("player" + p).style.display = "none";
            document.getElementById("player" + p + "2").style.display = "none";
            document.getElementById("splayer" + p).style.display = "none";
            document.getElementById("tname" + p).style.display = "none";
            document.getElementById("selectcolorp" + p).style.display = "none";
        }
    }
}

function clickPlayer(n) {
    for (var p=1; p <= numPlayers; p++) {
        document.getElementById("pn" + p).style.borderWidth = "1px";
    }
    document.getElementById("pn" + n).style.borderWidth = "4px";
    currentPlayer = n;
    
}

function clickProduction(th) {
    if (!oceansLeft && (currentOxygen >= 14) && (currentTemperature >= tempValues.length-1)) {
        if (greeneryOnly) return;
        addMsg("Generation " + th.innerHTML + " ends with production phase");
        addHist(0,"generation",th.innerHTML,0);
        // game ended last generation
        greeneryOnly = 1;
        addMsg("Only greeneries may be built!");
    } else {
        addMsg("Generation " + th.innerHTML + " ends with production phase");
        addHist(0,"generation",th.innerHTML,0);
        firstPlayer = ((firstPlayer) % numPlayers) + 1;
        greeneryOnly = 0;
        th.innerHTML = Number(th.innerHTML) + 1;
    }
    highlightFirstPlayer();
    for (var p=1; p <= numPlayers; p++) {
        var trObj = document.getElementById("p" + p + "b6");
        var oldEnergy = 0;
        for (var t=0; t<6; t++) {
            var assetObj = document.getElementById("a" + p + "b" + t);
            var productionObj = document.getElementById("p" + p + "b" + t);
            var l_amt = 0;
            if (t==0) {
                // add TR to mc
                l_amt = Number(productionObj.innerHTML) + Number(trObj.innerHTML);
                if (l_amt) {
                    assetObj.innerHTML = Number(assetObj.innerHTML) + l_amt;
                    msgPrepend = "--";
                    addMsg(playerName(p) + " gains " + l_amt + " MC");
                }
            } else if (t==4) {
                // move energy to heat (hold temp in oldEnergy)
                oldEnergy = Number(assetObj.innerHTML);
                l_amt = Number(productionObj.innerHTML);
                assetObj.innerHTML = l_amt;
                if (l_amt || oldEnergy) {
                    msgPrepend = "--";
                    addMsg(playerName(p) + " moves " + oldEnergy + " Energy to Heat and gains " + l_amt + " Energy");
                }
            } else {
                l_amt = Number(productionObj.innerHTML);
                assetObj.innerHTML = Number(assetObj.innerHTML) + l_amt + oldEnergy;
                if (l_amt) {
                    msgPrepend = "--";
                    addMsg(playerName(p) + " gains " + l_amt + " " + assetTypes[t]);
                }
            }
        }
    }
}

function playerTurn(p) {
    
}

function updateScores() {
    for (var p=1; p <= numPlayers; p++) {
        var l_tmp = Number(document.getElementById("p" + p + "b6").innerHTML);
        document.getElementById("sctr" + p).innerHTML = l_tmp;
        var l_tot = l_tmp;
        // score greeneries
        l_tmp = 0;
        for (var h=0; h < hexSpace.length; h++) {
            if ((hexSpace[h].ownedBy == p) && (hexSpace[h].tile == "Greenery")) {
                l_tmp++;
            }
        }
        document.getElementById("scgr" + p).innerHTML = l_tmp;
        l_tot += l_tmp;
        // score cities
        l_tmp = 0;
        for (var h=0; h < hexSpace.length; h++) {
            if ((hexSpace[h].ownedBy == p) && ((hexSpace[h].tile == "City") || (hexSpace[h].tile == "Capital"))) {
                for (var hh=0; hh < hexSpace.length; hh++) {
                    if ((hexSpace[hh].tile == "Greenery") && hexSpace[hh].isNextTo(hexSpace[h].x, hexSpace[h].y)) {
                        l_tmp++;
                    }
                }
            }
        }
        document.getElementById("scci" + p).innerHTML = l_tmp;
        l_tot += l_tmp;
        if (typeof dupSolo == "undefined") {
            // score milestones
            l_tmp = 0;
            for (var l_x in milestoneFundedBy) {
                if (milestoneFundedBy[l_x] == p) {
                    l_tmp += 5;
                }
            }
            document.getElementById("scmi" + p).innerHTML = l_tmp;
            l_tot += l_tmp;
            // score awards
            l_tmp = Number(document.getElementById("scaw" + p).value);
            l_tot += l_tmp;
        }
        // get card score
        l_tmp = Number(document.getElementById("scca" + p).value);
        l_tot += l_tmp;
        // total
        document.getElementById("scto" + p).innerHTML = l_tot;
    }
}
