import React, { useState } from 'react';
import { useField, useCountry } from './hooks/index';

const Country = ({ country }) => {
  if (!country) {
    return null;
  }

  if (!country.found) {
    return <div>not found...</div>;
  }

  const { name, capital, population, flag } = country.country;
  return (
    <div>
      <h3>{name} </h3>
      <div>capital {capital} </div>
      <div>population {population}</div>
      <img src={flag} height='100' alt={`flag of ${name}`} />
    </div>
  );
};

const App = () => {
  const nameInput = useField('text');
  const [name, setName] = useState('');
  const country = useCountry(name);

  const fetch = (e) => {
    e.preventDefault();
    setName(nameInput.value);
    country.setLocation(nameInput.value);
  };

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      <Country country={country} />
    </div>
  );
};

export default App;
