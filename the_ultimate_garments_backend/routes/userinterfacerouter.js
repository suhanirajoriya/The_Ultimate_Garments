var express = require('express')
var router = express.Router()
var pool = require('./pool')
var upload = require('./multer')


router.get('/display_all_category', function (req, res, next) {
    pool.query("select * from category", function (error, result) {
        if (error) {
            console.log('Errorrr', error)
            return res.status(500).json({ data: [] })
        }
        else {
            return res.status(200).json({ data: result })
        }

    })

});

router.post("/display_subcategory_by_category", function (req, res, next) {
    console.log('xxxxxxxx  :', req.body)
    pool.query('select * from sub_category where categoryid=?', [req.body.categoryid], function (error, result) {
        if (error) {
            return res.status(500).json({ data: [] })
        }
        else {
            return res.status(200).json({ data: result })
        }
    })
});

router.post('/display_productimg_by_trending', function (req, res, next) {
    pool.query('select P.*,(select categoryname from category C where C.categoryid=P.categoryid) as cname, (select subcategoryname from sub_category S where S.subcategoryid = P.subcategoryid) as sname from product P where sale_status=? ', [req.body.status], function (error, result) {
        if (error) {
            console.log(error)
            return res.status(500).json({ data: [] })
        }
        else {
            return res.status(200).json({ data: result })
        }
    })
});


router.post('/display_productimg_by_popular', function (req, res, next) {
    pool.query('select P.*,(select categoryname from category C where C.categoryid=P.categoryid) as cname, (select subcategoryname from sub_category S where S.subcategoryid = P.subcategoryid) as sname from product P where sale_status=? ', [req.body.status], function (error, result) {
        if (error) {
            console.log(error)
            return res.status(500).json({ data: [] })
        }
        else {
            return res.status(200).json({ data: result })
        }
    })
});

router.post('/display_subcategory_by_priority', function (req, res, next) {
    pool.query('select * from sub_category where bannerpriority=?', [req.body.priority], function (error, result) {
        if (error) {
            console.log(error)
            return res.status(500).json({ data: [] })
        }
        else {
            return res.status(200).json({ data: result })
        }
    })
});



router.post('/display_subcategory_by_priority_2', function (req, res, next) {
    pool.query('select * from sub_category where bannerpriority=?', [req.body.priority], function (error, result) {
        if (error) {
            console.log(error)
            return res.status(500).json({ data: [] })
        }
        else {
            return res.status(200).json({ data: result })
        }
    })
});


router.post('/display_subcategory_by_3', function (req, res, next) {
    pool.query('select * from sub_category where bannerpriority=? ', [req.body.priority], function (error, result) {
        if (error) {
            console.log(error)
            return res.status(500).json({ data: [] })
        }
        else {
            return res.status(200).json({ data: result })
        }
    })
});


router.post('/display_subcategory_by_4', function (req, res, next) {
    pool.query('select * from sub_category where bannerpriority=? ', [req.body.priority], function (error, result) {
        if (error) {
            console.log(error)
            return res.status(500).json({ data: [] })
        }
        else {
            return res.status(200).json({ data: result })

        }
    })
});

router.post('/fetch_products_by_subcategory', function (req, res, next) {
    pool.query('select P.*,(select categoryname from category C where C.categoryid=P.categoryid) as cname, (select subcategoryname from sub_category S where S.subcategoryid = P.subcategoryid) as sname from product P where P.subcategoryid=? ', [req.body.subcategoryid], function (error, result) {
        if (error) {
            console.log(error)
            return res.status(500).json({ data: [] })
        }
        else {
            return res.status(200).json({ data: result })
        }
    })
});



router.post('/fetch_size_by_product', function (req, res, next) {
    console.log(req.body)
    pool.query('select * from color where productid=?', [req.body.productid], function (error, result) {
        if (error) {

            return res.status(500).json({ data: [] })
        }
        else {
            console.log('bg', result)
            return res.status(200).json({ data: result })


        }
    })

})


router.post('/fetch_color_by_size_and_productid', function (req, res, next) {
    console.log('bodyy', req.body)
    pool.query('select * from color where size=? and productid=?', [req.body.size, req.body.productid], function (error, result) {
        if (error) {
            return res.status(500).json({ data: [] })
        }
        else {



            return res.status(200).json({ data: result })


        }
    })
})


router.post('/fetch_all_productimg', function (req, res, next) {
    console.log('bodyy', req.body)
    pool.query('select * from productmultipleimages where  productid=?', [req.body.productid], function (error, result) {
        if (error) {
            console.log(error)
            return res.status(500).json({ data: [] })
        }
        else {



            return res.status(200).json({ data: result })


        }
    })
})


module.exports = router;