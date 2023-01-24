var express = require('express')
var router = express.Router()
var pool = require('./pool')
var upload = require('./multer')

router.post('/add_new_category', upload.single ('icon'), function (req, res, next) {
    console.log(req.body.categoryname)
    console.log(req.file.filename)
    pool.query("insert into category (categoryname,icon) values (?,?)", [req.body.categoryname, req.file.filename], function (error, result) {
        if (error) {
            console.log(error)
            return res.status(500).json({ result: false })
        }
        else {
            return res.status(200).json({ result: true })
        }

    })

})

router.get('/display_all_category', function (req, res, next) {
    pool.query("select * from category", function (error, result) {
        if (error) {
            console.log(error)
            return res.status(500).json({ data: [] })
        }
        else {
            return res.status(200).json({ data: result })
        }

    })

})
router.post('/edit_category_data', function (req, res, next) {
    pool.query("update category set categoryname=? where categoryid=?", [req.body.categoryname, req.body.categoryid],
        function (error, result) {

            if (error) {
                console.log("ERRRORR:", error)

                return res.status(500).json({ status: false })
            }
            else {

                console.log("RESULT:", result)
                return res.status(200).json({ status: true })
            }
        })
})


router.post('/delete_category_data', function (req, res, next) {
    console.log(req.body.categoryname)
    console.log(req.body.categoryid)
    pool.query("delete from category where categoryid=?", [req.body.categoryid],
        function (error, result) {

            if (error) {
                return res.status(500).json({ status: false })
            }
            else {

                console.log("RESULT:", result)
                return res.status(200).json({ status: true })
            }
        })
})

router.post('/update_icon', upload.single('icon'), function (req, res, next) {
    pool.query("update category set icon=? where categoryid=? ", [req.file.filename, req.body.categoryid], function (error, result) {
        if (error) {
            return res.status(500).json({ status: false })
        }
        else {
            return res.status(200).json({ status: true })
        }

    })

})

router.post('/add_banner_images', upload.any(), function (req, res, next) {
    console.log(req.files)
    var banners = []
    req.files.map((item) => {
        banners.push(item.filename)
    })
    console.log(JSON.stringify(banners))
    pool.query("insert into banners (bannerimages) values (?)", [JSON.stringify(banners)], function (error, result) {
        if (error) {
            console.log(error)
            return res.status(500).json({ result: false })
        }
        else {
            return res.status(200).json({ result: true })
        }

    })

})

router.get('/display_all_banner', function (req, res, next) {
    pool.query("select * from banners", function (error, result) {
        if (error) {
            console.log(error)
            return res.status(500).json({ data: [] })
        }
        else {
            var bimg = JSON.parse(result[0].bannerimages)
            console.log('cccccccccccc', bimg)
            console.log(result)

            return res.status(200).json({ data: bimg })
        }

    })

})

module.exports = router;