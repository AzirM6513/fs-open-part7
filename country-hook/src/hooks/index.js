import axios from 'axios';
import { useState, useEffect } from 'react';

export const useField = (type) => {
  const [value, setValue] = useState('');

  const onChange = (event) => {
    setValue(event.target.value);
  };

  return {
    type,
    value,
    onChange,
  };
};

export const useCountry = (name) => {
  const [country, setCountry] = useState(null);
  const [countryName, setCountryName] = useState('');
  const [found, setFound] = useState(false);

  const setLocation = (name) => {
    setCountryName(name);
  };

  useEffect(() => {
    async function getCountryData() {
      const res = await axios.get(
        `https://restcountries.eu/rest/v2/name/${countryName}`
      );

      if (res.status === 200) {
        setCountry(...res.data);
        setFound(true);
      }

      if (res.status !== 200) {
        setCountry(null);
        setFound(false);
      }
    }

    getCountryData();
  }, [countryName]);

  return { country, found, setLocation };
};
