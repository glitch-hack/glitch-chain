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


//
// Implement me
// 
function validatePaymentTransaction(txnIn) {

}


//
//
// 
function addOpReturnData(txn, data) {
	txn.addOutput(bitcoin.script.nullDataOutput(data), 0);
}


//
//
//
function signTransaction(txn) {
	var ecKey = bitcoin.ECPair.fromWIF(temporaryPrivateKey);

    return txnOut.sign(0, ecKey);
}

//
//
//
function createTransaction(imagePaymentTransaction) {

	var transactionHash = imagePaymentTransaction.x.hash;
    console.log('TxnIn HASH :' + transactionHash);

    var totalSatoshisRecieved = imagePaymentTransaction.x.out[0].value;

    console.log('TxnIn SATOSHI :' + totalSatoshisRecieved);
    writeToScreen('TxnIn HASH :' + transactionHash);
    writeToScreen('TxnIn SATOSHI :' + totalSatoshisRecieved);
    writeToScreen('-------------------------------------------------------------');

    // -------------------------------------------------------------
    // Pass the satoshi onto our main account with OP_RETURN

    var minersFee = 5000;
    var totalSatoshiToSend = totalSatoshisRecieved;
    if (totalSatoshiToSend > minersFee) {
        console.log("Miner fee of 5'000 is covered so removing that from total outputs.");
        totalSatoshiToSend = totalSatoshiToSend - minersFee;
    }

	var txnOut = new bitcoin.TransactionBuilder();
	// Add the input (who is paying) of the form [previous transaction hash, index of the output to use]
    txnOut.addInput(transactionHash, 0);

    // Add the output (who to pay to) of the form [payee's address, amount in satoshis]    
    var listeningPublicAddress = "1KRAPo6pX457sKKBdiXQGuK2RV6ELvnB1x";
    console.log('TxnOut PublicAddress :' + listeningPublicAddress);

    txnOut.addOutput(listeningPublicAddress, totalSatoshisRecieved);

    return txnOut;
}



//
//
//
function createAndSendHomeTransaction(imagePaymentTransaction) {
	var txnOut = createTransaction(imagePaymentTransaction);

	
    var opReturn = new Buffer('Hello World', 'ascii');
    addOpReturnData(txnOut, opReturn)

    txnOut = signTransaction(txnOut);

    var txnOutCompile = txnOut.build();
    var txnOutHex = txnOutCompile.toHex();
    console.log('TxnOut ToHEX :' + txnOutHex);
    writeToScreen('TxnOut PublicAddress :' + listeningPublicAddress);
    writeToScreen('TxnOut OP_RETURN :' + opReturn);
    writeToScreen('TxnOut HEX' + txnOutHex);


    // TODO POST THE TRANSACTION HERE

    
}