var easyElasticSearch = require("easy-elasticsearch");

var logIndexClient = easyElasticSearch.CreateIndexClient({
    host: 'localhost:9200',
    index: "log"
});

// logIndexClient.VerifyConnection((result) => {
//     if (!result)
//         console.log("connection failed");
//     else
//         console.log("verified");
// });

// logIndexClient.CreateObject({
//         type: "error",
//         content: "error3",
//         datetime: '2019-09-13T09:33:53.575Z'
//     }, () => {
//         console.log("Object Added");
//     }
// );

// logIndexClient.GetByDateRange(
//     "2019-09-01T09:33:53.575Z",
//     "2019-10-01T09:33:53.575Z",
//     (data)=>{
//         console.log(data)
//     });

// logIndexClient.GetAll((data) => { 
//     console.log(data); 
// });
