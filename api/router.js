var express = require('express')
var query = require('./query')
var router = express.Router()

//Tạo api nếu gửi lên phương thức get localhost:8888/checkpoint?lat=?lng=?
router.get('/checkpoint', async (req, res) => {
    let lat = req.query.lat
    let lng = req.query.lng

    //gọi hàm từ file query.js
    query.checkPoint(lat, lng, (err, data) => {
        //nếu lỗi trả về lỗi
        if(err)
            res.json({success: false, error : err})
        //thành công thì trả về data
        else
        {
            res.json({
                success: true,
                data: data.rows[0]
            })
        }
    })
})


//Tạo api nếu gửi lên phương thức get localhost:8888/checkAll
router.get('/checkAll', async (req, res) => {
    query.checkAll((err, data) => {
        if(err)
            res.json({success: false, error : err})
        else
        {
            res.json({
                success: true,
                data: data.rows[0]
            })
        }
    })
})


//Tạo api nếu gửi lên phương thức get localhost:8888/checkprovince?id=?
router.get('/checkprovince', async (req, res) => {
    let id = req.query.id

    query.checkProvince(id, (err, data) => {
        if(err)
            res.json({success: false, error : err})
        else
        {
            res.json({
                success: true,
                data: data.rows[0]
            })
        }
    })
})


module.exports = router;
