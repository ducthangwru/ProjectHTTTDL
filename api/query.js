const db = require('../utils/connect')

// Hàm lấy query lấy thông tin địa lý theo tọa độ
//callback là hàm trả về data khi đã lấy dữ liệu thành công
function checkPoint(lat, lng, callback) {
    db.query(`SELECT ten, gid, danso, vote1, vote2 FROM vietnam_provinces where st_contains(geom, ST_GeomFromText('POINT(${lng} ${lat})'))`, (err, res) => {
        if(err)
        callback(err, res)
        else
        {
            countVote(res.rows[0].gid, (error, result) => {
                if(error)
                    callback(error, res)
                else
                {
                    res.rows[0].vote1 = parseInt(res.rows[0].vote1) + parseInt(result.rows[0].vote1)
                    res.rows[0].vote2 = parseInt(res.rows[0].vote2) + parseInt(result.rows[0].vote2)
                    console.log(res.rows)
                    callback(error, res)
                }
            })
        }
    })
}

//Hàm lấy thông tin tổng bầu cử toàn quốc
function checkAll(callback) {
    db.query(`select sum(danso) as danso, 
    (sum(vote1) + (select count(vote) from votes where vote = 1)) as vote1, 
    (sum(vote2) + (select count(vote) from votes where vote = 2))as vote2, 
    (sum(danso) - (sum(vote1) + (select count(vote) from votes where vote = 1)) - (sum(vote2) + (select count(vote) from votes where vote = 2))) as chuavote 
    from vietnam_provinces`, (err, res) => {
        callback(err, res)
      })
}

//Hàm lấy thông tin địa lý theo id
function checkProvince(id, callback) {
    db.query(`SELECT ten, gid, danso, vote1, vote2 FROM vietnam_provinces where objectid = ${id}`, (err, res) => {
        if(err)
            callback(err, res)
        else
        {
            countVote(res.rows[0].gid, (error, result) => {
                if(error)
                    callback(err, res)
                else
                {
                    res.rows[0].vote1 = parseInt(res.rows[0].vote1) + parseInt(result.rows[0].vote1)
                    res.rows[0].vote2 = parseInt(res.rows[0].vote2) + parseInt(result.rows[0].vote2)
                    //console.log(res)
                    callback(error, res)
                }
            })
        }
    })
}

function countVote(gid, callback) {
    db.query(`select (select count(vote) from votes join users on users.username = votes.username where users.city = ${gid} and vote = 1) as vote1,
    (select count(vote) from votes join users on users.username = votes.username where users.city = ${gid} and vote = 2) as vote2`,
    (err, res) => {
        callback(err, res)
    })
}


function login(username, password, callback) {	
	db.query(`select users.*, votes.vote, vietnam_provinces.ten from users left join votes on votes.username = users.username join vietnam_provinces on vietnam_provinces.gid = users.city where users.username like '${username}' and users.password like '${password}'`, (err, res) => {
		callback(err, res)
	})
}

function getProvinces(callback) {	
	db.query(`select vietnam_provinces.ten, vietnam_provinces.gid from vietnam_provinces order by vietnam_provinces.name`, (err, res) => {
		callback(err, res)
	})
}

function signup(username, password, province, gender, birthday, callback) {	
	db.query(`insert into users values('${username}','${password}',${province}, ${birthday}, ${gender})`, (err, res) => {
		callback(err, res)
	})
}


function vote(username, vote, callback) {	
    //insert into votes values('${username}',${vote})
    // update votes set vote = ${vote} where username like '${username}'
    db.query(`select * from votes where username like '${username}'`,(err, res) => {
        if(err)
            callback(err, res)
        else 
        {
            if(res.rows.length > 0)
            {
                db.query(`update votes set vote = ${vote} where username like '${username}'`, (err, res) => {
                    callback(err, res)
                })
            }
            else
            {
                db.query(`insert into votes values('${username}',${vote})`, (err, res) => {
                    callback(err, res)
                })
            }
        }
	})
}

function chartGenderProvince(gid, callback) {
    db.query(`select (select count(vote) from votes join users on users.username = votes.username where vote = 1 and city = ${gid} and gender = 1) as NamVote1,
	(select count(vote) from votes join users on users.username = votes.username where vote = 1 and city = ${gid} and gender = 0) as NuVote1,
	(select count(vote) from votes join users on users.username = votes.username where vote = 2 and city = ${gid} and gender = 1) as NamVote2,
    (select count(vote) from votes join users on users.username = votes.username where vote = 2 and city = ${gid} and gender = 0) as NuVote2`,
    (err, res) => {
        callback(err, res)
    })
}

function chartGenderAll(callback) {
    db.query(`select (select count(vote) from votes join users on users.username = votes.username where vote = 1 and gender = 1) as NamVote1,
	(select count(vote) from votes join users on users.username = votes.username where vote = 1 and gender = 0) as NuVote1,
	(select count(vote) from votes join users on users.username = votes.username where vote = 2 and gender = 1) as NamVote2,
    (select count(vote) from votes join users on users.username = votes.username where vote = 2 and gender = 0) as NuVote2`,
    (err, res) => {
        callback(err, res)
    })
}

module.exports = {
    checkPoint, 
    checkAll, 
    checkProvince, 
    login, 
    getProvinces, 
    signup, 
    vote,
    chartGenderProvince,
    chartGenderAll
}