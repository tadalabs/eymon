# eymon

es6 classes promisifying communication with mongodb


[![NPM version](http://img.shields.io/npm/v/eymon.svg)](https://www.npmjs.com/package/eymon)


## usage

### details

[StorageService](https://github.com/tadalabs/eymon/blob/master/src/service/StorageService.js) currently supports:
- create
- read
- update, updateInto, updateMany, updateManyInto
- delete, deleteMany


### examples

#### create my favorite color document


```
import eymon from 'eymon';
const service = new eymon.StorageService("playa");

service.create('color', {
    type: 'favorite',
    value: 'blue'
});
```

#### read my favorite color document


```
import eymon from 'eymon';
const service = new eymon.StorageService("playa");

service.read('color', {type: 'favorite'})
    .then( (resultSet) => {
        console.log(resultSet);
    })
    .catch( (error) => {
        console.log('error: ', error);
    });
```