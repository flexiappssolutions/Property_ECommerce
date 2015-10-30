window.fbAsyncInit = function () {
    FB.init({
        appId: '499523293543149',
        xfbml: true,
        version: 'v2.5'
    });
};

(function (d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) { return; }
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

$(document).ready(function () {
    
    if (localStorage.getItem("TheProperty") === null) {
        window.location = "../";
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
        $('#facebook_placeholder').html('<img src="../img/facebookshare.png" style="max-width:120px;max-height:100px;height:auto;width:auto;" alt="Share on facebook image" onclick="shareOnFacebook()"/>');       
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

function shareOnFacebook() {
    try {
        var property = JSON.parse(window.localStorage.getItem("TheProperty"));

        FB.ui({
            method: 'share',
            href: 'https://www.google.co.uk',
            name: 'Home 4 You Properties',
            caption: property.Title,
            description: property.Description,
            message: 'Property for sale on Home 4 You ' + settingsManager.websiteURL
        },
        function (response) {
            if (response && !response.error_message) {
                alert('Posting completed.');
            } else {
                alert('Posting not completed.');
            }
        });
    }
    catch (err) {
        if (err.indexOf("FB is") > -1)
            alert("Kindly refresh this page and try again.");
        else
            alert(err);
    }
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