$(document).ready(function () {
    $('#images').hide();
});

var names = [];
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
                        imageLoaded.name = "propert_images";
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


function saveProperty() {

    var websiteURL = settingsManager.websiteURL;

    var property_title = $('#property_title').val();
    var property_type = $('#property_type').val();
    var property_number_of_bedrooms = $('#property_number_of_bedrooms').val();
    var property_location = $('#property_location').val();
    var property_price = $('#property_price').val();
    var property_description = $('#property_description').val();
    var images = document.getElementsByName("propert_images");
    
    var err = propertyValidation(property_title, property_type, property_number_of_bedrooms, property_location, property_price, property_description, images);
    if (err != "") {
        noty({ text: err, layout: 'bottomRight', type: 'warning', timeout: 10000 });
    } else {
        $("#updateBtn").attr("disabled", "disabled");
        var property_images = [];
        $.each(images, function (key, image) {            
            property_images.push(image.src.split(',')[1]);
        });        

        var data = { Title: property_title, Type: property_type, NumberOfBedrooms: property_number_of_bedrooms, Location: property_location, Price: property_price, Description: property_description, PropertyImages: property_images };

        $.ajax({
            url: websiteURL + 'api/PropertyAPI/Save',
            type: 'POST',
            data: data,
            processData: true,
            async: true,
            cache: false,
            success: function (data) {
                noty({ text: 'Property was saved successfully.', layout: 'bottomRight', type: 'success', timeout: 10000 });
                $('#property_title').val("");
                $('#property_type').val("");
                $('#property_number_of_bedrooms').val("");
                $('#property_location').val("");
                $('#property_price').val("");
                $('#property_description').val("");
                $("#updateBtn").removeAttr("disabled");
                $("#potential_property_images").html('');
                property_images = [];
                names = [];
                $('#price').html('');
            },
            error: function (xhr) {
                noty({ text: 'Error experienced: ' + xhr.responseText, layout: 'bottomRight', type: 'warning', timeout: 10000 });
                $("#updateBtn").removeAttr("disabled");
            }
        });
    }   
}

function displayPrice() {
    var property_price = $('#property_price').val();
    if (property_price.indexOf(",") <= -1) {
        $('#price').html(addCommas(property_price));
    } else {
        $('#property_price').val(property_price.replace(/\,$/, ''));
    }
}

function addCommas(str) {
    var parts = (str + "").split("."),
        main = parts[0],
        len = main.length,
        output = "",
        i = len - 1;

    while (i >= 0) {
        output = main.charAt(i) + output;
        if ((len - i) % 3 === 0 && i > 0) {
            output = "," + output;
        }
        --i;
    }
    // put decimal part back
    if (parts.length > 1) {
        output += "." + parts[1];
    }
    return output;
}
