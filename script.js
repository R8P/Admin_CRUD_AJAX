$(document).ready(function () {

    getUsers()

    $("#newUser").on("click", function (e) {
        $("#firstForm").toggle()
    })
    //Delete Icon
    $('body').on('click', '.deleteTut', function () {
        deleteUsers($(this).data("tutid"))
    })
    //Edit Icon
    $('body').on('click', '.editTut', function () {
        getOneUser($(this).data("tutid"))
    })
    //Submit Button
    $("#submitButton").on("click", function (e) {
        e.preventDefault()

        let data = {
            firstName: $($("#firstForm")[0].fname).val(),
            lastName: $($("#firstForm")[0].lname).val(),
            email: $($("#firstForm")[0].email).val(),
            avatar: $($("#firstForm")[0].avatar).val()

        }
        postUsers(data)
        $("#firstForm").trigger("reset")
        $("#firstForm").toggle();
    })
    //Update Button
    $("#updateButton").on("click", function (e) {
        e.preventDefault();
        let data = {
            firstName: $($("#updateForm")[0].updateFname).val(),
            lastName: $($("#updateForm")[0].updateLname).val(),
            email: $($("#updateForm")[0].updateEmail).val(),
            avatar: $($("#updateForm")[0].updateAvatar).val()
        }
        putUsers($($("#updateForm")[0].tutId).val(), data)
        getOneUser($(this).data("tutid"))

        $("#updateForm").trigger("reset")
        $("#updateForm").toggle();
    })
})


//USERS LIST
function getUsers() {
    $('#tbody').html('')
    $.ajax({
        url: "https://reqres.in/api/users?per_page=12",
        method: ('GET'),
        dataType: 'json',
        data: {},
        success: function (response) {
            $.each(response.data, function (i, item) {
                $('#tbody').append("<tr data-dId='" + item.id + "'><th scope='row'>" + item.id + " </th><td>" + item.email + "</td><td id='fname'>" + item.first_name + "<button type='button' class='btn btn-primary' data-toggle='modal' data-target='#exampleModalCenter' onClick='userDetail("+item.id+")'>Details</button></td><td>" + item.last_name + "</td><td><a href='"+item.avatar+"' target='_blank'><img src="+ item.avatar +"></a></td><td><i class='far fa-edit editTut' data-tutid='" + item.id + "'></i></td><td><i class='fas fa-trash deleteTut' data-tutid='" + item.id + "''></i></td></tr>")
            })
        }
    })
}
//USER DETAIL MODAL
function userDetail(userid) {
    $.ajax({
        url: "https://reqres.in/api/users/" + userid,
        method: 'GET',
        dataType: 'json',
        success: function (response) {
            console.log(response);
            $("span#detailName").text(response.ad.company)
            $("span#detailUrl").text(response.ad.url)
            $("span#detailText").text(response.ad.text)
            $("span#detailEmail").text(response.data.email)
        }
    })
}

//SINGLE USER
function getOneUser(id) {
    $.ajax({
        url: 'https://reqres.in/api/users/' + id,
        method: 'GET',
        dataType: 'json',
        success: function (response) {
            $($("#updateForm")[0].tutId).val(response.data.id)
            $($("#updateForm")[0].updateFname).val(response.data.first_name)
            $($("#updateForm")[0].updateLname).val(response.data.last_name)
            $($("#updateForm")[0].updateEmail).val(response.data.email)
            $($("#updateForm")[0].updateAvatar).val(response.data.avatar)
            $("#updateForm").show()
        }
    });
}
//ADD USERS
function postUsers(data) {
    $.ajax({
        url: "https://reqres.in/api/users",
        method: ('POST'),
        dataType: 'json',
        data: data,
        success: function (response) {
            $('#userTable > tbody:last-child').append("<tr data-dId='" + response.id + "'><th scope='row'>" + response.id + " </th><td>" + response.email + "</td><td id='fname'>" + response.firstName + "</td><td>" + response.lastName + "</td><td><img onclick='window.open(" + response.avatar + ",'_blank');' src='" + response.avatar + "'></td><td><i class='far fa-edit editTut' data-tutid='" + response.id + "'></i></td><td><i class='fas fa-trash deleteTut' data-tutid='" + response.id + "''></i></td></tr>")


            console.log(response)
        }
    })
}

//UPDATE USERS
function putUsers(id, data) {
    $.ajax({
        url: 'https://reqres.in/api/users/' + id,
        method: 'PUT',
        dataType: 'json',
        data: data,
        success: function (response) {
            console.log(response);
            $("tr[data-did='"+id+"'] > td[id='fname']")[0].innerHTML = response.firstName + '<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter" onClick="userDetail('+id+')">Details</button>'
        }
    })
}
//DELETE USER
function deleteUsers(id) {
    $.ajax({
        url: 'https://reqres.in/api/users/' + id,
        method: 'DELETE',
        dataType: 'json',
        success: function (response) {
            console.log(response);
        }
    })
    $("tr[data-dId='" + id + "']").remove()
}







