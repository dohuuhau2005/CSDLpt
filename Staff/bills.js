const express = require('express');
const router = express.Router();
const sql = require('mssql');
const { ulid } = require('ulid');
const db = require('../src/Config/DBConnection');
const verifyToken = require('../src/Middleware/verifyToken');
router.post("/bills", verifyToken, async (req, res) => {
    const { thanhpho, soHD, maNV, soTien } = req.body;
    try {
        const queryUpdate = `use dienluc
update hopdong set isPaid = 1 where soHD = @soHD `;
        const query = `
insert into hoadon (soHDN ,
    thang ,
    nam ,
    soHD ,
    maNV ,
    soTien ) values (@soHDN,@thang,@nam,@soHD,@maNV,@soTien) `;
        const month = new Date().getMonth() + 1;
        const year = new Date().getFullYear();
        const pool1 = await db.GetManh1DBPool();
        const pool2 = await db.GetManh2DBPool();
        const pool3 = await db.GetManh3DBPool();
        if (thanhpho === "TP1") {
            await pool1.request()
                .input("soHD", sql.VarChar, soHD).query(queryUpdate)
            const result1 = await pool1.request()
                .input("soHD", sql.VarChar, soHD)
                .input("soHDN", sql.VarChar, ulid())
                .input("maNV", sql.VarChar, maNV)
                .input("thang", sql.Int, month)
                .input("nam", sql.Int, year)
                .input("soTien", sql.Int, soTien)
                .query(query);
        }

        if (thanhpho === "TP2") {
            await pool2.request()
                .input("soHD", sql.VarChar, soHD).query(queryUpdate)
            const result2 = await pool2.request()
                .input("soHD", sql.VarChar, soHD)
                .input("soHDN", sql.VarChar, ulid())
                .input("maNV", sql.VarChar, maNV)
                .input("thang", sql.Int, month)
                .input("nam", sql.Int, year)
                .input("soTien", sql.Int, soTien)
                .query(query);
        }
        if (thanhpho === "TP3") {
            await pool3.request()
                .input("soHD", sql.VarChar, soHD).query(queryUpdate)
            const result3 = await pool3.request()
                .input("soHD", sql.VarChar, soHD)
                .input("soHDN", sql.VarChar, ulid())
                .input("maNV", sql.VarChar, maNV)
                .input("thang", sql.Int, month)
                .input("nam", sql.Int, year)
                .input("soTien", sql.Int, soTien)
                .query(query);
        }
        return res.status(200).json({ success: true, message: "them hoa don thanh cong" })
    } catch (error) {
        console.log("loi them hoa don ", error)
        return res.status(500).json({ success: false, message: "thêm hóa đơn thất bại" })
    }

});
module.exports = router;