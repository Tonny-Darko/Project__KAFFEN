const isMobile = {
    Android: function () {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function () {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function () {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function () {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function () {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function () {
        return (
            isMobile.Android() || 
            isMobile.BlackBerry() || 
            isMobile.iOS() || 
            isMobile.Opera() || 
            isMobile.Windows()); 
        
    }
};

if (isMobile.any()) {
    document.body.classList.add('_touch');

    let menuArrows = document.querySelectorAll('.menu__arrow');
    if (menuArrows.length > 0) {
        for (let index = 0; index < menuArrows.length; index++) {
            const menuArrow = menuArrows[index];
            menuArrow.addEventListener("click", function (e) {
                menuArrow.parentElement.classList.toggle('_active');
            });
        }
    }
} else {
    document.body.classList.add('_pc');
}


//Меню бургер

const iconMenu = document.querySelector('.menu__icon');
const menuBody = document.querySelector('.menu__body');
if (iconMenu) {
    iconMenu.addEventListener("click", function (e) {
        document.body.classList.toggle('_lock');
        iconMenu.classList.toggle('_active');
        menuBody.classList.toggle('_active');
    })
};

// //Плавна прокрутка
// const menuLinks = document.querySelectorAll('.menu__link[data-goto]');
// if (menuLinks.length > 0) {
//     menuLinks.forEach(menuLink => {
//         menuLink.addEventListener("click", onMenuLinkClick);
//     });

//     function onMenuLinkClick(e) {
//         const menuLink = e.target;
//         if (menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)){
//             const gotoBlock = document.querySelector(menuLink.dataset.goto);
//             const gotoBlockValue = gotoBlock.getBoundingClientRect().top + scrollY - document.querySelector('header').offsetHeight;

//             if(iconMenu.classList.contains('_active')) {
//                 document.body.classList.remove('_lock');
//                 iconMenu.classList.remove('_active');
//                 menuBody.classList.remove('_active');
//             }

//             window.scrollTo({
//                 top:gotoBlockValue,
//                 behavior: "smooth"
//             });
//             e.preventDefault();
//         }
//     }
// };


// /*----------- АНІМАЦІЯ ПРИ СКРОЛІ ----------*/

const animItems = document.querySelectorAll ('._anim-items');

if (animItems.length > 0) {
    window.addEventListener('scroll', animOnScroll);
    function animOnScroll(params) {
        for (let index = 0; index < animItems.length; index++) {
            const animItem = animItems[index];
            const animItemHeight = animItem.offsetHeight;
            const animItemOffset = offset(animItem).top;
            const animStart = 4;

            let animItemPoint = window.innerHeight - animItemHeight / animStart;
            if (animItemHeight > window.innerHeight) {
                animItemPoint = window.innerHeight - window.innerHeight / animStart;
            }

            if ((scrollY > animItemOffset - animItemPoint) && scrollY < (animItemOffset + animItemHeight)) {
                animItem.classList.add('_active');
            } else {
                if (!animItem.classList.contains('_anim-no-hide')) {
                    animItem.classList.remove('_active');
                }
            }
        }
    }
    function offset(el) {
        const rect = el.getBoundingClientRect(),
            scrollLeft = window.scrollX || document.documentElement.scrollLeft,
            scrollTop = window.scrollY|| document.documentElement.scrollTop;
        return { top: rect.top + scrollTop, left: rect.left + scrollLeft}
    }    
    setTimeout(() => {
        animOnScroll();
    }, 300);
} 

/*---------  SLIDER    --------------*/
new Swiper('.image-slider__customer', {
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    autoplay: {
        delay: 4000,
      },
    speed: 800,
    autHeight: true,
    watchOverflow: true,
    loop: true,
    slidesPerView: 1,
});

/*------------------ЛІЧИЛЬНИК-------------------------------*/

window.addEventListener("load", windowLoad);

function windowLoad() {
    function digitsCountersInit(digitsCountersItems) {
        let digitsCounters = digitsCountersItems ? digitsCountersItems : document.querySelectorAll("[data-digits-counter]");
        if (digitsCounters) {
            digitsCounters.forEach(digitsCounter => {
                digitsCountersAnimate(digitsCounter);
            });
        }
    }

    function digitsCountersAnimate(digitsCounter) {
        let startTimestamp = null;
        const duration = parseInt(digitsCounter.dataset.digitsCounter) ? parseInt(digitsCounter.dataset.digitsCounter) : 1000;
        const startValue = parseInt(digitsCounter.innerHTML);
        const startPosition = 0;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            digitsCounter.innerHTML = Math.floor(progress * (startPosition + startValue));
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }

    //Запуск при завантаженні сторінки
    //digitsCountersInit();

    //Запуск при скроллі
    let options = {
        threshold: 0.5
    }
    let observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const targetElement = entry.target;
                const digitsCountersItems = targetElement.querySelectorAll("[data-digits-counter]");
                if (digitsCountersItems.length) {
                    digitsCountersInit(digitsCountersItems);
                }
                observer.unobserve(targetElement);
            }
        });
    }, options);

    let sections = document.querySelectorAll('.quantity-body__content');
    if (sections.length) {
        sections.forEach(section => {
        observer.observe(section);
        });
    };
}


