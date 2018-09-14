$(function() {
  var map, myIcon;
  var points = [
    { id: "shop-1", lon: 40.986278, lat: 57.739178, address: "Юбилейный микрорайон, 27в" },
    { id: "shop-2", lon: 40.98484, lat: 57.80158, address: "Костромская, 73/1" },
    { id: "shop-3", lon: 41.015777, lat: 57.733305, address: "Давыдовский 2-й микрорайон, 67/8" },
    { id: "shop-4", lon: 40.942679, lat: 57.775322, address: "Калиновский рынок, Калиновская, 42" },
    { id: "shop-5", lon: 40.92375, lat: 57.768533, address: "Центральный рынок, Мучные Ряды, 1" },
    { id: "shop-6", lon: 40.909692, lat: 57.736499, address: "Паново микрорайон, 11/1" },
    { id: "shop-7", lon: 40.977131, lat: 57.758377, address: "Титова, 1/1" },
    { id: "shop-8", lon: 40.935027, lat: 57.772686, address: "Сенная, 18/1" },
    { id: "shop-9", lon: 40.938094, lat: 57.782759, address: "Ленина, 88/9" },
    { id: "shop-10", lon: 40.99109, lat: 57.753483, address: "Кинешемское шоссе, 21а/1" },
    { id: "shop-11", lon: 40.968511, lat: 57.748168, address: "Северной Правды, 29/3" },
    { id: "shop-12", lon: 40.918893, lat: 57.801459, address: "Боровая, 33" },
    { id: "shop-13", lon: 41.012979, lat: 57.752554, address: "Фестивальная, 28/1" },
    { id: "shop-14", lon: 40.900991, lat: 57.738058, address: "Южная, 12/2" },
    { id: "shop-15", lon: 40.948263, lat: 57.778011, address: "Мира проспект, 64" }
  ];

  DG.then(function() {
    map = DG.map('shops-map', {
      center: [57.767917, 40.926626],
      zoom: 12,
      fullscreenControl: false,
      zoomControl: false
    });

    myIcon = DG.icon({
      iconUrl: 'static/img/general/geomarker.svg',
      iconSize: [53, 73]
    });

    for (var i = 0; i < points.length; i++) {
      DG.marker([points[i].lat, points[i].lon], { icon: myIcon }).addTo(map);
    }

    $('.shops-list__address a').on('click', function(e) {
      var id = $(this).closest('.shops-list__item').attr('id');
      var results = points.filter(function (entry) { return entry.id === id; });
      e.preventDefault();
      map.setView([results[0].lat, results[0].lon], 16, {
        "animate": true,
        "pan": {
          "duration": 0.5
        }
      });
    });
  });
});