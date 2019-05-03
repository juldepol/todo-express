const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const logger = require("morgan");
const Sequelize = require('sequelize');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(logger("dev"));

module.exports = app

const router = express.Router();

const sequelize = new Sequelize('mainDB', null, null, {
    dialect: "sqlite",
    storage: './database.db',
});

// Task model
const Task = sequelize.define('Task', {
    task: Sequelize.STRING,
    done: Sequelize.INTEGER
},{
    timestamps: false
});

router.get("/task", (req, res) => {
    Task.findAll({
        raw: true,
        attributes: ['id', 'task', 'done']
    }).then((tasks) => {
        return res.status(200).json(tasks);
    }).catch(function (err) {
        return res.status(500).json(err);
    });
});

router.post("/task", (req, res) => {
    const task = req.body.task;
    Task.create({ 
        task: task, 
        done: 0
    })
    .then(() => {
        return res.status(201).json();
    }).catch(function (err) {
        return res.status(500).json(err);
    });
});

router.delete("/task/:id?", (req, res) => {
    const id = parseInt(req.query.id);
    Task.destroy({
        where: {
            id: id
        }
    }).then(()=>{
        return res.status(200).json();
    }).catch(function (err) {
        return res.status(500).json(err);
    });
});

router.put("/task/:id?", (req, res) => {
    const id = parseInt(req.query.id);
    Task.update({
        done: 1
    },{
        where: 
            {id: id}
    }).then(()=>{
        return res.status(200).json();
    }).catch(function (err) {
        return res.status(500).json(err);
    });
});

app.use("/api", router);
const API_PORT = 5000;
let server = app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));