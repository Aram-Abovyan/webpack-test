import { filter } from 'lodash';
import * as d from './d.json';

const data = JSON.parse(JSON.stringify(d));

//==== Matrix api

const makeMatrix = ({ columns, data }) => {
  const listeners = [];

  const matrix = [columns.map(({ label }) => label), ...data];
  const filters = {
    category: 'all',
  };

  const getMatrix = () => {
    return matrix;
  };

  const searchByName = (name) => {
    const display = matrix.filter(item => item[1].includes(name) && (filters.category === 'all' ? true : item[2].trim().toLowerCase() === filters.category));

    if (name || (!name && filters.category !== 'all')){
      trigger([matrix[0] ,...display]);
    } else {
      trigger(display);
    }
   
  }

  const setCategory = (category) => {
    filters.category = category.trim().toLowerCase();
    const display = matrix.filter(item => item[2].trim().toLowerCase() === filters.category);

    if (filters.category === 'all'){
      trigger(matrix);
    } else {
      trigger([matrix[0] ,...display]);
    }
  }

  const subscribe = (f) => {
    listeners.push(f);

    const unsubscribe = () => {
      listeners = listeners.filter((item) => item === f);
    }

    return unsubscribe;
  }

  const trigger = (display) => {
    listeners.forEach(item => item(display));
  }

  return ({
    getMatrix,
    subscribe,
    searchByName,
    setCategory,
  });
}

export const matrix = makeMatrix(data);