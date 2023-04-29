const { createProxyMiddleware } = require("http-proxy-middleware");

const target = "http://localhost:8000";

module.exports = function (app) {
    app.use(
        "/api",
        createProxyMiddleware({
            target,
            changeOrigin: true,
        })
    );
};
