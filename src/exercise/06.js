// useEffect: HTTP requests
// http://localhost:3000/isolated/exercise/06.js

import * as React from 'react'
// 🐨 you'll want the following additional things from '../pokemon':
// fetchPokemon: the function we call to get the pokemon info
// PokemonInfoFallback: the thing we show while we're loading the pokemon info
// PokemonDataView: the stuff we use to display the pokemon info
import {PokemonForm, fetchPokemon,  PokemonInfoFallback, PokemonDataView} from '../pokemon'

const initState = {
  status:'idle',
  pokemon: null,
  error: null
}

function PokemonInfo({pokemonName}) {
  const [status, setStatus] = React.useState(initState)



  React.useEffect(() => {
    if(!pokemonName) {
      return
    }
    setStatus(
      {
      status:'pending',
      pokemon: null
    })
    fetchPokemon(pokemonName).then(
      res => {
        setStatus(
          {
          status:'resolved',
          pokemon: res
        })
      },
      error => {
        setStatus(
          {
          status:'rejected',
          pokemon: null,
          error
        })
      }
    )
  }, [pokemonName])

  if(status.status==='idle') {
    return 'Submit a pokemon'
  } else if(status.status === 'pending' ) {
    return <PokemonInfoFallback name={pokemonName} />
  } else if(status.status === 'rejected'){
    return (
      <div role="alert">
        There was an error: <pre style={{whiteSpace: 'normal'}}>{status.error.message}</pre>
      </div>
    )
  } else if(status.status==='resolved') {
    return  <PokemonDataView pokemon={status.pokemon} />
  }
  throw new Error('This is impossible!')
  // 🐨 return the following things based on the `pokemon` state and `pokemonName` prop:
  //   1. no pokemonName: 'Submit a pokemon'
  //   2. pokemonName but no pokemon: <PokemonInfoFallback name={pokemonName} />
  //   3. pokemon: <PokemonDataView pokemon={pokemon} />


}

function App() {
  const [pokemonName, setPokemonName] = React.useState('')


  function handleSubmit(newPokemonName) {
    setPokemonName(newPokemonName)
  }

  return (
    <div className="pokemon-info-app">
      <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
      <hr />
      <div className="pokemon-info">
        <PokemonInfo pokemonName={pokemonName} />
      </div>
    </div>
  )
}

export default App
