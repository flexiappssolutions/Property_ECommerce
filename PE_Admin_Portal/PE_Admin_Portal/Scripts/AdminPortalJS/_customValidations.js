function propertyValidation(property_title, property_type, property_number_of_bedrooms, property_location, property_price, property_description, images) {
    var err = "";
    var validationErr = "";
    var missingFields = "";
    var errCount = 0;

    if (property_title == "") {
        missingFields += "Title";
        errCount++;
    }
    if (property_type == "") {
        missingFields += missingFields == "" ? "Type" : ", Type";
        errCount++;
    }
    if (property_number_of_bedrooms == "") {
        missingFields += missingFields == "" ? "Number of bedrooms" : ", Number of bedrooms";
        errCount++;
    }
    if (property_location == "") {
        missingFields += missingFields == "" ? "Location" : ", Location";
        errCount++;
    }
    if (property_description == "") {
        missingFields += missingFields == "" ? "Description" : ", Description";
        errCount++;
    }
    if (images.length == 0) {
        missingFields += missingFields == "" ? "Images" : ", Images";
        errCount++;
    }

    if (!validPrice(property_price)) {
        validationErr += "valid Price.";
    }

    if (missingFields != "" && errCount == 1) {
        err = "The field " + missingFields + " is required. ";
    } else if (missingFields != "" && errCount > 1) {
        err = "The following fields " + missingFields + " are required. ";
    }

    if (validationErr != "" && err == "") {
        err = "Enter a " + validationErr;
    } else if (validationErr != "" && err != "") {
        err += "Also enter a " + validationErr;
    }
    return err;
}

function propertyValidation2(property_title, property_type, property_number_of_bedrooms, property_location, property_price, property_description, images, newImages) {
    var err = "";
    var validationErr = "";
    var missingFields = "";
    var errCount = 0;

    if (property_title == "") {
        missingFields += "Title";
        errCount++;
    }
    if (property_type == "") {
        missingFields += missingFields == "" ? "Type" : ", Type";
        errCount++;
    }
    if (property_number_of_bedrooms == "") {
        missingFields += missingFields == "" ? "Number of bedrooms" : ", Number of bedrooms";
        errCount++;
    }
    if (property_location == "") {
        missingFields += missingFields == "" ? "Location" : ", Location";
        errCount++;
    }
    if (property_description == "") {
        missingFields += missingFields == "" ? "Description" : ", Description";
        errCount++;
    }
    if (images.length == 0 && newImages.length == 0) {
        missingFields += missingFields == "" ? "Images" : ", Images";
        errCount++;
    }

    if (!validPrice(property_price)) {
        validationErr += "valid Price.";
    }

    if (missingFields != "" && errCount == 1) {
        err = "The field " + missingFields + " is required. ";
    } else if (missingFields != "" && errCount > 1) {
        err = "The following fields " + missingFields + " are required. ";
    }

    if (validationErr != "" && err == "") {
        err = "Enter a " + validationErr;
    } else if (validationErr != "" && err != "") {
        err += "Also enter a " + validationErr;
    }
    return err;
}


function validPrice(property_price) {
    var err = true;
    if (property_price == "" || property_price == "0" || !/^[0-9]+$/.test(property_price)) {
        err = false;
    }
    return err;
}

function customMailValidation(fromemailaddress, company, username, password, websiteurl, footer, subject, body) {
    var err = "";
    var validationErr = "";
    var missingFields = "";
    var errCount = 0;
    if (company == "") {
        missingFields += "Company";
        errCount++;
    }
    if (username == "") {
        missingFields += missingFields == "" ? "Username" : ", Username";
        errCount++;
    }
    if (fromemailaddress == "") {
        missingFields += missingFields == "" ? "From Email Address" : ", From Email Address";
        errCount++;
    }
    if (password == "") {
        missingFields += missingFields == "" ? "Password" : ", Password";
        errCount++;
    }
    if (websiteurl == "") {
        missingFields += missingFields == "" ? "Website Url" : ", Website Url";
        errCount++;
    }
    if (footer == "") {
        missingFields += missingFields == "" ? "Footer" : ", Footer";
        errCount++;
    }
    if (subject == "") {
        missingFields += missingFields == "" ? "Subject" : ", Subject";
        errCount++;
    }
    if (body == "") {
        missingFields += missingFields == "" ? "Body" : ", Body";
        errCount++;
    }
    if (!validEmail(fromemailaddress) && fromemailaddress != "") {
        validationErr += "valid email";
    }


    if (missingFields != "" && errCount == 1) {
        err = "The field " + missingFields + " is required. ";
    } else if (missingFields != "" && errCount > 1) {
        err = "The following fields " + missingFields + " are required. ";
    }

    if (validationErr != "" && err == "") {
        err = "Enter a " + validationErr;
    } else if (validationErr != "" && err != "") {
        err += "Also enter a " + validationErr;
    }
    return err;
}

function validEmail(email) {
    var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    return re.test(email);
}