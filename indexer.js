'use strict';

const { Client } = require('@elastic/elasticsearch')
const client = new Client({ node: 'http://localhost:9200' })
const Accumulator = require('./accumulator');

const fs = require('fs');
const readline = require('readline');
const lineReader = require('line-reader');
const argv = process.argv.slice(2);
const filename = argv[0] || 'example-list.txt';


let isAlbum = false;
let active = false;
let doc = {};

const isDocEmpty = doc => !Object.keys(doc).length;

const accumulator = new Accumulator(100, items => {
    const body = items.flatMap(doc => [{ index: { _index: 'downloads' } }, doc]);
    return client.bulk({ refresh: true, body })
        .then(() => process.stdout.write('.'));
});

const encode = input => new Buffer(input).toString('base64');

lineReader.eachLine(filename, (line, last) => {
    if (line.includes("=====")) {
        isAlbum = !isAlbum;           
            active = true; 
        } else {
            if (!line.trim().length) {
                active = false;
            if (!isDocEmpty(doc)) {
                accumulator.add(doc);
                if (last) {
                    console.log('last!');
                    accumulator.flush()
                        .then(() => console.log(`processed ${accumulator.count} albums`));
                }
            }
        } else if (isAlbum && active) {
            doc = {};
            doc.album = line;
            //doc._id = encode(doc.album);
        } else if (active) {
            if (!doc.tracks) {
                doc.tracks = [];
            }
            doc.tracks.push(line);
        }
    }
});


// client.indices.refresh({ index: 'downloads' }).then((x) => {
//     console.log('refresh done')
//     const result = client.search({
//       index: 'downloads',
//       body: {
//         query: {
//           match: { artist: 'absolution' }
//         }
//       }
//     })
//     .then(response => console.log(response.body.hits.hits[0]._source))
//     .catch(response => console.log(response.body))    
// });



