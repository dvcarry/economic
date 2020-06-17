const {Router} = require('express')
const router = Router()
// const {dbname} = require('../config/default.json');
const mongo = require('../app')
// const { getDb } = require('../app')
const database = mongo.mongo

router.post('/create', async (req, res) => {  

    // console.log(dbname)
    try {        
        // const newItem = JSON.stringify(req.body)
        const newItem = req.body
        console.log('try')
        database.db().collection('items').insertOne(newItem, (err, result) => {
            if (err) {
                console.log(err)  
            }   else {
                console.log('saved')
                // res.json({result: result, document: result.ops[0]})
            }         
            
        })
        // const result = mongo.getDb().collection('items').find()
        // console.log(result)
        // dbname.col
    } catch (error) {
        res.status(500).json({message: 'Wrong'})
    }
})

module.exports = router