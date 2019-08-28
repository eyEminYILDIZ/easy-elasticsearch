# easy-elasticsearch

This is a library for using elasticsearch in your nodejs project easy.

it contains generally needed functions for your elasticsearch operations.

## Using

### install package
````bash

npm install easy-elasticsearch

````

### import to your code
````javascript

var easyElasticSearch = require("easy-elasticsearch");

````

### create a EasyElasticsearch IndexClient
````javascript

var employeeIndexClient = easyElasticSearch.CreateIndexClient({
    host: 'localhost:9200',
    index: "employee"
});

````

### use your IndexClient
````javascript

employeeIndexClient.GetAll((data) => { 
    console.log(data); 
});

````

### other IndexClient functions
````javascript

// CreateObject(data, callback)
employeeIndexClient.CreateObject( { name: "Kemal Almaz", age: 18, classId: 3 }, (data) => {
    console.log(data);
});

// GetObjectById(id, callback)
employeeIndexClient.GetObjectById("qAEtxWwBz2-A_t-VWS_R", (data) => {
    console.log(data);
});

// DeleteById(id, callback)
employeeIndexClient.DeleteById("LAGhxGwBz2-A_t-VHBzX", (data) => {
    console.log(data);
});

// UpdateById(id, data, callback)
employeeIndexClient.UpdateById("FwErxWwBz2-A_t-Vby9a", { age: 20 }, (data) => {
    console.log(data);
});

// GetAll(callback)
employeeIndexClient.GetAll((data) => {
    console.log(data);
});

// GetAllByForeignKeyValue(data, callback)
employeeIndexClient.GetAllByForeignKeyValue({classId: 1 }, (data) => {
    console.log(data);
});

// GetCountByForeignKeyValue(data, callback)
employeeIndexClient.GetCountByForeignKeyValue({ classId: 1, name: "Can Kaçar" }, (data) => {
    console.log(data);
});

````


## Author
Emin Yıldız

[http://eminyildiz.com.tr](http://eminyildiz.com.tr)

<contact.eminyildiz@gmail.com>