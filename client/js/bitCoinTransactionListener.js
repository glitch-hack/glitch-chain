

// ~~~~~~~~~~~~~~~~ Simple usage
//
//      var myDebugWindow = new DebugWindow('idOfMyDebugWindowDiv');
//
//      var BitCoinTransactionListener = new BitCoinTransactionListener(
//        (function(evt){
//            this.Subscribe();
//        }),
//        (function(evt){
//            myDebugWindow.WriteLine("onRecieveMessage recieved evt : ", JSON.stringify(evt.data));
//        }),
//        myDebugWindow
//      ).Connect();
//
//
// ~~~~~~~~~~~~~~~~ Verbose usage
//
//      var myDebugWindow = new DebugWindow('myDebugWindow');
//      myDebugWindow.WriteLine('hello');
//
//      var onOpen = function(evt)
//      {
//          myDebugWindow.WriteLine("onOpen recieved");
//          myBitCoinTransactionListener.Subscribe();
//      }
//
//      var onRecieveMessage = function(evt)
//      {
//          myDebugWindow.WriteLine("onRecieveMessage recieved evt : ", JSON.stringify(evt.data));
//      }
//
//      var myBitCoinTransactionListener = new BitCoinTransactionListener(
//          onOpen,
//          onRecieveMessage,
//          myDebugWindow
//      );
//
//      myBitCoinTransactionListener.Connect();
//
// ~~~~~~~~~~~~~~~~ 

function BitCoinTransactionListener(fnOnOpen, fnOnMessage, debugWindow) {

    this.wsUri = "ws://ws.blockchain.info/inv";
    this.FnOnMessage = fnOnMessage;
    this.FnOnOpen = fnOnOpen;
    this.DebugWindow = debugWindow;


    this.hasRecievedMessage = false;
    this.isConnected = false;
    this.webSocket;

    _this = this;
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

        _this = this;

        if (this.isConnected) {
            Debug("! Trying to connect but already connected.");
            return;
        }

        this.webSocket = new WebSocket(this.wsUri);

        this.webSocket.onopen = function (evt) {
            _this.onOpen(evt)
        };

        this.webSocket.onclose = function (evt) {
            _this.onClose(evt)
        };

        this.webSocket.onmessage = function (evt) {
            _this.onMessage(evt)
        };

        this.webSocket.onerror = function (evt) {
            _this.onError(evt)
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
        this.webSocket.send(message);
    },
    onOpen: function (evt) {
        this.isConnected = true;
        this.Debug("onOpen received : ", evt);
        this.Debug("Calling fnOnOpen()");
        this.FnOnOpen(evt);
    },
    onClose: function (evt) {
        this.isConnected = false;
        this.Debug("onClose recieved : ", evt);
    },
    onMessage: function (evt) {
        this.hasRecievedMessage = true;
        this.Debug("onMessage recieved : ", evt.data);
        this.Debug("Calling fnOnMessage()");
        this.FnOnMessage(evt);
    },
    onError: function (evt) {
        this.Debug("onError recieved : ", evt);
    }
};
