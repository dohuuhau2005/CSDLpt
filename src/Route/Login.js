const express = require('express');
const router = express.Router();
const sql = require('mssql');
const db = require('../Config/DBConnection');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const verifyToken = require('../Middleware/verifyToken');

router.post('/', async (req, res) => {
    const { email, password } = req.body;
    try {
        const pool = await db.GetManh2UserDBPool();
        const request = pool.request();
        request.input('Email', sql.VarChar, email);
        const query = 'use UsersCsdlPt SELECT * FROM Users WHERE Email = @Email';

        const result = await request.query(query);

        if (result.recordset.length > 0) {
            const user = result.recordset[0];

            const MaNV = user.MaNV;
            const salt = user.Salt;
            const emailpassDB = String(user.Password).trim();
            const role = user.Role;
            const passWithSalt = password + salt;

            const hashedPassword = crypto.createHash('sha512').update(passWithSalt).digest('hex');
            console.log("passs" + password);
            console.log("dsadasdsadadada " + salt);



            console.log("hasssss" + hashedPassword);
            // const isMatch = await bcrypt.compare(passWithSalt, emailpassDB);


            console.log("hashedPassword:", hashedPassword, "length:", hashedPassword.length);
            console.log("fromDB:", emailpassDB, "length:", emailpassDB.length);

            for (let i = 0; i < hashedPassword.length; i++) {
                if (hashedPassword[i] !== emailpassDB[i]) {
                    console.log(`Mismatch at position ${i}: ${hashedPassword[i]} != ${emailpassDB[i]}`);
                    break;
                }
            }
            if (hashedPassword === emailpassDB) {
                console.log("khop nhaaaaaaaaaaaaaaaaaaaaa");
            }

            if (hashedPassword === emailpassDB) {

                const token = jwt.sign({ id: MaNV, email: email, role: role }, process.env.JWT_SECRET, { expiresIn: '1h' });

                console.log("token", token);
                console.log("role", role);
                console.log("email", email);
                console.log("userId", MaNV);
                return res.status(200).json({ token: token, isLocked: false, success: true, message: "Đăng nhập thành công" });


            } else {
                return res.status(401).json({ success: false, message: "Sai mật khẩu" });
            }


        } else {
            res.json({ exists: false });
        }
    } catch (err) {
        console.error('Lỗi kiểm tra email:', err);
        res.status(500).json({ error: 'Lỗi server' });
    }

});
router.get('/protected', verifyToken, (req, res) => {
    res.json({ message: 'This is a protected route', userId: req.userId });
});
module.exports = router;