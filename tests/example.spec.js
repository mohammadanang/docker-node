const objectLib = require("../lib/object")

test('Array manipulation', () => {
    let data = {
        firstname: "John",
        lastname: "Doe",
        email: "john.doe@gmail.com"
    }

    let result = objectLib.manipulate(data)

    expect(result.firstname).toEqual('John')
})
