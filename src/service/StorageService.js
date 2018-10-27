import DatabasingService from './DatabasingService';

export default class StorageService {
    constructor(database = 'anything',
                server = 'localhost', port = '27017') {
        this.place = `mongodb://${server}/${port}`;
        this.name = database;
        this.database = new DatabasingService();
    }
    create(collection, thing) {
        return new Promise( (resolve, reject) => {
            this.database.executeOperation(this.place)
                .then((client) => {
                    client.db(this.name).collection(collection)
                        .insertOne(thing);
                    this.database.postOperation(client, undefined, thing, resolve, reject);
                })
                .catch((x) => {
                    this.database.postOperation(undefined, x, undefined, resolve, reject);
                });
        });
    }
    read(collection, criteria, modifier) {
        return new Promise((resolve, reject) => {
            this.database.executeOperation(this.place)
                .then((client) => {
                    client.db(this.name).collection(collection)
                        .find(criteria, modifier)
                        .toArray((error, data) => {
                            this.database.postOperation(client, error, data, resolve, reject);
                        });
                })
                .catch((x) => {
                    this.database.postOperation(undefined, x, undefined, resolve, reject);
                });
        });
    }
    update(collection, thing) {
        return this.updateInto(collection, { '$set': thing });
    }
    updateInto(collection, thing) {
        return new Promise((resolve, reject) => {
            this.database.executeOperation(this.place)
                .then((client) => {
                    client.db(this.name).collection(collection)
                        .updateOne({_id: thing._id}, thing);
                    this.database.postOperation(client, undefined, thing, resolve, reject);
                })
                .catch((x) => {
                    this.database.postOperation(undefined, x, undefined, resolve, reject);
                });
        });
    }
    updateMany(collection, criteria, alteration) {
        return this.updateManyInto(collection, criteria, { '$set': alteration } );
    }
    updateManyInto(collection, criteria, thing) {
        return new Promise((resolve, reject) => {
            this.database.executeOperation(this.place)
                .then((client) => {
                    client.db(this.name).collection(collection)
                        .updateMany(criteria, thing);
                    this.database.postOperation(client, undefined, thing, resolve, reject);
                })
                .catch((x) => {
                    this.database.postOperation(undefined, x, undefined, resolve, reject);
                });
        });
    }
    delete(collection, identifier) {
        return new Promise( (resolve, reject) => {
            this.database.executeOperation(this.place)
                .then((client) => {
                    client.db(this.name).collection(collection)
                        .deleteOne({_id: identifier});
                    this.database.postOperation(client, undefined, true, resolve, reject);
                })
                .catch((x) => {
                   this.database.postOperation(undefined, x, undefined, resolve, reject);
                });
        });
    }
    deleteMany(collection, criteria) {
        return new Promise((resolve, reject) => {
            this.database.executeOperation(this.place)
                .then((client) => {
                    client.db(this.name).collection(collection)
                        .deleteMany(criteria);
                    this.database.postOperation(client, undefined, true, resolve, reject);
                })
                .catch((x) => {
                    this.database.postOperation(undefined, x, undefined, resolve, reject)
                });
        });
    }
}