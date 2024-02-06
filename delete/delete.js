//import modules
const express = require('express')
let mongodb = require('mongodb')
//import url
let url = require('../url')
//create mongoclient
let mcl = mongodb.MongoClient
//create router instance
let router = express.Router()
//create rest api
router.delete("/", (req, res) => {
    let obj = { "p_id": req.body.p_id }
    //connect to mongodb
    mcl.connect(url, (err, conn) => {
        if (err)
            console.log('Error in connection')
        else {
            let db = conn.db('nodedb')
            db.collection('products').deleteOne(obj, (err, result) => {
                if (err)
                    res.status(404).send({ 'delete': 'error' })
                else {
                    if (result.deletedCount != 0) {
                        console.log("Data deleted ")
                        res.status(200).send({ 'delete': 'success' })
                    }
                    else {
                        console.log("Data not deleted ")
                        res.status(200).send({ 'delete': 'Record not found' })
                    }
                    conn.close()
                }
            })
        }
    })
})
//export router
module.exports = router