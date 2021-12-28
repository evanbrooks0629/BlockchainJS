const crypto  = require('crypto');

class Block {
    constructor(data, previous) {
        this.data = data;
        this.previous = previous;
        this.hash = this.createHash();
        this.publicKey = this.createKey();
        this.privateKey = this.createKey();
        this.hashLength = 64;
    }

    isValidHash(s) {
        return s.startsWith("000");
    }

    createHash() {
        let s = "";
        while (!this.isValidHash(s)) {
            s = crypto.randomBytes(32).toString('hex');
        }
        return s;
    }

    createKey() {
        return crypto.randomBytes(32).toString('hex');
    }
}

module.exports = Block;