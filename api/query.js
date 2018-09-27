const db = require('../utils/connect')

function checkPoint(lat, lng, callback) {
    db.query(`SELECT name FROM vietnam_provinces where st_contains(geom, ST_GeomFromText('POINT(${lng} ${lat})'))`, (err, res) => {
        console.log(err)
        callback(err, res)
      })
}

module.exports = {checkPoint}