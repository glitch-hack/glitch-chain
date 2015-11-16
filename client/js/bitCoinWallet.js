function BitCoinWallet(debugWindow){
    debugWindow.WriteLine('Creating BitCoinWallet.');
    this.DebugWindow = debugWindow;
    this.KeyPair = bitcoin.ECPair.makeRandom();
    this.PrivateKey = this.KeyPair.toWIF();
    debugWindow.WriteLine('BitCoinWallet is created with private key : ', this.PrivateKey);
};

BitCoinWallet.prototype = {
    constructor: BitCoinWallet,
    GetPublicAddress: function () {
        this.DebugWindow.WriteLine("GetPublicAddress");
        return this.KeyPair.getAddress();
    },
    GetPrivateKey: function () {
        this.DebugWindow.WriteLine("GetPrivateKey");
        return this.PrivateKey;
    }
};
