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

function searchProperty() {
    var websiteURL = settingsManager.websiteURL;

    var property_type = $('#property_type').val();
    var property_number_of_bedrooms = $('#property_number_of_bedrooms').val();
    var property_location = $('#property_location').val();
    var property_price_from = $('#property_price_from').val();
    var property_price_to = $('#property_price_to').val();

    if (property_location == "") {
        alert('Select the location of properties you want to search for.');
    } else {
        $("#searchBtn").attr("disabled", "disabled");

        var data = { Type: property_type, NumberOfBedrooms: property_number_of_bedrooms, Location: property_location, PriceFrom: property_price_from, PriceTo: property_price_to };

        $.ajax({
            url: websiteURL + 'api/PropertyAPI/Search',
            type: 'POST',
            data: data,
            processData: true,
            async: true,
            cache: false,
            success: function (response) {
                var propertyDetails = response.data;
                if (propertyDetails.length > 0) {
                    if (localStorage.getItem("PropertyDetails") === null) {
                        window.localStorage.removeItem("PropertyDetails");
                    }
                    window.localStorage.setItem("PropertyDetails", JSON.stringify(propertyDetails));
                }
                window.location = "../Property/PropertyList";
            },
            error: function (xhr) {
                alert('Error experienced: ' + xhr.responseText);
                $("#searchBtn").removeAttr("disabled");
            }
        });
    }
}