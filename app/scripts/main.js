$(document).ready(function() {
    //
    // Mobile menu
    //

    const header = document.querySelector('.header'),
          headerBurger = document.querySelector('.header__nav-item--arrow .header__nav-link'),
          headerSearchBody = document.querySelector('.header__search')
          headerSearchBtn = document.querySelector('.header__search-btn'),
          headerSearchForm = document.querySelector('.header__search-form');

    if (window.matchMedia("(max-width: 992px)").matches) {
        function toggleMobileMenu(e) {
            e.stopPropagation();
            header.classList.toggle('header--mobile-menu');
            document.body.classList.toggle('overflow-hidden');
        }

        headerBurger.addEventListener('click', toggleMobileMenu);
    };

    function toggleSearchForm(e) {
        e.stopPropagation();
        headerSearchForm.classList.toggle('is-open');
    }

    function closeSearchForm(e) {
        let target = e.target;
        let headerSearchWrap = target == headerSearchBody || headerSearchBody.contains(target);
        let headerSearchActive = headerSearchForm.classList.contains('is-open');
    
        if (!headerSearchWrap && headerSearchActive) {
            toggleSearchForm(e);
        }
    }

    headerSearchBtn.addEventListener('click', toggleSearchForm);
    document.addEventListener('click', closeSearchForm);

    if (window.matchMedia("(max-width: 992px)").matches) {
        new Swiper('.product-card__carousel', {
            slidesPerView: '1',
            loop: false,
            speed: 400,

            pagination: {
                el: '.carousel-pagination',
                    clickable: true
            }
        });
    };

    //
    // Accordion
    //

    let accordionButton = document.getElementsByClassName("accordion__item-toggle");

    for(let i = 0; i < accordionButton.length; i++) {
        accordionButton[i].addEventListener("click", toggleItems, false);
    }

    function toggleItems() {
        this.classList.toggle("is-active");

        let accordionContent = this.nextElementSibling;

        if (accordionContent.style.maxHeight){
            accordionContent.style.maxHeight = null;
        } else {
            accordionContent.style.maxHeight = accordionContent.scrollHeight + "px";
        } 
    }

    //
    // Tabs
    //


    let tabTriggerBtns = document.querySelectorAll('.tabs__nav-item');

    tabTriggerBtns.forEach(function(tabTriggerBtn, index){
        tabTriggerBtn.addEventListener('click', function(){
            let currentTabData = document.querySelector('.tabs__content[data-tab="' + this.dataset.activeTab + '"]');

            document.querySelector('.tabs__content--open').classList.remove('tabs__content--open');
            document.querySelector('.tabs__nav-item--active').classList.remove('tabs__nav-item--active');

            currentTabData.classList.add('tabs__content--open');
            this.classList.add('tabs__nav-item--active');
        });
    });

    //
    // Modals
    //

    let modal = document.querySelectorAll('.modal'),
        modalBtn = document.querySelectorAll('[data-modal]'),
        modalBtnClose = document.querySelectorAll('[data-close-modal]');

    function openModal() {
        let modalId = this.getAttribute('data-modal');

        if(document.querySelector('.modal--open')) {
            document.querySelector('.modal--open').classList.remove('modal--open');

            setTimeout(function () {
                document.querySelector('.modal--fadeIn').classList.remove('modal--fadeIn');
            }, 50);
        }

        document.querySelector('#' + modalId).classList.add('modal--open');
        document.body.style.overflow = 'hidden';

        setTimeout(function () {
            document.querySelector('#' + modalId).classList.add('modal--fadeIn');
        }, 50);
    }

    function closeModal() {
        let openModal = document.querySelector('.modal--open');
        openModal.classList.remove('modal--fadeIn');

        setTimeout(function () {
            openModal.classList.remove('modal--open')
            document.body.style.overflow = '';
        }, 200);
    }

    for(let a = 0; a < modalBtn.length; a++) {
        modalBtn[a].addEventListener("click", openModal, false);
    }

    modalBtn.forEach(function(elem) {
        elem.addEventListener("click", openModal);
    });

    modal.forEach(function(elem) {
        elem.addEventListener("click", closeModal);

        elem.querySelector('[data-close-modal]').addEventListener("click", closeModal);
        
        elem.querySelector('*').addEventListener("click", function() {
            event.stopPropagation();
        });
    });

    //
    // INPUT CUSTOM
    //

    $('.input--number').each(function() {
        var spinner = jQuery(this),
            input = spinner.find('input[type="number"]'),
            btnUp = spinner.find('.input__number-up'),
            btnDown = spinner.find('.input__number-down'),
            min = input.attr('min'),
            max = input.attr('max');

        btnUp.click(function() {
            var oldValue = parseFloat(input.val());
            if (oldValue >= max) {
                var newVal = oldValue;
            } else {
                var newVal = oldValue + 1;
            }
            spinner.find("input").val(newVal);
            spinner.find("input").trigger("change");
        });

        btnDown.click(function() {
            var oldValue = parseFloat(input.val());
            if (oldValue <= min) {
                var newVal = oldValue;
            } else {
                var newVal = oldValue - 1;
            }
            spinner.find("input").val(newVal);
            spinner.find("input").trigger("change");
        });
    });

    const catalogCategories = document.querySelector('.filter__categories'),
          catalogCategoriesBtn = document.querySelector('.btn--categories'),
          catalogFilter = document.querySelector('.filter__body')
          catalogFilterBtn = document.querySelector('.btn--filter');

    function toggleCatalogCategories(e) {
        e.stopPropagation();
        catalogCategories.classList.toggle('is-active');
        catalogCategoriesBtn.classList.toggle('is-active');
        document.body.classList.toggle('overflow-hidden');
        catalogFilterBtn.classList.toggle('visibility-hidden');
    }

    function toggleCatalogFilter(e) {
        e.stopPropagation();
        catalogFilter.classList.toggle('is-active');
        catalogFilterBtn.classList.toggle('is-active');
        document.body.classList.toggle('overflow-hidden');
        catalogCategoriesBtn.classList.toggle('visibility-hidden');
    }

    catalogCategoriesBtn.addEventListener('click', toggleCatalogCategories);
    catalogFilterBtn.addEventListener('click', toggleCatalogFilter);

});