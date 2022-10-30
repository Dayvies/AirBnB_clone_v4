#!/usr/bin/node
const list = [];
$(document).ready(function () {
  const startCheck = $('.popover input:checkbox');
  startCheck.each(function (index, input) {
    const product = $(input);
    if (product.is(':checked')) {
      listEdit($(this).data('name'), 0);
      const list2 = list.slice(0, 3);
      $('.amenities h4').text(list2.join());
      console.log(list);
    }
  });
  $.get('http://0.0.0.0:5001/api/v1/status/', (data) => {
    if (data.status === 'OK') {
      $('#api_status').addClass('available');
    } else $('#api_status').removeClass('available');
  });
  const data2 = JSON.stringify({});
  $.ajax({
    type: 'POST',
    url: 'http://0.0.0.0:5001/api/v1/places_search/',
    contentType: 'application/json',
    data: data2,
    success: function (response) {
      placesInsert(response);
    }
  });

  $('input:checkbox').change(function () {
    if ($(this).is(':checked')) {
      console.log('checked');
      listEdit($(this).data('name'), 0);
      const list2 = list.slice(0, 3);
      $('.amenities h4').text(list2.join());
      console.log(list);
    } else {
      console.log('unchecked');
      listEdit($(this).data('name'), 1);
      const list2 = list.slice(0, 3);
      $('.amenities h4').text(list2.join());
      console.log(list);
    }
  });
});

function listEdit (amenity, type) {
  const z = list.indexOf(amenity);
  if (z < 0 && type === 0) {
    list.push(amenity);
  } else if (z >= 0 && type === 1) {
    list.splice(z, 1);
  }
}
function placesInsert (response) {
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
