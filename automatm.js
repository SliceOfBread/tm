var NOCTISCITY = 2;

var NUMHEXES = 61; // note this exclude Phobos and Ganymede

var STARTMONEY = 60;

var TM_STEEL =0;
var TM_TITANIUM =1;
var TM_PLANTS =2;
var TM_HEAT =3;

var ADJ_MS_TR = 0;
var ADJ_MS_MAYOR = 1;
var ADJ_MS_GARDENER = 2;

var TP_MONEY =0;
var TP_STEEL =1;
var TP_TITANIUM =2;
var TP_PLANT =3;
var TP_ENERGY =4;
var TP_HEAT =5;
var TP_TR =6;


var ITEM_MONEYPROD =0;
var ITEM_STEELPROD =1;
var ITEM_TITANIUMPROD =2;
var ITEM_PLANTPROD =3;
var ITEM_ENERGYPROD =4;
var ITEM_HEATPROD =5;
var ITEM_ASTEROID =6;
var ITEM_OCEAN =7;
var ITEM_CITY =8;
var ITEM_GREENERY =9;
var ITEM_NOCTIS =10;
var ITEM_MS_TERRAFORMER = 11;
var ITEM_MS_MAYOR = 12;
var ITEM_MS_GARDENER = 13;
var ITEM_TRINCR = 14;

var WI_MS_TRADJ = 0;
var WI_MS_MAYORADJ = 1;
var WI_MS_GARDENERADJ = 2;
var WI_OPPCITYADJ = 3;
var WI_TPMONEY = 4;
var WI_TPSTEEL = 5;
var WI_TPTITANIUM = 6;
var WI_TPPLANT = 7;
var WI_TPENERGY = 8;
var WI_TPHEAT = 9;
var WI_GENDISC = 10;
var WI_OCEANADJ = 11;
var WI_GREENADJ = 12;
var WI_CITYADJ = 13;

var BEN_20REB4 = 0;
var BEN_7PLANTS = 1;
var BEN_STEELPROD = 2;
var BEN_MCANYCITY = 3;
var BEN_UNMI = 4;
var BENCOMBOS = 32;

var prodCost = [6,8,10,11,5,6];
var milestoneNames = ["terraformer","mayor","gardener"];

var wi = [
[0.121240,0.746958,0.090732,2.422381,0.337682,
0.357567,0.143308,0.666844,0.274669,0.324934,
0.047702,0.647710,0.613921,1.327347],
[0.148670,0.109088,0.073501,2.966762,0.369730,
0.353990,0.191692,0.367585,0.288476,0.283089,
0.019717,0.242531,0.367885,0.696537],
[0.037181,0.233721,0.156992,1.946637,0.275040,
0.238025,0.353464,0.464061,0.208985,0.250268,
0.072683,0.440098,0.324625,0.849931],
[0.220565,0.784380,0.034812,1.815075,0.046044,
0.287432,0.240946,0.568361,0.258818,0.300827,
0.005517,0.020534,0.552923,1.903168],
[0.163313,1.207522,0.050552,1.932080,0.697298,
0.478934,0.677877,0.912625,0.010819,0.495896,
0.070705,0.380465,1.658489,1.474316],
[0.402774,0.582240,0.127519,1.868848,0.486160,
0.394432,0.294014,0.688288,0.289904,0.400725,
0.071929,0.153051,0.636995,1.615713],
[0.110552,0.203479,0.142823,1.892991,0.412455,
0.114425,0.235347,0.528122,0.272744,0.297500,
0.102862,0.054974,0.255899,0.822728],
[0.270891,0.264451,0.245972,2.789781,0.523006,
0.449514,0.489179,0.811955,0.380868,0.435845,
0.037973,0.182450,2.218908,2.037807],
[0.120274,0.401315,0.080853,1.774506,0.311715,
0.219293,0.359623,0.505444,0.200300,0.257408,
0.091193,0.332565,0.461479,0.715327],
[0.091275,1.791802,0.412503,1.850261,0.434375,
0.358963,0.376097,0.672570,0.262352,0.328223,
0.064010,0.343654,1.159602,1.335211],
[0.152248,0.410881,0.043559,1.978758,0.437650,
0.211517,0.104316,0.571757,0.235461,0.280687,
0.036462,0.391000,0.281443,1.115650],
[0.026733,1.429702,0.056501,1.914124,0.193881,
0.353059,0.118926,0.614920,0.406740,0.396576,
0.017252,0.139049,0.283763,1.952623],
[0.171568,0.245411,0.032154,2.849771,0.411330,
0.354281,0.019531,0.505329,0.186452,0.253187,
0.006981,0.658302,0.154069,1.608786],
[1.263852,4.000000,0.219628,1.747197,0.758714,
0.490255,0.265402,0.736058,0.736520,0.608356,
0.816832,0.514131,0.072162,0.976396],
[0.504171,1.079913,0.086002,2.868799,0.594977,
0.387152,0.604669,0.718102,0.328259,0.382481,
0.101086,0.852478,0.408821,1.563101],
[0.045911,1.369704,0.042343,1.532311,0.202622,
0.313707,0.145754,0.273547,0.214496,0.236049,
0.120915,0.244979,0.116340,0.575196],
[0.136090,1.291037,0.088398,2.938599,0.476406,
0.447670,0.240040,0.793061,0.096169,0.370436,
0.013315,0.174670,0.525593,0.807774],
[0.223833,0.190654,0.084420,2.827510,0.269589,
0.346294,0.329464,0.297746,0.098626,0.285125,
0.142905,0.199123,0.851716,0.368525],
[0.050668,0.135783,0.023789,1.934517,0.313203,
0.405107,0.131280,0.515648,0.225071,0.311926,
0.061964,0.030625,0.082260,0.511594],
[0.268341,0.856629,0.103011,2.870204,0.381892,
0.369834,0.290408,0.461389,0.121264,0.184450,
0.074322,0.759638,0.640327,0.627574],
[0.480724,0.856268,0.064065,3.240247,0.712762,
0.291636,0.734795,0.710603,0.573410,0.645041,
0.131664,0.263009,0.200808,0.474535],
[0.086053,1.037716,0.053860,2.941003,0.455953,
0.729507,0.118583,0.746679,0.361895,0.421074,
0.025154,0.298168,0.180079,2.030951],
[0.318929,0.634124,2.221207,3.875000,0.635873,
0.316985,0.449304,0.862759,0.193068,0.596181,
0.264752,1.464631,0.098566,0.552379],
[0.156269,0.388009,0.074185,1.821433,0.288794,
0.306299,0.285585,0.437559,0.174055,0.230252,
0.079410,0.475065,0.246428,0.594008],
[0.027616,1.186586,0.083133,2.213067,0.357459,
0.344911,0.129013,0.465852,0.267537,0.360475,
0.009953,0.273003,0.049717,0.503060],
[0.115084,0.625160,0.041305,1.335565,1.314214,
0.970524,0.801723,1.116351,0.157024,0.297623,
0.271425,0.882445,0.783159,0.874736],
[0.044752,0.413517,0.019740,3.162741,0.782197,
0.442694,0.350109,0.812850,0.355578,0.457968,
1.265436,1.262660,0.640722,0.766474],
[0.283871,1.097614,1.152300,2.733286,0.597209,
0.324593,0.195879,0.600791,0.380818,0.373724,
0.119273,1.222614,0.661504,1.115328],
[0.013069,0.190130,0.071442,4.000000,1.447798,
0.200240,0.749641,1.039247,0.052836,0.976025,
0.797800,0.037030,0.347763,0.547120],
[0.039616,1.491883,0.071897,1.830660,0.199573,
0.237284,0.079500,0.244320,0.177396,0.191987,
0.005620,0.742289,0.501065,0.393654],
[0.257978,4.000000,0.847699,3.168648,2.525411,
0.771586,1.112197,1.392108,0.140432,0.426820,
1.693682,0.351004,0.270680,0.935657],
[0.440978,0.501300,0.269116,2.922759,0.627821,
0.476758,0.539728,0.742816,0.232356,0.442258,
0.070804,0.584691,0.072396,1.615301],
[0.030526,0.180384,0.024065,1.645574,0.075730,
0.155811,0.080235,0.303336,0.077350,0.160512,
0.009160,0.066082,0.096292,0.675167],
[0.050935,0.369709,0.022350,1.526375,0.076662,
0.166615,0.120503,0.358511,0.056314,0.212539,
0.011106,0.066824,0.073244,0.746171],
[0.321316,1.759378,1.316131,1.570886,
0.086026,0.258219,0.269907,0.457469,0.099251,0.174518,
0.082301,
0.040626,
0.044272,
0.783894]
];


