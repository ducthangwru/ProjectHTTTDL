//File này là viết hàm ajax gọi api đã thiết lập

// Hàm lấy file GeoJSON
function getGeoJSON(callback) {
    let settings = {
        "async": true,
        "crossDomain": true,
        "url": "/geojson",
        "method": "GET"
    }

    $.ajax(settings).done((result) => {
        callback(result)
    }).fail((err) => {
        callback({ success: false, error: "Lỗi kết nối Internet.Vui lòng thử lại" });
    });
}

//Hàm lấy thông tin địa lý khi gửi tọa độ lên
function checkPoint(lat, lng, callback) {
    let settings = {
        "async": true,
        "crossDomain": true,
        "url": `/checkpoint?lat=${lat}&lng=${lng}`,
        "method": "GET"
    }

    $.ajax(settings).done((result) => {
        callback(result)
    }).fail((err) => {
        callback({ success: false, error: "Lỗi kết nối Internet.Vui lòng thử lại" });
    });
}

//Hàm lấy thông tin bầu cử toàn quốc
function checkAll(callback) {
    let settings = {
        "async": true,
        "crossDomain": true,
        "url": `/checkAll`,
        "method": "GET"
    }

    $.ajax(settings).done((result) => {
        callback(result)
    }).fail((err) => {
        callback({ success: false, error: "Lỗi kết nối Internet.Vui lòng thử lại" });
    });
}

//Hàm lấy thông tin địa lý theo id tỉnh
function checkProvince(id, check) {
    return new Promise((resolve, reject) => {
        let settings = {
            "async": true,
            "crossDomain": true,
            "url": `/checkprovince?id=${id}`,
            "method": "GET"
        }
    
        $.ajax(settings).done((result) => {
            if(check) {
                if((result.data.vote1 / (result.data.vote1 + result.data.vote2)) < 0.5)
                    resolve({color: "#d9534f"})
                else if ((result.data.vote1 / (result.data.vote1 + result.data.vote2)) > 0.5)
                    resolve({color: "#5cb85c"})
                else 
                    resolve({color: "#0000ff"})
            } else {
                resolve(result)
            }
        }).fail((err) => {
            reject({ success: false, error: "Lỗi kết nối Internet.Vui lòng thử lại" });
        });
    })
}

function login(username, password, callback) {
    let settings = {
        "async": true,
        "crossDomain": true,
        "url": "/login",
        "method": "POST",
        "headers": {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        "data": {
          "username": username,
          "password": password
        }
    }

    $.ajax(settings)
    .done((result) => {
        callback(result)
    }).fail((err) => {
        callback({success : false, error: "Lỗi kết nối Internet.Vui lòng thử lại" });
    });
}

function getProvinces(callback) {
    let settings = {
        "async": true,
        "crossDomain": true,
        "url": "/getProvinces",
        "method": "GET"
    }

    $.ajax(settings)
    .done((result) => {
        callback(result)
    }).fail((err) => {
        callback({success : false, error: "Lỗi kết nối Internet.Vui lòng thử lại" });
    });
}

function signup(username , password , province, gender, birthday, callback) {
    let settings = {
        "async": true,
        "crossDomain": true,
        "url": "/signup",
        "method": "POST",
        "headers": {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        "data": {
          "username": username,
          "password": password,
          "province": province,
          "gender" : gender,
          "birthday" : birthday
        }
    }

    $.ajax(settings)
    .done((result) => {
        callback(result)
    }).fail((err) => {
        callback({success : false, error: "Lỗi kết nối Internet.Vui lòng thử lại" });
    });
}

function vote(username , vote, callback) {
    let settings = {
        "async": true,
        "crossDomain": true,
        "url": "/vote",
        "method": "POST",
        "headers": {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        "data": {
          "username": username,
          "vote" : vote
        }
    }

    $.ajax(settings)
    .done((result) => {
        callback(result)
    }).fail((err) => {
        callback({success : false, error: "Lỗi kết nối Internet.Vui lòng thử lại" });
    });
}


function chartGenderProvince(id, callback) {
    let settings = {
        "async": true,
        "crossDomain": true,
        "url": `/chartGenderProvince?id=${id}`,
        "method": "GET"
    }

    $.ajax(settings).done((result) => {
        callback(result)
    }).fail((err) => {
        callback({ success: false, error: "Lỗi kết nối Internet.Vui lòng thử lại" });
    });
}

function chartGenderAll(callback) {
    let settings = {
        "async": true,
        "crossDomain": true,
        "url": `/chartGenderAll`,
        "method": "GET"
    }

    $.ajax(settings).done((result) => {
        callback(result)
    }).fail((err) => {
        callback({ success: false, error: "Lỗi kết nối Internet.Vui lòng thử lại" });
    });
}

function loginAdmin(username, password, callback) {
    let settings = {
        "async": true,
        "crossDomain": true,
        "url": "/loginAdmin",
        "method": "POST",
        "headers": {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        "data": {
          "username": username,
          "password": password
        }
    }

    $.ajax(settings)
    .done((result) => {
        callback(result)
    }).fail((err) => {
        callback({success : false, error: "Lỗi kết nối Internet.Vui lòng thử lại" });
    });
}

function getAllProvince(callback) {
    let settings = {
        "async": true,
        "crossDomain": true,
        "url": `/getAllProvince`,
        "method": "GET"
    }

    $.ajax(settings).done((result) => {
        callback(result)
    }).fail((err) => {
        callback({ success: false, error: "Lỗi kết nối Internet.Vui lòng thử lại" });
    });
}

function getAllUserByIdProvice(id, callback) {
    let settings = {
        "async": true,
        "crossDomain": true,
        "url": `/getAllUserByIdProvice?id=${id}`,
        "method": "GET"
    }

    $.ajax(settings).done((result) => {
        callback(result)
    }).fail((err) => {
        callback({ success: false, error: "Lỗi kết nối Internet.Vui lòng thử lại" });
    });
}

function updateUserX(username, birthday, gender, callback) {
    let settings = {
        "async": true,
        "crossDomain": true,
        "url": "/updateUser",
        "method": "POST",
        "headers": {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        "data": {
          "username": username,
          "birthday": birthday,
          "gender" : gender
        }
    }

    $.ajax(settings)
    .done((result) => {
        callback(result)
    }).fail((err) => {
        callback({success : false, error: "Lỗi kết nối Internet.Vui lòng thử lại" });
    });
}

function updateProvinceX(id, ten, danso, callback) {
    let settings = {
        "async": true,
        "crossDomain": true,
        "url": "/updateProvince",
        "method": "POST",
        "headers": {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        "data": {
          "id": id,
          "ten": ten,
          "danso" : danso
        }
    }

    $.ajax(settings)
    .done((result) => {
        callback(result)
    }).fail((err) => {
        callback({success : false, error: "Lỗi kết nối Internet.Vui lòng thử lại" });
    });
}

function deleteUserX(username, callback) {
    let settings = {
        "async": true,
        "crossDomain": true,
        "url": "/deleteUser",
        "method": "POST",
        "headers": {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        "data": {
          "username": username
        }
    }

    $.ajax(settings)
    .done((result) => {
        callback(result)
    }).fail((err) => {
        callback({success : false, error: "Lỗi kết nối Internet.Vui lòng thử lại" });
    });
}