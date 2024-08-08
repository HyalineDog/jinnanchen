document.addEventListener('DOMContentLoaded', function() {
  const originalCard = document.getElementById('originalCard');
  const dealtCardsContainer = document.getElementById('dealtCardsContainer');
  const portfolioCards = document.querySelectorAll('.portfolio-cards');

  const maxColumns = 5;
  let currentColumn = 0;
  let currentRow = 0;

  originalCard.addEventListener('click', function() {
      originalCard.classList.add('animate');
      setTimeout(() => {
          originalCard.classList.remove('animate');
      }, 100);

      portfolioCards.forEach(function(card, index) {
          const dealtCard = card.cloneNode(true);
          dealtCard.classList.add('dealt-card');
          dealtCard.style.display = 'block';

          setTimeout(() => {
              dealtCardsContainer.appendChild(dealtCard);
              dealtCard.style.transform = `translateX(${currentColumn * 220}px) translateY(${currentRow * 370}px)`;
              dealtCard.style.transitionDelay = `${index * 0.2}s`;
          }, 100);

          setTimeout(() => {
              dealtCard.style.transform = 'translateX(0) translateY(0)';
              dealtCard.style.transitionDelay = '0s';
          }, 100 + (index * 200));

          currentColumn++;
          if (currentColumn === maxColumns) {
              currentColumn = 0;
              currentRow++;
          }
      });
  });
});

// function deal(){
//   removeAllCards();
//   getCards();
//   $('.card').click(function(){
//     if ($(this).hasClass('flip')) {
//       return;
//     }
//     const flippedCards = Array.from($('.card.flip'));
//     $(this).animate({
//       left: '380px'
//     })
//     $(this).addClass('flip').css({
//       'z-index': flippedCards.length,
//       'margin-left': flippedCards.length + 'px'
//     });
//     if ($(this).data('isLast')) {
//       $('.deal').removeAttr('disabled');
//       $('.shuffle').removeAttr('disabled');
//       $('.deal')[0].value = 'Deal Again';
//     }
//   });

//   Array.from($('.card')).forEach((c, index) => {
//     $(c).delay(delay * (index + 1)).fadeIn(fadetime);
//   });
// }

// $('.reset').click(function(){
//   removeAllCards();
//   $('#count-display').text('');
//   people = [];
//   $('.shuffle').attr('disabled', true);
//   $('.deal').attr('disabled', true);
//   $('.deal')[0].value = 'Deal';
//    $('.reset').attr('disabled', true);
//   $('.save').attr('disabled', true).show();
//   $('#people-entry').show();
//   shuffleCount = 0;
//   $('.shuffle')[0].value = 'Shuffle';
// });