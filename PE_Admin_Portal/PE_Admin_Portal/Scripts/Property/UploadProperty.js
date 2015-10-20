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

                $.each(names, function (key, name) {                    
                    if (name == fileToLoad.name) {
                        nameExist = true;                                                
                    }
                });
                
                if (!nameExist) {
                    names.push(fileToLoad.name);

                    var filename = fileToLoad.name.replace(/\s/g, "");
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
                        removeImageLoadedIcon.src = "../../img/details_close.png";
                        removeImageLoadedIcon.onclick = function () {
                            var divToRemove = document.getElementById(filename);
                            div.parentNode.removeChild(div);
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
    var images = document.getElementsByName("propert_images");

    if (images.length == 0) {
        noty({ text: 'No property image selected.', layout: 'bottomRight', type: 'warning', timeout: 10000 });
    } else {
        $.each(images, function (key, image) {
            console.log(image.src);
        });
    }
}