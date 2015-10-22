function LoginIn() {

    var username = $('#username').val();
    var password = $('#password').val();

    var err = customLoginValidation(username, password);
    if (err != "") {
        alert(err);
    } else {

        $("#updateBtn").attr("disabled", "disabled");

        var data = { Username: username, Password: password };
        $.ajax({
            url: settingsManager.websiteURL + 'api/UserAPI/AuthenticateUser',
            type: 'POST',
            data: data,
            processData: true,
            async: true,
            cache: false,
            success: function (data) {
                //Remove local storages if they exist before adding new ones
                if (window.localStorage.removeItem("loggedInUsername") != null)
                    window.localStorage.removeItem("loggedInUsername");

                if (window.localStorage.removeItem("loggedInUserID") != null)
                    window.localStorage.removeItem("loggedInUserID");

                //Add new local storages
                window.localStorage.setItem("loggedInUsername", data.Username);
                window.localStorage.setItem("loggedInUserID", data.ID);

                window.location = ("Home/Dashboard");

                $("#updateBtn").removeAttr("disabled");
            },
            error: function (xhr) {                
                alert(xhr.responseText);
                $("#updateBtn").removeAttr("disabled");
            }
        });
    }
}

function customLoginValidation(username, password) {
    var err = "";
    var missingFields = "";
    var errCount = 0;
    if (username == "") {
        missingFields += "Username";
        errCount++;
    }
    if (password == "") {
        missingFields += missingFields == "" ? "Password" : ", Password";
        errCount++;
    }

    if (missingFields != "" && errCount == 1) {
        err = "The field " + missingFields + " is required.";
    } else if (missingFields != "" && errCount > 1) {
        err = "The following fields " + missingFields + " are required.";
    }
    return err;
}