

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


    


// ------------------- Creating a client side temporary disposable wallet ----------------

var keyPair = bitcoin.ECPair.makeRandom();
        
// Print your private key (in WIF format)
var temporaryPrivateKey = keyPair.toWIF();

console.log('Temporary private key ', temporaryPrivateKey);
// => Kxr9tQED9H44gCmp6HAdmemAzU3n84H3dGkuWTKvE23JgHMW8gct

// Print your public key address
console.log('Temporary public key address ', keyPair.getAddress());
// => 14bZ7YWde4KdRb5YN7GYkToz3EHVCvRxkF

var newPublicAddress = keyPair.getAddress();
$(".bitcoin-address-display-value").attr("data-bc-address", newPublicAddress);
$(".bitcoin-address-display-value").html(newPublicAddress);



// ------------------- Listening for an incoming transaction on that new public address
// ------------------- and when recieved creating OPCHECK transation.

var wsUri = "ws://ws.blockchain.info/inv";
var output;


function init() {
    output = document.getElementById("webSocketDebug");
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
    doSend('{"op":"addr_sub", "addr":"' + newPublicAddress + '"}');
    //doSend('{"op":"unconfirmed_sub"}');
}


function onClose(evt) {
    writeToScreen("DISCONNECTED");
}


function onMessage(evt) {
    // -------------------------------------------------------------
    // Get the data of the unconfirmed transaction
    websocket.close(); // dont need any more messages
    writeToScreen('<span style="color: green;"> ~~ Transaction recieved ~~ </span>');
    writeToScreen('<span style="color: green;">~~~~~~~~~~~~~~~~~~~~~~~~~~~~ </span>');
    var txnIn = JSON.parse(evt.data);
    var transactionHash = txnIn.x.hash;
    console.log('TxnIn HASH :' + transactionHash);
    var totalSatoshisRecieved = txnIn.x.out[0].value;
    console.log('TxnIn SATOSHI :' + totalSatoshisRecieved);
    writeToScreen('TxnIn HASH :' + transactionHash);
    writeToScreen('TxnIn SATOSHI :' + writeToScreen);
    writeToScreen('-------------------------------------------------------------');
    // -------------------------------------------------------------
    // Pass the satoshi onto our main account with OP_RETURN
    var txnOut = new bitcoin.TransactionBuilder();
    // Add the input (who is paying) of the form [previous transaction hash, index of the output to use]
    txnOut.addInput(transactionHash, 0);
    // Add the output (who to pay to) of the form [payee's address, amount in satoshis]
    var listeningPublicAddress = "1KRAPo6pX457sKKBdiXQGuK2RV6ELvnB1x";
    txnOut.addOutput(listeningPublicAddress, totalSatoshisRecieved);
    console.log('TxnOut PublicAddress :' + listeningPublicAddress);
    var opReturn = "Hello World";
    var opReturnData = new Buffer(opReturn);
    //txnOut.addOutput(bitcoin.script.fromChunks(bitcoin.script.opscode.OP_RETURN, opReturnData), 0);
    txnOut.addOutput(bitcoin.script.fromASM('OP_RETURN 4141'), 0);
    console.log('TxnOut OP_RETURN :' + opReturn);
    console.log('Signing with privatekey : ', temporaryPrivateKey);
    console.log('Creating ECKey from privatekey.....');
    var ecKey = bitcoin.ECPair.fromWIF(temporaryPrivateKey);
    console.log('Created!');
    var signedTxn = txnOut.sign(0, ecKey);
    console.log('TxnOut SIGNED SUCCESS');
    var txnOutCompile = txnOut.build();
    var txnOutHex = txnOutCompile.toHex();
    console.log('TxnOut ToHEX :' + txnOutHex);
    writeToScreen('TxnOut PublicAddress :' + listeningPublicAddress);
    writeToScreen('TxnOut OP_RETURN :' + opReturn);
    writeToScreen('TxnOut HEX' + txnOutHex);
}


function onError(evt) {
    writeToScreen('<span style="color: red;">ERROR:</span> ' + evt.data);
}


function doSend(message) {
    writeToScreen("SENT: " + message);
    websocket.send(message);
}


function writeToScreen(message) {
    var pre = document.createElement("p");
    pre.style.wordWrap = "break-word";
    pre.innerHTML = message;
    output.appendChild(pre);
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


