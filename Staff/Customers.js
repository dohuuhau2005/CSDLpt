const express = require('express');
const router = express.Router();
const sql = require('mssql');
const db = require('../src/Config/DBConnection');
const verifyToken = require('../src/Middleware/verifyToken');
router.get('/customers', verifyToken, async (req, res) => {
    try {
        const maNV = req.query.maNV;
        const query = 'use DienLuc SELECT *  FROM khachhang,nhanvien where khachhang.maCN=nhanvien.maCN and nhanvien.maNV=@maNV';
        const pool1 = await db.GetManh1DBPool();
        const pool2 = await db.GetManh2DBPool();
        const pool3 = await db.GetManh3DBPool();

        const request1 = pool1.request();
        const request2 = pool2.request();
        const request3 = pool3.request();
        request1.input('maNV', sql.VarChar, maNV);
        request2.input('maNV', sql.VarChar, maNV);
        request3.input('maNV', sql.VarChar, maNV);
        const result2 = await request2.query(query);
        const result1 = await request1.query(query);
        const result3 = await request3.query(query);
        const customers2 = result2.recordset;
        const customers3 = result3.recordset;
        const customers1 = result1.recordset;
        const allCustomers = [...customers1, ...customers2, ...customers3];
        return res.status(200).json({ success: true, customers: allCustomers });
    } catch (error) {
        console.error("Lỗi khi xuất danh sách khách hàng:", error);
        return res.status(500).json({ success: false, message: "Lỗi máy chủ khi lấy danh sách khách hàng" });
    }
});
router.post('/customers', verifyToken, async (req, res) => {
    try {
        //đã có ở chi nhánh khác chưa
        const { maKH, tenKH, maCN } = req.body;
        // Nếu có thì check tổng xem có hợp đồng chưa thanh toán bên khác hay không và hợp đồng bao nhiêu
        const pool1 = await db.GetManh1DBPool();
        const pool2 = await db.GetManh2DBPool();
        const pool3 = await db.GetManh3DBPool();

        await pool1.request().input("")
        //nếu không có hợp đồng hoặc toàn bộ được đã chi trả thì thêm khách hàng vào chi nhánh hiện tại
        return res.status(200).json({ isAdded: true, success: true, message: "Thêm khách hàng thành công" });
    } catch (error) {
        console.error("Lỗi khi thêm khách hàng:", error);
        return res.status(500).json({ isAdded: false, success: false, message: "Lỗi máy chủ khi thêm khách hàng" });
    }

});
router.put('/customers/:id', verifyToken, async (req, res) => {
    try {
        const customerId = req.params.id;
        const { tenKH, maNV } = req.body;
        const pool1 = await db.GetManh1DBPool();
        const pool2 = await db.GetManh2DBPool();
        const pool3 = await db.GetManh3DBPool();
        const request1 = pool1.request();
        const request2 = pool2.request();
        const request3 = pool3.request();
        request1.input('maKH', sql.VarChar, customerId);
        request1.input('tenKH', sql.NVarChar, tenKH);
        request1.input('maNV', sql.VarChar, maNV);
        request2.input('maKH', sql.VarChar, customerId);
        request2.input('tenKH', sql.NVarChar, tenKH);
        request2.input('maNV', sql.VarChar, maNV);
        request3.input('maKH', sql.VarChar, customerId);
        request3.input('tenKH', sql.NVarChar, tenKH);
        request3.input('maNV', sql.VarChar, maNV);
        const query = 'use DienLuc UPDATE khachhang SET tenKH=@tenKH WHERE maKH=@maKH and maCN=(SELECT maCN FROM nhanvien WHERE maNV=@maNV)';
        await request1.query(query);
        await request2.query(query);
        await request3.query(query);
        return res.status(200).json({ isAdded: true, success: true, message: "chỉnh sửa khách hàng thành công" });
    } catch (error) {
        console.error("Lỗi khi thêm khách hàng:", error);
        return res.status(500).json({ isAdded: false, success: false, message: "Lỗi máy chủ khi chỉnh sửa khách hàng" });
    }

});
module.exports = router;