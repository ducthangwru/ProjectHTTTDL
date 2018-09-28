const db = require('../utils/connect')

function checkPoint(lat, lng, callback) {
    db.query(`SELECT ten, gid, danso, vote1, vote2 FROM vietnam_provinces where st_contains(geom, ST_GeomFromText('POINT(${lng} ${lat})'))`, (err, res) => {
        callback(err, res)
      })
}

function checkAll(callback) {
    db.query(`select sum(danso) as danso, sum(vote1) as vote1, sum(vote2) as vote2, (sum(danso) - sum(vote1) -sum(vote2)) as chuavote from vietnam_provinces`, (err, res) => {
        callback(err, res)
      })
}

function checkProvince(id, callback) {
    db.query(`SELECT ten, gid, danso, vote1, vote2 FROM vietnam_provinces where objectid = ${id}`, (err, res) => {
        callback(err, res)
      })
}


module.exports = {checkPoint, checkAll, checkProvince}