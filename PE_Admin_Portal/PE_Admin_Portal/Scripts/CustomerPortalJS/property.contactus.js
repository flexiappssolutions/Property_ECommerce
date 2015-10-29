$(document).ready(function () {
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
    
    var customer_Name = $('#customer_Name').val();
    var customer_phone_number = $('#customer_phone_number').val();
    var customer_email_address = $('#customer_email_address').val();
    var customer_message = $('#customer_message').val();

    $("#sendBtn").attr("disabled", "disabled");

    var data = { CustomerName: customer_Name, CustomerPhoneNumber: customer_phone_number, CustomerEmailAddress: customer_email_address, CustomerMessage: customer_message };

    $.ajax({
        url: websiteURL + 'api/MailTemplateAPI/SendEnquiryMessage',
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
            $('#customer_message').val('');
            $("#sendBtn").removeAttr("disabled");
        },
        error: function (xhr) {
            alert('Error experienced: ' + xhr.responseText);
            $("#sendBtn").removeAttr("disabled");
        }
    });
}