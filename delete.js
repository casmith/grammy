'use strict';

const elasticSearchBaseUrl = process.env.ES_BASE_URL || 'http://localhost:9200';
const elasticSearchIndex = process.env.ES_INDEX || 'downloads';

const { Client } = require('@elastic/elasticsearch')
const client = new Client({node: elasticSearchBaseUrl});

const deleteByQuery = (query) => {
        return client.deleteByQuery({
            index: elasticSearchIndex,
            body: query,
            conflicts: 'proceed'
        }, {
            ignore: [404],
            maxRetries: 3
        })
        .catch(e => console.log(JSON.stringify(e)));
    }


if (!process.argv[2]) {
    throw new Error("Pass the nick as an argument");
}
const nick = process.argv[2];

console.log(`Deleting list entries for ${nick}`);
deleteByQuery({query: {match: {nick}}})
    .then(r => console.log(`deleted ${r.body.deleted} records`));
