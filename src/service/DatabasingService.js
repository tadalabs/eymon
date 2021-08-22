const Mongo = require('mongodb').MongoClient,
    MongoObjectId = require('mongodb').ObjectID;

export default class DatabasingService {
    forObjectId(idString) {
        let mongoObjectId = null;
        if (idString) {
            mongoObjectId = new MongoObjectId(idString);
        }
        return mongoObjectId;
    }

    forWriteResult(result) {
        let str,
            obj,
            count = 0;
        try {
            str = JSON.stringify(result);
            obj = JSON.parse(str);
            count = obj.nModified;
        } catch (x) {}
        return count;
    }
    postOperation(client, error, data, resolve, reject) {
        try {
            client.close();
        } catch (ex) {
        }
        if (error) {
            reject(error.stack);
        } else {
            resolve(data);
        }
    }
    executeOperation(url) {
        return new Promise((resolve, reject) => {
            Mongo.connect(url, { useNewUrlParser: true }, (error, client) => {
                if (!error && client) {
                    resolve(client);
                } else {
                    reject(error.stack);
                }
            })
        });
    }
}