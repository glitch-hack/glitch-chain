//
// Setting up blockchain utility functions
//


// generate random buffer
function rng () {
    return new Buffer('zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz')
}


// generate random keyPair
var keyPair = bitcoin.ECPair.makeRandom({ rng: rng })
var address = keyPair.getAddress()

// debug
console.log(keyPair, address);


// Fetch transactions from block explorer calling `callback`
// on response coerced to JSON.
var getTransactions = function (address, callback) {
    var request = new XMLHttpRequest();
    request.open(
        "get",
        "https://insight.bitpay.com/api/txs?pageNum=0&address=" + address);
    request.addEventListener("load", callback);
    request.send()

}

var findVouts = function(obj) {
    var props = [];
    var label = 'vout';
    for(var i = 0; i < obj.txs.length; i++) {
        for(var k = 0; k < obj.txs[i].vout.length; k++) {
            var op = obj.txs[i].vout[k]['scriptPubKey']['asm'];
            if (op.substring(0, 9) == "OP_RETURN") {
                props.push(hex2a(op.substring(10)));
            } else {
                props.push(null);
            }
        }
    }
    return props;
};

var parseParams = function () {
    // Parse the glitch params from a bitcoin transaction.
    console.log(findVouts(JSON.parse(this.responseText)));
};

function hex2a(hexx) {
    var hex = hexx.toString();//force conversion
    var str = '';
    for (var i = 0; i < hex.length; i += 2)
        str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
    return str;
}

