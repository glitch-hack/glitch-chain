
// global namespace
var BitCoinTransactionListener = new function(bool_isTestNet, domDivId_debugMessagesOutputDiv)
{
    this.isTestNet = bool_isTestNet;


    this.wsUri = "ws://ws.blockchain.info/inv";
    this.output = document.getElementById("webSocketDebug");
    this.hasRecievedMessage = false;

    






    if (bool_isTestNet) {
        throw "Unsupported as ";
    }

    

    


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

    function subscribeToIncomingTransactions() {
        doSend('{"op":"addr_sub", "addr":"' + newPublicAddress + '"}');
        //doSend('{"op":"unconfirmed_sub"}')
    }

    function onClose(evt) {

        writeToScreen("DISCONNECTED");

        if (!hasRecievedMessage) {
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
}