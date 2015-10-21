var names = [];
var deletedimages = [];
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
            { "data": "ModifiedPrice" },
            {
                "data": "Price",
                "visible": false
            },
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

        "order": [[2, "asc"]] 
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

            row.child(editProperty(row.data())).show();
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
        var imgHtml = '<img src="' + byte64Image.Image + '" style="height:auto;width:auto;max-height:120px;max-width:160px;margin-right:5px;margin-top:10px"/>';
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
    var table = '<table width="100%" class="cell-border" cellpadding="5" cellspacing="3" border="2" style="padding-left:50px;">';
    table += '<tr>';
    table += '<td style="color:navy;width:20%;font-family:Calibri;font-weight:bold;">Title:</td>';
    table += '<td><input class="form-control" placeholder="Title of Property e.g. New 5 bedrooms in Lekki" id="property_title" value="' + d.Title + '"/></td>';
    table += '</tr>';

    table += '<tr>';
    table += '<td style="color:navy;width:20%;font-family:Calibri;font-weight:bold;">Property Type:</td>';
    table += '<td><select class="form-control" id="property_type">';
    table += '<option value="">Select Property Type</option>';
    $.each(PropertyType(), function (key, property_type) {
        if (d.Type == property_type)
            table += '<option selected="selected" value="' + property_type + '">' + property_type + '</option>';
        else
            table += '<option value="' + property_type + '">' + property_type + '</option>';
    });
    table += '</select></td></tr>';

    table += '<tr>';
    table += '<td style="color:navy;width:20%;font-family:Calibri;font-weight:bold;">Number of Bedrooms:</td>';
    table += '<td><select class="form-control" id="property_number_of_bedrooms">';
    table += '<option value="">Select Number of Bedrooms</option>';
    $.each(PropertyNumberOfBeds(), function (key, property_number_of_bedrooms) {
        if (d.NumberOfBedrooms == property_number_of_bedrooms)
            table += '<option selected="selected" value="' + property_number_of_bedrooms + '">' + property_number_of_bedrooms + '</option>';
        else
            table += '<option value="' + property_number_of_bedrooms + '">' + property_number_of_bedrooms + '</option>';
    });
    table += '</select></td></tr>';

    table += '<tr>';
    table += '<td style="color:navy;width:20%;font-family:Calibri;font-weight:bold;">Property Location:</td>';
    table += '<td><select class="form-control" id="property_location">';
    table += '<option value="">Select Location</option>';
    $.each(PropertyLocation(), function (key, property_location) {
        if (d.Location == property_location)
            table += '<option selected="selected" value="' + property_location + '">' + property_location + '</option>';
        else
            table += '<option value="' + property_location + '">' + property_location + '</option>';
    });
    table += '</select></td></tr>';

    table += '<tr>';
    table += '<td style="color:navy;width:20%;font-family:Calibri;font-weight:bold;">Price <img src="../img/naira.png" alt="Naira image"/>:</td>';
    table += '<td><input class="form-control" placeholder="Price of Property" id="property_price" value="' + d.Price + '"/></td>';
    table += '</tr>';

    table += '<tr>';
    table += '<td style="color:navy;width:20%;font-family:Calibri;font-weight:bold;">Property Description:</td>';
    table += '<td><textarea class="form-control" rows="10" placeholder="Detailed Description of the Property" id="property_description">' + d.Description + '</textarea></td>';
    table += '</tr>';
    
    table += '<tr>';
    table += '<td style="color:navy;width:20%;font-family:Calibri;font-weight:bold;">Property Images:</td>';
    table += '<td>';
    table += '<p style="color:red;font-family:Calibri;font-weight:bold;">Note: Maximum image size allowed per upload is 500KB</p>';
    table += '<input type="file" class="form-control" id="property_image_to_load">';
    table += '<button type="button" style="margin-top:10px" class="btn btn-outline btn-info" onclick="loadImageFileAsURL()">Upload New Image</button>';
    table += '<div id="potential_property_images" style="height:auto;width:auto;display:flex;flex-direction: row;flex-wrap: wrap;justify-content: center;align-items: center;">';
    
    $.each(d.PropertyImages, function (key, byte64Image) {
        var divHtml = '<div id="' + byte64Image.ImageID + '" style="height:120px;width:180px;margin-right:5px;margin-top:10px;float:left;display:block;">';
        var imgHtml = '<img src="' + byte64Image.Image + '" name="propert_images" style="height:auto;width:auto;max-height:120px;max-width:160px;"/>';
        imgHtml += '<img src="../img/details_close.png" onclick="removeImage(' + byte64Image.ImageID + ')"/>';
        divHtml += imgHtml + '</div>';
        table += divHtml;       
    });
    table += '</div>';    
    table += '</td></tr>';

    table += '<tr>';
    table += '<td style="display:none;">ID:</td>';
    table += '<td style="display:none;"><input class="form-control" id="id" value="' + d.PropertyID + '"/></td>';
    table += '</tr>';

    table += '<tr>';
    table += '<td style="color:navy;width:20%;font-family:Calibri;"></td>';
    table += '<td><button type="button" id="updateBtn" class="btn btn-outline btn-primary" onclick="update();">Update</button></td>';
    table += '</tr>';
    table += '</table>';

    return table;
}

