const express = require('express');
const oracledb = require('oracledb');
const cors = require('cors');

var morgan = require('morgan')
const app = express();
app.use(cors());
app.use(morgan('common'));
app.use(express.json());

const dbConfig = {
  user: "admin",
  password: '1',
  connectString: '192.168.56.1:1521/orcl'
};

async function checkConnection() {
  let connection;
  try {
    connection = await oracledb.getConnection(dbConfig);
    console.log('Kết nối đến cơ sở dữ liệu thành công!');
  } catch (err) {
    console.error('Không thể kết nối đến cơ sở dữ liệu:', err);
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error(err);
      }
    }
  }
}

checkConnection();

async function executeQuery(query) {
  let connection;
  try {
    connection = await oracledb.getConnection(dbConfig);
    const result = await connection.execute(query);
    return result.rows;
  } catch (err) {
    console.error(err);
    throw new Error('Failed to execute query');
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error(err);
      }
    }
  }
}

app.get('/getAllCar', async (req, res) => {
  try {
    const result = await executeQuery(`
    SELECT 
    x.MaXe AS "ID xe",
    h.TenHangXe AS "Hãng xe",
    d.TenDongXe AS "Dòng xe",
    p.TenPhienBan AS "Phiên bản",
    ph.TenPhanKhuc AS "Phân khúc",
    dc.LoaiDongCo AS "Động cơ",
    x.GiaNiemYet AS "Giá niêm yết",
    x.KhuyenMai AS "Đàm phán"
    FROM 
        Xe x
    JOIN 
        PhienBan p ON x.MaPhienBan = p.MaPhienBan
    JOIN 
        PhanKhuc ph ON x.MaPhanKhuc = ph.MaPhanKhuc
    JOIN 
        DongCo dc ON x.MaDongCo = dc.MaDongCo
    JOIN 
        DongXe d ON p.MaDongXe = d.MaDongXe
    JOIN 
        HangXe h ON d.MaHangXe = h.MaHangXe
    `);


    res.json(result);
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});


app.get('/getPrice', async (req, res) => {
  const maXe = req.query.maXe;
  let connection;
  try {
    connection = await oracledb.getConnection(dbConfig);
    const result = await connection.execute(
      `BEGIN :result := get_Price(:p_maXe); END;`,
      {
        p_maXe: maXe,
        result: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER }
      }
    );

    res.json({ price: result.outBinds.result });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed' });
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error(err);
      }
    }
  }
});





app.put('/updatePrice', async (req, res) => {
  const maXe = req.body.id;
  console.log(req.body)

  let connection;
  try {
    connection = await oracledb.getConnection(dbConfig);

    await connection.execute(
      `BEGIN update_Xe(:p_maXe, :p_newprice); END;`,
      { p_maXe: maXe, p_newprice: req.body.newPrice }
    );
    await connection.commit();
    res.status(200).json({ message: 'success' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to execute function' });
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error(err);
      }
    }
  }
});



app.delete('/deleteXe', async (req, res) => {
  const maXe = req.query.id;

  let connection;
  try {
    connection = await oracledb.getConnection(dbConfig);

    await connection.execute(
      `BEGIN del_xe(:p_maXe); END;`,
      { p_maXe: maXe }
    );
    await connection.commit();
    res.status(200).json({ message: 'success' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to execute function' });
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error(err);
      }
    }
  }
});
const getAllData = async (tableName) => {
  return await executeQuery(`SELECT * FROM ${tableName}`);
};

app.get('/getPhienBan', async (req, res) => {
  try {
    const result = await getAllData('phienban');
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: 'Failed' });
  }
});

app.get('/getPhanKhuc', async (req, res) => {
  try {
    const result = await getAllData('phankhuc');
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: 'Failed ' });
  }
});
//lấy hãng xe
app.get('/getHangXe', async (req, res) => {
  try {
    const result = await getAllData('hangxe');
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: 'Failed ' });
  }
});



app.get('/getHistoryUpdatePrice', async (req, res) => {
  try {
    const result = await getAllData('change_price_xe');
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: 'Failed' });
  }
});




app.get('/getHistoryDelete', async (req, res) => {
  try {
    const result = await getAllData('del_xe_store');
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: 'Failed' });
  }
});




app.get('/getMaxBrandsPrice', async (req, res) => {
  let connection;
  try {
    connection = await oracledb.getConnection(dbConfig);

    await connection.execute(`SELECT max_Price_HangXe() FROM dual`);

    const result = await connection.execute(`SELECT * FROM TempMaHangXe`);

    res.json({ hangXeGiaCaoNhat: result.rows });
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ error: 'Failed ' });
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error(err);
      }
    }
  }
});



