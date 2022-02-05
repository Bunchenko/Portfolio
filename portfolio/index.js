import i18Obj from './translate.js';

const burger = document.querySelector('.burger');
const navigationMobile = document.querySelector('.navigation-list-mobile');
const navigationMobileItem = document.querySelectorAll('.navigation-list-item-mobile');
const portfolioButtonsContainer = document.querySelector('.portfolio-buttons');
const englishButton = document.querySelector('.navigation-container-switch-en');
const russianButton = document.querySelector('.navigation-container-switch-ru');
const themeButton = document.querySelector('.theme-changer');

const player = document.querySelector('.video-player');
const video = player.querySelector('.viewer');
const bigPlayButton = document.querySelector('.video-player-button');
const smallPlayButton = document.querySelector('.video-player-controls-play-button');
const progressBar = document.querySelector('.video-player-controls-playback');
const volumeButton = document.querySelector('.video-player-controls-volume-button');
const volumeRange = document.querySelector('.video-player-controls-volume');


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

function togglePlay() {
    if (video.paused) {
        video.play();
    } else {
        video.pause();
    }
}

function toggleSmallPlayButton(status) {
    if (this.paused) {
        smallPlayButton.querySelector('img').src = `assets/svg/play.svg`
    } else {
        smallPlayButton.querySelector('img').src = `assets/svg/pause.svg`;
    }
}

function toggleBigPlayButton() {
    if (this.paused) {
        bigPlayButton.style.display = 'block';
    } else {
        bigPlayButton.style.display = 'none';
    }
}

function playbackProgress() {
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.value = `${percent}`;
}

function toggleVolume() {
    volumeButton.classList.toggle('muted');
    if (volumeButton.classList.contains('muted')) {
        volumeButton.querySelector('img').src = 'assets/svg/mute.svg';
        video.volume = 0;
    } else {
        volumeButton.querySelector('img').src = 'assets/svg/volume.svg';
        video.volume = volumeRange.value;
    }
}

function toggleVolumeButton() {
    if (video.volume === 0) {
        volumeButton.querySelector('img').src = 'assets/svg/mute.svg';
    } else {
        volumeButton.querySelector('img').src = 'assets/svg/volume.svg';
    }
}

function volumeRangeUpdate() {
    video.volume = this.value
}

function progressBarBackgroundChange() {
    var value = (progressBar.value-progressBar.min)/(progressBar.max-progressBar.min)*100
    progressBar.style.background = 'linear-gradient(to right, #BDAE82 0%, #BDAE82 '
     + value 
     + '%, rgb(200, 200, 200)' 
     + value 
     + '%, rgb(200, 200, 200) 100%)'
};

bigPlayButton.addEventListener('click', togglePlay);
smallPlayButton.addEventListener('click', togglePlay);
video.addEventListener('play', toggleSmallPlayButton);
video.addEventListener('play', toggleBigPlayButton);
video.addEventListener('pause', toggleSmallPlayButton);
video.addEventListener('pause', toggleBigPlayButton);
video.addEventListener('click', togglePlay);
video.addEventListener('timeupdate', playbackProgress);
video.addEventListener('timeupdate', progressBarBackgroundChange);

volumeRange.addEventListener('change', volumeRangeUpdate);
volumeRange.addEventListener('input', volumeRangeUpdate);
volumeRange.addEventListener('change', toggleVolumeButton);
volumeRange.addEventListener('input', toggleVolumeButton);
volumeButton.addEventListener('click', toggleVolume);
window.addEventListener('load', () => {video.volume = '0.01'});

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

progressBar.oninput = function() {
    var value = (this.value-this.min)/(this.max-this.min)*100
    this.style.background = 'linear-gradient(to right, #BDAE82 0%, #BDAE82 ' 
    + value 
    + '%, rgb(200, 200, 200)' 
    + value 
    + '%, rgb(200, 200, 200) 100%)'
};

volumeRange.oninput = function() {
    var value = (this.value-this.min)/(this.max-this.min)*100
    this.style.background = 'linear-gradient(to right, #BDAE82 0%, #BDAE82 ' 
    + value 
    + '%, rgb(200, 200, 200)' 
    + value 
    + '%, rgb(200, 200, 200) 100%)'
};