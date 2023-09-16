import { useEffect, useState } from 'react'
import './App.css'
// import Skeleton from './components/Skeleton'
const CAT_ENDPOINT_RANDOM_FACT = 'https://catfact.ninja/fact'
// const CAT_ENDPOINT_IMAGE_URL = `https//cataas.com/cat/says/${firstWord}?size=50&color=red&json=true`
const CAT_PREFIX_IMAGE_URL = 'https://cataas.com'
const Skeleton = () => {
  return (
    <div>
      <p className='skeleton'>Loading fact...</p>
      <div className='card-image-container'>
        <img className='skeleton' src={`${CAT_PREFIX_IMAGE_URL}/cat/says/Loading...`} alt='Loading image...' />
      </div>
    </div>
  )
}

export function App () {
  const [fact, setFact] = useState()
  const [imageUrl, setImageUrl] = useState()
  // NO USAR react Query, Axios, apollo, SWR

  // para recuperar la cita al cargar la pagina
  useEffect(() => {
    fetch(CAT_ENDPOINT_RANDOM_FACT)
      .then(res => res.json())
      .then(data => {
        const { fact } = data
        setFact(fact)
      })
  }, [])
  // para recuperar la imagen al tener cita nueva
  useEffect(() => {
    if (!fact) return

    const threeFirstWords = fact.split(' ', 3).join(' ')
    console.log(threeFirstWords)

    fetch(`https://cataas.com/cat/says/${threeFirstWords}?size=50&color=red&json=true`)
      .then(res => res.json())
      .then(response => {
        const { url } = response
        setImageUrl(url)
        // setImageUrl(`https//cataas.com${url}`)
      })
  }, [fact])

  return (
    <main>
      <section className='card-main-container'>
        <h1>App de Gatos</h1>
        {!fact && <Skeleton />}
        {fact && <p>{fact}</p>}
        {imageUrl &&
          <div className='card-image-container'>
            <img className='skeleton' src={`${CAT_PREFIX_IMAGE_URL}${imageUrl}`} alt={`image extracted using the first three words from cataas.com. ${fact}`} />
          </div>}
      </section>
    </main>
  )

  // return (
  //   <main>
  //     <section className='card-main-container'>
  //       <h1>App de Gatos</h1>
  //       {fact && <p>{fact}</p>}
  //       <div className='card-image-container'>
  //         {imageUrl && <img src={`${CAT_PREFIX_IMAGE_URL}${imageUrl}`} alt={`image extracted using the first three words from cataas.com. ${fact}`} />}
  //       </div>
  //     </section>
  //   </main>
  // )
}
