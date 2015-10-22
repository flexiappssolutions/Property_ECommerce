$(document).ready(function () {
    $('#mailList tfoot th').each(function () {
        var title = $('#mailList thead th').eq($(this).index()).text();
        if (title != "")
            $(this).html('<input type="text" placeholder="Search ' + title + '" />');
    });

    var table = $('#mailList').DataTable({

        "processing": true,

        "ajax": settingsManager.websiteURL + "api/MailTemplateAPI/RetrieveMailTemplates",

        "columns": [
            {
                "className": 'details-control',
                "orderable": false,
                "data": null,
                "defaultContent": ''
            },
            {
                "className": 'edit-control',
                "orderable": false,
                "data": null,
                "defaultContent": ''
            },
            { "data": "Type" },
            { "data": "FromEmailAddress" },
            { "data": "Company" },
            {
                "data": "Username",
                "visible": false
            },
            {
                "data": "Password",
                "visible": false
            },
            {
                "data": "WebsiteUrl",
                "visible": false
            },
            {
                "data": "Footer",
                "visible": false
            },
            {
                "data": "Subject",
                "visible": false
            },
            {
                "data": "Body",
                "visible": false
            },
            {
                "data": "ID",
                "visible": false
            }
        ],

        "order": [[2, "asc"]]
    });

    $('#mailList tbody').on('click', 'td.details-control', function () {
        var tr = $(this).closest('tr');
        var row = table.row(tr);

        function closeAll() {
            var e = $('#mailList tbody tr.shown');
            var rows = table.row(e);
            if (tr != e) {
                e.removeClass('shown');
                rows.child.hide();
            }
        }

        if (row.child.isShown()) {
            closeAll();
        }
        else {
            closeAll();

            row.child(formatDetails(row.data())).show();
            tr.addClass('shown');
        }
    });

    $('#mailList tbody').on('click', 'td.edit-control', function () {
        var tr = $(this).closest('tr');
        var row = table.row(tr);

        function closeAll() {
            var e = $('#mailList tbody tr.shown');
            var rows = table.row(e);
            if (tr != e) {
                e.removeClass('shown');
                rows.child.hide();
            }
        }

        if (row.child.isShown()) {
            closeAll();
        }
        else {
            closeAll();

            row.child(format(row.data())).show();
            tr.addClass('shown');
        }
    });

    $("#mailList tfoot input").on('keyup change', function () {
        table
            .column($(this).parent().index() + ':visible')
            .search(this.value)
            .draw();
    });
});

$(document).ready(function () {
    $('#dataTables-mailList').DataTable({
        responsive: true
    });
});


function formatDetails(d) {
    var table = '<table width="60%" class="cell-border" cellpadding="5" cellspacing="0" border="2" style="padding-left:50px;">';
    table += '<tr>';
    table += '<td style="color:navy;width:30%;font-family:Calibri;font-weight:bold;">Username</td>';
    table += '<td>' + d.Username + '</td>';
    table += '</tr>';
    table += '<tr>';
    table += '<td style="color:navy;width:30%;font-family:Calibri;font-weight:bold;">Password</td>';
    table += '<td>' + d.Password + '</td>';
    table += '</tr>';
    table += '<tr>';
    table += '<td style="color:navy;width:30%;font-family:Calibri;font-weight:bold;">Website Url</td>';
    table += '<td>' + d.WebsiteUrl + '</td>';
    table += '</tr>';
    table += '<tr>';
    table += '<td style="color:navy;width:30%;font-family:Calibri;font-weight:bold;">Footer</td>';
    table += '<td>' + d.Footer + '</td>';
    table += '</tr>';
    table += '<tr>';
    table += '<td style="color:navy;width:30%;font-family:Calibri;font-weight:bold;">Subject</td>';
    table += '<td>' + d.Subject + '</td>';
    table += '</tr>';
    table += '<tr>';
    table += '<td style="color:navy;width:30%;font-family:Calibri;font-weight:bold;">Body</td>';
    table += '<td>' + d.Body + '</td>';
    table += '</tr>';
    table += '</table>';
    return table;
}

