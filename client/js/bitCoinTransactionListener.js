// global namespace
function BitCoinTransactionListener(fnOnMessage, debugWindow) {

    this.wsUri = "ws://ws.blockchain.info/inv";
    this.FnOnMessage = fnOnMessage;
    this.DebugWindow = debugWindow;


    this.hasRecievedMessage = false;
    this.isConnected = false;
    this.webSocket;
}

BitCoinTransactionListener.prototype = {
    constructor: BitCoinTransactionListener,
    InvokeOnMessageTest: function (evt) {
        Debug("InvokeOnMessageTest recieved : ", evt);
        onMessage(evt);
    },
    Debug: function (message) {
        if (this.DebugWindow === undefined) {
            console.log("BitCoinTransactionListener : " + message);
        }
        else {
            this.DebugWindow.WriteLine("BitCoinTransactionListener : " + message);
        }
    },
    Connect: function () {
        this.Debug("Connect");

        if (this.isConnected) {
            Debug("! Trying to connect but already connected.");
            return;
        }

        this.webSocket = new WebSocket(this.wsUri);

        this.webSocket.onopen = function (evt) {
            this.onOpen(evt)
        };

        this.webSocket.onclose = function (evt) {
            this.onClose(evt)
        };

        this.webSocket.onmessage = function (evt) {
            this.onMessage(evt)
        };

        this.webSocket.onerror = function (evt) {
            this.onError(evt)
        };
    },
    Subscribe: function (address) {
        this.Debug("Subscribe");

        if (!this.isConnected) {
            this.Debug("! Trying to subscribe but not connected.");
            return;
        }

        if (address === undefined) {
            this.Send('{"op":"unconfirmed_sub"}')
        }
        else {
            this.Send('{"op":"addr_sub", "addr":"' + address + '"}');
        }
    },
    Send: function (message) {
        this.Debug("Send");

        if (!this.isConnected) {
            this.Debug("! Trying to send but not connected.");
            return;
        }

        this.Debug("Sending : ", message);
        this.websocket.send(message);
    },
    onOpen: function (evt) {
        this.Debug("onOpen received : ", evt);
    },
    onClose: function (evt) {
        this.Debug("onClose recieved : ", evt);
    },
    onMessage: function (evt) {
        this.Debug("onMessage recieved : ", evt);
        this.Debug("Calling fnOnMessage()");
        this.fnOnMessage(evt);
    },
    onError: function (evt) {
        this.Debug("onError recieved : ", evt);
    }
};