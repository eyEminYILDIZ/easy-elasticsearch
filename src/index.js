var elasticsearch = require('elasticsearch');

module.exports = {

    CreateIndexClient: function (config) {
        return {

            _index: config.index,

            client: new elasticsearch.Client({
                host: config.host,
                log: 'error'
            }),

            // connection verify:
            VerifyConnection: function (_callback) {
                this.client.ping({
                    // ping usually has a 3000ms timeout
                    requestTimeout: 1000
                }, function (error) {
                    if (error) {
                        _callback(false);
                    } else {
                        //console.log('All is well');
                        _callback(false);
                    }
                });
            },

            // inserting to index
            CreateObject: function (_data, _callback) {

                this.client.index({
                    index: this._index,
                    body: _data
                }, (err, resp, status) => {
                    if (err) {
                        console.log(err);
                    } else {
                        if (resp.result == "created")
                            _callback(resp._id);
                        else
                            console.log("conflicted");
                    }
                });
            },

            // get object by id
            GetObjectById: function (_id, _callback) {
                this.client.get({
                    index: this._index,
                    id: _id
                }, (err, resp, status) => {
                    if (err) {
                        console.log(err);
                    } else {
                        _callback(resp._source);
                    }
                });
            },



            // get object Count by foreignKeyValuePair
            GetCountByForeignKeyValue: function (_foreignKeyValuePair, _callback) {

                var buildedTerms = [];
                for (var p in _foreignKeyValuePair) {
                    if (_foreignKeyValuePair.hasOwnProperty(p)) {
                        var obj = { match: {} };
                        obj.match[p] = _foreignKeyValuePair[p];
                        buildedTerms.push(obj);
                    }
                }

                // execute on elasticsearch
                this.client.count({
                    index: this._index,
                    body: {
                        query: {
                            bool: {
                                must: buildedTerms
                            }
                        }
                    }
                }, (err, resp, status) => {
                    if (err) {
                        console.log(err);
                    } else {
                        _callback(resp.count);
                    }
                });
            },

            // get objects by ForeignKeyValue
            GetAllByForeignKeyValue: function (_foreignKeyValuePair, _callback) {

                this.client.search({
                    index: this._index,
                    body: {
                        query: {
                            bool: {
                                filter: {
                                    term: _foreignKeyValuePair
                                }
                            }
                        }
                    }
                }, (err, resp, status) => {
                    if (err) {
                        console.log(err);
                    } else {
                        var cleanResults = [];
                        var results = resp.hits.hits;
                        results.forEach(result => {
                            cleanResults.push(result._source);
                        });
                        _callback(cleanResults);
                    }
                });
            },

            GetAll: function (_callback) {

                this.client.search({
                    index: this._index,
                    body: {
                        query: {
                            match_all: {}
                        }
                    }
                }, (err, resp, status) => {
                    if (err) {
                        console.log(err);
                    } else {
                        var cleanResults = [];
                        var results = resp.hits.hits;
                        results.forEach(result => {
                            cleanResults.push(result._source);
                        });
                        _callback(cleanResults);
                    }
                });
            },


            DeleteById: function (_id, _callback) {
                this.client.delete({
                    index: this._index,
                    id: _id
                }, (err, resp, status) => {
                    if (err) {
                        console.log(err);
                    } else {
                        if (resp.result == "deleted")
                            _callback(true);
                        else
                            _callback(false);
                    }
                });
            },

            UpdateById: function (_id, newValues, _callback) {
                this.client.update({
                    index: this._index,
                    id: _id,
                    body: {
                        doc: newValues
                    }
                }, (err, resp, status) => {
                    if (err) {
                        console.log(err);
                    } else {
                        if (resp.result == "updated")
                            _callback(true);
                        else
                            _callback(false);
                    }
                });
            },//endof: updateById
        }// endof: return
    }// createIndexClient
}// endof: module.exports