var productionAllowed = [1,1,1,1,1,1];
var TRthisGen = [0,0,0,0,0,0];
var greeneryOnly = 0;
var playersNotPassed;
var greeneriesOwned = [];
var citiesOwned = [];

function addHist(hplayer, haction, hdata, hdata2) {
    if (processingHistory) return;
    var historyObj = document.getElementById("history");
    historyObj.value +=  haction + ":" + hplayer + ":" + hdata + ":" + hdata2 + ":\n";
    historyObj.scrollTop = historyObj.scrollHeight;
    if (useStorage) {
        localStorage.setItem("automatm", historyObj.value);
    }
}

function automataStart() {
    playersNotPassed = (1 << numPlayers) - 1;
    greeneryOnly = 0;
    for (var p = 1; p <= numPlayers; p++) {
        greeneriesOwned[p] = 0;
        citiesOwned[p] = 0;
        document.getElementById("passbox" + p).checked = false;
        if (document.getElementById("botcheck" + p).checked) {
            // -set global to point to asset "money"
            g_valueObject = document.getElementById("a" + p + "b0");
            // -set cost as if it were typed in
            document.getElementById("spendgainamt").innerHTML = STARTMONEY;
            // -"click" button to subtract cost
            clickCalcButton({innerHTML:"+"});
        }
    }
}

function botGotCard(p,th) {
    if (document.getElementById("botcheck" + p).checked) {
        // bot got 1 or more cards, sell right away
        msgPrepend = "--";
        addMsg("bots immediately sell cards without using action");
        increaseAsset(asset2Num["MC"], p, th.bonus.card);
        document.getElementById("clickawaymsg").style.display = "none";
    }
}

