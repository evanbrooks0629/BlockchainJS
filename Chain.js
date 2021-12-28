const Block = require('./Block');

class Chain {
    constructor() {
        this.blocks = [];
        this.map = new Map();
        this.setStartBlock();
    }

    setStartBlock() {
        const data = 0;
        const previous = "0".repeat(64);
        const newBlock = new Block(data, previous);
        this.blocks.push(newBlock);
        this.map.set(newBlock.publicKey + "_" + newBlock.privateKey, newBlock);
    }

    getLastHash() {
        const lastBlock = this.blocks[this.blocks.length - 1];
        const lastHash = lastBlock.hash;
        return lastHash;
    }

    addNewBlock(data) {
        const previous = this.getLastHash();
        const newBlock = new Block(data, previous);
        this.blocks.push(newBlock);
        this.map.set(newBlock.publicKey + "_" + newBlock.privateKey, newBlock);
        return [newBlock.publicKey, newBlock.privateKey];
    }

    getData(publicKey, privateKey) {
        if (this.map.has(publicKey + "_" + privateKey)) {
            return this.map.get(publicKey + "_" + privateKey);
        } else {
            return -1;
        }
    }

    setData(publicKey, privateKey, data) {
        if (this.map.has(publicKey + "_" + privateKey)) {
            let block = this.map.get(publicKey + "_" + privateKey);
            block.data = data;
            this.map.set(publicKey + "_" + privateKey, block);
            return 0;
        } else {
            return -1;;
        }
    }

    send(publicKey, privateKey, receiver, message) {
        // for now, edit someone else's "inbox" data and add message
        if (this.map.has(publicKey + "_" + privateKey)) {
            let receiverExists = false;
            for (let block of this.blocks) {
                if (block.publicKey == receiver) {
                    receiverExists = true;
                    let d = block.data;
                    d.inbox.push({
                        "subject": message.subject,
                        "message": message.message,
                        "from": publicKey
                    });
                    return 0;
                }
            }
            if (!receiverExists) {
                return -1;
            }
        } else {
            return -1;
        }
    }

    print() {
        for (const block of this.blocks) {
            console.log(block.data + " " + block.previous);
        }
    }
}

module.exports = Chain;