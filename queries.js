const { PASSWORD, USER, DB, DB_PORT } = process.env;
const { Pool } = require("pg");
const pool = new Pool({
  user: USER,
  host: "localhost",
  database: DB,
  password: PASSWORD,
  port: DB_PORT
});

exports.getUsers = (req, res) => {
  pool.query("SELECT * FROM users ORDER BY id ASC", (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).json(results.rows);
  });
};

exports.getUsersById = (req, res) => {
  const id = parseInt(req.params.id);

  pool.query("SELECT * FROM users WHERE id = $1", [id], (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).json(results.rows);
  });
};

exports.createUser = (req, res) => {
  const { name, email } = req.body;

  pool.query(
    "INSERT INTO users (name, email) VALUES ($1, $2)",
    [name, email],
    async (error, results) => {
      if (error) {
        throw error;
      }
      const { rows } = await pool.query(
        "SELECT id, name, email FROM users WHERE email = $1",
        [email]
      );
      res.status(201).json(rows);
    }
  );
};

exports.updateUser = (req, res) => {
  const id = parseInt(req.params.id);
  const { name, email } = req.body;

  pool.query(
    "UPDATE users SET name = $1, email = $2 WHERE id = $3",
    [name, email, id],
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200).send(`User modified with ID: ${id}`);
    }
  );
};

exports.deleteUser = (req, res) => {
  const id = parseInt(req.params.id);

  pool.query("DELETE FROM users WHERE id = $1", [id], (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).send(`User deleted with id: ${id}`);
  });
};