function clickLoad() {
    if (typeof(Storage) !== "undefined") {
        if (localStorage.automatm) {
            document.getElementById("history").value = localStorage.getItem("automatm");
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
    //localStorage.removeItem("automatm");
}

function clickProduction(th) {
    if (greeneryOnly) return;
    addMsg("Generation " + th.innerHTML + " ends with production phase");
    addHist(0,"generation",th.innerHTML,0);
    if (!oceansLeft && (currentOxygen >= 14) && (currentTemperature >= tempValues.length-1)) {
        // game ended last generation
        greeneryOnly = 1;
        addMsg("Only greeneries may be built!");
    } else {
        firstPlayer = ((firstPlayer) % numPlayers) + 1;
        greeneryOnly = 0;
        th.innerHTML = Number(th.innerHTML) + 1;
    }
    playersNotPassed = (1 << numPlayers) - 1;
    highlightFirstPlayer();
    for (var p=1; p <= numPlayers; p++) {
        document.getElementById("passbox" + p).checked = false;
        TRthisGen[p] = 0;
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
    if (!processingHistory) {
        setTimeout(clickPlayer, 100, firstPlayer);
    }
}

function changeBotCheck(p) {
    if (document.getElementById("botcheck" + p).checked) {
        document.getElementById("tname" + p).value = "Automa" + p;
        document.getElementById("tname" + p).setAttribute("disabled", 1);
        document.getElementById("passbox" + p).setAttribute("disabled", 1);
        document.getElementById("benpl" + p).style.display = "table-row";
    } else {
        document.getElementById("tname" + p).value = "Player " + p;
        document.getElementById("tname" + p).removeAttribute("disabled");
        document.getElementById("passbox" + p).removeAttribute("disabled");
        document.getElementById("benpl" + p).style.display = "none";
        for (var b=0; b <= BEN_UNMI; b++) {
            document.getElementById("ben" + p + "b" + b).checked = false;
        }
    }
    nameDone(p);
}

function changeNumPlayers(n) {
    numPlayers = Number(n);
    for (var p=1; p<=maxPlayers; p++) {
        if (p <= numPlayers) {
            document.getElementById("player" + p).style.display = "table-row";
            document.getElementById("player" + p + "2").style.display = "table-row";
            document.getElementById("splayer" + p).style.display = "table-row";
            document.getElementById("tname" + p).style.display = "inline-block";
            document.getElementById("selectcolorp" + p).style.display = "inline-block";
            document.getElementById("botcheck" + p).style.display = "inline-block";
            if (document.getElementById("botcheck" + p).checked) {
                document.getElementById("benpl" + p).style.display = "table-row";
            } else {
                document.getElementById("benpl" + p).style.display = "none";
            }
        } else {
            document.getElementById("player" + p).style.display = "none";
            document.getElementById("player" + p + "2").style.display = "none";
            document.getElementById("splayer" + p).style.display = "none";
            document.getElementById("tname" + p).style.display = "none";
            document.getElementById("selectcolorp" + p).style.display = "none";
            document.getElementById("botcheck" + p).style.display = "none";
            document.getElementById("benpl" + p).style.display = "none";
        }
    }
}

function setCurrentPlayer(n) {
    for (var p=1; p <= numPlayers; p++) {
        document.getElementById("pn" + p).style.borderWidth = "1px";
        if (!document.getElementById("botcheck" + p).checked) {
            allBots = 0;
        }
    }
    document.getElementById("pn" + n).style.borderWidth = "4px";
    currentPlayer = n;
}

function clickPlayer(n) {
    var allBots = 1;
    setCurrentPlayer(n);
    //if (allBots) {
        //// only bots playing
        //// play each player that hasn't passed repeatedly
        
        //// produce and go to next generation (if game end condition, greenery only)
        ////TODO
    //} else 
    if (document.getElementById("passbox" + n).checked) {
        playersNotPassed ^= 1 << (n - 1);
    }
    if ((1 << (currentPlayer-1)) & playersNotPassed) {
        if (document.getElementById("botcheck" + n).checked) {
            // current player is a bot
            // play 
            playerTurn(n);
            drawSheet();
            // whether bot played or had passed, go to next player
            // This will essentially loop until a non-bot player is found
            // or all bots/players pass.
            // At that point, we need to produce and go to next generation
            if (playersNotPassed) {
                currentPlayer = (currentPlayer % numPlayers) + 1;
                setTimeout(clickPlayer, 100, currentPlayer);
            }
        }
    } else {
        // player or bot has passed
        // if not all players/bots have passed, go to next player/bot
        if (playersNotPassed) {
            currentPlayer = (currentPlayer % numPlayers) + 1;
            setTimeout(clickPlayer, 100, currentPlayer);
        }
    }
}

function numOnes(checkNum) {
    var tmp = 0;
    for (var i=1; i <= checkNum; i = i << 1) {
        if (checkNum & i) tmp++;
    }
    return(tmp);
}

function randomizeOptions() {
    var difficulty = Number(document.getElementById("randomize").value);
    for (var p=1; p <= 5; p++) {
        for (var b=0; b <= BEN_UNMI; b++) {
            document.getElementById("ben" + p + "b" + b).checked = false;
        }
    }
    if (difficulty) {
        var diffOptions = [];
        for (var i=0; i < BENCOMBOS; i++) {
            // create array of all benefit combos of specified difficulty
            if (numOnes(i) == difficulty) {
                diffOptions.push(i);
            }
        }
        var rand;
        for (var p=1; p <= numPlayers; p++) {
            // skip players that are not bots
            if (!document.getElementById("botcheck" + p).checked) continue;
            rand = Math.floor(Math.random() * diffOptions.length);
            for (var b=0; b <= BEN_UNMI; b++) {
                if (diffOptions[rand] & (1 << b)) {
                    document.getElementById("ben" + p + "b" + b).checked = true;
                }
            }
            if (diffOptions.length > 1) {
                // remove used combo (unless there is only 1 combo)
                diffOptions.splice(rand, 1);
            }
        }
        
        Math.floor(Math.random() * 10);
    }
}

function playerTurn(p) {
    var actionsTaken = 0;
    var playerPassed = 0;
    var totalGensExpected = [14, 11, 9, 8];
    var wi_cp;
    var botNum = 0;
    var g_cp = new Object();
    g_cp.haveBenefit = [];
    for (var i=0; i <= BEN_UNMI; i++) {
        g_cp.haveBenefit[i] = 0;
        if (document.getElementById("ben"+currentPlayer+"b"+i).checked) {
            g_cp.haveBenefit[i] = 1;
            botNum |= 1 << i;
        }
    }
    wi_cp = wi[botNum];
    
    while (!playerPassed && (actionsTaken < 2)) {
        g_cp.TR = Number(document.getElementById("p"+currentPlayer+"b6").innerHTML);
        g_cp.greeneriesOwned = 0;
        g_cp.citiesOwned = 0;
        for (var h=0; h<NUMHEXES; h++) {
            if (hexSpace[h].tile && (hexSpace[h].ownedBy == currentPlayer)) {
                if (hexSpace[h].tile == "Greenery") g_cp.greeneriesOwned++;
                if ((hexSpace[h].tile == "City") || (hexSpace[h].tile == "Capital")) g_cp.citiesOwned++;
            }
        }
        
        g_cp.inventory = [];
        g_cp.production = [];
        for (var i=0; i<6; i++) {
            g_cp.inventory[i] = Number(document.getElementById("a"+currentPlayer+"b"+i).innerHTML);
            g_cp.production[i] = Number(document.getElementById("p"+currentPlayer+"b"+i).innerHTML);
        }
    
        var bestReturn = 0;
        var bestItem = -1;
        var tmpCost, tmpValue;
        var thisReturn;
        
        bestReturn = 0;
        bestItem = -1;
        var gensLeft = totalGensExpected[numPlayers-2] - Number(document.getElementById("genbutton").innerHTML);
        if (gensLeft < 0) gensLeft = 0;
        if (!oceansLeft && (currentOxygen >= 14) && (currentTemperature >= tempValues.length-1)) {
            gensLeft = 0;
        }
        var netPresentValue = 0;
        for (var g=gensLeft; g > 0; g--) {
            netPresentValue += 1.0 / Math.pow(wi_cp[WI_GENDISC] + 1, g);
        }
        
        // check for TR increase benefit
        if (!greeneryOnly && g_cp.haveBenefit[BEN_UNMI] && 
            (TRthisGen[currentPlayer]== 1) && (g_cp.inventory[TP_MONEY] >= 3)) {
            tmpCost = 3;
            tmpValue = 1;
            tmpValue += wi_cp[WI_TPMONEY] * netPresentValue;
            thisReturn = tmpValue/tmpCost;
            if (thisReturn > bestReturn) {
                bestReturn = thisReturn;
                bestItem = ITEM_TRINCR;
            }
        }
                    
        // can we get a Milestone? If so, determine value
        if (!greeneryOnly && (milestonesFunded < 3) && (g_cp.inventory[TP_MONEY] >= 8)) {
            for (var t in milestoneFundedBy) {
                if (milestoneFundedBy[t]) continue;
                if (t == "builder") continue;
                if (t == "planner") continue;
                var ms = 50;
                if (t == "terraformer") {
                    if (g_cp.TR < 35) continue;
                    ms = ITEM_MS_TERRAFORMER;
                } else if (t == "mayor") {
                    if (g_cp.citiesOwned < 3) continue;
                    ms = ITEM_MS_MAYOR;
                } else {
                    if (g_cp.greeneriesOwned < 3) continue;
                    ms = ITEM_MS_GARDENER;
                }
                thisReturn = 5.0 / 8.0;
                if (thisReturn > bestReturn) {
                    bestReturn = thisReturn;
                    bestItem = ms;
                }
            }
        }
                    
        // can we buy production? If so, determine values
        if (productionAllowed[currentPlayer] && !greeneryOnly) {
            for (var t=ITEM_MONEYPROD; t<=ITEM_HEATPROD; t++) {
                tmpCost = prodCost[t] + g_cp.production[t];
                if (tmpCost > g_cp.inventory[TP_MONEY]) continue;
                tmpValue = wi_cp[t - ITEM_MONEYPROD + WI_TPMONEY] * netPresentValue;
                if (t == ITEM_PLANTPROD) {
                    tmpValue += wi_cp[WI_TPPLANT];
                }
                if (tmpValue < 1) continue;
                thisReturn = tmpValue/tmpCost;
                if (thisReturn > bestReturn) {
                    bestReturn = thisReturn;
                    bestItem = t;
                }
            }
        }
        
        var h, cityOK, adjGreeneries, adjEmpty, tmpOceanRefund;
        var legalGreenSpace = 0;
        
        for ( h=0; h<NUMHEXES; h++) {
            if (hexSpace[h].ocean) continue;
            if (hexSpace[h].tile && (hexSpace[h].ownedBy == currentPlayer)) {
                for (var n=0; n<hexSpace[h].neighbors.length; n++) {
                    if (hexSpace[hexSpace[h].neighbors[n]].ocean) continue;
                    if (!hexSpace[hexSpace[h].neighbors[n]].tile) legalGreenSpace = 1;
                }
            }
            if (legalGreenSpace) break;
        }
        
        var hexAllows = [];
        for ( h=0; h<NUMHEXES; h++) {
            // determine which hexes can be built on and with what
            hexAllows[h] = 0;
            // can't build on Noctis
            if (h == NOCTISCITY) continue;
            // check hex alread has tile
            if (hexSpace[h].tile) continue;
            if (hexSpace[h].ocean) {
                // if ocean space then ocean only
                if (!greeneryOnly) hexAllows[h] = 1;
                continue;
            }
            
            // cities cannot be next to other cities
            cityOK = 1;
            for (var n=0; n<hexSpace[h].neighbors.length; n++) {
                if ((hexSpace[hexSpace[h].neighbors[n]].tile == "City") || (hexSpace[hexSpace[h].neighbors[n]].tile == "Capital")) cityOK = 0; 
            }
            if (cityOK && !greeneryOnly) hexAllows[h] = 2;
            
            // greenery must be next to player's own tile if possible
            // i.e. if player owns a tile and there is a empty, non-ocean space
            // neighbor then player must place in a space like that OTHERWISE
            // any empty non-ocean space can be used
            // legalGreenSpace tells us there is at least one such spot
            // if !legalGreenSpace, any empty non-ocean hex is ok
            if (!legalGreenSpace) {
                hexAllows[h] |= 4;
            } else {
                for (var n=0; n<hexSpace[h].neighbors.length; n++) {
                    if (hexSpace[hexSpace[h].neighbors[n]].ocean) continue;
                    if (hexSpace[hexSpace[h].neighbors[n]].tile && 
                        (hexSpace[hexSpace[h].neighbors[n]].ownedBy==currentPlayer)) {
                        hexAllows[h] |= 4;
                    }
                }
            }
        }
            
        // determine value for an ocean
        var bestOceanValue = 0;
        var bestOcean;
        for ( h=0; h<NUMHEXES; h++) {
            if (hexAllows[h] & 1) {
                tmpOceanRefund = 0;
                for (var n=0; n<hexSpace[h].neighbors.length; n++) {
                    if (hexSpace[hexSpace[h].neighbors[n]].tile == "Ocean") tmpOceanRefund += 2;
                }
                // determine value of ocean space
                if (oceansLeft) {
                    tmpCost = 18 - tmpOceanRefund;
                    tmpCost -= hexSpace[h].bonus.card; 
                    tmpValue = 1;
                    // add value if TERRAFORMER milestone still available
                    if ((milestonesFunded < 3) && !milestoneFundedBy["terraformer"]) {
                        tmpValue += wi_cp[WI_MS_TRADJ];
                    }
                    // add value of future money generated by TR
                    tmpValue += wi_cp[WI_TPMONEY] * netPresentValue;
                    // add value of any stuff gained
                    tmpValue += hexSpace[h].bonus.plants * wi_cp[WI_TPPLANT];
                    tmpValue += hexSpace[h].bonus.steel * wi_cp[WI_TPSTEEL];
                    if ((hexSpace[h].bonus.steel || hexSpace[h].bonus.titanium) && g_cp.haveBenefit[BEN_STEELPROD]) {
                        tmpValue += wi_cp[WI_TPSTEEL] * netPresentValue;
                    }
                    tmpValue += hexSpace[h].bonus.titanium * wi_cp[WI_TPTITANIUM];
                    // add value if next to empty space next to our city (sub if other city)
                    for (var n=0; n<hexSpace[h].neighbors.length; n++) {
                        if (!hexSpace[hexSpace[h].neighbors[n]].tile && !hexSpace[hexSpace[h].neighbors[n]].ocean) {
                            // have an empty space and it's not an ocean
                            // adj value if next to our or others cities
                            for (var nn=0; nn<hexSpace[hexSpace[h].neighbors[n]].neighbors.length; nn++) {
                                if ((hexSpace[hexSpace[hexSpace[h].neighbors[n]].neighbors[nn]].tile == "City") || (hexSpace[hexSpace[hexSpace[h].neighbors[n]].neighbors[nn]].tile == "Capital")) {
                                    if (hexSpace[hexSpace[hexSpace[h].neighbors[n]].neighbors[nn]].ownedBy == currentPlayer) {
                                        tmpValue += wi_cp[WI_OCEANADJ];
                                    } else {
                                        tmpValue -= wi_cp[WI_OCEANADJ];
                                    }
                                }
                            }
                        }
                    }
                    thisReturn = tmpValue/tmpCost;
                    if (tmpValue > bestOceanValue) {
                        bestOceanValue = tmpValue;
                        bestOcean = ITEM_OCEAN | (h << 8);
                    }
                    if ((thisReturn > bestReturn)  && (g_cp.inventory[TP_MONEY] >= 18)) {
                        bestReturn = thisReturn;
                        bestItem = ITEM_OCEAN | (h << 8);
                    }
                }
            }
        }
        
        asteroidValue = 0;
        if ((tempValues[currentTemperature] < 8) &&
            ((g_cp.inventory[TP_MONEY] >= 14) || (g_cp.inventory[TP_HEAT] >= 8))) {
            // determine value of Asteroid
            //if (g_cp.inventory[TP_HEAT] >= 8) {
                //tmpCost = 8 * wi_cp.toMoney[TM_HEAT];
            //} else {
                // Asteroid cost 14
                tmpCost = 14;
            //}
            // value is 1 point for TR
            tmpValue = 1;
            // add value if TERRAFORMER milestone still available
            if ((milestonesFunded < 3) && !milestoneFundedBy["terraformer"]) {
                tmpValue += wi_cp[WI_MS_TRADJ];
            }
            // add value of future money generated by TR
            tmpValue += wi_cp[WI_TPMONEY] * netPresentValue;
            // if we also get a heat prod, add future value of that
            if ((tempValues[currentTemperature] == -26) || (tempValues[currentTemperature] == -22)) {
                tmpValue += wi_cp[WI_TPHEAT] * netPresentValue;
            } else if (tempValues[currentTemperature] == -2) {
                // if temp is -2 then if ocean tiles exist add their value also
                tmpValue += bestOceanValue;
            }
            thisReturn = tmpValue/tmpCost;
            asteroidValue = tmpValue;
            if (thisReturn > bestReturn) {
                bestReturn = thisReturn;
                bestItem = ITEM_ASTEROID;
            }
        }
        
        var outCost;
        var pricePaid;
        var steelSpent, maxTitanium;
        for ( h=0; h<NUMHEXES; h++) {
            if (hexAllows[h]) {
                adjGreeneries = 0;
                adjEmpty = 0;
                tmpOceanRefund = 0;
                for (var n=0; n<hexSpace[h].neighbors.length; n++) {
                    if (hexSpace[hexSpace[h].neighbors[n]].tile == "Ocean") tmpOceanRefund += 2;
                    if (hexSpace[hexSpace[h].neighbors[n]].tile == "Greenery") adjGreeneries += 1;
                    if (!hexSpace[hexSpace[h].neighbors[n]].tile && (!hexSpace[hexSpace[h].neighbors[n]].ocean)) adjEmpty += 1;
                }
                if (hexAllows[h] & 4) {
                    // determine value of greenery space
                    if ((g_cp.inventory[TP_PLANT] >= (8 - g_cp.haveBenefit[BEN_7PLANTS])) || (!greeneryOnly && g_cp.inventory[TP_MONEY] >= 23)) {
                        tmpCost = 23;
                        // subtract rebate if have that power and will pay with money
                        if (g_cp.haveBenefit[BEN_20REB4] && (g_cp.inventory[TP_PLANT] < (8 - g_cp.haveBenefit[BEN_7PLANTS]))) {
                            tmpCost -= 4;
                        }
                        tmpCost -= tmpOceanRefund;
                        tmpCost -= hexSpace[h].bonus.card;
                        // greenery worth 1
                        tmpValue = 1;
                        // add value of any stuff gained
                        tmpValue += hexSpace[h].bonus.plants * wi_cp[WI_TPPLANT];
                        tmpValue += hexSpace[h].bonus.steel * wi_cp[WI_TPSTEEL];
                        if ((hexSpace[h].bonus.steel || hexSpace[h].bonus.titanium) && g_cp.haveBenefit[BEN_STEELPROD]) {
                            tmpValue += wi_cp[WI_TPSTEEL] * netPresentValue;
                        }
                        tmpValue += hexSpace[h].bonus.titanium * wi_cp[WI_TPTITANIUM];
                        // add value if GARDENER milestone still available
                        if ((milestonesFunded < 3) && !milestoneFundedBy["gardener"]) {
                            tmpValue += wi_cp[WI_MS_GARDENERADJ];
                        }
                        // if O2 not maxed, worth 1 TR
                        if (currentOxygen < 14) {
                            tmpValue++;
                            tmpValue += wi_cp[WI_TPMONEY] * netPresentValue;
                            // add value if TERRAFORMER milestone still available
                            if ((milestonesFunded < 3) && !milestoneFundedBy["terraformer"]) {
                                tmpValue += wi_cp[WI_MS_TRADJ];
                            }
                            if (currentOxygen == 7) {
                                // if O2 is 7 then add value of Temp increase
                                tmpValue += asteroidValue;
                            }
                        }
                        // if next to our city +1, if next to other city -0.9
                        // TODO Also, minus greenAdj if next to a 'cityable' space unless
                        //    we can build there this turn
                        
                        // increase value if greenery is next to our city
                        // decrease value if next to opponents but only most prevalent opponent
                        // (i.e. no need to decrease value by 2 points if only 1 is going to each opponent)
                        var adjCities = [];
                        for (var p=1; p <= numPlayers; p++) {
                            adjCities[p] = 0;
                        }
                        for (var n=0; n<hexSpace[h].neighbors.length; n++) {
                            if ((hexSpace[hexSpace[h].neighbors[n]].tile == "City") || (hexSpace[hexSpace[h].neighbors[n]].tile == "Capital")) {
                                adjCities[hexSpace[hexSpace[h].neighbors[n]].ownedBy]++;
                                //if (hexSpace[hexSpace[h].neighbors[n]].ownedBy == currentPlayer) {
                                    //tmpValue++;
                                //} else {
                                    //tmpValue -= 0.9; // TODO make this adjustable?
                                //}
                            }
                        }
                        tmpValue += adjCities[currentPlayer];
                        var maxAdj = 0;
                        for (var p=1; p <= numPlayers; p++) {
                            if (p == currentPlayer) continue;
                            if (adjCities[p] > maxAdj) maxAdj = adjCities[p];
                        }
                        tmpValue -= wi_cp[WI_OPPCITYADJ] * maxAdj;
                        
                        if (tmpCost <= 0) tmpCost = 0.1;
                        thisReturn = tmpValue/tmpCost;
                        if (thisReturn > bestReturn) {
                            bestReturn = thisReturn;
                            bestItem = ITEM_GREENERY | (h << 8);
                        }
                    }
                }
                
                // determine value of city for every legal city space
                // cities can be partially paid for with steel and titanium but
                // # steel > # titanium
                maxTitanium = 0;
                if (g_cp.inventory[TP_STEEL]) maxTitanium = g_cp.inventory[TP_STEEL] - 1;
                if (g_cp.inventory[TP_TITANIUM] < maxTitanium) maxTitanium = g_cp.inventory[TP_TITANIUM];
                // if # titanium is 5 (or more) then 5*3 +6*2=27 so only 5 steel needed
                //  so maxTitanium is always 4 at most
                if (maxTitanium > 4) maxTitanium = 4;
                if (!greeneryOnly && (hexAllows[h] & 2) && ((g_cp.inventory[TP_MONEY] + g_cp.inventory[TP_STEEL]*2 + maxTitanium*3) >= 25)) {
                    var pricePaid;
                    tmpCost = 25;
                    tmpCost -= tmpOceanRefund;
                    // subtract rebate if have that power
                    if (g_cp.haveBenefit[BEN_20REB4]) tmpCost -= 4;
                    tmpCost -= hexSpace[h].bonus.card;
                    // add value of adjacent greeneries
                    tmpValue = adjGreeneries;
                    // add value of any stuff gained
                    tmpValue += hexSpace[h].bonus.plants * wi_cp[WI_TPPLANT];
                    tmpValue += hexSpace[h].bonus.steel * wi_cp[WI_TPSTEEL];
                    if ((hexSpace[h].bonus.steel || hexSpace[h].bonus.titanium) && g_cp.haveBenefit[BEN_STEELPROD]) {
                        tmpValue += wi_cp[WI_TPSTEEL] * netPresentValue;
                    }
                    tmpValue += hexSpace[h].bonus.titanium * wi_cp[WI_TPTITANIUM];
                    // add value if MAYOR milestone still available
                    if ((milestonesFunded < 3) && !milestoneFundedBy["mayor"]) {
                        tmpValue += wi_cp[WI_MS_MAYORADJ];
                    }
                    // add value of money production
                    tmpValue += wi_cp[WI_TPMONEY] * netPresentValue;
                    // adjust for nearby empty spaces
                    tmpValue += adjEmpty * wi_cp[WI_CITYADJ];
                    
                    // ensure tmpCost can't be 0 or negative
                    if (tmpCost <= 0) tmpCost = 0.1;
                    thisReturn = tmpValue/tmpCost;
                    if (thisReturn > bestReturn) {
                        bestReturn = thisReturn;
                        bestItem = ITEM_CITY | (h << 8);
                    }
                }
            }
        }
        
        var outCost;
        var paidMC;
        if ((bestItem != -1) && (bestReturn > 0)) {
            // buy best item
            if (!greeneryOnly) actionsTaken++;
            var tmp;
            var tmpItem = bestItem & 0xff;
            switch (tmpItem) {
                case ITEM_MONEYPROD:
                case ITEM_STEELPROD:
                case ITEM_TITANIUMPROD:
                case ITEM_PLANTPROD:
                case ITEM_HEATPROD:
                case ITEM_ENERGYPROD:
                    // buy production
                    // -determine cost
                    outCost = prodCost[tmpItem] + g_cp.production[tmpItem];
                    g_cp.inventory[TP_MONEY] -= outCost;
                    // -set global to point to asset "money"
                    g_valueObject = document.getElementById("a" + currentPlayer + "b0");
                    // -set cost as if it were typed in
                    document.getElementById("spendgainamt").innerHTML = outCost;
                    // -"click" button to subtract cost
                    clickCalcButton({innerHTML:"-"});
                    // -"click" button that adds 1 production
                    clickProdMore("p" + currentPlayer + "b" + tmpItem);
                    break;
                case ITEM_ASTEROID:
                    // increase temperature with heat or asteroid
                    // -determine cost
                    if (g_cp.inventory[TP_HEAT] >= 8) {
                        outCost = 8;
                        tmp = TP_HEAT;
                    } else {
                        outCost = 14;
                        tmp = TP_MONEY;
                    }
                    g_cp.inventory[tmp] -= outCost;
                    // -set global to point to correct asset 
                    g_valueObject = document.getElementById("a" + currentPlayer + "b" + tmp);
                    // -set cost as if it were typed in
                    document.getElementById("spendgainamt").innerHTML = outCost;
                    // -"click" button to subtract cost
                    clickCalcButton({innerHTML:"-"});
                    
                    if (!TRthisGen[currentPlayer]) {TRthisGen[currentPlayer] = 1;}
                    // increase temperature
                    increaseTemp(currentPlayer);
                    // note: if we get heat prod, that will happen automatically but
                    // if get free ocean placement we need to do that here
                    if ((tempValues[currentTemperature] === 0)  && (oceansLeft)) {
                        // place tile
                        document.getElementById("selecttile").value = "Ocean";
                        hexSpace[(bestOcean & 0xff00) >> 8].addTile(currentPlayer);                                    
                    }
                    break;
                case ITEM_OCEAN:
                    // buy ocean
                    // -determine cost
                    outCost = 18;
                    g_cp.inventory[TP_MONEY] -= outCost;
                    // -set global to point to asset "money"
                    g_valueObject = document.getElementById("a" + currentPlayer + "b0");
                    // -set cost as if it were typed in
                    document.getElementById("spendgainamt").innerHTML = outCost;
                    // -"click" button to subtract cost
                    clickCalcButton({innerHTML:"-"});
                    
                    if (!TRthisGen[currentPlayer]) {TRthisGen[currentPlayer] = 1;}
                    // place tile
                    document.getElementById("selecttile").value = "Ocean";
                    hexSpace[(bestItem & 0xff00) >> 8].addTile(currentPlayer);
                    // deal with BEN_STEELPROD, if place tile and get steel or titanium bonus, add steel production
                    if ((hexSpace[(bestItem & 0xff00) >> 8].bonus.steel || hexSpace[(bestItem & 0xff00) >> 8].bonus.titanium) && g_cp.haveBenefit[BEN_STEELPROD]) {
                        g_cp.production[TP_STEEL]++;
                        clickProdMore("p" + currentPlayer + "b" + TP_STEEL);
                    }
                    break;
                case ITEM_GREENERY:
                    // buy / make greenery
                    // -determine cost
                    paidMC = 0;
                    if (g_cp.inventory[TP_PLANT] >= (8 - g_cp.haveBenefit[BEN_7PLANTS])) {
                        outCost = 8 - g_cp.haveBenefit[BEN_7PLANTS];
                        tmp = TP_PLANT;
                    } else {
                        outCost = 23;
                        tmp = TP_MONEY;
                        paidMC = 1;
                    }
                    g_cp.inventory[tmp] -= outCost;
                    // -set global to point to correct asset 
                    g_valueObject = document.getElementById("a" + currentPlayer + "b" + tmp);
                    // -set cost as if it were typed in
                    document.getElementById("spendgainamt").innerHTML = outCost;
                    // -"click" button to subtract cost
                    clickCalcButton({innerHTML:"-"});
                
                    // place tile
                    document.getElementById("selecttile").value = "Greenery";
                    if (currentOxygen < 14) {
                        if (!TRthisGen[currentPlayer]) {TRthisGen[currentPlayer] = 1;}
                    }
                    hexSpace[(bestItem & 0xff00) >> 8].addTile(currentPlayer);
                    // deal with BEN_STEELPROD, if place tile and get steel or titanium bonus, add steel production
                    if ((hexSpace[(bestItem & 0xff00) >> 8].bonus.steel || hexSpace[(bestItem & 0xff00) >> 8].bonus.titanium) && g_cp.haveBenefit[BEN_STEELPROD]) {
                        g_cp.production[TP_STEEL]++;
                        clickProdMore("p" + currentPlayer + "b" + TP_STEEL);
                    }
                    // deal with BEN_20REB4, if spend 20+ on standard project -> get 4 back
                    if (g_cp.haveBenefit[BEN_20REB4] && paidMC) {
                        g_cp.inventory[TP_MONEY] += 4;
                        // -set global to point to correct asset 
                        g_valueObject = document.getElementById("a" + currentPlayer + "b" + TP_MONEY);
                        // -set rebate as if it were typed in
                        document.getElementById("spendgainamt").innerHTML = 4;
                        // -"click" button to add rebate
                        clickCalcButton({innerHTML:"+"});  
                    }
                    // note: if we get temp increase, that will happen automatically but
                    // if we also get free ocean placement we need to do that manually
                    if ((currentOxygen == 8) && (tempValues[currentTemperature] === 0)  && (oceansLeft)) {
                        // place tile
                        document.getElementById("selecttile").value = "Ocean";
                        hexSpace[(bestOcean & 0xff00) >> 8].addTile(currentPlayer);                                    
                    }
                    break;
                case ITEM_CITY:
                    steelSpent = 0;
                    pricePaid = maxTitanium * 3;
                    if (maxTitanium) {
                        g_cp.inventory[TP_TITANIUM] -= maxTitanium;
                        // -set global to point to correct asset 
                        g_valueObject = document.getElementById("a" + currentPlayer + "b" + TP_TITANIUM);
                        // -set cost as if it were typed in
                        document.getElementById("spendgainamt").innerHTML = maxTitanium;
                        // -"click" button to subtract cost
                        clickCalcButton({innerHTML:"-"});
                    }
                    
                    for (var x=0; x < g_cp.inventory[TP_STEEL]; x++) {
                        if (pricePaid < 25) {
                            pricePaid += 2;
                            steelSpent++;
                        } else {
                            break;
                        }
                    }
                    
                    if (steelSpent) {
                        g_cp.inventory[TP_STEEL] -= steelSpent;
                        // -set global to point to correct asset 
                        g_valueObject = document.getElementById("a" + currentPlayer + "b" + TP_STEEL);
                        // -set cost as if it were typed in
                        document.getElementById("spendgainamt").innerHTML = steelSpent;
                        // -"click" button to subtract cost
                        clickCalcButton({innerHTML:"-"});
                    }
                    
                    if (pricePaid < 25) {
                        g_cp.inventory[TP_MONEY] -= 25-pricePaid;
                        // -set global to point to correct asset 
                        g_valueObject = document.getElementById("a" + currentPlayer + "b" + TP_MONEY);
                        // -set cost as if it were typed in
                        document.getElementById("spendgainamt").innerHTML = 25-pricePaid;
                        // -"click" button to subtract cost
                        clickCalcButton({innerHTML:"-"});                        
                    }
                    
                    
                    // place tile
                    document.getElementById("selecttile").value = "City";
                    hexSpace[(bestItem & 0xff00) >> 8].addTile(currentPlayer);
                    
                    // add 1 production of money
                    // -"click" button that adds 1 production
                    clickProdMore("p" + currentPlayer + "b" + TP_MONEY);
                    
                    // deal with BEN_20REB4, if spend 20+ on standard project -> get 4 back
                    if (g_cp.haveBenefit[BEN_20REB4]) {
                        g_cp.inventory[TP_MONEY] += 4;
                        // -set global to point to correct asset 
                        g_valueObject = document.getElementById("a" + currentPlayer + "b" + TP_MONEY);
                        // -set rebate as if it were typed in
                        document.getElementById("spendgainamt").innerHTML = 4;
                        // -"click" button to add rebate
                        clickCalcButton({innerHTML:"+"});  
                    }
                    // deal with BEN_STEELPROD, if place tile and get steel or titanium bonus, add steel production
                    if ((hexSpace[(bestItem & 0xff00) >> 8].bonus.steel || hexSpace[(bestItem & 0xff00) >> 8].bonus.titanium) && g_cp.haveBenefit[BEN_STEELPROD]) {
                        g_cp.production[TP_STEEL]++;
                        clickProdMore("p" + currentPlayer + "b" + TP_STEEL);
                    }
                    // deal with BEN_MCANYCITY, if any player places city, player with this benefit gets 1 MC production
                    for (var p=1; p<=numPlayers; p++) {
                        if (document.getElementById("ben"+p+"b"+BEN_MCANYCITY).checked) {
                            // if ANY player has this benefit, they get 1 MC production
                            clickProdMore("p" + p + "b" + TP_MONEY);
                            if (p == currentPlayer) {
                                g_cp.production[TP_MONEY]++;
                            }
                        }
                    }
                    break;
                case ITEM_MS_GARDENER:
                case ITEM_MS_MAYOR:
                case ITEM_MS_TERRAFORMER:
                    outCost = 8;
                    g_cp.inventory[TP_MONEY] -= outCost;
                    // -set global to point to asset "money"
                    g_valueObject = document.getElementById("a" + currentPlayer + "b0");
                    // -set cost as if it were typed in
                    document.getElementById("spendgainamt").innerHTML = outCost;
                    // -"click" button to subtract cost
                    clickCalcButton({innerHTML:"-"});

                    clickFund(document.getElementById(milestoneNames[tmpItem - ITEM_MS_TERRAFORMER]));
                    // remove clickaway msg
                    document.getElementById("clickawaymsg").style.display = "none";
                    break;
                case ITEM_TRINCR:
                    outCost = 3;
                    g_cp.inventory[TP_MONEY] -= outCost;
                    // -set global to point to asset "money"
                    g_valueObject = document.getElementById("a" + currentPlayer + "b0");
                    // -set cost as if it were typed in
                    document.getElementById("spendgainamt").innerHTML = outCost;
                    // -"click" button to subtract cost
                    clickCalcButton({innerHTML:"-"});
                    
                    // prevent second TR buy this gen
                    TRthisGen[currentPlayer] = 2; 
                    
                    g_cp.TR++;
                    // -"click" button that adds 1 production
                    clickProdMore("p" + currentPlayer + "b" + TP_TR);
                    break;
                default:
                    // ERROR!
                    window.alert("Tried to buy something non-existant");
                    break;
            }
            
            
            // if buy production, mark so we can't buy again
            // if buy non-production, clear production ban flag
            if (tmpItem <= ITEM_HEATPROD) {
                productionAllowed[currentPlayer] = 0;
            } else {
                productionAllowed[currentPlayer] = 1;
            }
        } else {
            // can't / not interested in buying so pass
            playerPassed = 1;
            if (actionsTaken == 0) {
                // didn't do anything this turn, pass for generation
                playersNotPassed ^= 1 << (currentPlayer - 1);
                document.getElementById("passbox" + currentPlayer).checked = true;
            }
        }
    }
    checkFinished();
}

function updateScores() {
                    // TODO
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
        // score milestones
        l_tmp = 0;
        for (var l_x in milestoneFundedBy) {
            if (milestoneFundedBy[l_x] == p) {
                l_tmp += 5;
            }
        }
        document.getElementById("scmi" + p).innerHTML = l_tmp;
        l_tot += l_tmp;
        //// score awards
        //l_tmp = Number(document.getElementById("scaw" + p).value);
        //l_tot += l_tmp;
        // get card score
        l_tmp = Number(document.getElementById("scca" + p).value);
        l_tot += l_tmp;
        // total
        document.getElementById("scto" + p).innerHTML = l_tot;
    }
}
