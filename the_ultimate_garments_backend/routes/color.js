var express = require('express')
var router = express.Router()
var pool = require('./pool')
var upload = require('./multer')

router.post('/add_new_color', function (req, res, next) {
    console.log('bodyyy', req.body)
    pool.query('insert into color (categoryid, subcategoryid, productid, size, color) values(?,?,?,?,?)', [req.body.categoryid, req.body.subcategoryid, req.body.productid, req.body.size, req.body.color], function (error, result) {
        if (error) {
            console.log(error)
            return res.status(500).json({ status: false })
        }
        else {
            return res.status(200).json({ status: true })

        }

    })
})
 
router.get('/display_all_color', function (req, res, next) {
    pool.query('select Cl.*,(select categoryname from category C where Cl.categoryid = C.categoryid ) as cname,(select subcategoryname from sub_category SC where Cl.subcategoryid = SC.subcategoryid) as scname,(select productname from product P where Cl.productid= P.productid) as pname from color Cl', function (error, result) {
        if (error) {
            return res.status(500).json({ data: [] })
        }
        else {
            var color = JSON.parse((result[0].color))
            console.log('cccccccccccc',color)
            console.log(result)
            return res.status(200).json({ data: result,color:color })
        }
    })
}) 

router.post('/fetch_color_by_color', function (req, res, next) {
    pool.query('select * from color where colorid=?', [req.body.colorid], function (error, result) {
        if (error) {
            return res.status(500).json({ data: [] })
        }
        else {
            if (result.length > 0) {
                var color = JSON.parse(result[0].color)
                console.log(color)
                return res.status(200).json({ data: color })
            }
            else {
                return res.status(200).json({ data: [] })

            }
        }
    })
})


router.post('/delete_color', function (req, res, next) {
    pool.query('delete from color where colorid=?', [req.body.colorid], function (error, result) {
        if (error) {
            return res.status(500).json({ status: false })
        }
        else {
            return res.status(200).json({ status: true })
        }
    })
})


router.post('/fetch_color_by_size', function (req, res, next) {
    console.log('bodyy',req.body)
    pool.query('select * from color where size=?', [req.body.size], function (error, result) {
        if (error) {
            return res.status(500).json({ data: [] })
        }
        else {
            if (result.length > 0) {
                var color = JSON.parse(result[0].color)
                console.log(color)

                return res.status(200).json({ data: color })
            }
            else {
                return res.status(200).json({ data: [] })

            }
        }
    })
})


module.exports = router;