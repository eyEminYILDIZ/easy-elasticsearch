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
                        _callback(true);
                    }
                });
            },

            // connection verify:
            VerifyConnectionAsync: async function () {
                var result = await this.client.ping({
                    // ping usually has a 3000ms timeout
                    requestTimeout: 1000
                });
                return result;
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
                            _callback(undefined);
                    }
                });
            },

            // inserting to index
            CreateObjectAsync: async function (_data) {

                var resp = await this.client.index({
                    index: this._index,
                    body: _data
                });
                if (resp.result == "created")
                    return resp._id;
                else
                    return undefined;
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

            // get object by id
            GetObjectByIdAsync: async function (_id) {
                var resp = await this.client.get({
                    index: this._index,
                    id: _id
                });
                return resp._source;
            },

            // get objects Count
            GetCount: function (_callback) {

                // execute on elasticsearch
                this.client.count({
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
                        _callback(resp.count);
                    }
                });
            },

            // get objects Count
            GetCountAsync: async function () {

                // execute on elasticsearch
                var resp = await this.client.count({
                    index: this._index,
                    body: {
                        query: {
                            match_all: {}
                        }
                    }
                });
                return resp.count;
            },


            // get object Count by foreignKeyValuePair
            GetCountByKeyValues: function (_foreignKeyValuePair, _callback) {

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


            // get object Count by foreignKeyValuePair
            GetCountByKeyValuesAsync: async function (_foreignKeyValuePair) {

                var buildedTerms = [];
                for (var p in _foreignKeyValuePair) {
                    if (_foreignKeyValuePair.hasOwnProperty(p)) {
                        var obj = { match: {} };
                        obj.match[p] = _foreignKeyValuePair[p];
                        buildedTerms.push(obj);
                    }
                }

                // execute on elasticsearch
                var resp = await this.client.count({
                    index: this._index,
                    body: {
                        query: {
                            bool: {
                                must: buildedTerms
                            }
                        }
                    }
                });
                return resp.count;
            },


            // get objects by ForeignKeyValue
            GetAllByKeyValues: function (_foreignKeyValuePair, _callback) {

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

            // get objects by ForeignKeyValue
            GetAllByKeyValuesAsync: async function (_foreignKeyValuePair) {

                var resp = await this.client.search({
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
                });
                var cleanResults = [];
                var results = resp.hits.hits;
                results.forEach(result => {
                    cleanResults.push(result._source);
                });
                return cleanResults;
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


            GetAllAsync: async function (_data) {
                var resp = await this.client.search({
                    index: this._index,
                    body: {
                        query: {
                            match_all: {}
                        }
                    }
                });
                var cleanResults = [];
                var results = resp.hits.hits;
                results.forEach(result => {
                    cleanResults.push(result._source);
                });
                return cleanResults;
            },

            GetByDateRange: function (_startDate, _endDate, _callback) {

                this.client.search({
                    index: this._index,
                    body: {
                        query: {
                            range: {
                                datetime: {
                                    gte: _startDate,
                                    lte: _endDate
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

            GetByDateRangeAsync: async function (_startDate, _endDate) {

                var resp = await this.client.search({
                    index: this._index,
                    body: {
                        query: {
                            range: {
                                datetime: {
                                    gte: _startDate,
                                    lte: _endDate
                                }
                            }
                        }
                    }
                });

                var cleanResults = [];
                var results = resp.hits.hits;
                results.forEach(result => {
                    cleanResults.push(result._source);
                });
                return cleanResults;
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

            DeleteByIdAsync: async function (_id) {
                var resp = await this.client.delete({
                    index: this._index,
                    id: _id
                });

                if (resp.result == "deleted")
                    return true;
                else
                    return false;
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
            },

            UpdateByIdAsync: async function (_id, newValues) {
                var resp = await this.client.update({
                    index: this._index,
                    id: _id,
                    body: {
                        doc: newValues
                    }
                });

                if (resp.result == "updated")
                    return true;
                else
                    return false;
            },//endof: updateById
        }// endof: return
    }// createIndexClient
}// endof: module.exports