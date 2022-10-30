#!/usr/bin/node
const list = [];
const listIds = [];
const nameCities = [];
const idCities = [];
const idStates = [];
const nameStates = [];
$(document).ready(function () {
  let startCheck = $('.amenities input:checkbox');
  startCheck.each(function (index, input) {
    const product = $(input);
    if (product.is(':checked')) {
      listEdit($(this).data('name'), $(this).data('id'), 0);
      const list2 = list.slice(0, 3);
      $('.amenities h4').text(list2.join());
      console.log('Amenities', list);
    }
  });
  startCheck = $('.states input:checkbox');
  startCheck.each(function (index, input) {
    const product = $(input);
    if (product.is(':checked')) {
      stateEdit($(this).data('name'), $(this).data('id'), 0);
      const list2 = nameStates.slice(0, 3);
      $('.locations h4').text(list2.join());
      console.log('States', nameStates);
    }
  });
  startCheck = $('.cities input:checkbox');
  startCheck.each(function (index, input) {
    const product = $(input);
    if (product.is(':checked')) {
      cityEdit($(this).data('name'), $(this).data('id'), 0);
      console.log('City', nameCities);
    }
  });
  $.get('http://0.0.0.0:5001/api/v1/status/', (data) => {
    if (data.status === 'OK') {
      $('#api_status').addClass('available');
    } else $('#api_status').removeClass('available');
  });
  placesFetch({});

  $('.amenities input:checkbox').change(function () {
    if ($(this).is(':checked')) {
      console.log('checked');
      listEdit($(this).data('name'), $(this).data('id'), 0);
      const list2 = list.slice(0, 3);
      $('.amenities h4').text(list2.join());
      console.log(list);
    } else {
      console.log('unchecked');
      listEdit($(this).data('name'), $(this).data('id'), 1);
      const list2 = list.slice(0, 3);
      $('.amenities h4').text(list2.join());
      console.log(list);
    }
  });
  $('.states input:checkbox').change(function () {
    if ($(this).is(':checked')) {
      console.log('states checked');
      stateEdit($(this).data('name'), $(this).data('id'), 0);
      const list2 = nameStates.slice(0, 3);
      $('.locations h4').text(list2.join());
    } else {
      console.log('unchecked');
      stateEdit($(this).data('name'), $(this).data('id'), 1);
      const list2 = nameStates.slice(0, 3);
      $('.locations h4').text(list2.join());
    }
  });
  $('.cities input:checkbox').change(function () {
    if ($(this).is(':checked')) {
      console.log('cities checked');
      cityEdit($(this).data('name'), $(this).data('id'), 0);
    } else {
      console.log(' cities unchecked');
      cityEdit($(this).data('name'), $(this).data('id'), 1);
    }
  });
  $('button').click(function () {
    const data = {};
    if (nameCities.length > 0) data.cities = idCities;
    if (nameStates.length > 0) data.states = idStates;
    if (listIds.length > 0) data.amenities = listIds;
    console.log(data);
    const section = $('.places');
    section.empty();
    placesFetch(data);
  });
});

function listEdit (amenity, id, type) {
  const z = list.indexOf(amenity);
  if (z < 0 && type === 0) {
    list.push(amenity);
    listIds.push(id);
  } else if (z >= 0 && type === 1) {
    list.splice(z, 1);
    listIds.splice(z, 1);
  }
  console.log(listIds);
}
function placesInsert (response) {
  console.log(response);
  $.each(response, function (index, place) {
    const section = $('.places');
    const $article = $('<article>');
    const $titlebox = $('<div>', { class: 'title_box' });
    $titlebox.append($('<h2>').text(place.name));
    const $price = $('<div>', { class: 'price_by_night' });
    $price.text('$' + place.price_by_night);
    $titlebox.append($price);
    const $information = $('<div>', { class: 'information' });
    const $guest = $('<div>', { class: 'max_guest' });
    $guest.text(place.max_guest + ' Guests');
    const $rooms = $('<div>', { class: 'number_rooms' });
    $rooms.text(place.number_rooms + ' Bedrooms');
    const $baths = $('<div>', { class: 'number_bathrooms' });
    $baths.text(place.number_bathrooms + ' Bathrooms');
    $information.append([$guest, $rooms, $baths]);
    const $description = $('<div>', { class: 'description' });
    $description.html(place.description);
    $article.append([$titlebox, $information, $description]);
    section.append($article);

    console.log(place.name);
  });
}
function placesFetch (data) {
  const data2 = JSON.stringify(data);
  $.ajax({
    type: 'POST',
    url: 'http://0.0.0.0:5001/api/v1/places_search/',
    contentType: 'application/json',
    data: data2,
    success: function (response) {
      placesInsert(response);
    }
  });
}
function cityEdit (city, id, type) {
  const z = nameCities.indexOf(city);
  if (z < 0 && type === 0) {
    nameCities.push(city);
    idCities.push(id);
  } else if (z >= 0 && type === 1) {
    nameCities.splice(z, 1);
    idCities.splice(z, 1);
  }
  console.log('Cities', idCities);
}
function stateEdit (state, id, type) {
  const z = nameStates.indexOf(state);
  if (z < 0 && type === 0) {
    nameStates.push(state);
    idStates.push(id);
  } else if (z >= 0 && type === 1) {
    nameStates.splice(z, 1);
    idStates.splice(z, 1);
  }
  console.log('States', idStates);
}
