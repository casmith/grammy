'use strict';

const read = require('stdio').read;
const { Client } = require('@elastic/elasticsearch')
const client = new Client({ node: 'http://192.168.10.3:9200' })
const Accumulator = require('./accumulator');

let isAlbum = false;
let active = false;
let doc = {};
if (!process.argv[2]) {
    throw new Error("Pass the filename as an argument");
}
const filename = process.argv[2].replace("\\", "/").split("/").pop();

const isDocEmpty = doc => !Object.keys(doc).length;

const accumulator = new Accumulator(300, items => {
    const body = items.flatMap(doc => [{ index: { _index: 'downloads2' } }, doc]);
    return client.bulk({ refresh: false, body })
        .then(() => process.stdout.write('.'))
        .catch(e => console.log(e));
});

const encode = input => new Buffer(input).toString('base64');

async function onLine (line) {
    if (line.includes("=====")) {
        isAlbum = !isAlbum;           
            active = true; 
        } else {
            if (!line.trim().length) {
                active = false;
            if (!isDocEmpty(doc)) {
                await accumulator.add(doc);
            }
        } else if (isAlbum && active) {
            doc = {};
            doc.filename = filename;
            doc.album = line;
            //doc._id = encode(doc.album);
        } else if (active) {
            if (!doc.tracks) {
                doc.tracks = [];
                doc.nick = line.split(" ")[0].substr(1);
            }
            doc.tracks.push(line);
        }
    }
}

export default function () {
    return read(onLine)
        .then(() => {
            return accumulator.flush()
                .then(() => {
                    console.log();
                    console.log(`Pushed ${accumulator.successful} albums, failed ${accumulator.failed}`);
                });
        });  
}
