// ------------------- Creating a client side temporary disposable wallet ----------------

var keyPair = bitcoin.ECPair.makeRandom();
        
// Print your private key (in WIF format)
var temporaryPrivateKey = keyPair.toWIF();

console.log('Temporary private key ', temporaryPrivateKey);
// => Kxr9tQED9H44gCmp6HAdmemAzU3n84H3dGkuWTKvE23JgHMW8gct

// Print your public key address
console.log('Temporary public key address ', keyPair.getAddress());
// => 14bZ7YWde4KdRb5YN7GYkToz3EHVCvRxkF


// Add the output (who to pay to) of the form [payee's address, amount in satoshis]    
var listeningPublicAddress = "1KRAPo6pX457sKKBdiXQGuK2RV6ELvnB1x";
console.log('TxnOut PublicAddress :' + listeningPublicAddress);




var newPublicAddress = keyPair.getAddress();


//
// Implement me
// 
function validatePaymentTransaction(txnIn) {

}


//
//
// 
function addOpReturnData(txn, data) {
    console.log("addOpReturnData", txn);
    txn.addOutput(bitcoin.script.nullDataOutput(data), 0);
    console.log("addOpReturnDataComplete", txn);
}


//
//
//
function signTransaction(txn, privateKey) {
	var ecKey = bitcoin.ECPair.fromWIF(privateKey);
    txn.sign(0, ecKey);
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
        //totalSatoshiToSend = totalSatoshiToSend - minersFee;
    }

	var txnOut = new bitcoin.TransactionBuilder();
	// Add the input (who is paying) of the form [previous transaction hash, index of the output to use]
	txnOut.addInput(transactionHash, 0);

    txnOut.addOutput(listeningPublicAddress, totalSatoshiToSend);

    return txnOut;
}



//
//
//
function createAndSendHomeTransaction(imagePaymentTransaction) {

    console.log("createAndSendHomeTransaction");
	var txnOut = createTransaction(imagePaymentTransaction);

	// prepare parameters to be included into OP_RETURN
	var amount = parameters['amount'];
	var seed = parameters['seed'];
	var iter =  parameters['iterations'];
	var quality =  parameters['quality'];

	var opReturnData_params = params2string(amount, seed, iter, quality);
	console.log("opReturnData_params ", opReturnData_params);
    addOpReturnData(txnOut, opReturnData_params);

    // sign with OUR TEMP key
    signTransaction(txnOut, temporaryPrivateKey);

    var txnOutCompile = txnOut.build();
    var txnOutHex = txnOutCompile.toHex();
    console.log('TxnOut ToHEX :' + txnOutHex);
    writeToScreen('TxnOut PublicAddress :' + listeningPublicAddress);
    writeToScreen('TxnOut OP_RETURN :' + opReturn);
    writeToScreen('TxnOut HEX' + txnOutHex);

    $.ajax({
  		type: "POST",
  		url: "https://insight.bitpay.com/api/tx/send", 
  		data: {"rawtx": txnOutHex},
  		success: 
    		function( data ) {
  				console.log ('Transaction submitted!', data);
			}
		}
	);

}