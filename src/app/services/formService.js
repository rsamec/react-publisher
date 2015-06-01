import request from 'superagent';
import Promise from 'promise';

class formService {
    constructor(url){
        this.url = url;
    }
    getSchemaList() {
        var url = this.url;
        return new Promise(function (resolve, reject) {
            request.get(url + 'list.json')
                .end(function (err, res) {
                    if (res.ok) return resolve(res.body);
                    else reject(err)
                })
        });
    }

    getSchema(id) {
        var url = this.url;
        return new Promise(function (resolve, reject) {
            request.get(url + id + '.json')
                .end(function (err, res) {
                    if (res.ok) return resolve(res.body);
                    else reject(err)
                })
        });
    }

}

//export default new formService('assets/schemas/');
export default new formService('/data/schemas/');
