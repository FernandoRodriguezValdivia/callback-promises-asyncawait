// elementos usados
const h1 = document.querySelector('h1')
const button = document.querySelector('button')
const img = document.querySelector('img')
const input = document.querySelector('input')

// callbacks AJAX

const busquedaCallback = (id, cb) =>{
  const url = 'https://rickandmortyapi.com/api/character/'+id
  const request = new XMLHttpRequest()
  request.onload = function(){
    if(request.status === 200){
      console.log(request.response)
      cb(request.response)
    } else {
      console.log('algo salio mal')
    }
  }
  request.responseType = 'json';
  request.open('GET', url )
  request.send()
}

const callback = ( respuesta ) => {
  const nombre = respuesta.name
  console.log(nombre)
  h1.textContent = nombre
}

//promises

const callbackJson = ( result ) => {
  h1.textContent = result.name
}

const callbackThen = ( respuesta ) => {
  return respuesta.json()
}

const busquedaPromesa = ( id ) => {
  const url = 'https://rickandmortyapi.com/api/character/'+id
  fetch(url)
    .then(( respuesta) => respuesta.json()) //then(callbackThen)
    .then(( result ) => {  // then(callbackJson)
  
      h1.textContent = result.name
    })
    .catch( (err) => {
      console.log(err)
    })
}

// async await

const busquedaAsyncAwait = async ( id ) => {
  const url = 'https://rickandmortyapi.com/api/character/'+id
  try {
    const respuesta =  await fetch(url)
    const respuestJson = await respuesta.json()

    h1.textContent = respuestJson.name
  } catch (error) {
    console.log(error)
  }
}

// ------------------------------------------------------------------------------
// Simulando Fetch

const personajes = [
  {
    id: 1,
    name: "Son Gokū",
    raza: "Saiyajin",
    descripcion: "Protagonista de la historia, aprendiz de artes marciales y tiene una cola.",
    hijos: ["Son Gohan", "Son Goten"],
    edad: 50,
    poderAtaque: 9000,
    url: 'https://depor.com/resizer/dFX3j034-CJgT9Mpb4d5sVopRp4=/580x330/smart/filters:format(jpeg):quality(75)/cloudfront-us-east-1.images.arcpublishing.com/elcomercio/5UUV6NB7PJHALDU7WOFJBGKKH4.jpg'
  },
  {
    id: 2,
    name: "Vegeta",
    raza: "Saiyajin",
    descripcion: "Príncipe de los Saiyajin, vive en la tierra y mantiene una relación con Bulma.",
    hijos: ["Trunks", "Bra"],
    edad: 53,
    poderAtaque: 9500,
    url: "https://images5.alphacoders.com/653/thumb-1920-653698.jpg"
  },
  {
    id: 3,
    name: "Bulma",
    raza: "Humana",
    descripcion: "Hija de una de las mentes más brillantes del mundo, creadora de artefactos.",
    hijos: ["Trunks", "Bra"],
    edad: 48,
    poderAtaque: 100,
    url: "https://e.rpp-noticias.io/xlarge/2015/10/28/18823bulma11jpg.jpg"
  },
  {
    id: 4,
    name: "Krilin",
    raza: "Humano",
    descripcion: "Compañero de Gokū, artista marcial, mejor amigo de Gokū.",
    edad: 46,
    poderAtaque: 500,
    url: "https://elcomercio.pe/resizer/Ht6xhsshYf04gT-FdWs57p3QpsM=/1200x900/smart/filters:format(jpeg):quality(75)/cloudfront-us-east-1.images.arcpublishing.com/elcomercio/SE7DKC7AK5D3BGUQ6AIRIUSVZE.jpg"
  },
  {
    id: 5,
    name: "Piccolo",
    raza: "Namekiano",
    descripcion: "Monstruo hijo de Piccolo Daimaō, maestro de Son Gohan.",
    edad: 32,
    poderAtaque: 3000,
    url: "https://depor.com/resizer/Qmx-qWFKpd69MXf4MXQtTMqtZHY=/580x330/smart/filters:format(jpeg):quality(75)/cloudfront-us-east-1.images.arcpublishing.com/elcomercio/ELLFQBHCP5G2TLUTSYQLSNLF74.jpg"
  },
  {
    id: 6,
    name: "Son Gohan",
    raza: "Saiyajin/Humano",
    descripcion: "Hijo mayor de Gokū, protagonista en varias ocasiones.",
    edad: 38,
    poderAtaque: 4000,
    url: "https://as01.epimg.net/meristation/imagenes/2019/03/12/noticias/1552385012_819733_1552385161_noticia_normal.jpg"
  }
]


