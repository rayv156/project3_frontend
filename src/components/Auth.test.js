const rewire = require("rewire")
const Auth = rewire("./Auth")
const login = Auth.__get__("login")
const logout = Auth.__get__("logout")
// @ponicode
describe("login", () => {
    test("0", async () => {
        await login()
    })
})

// @ponicode
describe("logout", () => {
    test("0", () => {
        let callFunction = () => {
            logout()
        }
    
        expect(callFunction).not.toThrow()
    })
})
