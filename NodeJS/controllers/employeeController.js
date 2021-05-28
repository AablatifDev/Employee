const express = require('express');
let router = express.Router();
let ObjectId = require('mongoose').Types.ObjectId;

let { Employee } = require('../models/employee');


router.get('/', (req, res) => {
    Employee.find((err, docs) => {
        if (!err) {
            res.send(docs)
        } else {
            console.log("Error in Retriving Employees : " + JSON.stringify(err, undefined, 2))
        }
    })
})


router.get('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).send(`No Record With Given Id : ${req.params.id}`)
    }

    Employee.findById(req.params.id, (err, docs) => {
        if (!err) {
            res.send(docs)
        } else {
            console.log("Error in Retriving Employees : " + JSON.stringify(err, undefined, 2))
        }
    })
})



router.post('/', (req, res) => {
    let emp = new Employee({
        name: req.body.name,
        position: req.body.position,
        office: req.body.office,
        salary: req.body.salary
    })
    emp.save((err, docs) => {
        if (!err) {
            res.send(docs)
        } else {
            console.log("Error in Employee Save : " + JSON.stringify(err, undefined, 2))
        }
    })
})


router.put('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).send(`No Record With Given Id : ${req.params.id}`)
    }

    let emp = {
        name: req.body.name,
        position: req.body.position,
        office: req.body.office,
        salary: req.body.salary,
    }

    Employee.findByIdAndUpdate(req.params.id, { $set: emp }, { useFindAndModify: false }, { new: true }, (err, doc) => {
        if (!err) {
            res.send(doc)
        } else {
            console.log("Error in Employee Update : " + JSON.stringify(err, undefined, 2))
        }
    })
})


router.delete('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).send(`No Record With Given Id : ${req.params.id}`)
    }

    Employee.findByIdAndRemove(req.params.id, { useFindAndModify: false }, (err, doc) => {
        if (!err) {
            res.send(doc)
        } else {
            console.log("Error in Employee Delete : " + JSON.stringify(err, undefined, 2))
        }
    })
})




module.exports = router;