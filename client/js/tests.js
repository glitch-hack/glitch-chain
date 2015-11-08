

var TempPublic = '17J238WxVTpf6yN8c4c52DwVb9zaK9Cy2H';
var TempPrivate = 'KzMScaD1gQiQR9sSn78cj1yF2WttXf42XUVE462DFfwZiwVdfABV';

var output = document.getElementById("webSocketDebug");

var testInTransaction = {
   "op":"utx",
   "x":{
      "lock_time":0,
      "ver":1,
      "size":372,
      "inputs":[
         {
            "sequence":4294967295,
            "prev_out":{
               "spent":true,
               "tx_index":110135281,
               "type":0,
               "addr":"1PBY8EWv16T5R1r4CCNPDH62LvHfbv8h7u",
               "value":5000,
               "n":1,
               "script":"76a914f350e890b99d6bdf7299491b5f8fd05f0eedc07388ac"
            },
            "script":"473044022025a9a276e7a033eb1ce434254ccbac3fb4770759f8b73f5f1b172dfe32a29c7802207b345bd96f088d3d870bf513d2a5afa4a84e27d650bbf12c5755ff4eff2a9e2c01210264a61214866a10064b6da4d0d4d6effbb0aad772121071c5cfb1a035cd80f80e"
         },
         {
            "sequence":4294967295,
            "prev_out":{
               "spent":true,
               "tx_index":110202598,
               "type":0,
               "addr":"1A5Tw8SEXsjMffxEr57CuouHrBgfJcDyPP",
               "value":970000,
               "n":1,
               "script":"76a914639147550dfa072c9e707062709e2172fa14503d88ac"
            },
            "script":"47304402206dce560259f1f454b58009a8969cda20e54251554e0c1023afc24d451453c4ce0220572db7b2a6a663b3a3364ca4919f171d1300c0d8b909eaec25f50482ade4e999012102899b597f3b29c0307bea67a0a05780e9b81504216dc5d2eddd37e248ce4edc21"
         }
      ],
      "time":1446986105,
      "tx_index":110202856,
      "vin_sz":2,
      "hash":"50cc7f1b70056679540215cb184b40c1ec49d55a88a3ade9773a42686c1df1ce",
      "vout_sz":2,
      "relayed_by":"130.180.228.138",
      "out":[
         {
            "spent":false,
            "tx_index":110202856,
            "type":0,
            "addr":"17J238WxVTpf6yN8c4c52DwVb9zaK9Cy2H",
            "value":2000,
            "n":0,
            "script":"76a9144508b1039634101b8473f76a8feeb39ada5a66e888ac"
         },
         {
            "spent":false,
            "tx_index":110202856,
            "type":0,
            "addr":"187CL7YM9SqiogUBRgCFtSxfrBaRGX92xk",
            "value":963000,
            "n":1,
            "script":"76a9144df4d56b96eadce2096c6b8bd88afa662a62451288ac"
         }
      ]
   }
};


createAndSendHomeTransaction(testInTransaction);
