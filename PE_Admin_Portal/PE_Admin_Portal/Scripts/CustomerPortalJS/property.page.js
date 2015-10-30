$(document).ready(function () {
    
    if (localStorage.getItem("TheProperty") === null) {
        
    } else {        
        var theProperty = JSON.parse(window.localStorage.getItem("TheProperty"));
        var images = '';
        $.each(theProperty.PropertyImages, function (key, value) {
            images += '<img alt="image" src="' + value.Image + '" class="media-object" style="height:437px;width:770px;">';
        });
        $('#image_placeholder').html(images);
        $('#property_title').html(theProperty.Title);
        $('#property_number_of_bedrooms').html(theProperty.NumberOfBedrooms);
        $('#property_type').html(theProperty.Type);
        $('#property_date_uploaded').html(theProperty.DateUploaded);
        $('#property_price').html('<img src="../img/naira.png" alt="Naira image"/>' + theProperty.ModifiedPrice);
        $('#property_location').html(theProperty.Location);
        $('#property_description').html(replaceAll(theProperty.Description, "\n", "<br />"));
        $('#customer_message').val('I am interested in ' + theProperty.Title.toLowerCase());
        $('#property_id').val(theProperty.PropertyID);
    }

    $.ajax({
        url: settingsManager.websiteURL + 'api/PropertyAPI/RetrieveSixPropertyImages',
        type: 'GET',
        async: true,
        cache: false,
        success: function (response) {
            updateFlickrImages(response.data);
        },
        error: function (xhr) {
            alert('error');
        }
    });
});

function replaceAll(txt, replace, with_this) {
    return txt.replace(new RegExp(replace, 'g'), with_this);
}

function updateFlickrImages(propertyImages) {
    var imagehtml = '<ul>';
    $.each(propertyImages, function (key, propertyImage) {
        imagehtml += '<li class="pull-left"><img alt="" style="height:70px;width:70px;max-height:70px;max-width:70px; class="media-object" src="' + propertyImage.Image + '"></li>';
    });
    imagehtml += '</ul>';
    $('#flickrImages').html(imagehtml);
}

function sendMessage() {
    var websiteURL = settingsManager.websiteURL;

    var property_id = $('#property_id').val();
    var customer_Name = $('#customer_Name').val();
    var customer_phone_number = $('#customer_phone_number').val();
    var customer_email_address = $('#customer_email_address').val();
    var customer_message = $('#customer_message').val();

    $("#sendBtn").attr("disabled", "disabled");

    var data = { PropertyID: property_id, CustomerName: customer_Name, CustomerPhoneNumber: customer_phone_number, CustomerEmailAddress: customer_email_address, CustomerMessage: customer_message };

    $.ajax({
        url: websiteURL + 'api/MailTemplateAPI/SendPropertyEnquiryMessage',
        type: 'POST',
        data: data,
        processData: true,
        async: true,
        cache: false,
        success: function (response) {            
            alert("Your message was sent successfully and you will be contacted as soon as possible.");
            $('#customer_Name').val('');
            $('#customer_phone_number').val('');
            $('#customer_email_address').val('');            
            $("#sendBtn").removeAttr("disabled");
        },
        error: function (xhr) {
            alert('Error experienced: ' + xhr.responseText);
            $("#sendBtn").removeAttr("disabled");
        }
    });
}

function backToPropertyList() {
    window.location = "../Property/PropertyList";
}