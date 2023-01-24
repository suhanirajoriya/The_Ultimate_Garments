var express = require('express')
var router = express.Router()
var pool = require('./pool')
var upload = require('./multer')

router.post('/add_new_product', upload.single('icon'), function (req, res, next) {
    pool.query('insert into product (categoryid, subcategoryid, productname, price, offer_price, stock, description, rating, status, sale_status, icon) values (?,?,?,?,?,?,?,?,?,?,?)',
        [req.body.categoryid, req.body.subcategoryid, req.body.productname, req.body.price, req.body.offer_price, req.body.stock, req.body.description, req.body.rating, req.body.status, req.body.sale_status, req.file.filename], function (error, result) {
            if (error) {
                console.log("ddddddddddddddddd", error)

                return res.status(500).json({ status: false })
            }
            else {
                return res.status(200).json({ status: true })
            }
        })
})

router.get('/display_product', function (req, res, next) {
    pool.query('select P.*,(select categoryname from category C where C.categoryid=P.categoryid) as cname, (select subcategoryname from sub_category S where S.subcategoryid = P.subcategoryid) as sname from product P', function (error, result) {
        if (error) {
            console.log(error)
            return res.status(500).json({ data: [] })
        }
        else {
            return res.status(200).json({ data: result })
        }
    })
})

router.post('/update_product', function (req, res, next) {
    console.log('xxxx', req.body)
    pool.query("update product set categoryid=?, subcategoryid=?, productname=?, price=?, offer_price=?, stock=?, description=?, rating=?, status=?, sale_status=? where productid=?",
        [req.body.categoryid, req.body.subcategoryid, req.body.product, req.body.price, req.body.offerprice, req.body.stock, req.body.description, req.body.rating, req.body.status, req.body.salestatus, req.body.productid], function (error, result) {
            if (error) {

                return res.status(500).json({ status: false })

            }
            else {

                return res.status(200).json({ status: true })
            }
        })
})

router.post('/delete_product', function (req, res, next) {
    pool.query("delete from product where productid=?", [req.body.productid], function (error, result) {
        if (error) {
            return res.status(500).json({ status: false })
        }
        else {
            return res.status(200).json({ status: true })
        }
    })
})

router.post('/update_icon', upload.single('icon'), function (req, res, next) {
    console.log('Icon', req.body.productid)
    console.log('Icon', req.file.filename)

    pool.query("update product set icon=? where productid=?", [req.file.filename, req.body.productid], function (error, result) {
        if (error) {
            console.log(error)
            return res.status(500).json({ status: false })
        }
        else {
            return res.status(200).json({ status: true })
        }
    })
})

router.post('/fetch_product_by_subcategory', function (req, res, next) {
    pool.query("select P.*,(select categoryname from category C where C.categoryid=P.categoryid) as cname, (select subcategoryname from sub_category S where S.subcategoryid = P.subcategoryid) as sname from product P where P.subcategoryid=?", [req.body.subcategoryid], function (error, result) {
        if (error) {
            return res.status(500).json({ data: [] })
        }
        else {
            return res.status(200).json({ data: result })
        }
    })
})


router.post('/add_product_images', upload.any(), function (req, res, next) {

    var banners = []
    req.files.map((item, index) => {
        banners.push(item.filename)
    })
    console.log(req.body)
    console.log(JSON.stringify(banners))

    pool.query('insert into productmultipleimages (categoryid, subcategoryid, productid,bannerimages) values (?,?,?,?)',
        [req.body.categoryid, req.body.subcategoryid, req.body.productid, JSON.stringify(banners)], function (error, result) {
            if (error) {
console.log(error)
                return res.status(500).json({ status: false })
            }

            else {
                console.log(result)
                return res.status(200).json({ status: true })
            }
        })
})


module.exports = router;