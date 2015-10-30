var propertyDetails = [];
var current_page = 1;
var records_per_page = settingsManager.recordsPerPage;

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
    
    $('#div_property_header_2').hide();
    $('#pager').hide();
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

    if (localStorage.getItem("PropertyDetails") === null) {
        $('#property_header').html('Recently Added Properties');
        displayRecentProperties();
    } else {
        $('#property_header').html('Your Latest Property Search');
        propertyDetails = JSON.parse(window.localStorage.getItem("PropertyDetails"));
        updateTiles(1);
    }
    $('#pager').show();
});

function updateFlickrImages(propertyImages) {
    var imagehtml = '<ul>';
    $.each(propertyImages, function (key, propertyImage) {
        imagehtml += '<li class="pull-left"><img alt="" style="height:70px;width:70px;max-height:70px;max-width:70px; class="media-object" src="' + propertyImage.Image + '"></li>';
    });
    imagehtml += '</ul>';
    $('#flickrImages').html(imagehtml);
}

function displayProperty(propertyID) {
    var property = propertyDetails[propertyID];
    if (localStorage.getItem("TheProperty") === null) {
        window.localStorage.removeItem("TheProperty");
    }
    window.localStorage.setItem("TheProperty", JSON.stringify(property));
    window.location = "../Property/PropertyPage";
}

function updateTiles(page) {
    $('#properties').html('');

    var btn_next = document.getElementById("btn_next");
    var btn_prev = document.getElementById("btn_prev");
    var listing_table = document.getElementById("listingTable");
    var page_span = document.getElementById("page");

    // Validate page
    if (page < 1) page = 1;
    if (page > numPages()) page = numPages();   
    var html = '';
    for (var i = (page - 1) * records_per_page; i < (page * records_per_page) ; i++) { 
        if (i < propertyDetails.length) {
            html += '<div class="span8 box-container" style="border-style: solid;border-width: medium;border-color: green;">'

            html += '<div class="holder row" style="display:flex;flex-direction: row;flex-wrap: wrap;justify-content: center;align-items: center;">';

            html += '<a class="span4 overlay" title="property title">';

            html += '<span class="more"></span>';

            html += '<img alt="image" src="' + propertyDetails[i].PropertyImages[0].Image + '" class="media-object" style="height:210px;width:370px;max-height:210px;max-width:370px;float:left;margin-left:15px;border-style: solid;border-width: medium;border-color: black;box-shadow: 10px 10px 5px #888888;">';

            html += '</a>';

            html += '<div class="span4 prop-info" style="float:right;">';

            html += '<a style="text-decoration: underline;cursor:pointer;" onclick="displayProperty(' + i + ')"><h3 class="prop-title" style="font-family:Calibri;font-size:16px;font-weight:bold;color:green;text-align:center;">' + propertyDetails[i].Title + '</h3></a>';

            html += '<ul class="more-info clearfix">';

            html += '<li class="info-label clearfix" style="margin-left:20px;margin-right:20px;" ><span class="pull-left">Location:</span> <span class="qty pull-right">' + propertyDetails[i].Location + '</span></li>';

            html += '<li class="info-label clearfix" style="margin-left:20px;margin-right:20px;" ><span class="pull-left">Beds:</span> <span class="qty pull-right">' + propertyDetails[i].NumberOfBedrooms + '</span></li>';

            html += '<li class="info-label clearfix" style="margin-left:20px;margin-right:20px;"><span class="pull-left">Type:</span> <span class="qty pull-right">' + propertyDetails[i].Type + '</span></li>';

            html += '<li class="info-label clearfix" style="margin-left:20px;margin-right:20px;"><span class="pull-left">Price :</span> <span class="qty pull-right"> <img src="../img/naira.png" alt="Naira image"/>' + propertyDetails[i].ModifiedPrice + '</span></li>';

            html += '<li class="info-label clearfix" style="margin-left:20px;margin-right:20px;"><span class="pull-left"><img src="../img/facebookshare.png" style="max-width:120px;max-height:100px;height:auto;width:auto;" alt="Share on facebook image" onclick="shareOnFacebook(' + i + ')"/></span> <span class="qty pull-right"><img src="../img/instagramshare.png" style="max-width:40px;max-height:40px;height:auto;width:auto;" alt="Share on Instagram image"/></span></li>';
            html += '<br/></ul>';
            html += '</div>';
            html += '</div>';
            html += '</div>';
        }
    }

    $('#properties').html(html);

    page_span.innerHTML = page;

    if (page == 1) {
        btn_prev.style.visibility = "hidden";
    } else {
        btn_prev.style.visibility = "visible";
    }

    if (page == numPages()) {
        btn_next.style.visibility = "hidden";
    } else {
        btn_next.style.visibility = "visible";
    }
}

function prevPage() {
    if (current_page > 1) {
        current_page--;
        updateTiles(current_page);
    }
}

function nextPage() {
    if (current_page < numPages()) {
        current_page++;
        updateTiles(current_page);
    }
}

function numPages() {    
    return Math.ceil(propertyDetails.length / records_per_page);
}

function shareOnFacebook(propertyID) {
    try{
        var property = propertyDetails[propertyID];
    
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

function replaceAll(txt, replace, with_this) {
    return txt.replace(new RegExp(replace, 'g'), with_this);
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
                propertyDetails = [];
                propertyDetails = response.data;
                if (propertyDetails.length > 0) {
                    if (localStorage.getItem("PropertyDetails") != null) {
                        window.localStorage.removeItem("PropertyDetails");
                    }
                    window.localStorage.setItem("PropertyDetails", JSON.stringify(propertyDetails));
                    $('#div_property_header_2').hide();
                    $('#property_header').html('Your Latest Property Search');
                    updateTiles(1);
                } else {
                    window.localStorage.removeItem("PropertyDetails");
                    alert("No Results found for your search.");
                    $('#property_header').html('No Results found for your search.');
                    $('#div_property_header_2').show();
                    displayRecentProperties();
                }
                $("#searchBtn").removeAttr("disabled");
            },
            error: function (xhr) {
                alerty('Error experienced: ' + xhr.responseText);
                $("#searchBtn").removeAttr("disabled");
            }
        });
    }
}

function displayRecentProperties()
{
    $.ajax({
        url: settingsManager.websiteURL + 'api/PropertyAPI/RetrieveTwelvePropertyDetails',
        type: 'GET',
        async: true,
        cache: false,
        success: function (response) {
            propertyDetails = [];
            propertyDetails = response.data;
            updateTiles(1);
        },
        error: function (xhr) {
            alert('error' + xhr.responseText);
        }
    });
}