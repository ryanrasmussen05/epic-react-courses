// useEffect: HTTP requests
// http://localhost:3000/isolated/exercise/06.js

import * as React from 'react'
import {PokemonForm, fetchPokemon, PokemonInfoFallback, PokemonDataView} from '../pokemon'
import { ErrorBoundary } from 'react-error-boundary';

function PokemonInfo({pokemonName}) {
  const [pokemonState, setPokemonState] = React.useState({ status: 'idle', pokemon: null, error: null });

  React.useEffect(() => {
    if (!pokemonName) return;
    setPokemonState({ status: 'pending' });

    fetchPokemon(pokemonName)
    .then(pokemonData => {
      setPokemonState({ status: 'resolved', pokemon: pokemonData });
    })
    .catch(error => {
      setPokemonState({ status: 'rejected', error });
    });
  }, [pokemonName]);

  switch (pokemonState.status) {
    case 'idle':
      return 'Submit a pokemon';
    case 'pending':
      return <PokemonInfoFallback name={pokemonName} />;
    case 'resolved':
      return <PokemonDataView pokemon={pokemonState.pokemon} />;
    case 'rejected':
      throw pokemonState.error;
    default:
      return null;
  }
}

function ErrorFallback({error, resetErrorBoundary}) {
  return (
    <div role="alert">
      There was an error:{' '}
      <pre style={{whiteSpace: 'normal'}}>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  )
}

function App() {
  const [pokemonName, setPokemonName] = React.useState('')

  function handleSubmit(newPokemonName) {
    setPokemonName(newPokemonName)
  }

  function handleReset() {
    setPokemonName('');
  }

  return (
    <div className="pokemon-info-app">
      <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
      <hr />
      <div className="pokemon-info">
        <ErrorBoundary FallbackComponent={ErrorFallback} onReset={handleReset} resetKeys={[pokemonName]}>
          <PokemonInfo pokemonName={pokemonName} />
        </ErrorBoundary>
      </div>
    </div>
  )
}

export default App
