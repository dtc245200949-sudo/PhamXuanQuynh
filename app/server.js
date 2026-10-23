const express = require('express');
const mysql = require('mysql2');
const app = express();
const port = 3000;

app.use(express.json());

// Kết nối tới container MySQL kèm cấu hình charset utf8mb4 để hỗ trợ tiếng Việt chuẩn xác
const db = mysql.createConnection({
  host: process.env.DB_HOST || 'db',
  user: process.env.DB_USER || 'ticketuser',
  password: process.env.DB_PASSWORD || 'ticketpassword',
  database: process.env.DB_NAME || 'ticketdb',
  charset: 'utf8mb4'
});

db.connect((err) => {
  if (err) {
    console.error('Lỗi kết nối cơ sở dữ liệu MySQL:', err);
    return;
  }
  console.log('Đã kết nối thành công tới MySQL Database!');
  
  // Khởi tạo bảng 'movies' (Phim)
  const createMoviesTable = `
    CREATE TABLE IF NOT EXISTS movies (
      id INT AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      genre VARCHAR(100),
      price DECIMAL(10,2) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
  `;

  // Khởi tạo bảng 'bookings' (Đặt vé)
  const createBookingsTable = `
    CREATE TABLE IF NOT EXISTS bookings (
      id INT AUTO_INCREMENT PRIMARY KEY,
      movie_id INT NOT NULL,
      customer_name VARCHAR(255) NOT NULL,
      seat_number VARCHAR(50) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (movie_id) REFERENCES movies(id) ON DELETE CASCADE
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
  `;

  db.query(createMoviesTable, (err) => {
    if (err) console.error('Lỗi tạo bảng movies:', err);
    else console.log('Bảng movies đã sẵn sàng.');
  });

  db.query(createBookingsTable, (err) => {
    if (err) console.error('Lỗi tạo bảng bookings:', err);
    else console.log('Bảng bookings đã sẵn sàng.');
  });
});

// Trang chủ kiểm tra hệ thống
app.get('/', (req, res) => {
  res.send('<h1>He thong Dat ve Xem phim (De 11) đang hoat dong voi MySQL!</h1>');
});

// --- API QUẢN LÝ PHIM ---
app.get('/api/movies', (req, res) => {
  db.query('SELECT * FROM movies', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

app.post('/api/movies', (req, res) => {
  const { title, genre, price } = req.body;
  const query = 'INSERT INTO movies (title, genre, price) VALUES (?, ?, ?)';
  db.query(query, [title, genre, price], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: 'Thêm phim thành công!', movieId: result.insertId });
  });
});

// --- API QUẢN LÝ ĐẶT VÉ (BOOKING) ---
app.get('/api/bookings', (req, res) => {
  const query = `
    SELECT b.id, m.title AS movie_title, b.customer_name, b.seat_number, b.created_at 
    FROM bookings b 
    JOIN movies m ON b.movie_id = m.id
  `;
  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

app.post('/api/bookings', (req, res) => {
  const { movie_id, customer_name, seat_number } = req.body;
  const query = 'INSERT INTO bookings (movie_id, customer_name, seat_number) VALUES (?, ?, ?)';
  db.query(query, [movie_id, customer_name, seat_number], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: 'Đặt vé thành công!', bookingId: result.insertId });
  });
});

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});