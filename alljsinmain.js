const slidesData = [
            {
                title: "Fishing box",
                oldPrice: "15000.0",
                newPrice: "12000.0",
                desc: "ONE FOR ALL",
                img: "img/new_logo01.png",
                orderText: "Order now",
                viewText: "view detail ↗",
                orderHref: "cart.html",
                viewHref: "item.html"
            },
            {
                title: "Reel Set Pro",
                oldPrice: "4500",
                newPrice: "3290",
                desc: "Spin it like a pro",
                img: "img/reel.png",
                orderText: "Order now",
                viewText: "view detail ↗",
                orderHref: "cart.html",
                viewHref: "item.html"
            },
            {
                title: "Ultimate Bait Box",
                oldPrice: "8900",
                newPrice: "7490",
                desc: "Bait everything",
                img: "img/bait.png",
                orderText: "Order now",
                viewText: "view detail ↗",
                orderHref: "cart.html",
                viewHref: "item.html"
            }
        ];

        (function () {
            const dots = Array.from(document.querySelectorAll('.dot'));
            if (dots.length === 0) return;

            const titleEl = document.querySelector('.hero-title');
            const oldPriceEl = document.querySelector('.price .old-price');
            const newPriceEl = document.querySelector('.price .new-price');
            const descEl = document.querySelector('.void .desc') || document.querySelector('.desc');
            const orderContainer = document.querySelector('.void');
            const pictureEl = document.querySelector('.picture-promote');

            if (!titleEl || !oldPriceEl || !newPriceEl || !descEl || !orderContainer || !pictureEl) {
                console.warn('Hero selectors missing. Check the HTML structure.');
            }

            let currentIndex = Math.max(0, dots.findIndex(d => d.classList.contains('active')));
            if (currentIndex === -1) currentIndex = 0;
            const ANIM_DURATION = 500;

            function createButtons(slide) {
                const order = document.createElement('a');
                order.className = 'order-btn';
                order.href = slide.orderHref || '#';
                order.textContent = slide.orderText || 'Order now';

                const view = document.createElement('a');
                view.className = 'view-link';
                view.href = slide.viewHref || '#';
                view.innerHTML = slide.viewText || 'view detail ↗';

                return { order, view };
            }

            function goToIndex(targetIndex) {
                if (targetIndex === currentIndex) return;
                if (targetIndex < 0 || targetIndex >= slidesData.length) return;
                
                dots.forEach(d => d.style.pointerEvents = 'none');
                const direction = targetIndex > currentIndex ? 'right' : 'left';
                const outClass = direction === 'right' ? 'hero-anim-out-left' : 'hero-anim-out-right';
                const inClass = direction === 'right' ? 'hero-anim-in-right' : 'hero-anim-in-left';

                const heroContent = document.querySelector('.hero-content');
                const priceEl = document.querySelector('.price');
                const heroImageEl = pictureEl;
                heroContent.classList.remove('hero-anim-in-left', 'hero-anim-in-right', 'hero-anim-out-left', 'hero-anim-out-right');
                heroImageEl.classList.remove('hero-anim-in-left', 'hero-anim-in-right', 'hero-anim-out-left', 'hero-anim-out-right');
                titleEl.classList.remove('hero-title-out', 'hero-title-in');
                priceEl.classList.remove('hero-anim-in-left', 'hero-anim-in-right', 'hero-anim-out-left', 'hero-anim-out-right');
                titleEl.classList.add('hero-title-out');
                heroImageEl.classList.add(outClass);
                priceEl.classList.add(outClass);
                descEl.style.transition = `opacity ${ANIM_DURATION}ms ease`;
                descEl.style.opacity = '0';
                
                const buttons = orderContainer.querySelectorAll('.order-btn, .view-link');
                buttons.forEach(b => { 
                    b.style.transition = `opacity ${ANIM_DURATION}ms ease`; 
                    b.style.opacity = '0'; 
                });

                setTimeout(() => {
                    const slide = slidesData[targetIndex];
                    if (titleEl) titleEl.textContent = slide.title;
                    if (oldPriceEl) oldPriceEl.textContent = slide.oldPrice;
                    if (newPriceEl) newPriceEl.textContent = slide.newPrice;
                    if (descEl) descEl.textContent = slide.desc;
                    if (pictureEl) pictureEl.src = slide.img;
                    
                    const existingOrder = orderContainer.querySelector('.order-btn');
                    const existingView = orderContainer.querySelector('.view-link');
                    if (existingOrder) existingOrder.remove();
                    if (existingView) existingView.remove();

                    const newBtns = createButtons(slide);
                    orderContainer.appendChild(newBtns.order);
                    orderContainer.appendChild(newBtns.view);
                    titleEl.classList.remove('hero-title-out');
                    titleEl.classList.add('hero-title-in');
                    heroImageEl.classList.remove(outClass);
                    heroImageEl.classList.add(inClass);
                    priceEl.classList.remove(outClass);
                    priceEl.classList.add(inClass);
                    descEl.style.opacity = '1';
                    
                    const newButtons = orderContainer.querySelectorAll('.order-btn, .view-link');
                    newButtons.forEach(b => {
                        b.style.opacity = '0';
                        void b.offsetWidth;
                        b.style.transition = `opacity ${ANIM_DURATION}ms ease`;
                        b.style.opacity = '1';
                    });
                    
                    setTimeout(() => {
                        titleEl.classList.remove('hero-title-in');
                        heroImageEl.classList.remove(inClass);
                        priceEl.classList.remove(inClass);
                        dots.forEach(d => d.style.pointerEvents = '');
                        dots.forEach(d => d.classList.remove('active'));
                        dots[targetIndex].classList.add('active');
                        currentIndex = targetIndex;
                    }, ANIM_DURATION + 10);

                }, ANIM_DURATION);
            }
            
            dots.forEach((dot, idx) => {
                dot.addEventListener('click', () => goToIndex(idx));
            });

            window.addEventListener('keydown', (e) => {
                if (e.key === 'ArrowLeft') goToIndex(Math.max(0, currentIndex - 1));
                if (e.key === 'ArrowRight') goToIndex(Math.min(slidesData.length - 1, currentIndex + 1));
            });
        })();

