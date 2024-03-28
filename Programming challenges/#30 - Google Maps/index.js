/**
 * @function intialize se encarga de cargar el mapa dentro del contenedor con nuestras especificicaciones
 */
function initialize() {
    /**
     * @var mapOptions son las parametros que vamos a usar dentro de nuestro mapa. desde el grado de zoom que se carga por defecto al punto en el 
     * que aparece el mapa al cargarse
     */
    var mapOptions = {
        zoom:10,
        center: new google.maps.LatLng(40.4165, -3.70256),
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        minZoom:2,
    }
    /**Instanciamos un el mapa dentro del contenedor correspondiente */
    var map = new google.maps.Map(document.getElementById('map'), mapOptions) 
    /**Instanciamos una ventana de información que rellenaremos más adelante */
    var infoWindow = new google.maps.InfoWindow()
    /**Creamos un marcador con ciertos parámetros que vamos a rellenar, como la posición o el texto que se va a mostrar */
    var marker = new google.maps.Marker({
        position: new google.maps.LatLng(40.4165, -3.77),
        map: map,
        title: 'Casa de Campo, Madrid, Spain'
    })
    /**Creamos un evento den el marcador que nos permita mostrar la venta de información creada anteriormente */
    marker.addListener('click', function () {
        infoWindow.setContent(marker.title)
        infoWindow.open(map, marker)
    })
    /**Nos aseguramos que el mapa mantenga su centro cuando redimensionamos el mapa, es decir, cuando el usuario hace zoom */
    google.maps.event.addDomListener(window, 'resize', function () {
        map.setCenter(mapOptions.center)
    })
}
/**Asociamos la carga del mapa a la carga de la ventana del navegador */
google.maps.event.addDomListener(window, 'load', initialize)