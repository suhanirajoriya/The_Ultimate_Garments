var express = require('express')
var router = express.Router()
var pool = require('./pool')
var upload = require('./multer')

router.post('/add_subcategory', upload.single('icon'), function (req, res, next) {
    console.log(req.body.categoryid)
    console.log(req.body.filename)
    console.log(req.body.subcategory)
    pool.query("insert into sub_category (categoryid, subcategoryname, icon, bannerpriority) values (?,?,?,?)", [req.body.categoryid, req.body.subcategory, req.file.filename,req.body.bannerpriority], function (error, result) {
        if (error) {
            console.log(error)
            return res.status(500).json({ result: false })

        }
        else {

            return res.status(200).json({ result: true })

        }

    })
})

router.get('/display_sub_category', function (req, res, next) {
    pool.query('select SC.*,(select categoryname cn from category C where C.categoryid=SC.categoryid ) as cname from sub_category SC', function (error, result) {
        if (error) {
            console.log(error)
            return res.status(500).json({ data: [] })
        }
        else {
            return res.status(200).json({ data: result })
        }
    })
});

router.post('/edit_subcategory_data', function (req, res, next) {
    console.log('bodyyy',req.body)
    pool.query("update sub_category set categoryid=?,subcategoryname=?, bannerpriority=? where subcategoryid=?",
     [req.body.categoryid, req.body.subcategoryname,req.body.bannerpriority, req.body.subcategoryid], function (error, result) {
        if (error) {

            return res.status(500).json({ status: false })
        }
        else {
            console.log('ress',result)
            return res.status(200).json({ status: true })
        }
    })
})

router.post('/delete_subcategory', function (req, res, next) {
    pool.query('delete from sub_category where subcategoryid=?', [req.body.subcategoryid], function (error, result) {
        if (error) {
            return res.status(500).json({ status: false })
        }
        else {
            return res.status(200).json({ status: true })
        }

    })
})

router.post("/update_icon", upload.single('icon'), function (req, res, next) {
    pool.query('update sub_category set icon=? where subcategoryid=?', [req.file.filename, req.body.subcategoryid], function (error, result) {
        if (error) {
            return res.status(500).json({ status: false })
        }
        else {
            return res.status(200).json({ status: true })
        }
    })

})

router.post("/display_subcategory_by_category", function (req, res, next) {
    console.log('xxxxxxxx  :', req.body)
    pool.query('select SC.*,(select categoryname cn from category C where C.categoryid=SC.categoryid ) as cname from sub_category SC where SC.categoryid=?', [req.body.categoryid], function (error, result) {
        if (error) {
            return res.status(500).json({ data: [] })
        }
        else {
            console.log(result)
            return res.status(200).json({ data: result })
        }
    })
})






module.exports = router;