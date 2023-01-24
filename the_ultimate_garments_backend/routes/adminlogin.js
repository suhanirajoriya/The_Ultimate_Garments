var express = require('express')
var router = express.Router()
var pool = require('./pool')

router.post('/check_admin_login', function (req, res, next) {
    pool.query('select * from administrator where emailid=? and password=?', [req.body.emailid, req.body.password], function (error, result) {
        if (error) {
            return res.status(500).json({ status: false })
        }
        else {
            if (result.length == 1) {
                return res.status(200).json({ status: true, data: result })
            }
            else
            {
                return res.status(200).json({ status: false, data: [] })
            }
        }
    })
})





module.exports=router;