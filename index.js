console.log('ready');

$('.search').submit(function querySearch(e) {
  e.preventDefault();
  userquery();
  petDataArr = [];
  $('#more-pets-info ul li').empty();
  this.reset();
});

function userquery() {
  console.log('userquery ran');
        const searchedVal = $('.js-query').val();
        const genderr = $('input[name=gender]:checked', '.search').val();
        const agepicker = $('#agepicker').val();
        runpetdata(searchedVal, genderr, agepicker, function(response) {
          showMorePets(response);
        });
    }
    
function runpetdata(searchedVal, genderr, agepicker, callback) {
        var url = 'https://api.petfinder.com/pet.find';
        $.ajax({
            url: url,
            jsonp: "callback",
            dataType: "jsonp",
            data: {
                'location': searchedVal,
                key: "a725757f82f2e11cd58dd82805d2716f",
                animal: 'dog',
                output: 'basic',
                format: 'json',
                sex: genderr,
                age: agepicker,
                count: 10,


            },
            // Here is where we handle the response we got back from Petfinder
            success: function(response) {
              console.log('success function ran');
              debugger;
            newpetfunc(response);
            callback(petDataArr);

            }
        });
    }
var petDataArr = [];
function newpetfunc(response) {

  console.log('newPetFunction ran --> created new pet Array');
  for(var i=0; i<10; i++){
     var pet = {
      name: response.petfinder.pets.pet[i].name.$t,
      sex: response.petfinder.pets.pet[i].sex.$t,
      id: response.petfinder.pets.pet[i].id.$t,
      description: response.petfinder.pets.pet[i].description.$t,
      thumbnail: getPicture(i,'pn', response),
     picture: getPicture(i,'x', response)
    } 
    petDataArr.push(pet);
   }
}


function showMorePets(response){
  debugger;
    for(var i=0; i<10; i++){
     var testingImg = document.createElement('img');
  testingImg.src = petDataArr[i].thumbnail;
  $('#more-pets-info ul').append(`<li value= ` + i + ` class="pet-details" >` + petDataArr[i].name  + testingImg.outerHTML + `</li>`);
  }
}

function getPicture(position, size, response) {
   
    if (response.petfinder.pets.pet[position].media.photos !== undefined) {
      var pictureArr = response.petfinder.pets.pet[position].media.photos.photo;
      for (var i = 0; i < pictureArr.length; i++) {
        var picture = pictureArr[i];
          if (picture['@size'] == size) {
            return picture['$t'];
          }
      }
    } else {
         return 'http://laoblogger.com/images/dog-clipart-easy-9.jpg';
    }
}
