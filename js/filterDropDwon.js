// Get the necessary elements
const searchElement = document.querySelector('.search');
const dropDownOptions = document.querySelector('.drop-down-options');
const selectedOption = document.querySelector('.selected');
const options = document.querySelectorAll('.options');
const dealtCardsContainer = document.getElementById('dealtCardsContainer');
const dropDownIcon = document.querySelector('.drop_down_icon');
const search = document.querySelector('.search');

searchElement.addEventListener('click', () => {
  dropDownIcon.classList.toggle('rotate');
  dropDownOptions.classList.toggle('show');
  search.style = 'border-bottom: none'

  if (!dropDownOptions.classList.contains('show')) {
    dropDownOptions.style.animationName = 'fade_reverse, slide_reverse';
    search.style = 'border-bottom: black 3px solid'
  } else {
    dropDownOptions.style.animationName = 'fade, slide';
  }
});

options.forEach(option => {
  option.addEventListener('click', () => {
    const selectedClass = option.dataset.sort.slice(1);
    selectedOption.textContent = option.textContent;
    selectedOption.classList.remove(...selectedOption.classList);
    selectedOption.classList.add('options', 'selected', selectedClass);
    dropDownIcon.classList.remove('rotate');
    dropDownOptions.classList.remove('show');
    dropDownOptions.style.animationName = 'fade_reverse, slide_reverse';
    filterCards(selectedClass);
    // hideSelectedOption(selectedClass);
    search.style = 'border-bottom: black 3px solid'
  });
});

// Function to filter the cards based on the selected class
function filterCards(selectedClass) {
  const cards = dealtCardsContainer.querySelectorAll('.mix.portfolio-cards');
  cards.forEach(card => {
    if (selectedClass === 'all' || card.classList.contains(selectedClass)) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });
}

// Function to hide the selected option from the dropdown
// function hideSelectedOption(selectedClass) {
//   options.forEach(option => {
//     if (option.dataset.sort.slice(1) === selectedClass) {
//       option.style.display = 'none';
//     } else {
//       option.style.display = 'block';
//     }
//   });
// }