/*อันนี้เป็นjsสำหรับแตะcard-productcล้วค่อยโชว์ปุ่มซื้อของ */
    document.querySelectorAll('.product-card').forEach(card => {
    const btn = card.querySelector('button');

    if (!btn) return;
    card.addEventListener('mouseenter', () => {
    btn.classList.add('show');
    });
    card.addEventListener('mouseleave', () => {
    btn.classList.remove('show');
    });
    card.addEventListener('focusin', () => {
    btn.classList.add('show');
    });
    card.addEventListener('focusout', () => {
    btn.classList.remove('show');
    });
});


    function scrollProducts(button, direction) {
            const container = button.parentElement.querySelector('.product-wrapper');
            const scrollAmount = 310; 
            
            if (direction === 'left') {
                container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
            } else {
                container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
            }
        }

        const dots = document.querySelectorAll('.dot');
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                dots.forEach(d => d.classList.remove('active'));
                dot.classList.add('active');
            });
        });


        const modal = document.getElementById('detailmodal');
        const viewModalBtn = document.getElementById('viewmodal');
        const closeBtn = document.querySelector('.close');
        viewModalBtn.addEventListener('click', (e) => {
            e.preventDefault();
            modal.classList.add('show');
            document.body.style.overflow = 'hidden'; 
        });
        closeBtn.addEventListener('click', () => {
            modal.classList.remove('show');
            document.body.style.overflow = 'auto';
        });
        window.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('show');
                document.body.style.overflow = 'auto';
            }
        });
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('show')) {
                modal.classList.remove('show');
                document.body.style.overflow = 'auto';
            }
        });


