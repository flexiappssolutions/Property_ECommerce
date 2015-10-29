$(document).ready(function () {
    var encncryptedPropertyID = getQueryStringValue("eq");
    if (encncryptedPropertyID != "") {
        var data = { PropertyID: encncryptedPropertyID };
        $.ajax({
            url: settingsManager.websiteURL + 'api/MailTemplateAPI/PropertyEnquiry',
            type: 'POST',
            data: data,
            processData: true,
            async: true,
            cache: false,
            success: function (theProperty) {
                var images = '';              
                images += '<img alt="image" src="' + theProperty.PropertyImages[0].Image + '" class="media-object" style="height:437px;width:770px;">';
                $('#image_placeholder').html(images);
                $('#image_placeholder').addClass('cycle-slideshow');
                $('#property_title').html(theProperty.Title);
                $('#property_number_of_bedrooms').html(theProperty.NumberOfBedrooms);
                $('#property_type').html(theProperty.Type);
                $('#property_date_uploaded').html(theProperty.DateUploaded);
                $('#property_price').html('<img src="../img/naira.png" alt="Naira image"/>' + theProperty.ModifiedPrice);
                $('#property_location').html(theProperty.Location);
                $('#property_description').html(replaceAll(theProperty.Description, "\n", "<br />"));                
            },
            error: function (xhr) {
                alert(xhr.responseText);
            }
        });
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

function getQueryStringValue(key) {
    return unescape(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + escape(key).replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));
}