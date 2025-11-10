const express = require('express');
const router = express.Router();
const sql = require('mssql');
const db = require('../src/Config/DBConnection');
const verifyToken = require('../src/Middleware/verifyToken');
router.get("/contracts", verifyToken, async (req, res) => {
    const { manv } = req.query;
    try {
        const query = `
    use DienLuc
    SELECT hd.soHD,
           hd.maKH,
           kh.tenKH,
           hd.ngayKy,
           hd.soDienKe,
           hd.kwDinhMuc,
           hd.dongiaKW,
           hd.isPaid
    FROM hopdong hd
    INNER JOIN khachhang kh ON hd.maKH = kh.maKH
    INNER JOIN nhanvien nv ON nv.maCN = kh.maCN
    WHERE nv.maNV = @manv
`;

        const pool1 = await db.GetManh1DBPool();
        const pool2 = await db.GetManh2DBPool();
        const pool3 = await db.GetManh3DBPool();
        const result1 = await pool1.request().input("manv", sql.VarChar, manv).query(query);
        const result2 = await pool2.request().input("manv", sql.VarChar, manv).query(query);
        const result3 = await pool3.request().input("manv", sql.VarChar, manv).query(query);
        const hopdong1 = result1.recordset;
        const hopdong2 = result2.recordset;
        const hopdong3 = result3.recordset;
        const allcus = [...hopdong1, ...hopdong2, ...hopdong3]
        return res.status(200).json({ success: true, customers: allcus, message: "lấy danh sách hợp đồng thành công" });

    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, message: "lấy danh sách khách hàng thất bại" });
    }


});

router.post("/contracts", verifyToken, async (req, res) => {
    const { soHD, maKH, soDienKe, kwDinhMuc, dongiaKW } = req.query;
    try {
        const query = `
    use DienLuc
   insert into hopdong (soHD,maKH,soDienKe,kwDinhMuc,dongiaKW) values (@soHD,@maKH,@soDienKe,
`;

        const pool1 = await db.GetManh1DBPool();
        const pool2 = await db.GetManh2DBPool();
        const pool3 = await db.GetManh3DBPool();
        const result1 = await pool1.request().input("manv", sql.VarChar, manv).query(query);
        const result2 = await pool2.request().input("manv", sql.VarChar, manv).query(query);
        const result3 = await pool3.request().input("manv", sql.VarChar, manv).query(query);
        const hopdong1 = result1.recordset;
        const hopdong2 = result2.recordset;
        const hopdong3 = result3.recordset;
        const allcus = [...hopdong1, ...hopdong2, ...hopdong3]
        return res.status(200).json({ success: true, customers: allcus, message: "lấy danh sách hợp đồng thành công" });

    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, message: "lấy danh sách khách hàng thất bại" });
    }


});

module.exports = router;

