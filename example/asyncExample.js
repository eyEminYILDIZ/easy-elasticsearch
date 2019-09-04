var easyElasticSearch = require("easy-elasticsearch");

var logIndexClient = easyElasticSearch.CreateIndexClient({
    host: 'localhost:9200',
    index: "log"
});


async function run() {

    // // VerifyConnectionAsync()
    // var result = await logIndexClient.VerifyConnectionAsync();
    // if (!result)
    //     console.log("connection failed");
    // else
    //     console.log("verified");


    // // GetAllAsync()
    var logs = await logIndexClient.GetAllAsync();
    console.log(logs);


    // // GetObjectByIdAsync(id, callback)
    // var log = await logIndexClient.GetObjectByIdAsync("xftP-2wB6LPtu7BJHwNo");
    // console.log(log);


    // // GetByDateRangeAsync(startDateTime, endDateTime);
    // var logs = await logIndexClient.GetByDateRangeAsync(
    //     "2019-09-01T09:33:53.575Z",
    //     "2019-09-15T09:33:53.575Z",
    // );
    // console.log(logs);


    // // GetAllByKeyValuesAsync(data, callback)
    // var logs = await logIndexClient.GetAllByKeyValuesAsync({ content: "error5" });
    // console.log(logs);


    // // GetCountAsync()
    // var count = await logIndexClient.GetCountAsync();
    // console.log(count);
    

    // // GetCountByKeyValuesAsync(keyValues)
    // var count = await logIndexClient.GetCountByKeyValuesAsync({ type: "error" });
    // console.log(count);


    // // CreateObjectAsync(object)
    // var objectId = await logIndexClient.CreateObjectAsync({
    //     type: "error",
    //     content: "error7",
    //     datetime: '2019-09-11T09:33:53.575Z'
    // });
    // console.log(objectId);


    // // UpdateByIdAsync(id, data, callback)
    // var result = await logIndexClient.UpdateByIdAsync("xftP-2wB6LPtu7BJHwNo", { content: "error101" });
    // if (result)
    //     console.log("updated");
    // else
    //     console.log("update failed");


    // // DeleteByIdAsync(id, callback)
    // var result = await logIndexClient.DeleteByIdAsync("xftP-2wB6LPtu7BJHwNo");
    // if (result)
    //     console.log("deleted");
    // else
    //     console.log("delete failed");


}// endof: async_function_run()

run();



