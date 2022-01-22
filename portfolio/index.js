const burger = document.querySelector('.burger');
function toggleBurger() {
    burger.classList.toggle("change");
};
burger.addEventListener('click', toggleBurger);

console.log('Вёрстка валидная +10\nВёрстка семантическая +18\nВёрстка соответствует макету +48\nТребования к css + 10\nИнтерактивность, реализуемая через css +20\nИтого 108')