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

router.post('/login', async(req, res) => {
    console.log(req.body)
    let username = req.body.username
    let password = req.body.password

    query.login(username, password, (err, data) => {
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

router.post('/loginAdmin', async(req, res) => {
    let username = req.body.username
    let password = req.body.password

    query.loginAdmin(username, password, (err, data) => {
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

// lấy dữ liệu các tỉnh thành 
router.get('/getProvinces', async(req, res) => {
    query.getProvinces((err, data) => {
        if(err)
            res.json({success: false, error : err})
        else
        {
            res.json({
                success: true,
                data: data.rows
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

// Đăng ký
router.post('/signup', async(req, res) => {
    let username = req.body.username
    let password = req.body.password
    let province = req.body.province
    let gender = req.body.gender
    let birthday = req.body.birthday

    query.signup(username , password , province, gender, birthday, (err, data) => {
        if(err)
        {
            res.json({success: false, error : err})
        }
        else
        {
            res.json({
                success: true,
                data: data
            })
        }
    })
})

// Vote
router.post('/vote', async(req, res) => {
    let username = req.body.username
    let vote = req.body.vote

    query.vote(username, vote, (err, data) => {
        if(err)
            res.json({success: false, error : err})
        else
        {
            res.json({
                success: true
            })
        }
    })
})

router.get('/chartGenderProvince', async (req, res) => {
    let id = req.query.id

    query.chartGenderProvince(id, (err, data) => {
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

router.get('/chartGenderAll', async (req, res) => {
    query.chartGenderAll((err, data) => {
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

router.get('/getAllProvince', async (req, res) => {
    query.getAllProvince((err, data) => {
        if(err)
            res.json({success: false, error : err})
        else
        {
            res.json({
                success: true,
                data: data.rows
            })
        }
    })
})

router.get('/getAllUserByIdProvice', async (req, res) => {
    query.getAllUserByIdProvice(req.query.id, (err, data) => {
        if(err)
            res.json({success: false, error : err})
        else
        {
            res.json({
                success: true,
                data: data.rows
            })
        }
    })
})

router.post('/updateUser', async(req, res) => {
    let username = req.body.username
    let birthday = req.body.birthday
    let gender = req.body.gender

    query.updateUser(username, birthday, gender, (err, data) => {
        if(err)
            res.json({success: false, error : err})
        else
        {
            res.json({
                success: true
            })
        }
    })
})

router.post('/updateProvince', async(req, res) => {
    let id = req.body.id
    let ten = req.body.ten
    let danso = req.body.danso

    query.updateProvince(id, ten, danso, (err, data) => {
        if(err)
            res.json({success: false, error : err})
        else
        {
            res.json({
                success: true
            })
        }
    })
})

router.post('/deleteUser', async(req, res) => {
    let username = req.body.username

    query.deleteUser(username, (err, data) => {
        if(err)
            res.json({success: false, error : err})
        else
        {
            res.json({
                success: true
            })
        }
    })
})

module.exports = router;