app.get('/getMaxModelPrice', async (req, res) => {
  let connection;
  try {
    connection = await oracledb.getConnection(dbConfig);

    await connection.execute(`SELECT max_Price_DongXe() FROM dual`);

    const result = await connection.execute(`SELECT * FROM TempMaDongXe`);

    res.json({ hangXeGiaCaoNhat: result.rows });
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ error: 'Failed ' });
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error(err);
      }
    }
  }
});



app.get('/getRoadPrice', async (req, res) => {
  let connection;
  try {
    connection = await oracledb.getConnection(dbConfig);
    const result = await connection.execute(`SELECT GiaXeLanBanh(:p_id, :p_baohiem,:p_phiduongbo) FROM dual`, 
    { p_id: req.query.id, p_baohiem: req.query.baohiem, p_phiduongbo: req.query.duongbo, });

    res.json({  price: result.rows });
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ error: 'Failed' });
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error(err);
      }
    }
  }
});






app.get('/getDongCo', async (req, res) => {
  try {
    const result = await getAllData('dongco');
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: 'Failed to execute query' });
  }
});
//Thêm xe mới
app.post('/insertXe', async (req, res) => {
  let tenPhienBan = req.body.phienban;
  let tenDongXe = req.body.name;
  let maHang = req.body.selectedHangXe;
  let maXe = req.body.id_product;
  let maPhanKhuc = req.body.selectedPhanKhuc;
  let maDongCo = req.body.selectedDongCo;
  let giaNiemYet = req.body.price;
  let khuyenMai = req.body.describe;
  let connection;

  try {
    connection = await oracledb.getConnection(dbConfig);


    const existingResult = await connection.execute(
      `SELECT MaXe FROM Xe WHERE MaXe = :p_MaXe`,
      { p_MaXe: maXe }
    );

    if (existingResult.rows.length > 0) {
      return res.status(400).json({ error: 'Vehicle ID already exists' });
    }


    const resultCheckDongXe = await connection.execute(
      `SELECT MaDongXe FROM DongXe WHERE TenDongXe = :p_tenDongXe AND MaHangXe = :p_maHang AND ROWNUM = 1`,
      { p_tenDongXe: tenDongXe, p_maHang: maHang }
    );

    let maDongXe;
    if (resultCheckDongXe.rows.length === 0) {

      const resultInsertDongXe = await connection.execute(
        `INSERT INTO DongXe (TenDongXe, MaHangXe) VALUES (:p_tenDongXe, :p_maHang) RETURNING MaDongXe INTO :maDongXe`,
        {
          p_tenDongXe: tenDongXe,
          p_maHang: maHang,
          maDongXe: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER }
        }
      );
      maDongXe = resultInsertDongXe.outBinds.maDongXe[0];
    } else {
      maDongXe = resultCheckDongXe.rows[0][0];
    }


    const existingPhienBanResult = await connection.execute(
      `SELECT TENPHIENBAN FROM PhienBan WHERE TENPHIENBAN = :p_tenPhienBan and MaDongXe=:p_maDongxe`,
      { p_tenPhienBan: tenPhienBan, p_maDongxe: maDongXe }
    );

    if (existingPhienBanResult.rows.length > 0) {
      return res.status(400).json({ error: 'Phien Ban already exists' });
    }

    let maPhienBanMoi;
    if (existingPhienBanResult.rows.length === 0) {
      const resultInsertPhienBan = await connection.execute(
        `INSERT INTO PhienBan ( TenPhienBan, MaDongXe)values (:p_tenphienban, :p_madongxe) RETURNING MaPhienBan INTO :maPhienBan`,
        {
          p_tenphienban: tenPhienBan,
          p_madongxe: maDongXe,
          maPhienBan: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER }
        }
      );
      maPhienBanMoi = resultInsertPhienBan.outBinds.maPhienBan[0];

    } else {
      return res.status(400).json({ error: 'Phien Ban Ton tai' });
    }

    await connection.execute(
      `BEGIN ins_Xe(:p_MaXe, :p_MaPhienBan, :p_MaPhanKhuc, :p_MaDongCo, :p_GiaNiemYet, :p_KhuyenMai); END;`,
      {
        p_MaXe: maXe,
        p_MaPhienBan: maPhienBanMoi,
        p_MaPhanKhuc: maPhanKhuc,
        p_MaDongCo: maDongCo,
        p_GiaNiemYet: giaNiemYet,
        p_KhuyenMai: khuyenMai
      }
    );

    await connection.commit();
    res.json({ message: 'success' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to insert' });
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error(err);
      }
    }
  }
});




app.listen(5000, () => {
  console.log('Server running on port 5000');
});
