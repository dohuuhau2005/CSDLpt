require("dotenv").config();
const express = require('express');
const cors = require('cors');
// const bodyParser = require('body-parser'); // Đã bỏ, dùng express.json() thay thế
const { GetManh1DBPool, GetManh2DBPool, GetManh3DBPool, GetManh2UserDBPool } = require('./src/Config/DBConnection');

const app = express();

// ==================================================================
// 1. MIDDLEWARE (PHẢI KHAI BÁO ĐẦU TIÊN)
// ==================================================================

// Cho phép Cors để tránh lỗi chặn truy cập từ Client khác
app.use(cors());

// Xử lý dữ liệu JSON gửi lên (Thay thế body-parser)
// Đây là dòng sửa lỗi "Cannot destructure property... of undefined"
app.use(express.json()); 

// Xử lý dữ liệu từ form (nếu có)
app.use(express.urlencoded({ extended: true }));

// (Tùy chọn) Middleware log để debug: Xem request nào đang gọi vào
app.use((req, res, next) => {
    console.log(`[LOG] Method: ${req.method} - URL: ${req.url}`);
    // Nếu là POST, in ra body để kiểm tra
    if (req.method === 'POST') {
        console.log("Body received:", req.body);
    }
    next();
});

// ==================================================================
// 2. KẾT NỐI DATABASE
// ==================================================================

GetManh1DBPool()
    .then(() => console.log("✅ Mảnh 1: OK"))
    .catch((err) => console.error("❌ Lỗi Mảnh 1:", err));

GetManh2DBPool()
    .then(() => console.log("✅ Mảnh 2: OK"))
    .catch((err) => console.error("❌ Lỗi Mảnh 2:", err));

GetManh3DBPool()
    .then(() => console.log("✅ Mảnh 3: OK"))
    .catch((err) => console.error("❌ Lỗi Mảnh 3:", err));

GetManh2UserDBPool()
    .then(() => console.log("✅ Mảnh User: OK"))
    .catch((err) => console.error("❌ Lỗi Mảnh User:", err));

// Route kiểm tra server sống hay chết
app.get("/", (req, res) => {
    res.send("Server Node.js đang chạy ngon lành!");
});

// ==================================================================
// 3. KHAI BÁO ROUTES
// ==================================================================

// Import các file route
const loginRoute = require('./src/Route/Login');
const addSiteRoute = require('./Admin/AddSite');
const countRoute = require('./Admin/Count');
const sitesRoute = require('./Admin/Sites');
const staffsRoute = require('./Admin/Staffs');

// Sử dụng route
// Khi gọi vào http://localhost:9999/login, nó sẽ chạy vào loginRoute
app.use('/login', loginRoute); 

// Các route Admin
app.use('/admin', countRoute);
app.use('/admin/addsite', addSiteRoute);
app.use('/admin', sitesRoute);
app.use('/admin', staffsRoute);

// Các route Staff
// Lưu ý: Kiểm tra lại đường dẫn require nếu file chưa tồn tại
try {
    app.use('/staff', require('./Staff/Customers'));
    app.use('/staff', require('./Staff/Contract'));
    app.use('/staff', require('./Staff/bills'));
} catch (error) {
    console.warn("⚠️ Cảnh báo: Một số route Staff chưa tồn tại hoặc lỗi đường dẫn.");
}

// ==================================================================
// 4. KHỞI CHẠY SERVER
// ==================================================================

const PORT = process.env.port_serverNode || 9999;
app.listen(PORT, () => {
    console.log("========================================");
    console.log("🚀 Server is running on port " + PORT);
    console.log("========================================");
});