import i18Obj from './translate.js';

const burger = document.querySelector('.burger');
const navigationMobile = document.querySelector('.navigation-list-mobile');
const navigationMobileItem = document.querySelectorAll('.navigation-list-item-mobile');
const portfolioButtonsContainer = document.querySelector('.portfolio-buttons');
const englishButton = document.querySelector('.navigation-container-switch-en');
const russianButton = document.querySelector('.navigation-container-switch-ru');
const themeButton = document.querySelector('.theme-changer');

// let lang = 'en';
// let theme = 'dark';

// function setLocalStorage() {
//     localStorage.setItem('lang', lang);
//     localStorage.setItem('theme', theme);
// }

// function getLocalStorage() {
//     if(localStorage.getItem('lang')) {
//       const lang = localStorage.getItem('lang');
//       getTranslate(lang);
//     }
//     if(localStorage.getItem('theme')) {
//         const theme = localStorage.getItem('theme');
//         getTranslate(theme);
//       }
// }

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
    // if (englishButton.classList.contains('current')) {
    //     lang = 'en';
    // } else {
    //     lang = 'ru';
    // }
    translateElements.forEach(element => {
            if (element.placeholder) {
            // element.placeholder = ''
                element.value = ''
            }
            element.textContent = i18Obj[language][element.dataset.i18n];
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
    const navigation = document.querySelector('.navigation-list');
    if (burger.classList.contains('open')) {
        navigation.classList.add('active');
        document.querySelector('.navigation-container-switch').style.position = 'fixed';
        themeButton.style.position = 'fixed';
        if (document.querySelector('html').clientWidth <= 482) {
            document.querySelector('.navigation-container-switch').style.right = '150px';
            themeButton.style.right = '88px';
        } else {
            document.querySelector('.navigation-container-switch').style.right = '209px';
            themeButton.style.right = '134px';
        }
    } else {
        document.querySelector('.navigation-container-switch').style.position = 'static';
        themeButton.style.position = 'static';
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
    const portfolioImages = document.querySelectorAll('.portfolio-images-image');
    const portfolioButtons = document.querySelectorAll('.portfolio-buttons-button');
    if (event.target.classList.contains('portfolio-buttons-button')) {
        portfolioButtons.forEach(button => button.classList.remove('pressed'));
        event.target.classList.add('pressed');
        portfolioImages.forEach((image, index) => image.src = `assets/img/${event.target.dataset.season}/${index + 1}.jpg`);
    }
};

function changeTheme() {
    const darkThemeElements = document.querySelectorAll('[data-theme]');
    const socialListIcons = document.querySelectorAll('.footer-social-list-icon');
    darkThemeElements.forEach(element => {
        element.classList.toggle('dark');
        if (element.placeholder) {
            element.value = ''
        }
    });

    if (themeButton.classList.contains('dark')) {
        // theme = 'light';
        document.querySelector('.theme-icon').src = 'assets/svg/toDark.svg';
        document.querySelector('.logo').src = 'assets/svg/logo-dark.svg';
        socialListIcons[0].src = 'assets/svg/Vector-dark.svg';
        socialListIcons[1].src = 'assets/svg/Vector-dark-1.svg';
        socialListIcons[2].src = 'assets/svg/Vector-dark-2.svg';
        socialListIcons[3].src = 'assets/svg/Vector-dark-3.svg';
    } else {
        // theme = 'dark';
        document.querySelector('.theme-icon').src = 'assets/svg/toLight.svg';
        document.querySelector('.logo').src = 'assets/img/logo.png';
        socialListIcons[0].src = 'assets/svg/Vector.svg';
        socialListIcons[1].src = 'assets/svg/Vector-1.svg';
        socialListIcons[2].src = 'assets/svg/Vector-2.svg';
        socialListIcons[3].src = 'assets/svg/Vector-3.svg';
    }
}

preloadImages();

// window.addEventListener('beforeunload', setLocalStorage);

// window.addEventListener('load', getLocalStorage);

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

themeButton.addEventListener('click', changeTheme);