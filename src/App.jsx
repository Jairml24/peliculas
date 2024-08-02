import { useRef, useState } from 'react'
import './App.css'
import Card from './Card'
import debounce from "just-debounce-it";
const apiKey = import.meta.env.VITE_API_KEY;
const URL_API = `https://www.omdbapi.com/?apikey=${apiKey}&s=`

function App() {
  const [peliculas, setPeliculas] = useState(null)
  const [error, setError] = useState(null)
  const inputPelicula = useRef(null);
  const inputPeliculaBefore = useRef(inputPelicula);

  const searchMovie = (e) => {
    e.preventDefault()
    if (inputPelicula.current.value === inputPeliculaBefore.current.value) return
    searchMovies(inputPelicula.current.value)
    inputPeliculaBefore.current.value = inputPelicula.current.value
  }

  const handleInputChange = () => {
    inputPelicula.current.value.startsWith(" ") && (inputPelicula.current.value = '');
    searchMovies(inputPelicula.current.value)
  }

  const searchMovies = debounce((movie) => {
    if (movie.length < 4) {
      setError('busqueda debe contener mas de 3 digitos')
      return
    }
    setError(null)
    fetch(URL_API + movie)
      .then(res => res.json())
      .then(data => {
        setPeliculas(data.Search)
        !data.Search && setError('Sin resultados')
      })
  }, 300)


  return (
    <div className='contenedor'>
      <main>
        <form action="" onSubmit={searchMovie}>
          <label htmlFor="">Pelicula</label>
          <input type="pelicula" ref={inputPelicula} onChange={handleInputChange} />
          <button>Buscar</button>
        </form>
        {
          error && (
            <label style={{ color: 'red' }}>{error}</label>
          )
        }
      </main>

      <section className='contenedor-cards'>
        {
          peliculas &&
          peliculas.map((pelicula, index) => (
            <Card key={index} tittle={pelicula.Title} year={pelicula.Year} poster={pelicula.Poster} />
          ))
        }
      </section>
    </div >
  )
}

export default App
