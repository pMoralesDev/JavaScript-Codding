/**
 * @var image contenedor donde poner la imagen de la cancion
 * @var title contenedor donde poner el titulo de la cancion
 * @var artist contenedor donde poner el nombre del artista de la cancion
 * @var currentTimeEl contenedor donde poner el tiempo que lleva reproduciendose la cancion
 * @var durationEl contenedor donde poner la duracion de la cancion
 * @var progress contenedor donde se va a ir cargando el progreso de la cancion
 * @var playerProgress contendor donde se va a poner la barra de progreso de la cancion
 * @var prevBtn boton en el que cargar la funcion anterior cancion @function changeMusic
 * @var nextBtn boton en el que cargar la funcion siguiente cancion @function changeMusic
 * @var playBtn boton en el que cargar la funcion de reproducir y parar la musica @function togglePlay
 */
const image = document.getElementById('cover'),
title = document.getElementById('music-title'),
artist = document.getElementById('music-artist'),
currentTimeEl = document.getElementById('current-time'),
durationEl = document.getElementById('duration'),
progress = document.getElementById('progress'),
playerProgress = document.getElementById('player-progress'),
prevBtn = document.getElementById('prev'),
nextBtn = document.getElementById('next'),
playBtn = document.getElementById('play')

/**
 * @var music objeto de la clase Audio que permite ejecutar los metodos propios de esta clase de javaScript
 * @var songs array con los datos de las canciones
 */
const music = new Audio()
const songs = [
    {
        path: 'media/1.mp3',
        displayName: 'The Charmer\'s Call',
        cover:'media/1.jpg',
        artist: 'Hanu Dixit'
    },
    {
        path: 'media/2.mp3',
        displayName: 'You never see me more',
        cover:'media/2.jpg',
        artist: 'Minter Nual'
    },
    {
        path: 'media/3.mp3',
        displayName: 'The Algoritmics',
        cover:'media/3.jpg',
        artist: 'Fork the line'
    }
]
/**
 * @var musicIndex variable que controla la cancion que se esta reproduciendo
 * @var isPlaying booleano que controla si la cancion se esta reproduciendo o no
 */
let musicIndex = 0
let isPlaying = false
/**
 * @function togglePlay encargada de activar las funciones reproducir y pausar en funcion de @var isPlaying
 * @function playMusic encargada de activar la musica y cambiar los valores frontend a los de reproduciendo
 * @function pauseMusic encargada de pausar la musica y cambiar los valores frontend a los de pausado
 */
function togglePlay(){
    if(isPlaying) {
        pauseMusic()
    } else {
        playMusic()
    }
}
function playMusic () {
    isPlaying = true
    playBtn.classList.replace('fa-play', 'fa-pause')
    playBtn.setAttribute('title', 'Pause')
    music.play()
}
function pauseMusic () {
    isPlaying = false
    playBtn.classList.replace('fa-pause', 'fa-play')
    playBtn.setAttribute('title', 'Play')
    music.pause()
 }
/**
 * @function loadMusic encargada que cargar los valores de la cancion en los componentes
 * @param {Integer} song se introduce el indice correspondiente a la cancion que queremos dentro de @var songs
 */
 function loadMusic(song){
    music.src = song.path
    title.textContent = song.displayName
    artist.textContent = song.artist
    image.src = song.cover
 }
/**
 * @function changeMusic encargada de cambiar el valor cargado en los componente mediante @function loadMusic
 * @param {Integer} direction se introduce 1 o -1 para mover el indice correspondiente a la cancion dentro de @var songs 
 */
 function changeMusic(direction) {
    musicIndex = (musicIndex + direction + songs.length) % songs.length
    loadMusic(songs[musicIndex])
    playMusic()
 }
/**
 * @function updateProgressBar encargada de actualizar el progreso de la cancion en los componentes a medida que se reproduce
 */
 function updateProgressBar () {
    const { duration, currentTime} = music
    const progressPercent = (currentTime / duration) * 100
    progress.style.width = `${progressPercent}%`
    const formatTime = (time) => String(Math.floor(time)).padStart(2, '0')
    durationEl.textContent = `${formatTime(duration/60)}:${formatTime(duration % 60)}`
    currentTimeEl.textContent = `${formatTime(currentTime/60)}:${formatTime(currentTime % 60)}`
 }
/**
 * @function setProgressBar encargada de actualizar la reproduccion de la cancion en funcion de donde el usuario se posicion dentro
 * de la barra de progreso del reproductor
 */
 function setProgressBar (e) {
    const width = playerProgress.clientWidth
    const clickX = e.offsetX
    music.currentTime = (clickX / width) * music.duration
 }
/**
 * Cargamos las funcionalidades en los componentes, con su evento activador correspondiente y diferente en cada caso
 */
 playBtn.addEventListener('click', togglePlay)
 prevBtn.addEventListener('click', () => changeMusic(-1))
 nextBtn.addEventListener('click', () => changeMusic(1))
 music.addEventListener('ended', () => changeMusic(1))
 music.addEventListener('timeupdate', updateProgressBar)
 playerProgress.addEventListener('click', setProgressBar)
 loadMusic(songs[musicIndex])