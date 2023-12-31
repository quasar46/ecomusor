ymaps.ready(function () {
    var myMap = new ymaps.Map('map', {
        center: [43.261952, 76.920231],
        zoom: 12,
        controls: []
    });

    var myPlacemark = new ymaps.Placemark([43.261952, 76.920231], {
     
    });

    myMap.geoObjects.add(myPlacemark);
});