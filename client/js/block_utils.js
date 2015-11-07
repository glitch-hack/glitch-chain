//
// Setting up blockchain utility functions
//


// 
// generate random buffer
//
// TODO: fix this to actually generate random things
//
//function rng () {
//    return new Buffer('zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz')
//}
// 
// 
// generate random keyPair
// var keyPair = bitcoin.ECPair.makeRandom({ rng: rng })
// var address = keyPair.getAddress()
//
// debug
// console.log(keyPair, address);


// Fetch transactions from block explorer calling `callback`
// on response coerced to JSON.
function getTransactions(address, callback) {
    var request = new XMLHttpRequest();
    request.open(
        "get",
        "https://insight.bitpay.com/api/txs?pageNum=0&address=" + address);
    request.addEventListener("load", callback);
    request.send()

}

function findVouts(obj) {
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
}

function params2string(a, b, c, d) {
    var s = a + ' ' + b + ' ' + c + ' ' + d;
    console.log(s);
    return s;
}

function string2Params(s) {
    var buf = s.split(' ');    
    var intBuf = [];
    buf.forEach(function (s) { intBuf.push(parseInt(s)); });
    return intBuf;
}

function hex2bin(hex)
{
    var bytes = [], str;

    for(var i=0; i< hex.length-1; i+=2)
        bytes.push(parseInt(hex.substr(i, 2), 16));

    return String.fromCharCode.apply(String, bytes);    
}

function bin2hex(s) {
  var i, l, o = '', n;

  s += '';

  for (i = 0, l = s.length; i < l; i++) {
    n = s.charCodeAt(i)
      .toString(16);
    o += n.length < 2 ? '0' + n : n;
  }

  return o;
}


function hex2a(hexx) {
    var hex = hexx.toString(); //force conversion
    var str = '';
    for (var i = 0; i < hex.length; i += 2)
        str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
    return str;
}

