var propertyDetails = [];

$(document).ready(function () {
    $('#loadingWrapper').addClass('wobblebar-loader');
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

    $.ajax({
        url: settingsManager.websiteURL + 'api/PropertyAPI/RetrieveTwelvePropertyDetails',
        type: 'GET',
        async: true,
        cache: false,
        success: function (response) {
            propertyDetails = response.data;
            updateTiles();
        },
        error: function (xhr) {
            alert('error');
        }
    });
});

function updateTiles() {
    
    if (propertyDetails.length <= 6)
    {
        var divToRemove = document.getElementById('showCarousel');
        divToRemove.parentNode.removeChild(divToRemove);
    }        

    var activeCarousel = '';
    var passiveCarousel = '';

    for (var i = 0; i < propertyDetails.length; i++) {

        var html = '';
        html += '<li class="span4 box-container" style="box-shadow: 10px 10px 5px #888888;">';
        html += '<div class="holder">';
        html += '<a class="overlay" title="property title" href="#">';
        html += '<span class="more"></span>';
        html += '<img alt="image" src="' + propertyDetails[i].PropertyImages[0].Image + '" class="media-object" style="height:210px;width:365px;border-style: solid;border-width: medium;border-color: black;">';
        html += '</a>';       
        html += '<div class="prop-info">';

        var title = '';
        if (propertyDetails[i].Title.length > 35) {
            title = propertyDetails[i].Title.substring(0, 34) + '...';
        } else
            title = propertyDetails[i].Title;
            
        html += '<a style="text-decoration: underline;cursor:pointer;" onclick="displayProperty(' + i + ')"><h3 class="prop-title" style="font-family:Calibri;font-size:16px;font-weight:bold;color:green;text-align:center;">' + title + '</h3></a>';
        html += '<ul class="more-info clearfix">';        
        html += '<li class="info-label clearfix" style="margin-left:20px;margin-right:20px;" ><span class="pull-left">Beds:</span> <span class="qty pull-right">' + propertyDetails[i].NumberOfBedrooms + '</span></li>';
        html += '<li class="info-label clearfix" style="margin-left:20px;margin-right:20px;"><span class="pull-left">Type:</span> <span class="qty pull-right">' + propertyDetails[i].Type + '</span></li>';
        html += '<li class="info-label clearfix" style="margin-left:20px;margin-right:20px;"><span class="pull-left">Price :</span> <span class="qty pull-right"> <img src="img/naira.png" alt="Naira image"/>' + propertyDetails[i].ModifiedPrice + '</span></li>';
        html += '<br/></ul>';
        html += '</div>';
        html += '</div>';
        html += '</li>';

        if (i <= 5)
            activeCarousel += html;
        else
            passiveCarousel += html;

    }

    $('#ulActive').html(activeCarousel);    
    if (passiveCarousel == "") {        
        var divToRemove = document.getElementById('divPassive');
        divToRemove.parentNode.removeChild(divToRemove);
    }
    else
        $('#ulPassive').html(passiveCarousel);

    $('#loadingWrapper').removeClass('wobblebar-loader');
}

function displayProperty(propertyID) {
    var property = propertyDetails[propertyID];
    if (localStorage.getItem("TheProperty") === null) {
        window.localStorage.removeItem("TheProperty");
    }
    window.localStorage.setItem("TheProperty", JSON.stringify(property));
    window.location = "Property/PropertyPage";
}

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
       
        var data = { Type: property_type, NumberOfBedrooms: property_number_of_bedrooms, Location: property_location, PriceFrom: property_price_from, PriceTo: property_price_to};

        $.ajax({
            url: websiteURL + 'api/PropertyAPI/Search',
            type: 'POST',
            data: data,
            processData: true,
            async: true,
            cache: false,
            success: function (response) {
                var propertyDetails = response.data;
                if (localStorage.getItem("PropertyDetails") === null) {
                    window.localStorage.removeItem("PropertyDetails");
                }
                window.localStorage.setItem("PropertyDetails", JSON.stringify(propertyDetails));
                window.location = "Property/PropertyList";
            },
            error: function (xhr) {
                alert('Error experienced: ' + xhr.responseText);
                $("#searchBtn").removeAttr("disabled");
            }
        });
    }
}