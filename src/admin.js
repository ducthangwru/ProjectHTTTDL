var dataSourceProvince = []
var dataSourceUser = []

$(document).ready(function () {
    let isLogged = localStorage.getItem('loginAdmin')
    if(isLogged == 'true')
    {
        $('#divLogin').fadeOut(500);
        $('#divIndex').fadeIn(800);
    }
    else
    {
        $('#divLogin').fadeIn(500);
        $('#divIndex').fadeOut(500);
        $('#divUsers').fadeOut(500);
        $("#btnLogin").click(function() {
            loginAdmin($("#ipUsername").val(), $("#ipPassword").val(), (data) => {
               if(typeof data.data == 'undefined')
                {
                    alert("Đăng nhập thất bại! Vui lòng kiểm tra lại thông tin")
                }
                else
                {
                    localStorage.setItem("loginAdmin", true)
                    $('#divLogin').fadeOut(500);
                    $('#divIndex').fadeIn(800);
                }
            })
        })
    }

    $('#btnDangXuat').click(function() {
        localStorage.setItem("loginAdmin", false)
        $('#divLogin').fadeIn(500);
        $('#divIndex').fadeOut(500);
        $('#divUsers').fadeOut(500);
    })

    $("#ipPassword , #ipUsername").on("keypress", function(e){
        if (e.which == 13)
            $("#btnLogin").click();
    })

    var tableListProvice = $('#tableListProvince').DataTable({
        "pageLength": 100,
        dom: 'Bfrtip',
        "searching": true,
        select: {
            style: "multi"
        },
        data : dataSourceProvince,
        columns: [
            { title: "" },
            { title: "Tên" },
            { title: "Dân số" },
            {
                title: "Thao tác",
                "render": function (data, type, row, meta) {
                    return `
                    <button class="btn btn-primary" onclick="updateProvince('${row[0]}', '${row[1]}', '${row[2]}')">CẬP NHẬT</button>
                    <button class="btn btn-danger" onclick="viewUsers('${row[0]}', '${row[1]}')">DS TÀI KHOẢN</button`
                }
            },
        ],
        columnDefs: [
            {
                orderable: true,
                "width": "0%",
                "targets": 0,
                "visible": false
            },
            {
                orderable: false,
                "width": "40%",
                "className": "text-center",
                "targets": 1
            },
            {
                orderable: false,
                "width": "30%",
                "className": "text-center",
                "targets": 2
            },
            {
                orderable: false,
                "width": "30%",
                "className": "text-center",
                "targets": 3
            }
        ],
    });

    loadDataProvince();

    function loadDataProvince() {
        getAllProvince((result) => {
            if (result.success) {
                tableListProvice.clear().draw();
                dataSourceProvince = []
    
                for (let i = 0; i < result.data.length; i++) {
                    dataSourceProvince.push([result.data[i].gid, result.data[i].ten, result.data[i].danso])
                }
    
                tableListProvice.rows.add(dataSourceProvince).draw();
            }
            else {
            }
        })
    }
    

    $("#btnUpdateProvince").click(function() {
        updateProvinceX($('#idTinh').text(), $('#ipTenTinh').val(), $('#ipDanSo').val(), (data) => {
            if(data.success)
            {
                alert("Thành công")
                loadDataProvince();
                $('#modalUpdateProvince').modal('hide')
            }
            else 
            {
                alert("Thất bại")
            }
        })
    })
})

var tableListUser = $('#tableListUser').DataTable({
    "pageLength": 100,
    dom: 'Bfrtip',
    "searching": true,
    select: {
        style: "multi"
    },
    data : dataSourceProvince,
    columns: [
        { title: "Tài khoản" },
        { title: "Giới tính" },
        { title: "Năm sinh" },
        {
            title: "Thao tác",
            "render": function (data, type, row, meta) {
                return `
                <button class="btn btn-primary" onclick="updateUser('${row[0]}', '${row[1]}', '${row[2]}')">CẬP NHẬT</button>
                <button class="btn btn-danger" onclick="deleteUser('${row[0]}')">Xóa</button>`
            }
        },
    ],
    columnDefs: [
        {
            orderable: false,
            "width": "25%",
            "className": "text-center",
            "targets": 0
        },
        {
            orderable: false,
            "width": "25%",
            "className": "text-center",
            "targets": 1
        },
        {
            orderable: false,
            "width": "25%",
            "className": "text-center",
            "targets": 2
        },
        {
            orderable: false,
            "width": "25%",
            "className": "text-center",
            "targets": 3
        }
    ],
});

function updateProvince(id, ten, danSo) {
    $('#idTinh').text(id);
    $('#ipTenTinh').val(ten);
    $('#ipDanSo').val(danSo);

    $('#modalUpdateProvince').modal('show')
}

function updateUser(username, birthday, gender) {
    $('#ipUsernamex').val(username);
    $('#slBirthdayx').html('')
    $('#slGenderx').html('')
    for (let i = 1930; i <= 2005; i++) {
        if(birthday == i)
            $('#slBirthdayx').append(`
                <option value="${i}" selected>${i}</option>
            `)
        else 
            $('#slBirthdayx').append(`
                <option value="${i}">${i}</option>
            `)
    }

    $('#slGenderx').append(`
        <option value="1" ${(gender == 1) ? "selected" : ""}>Nam</option>
        <option value="0" ${(gender == 0) ? "selected" : ""}>Nữ</option>
    `)

    $('#modalUpdateUser').modal('show')
}


$("#btnUpdateUser").click(function() {
    updateUserX($('#ipUsernamex').val(), $('#slBirthdayx').val(), $('#slGenderx').val(), (data) => {
        if(data.success)
        {
            alert("Thành công")
            viewUsers($('#idTinhUser').text(), $('#tenTinh').text());
            $('#modalUpdateUser').modal('hide')
        }
        else 
        {
            alert("Thất bại")
        }
    })
})

function deleteUser(username) {
    var r = confirm("Bạn có chắc chắn muốn xóa không?");
    if (r == true) {
       deleteUserX(username, (data) => {
            if(data.success)
            {
                alert("Thành công")
                viewUsers($('#idTinhUser').text(), $('#tenTinh').text());
                $('#modalUpdateUser').modal('hide')
            }
            else 
            {
                alert("Thất bại")
            }
       })
    }
}

function viewUsers(id, ten) {
    getAllUserByIdProvice(id, (result) => {
        if (result.success) {
            tableListUser.clear().draw();
            dataSourceUser = []

            for (let i = 0; i < result.data.length; i++) {
                dataSourceUser.push([
                    result.data[i].username, 
                    result.data[i].birthday, 
                    (result.data[i].gender == 1) ? "Nam" : "Nữ"
                ])
            }

            tableListUser.rows.add(dataSourceUser).draw();
        }
        else {
        }
    })
    $('#h3divUser').text(`DANH SÁCH TÀI KHOẢN ${ten.toUpperCase()}`)
    $('#idTinhUser').text(id);
    $('#tenTinh').text(ten)
    $('#divIndex').fadeOut(500);
    $('#divUsers').fadeIn(800);
}