//Important import
var express = require("express");
var app = express();
app.use(express.json());
// For upload the file
var fileUpload = require("express-fileupload");
app.use(fileUpload());
// for use of postgresql
const Pool = require("pg").Pool;

// All the headers are here.
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, OPTIONS");
  next();
});

// Initialize port number and start the server
const port = 2410;
app.listen(port, () => console.log("Listening on port : ", port));

// create a new connection pool to the database
const pool = new Pool({
  host: "localhost",
  user: "postgres",
  database: "test",
  password: "aamir",
  port: 5432,
});

// fetch all tasks from database
app.get("/tasks", function (req, res) {
  const query = "select *from tasks2";
  pool.connect((err, client, done) => {
    if (err) throw err;
    try {
      client.query(query, (err, result) => {
        if (err) {
          console.log(err.stack);
          res.status(400).send("Data not found");
        } else {
          console.log("All tasks ", result.rows);
          let arr = [...result.rows];
          data = {
            openTask: arr.filter((ele) => ele.current_status === "open"),
            progressTask: arr.filter(
              (ele) => ele.current_status === "in-progress"
            ),
            completedTask: arr.filter(
              (ele) => ele.current_status === "completed"
            ),
          };
          res.send(data);
        }
      });
    } finally {
      done();
    }
  });
});

// get a particular task
app.get("/task/:id", function (req, res) {
  let id = req.params.id;
  const query = "select *from tasks2 where id=$1";
  pool.connect((err, client, done) => {
    if (err) throw err;
    try {
      client.query(query, [+id], (err, result) => {
        if (err) {
          console.log(err.stack);
          res.status(400).send("Data not found");
        } else {
          console.log("All tasks ", result.rows);
          let arr = [...result.rows];
          res.send(arr);
        }
      });
    } finally {
      done();
    }
  });
});

// Add a new task
app.post("/addTask", function (req, res) {
  let files = { ...req.files };
  let body = JSON.parse(req.body.form);
  let data = [body.title, body.description, body.date, "open", files.file.name];
  files.file.mv("./mediaFile/" + files.file.name, function (err, result) {
    if (err) throw err;
    else {
      const query =
        "INSERT INTO tasks2(title, description,date, current_Status,file) VALUES($1,$2,$3,$4,$5)";
      pool.connect((err, client, done) => {
        if (err) throw err;
        try {
          client.query(query, data, (err, result1) => {
            if (err) {
              console.log(err.stack);
            } else {
              console.log("affected " + result1.rowCount + " row");
              res.send(data);
            }
          });
        } finally {
          done();
        }
      });
    }
  });
});

//Update a task
app.put("/task/edit/:id", function (req, res) {
  let id = req.params.id;
  let body = { ...req.body };
  let data = [body.title, body.description, body.date, body.status, +id];

  const query =
    "UPDATE tasks2 SET title=$1, description=$2, date=$3, current_status=$4 WHERE id=$5";
  pool.connect((err, client, done) => {
    if (err) throw err;
    try {
      client.query(query, data, (err, result1) => {
        if (err) {
          console.log(err.stack);
        } else {
          console.log("affected " + result1.rowCount + " row");
          res.send({ msg: "Successfully update", data: data });
        }
      });
    } finally {
      done();
    }
  });
});

// Delete a task
app.delete("/task/remove/:id", function (req, res) {
  let id = req.params.id;
  const query = "delete from tasks2 where id=$1";
  pool.connect((err, client, done) => {
    if (err) throw err;
    try {
      client.query(query, [+id], (err, result) => {
        if (err) {
          console.log(err.stack);
          res.status(404).send({ msg: "Some error data not deleted!" });
        } else {
          res.send({ msg: "Successfully deleted" });
        }
      });
    } finally {
      done();
    }
  });
});
