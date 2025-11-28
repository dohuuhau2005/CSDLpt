const { config } = require('dotenv');
const sql = require('mssql');

const dbConfigManh1 = {
    user: process.env.DB_User,
    password: process.env.DB_Password,
    server: process.env.DB_Server1,
    port: 1434,
    database: process.env.DB_Name,
    options: {
        encrypt: true, // bắt buộc nếu dùng Azure
        trustServerCertificate: true, // cần thiết cho local SQL Server
    },
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
    }

};

const dbConfigManhlocal1 = {
    user: process.env.DB_User,
    password: process.env.DB_PasswordLocal,
    server: process.env.DB_ServerLocal,
    port: 1434,
    database: process.env.DB_Name,
    options: {
        encrypt: true, // bắt buộc nếu dùng Azure
        trustServerCertificate: true, // cần thiết cho local SQL Server
    },
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
    }

};

const dbConfigManh2 = {
    user: process.env.DB_User,
    password: process.env.DB_Password,
    server: process.env.DB_Server2,
    port: 1436,
    database: process.env.DB_Name,
    options: {
        encrypt: true, // bắt buộc nếu dùng Azure
        trustServerCertificate: true, // cần thiết cho local SQL Server
    },
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
    }

};

const dbConfigManhlocal2 = {
    user: process.env.DB_User,
    password: process.env.DB_PasswordLocal,
    server: process.env.DB_ServerLocal,
    port: 1436,
    database: process.env.DB_Name,
    options: {
        encrypt: true, // bắt buộc nếu dùng Azure
        trustServerCertificate: true, // cần thiết cho local SQL Server
    },
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
    }

};

const dbConfigManhWindowServer2 = {
    user: process.env.DB_User,
    password: process.env.DB_PasswordLocal,
    server: process.env.DB_WindowServer2,

    database: process.env.DB_Name,
    options: {
        encrypt: true, // bắt buộc nếu dùng Azure
        trustServerCertificate: true, // cần thiết cho local SQL Server
    },
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
    }

};
const dbConfigManh3 = {
    user: process.env.DB_User,
    password: process.env.DB_Password,
    server: process.env.DB_Server3,
    port: 1435,
    database: process.env.DB_Name,
    options: {
        encrypt: true, // bắt buộc nếu dùng Azure
        trustServerCertificate: true, // cần thiết cho local SQL Server
    },
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
    }

};

const dbConfigManhlocal3 = {
    user: process.env.DB_User,
    password: process.env.DB_PasswordLocal,
    server: process.env.DB_ServerLocal,
    port: 1435,
    database: process.env.DB_Name,
    options: {
        encrypt: true, // bắt buộc nếu dùng Azure
        trustServerCertificate: true, // cần thiết cho local SQL Server
    },
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
    }

};
const dbConfigManhWindowServer3 = {
    user: process.env.DB_User,
    password: process.env.DB_PasswordLocal,
    server: process.env.DB_WindowServer3,

    database: process.env.DB_Name,
    options: {
        encrypt: true, // bắt buộc nếu dùng Azure
        trustServerCertificate: true, // cần thiết cho local SQL Server
    },
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
    }

};
const dbConfigManh2Users = {
    user: process.env.DB_User,
    password: process.env.DB_Password,
    server: process.env.DB_Server2,
    port: 1434,
    database: process.env.DB_UserManage,
    options: {
        encrypt: true, // bắt buộc nếu dùng Azure
        trustServerCertificate: true, // cần thiết cho local SQL Server
    },
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
    }

};

const dbConfigManh2UsersLocal = {
    user: process.env.DB_User,
    password: process.env.DB_PasswordLocal,
    server: process.env.DB_ServerLocal,
    port: 1434,
    database: process.env.DB_UserManage,
    options: {
        encrypt: true, // bắt buộc nếu dùng Azure
        trustServerCertificate: true, // cần thiết cho local SQL Server
    },
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
    }

};



let primaryDBPool;
let secondaryDBPool;
let thirdDBPool;

const GetManh1DBPool = async () => {
    const serverPrior1 = [
        { name: "server 1434", config: dbConfigManh1 },
        { name: "server Local 1434", config: dbConfigManhlocal1 }
    ]

    for (const server of serverPrior1) {
        try {
            primaryDBPool = new sql.ConnectionPool(server.config);
            await primaryDBPool.connect();
            console.log("Kết nối đến cơ sở dữ liệu Mảnh 1! của " + server.name);
            return primaryDBPool;
        }
        catch (err) {
            console.error("Lỗi kết nối đến cơ sở dữ liệu: Mảnh 1 " + process.env.DB_User, err);

        }

    }
    throw new Error("Không thể kết nối với server 1");

};

const GetManh2DBPool = async () => {
    const serverPrior2 = [{ name: "server 1436", config: dbConfigManh2 },
    { name: "server Local 1436", config: dbConfigManhlocal2 },
    { name: "server Window A", config: dbConfigManhWindowServer2 }]
    for (const server of serverPrior2) {
        try {
            secondaryDBPool = new sql.ConnectionPool(server.config);
            await secondaryDBPool.connect();
            console.log("Kết nối đến cơ sở dữ liệu Mảnh 2 của " + server.name);
            return secondaryDBPool;
        }
        catch (err) {
            console.error("Lỗi kết nối đến cơ sở dữ liệu: Mảnh 2 của" + server.name, err);

        }
    }
    throw new Error("Lỗi toàn bộ server mảnh 2");
};

const GetManh3DBPool = async () => {
    const serverPrior3 = [
        { name: "server 1435", config: dbConfigManh3 },
        { name: "server Local 1435", config: dbConfigManhlocal3 },
        { name: "server Window B", config: dbConfigManhWindowServer3 }
    ]
    for (const server of serverPrior3) {
        try {
            thirdDBPool = new sql.ConnectionPool(server.config);
            await thirdDBPool.connect();
            console.log("Kết nối đến cơ sở dữ liệu Mảnh 3 của " + server.name);
            return thirdDBPool;
        }
        catch (err) {
            console.error("Lỗi kết nối đến cơ sở dữ liệu: Mảnh 3 " + server.name, err);

        }

    }
    throw new Error("Lỗi toàn bộ server mảnh 3");

};
const GetManh2UserDBPool = async () => {
    const serverUsers = [
        { name: "server 1434", config: dbConfigManh2Users },
        { name: "server user local", config: dbConfigManh2UsersLocal }
    ]
    for (const server of serverUsers) {
        try {
            secondaryDBPool = new sql.ConnectionPool(server.config);
            await secondaryDBPool.connect();
            console.log("Kết nối đến cơ sở dữ liệu Mảnh ", server.name);
            return secondaryDBPool;
        }
        catch (err) {
            console.error("Lỗi kết nối đến cơ sở dữ liệu: Mảnh User " + server.name, err);

        }
    }
    throw new Error("Lỗi toàn bộ server đăng nhập");
};
module.exports = { GetManh1DBPool, GetManh2DBPool, GetManh3DBPool, GetManh2UserDBPool };