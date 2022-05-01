//Displays the original image after being uploaded
function displayOriginalImage(event) {
  if (event.files.length != 0) {
    if (checkFileName(event.files[0].name)) {
      document.getElementById("inputImage").src = window.URL.createObjectURL(event.files[0]);
      document.getElementById("originalImage").style.display = "initial";
      document.getElementById("transformation").style.display = "initial";
      document.getElementById("result").style.display = "none";
    }
  }
}

//Makes sure the uploaded file is a png or jpg image 
function checkFileName(fileName) {
  if (fileName == "") {
    alert("Browse to upload a valid File with png or jpg extension");
    return false;
  }
  else if (fileName.split(".")[1].toUpperCase() == "PNG" || fileName.split(".")[1].toUpperCase() == "JPG")
    return true;
  else {
    alert("File with " + fileName.split(".")[1] + " is invalid. Upload a valid file with png or jpg extensions");
    return false;
  }
}

//Displays the corresponding form to the selected transformation and hides the other forms
function showTransformForm() {
  const increaseBrightnessForm = document.getElementById("increaseBrightnessForm");
  const decreaseBrightnessForm = document.getElementById("decreaseBrightnessForm");
  
  const increaseContrastForm = document.getElementById("increaseContrastForm");
  const decreaseContrastForm = document.getElementById("decreaseContrastForm");



  //Write your code here for the other forms

  const mylist = document.getElementById("myList");

  //Storing the type chosen in a variable
  transformType = mylist.options[mylist.selectedIndex].text;

  //Displaying to the user the type he chose by changing the text element of id= transformType to the selected type
  document.getElementById("transformType").value = mylist.options[mylist.selectedIndex].text;

  if (transformType == "Increase Brightness") {
    document.getElementById("increaseBrightnessInputs").style.display = "initial";
    document.getElementById("decreaseBrightnessInputs").style.display = "none";
    document.getElementById("increaseContrastInputs").style.display = "none";
    document.getElementById("decreaseContrastInputs").style.display = "none";

  } 
  
  else if (transformType == "Decrease Brightness") {
    document.getElementById("increaseBrightnessInputs").style.display = "none";
    document.getElementById("decreaseBrightnessInputs").style.display = "initial";
    document.getElementById("increaseContrastInputs").style.display = "none";
    document.getElementById("decreaseContrastInputs").style.display = "none";
  } 
  
  else if (transformType == "Increase Contrast") {
    document.getElementById("increaseBrightnessInputs").style.display = "none";
    document.getElementById("decreaseBrightnessInputs").style.display = "none";
    document.getElementById("increaseContrastInputs").style.display = "initial";
    document.getElementById("decreaseContrastInputs").style.display = "none";

  } 
  
  else if (transformType == "Decrease Contrast") {
    document.getElementById("increaseBrightnessInputs").style.display = "none";
    document.getElementById("decreaseBrightnessInputs").style.display = "none";
    document.getElementById("increaseContrastInputs").style.display = "none";
    document.getElementById("decreaseContrastInputs").style.display = "initial";

  } 

  else if (transformType == "Inverse") { 
    document.getElementById("increaseBrightnessInputs").style.display = "none";
    document.getElementById("decreaseBrightnessInputs").style.display = "none";
    document.getElementById("increaseContrastInputs").style.display = "none";
    document.getElementById("decreaseContrastInputs").style.display = "none"; 
    Inverse(); 
  }

  // Listener to the event of submiting the increase brightness form
  increaseBrightnessForm.addEventListener("submit", (e) => {
    e.preventDefault()
    var ib = document.getElementById("ib").value
    increaseBrightness(Number(ib))
  });

  // Listener to the event of submiting the decrease brightness form
  decreaseBrightnessForm.addEventListener("submit", (e) => {
    e.preventDefault()
    var ip = document.getElementById("ip").value
    decreaseBrightness(Number(ip))
  }); 

    // Listener to the event of submiting the increase contrast form
    increaseContrastForm.addEventListener("submit", (e) => {
      e.preventDefault()
      var obdi = document.getElementById("obdi").value
      var odbi = document.getElementById("odbi").value
      var tbdi = document.getElementById("tbdi").value
      var tdbi = document.getElementById("tdbi").value


      increaseContrast(obdi,odbi,tbdi,tdbi)
    });
  
    // Listener to the event of submiting the decrease contrast form
    decreaseContrastForm.addEventListener("submit", (e) => {
      e.preventDefault()
      var obdd = document.getElementById("obdd").value
      var odbd = document.getElementById("odbd").value
      var tbdd = document.getElementById("tbdd").value
      var tdbd = document.getElementById("tdbd").value
      decreaseContrast(obdd,odbd,tbdd,tdbd)
    }); 


  //Write your code here for EventListeners for the other forms using the constants you will create in the transform function


  //Applies pixel-wise transformations to increase brightness
  function increaseBrightness(ib) {
    const img = document.getElementById("inputImage");
    const canvas = document.getElementById("resultImage");
    const ctx = canvas.getContext('2d');

    var transformedImage = [];
    var val;

    //Images are displayed in the RGBA format so a greyscale pixel could look like (25,25,25,255)
    rgba = getRGBAValues(img, canvas, ctx);

    for (i = 0; i < img.width * img.height * 4; i += 4) {
      val = rgba[i] + ib;
      if (val > 255) {
        val = 255;
      }
      transformedImage.push(val, val, val, rgba[i + 3]);
    }

    displayResultImage(img, transformedImage, ctx);

  }

  //Write your code here for three more functions for the other transformations


    //Applies pixel-wise transformations to decrease brightness
    function decreaseBrightness(ip) {
       const img = document.getElementById("inputImage");
      const canvas = document.getElementById("resultImage");
      const ctx = canvas.getContext('2d');
  
      var transformedImage = [];
      var val;
  
      //Images are displayed in the RGBA format so a greyscale pixel could look like (25,25,25,255)
      rgba = getRGBAValues(img, canvas, ctx);
  
      for (i = 0; i < img.width * img.height * 4; i += 4) {
        val = rgba[i] - ip;
        if (val < 0) {
          val = 0;
        }
        transformedImage.push(val, val, val, rgba[i + 3]);
      }
  
      displayResultImage(img, transformedImage, ctx);
  
    }

      //Applies pixel-wise transformations to increase contrast
  function increaseContrast(obdi,odbi,tbdi,tdbi) {
    const img = document.getElementById("inputImage");
    const canvas = document.getElementById("resultImage");
    const ctx = canvas.getContext('2d');

    var transformedImage = [];
    var val;

var line1Slope=tbdi/obdi

var line2X=odbi-obdi
var line2Y=tdbi-tbdi
var line2Slope=line2Y/line2X
var line2C=tbdi-(line2Slope*obdi)

var line3X=255-odbi
var line3Y=255-tdbi
var line3Slope=line3Y/line3X
var line3C=tdbi-(line3Slope*odbi)


    //Images are displayed in the RGBA format so a greyscale pixel could look like (25,25,25,255)
    rgba = getRGBAValues(img, canvas, ctx);

    for (i = 0; i < img.width * img.height * 4; i += 4) {


      if(rgba[i]<obdi && rgba[i]>=0){
        val=(line1Slope*rgba[i])
      }
      else if(rgba[i]>=obdi && rgba[i]<odbi){
        val=(line2Slope*rgba[i])+line2C
      }
      else if(rgba[i]>=odbi && rgba[i]<=255){
        val=(line3Slope*rgba[i])+line3C
      }
      
      
      val = Math.round(val)

      transformedImage.push(val, val, val, rgba[i + 3]);
    }

    displayResultImage(img, transformedImage, ctx);

  }

  function decreaseContrast(obdd,odbd,tbdd,tdbd) {


    const img = document.getElementById("inputImage");
    const canvas = document.getElementById("resultImage");
    const ctx = canvas.getContext('2d');

    var transformedImage = [];
    var val;

var line1Slope=tbdd/obdd

var line2X=odbd-obdd
var line2Y=tdbd-tbdd
var line2Slope=line2Y/line2X
var line2C=tbdd-(line2Slope*obdd)

var line3X=255-odbd
var line3Y=255-tdbd
var line3Slope=line3Y/line3X
var line3C=tdbd-(line3Slope*odbd)


    //Images are displayed in the RGBA format so a greyscale pixel could look like (25,25,25,255)
    rgba = getRGBAValues(img, canvas, ctx);

    for (i = 0; i < img.width * img.height * 4; i += 4) {


      if(rgba[i]<=obdd && rgba[i]>0){
        val=(line1Slope*rgba[i])
      }
      else if(rgba[i]>=obdd && rgba[i]<odbd){
        val=(line2Slope*rgba[i])+line2C
      }
      else if(rgba[i]>=odbd && rgba[i]<=255){
        val=(line3Slope*rgba[i])+line3C
      }
      
      val = Math.round(val)
      console.log("old::",rgba[i]," new::",val); 
      transformedImage.push(val, val, val, rgba[i + 3]);
    }

    displayResultImage(img, transformedImage, ctx);



    /*
    const img = document.getElementById("inputImage");
    const canvas = document.getElementById("resultImage");
    const ctx = canvas.getContext('2d');

    var transformedImage = [];
    var val;

var line1Slope=tbdd/obdd

var line2X=odbd-obdd
var line2Y=tdbd-tbdd
var line2Slope=line2Y/line2X
var line2C=tbdd-(line2Slope*obdd)


var line3X=255-odbd
var line3Y=255-tdbd
var line3Slope=line3Y/line3X
var line3C=tdbd-(line3Slope*odbd)



    //Images are displayed in the RGBA format so a greyscale pixel could look like (25,25,25,255)
    rgba = getRGBAValues(img, canvas, ctx);

    for (i = 0; i < img.width * img.height * 4; i += 4) {


      if(rgba[i]<obdi){
        val=(line1Slope*rgba[i])

      }
      else if(rgba[i]>obdi && rgba[i]<odbi){
        val=(line2Slope*rgba[i])+line2C
      }
      else if(rgba[i]>odbi && rgba[i]<=255){
        val=(line3Slope*rgba[i])+line3C
      }
      
      transformedImage.push(val, val, val, rgba[i + 3]);

    }

    displayResultImage(img, transformedImage, ctx);

*/
  }


    //Applies pixel-wise transformations to invert
    function Inverse() {
     const img = document.getElementById("inputImage");
     const canvas = document.getElementById("resultImage");
     const ctx = canvas.getContext('2d');
 
     var transformedImage = [];
     var val;
 
     //Images are displayed in the RGBA format so a greyscale pixel could look like (25,25,25,255)
     rgba = getRGBAValues(img, canvas, ctx);
 
     for (i = 0; i < img.width * img.height * 4; i += 4) {
       val = 255-rgba[i];
       
       transformedImage.push(val, val, val, rgba[i + 3]);
     }
 
     displayResultImage(img, transformedImage, ctx);
 
   }


  //Extracts rgba 1D array of all the pixels in the original image
  function getRGBAValues(img, canvas, ctx) {
    canvas.width = img.width;
    canvas.height = img.height;

    ctx.drawImage(img, 0, 0);

    var rgba = ctx.getImageData(
      0, 0, img.width, img.height
    ).data;
    return rgba;
  }

  //Displays the transformed image
  function displayResultImage(img, transformedImage, ctx) {
    //Get a pointer to the current location in the image.
    var palette = ctx.getImageData(0, 0, img.width, img.height); //x,y,w,h
    //Wrap your array as a Uint8ClampedArray
    palette.data.set(new Uint8ClampedArray(transformedImage)); // assuming values 0..255, RGBA, pre-mult.
    //Repost the data.
    ctx.putImageData(palette, 0, 0);
    document.getElementById("result").style.display = "initial";
  }

 

}