// Fetch con Promise directo
const fetchFake = (url) => {
  return new Promise(( resolve , reject ) =>{
    const id = Number(url.split('/')[url.split('/').length - 1])
    const result = personajes.filter( item => item.id === id )
    setTimeout(()=>{
      if( result.length > 0 ){
        resolve( result[0] )
      } else {
        const error = new Error('No existe el personaje')
        // const error = { message: 'No existe el personaje' }
        reject(error)
      }
    },2000)
  })
}

// Fetch con Promise que retorna otra promesa
const fetchFake2 = (url) => {
  return new Promise(( resolve , reject ) =>{
    const id = Number(url.split('/')[url.split('/').length - 1])
    const result = personajes.filter( item => item.id === id )
    setTimeout(()=>{
      if( result.length > 0 ){
        const resultResponse = {
          data: {info: 'tenemos que convertir esto  a json usando .json() que si le haces un console.log veras que es un promise por que toma tiempo en transformar la informacion'},
          json: function(){
            return new Promise( (res, rej) => {
              setTimeout(()=>{
                res( result[0] )
              }, 1000)
            })
          }
        }
        resolve( resultResponse )
      } else {
        const error = new Error('No existe el personaje')
        error.status = 404  // agregando propiedades al error
        error.statusText = 'Not Found'
        // const error = { message: 'No existe el personaje' }
        reject(error)
      }
    },2000)
  })
}

// Promises


const busquedaDragonBallPromise = (id) => {
  const url = 'http://busquedadragonball/'+id
  fetchFake(url)
    .then( result => {
  
      h1.textContent = result.name
    })
    .catch( err => {
  
      h1.textContent = err.message
    })
  }

// Async Await

const busquedaDragonBallAsyncAwait = async (id) => {
  h1.textContent = 'Buscando'
  try {
    const url = 'http://busquedadragonball/'+id
    const result = await fetchFake(url)
    h1.textContent = result.name
  } catch (error) {
    console.log(error)
    h1.textContent = error.message
  }
}

// Usando el fetchFake2 que retorna un objeto con una metodo json que es una promesa

const busquedaDragonBall = (id) => {
  const url = 'http://busquedadragonball/'+id
  let i = 0
  const interval = setInterval(() => {
    h1.textContent = 'Buscando personaje con id: '+id+ '.'.repeat(i)
    if( i >= 3) i=0
    else i++
  }, 250)
  
  img.setAttribute('src', "")
  button.setAttribute('disabled', true)
  fetchFake2(url)
    .then( result => { // el result es data que aun no se puede ver si haces un console.log(result) veras informacion de como ver el resultado  ( se debe usar el .json() )
      // console.log(result)
      // console.log(result.json())  
      return result.json()// aca se simula un .json() de los request y se ve que es una promesa
    })
    .then( resjson => { // se resuelve la promesa y se obtiene la data
      clearInterval(interval)
      h1.textContent = resjson.name
      img.setAttribute('src', resjson.url)
      button.removeAttribute('disabled')
    } )
    .catch( err => {
      clearInterval(interval)
      console.log(err.status)
      h1.textContent = err.message
      button.removeAttribute('disabled')
    })
}

// modificando funcion para pasarle el id
// busquedaDragonBallPromise(1) 
// busquedaDragonBallAsyncAwait(2)

function Buscar(){
  const number = input.value
  busquedaDragonBall(number)
}
