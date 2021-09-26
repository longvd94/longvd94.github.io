module.exports = {
    badRequest: function(message, data) {
        this.statusCode = 400
		this.error = true
		this.data  = data || null
		this.message  = message || 'Bad Request'

		return this        
    },

    success: function(message, data) {
        this.statusCode = 200
		this.error = false
        if (data) {
            this.data = data;
        }		
		this.message  = message || 'OK'

		return this
        
    },

    unavailable: function(message, data) {
        this.statusCode = 503
        this.error = true
        if (data) {
            this.data = data;
        }
        this.message = message || 'Service Unavai­lable'

        return this
    },

    notFound: function(message) {
        this.statusCode = 404
        this.error = true
        this.message = message || 'Not Found'
        
        return this
    }
};