function format(d) {
    var table = '<table width="60%" class="cell-border" cellpadding="5" cellspacing="3" border="2" style="padding-left:50px;">';
    table += '<tr>';
    table += '<td style="color:navy;width:30%;font-family:Calibri;font-weight:bold;">From Email Address:</td>';
    table += '<td><input class="form-control" placeholder="Enter From Email Address" id="fromemailaddress" value="' + d.FromEmailAddress + '"/></td>';
    table += '</tr>';
    table += '<tr>';
    table += '<td style="color:navy;width:30%;font-family:Calibri;font-weight:bold;">Company:</td>';
    table += '<td><input class="form-control" placeholder="Enter Company" id="company" value="' + d.Company + '"/></td>';
    table += '</tr>';
    table += '<tr>';
    table += '<td style="color:navy;width:30%;font-family:Calibri;font-weight:bold;">Username:</td>';
    table += '<td><input class="form-control" placeholder="Enter Username" id="username" value="' + d.Username + '"/></td>';
    table += '</tr>';
    table += '<tr>';
    table += '<td style="color:navy;width:30%;font-family:Calibri;font-weight:bold;">Email:</td>';
    table += '<td><input class="form-control" placeholder="Enter Password" id="password" value="' + d.Password + '"/></td>';
    table += '</tr>';
    table += '<tr>';
    table += '<td style="color:navy;width:30%;font-family:Calibri;font-weight:bold;">Website Url:</td>';
    table += '<td><input class="form-control" placeholder="Enter Website Url" id="websiteurl" value="' + d.WebsiteUrl + '"/></td>';
    table += '</tr>';
    table += '<tr>';
    table += '<td style="color:navy;width:30%;font-family:Calibri;font-weight:bold;">Footer:</td>';
    table += '<td><input class="form-control" placeholder="Enter Footer" id="footer" value="' + d.Footer + '"/></td>';
    table += '</tr>';
    table += '<tr>';
    table += '<td style="color:navy;width:30%;font-family:Calibri;font-weight:bold;">Subject:</td>';
    table += '<td><input class="form-control" placeholder="Enter Subject" id="subject" value="' + d.Subject + '"/></td>';
    table += '</tr>';
    table += '<tr>';
    table += '<td style="color:navy;width:30%;font-family:Calibri;font-weight:bold;">Body:</td>';
    table += '<td><input class="form-control" placeholder="Enter Body" id="body" value="' + d.Body + '"/></td>';
    table += '</tr>';
    table += '<tr>';
    table += '<td style="display:none">ID:</td>';
    table += '<td style="display:none"><input class="form-control" id="id" value="' + d.ID + '"/></td>';
    table += '</tr>';
    table += '<tr>';
    table += '<td style="color:navy;width:30%;font-family:Calibri;"></td>';
    table += '<td><button type="button" id="updateBtn" class="btn btn-outline btn-primary" onclick="update();">Update</button></td>';
    table += '</tr>';
    table += '</table>';

    return table;
}

function update() {
    var fromemailaddress = $('#fromemailaddress').val();
    var company = $('#company').val();
    var username = $('#username').val();
    var password = $('#password').val();
    var websiteurl = $('#websiteurl').val();
    var footer = $('#footer').val();
    var subject = $('#subject').val();
    var body = $('#body').val();
    var id = $('#id').val();
    var err = customMailValidation(fromemailaddress, company, username, password, websiteurl, footer, subject, body);
    if (err != "") {
        alert(err);
    } else {
        $("#updateBtn").attr("disabled", "disabled");
        var data = { ID: id, Body: body, Company: company, Footer: footer, FromEmailAddress: fromemailaddress, Password: password, Subject: subject, Username: username, WebsiteUrl: websiteurl };
        $.ajax({
            url: settingsManager.websiteURL + 'api/MailTemplateAPI/UpdateMailTemplate',
            type: 'PUT',
            data: data,
            processData: true,
            async: true,
            cache: false,
            success: function (data) {
                window.location.href = window.location.href;
                alert("Template was updated successfully.");
                $("#updateBtn").removeAttr("disabled");
            },
            error: function (xhr) {
                alert('error');
                $("#updateBtn").removeAttr("disabled");
            }
        });
    }
}