

//
// converting parameters 
//
function params2string(a, b, c, d) {
    var s = a + ' ' + b + ' ' + c + ' ' + d;    
    s = bin2hex(s);
    return s;
}

function string2params(input) {
    var s = hex2bin(input);
    var buf = s.split(' ');    
    var intBuf = [];
    buf.forEach(function (s) { intBuf.push(parseInt(s)); });
    return intBuf;
}


//
// Convert hex values to string
//
function hex2bin(hex){
    var bytes = [], str;

    for(var i=0; i< hex.length-1; i+=2)
        bytes.push(parseInt(hex.substr(i, 2), 16));

    return String.fromCharCode.apply(String, bytes);    
}

//
// Convert string values to hex
//
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


    





// ------------------- Listening for an incoming transaction on that new public address
// ------------------- and when recieved creating OPCHECK transation.

var wsUri = "ws://ws.blockchain.info/inv";
var output = document.getElementById("webSocketDebug");
var hasRecievedMessage = false;


function init() {
    registerWebSocket();
}


function registerWebSocket() {
    websocket = new WebSocket(wsUri);
    websocket.onopen = function (evt) {
        onOpen(evt)
    };
    websocket.onclose = function (evt) {
        onClose(evt)
    };
    websocket.onmessage = function (evt) {
        onMessage(evt)
    };
    websocket.onerror = function (evt) {
        onError(evt)
    };
}


function onOpen(evt) {

    writeToScreen("CONNECTED");
    subscribeToIncomingTransactions();
}

function subscribeToIncomingTransactions()
{
    doSend('{"op":"addr_sub", "addr":"' + newPublicAddress + '"}');
    //doSend('{"op":"unconfirmed_sub"}')
}

function onClose(evt) {

    writeToScreen("DISCONNECTED");

    if (!hasRecievedMessage)
    {
        writeToScreen("Reconnecting");
        subscribeToIncomingTransactions();
    }
}


function onMessage(evt) {
    // -------------------------------------------------------------
    // Get the data of the unconfirmed transaction
    websocket.close(); // dont need any more messages
    writeToScreen('<span style="color: green;"> ~~ Transaction recieved ~~ </span>');
    writeToScreen('<span style="color: green;">~~~~~~~~~~~~~~~~~~~~~~~~~~~~ </span>');
    var txnIn = JSON.parse(evt.data);

    // Validate if the payment, parameters and payout address are OK
    validatePaymentTransaction(txnIn);

    // pass the transaction down the chain
    createAndSendHomeTransaction(txnIn);
}


function onError(evt) {
    writeToScreen('<span style="color: red;">ERROR:</span> ' + evt.data);
}


function doSend(message) {
    writeToScreen("SENT: " + message);
    websocket.send(message);
}


function writeToScreen(message) {

    console.log(message);
}




////////////////////////////
//
// MAIN
//
window.addEventListener("load", init, false);




///////////////////
// 
// Old/unused code



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


