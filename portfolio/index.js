const burger = document.querySelector('.burger');
const navigation = document.querySelector('.navigation-list');
const navigationMobile = document.querySelector('.navigation-list-mobile');
const navigationMobileItem = document.querySelectorAll('.navigation-list-item-mobile');

function toggleBurger() {
    burger.classList.toggle('open');
};

function windowResize() {
    if (document.querySelector('html').clientWidth > 768) {
        burger.classList.remove('open');
        navigationMobile.style.right = '-620px';
    }
}

function closeModalWindow() {
    if (burger.classList.contains('open')) {
        navigation.classList.add('active');
        document.querySelector('.navigation-container-switch').style.position = 'fixed';
        document.querySelector('.navigation-container-switch').style.right = '134px';
    } else {
        document.querySelector('.navigation-container-switch').style.position = 'static';
        navigation.classList.remove('active');
    }

    if (navigation.classList.contains('active')) {
        navigationMobile.style.display = 'flex';
        navigationMobile.style.right = '0';
        document.querySelector('.navigation-shade').style.display = 'block';
    } else {
        navigationMobile.style.right = '-620px';
        document.querySelector('.navigation-shade').style.display = 'none';
    }
};

navigationMobileItem.forEach(item => item.addEventListener('click', () => {
    burger.classList.remove('open')
}));

navigationMobileItem.forEach(item => item.addEventListener('click', closeModalWindow));

burger.addEventListener('click', toggleBurger);

burger.addEventListener('click', closeModalWindow);

window.addEventListener('resize', windowResize);


console.log('Вёрстка соответствует макету +48\nНи на одном из разрешений до 320px включительно не появляется горизонтальная полоса прокрутки + 15\nНа ширине экрана 768рх и меньше реализовано адаптивное меню +22\nИтого 85')