import i18Obj from './translate.js';

const burger = document.querySelector('.burger');
const navigation = document.querySelector('.navigation-list');
const navigationMobile = document.querySelector('.navigation-list-mobile');
const navigationMobileItem = document.querySelectorAll('.navigation-list-item-mobile');
const portfolioButtonsContainer = document.querySelector('.portfolio-buttons');
const portfolioButtons = document.querySelectorAll('.portfolio-buttons-button');
const portfolioImages = document.querySelectorAll('.portfolio-images-image');
const englishButton = document.querySelector('.navigation-container-switch-en');
const russianButton = document.querySelector('.navigation-container-switch-ru');

function preloadImages() {
    const seasons = ['winter', 'spring', 'summer', 'autumn'];
    for (let item of seasons) {
        for (let i = 1; i <= 6; i++) {
            const img = new Image();
            img.src = `./assets/img/${item}/${i}.jpg`;
        }
    }
}

function getTranslate(language) {
    let translateElements = document.querySelectorAll('[data-i18n]');
    translateElements.forEach(element => {
        // if (element.dataset in i18Obj) {
            // if (element.placeholder) {
            //     element.placeholder = 
            //     element.textContent = ''
            // }
            element.textContent = i18Obj[language][element.dataset.i18n]
        // }
    })
}

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

function changeImage(event) {
    if (event.target.classList.contains('portfolio-buttons-button')) {
        portfolioButtons.forEach(button => button.classList.remove('pressed'));
        event.target.classList.add('pressed');
        portfolioImages.forEach((image, index) => image.src = `assets/img/${event.target.dataset.season}/${index + 1}.jpg`);
    }
};

preloadImages();

englishButton.addEventListener('click', () => {
    russianButton.classList.remove('current');
    englishButton.classList.add('current');
    getTranslate('en');
});

russianButton.addEventListener('click', () => {
    englishButton.classList.remove('current');
    russianButton.classList.add('current');
    getTranslate('ru');
});

navigationMobileItem.forEach(item => item.addEventListener('click', () => {
    burger.classList.remove('open')
}));

navigationMobileItem.forEach(item => item.addEventListener('click', closeModalWindow));

burger.addEventListener('click', toggleBurger);

burger.addEventListener('click', closeModalWindow);

window.addEventListener('resize', windowResize);

portfolioButtonsContainer.addEventListener('click', changeImage);

// console.log('Вёрстка соответствует макету +48\nНи на одном из разрешений до 320px включительно не появляется горизонтальная полоса прокрутки + 15\nНа ширине экрана 768рх и меньше реализовано адаптивное меню +22\nИтого 85')