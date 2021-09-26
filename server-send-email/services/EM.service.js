const EM = require('../models').ExpressMail;

module.exports = {
    send: async (data) => {        
        try {           
            const _data = await EM.create(data);
            return _data;        
        } catch (err) {            
            throw err;
        }
    },
};