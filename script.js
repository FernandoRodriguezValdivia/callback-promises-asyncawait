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
    .then(( respuesta) => respuesta.json())
    .then(( result ) => {
      const h1 = document.querySelector('h1')
      h1.textContent = result.name
    })
    .catch( (err) => {
      console.log(err)
    })
}

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

const busquedaDragonBallPromise = () => {
  const url = 'http://busquedadragonball/1'
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

const busquedaDragonBallAsyncAwait = async () => {
  const h1 = document.querySelector('h1')
  h1.textContent = 'Buscando'
  try {
    const url = 'http://busquedadragonball/1'
    const result = await fetchFake(url)
    h1.textContent = result.name
  } catch (error) {
    h1.textContent = error.message
  }
}

busquedaDragonBallAsyncAwait()