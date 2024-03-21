import express from "express";
import cors from "cors";
import mysql from "mysql2";
import dotenv from 'dotenv'; 
const app = express()
app.use(express.json());
app.use(cors());
dotenv.config();


const PORT = process.env.PORT
const url = new URL(process.env.DATABASE_URL);


const pool = mysql.createPool({
    host: url.hostname,
    port: url.port,
    user: url.username,
    password: url.password,
    database: url.pathname.substring(1), // Remove leading "/"
}).promise();

try {
  const table = await pool.query(`SELECT COUNT(*) as count 
    FROM information_schema.tables 
    WHERE table_schema = 'ide' 
    AND table_name = 'CodeSubmissions';`);
  if (table[0][0].count >= 1) {
    console.log("Table Already Exists");
  } else {
    const result = await createTable();
    console.log("Table Not Found, \nCreated Successfully");
  }
} catch (error) {
  console.log(error);
}

app.post("/", async (req, res) => {
  const { username } = req.body;
  try {
    const [rows] = await pool.query("SELECT * FROM Users WHERE username = ?", [username]);
    if (rows.length > 0) {
      res.status(200).json({ message: "User Already Exists" });
    } else {
      const [result] = await pool.query("INSERT INTO Users (username) VALUES (?)",[username]);
      res.status(200).json({ message: "User Created Successfully" });
    }
  } catch (error) {
    console.error("Error searching user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/submit", async (req, res) => {
  const { username, lang, stdin, code } = req.body;
  try {
    // Check if the user exists
    const [userRows] = await pool.query(
      "SELECT id FROM Users WHERE username = ?",
      [username]
    );
    if (userRows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const userId = userRows[0].id;

    // Save code submission details to the database
    const result = await pool.query(
      `INSERT INTO CodeSubmissions (user_id, language, stdin, source_code) VALUES (?, ?, ?, ?)`,
      [userId, lang, stdin, code]
    );

    console.log("Code submission saved successfully");
    res.status(200).json({ message: "Code submission saved successfully" });
  } catch (error) {
    console.error("Error saving code submission:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/submit", async (req, res) => {
  const { username } = req.query; 
  console.log(username)

  try {
    let query = `
            SELECT cs.*, u.username
            FROM CodeSubmissions cs
            INNER JOIN Users u ON cs.user_id = u.id
        `;
    let queryParams = [];

    if (username) {
      query += " WHERE u.username = ?";
      queryParams.push(username);
    }
    const [rows] = await pool.query(query, queryParams);
    res.status(200).json(rows);
  } catch (error) {
    console.error("Error fetching submissions:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});


app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});

async function createTable() {
  await pool.query(`CREATE TABLE Users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(255) NOT NULL UNIQUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );`);

  await pool.query(`CREATE TABLE CodeSubmissions (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        language VARCHAR(50) NOT NULL,
        stdin TEXT,
        source_code TEXT NOT NULL,
        submission_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES Users(id)
    );`);
}
