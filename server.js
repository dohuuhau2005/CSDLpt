require("dotenv").config();
const express = require('express');
const cors = require('cors');
const { GetManh1DBPool, GetManh2DBPool, GetManh3DBPool, GetManh2UserDBPool } = require('./src/Config/DBConnection');
const app = express();

app.use(cors());
app.use(express.json());

GetManh1DBPool().then(() => {
    console.log("Đã kết nối đến Mảnh 1 thành công.");
}
).catch((err) => {
    console.error("Kết nối đến Mảnh 1 thất bại:", err);
});
GetManh2DBPool().then(() => {
    console.log("Đã kết nối đến Mảnh 2 thành công.");
}).catch((err) => {
    console.error("Kết nối đến Mảnh 2 thất bại:", err);
});
GetManh3DBPool().then(() => {
    console.log("Đã kết nối đến Mảnh 3 thành công.");
}).catch((err) => {
    console.error("Kết nối đến Mảnh 3 thất bại:", err);
});
GetManh2UserDBPool().then(() => {
    console.log("Đã kết nối đến Mảnh User thành công.");

}).catch((err) => {
    console.error("Kết nối đến Mảnh User thất bại:", err);
});
app.get("/", (req, res) => {
    res.send("Hello Node.js Server!");
});

const loginRoute = require('./src/Route/Login');
const addSiteRoute = require('./Admin/AddSite');
const countRoute = require('./Admin/Count');
const sitesRoute = require('./Admin/Sites');
const staffsRoute = require('./Admin/Staffs');

app.use('/admin', countRoute);
app.use('/login', loginRoute);
app.use('/admin/addsite', addSiteRoute);
app.use('/admin', sitesRoute);
app.use('/admin', staffsRoute);

//staff routes
app.use('/staff', require('./Staff/Customers'));
app.use('/staff', require('./Staff/Contract'));

app.listen(process.env.port_serverNode, () => {
    console.log("Server is running on port " + process.env.port_serverNode);
});