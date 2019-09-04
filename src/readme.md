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

### other IndexClient functions with Callback
````javascript

// VerifyConnection(callback)
employeeIndexClient.VerifyConnection((result) => {
    if (result)
        console.log("connection verified");
    else
        console.log("connection failed");
});

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

// GetCount()
employeeIndexClient.GetCount((count) => {
    console.log(count);
});

// GetCountByForeignKeyValue(data, callback)
employeeIndexClient.GetCountByForeignKeyValue({ classId: 1, name: "Can Kaçar" }, (data) => {
    console.log(data);
});

// GetByDateRange(startDateTime, endDateTime, callback);
employeeIndexClient.GetByDateRange(
    "2019-09-01T09:33:53.575Z", "2019-09-15T09:33:53.575Z",
    (data) => {
        console.log(data);
    });

````


### other IndexClient functions with Async
````javascript


async function run() {

    // VerifyConnectionAsync()
    var result = await logIndexClient.VerifyConnectionAsync();
    if (!result)
        console.log("connection failed");
    else
        console.log("verified");


    // GetAllAsync()
    var logs = await logIndexClient.GetAllAsync();
    console.log(logs);


    // GetObjectByIdAsync(id, callback)
    var log = await logIndexClient.GetObjectByIdAsync("xftP-2wB6LPtu7BJHwNo");
    console.log(log);


    // GetByDateRangeAsync(startDateTime, endDateTime);
    var logs = await logIndexClient.GetByDateRangeAsync(
        "2019-09-01T09:33:53.575Z",
        "2019-09-15T09:33:53.575Z",
    );
    console.log(logs);


    // GetAllByKeyValuesAsync(data, callback)
    var logs = await logIndexClient.GetAllByKeyValuesAsync({ content: "error5" });
    console.log(logs);


    // GetCountAsync()
    var count = await logIndexClient.GetCountAsync();
    console.log(count);
    

    // GetCountByKeyValuesAsync(keyValues)
    var count = await logIndexClient.GetCountByKeyValuesAsync({ type: "error" });
    console.log(count);


    // CreateObjectAsync(object)
    var objectId = await logIndexClient.CreateObjectAsync({
        type: "error",
        content: "error7",
        datetime: '2019-09-11T09:33:53.575Z'
    });
    console.log(objectId);


    // UpdateByIdAsync(id, data, callback)
    var result = await logIndexClient.UpdateByIdAsync("xftP-2wB6LPtu7BJHwNo", { content: "error101" });
    if (result)
        console.log("updated");
    else
        console.log("update failed");


    // DeleteByIdAsync(id, callback)
    var result = await logIndexClient.DeleteByIdAsync("xftP-2wB6LPtu7BJHwNo");
    if (result)
        console.log("deleted");
    else
        console.log("delete failed");


} // endof: async run()

````


## Author
Emin Yıldız

[http://eminyildiz.com.tr](http://eminyildiz.com.tr)

<contact.eminyildiz@gmail.com>