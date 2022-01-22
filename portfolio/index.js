const burger = document.querySelector('.burger');
const navigation = document.querySelector('.navigation-list');
const navigationMobile = document.querySelector('.navigation-list-mobile');
const navigationItems = document.querySelectorAll('.navigation-list-item-link');

function toggleBurger() {
    burger.classList.toggle('open');
};

burger.addEventListener('click', toggleBurger);

burger.addEventListener('click', () => {
    navigation.classList.toggle('active');
    if (navigation.classList.contains('active')) {
        navigationMobile.style.display = 'block';
    } else {
        navigationMobile.style.display = 'none';
    }
})

console.log('Вёрстка валидная +10\nВёрстка семантическая +18\nВёрстка соответствует макету +48\nТребования к css + 10\nИнтерактивность, реализуемая через css +20\nИтого 108')