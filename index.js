'use strict';

console.log('ready');


$('.search').submit(function querySearch(e) {
	e.preventDefault();
	userQuery();
	petDataArr = [];
	$('#more-pets-info ul li').empty();
	this.reset();
});


function userQuery() {
	console.log('userQuery ran');

	const searchedVal = $('.js-query').val();

	const genderr = $('input[name=gender]:checked', '.search').val();

	const agepicker = $('#agepicker').val();

	runPetData(searchedVal, genderr, agepicker, function (response) {
		showMorePets(response);
	});
}


function runPetData(searchedVal, genderr, agepicker, callback) {


	let url = `https://cors-anywhere.herokuapp.com/https://api.petfinder.com/pet.find?key=a725757f82f2e11cd58dd82805d2716f&animal=dog&location=${searchedVal}&age=${agepicker}&output=full&format=json`

	console.log(url)

	fetch(url)
		.then(response => {
			if (response.ok) {
				return response.json()
			}
			throw new Error(response.statusText)
		})
		.then(petFinderJson => {
			console.log(petFinderJson.petfinder.pets.pet)
			newPetFunc(petFinderJson);
			callback(petDataArr);

		})
		.catch((err) => {
			console.log(err)
		})
}

var petDataArr = [];


function newPetFunc(response) {

	console.log('newPetFunction ran --> created new pet Array');

	for (var i = 0; i < 10; i++) {

		var pet = {
			name: response.petfinder.pets.pet[i].name.$t,

			id: response.petfinder.pets.pet[i].id.$t,
			description: response.petfinder.pets.pet[i].description.$t,
			thumbnail: getPicture(i, 'pn', response),
			picture: getPicture(i, 'x', response)
		}

		petDataArr.push(pet);
	}
}


function showMorePets(response) {

	for (var i = 0; i < 10; i++) {

		var testingImg = document.createElement('img');
		testingImg.src = petDataArr[i].thumbnail;

		$('#more-pets-info ul').append(`<li value= ` + i + ` class="pet-details" >` + petDataArr[i].name + testingImg.outerHTML + `</li>`);
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
