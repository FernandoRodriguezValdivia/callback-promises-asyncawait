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
  const h1 = document.querySelector('h1')
  h1.textContent = nombre
}

//promises

const callbackJson = ( result ) => {
  const h1 = document.querySelector('h1')
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
      const h1 = document.querySelector('h1')
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
    const h1 = document.querySelector('h1')
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
    name: 'Goku'
  },
  {
    id: 2,
    name: 'Vegeta'
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
        const error = new Error('No existe el usuario')
        // const error = { message: 'No existe el usuario' }
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
        const error = new Error('No existe el usuario')
        error.status = 404  // agregando propiedades al error
        error.statusText = 'Not Found'
        // const error = { message: 'No existe el usuario' }
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
      const h1 = document.querySelector('h1')
      h1.textContent = result.name
    })
    .catch( err => {
      const h1 = document.querySelector('h1')
      h1.textContent = err.message
    })
  }

// Async Await

const busquedaDragonBallAsyncAwait = async (id) => {
  const h1 = document.querySelector('h1')
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
  const h1 = document.querySelector('h1')
  let i = 0
  const interval = setInterval(() => {
    h1.textContent = 'Buscando personaje con id: '+id+ '.'.repeat(i)
    if( i >= 3) i=0
    else i++
  }, 250)
  fetchFake2(url)
    .then( result => { // el result es data que aun no se puede ver si haces un console.log(result) veras informacion de como ver el resultado  ( se debe usar el .json() )
      // console.log(result)
      // console.log(result.json())  
      return result.json()// aca se simula un .json() de los request y se ve que es una promesa
    })
    .then( resjson => { // se resuelve la promesa y se obtiene la data
      h1.textContent = resjson.name
      clearInterval(interval)
    } )
    .catch( err => {
      console.log(err.status)
      h1.textContent = err.message
      clearInterval(interval)
    })
}

// modificando funcion para pasarle el id
// busquedaDragonBallPromise(1) 
// busquedaDragonBallAsyncAwait(2)

busquedaDragonBall(2)