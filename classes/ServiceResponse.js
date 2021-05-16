class ServiceResponse {
    constructor(status=false, content=undefined) {
        this.status = status;
        this.content = content;
    }
}

module.exports = ServiceResponse;