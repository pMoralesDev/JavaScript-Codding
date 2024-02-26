/**
 * @function searchGithub cogiendo la información aportada por el usuario hace una petición a la API de GitHub. 
 * En función de la respuesta a la petición, muestra una información y otra al usuario
 */
const searchGithub = async () => {
    /**
     * @var username convierte el valor introducido por el usuario en un dato para la función
     * @var response almacena la petición que hacemos a la API
     * @var detailContainer toma el valor del contenedor html en el que se mostrará la información
     * @var data almacena los datos facilitados por la API
     */
    const username = document.getElementById('searchInput').value
    response = await fetch(`https://api.github.com/users/${username}`)
    detailContainer = document.querySelector('.details')
    data = await response.json()
    /**
     * Si la API da una respuesta afirmativa muestra los datos en el contenedor, configurados en formato HTML
     * Si la API responde negativamente muestra el mensaje de error predeterminado
     */
    if(response.ok){
        detailContainer.style.display='flex'
        document.getElementById('result').innerHTML = `
            <div class='profile'>
                <div class='profile-image'>
                    <img src='${data.avatar_url}' />
                </div>
                <div class='profile-details'>
                    <h2 class='name'>${data.name || data.login}</h2>
                    <p class='username'>@${data.login}</p>
                    <p class='bio'>${data.bio || "This acount doesn't have a bio"}</p>
                    <div class='stats'>
                        <div>
                            <div class='stats-name'>Public repositories</div>
                            <div class='stats-value'>${data.public_repos}</div>
                        </div>
                        <div>
                            <div class='stats-name'>Followers</div>
                            <div class='stats-value'>${data.followers}</div>
                        </div>
                        <div>
                            <div class='stats-name'>Following</div>
                            <div class='stats-value'>${data.following}</div>
                        </div>
                    </div>
                    <div class='media'>
                        <p> <span class='media-value'>${data.location || 'Not available'}</span></p>
                        <p> <span class='media-value'>${data.blog || 'Not available'}</span></p>
                        <p> <span class='media-value'>${data.twitter_username || 'Not available'}</span></p>
                        <p> <span class='media-value'>${data.company || 'Not available'}</span></p>
                    </div>
                </div>
            </div>              
        `
    } else {
        alert(data.message)
    }
}

