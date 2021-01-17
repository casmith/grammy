'use strict';

module.exports = class Accumulator {
    constructor(capacity, flushCallback = items => Promise.resolve(items)) {
        this.items = [];
        this.capacity = capacity;
        this.flushCallback = flushCallback;
        this.count = 0;
        this.successful = 0;
        this.failed = 0;
    }

    isFull() {
        return this.items.length >= this.capacity;
    }

    add(item) {
        this.items.push(item);
        if (this.isFull()) {
            return this.flush();
        }
        return Promise.resolve();
    }

    flush() {
        const flushedItems = [].concat(this.items);
        this.items.length = 0;
        this.count = this.count + flushedItems.length;
        if (!flushedItems.length) {
            return Promise.resolve();
        }
        return this.flushWithRetry(flushedItems)
            .then(() => this.successful += flushedItems.length)
            .catch(() => {
                console.log(JSON.stringify(flushedItems));
                this.failed += flushedItems.length
            });
    }

    wait(seconds) {
        console.log(`Waiting ${seconds} seconds for retry`);
        return new Promise(resolve => setTimeout(resolve, seconds*1000));
    }
    flushWithRetry(flushedItems) {
        return this.flushCallback(flushedItems);
    }
}