var easyElasticSearch = require("easy-elasticsearch");

var employeeIndexClient = easyElasticSearch.CreateIndexClient({
    host: 'localhost:9200',
    index: "employee"
});

// // VerifyConnection(callback)
// employeeIndexClient.VerifyConnection((result) => {
//     if (result)
//         console.log("connection verified");
//     else
//         console.log("connection failed");
// });


// GetAll(callback)
employeeIndexClient.GetAll((data) => {
    console.log(data);
});


// // CreateObject(data, callback)
// employeeIndexClient.CreateObject( { name: "Kemal", age: 18, classId: 3 }, (data) => {
//     console.log(data);
// });


// // GetObjectById(id, callback)
// employeeIndexClient.GetObjectById("qAEtxWwBz2-A_t-VWS_R", (data) => {
//     console.log(data);
// });


// // DeleteById(id, callback)
// employeeIndexClient.DeleteById("LAGhxGwBz2-A_t-VHBzX", (data) => {
//     console.log(data);
// });


// // UpdateById(id, data, callback)
// employeeIndexClient.UpdateById("FwErxWwBz2-A_t-Vby9a", { age: 20 }, (data) => {
//     console.log(data);
// });


// // GetAll(callback)
// employeeIndexClient.GetAll((data) => {
//     console.log(data);
// });


// // GetAllByForeignKeyValues(data, callback)
// employeeIndexClient.GetAllByKeyValues({classId: 1 }, (data) => {
//     console.log(data);
// });


// // GetCount()
// employeeIndexClient.GetCount((count) => {
//     console.log(count);
// });


// // GetCountByKeyValue(data, callback)
// employeeIndexClient.GetCountByKeyValues({ classId: 1, name: "Can Kaçar" }, (data) => {
//     console.log(data);
// });


// // GetObjectsByDateRange(key, startDateTime, endDateTime, callback);
// employeeIndexClient.GetObjectsByDateRange(
//     "datetime",
//     "2019-09-01T09:33:53.575Z",
//     "2019-09-15T09:33:53.575Z",
//     (data) => {
//         console.log(data);
//     });


// // GetCountByDateRange(key, startDateTime, endDateTime, callback);
// employeeIndexClient.GetCountByDateRange(
//     "datetime",
//     "2019-09-01T09:33:53.575Z",
//     "2019-09-15T09:33:53.575Z",
//     (count) => {
//         console.log(count);
//     });
