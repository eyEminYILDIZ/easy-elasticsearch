var easyElasticSearch = require("easy-elasticsearch");

var employeeIndexClient = easyElasticSearch.CreateIndexClient({
    host: 'localhost:9200',
    index: "employee"
});

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

// // GetAllByForeignKeyValue(data, callback)
// employeeIndexClient.GetAllByForeignKeyValue({classId: 1 }, (data) => {
//     console.log(data);
// });

// // GetCountByForeignKeyValue(data, callback)
// employeeIndexClient.GetCountByForeignKeyValue({ classId: 1, name: "Can Kaçar" }, (data) => {
//     console.log(data);
// });
