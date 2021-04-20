import { useState, useEffect } from 'react';
import axios from 'axios';

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

export const useResource = (baseUrl) => {
  const [resources, setResources] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const { status, data } = await axios.get(baseUrl);

      if (status === 200) {
        setResources(data);
      }
    };

    getData();
  }, [baseUrl]);

  const create = async (resource) => {
    await axios.post(baseUrl, resource);
    const { status, data } = await axios.get(baseUrl);

    if (status === 200) {
      setResources(data);
    }
  };

  const service = {
    create,
  };

  return [resources, service];
};
