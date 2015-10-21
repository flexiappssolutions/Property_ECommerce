$(document).ready(function () {

    $('#properties tfoot th').each(function () {
        var title = $('#properties thead th').eq($(this).index()).text();
        if (title != "")
            $(this).html('<input type="text" placeholder="Search ' + title + '" />');
    });

    var table = $('#properties').DataTable({

        "processing": true,

        "ajax": settingsManager.websiteURL + "api/PropertyAPI/RetrieveAll",

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
            { "data": "Title" },
            { "data": "Type" },
            { "data": "NumberOfBedrooms" },
            { "data": "Location" },
            { "data": "Price" },
            {
                "data": "Description",
                "visible": false
            },
            {
                "data": "PropertyImages",
                "visible": false
            },
            {
                "data": "DateUploaded",
                "visible": false
            },
            {
                "data": "Status",
                "visible": false
            },
            {
                "data": "PropertyID",
                "visible": false
            },
        ],

        "order": [[2, "asc"]],

        "sDom": 'T<"clear">lrtip',

        "oTableTools": {
            "sSwfPath": "../img/copy_csv_xls_pdf.swf",
            "aButtons": [
				{
				    "sExtends": "copy",
				    "sButtonText": "Copy to Clipboard",
				    "oSelectorOpts": { filter: 'applied', order: 'current' }
				},
				{
				    "sExtends": "csv",
				    "sButtonText": "Save to CSV",
				    "oSelectorOpts": { filter: 'applied', order: 'current' }
				},
				{
				    "sExtends": "xls",
				    "sButtonText": "Save for Excel",
				    "oSelectorOpts": { filter: 'applied', order: 'current' }
				}
            ]
        }
    });

    $('#properties tbody').on('click', 'td.details-control', function () {
        var tr = $(this).closest('tr');
        var row = table.row(tr);

        function closeAll() {
            var e = $('#properties tbody tr.shown');
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

            row.child(propertyDetails(row.data())).show();
            tr.addClass('shown');
        }
    });

    $('#properties tbody').on('click', 'td.edit-control', function () {
        var tr = $(this).closest('tr');
        var row = table.row(tr);

        function closeAll() {
            var e = $('#properties tbody tr.shown');
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

            row.child(editProperty(row.data(), roles, branches)).show();
            tr.addClass('shown');
        }
    });

    $("#properties tfoot input").on('keyup change', function () {
        table
            .column($(this).parent().index() + ':visible')
            .search(this.value)
            .draw();
    });
});

$(document).ready(function () {
    $('#dataTables-properties').DataTable({
        responsive: true
    });
});

function propertyDetails(d) {
    var table = '<table width="100%" class="cell-border" cellpadding="5" cellspacing="0" border="2" style="padding-left:50px;">';
    table += '<tr>';
    table += '<td style="color:navy;width:20%;font-family:Calibri;font-weight:bold;">Status</td>';
    table += '<td>' + d.Status + '</td>';
    table += '</tr>';
    table += '<tr>';
    table += '<td style="color:navy;width:20%;font-family:Calibri;font-weight:bold;">Date Uploaded</td>';
    table += '<td>' + d.DateUploaded + '</td>';
    table += '</tr>';
    table += '<tr>';
    table += '<td style="color:navy;width:20%;font-family:Calibri;font-weight:bold;">Description</td>';
    table += '<td>' + d.Description + '</td>';
    table += '</tr>';
    table += '<tr>';
    table += '<td style="color:navy;width:20%;font-family:Calibri;font-weight:bold;">Images</td>';

    var divHtml = '<div>';
    
    $.each(d.PropertyImages, function (key, byte64Image) {
        var imgHtml = '<img src="' + byte64Image + '" style="height:auto;width:auto;max-height:120px;max-width:160px;margin-right:5px;margin-top:10px"/>';
        divHtml += imgHtml;
    });
    
    divHtml += '</div>';

    table += '<td>' + divHtml + '</td>';
    table += '</tr>';   
    table += '</table>';
    return table;
}

function editProperty(d) {
    // `d` is the original data object for the row
    return '<table width="60%" class="cell-border" cellpadding="5" cellspacing="0" border="2" style="padding-left:50px;">' +
        '<tr>' +
            '<td style="color:navy;width:40%;font-family:Calibri;">Function Name:</td>' +
            '<td><input class="form-control" placeholder="Enter Branch Name" id="name" value="' + d.Name + '"/></td>' +
        '</tr>' +
        '<tr>' +
            '<td style="color:navy;width:40%;font-family:Calibri;">Address:</td>' +
            '<td><input class="form-control" placeholder="Enter Branch Address" id="address" value="' + d.Address + '"/></td>' +
        '</tr>' +
        '<tr>' +
            '<td style="display:none">ID:</td>' +
            '<td style="display:none"><input class="form-control" id="id" value="' + d.ID + '"/></td>' +
        '</tr>' +
        '<tr>' +
            '<td style="color:navy;width:40%;font-family:Calibri;"></td>' +
            '<td><button type="button" id="updateBtn" class="btn btn-outline btn-primary" onclick="update();">Update</button></td>' +
        '</tr>' +
    '</table>';
}

function update() {
    var name = $('#name').val();
    var address = $('#address').val();
    var id = $('#id').val();
    var err = customBranchValidation(name, address);
    if (err != "") {
        alert(err);
    } else {
        $("#updateBtn").attr("disabled", "disabled");
        var data = { Name: name, Address: address, ID: id };
        $.ajax({
            url: 'http://loyaltymanagement.azurewebsites.net/api/BranchAPI/UpdateBranch',
            type: 'PUT',
            data: data,
            processData: true,
            async: true,
            cache: false,
            success: function (data) {
                window.location.href = window.location.href;
                alert(data);
                $("#updateBtn").removeAttr("disabled");
            },
            error: function (xhr) {
                alert('error');
                $("#updateBtn").removeAttr("disabled");
            }
        });
    }
}

function customBranchValidation(name, address) {
    var err = "";
    var missingFields = "";
    var errCount = 0;
    if (name == "") {
        missingFields += "Name";
        errCount++;
    }
    if (address == "") {
        missingFields += missingFields == "" ? "Address" : ", Address";
        errCount++;
    }

    if (missingFields != "" && errCount == 1) {
        err = "The field " + missingFields + " is required.";
    } else if (missingFields != "" && errCount > 1) {
        err = "The following fields " + missingFields + " are required.";
    }
    return err;
}