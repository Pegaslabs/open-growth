//import data into the KV store
//expected message format:
//{"companyName": "email@address.com"}
opengrowth.signals.import = (request) => {
    const ttl = 14400; //14400 = 10 days

    for (var key in request.message) {
        if(key!="signal"){
            kvdb.get(key.toLowerCase().replace(/[^0-9a-z]/gi, '')).then(val => {
                if (val) {
                    if (val.indexOf(request.message[key]) == -1) { //.includes not supported yet??
                        val.push(request.message[key]);
                        kvdb.set(key.toLowerCase().replace(/[^0-9a-z]/gi, ''), val, ttl);
                    }
                } else {
                    kvdb.set(key.toLowerCase().replace(/[^0-9a-z]/gi, ''), [request.message[key]], ttl);
                }
            });
        }
    }
    return request.ok();
};
