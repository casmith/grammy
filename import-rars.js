'use strict';

const read = require('stdio').read;
const { Client } = require('@elastic/elasticsearch')
const client = new Client({ node: 'http://192.168.10.129:9200' })
const Accumulator = require('./accumulator');

let isAlbum = false;
let active = false;
let doc = {};
let context = null;
if (!process.argv[2]) {
    throw new Error("Pass the filename as an argument");
}
const filename = process.argv[2].replace("\\", "/").split("/").pop();

const isDocEmpty = doc => !Object.keys(doc).length;

const accumulator = new Accumulator(300, items => {
    const body = items.flatMap(doc => [{ index: { _index: 'rar' } }, doc]);
    return client.bulk({ refresh: false, body })
        .then(() => process.stdout.write('.'))
        .catch(e => console.log(e));
});

const encode = input => new Buffer(input).toString('base64');

const re = new RegExp("^!.*$");

class Track {
    constructor(line) {
        // console.log(line);
        const parts = line.split(" ");
        this.filename = filename;
        this.line = line;
        this.nick = parts[0].substr(1);
    }
}

async function onLine (line) {
    if (re.test(line)) {
        accumulator.add(new Track(line));
    }
}

read(onLine)
  .then(() => {
    return accumulator.flush()
        .then(() => {
            console.log();
            console.log(`Pushed ${accumulator.successful} tracks, failed ${accumulator.failed}`);
        });
});