function removeImage(id) {
    $('#' + id).html('');
    deletedimages.push(id);
}

function loadImageFileAsURL() {

    var filesSelected = document.getElementById("property_image_to_load").files;
    var potential_property_images = document.getElementById("potential_property_images");
    var nameExist = false;

    if (filesSelected.length > 0) {

        var fileToLoad = filesSelected[0];
        if (fileToLoad.type.match("image.*")) {

            var maxFileSize = settingsManager.fileSize;
            var fileSize = fileToLoad.size;

            if (fileSize <= maxFileSize) {

                $('#images').show();
                var filename = fileToLoad.name.replace(/\s/g, "");

                $.each(names, function (key, name) {
                    if (name == filename) {
                        nameExist = true;
                    }
                });

                if (!nameExist) {
                    names.push(filename);

                    var fileReader = new FileReader();
                    fileReader.onload = function (fileLoadedEvent) {
                        var div = document.createElement("div");
                        div.id = filename;
                        div.style.display = "block";
                        div.style.height = "120px";
                        div.style.width = "180px";
                        div.style.marginRight = "5px";
                        div.style.marginTop = "10px";
                        div.style.cssFloat = "left";

                        var imageLoaded = document.createElement("img");
                        imageLoaded.src = fileLoadedEvent.target.result;
                        imageLoaded.style.height = 'auto';
                        imageLoaded.style.width = 'auto';
                        imageLoaded.style.maxHeight = '120px';
                        imageLoaded.style.maxWidth = '160px';
                        imageLoaded.name = "new_property_images";
                        div.appendChild(imageLoaded);

                        var removeImageLoadedIcon = document.createElement("img");
                        removeImageLoadedIcon.src = "../img/details_close.png";
                        removeImageLoadedIcon.onclick = function () {
                            var divToRemove = document.getElementById(filename);
                            div.parentNode.removeChild(div);
                            names.splice(names.indexOf(filename), 1);
                        };

                        div.appendChild(removeImageLoadedIcon);

                        potential_property_images.appendChild(div);
                    };
                    fileReader.readAsDataURL(fileToLoad);
                }
                else
                    noty({ text: 'Selected Image has been uploaded already. Select another image to continue.', layout: 'bottomRight', type: 'warning', timeout: 10000 });
            }
            else {
                noty({ text: 'Property image size is too big. Maximum image size allowed per upload is 500KB. Compress the file and re-upload.', layout: 'bottomRight', type: 'warning', timeout: 10000 });
            }
        } else {
            noty({ text: 'Invalid Property Image Selected. Kindly choose a valid image.', layout: 'bottomRight', type: 'warning', timeout: 10000 });
        }
    } else {
        noty({ text: 'Select a valid image to upload.', layout: 'bottomRight', type: 'warning', timeout: 10000 });
    }
}

