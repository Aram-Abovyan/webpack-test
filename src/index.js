import $ from 'jQuery';
import { matrix } from './data/data';
import { searchHandler, categoryHandler } from './handlers';
import './styles/main.css';
import moment from 'moment';

const renderContent = (display = matrix.getMatrix()) => {
  $('#content').html(display.map((row, index) => (
      `<ul>
        ${row.map((item, index,array) => `<li>${!isNaN(+item) && index !== array.length-1 ? moment(item*1000).calendar() : item}</li>`).join('')}
      </ul><br/>`
  )).join(''));
}

renderContent();

$(window).on('load',function() {
  $('#search-button').on('click',() => { searchHandler() });
  $('#category').on('change', categoryHandler);
  let unsubscribe = matrix.subscribe((data) => {
    renderContent(data)});
});