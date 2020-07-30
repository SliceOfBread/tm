function randomInteger(maxValue) {
      return (Math.round(myRand() * maxValue));
}

function randomBitStr(bitLength) {
    var s="";
    while (s.length < bitLength) {
        s = s.concat(randomInteger(1));
    }
    return(s);
    //return (Array.from({length:bitLength}, (v, i) => {return ((i==0) ? 1 : randomInteger(1))}).join(""));
}

function genPrime(bitLength, finished) {
    // Note: if we generate a completely random bitStr it is possible
    // it will be much smaller than we'd hope. By gen'ing as below we
    // effectively lose a 1/4 bit of length
   var bitStr = randomBitStr(bitLength-2);
   const b123 = ["01", "10", "11"];
   bitStr = b123[randomInteger(3)] + bitStr;
   var bi_prime = bigInt(bitStr, 2);
   if (bi_prime.isEven()) {
      bi_prime = bi_prime.minus(bigInt.one);
   }
   (function checkPrime() {
        if (bi_prime.isProbablePrime(10, myRand) && bi_prime.isPrime()) {
            game.prime = bi_prime.toString(16);
            finished();
        } else {
            bi_prime = bi_prime.minus(bigInt[2]);
            setTimeout(checkPrime, 0);
        }
   })();
}

function shuffle(fromList) {
    // don't use a known seed for the shuffling
    myRand = new Math.seedrandom();
    
    var toList = [];
    if (!fromList.length) return toList;
    toList[0] = fromList[0];
    // copy each item from fromList to a random position in toList
    for (var i=1; i<fromList.length; i++) {
        toList.splice(randomInteger(i+1),0,fromList[i]);
    }
    return toList;
}

function crypt(deckToCrypt, keys) {
    // this is used to encrypt or decrypt an entire deck in situ
    if (!deckToCrypt.length) return;    // e.g. not using Prelude
    
    var bi_prime = bigInt(game.prime, 16);
    
    // encrytion/decryption use same code just different keys
    // For base cryption, keys[0] will be used
    // For indiv cryption, keys[d] will be used
    for (var d=0; d<deckToCrypt.length; d++) {
        var bigD = bigInt(deckToCrypt[d], 16);
        deckToCrypt[d] = bigD.modPow(bigInt(keys[(keys.length-1 ? d : 0)], 16), bi_prime).toString(16);
    }
}
    
function decrypt(cardToCrypt, key) {
    // this is used to decrypt single cards
    // (although it could also encrypt a single card)
    // which is returned
    var bi_prime = bigInt(game.prime, 16);
    
    var bi_card = bigInt(cardToCrypt, 16);
    return(bi_card.modPow(bigInt(key, 16), bi_prime).toString(16));
}
    
function generateRandomKeypair(bi_prime) {
   //var bi_prime = bigInt(primeVal, 16);
   var bi_phi_prime = bi_prime.minus(1); //assume this is a prime number
   var encKey = bigInt(randomBitStr(bi_phi_prime.bitLength()), 2);
   var done = false;
   while (!done) {
      try {
         var decKey = encKey.modInv(bi_phi_prime);
         done = true;
      } catch (err) {
         encKey = encKey.minus(1);
         done = false;
      }
   }
   return({"enc":encKey.toString(16), "dec":decKey.toString(16)});
       
}