function PropertyType() {
    var propertyType = [];
    propertyType.push("House");
    propertyType.push("Flat");
    propertyType.push("Land");
    propertyType.push("Commercial");
    return propertyType;
}

function PropertyNumberOfBeds() {
    var propertyNumberOfBeds = [];
    propertyNumberOfBeds.push("1");
    propertyNumberOfBeds.push("2");
    propertyNumberOfBeds.push("3");
    propertyNumberOfBeds.push("4");
    propertyNumberOfBeds.push("5+");
    return propertyNumberOfBeds;
}

function PropertyLocation() {
    var propertyLocation = [];
    propertyLocation.push("Abia");
    propertyLocation.push("Adamawa");
    propertyLocation.push("Anambra");
    propertyLocation.push("Akwa Ibom");
    propertyLocation.push("Bauchi");
    propertyLocation.push("Bayelsa");
    propertyLocation.push("Benue");
    propertyLocation.push("Borno");
    propertyLocation.push("Cross River");
    propertyLocation.push("Delta");
    propertyLocation.push("Ebonyi");
    propertyLocation.push("Enugu");
    propertyLocation.push("Edo");
    propertyLocation.push("Ekiti");
    propertyLocation.push("Gombe");
    propertyLocation.push("Imo");
    propertyLocation.push("Jigawa");
    propertyLocation.push("Kaduna");
    propertyLocation.push("Kano");
    propertyLocation.push("Katsina");
    propertyLocation.push("Kebbi");
    propertyLocation.push("Kogi");
    propertyLocation.push("Kwara");
    propertyLocation.push("Lagos");
    propertyLocation.push("Nasarawa");
    propertyLocation.push("Niger");
    propertyLocation.push("Ogun");
    propertyLocation.push("Ondo");
    propertyLocation.push("Osun");
    propertyLocation.push("Oyo");
    propertyLocation.push("Plateau");
    propertyLocation.push("Rivers");
    propertyLocation.push("Sokoto");
    propertyLocation.push("Taraba");
    propertyLocation.push("Yobe");
    propertyLocation.push("Zamfara");
    propertyLocation.push("Federal Capital Territory (FCT)");
    return propertyLocation;
}


function update() {    
    var websiteURL = settingsManager.websiteURL;

    var property_id = $('#id').val();
    var property_title = $('#property_title').val();
    var property_type = $('#property_type').val();
    var property_number_of_bedrooms = $('#property_number_of_bedrooms').val();
    var property_location = $('#property_location').val();
    var property_price = $('#property_price').val();
    var property_description = $('#property_description').val();
    var images = document.getElementsByName("new_property_images");
    var oldImages = document.getElementsByName("propert_images");
    var imagesToDelete = deletedimages;

    var err = propertyValidation2(property_title, property_type, property_number_of_bedrooms, property_location, property_price, property_description, oldImages, images);
    if (err != "") {
        noty({ text: err, layout: 'bottomRight', type: 'warning', timeout: 10000 });
    } else {
        $("#updateBtn").attr("disabled", "disabled");
        var property_images = [];
        $.each(images, function (key, image) {
            // console.log(imageSrcToByteArray(image.src));
            property_images.push(image.src.split(',')[1]);
        });

        var data = {PropertyID:property_id, Title: property_title, Type: property_type, NumberOfBedrooms: property_number_of_bedrooms, Location: property_location, Price: property_price, Description: property_description, PropertyImages: property_images, DeletedPropertyImages: imagesToDelete };

        $.ajax({
            url: websiteURL + 'api/PropertyAPI/Update',
            type: 'PUT',
            data: data,
            processData: true,
            async: true,
            cache: false,
            success: function (data) {
                window.location.href = window.location.href;
                alert('Property was updated successfully.');
                $("#updateBtn").removeAttr("disabled");                
                deletedimages = [];
                property_images = [];
                names = [];
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