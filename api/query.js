const db = require('../utils/connect')

// Hàm lấy query lấy thông tin địa lý theo tọa độ
//callback là hàm trả về data khi đã lấy dữ liệu thành công
function checkPoint(lat, lng, callback) {
    db.query(`SELECT ten, gid, danso, vote1, vote2 FROM vietnam_provinces where st_contains(geom, ST_GeomFromText('POINT(${lng} ${lat})'))`, (err, res) => {
        callback(err, res)
      })
}

//Hàm lấy thông tin tổng bầu cử toàn quốc
function checkAll(callback) {
    db.query(`select sum(danso) as danso, sum(vote1) as vote1, sum(vote2) as vote2, (sum(danso) - sum(vote1) -sum(vote2)) as chuavote from vietnam_provinces`, (err, res) => {
        callback(err, res)
      })
}

//Hàm lấy thông tin địa lý theo id
function checkProvince(id, callback) {
    db.query(`SELECT ten, gid, danso, vote1, vote2 FROM vietnam_provinces where objectid = ${id}`, (err, res) => {
        callback(err, res)
      })
}


function login(username, password, callback) {	
	db.query(`select * from users where username like '${username}' and password like '${password}'`, (err, res) => {
		callback(err, res)
	})
}

function getProvinces(callback) {	
	db.query(`select vietnam_provinces.ten, vietnam_provinces.gid from vietnam_provinces order by vietnam_provinces.name asc`, (err, res) => {
		callback(err, res)
	})
}

function signup(username, password, province, gender, birthday, callback) {	
	db.query(`insert into users values('${username}','${password}',${province}, ${gender}, ${birthday})`, (err, res) => {
		callback(err, res)
	})
}


function vote(username, vote, callback) {	
	db.query(`insert into votes values('${username}',${vote})`, (err, res) => {
		callback(err, res)
	})
}

function updateVote(username, vote, callback) {	
	db.query(`update votes set vote = ${vote} where username like '${username}'`, (err, res) => {
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
    updateVote
}