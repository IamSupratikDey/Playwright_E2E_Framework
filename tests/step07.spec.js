const {test, expect} = require('../fixtures')

test('auth fixture gives a token', async({auth }) =>{
    expect(auth.token).toBeTruthy();
    expect(auth.userId).toBeTruthy();
})