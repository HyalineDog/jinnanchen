const searchElement = document.querySelector('.search');
const dropDownOptions = document.querySelector('.drop-down-options');
const selectedOption = document.querySelector('.selected');
const options = document.querySelectorAll('.options');
const dealtCardsContainer = document.getElementById('dealtCardsContainer');
const dropDownIcon = document.querySelector('.drop_down_icon');
const search = document.querySelector('.search');
const originalCard = document.getElementById('originalCard');
const portfolioCards = document.querySelectorAll('.portfolio-cards');

const maxColumns = 5;
let currentColumn = 0;
let currentRow = 0;

searchElement.addEventListener('click', () => {
    dropDownIcon.classList.toggle('rotate');
    dropDownOptions.classList.toggle('show');
    if (!dropDownOptions.classList.contains('show')) {
        dropDownOptions.style.animationName = 'fade_reverse, slide_reverse';
        search.style = 'border-bottom: black 3px solid';
    } else {
        dropDownOptions.style.animationName = 'fade, slide';
    }
});

function dealCards(selectedClass) {
    currentColumn = 0;
    currentRow = 0;
    dealtCardsContainer.innerHTML = '';

    portfolioCards.forEach(function(card, index) {
        if (selectedClass === 'all' || card.classList.contains(selectedClass)) {
            const dealtCard = card.cloneNode(true);
            dealtCard.classList.add('dealt-card');
            dealtCard.style.display = 'block';

            const originalCardRect = originalCard.getBoundingClientRect();
            const originalCardLeft = originalCardRect.left;
            const originalCardTop = originalCardRect.top;

            dealtCard.style.backgroundImage = `url(${originalCard.src})`;
            dealtCard.style.backgroundSize = 'cover';
            dealtCard.style.backgroundPosition = 'center';
            dealtCard.style.backgroundRepeat = 'no-repeat';
            dealtCard.style.transform = `translateX(${originalCardLeft}px) translateY(${originalCardTop}px) scale(0.3)`;

            setTimeout(() => {
                dealtCardsContainer.appendChild(dealtCard);
                dealtCard.style.transform = `translateX(${originalCardLeft+100}px) translateY(${originalCardTop-430}px) scale(0.3) rotateY(180deg)`;
                dealtCard.style.transitionDelay = `${index * 0.1}s`;
            }, 500);

            setTimeout(() => {
                dealtCard.style.backgroundImage = 'none';
                applyAutoHoverEffect(dealtCard);
            }, 1000 + (index * 200));

            currentColumn++;
            if (currentColumn === maxColumns) {
                currentColumn = 0;
                currentRow++;
            }
        }
    });
}

function returnCards() {
    const dealtCards = document.querySelectorAll('.dealt-card');
    const originalCardRect = originalCard.getBoundingClientRect();
    const originalCardLeft = originalCardRect.left;
    const originalCardTop = originalCardRect.top;

    dealtCards.forEach((card, index) => {
        setTimeout(() => {
            card.style.transition = 'transform 0.5s';
            card.style.transform = `translate(${originalCardLeft - card.offsetLeft}px, ${originalCardTop - card.offsetTop}px) scale(0.01)`;

            setTimeout(() => {
                card.remove();
            }, 500);
        }, index * 100);
    });
}

function applyAutoHoverEffect(card) {
    const rect = card.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const rotateX = (Math.random() - 0.5) * 10;
    const rotateY = (Math.random() - 0.5) * 10;

    card.style.transition = 'transform 0.3s';
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

    setTimeout(() => {
        card.style.transition = 'transform 0.5s';
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
    }, 300);
}

originalCard.addEventListener('click', function() {
    const selectedClass = selectedOption.classList[2];
    originalCard.classList.add('animate');
    setTimeout(() => {
        originalCard.classList.remove('animate');
    }, 500);

    const dealtCards = dealtCardsContainer.querySelectorAll('.dealt-card');
    dealtCards.forEach(card => {
        card.style.transition = 'transform 0.5s';
        card.style.transform = 'scale(0)';
    });

    setTimeout(() => {
        dealtCardsContainer.innerHTML = '';
        dealCards(selectedClass);
    }, 500);
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

        returnCards();
    });
});

document.addEventListener('click', (event) => {
    const target = event.target;
    if (!dropDownOptions.contains(target) && !searchElement.contains(target)) {
        dropDownIcon.classList.remove('rotate');
        dropDownOptions.classList.remove('show');
        dropDownOptions.style.animationName = 'fade_reverse, slide_reverse';
        search.style = 'border-bottom: black 3px solid';
    }
});

dealtCardsContainer.addEventListener('mousemove', function(e) {
    const dealtCards = dealtCardsContainer.querySelectorAll('.dealt-card');
    dealtCards.forEach(card => {
        if (!card.classList.contains('enlarged')) {
            const rect = card.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            const mouseX = e.clientX - centerX;
            const mouseY = e.clientY - centerY;

            if (mouseX >= -rect.width / 2 && mouseX <= rect.width / 2 && mouseY >= -rect.height / 2 && mouseY <= rect.height / 2) {
                const rotateX = (mouseY / rect.height) * -25;
                const rotateY = (mouseX / rect.width) * 25;
                card.style.transition = 'transform 0.2s';
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            } else {
                card.style.transition = 'transform 1s';
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
            }
        }
        else{
            card.style.transition = 'transform 0.1s' ;
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
        }
    });
});

dealtCardsContainer.addEventListener('mouseleave', function() {
    const dealtCards = dealtCardsContainer.querySelectorAll('.dealt-card');
    dealtCards.forEach(card => {
        card.style.transition = 'transform 0.5s';
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
    });
});

dealtCardsContainer.addEventListener('click', function(e) {
    const clickedCard = e.target.closest('.dealt-card');
    if (clickedCard) {
      if (!clickedCard.classList.contains('enlarged')) {
        clickedCard.classList.add('enlarged');
        const overlay = document.createElement('div');
        overlay.classList.add('overlay');
        document.body.appendChild(overlay);
        overlay.addEventListener('click', function() {
          clickedCard.classList.remove('enlarged');
          overlay.remove();
        });
      } else {
        clickedCard.classList.remove('enlarged');
        document.querySelector('.overlay').remove();
      }
    }
  });
