var express = require("express");
var router = express.Router()
var upload = require('./multer')
var pool = require('./pool')

router.post('/add_size', function (req, res, next) {
    pool.query("insert into size (categoryid, subcategoryid, productid, size) values (?,?,?,?)",
        [req.body.categoryid, req.body.subcategoryid, req.body.productid, req.body.size], function (error, result) {
            if (error) {
                return res.status(500).json({ status: false })
            }
            else {
                return res.status(200).json({ status: true })
            }
        })
})

router.get('/display_size', function (req, res, next) {
    pool.query("select S.*, (select categoryname from category C where C.categoryid=S.categoryid) as cname,(select subcategoryname from sub_category SC where SC.subcategoryid = S.subcategoryid) as scname,(select productname from product P where P.productid = S.productid) as pname from size S", function (error, result) {
        if (error) {
            console.log(error)
            return res.status(500).json({ data: [] })
        }
        else {
            return res.status(200).json({ data: result })
        }
    })
})

router.post('/edit_size', function (req, res, next) {
    console.log(req.body)
    pool.query("update size set categoryid=?, subcategoryid=?, productid=?, size=? where sizeid=?", [req.body.categoryid, req.body.subcategoryid, req.body.productid, req.body.size, req.body.sizeid], function (error, result) {
        if (error) {
            return res.status(500).json({ status: false })
        }
        else {
            return res.status(200).json({ status: true })
        }
    })
})

router.post('/delete_size', function (req, res, next) {
    pool.query("delete from size where sizeid=?", [req.body.sizeid], function (error, result) {
        if (error) {
            return res.status(500).json({ status: false })
        }
        else {
            return res.status(200).json({ status: true })
        }
    })
})

router.post('/fetch_size_by_product', function (req, res, next) {
    pool.query('select * from size where productid=?', [req.body.productid], function (error, result) {
        if (error) {

            return res.status(500).json({ data: [] })
        }
        else {
            if(result.length>0)
            {
                var size = JSON.parse(result[0].size)
            return res.status(200).json({ data: size })
            }
            else{
                return res.status(200).json({ data: [] })

            }
        }
    })

})

module.exports = router;