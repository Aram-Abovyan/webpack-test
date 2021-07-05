import $ from 'jQuery';
import { matrix } from './data/data';

export const searchHandler = () => {
  matrix.searchByName($('#name-search').val().trim());
}

export const categoryHandler = ({ target }) => {
  matrix.setCategory(target.value);
}