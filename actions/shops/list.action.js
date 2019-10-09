const Shop = require("../../models/shop.model")

class List {
    constructor(search, params) {
        this.search = search
        this.params = params
    }

    async exec() {
        try {
            let result = await Shop.paginate(
                this.search,
                this.params
            ).then(res => {
                return {
                    data: res.docs,
                    total: res.total,
                    limit: res.limit,
                    page: res.page,
                    pages: res.pages
                }
            })

            return result
        } catch(err) {
            throw err
        }
    }
}

module.exports = List
