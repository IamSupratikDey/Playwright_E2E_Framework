const base = require('@playwright/test');


function expectOk(res) {
    if (!res.ok()) {
        throw new Error(`API call failed: ${res.status()} ${res.url()}`);
    }
}

exports.test = base.test.extend({
    envFeature: async ({ }, use) => {
        const required = ['BASE_URL', 'APP_USER', 'APP_PASS'];
        const missing = required.filter(k => !process.env[k]);
        if (missing.length) throw new Error(`Missing env vars: ${missing.join(', ')}`);

        await use({
            name: process.env.ENV || 'qa',
            baseUrl: process.env.BASE_URL,
            user: process.env.APP_USER,
            pass: process.env.APP_PASS,
        })
    },
    apiClient: async ({ playwright, envFeature }, use) => {
        const api = await playwright.request.newContext({ baseURL: envFeature.baseUrl });
        await use(api);
        await api.dispose();
    },
    auth: async ({ apiClient, envFeature }, use) => {
        const res = await apiClient.post('/api/ecom/auth/login', {
            data: { userEmail: envFeature.user, userPassword: envFeature.pass },
        });
        expectOk(res);
        const body = await res.json();
        await use({ token: body.token, userId: body.userId });
    }

})

exports.expect = base.expect;


