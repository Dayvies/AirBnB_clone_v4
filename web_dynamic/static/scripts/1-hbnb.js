#!/usr/bin/node
const list = [];
$(document).ready(function () {
  console.log('hello');
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
