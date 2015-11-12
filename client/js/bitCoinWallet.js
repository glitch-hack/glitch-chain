

function BitCoinWallet(debugWindow){
    debugWindow.WriteLine('Creating BitCoinWallet.');
    this.DebugWindow = debugWindow;
    this.KeyPair = bitcoin.ECPair.makeRandom();
    this.PrivateKey = keyPair.toWIF();
    debugWindow.WriteLine('BitCoinWallet is created with private key : ', this.PrivateKey);
};

BitCoinWallet.prototype = {
    constructor: BitCoinWallet,
    GetPublicAddress: function () {
        Debug("GetPublicAddress");
        return this.KeyPair.getAddress();
    }
};
