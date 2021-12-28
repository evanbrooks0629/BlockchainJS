const Chain = require('./Chain');

let data1 = {
    "firstName": "Evan",
    "lastName": "Brooks",
    "inbox": []
}

let data2 = {
    "firstName": "Logan",
    "lastName": "Brooks",
    "inbox": []
}

const c = new Chain(); // initialize chain
const [publicKey1, privateKey1] = c.addNewBlock(data1); // same as creating an account
const [publicKey2, privateKey2] = c.addNewBlock(data2);

const getData = (publicKey, privateKey) => {
    return c.getData(publicKey, privateKey);
}

let newMessage = {
    "subject": "Hello",
    "message": "Hey!"
}

const didSend = c.send(publicKey1, privateKey1, publicKey2, newMessage); // send from Evan to Logan
if (didSend == -1) { // failure
    console.log("Message could not be sent.");
    console.log("Error: Invalid key(s).");
} else {
    console.log("Message sent successfully.");
    console.log("To:   " + publicKey2);
    console.log("From: " + publicKey1);
}

let evanData = getData(publicKey1, privateKey1);
let loganData = getData(publicKey2, privateKey2);

console.log();
console.log(evanData == -1 ? "Error: Invalid key(s)." : evanData.data);
console.log(loganData == -1 ? "Error: Invalid key(s)." : loganData.data);

// Return public and private keys when bew block is created
// Let user use them to get access to their data

// Allow for sending and receiving of data 
// Send: Login with sender's public + private, and only need recipient's public
// Receive: Login with receiver's public + private

// TODO
// [ ] Create class for users
// [ ] Create class for messages
// [ ] Create express server