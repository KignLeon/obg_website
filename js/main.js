/* ============================================
   OLD SCHOOL BOXING & FITNESS CENTER — Main JS
   Forms · Chat · Modal · Animations · Slider
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

    /* ─── 1. SCROLL ANIMATIONS ─── */
    const animElements = document.querySelectorAll('.anim-fade-up, .anim-slide-left, .anim-slide-right');
    if (animElements.length) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const parent = entry.target.parentElement;
                    const gridParents = [
                        'services-grid', 'services-grid-9', 'gallery-grid',
                        'reviews-grid', 'stats-grid', 'values-grid', 'process-grid',
                        'membership-grid'
                    ];
                    if (parent && gridParents.some(c => parent.classList.contains(c))) {
                        const siblings = Array.from(parent.children);
                        const idx = siblings.indexOf(entry.target);
                        entry.target.style.transitionDelay = `${idx * 0.08}s`;
                    }
                    entry.target.classList.add('in-view');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.06, rootMargin: '0px 0px -20px 0px' });
        animElements.forEach(el => observer.observe(el));
    }

    /* ─── 2. NAVBAR SCROLL ─── */
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (navbar) navbar.classList.toggle('scrolled', window.scrollY > 60);
    });

    /* ─── 3. MOBILE MENU ─── */
    const mobileToggle = document.getElementById('mobile-toggle');
    const navLinks = document.getElementById('nav-links');
    if (mobileToggle && navLinks) {
        mobileToggle.addEventListener('click', () => {
            mobileToggle.classList.toggle('active');
            navLinks.classList.toggle('open');
        });
        navLinks.querySelectorAll('a').forEach(a => {
            a.addEventListener('click', () => {
                mobileToggle.classList.remove('active');
                navLinks.classList.remove('open');
            });
        });
    }

    /* ─── 4. SMOOTH SCROLLING ─── */
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', (e) => {
            const id = a.getAttribute('href');
            if (id === '#' || id === '#quote-modal' || id === '#contact-form') return;
            e.preventDefault();
            const el = document.querySelector(id);
            if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });

    /* ─── 5. QUOTE MODAL ─── */
    const modalOverlay = document.getElementById('quote-modal');
    const modalClose = document.getElementById('modal-close');
    const openModalBtns = document.querySelectorAll('[href="#quote-modal"]');

    function openModal(e) {
        if (e) e.preventDefault();
        if (!modalOverlay) return;
        modalOverlay.style.display = 'flex';
        modalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    function closeModal() {
        if (!modalOverlay) return;
        modalOverlay.classList.remove('active');
        setTimeout(() => { modalOverlay.style.display = 'none'; }, 300);
        document.body.style.overflow = '';
    }

    openModalBtns.forEach(b => b.addEventListener('click', openModal));
    if (modalClose) modalClose.addEventListener('click', closeModal);
    if (modalOverlay) {
        modalOverlay.style.display = 'none';
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) closeModal();
        });
    }

    /* ─── 6. FORM SUBMISSION ─── */
    ['contact-form-element', 'quote-form', 'hero-quote-form'].forEach(id => {
        const form = document.getElementById(id);
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                const btn = form.querySelector('button[type="submit"]');
                const original = btn.innerHTML;
                btn.innerHTML = '<i class="fas fa-check"></i> Sent! We\'ll contact you soon.';
                btn.style.background = '#166534';
                btn.disabled = true;
                setTimeout(() => {
                    btn.innerHTML = original;
                    btn.style.background = '';
                    btn.disabled = false;
                    form.reset();
                    if (id === 'quote-form') closeModal();
                }, 3500);
            });
        }
    });

    /* ─── 7. FAQ ACCORDION ─── */
    document.querySelectorAll('.faq-q').forEach(btn => {
        btn.addEventListener('click', () => {
            const item = btn.closest('.faq-item');
            const isOpen = item.classList.contains('open');
            document.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));
            if (!isOpen) item.classList.add('open');
        });
    });

    /* ─── 8. BEFORE / AFTER SLIDER ─── */
    const baSlider = document.getElementById('ba-slider');
    const baHandle = document.getElementById('ba-handle');
    if (baSlider && baHandle) {
        let isDragging = false;
        const baBefore = baSlider.querySelector('.ba-before');

        function setPosition(x) {
            const rect = baSlider.getBoundingClientRect();
            let pct = ((x - rect.left) / rect.width) * 100;
            pct = Math.max(2, Math.min(98, pct));
            baHandle.style.left = pct + '%';
            if (baBefore) baBefore.style.clipPath = `inset(0 ${100 - pct}% 0 0)`;
        }

        baHandle.style.left = '50%';
        if (baBefore) baBefore.style.clipPath = 'inset(0 50% 0 0)';

        baHandle.addEventListener('mousedown', (e) => { isDragging = true; e.preventDefault(); });
        baHandle.addEventListener('touchstart', () => { isDragging = true; }, { passive: true });
        window.addEventListener('mousemove', (e) => { if (isDragging) setPosition(e.clientX); });
        window.addEventListener('touchmove', (e) => { if (isDragging) setPosition(e.touches[0].clientX); }, { passive: true });
        window.addEventListener('mouseup', () => isDragging = false);
        window.addEventListener('touchend', () => isDragging = false);
        baSlider.addEventListener('click', (e) => {
            if (e.target !== baHandle && !baHandle.contains(e.target)) setPosition(e.clientX);
        });
    }

    /* ─── 9. CHAT WIDGET — Old School Boxing KB ─── */
    const waFab = document.getElementById('wa-fab');
    const waChatWindow = document.getElementById('wa-chat-window');
    const waClose = document.getElementById('wa-close');
    const waInput = document.getElementById('wa-input');
    const waSend = document.getElementById('wa-send');
    const waChatBody = document.getElementById('wa-chat-body');

    const KB = {
        trial: "🥊 Your first class is FREE! No experience needed.\n\nJust fill out the form on our homepage or call us at (555) 123-4567 to reserve your spot.\n\nWe'll match you with the right class for your goals!",
        youth: "👦 Our Youth Boxing Program is for ages 6–17!\n\n✅ Learn real boxing fundamentals\n✅ Build discipline & confidence\n✅ Safe, structured, supportive environment\n✅ Experienced coaches who love working with kids\n\nClasses run Mon/Wed/Tue/Thu/Sat. Call us to schedule a free trial!",
        adult: "🥊 Adult Boxing is open to ALL experience levels!\n\n• Fundamentals classes for beginners\n• Advanced sessions for experienced boxers\n• Technical, coach-led instruction\n• Great for fitness, stress relief & self-defense\n\nFirst class is FREE — just call or sign up online!",
        fitness: "💪 Fitness Boxing is our non-contact class — no sparring, all workout!\n\n🔥 Burns 600–800+ calories per session\n🥊 Boxing combos, bag work, conditioning\n💨 Full-body cardio & core\n👥 Group energy that keeps you motivated\n\nAvailable Mon/Wed/Fri mornings & Saturdays!",
        competitive: "🏆 Competitive Training is for serious fighters ready to step in the ring.\n\n• Advanced technique & strategy\n• Controlled sparring sessions\n• Fight-camp preparation\n• Film study & fight planning\n• Amateur bout preparation\n\nYou'll need to be an existing member. Talk to a coach to get evaluated!",
        pt: "🎯 Personal Training = 1-on-1 with a dedicated coach.\n\n• Personalized training program\n• Accelerated skill development\n• Full accountability\n• Your goals, your schedule\n\nPT sessions can be added to any membership. Ask about pricing when you call!",
        programs: "We offer 5 core programs:\n\n🧒 Youth Boxing — Ages 6–17\n🥊 Adult Boxing — All Levels\n🔥 Fitness Boxing — Non-Contact\n🏆 Competitive Training — For Fighters\n🎯 Personal Training — 1-on-1\n\nEvery new member starts with a FREE trial class!",
        schedule: "📅 Weekly Schedule Highlights:\n\nMonday: Fitness Boxing 6am · Adult Fundamentals 5:30pm · Advanced 7pm\nTuesday: Youth 4:30pm · Competitive 6:30pm\nWed: Fitness 6am · Adult All Levels 5:30pm\nThurs: Youth 4:30pm · Competitive 6:30pm\nFri: Fitness 6am · Adult Fundamentals 5:30pm\nSaturday: Youth 9am · Adult All Levels 10:30am · Fitness Noon\nSunday: Open Gym 9am\n\nView full schedule on our website!",
        membership: "💳 Our membership options:\n\n🔴 Fitness Member — $89/mo\n   Unlimited Fitness Boxing + Open Gym\n\n⭐ Full Member — $129/mo (Most Popular)\n   All Classes + Sparring + 1 Free PT/Month\n\n🏆 Competitive — $179/mo\n   Everything + Fight Camp + 2 PT Sessions\n\nYouth pricing available separately. First class always FREE!",
        pricing: "Our membership starts at $89/month.\n\n💳 Fitness Member — $89/mo\n🥊 Full Member — $129/mo\n🏆 Competitive — $179/mo\n\nYouth program has separate pricing. Family discounts available.\n\nCall us at (555) 123-4567 for current promotions!",
        contact: "📞 Call/Text: (555) 123-4567\n📧 Email: info@oldschoolboxing.com\n📍 Location: Your City, State\n⏰ Mon–Sat 6am–9pm · Sun 8am–2pm\n🏠 Instagram: @oldschoolboxingfc\n\nWe respond fast — usually within the hour!",
        about: "Old School Boxing & Fitness Center is a real boxing gym with experienced coaches and an authentic training environment.\n\nWe serve beginners, fitness members, youth athletes, and competitive fighters.\n\n15+ years of legacy · 5-star rated · 500+ members · Real community 🥊",
    };

    function getAIResponse(msg) {
        const lower = msg.toLowerCase();
        if (lower.includes('trial') || lower.includes('free class') || lower.includes('first class') || lower.includes('start') || lower.includes('begin') || lower.includes('book')) return KB.trial;
        if (lower.includes('youth') || lower.includes('kid') || lower.includes('child') || lower.includes('age') || lower.includes('son') || lower.includes('daughter') || lower.includes('junior')) return KB.youth;
        if (lower.includes('adult') || lower.includes('beginner') || lower.includes('new to') || lower.includes('never boxed') || lower.includes('fundamentals')) return KB.adult;
        if (lower.includes('fitness') || lower.includes('cardio') || lower.includes('weight') || lower.includes('calorie') || lower.includes('non-contact') || lower.includes('workout')) return KB.fitness;
        if (lower.includes('compet') || lower.includes('fight') || lower.includes('spar') || lower.includes('amateur') || lower.includes('tournament') || lower.includes('bout')) return KB.competitive;
        if (lower.includes('personal') || lower.includes('private') || lower.includes('one on one') || lower.includes('1 on 1') || lower.includes('pt session')) return KB.pt;
        if (lower.includes('program') || lower.includes('class') || lower.includes('offer') || lower.includes('what do you') || lower.includes('what do we')) return KB.programs;
        if (lower.includes('schedule') || lower.includes('time') || lower.includes('when') || lower.includes('hour') || lower.includes('open')) return KB.schedule;
        if (lower.includes('membership') || lower.includes('join') || lower.includes('sign up') || lower.includes('member') || lower.includes('enroll')) return KB.membership;
        if (lower.includes('price') || lower.includes('cost') || lower.includes('how much') || lower.includes('rate') || lower.includes('fee') || lower.includes('pay')) return KB.pricing;
        if (lower.includes('contact') || lower.includes('call') || lower.includes('phone') || lower.includes('email') || lower.includes('address') || lower.includes('location') || lower.includes('where')) return KB.contact;
        if (lower.includes('about') || lower.includes('who') || lower.includes('gym') || lower.includes('history') || lower.includes('story')) return KB.about;
        return "Thanks for reaching out to Old School Boxing & Fitness Center! 🥊\n\nI can help with:\n• Booking your FREE trial class\n• Youth & adult programs\n• Class schedule & times\n• Membership & pricing\n• Competitive training\n\nOr call us directly: 📞 (555) 123-4567";
    }

    function addMessage(text, isBot = false) {
        const quickReplies = document.getElementById('wa-quick-replies');
        const msgDiv = document.createElement('div');
        msgDiv.className = `wa-msg ${isBot ? 'wa-msg-bot' : 'wa-msg-user'}`;
        const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        msgDiv.innerHTML = `<p>${text.replace(/\n/g, '<br>')}</p><span class="wa-time">${time}</span>`;
        if (quickReplies) {
            waChatBody.insertBefore(msgDiv, quickReplies);
        } else {
            waChatBody.appendChild(msgDiv);
        }
        waChatBody.scrollTop = waChatBody.scrollHeight;
        return msgDiv;
    }

    function handleUserMessage(msg) {
        if (!msg.trim()) return;
        addMessage(msg, false);
        if (waInput) waInput.value = '';
        const qr = document.getElementById('wa-quick-replies');
        if (qr) qr.style.display = 'none';
        const typing = document.createElement('div');
        typing.className = 'wa-msg wa-msg-bot';
        typing.innerHTML = '<p>✏️ typing...</p>';
        waChatBody.appendChild(typing);
        waChatBody.scrollTop = waChatBody.scrollHeight;
        setTimeout(() => {
            typing.remove();
            addMessage(getAIResponse(msg), true);
        }, 700 + Math.random() * 400);
    }

    if (waFab && waChatWindow) {
        waFab.addEventListener('click', () => waChatWindow.classList.toggle('open'));
        if (waClose) waClose.addEventListener('click', () => waChatWindow.classList.remove('open'));
    }
    if (waSend) waSend.addEventListener('click', () => handleUserMessage(waInput.value));
    if (waInput) waInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleUserMessage(waInput.value);
    });
    document.querySelectorAll('.wa-quick').forEach(btn => {
        btn.addEventListener('click', () => handleUserMessage(btn.dataset.msg));
    });

    /* ─── 10. NOTIFICATION BUBBLE ─── */
    const notifBubble = document.getElementById('wa-notif-bubble');
    const notifText = document.getElementById('wa-notif-text');
    const waFabBtn = document.getElementById('wa-fab');
    const waChatWin = document.getElementById('wa-chat-window');

    const NOTIF_MESSAGES = [
        'Book your FREE trial class! 🥊',
        'Youth boxing — ages 6-17!',
        'All skill levels welcome!',
        'Competitive training available!',
        'Fitness boxing — burn 800 cal! 🔥',
        'Call (555) 123-4567 today!',
    ];

    let notifIndex = 0;
    let notifTimer = null;
    let notifHideTimer = null;
    let bubbleDismissed = false;

    function showNotif() {
        if (bubbleDismissed || !notifBubble) return;
        if (waChatWin && waChatWin.classList.contains('open')) return;
        if (notifText) notifText.textContent = NOTIF_MESSAGES[notifIndex % NOTIF_MESSAGES.length];
        notifIndex++;
        notifBubble.classList.add('show');
        clearTimeout(notifHideTimer);
        notifHideTimer = setTimeout(() => notifBubble.classList.remove('show'), 4000);
    }

    if (notifBubble) {
        setTimeout(() => {
            showNotif();
            notifTimer = setInterval(showNotif, 8000);
        }, 3000);

        if (waFabBtn) {
            waFabBtn.addEventListener('click', () => {
                bubbleDismissed = true;
                notifBubble.classList.remove('show');
                clearInterval(notifTimer);
                clearTimeout(notifHideTimer);
            });
        }

        notifBubble.style.pointerEvents = 'auto';
        notifBubble.style.cursor = 'pointer';
        notifBubble.addEventListener('click', () => {
            if (waChatWin) waChatWin.classList.add('open');
            bubbleDismissed = true;
            notifBubble.classList.remove('show');
            clearInterval(notifTimer);
        });
    }

    /* ─── 11. MOBILE STICKY BAR ─── */
    const mobileSticky = document.getElementById('mobile-sticky');
    if (mobileSticky) mobileSticky.classList.add('visible');

    /* ─── 12. STICKY QUOTE BTN ─── */
    const stickyQuoteBtn = document.getElementById('sticky-quote-btn');
    if (stickyQuoteBtn) stickyQuoteBtn.addEventListener('click', () => openModal());

    /* ─── 13. ORB PARALLAX ─── */
    window.addEventListener('mousemove', (e) => {
        const orbs = document.querySelectorAll('.orb');
        const mx = e.clientX / window.innerWidth - 0.5;
        const my = e.clientY / window.innerHeight - 0.5;
        orbs.forEach((orb, i) => {
            const depth = (i + 1) * 10;
            orb.style.transform = `translate(${mx * depth}px, ${my * depth}px)`;
        });
    });

    /* ─── 14. SERVICE CARD TILT ─── */
    document.querySelectorAll('.service-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;
            card.style.transform = `perspective(600px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg) translateY(-4px)`;
        });
        card.addEventListener('mouseleave', () => card.style.transform = '');
    });

    /* ─── 15. STAT COUNTER ANIMATION ─── */
    const stats = document.querySelectorAll('.stat-number');
    if (stats.length) {
        const countObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    const text = el.innerHTML;
                    const numMatch = text.replace(/<[^>]*>/g, '').match(/^[\d.]+/);
                    if (numMatch) {
                        const target = parseFloat(numMatch[0]);
                        const isFloat = numMatch[0].includes('.');
                        let current = 0;
                        const step = target / 40;
                        const timer = setInterval(() => {
                            current += step;
                            if (current >= target) { current = target; clearInterval(timer); }
                            el.innerHTML = el.innerHTML.replace(/[\d.]+/, isFloat ? current.toFixed(1) : Math.floor(current));
                        }, 30);
                    }
                    countObserver.unobserve(el);
                }
            });
        }, { threshold: 0.5 });
        stats.forEach(s => countObserver.observe(s));
    }

    /* ─── 16. REVIEW MODAL ─── */
    const reviewModal = document.getElementById('review-modal');
    const reviewModalClose = document.getElementById('review-modal-close');
    const openReviewBtn = document.getElementById('open-review-btn');
    const stickyReviewBtn = document.getElementById('sticky-review-btn');
    const step1 = document.getElementById('review-step-1');
    const stepFeed = document.getElementById('review-step-feedback');
    const stepGoogle = document.getElementById('review-step-google');
    const stepDone = document.getElementById('review-step-done');
    const stars = document.querySelectorAll('.star');

    function showStep(step) {
        [step1, stepFeed, stepGoogle, stepDone].forEach(s => { if (s) s.classList.add('hidden'); });
        if (step) step.classList.remove('hidden');
    }
    function openReviewModal(e) {
        if (e) e.preventDefault();
        showStep(step1);
        if (reviewModal) { reviewModal.classList.add('active'); document.body.style.overflow = 'hidden'; }
    }
    function closeReviewModal() {
        if (reviewModal) { reviewModal.classList.remove('active'); document.body.style.overflow = ''; }
    }

    if (openReviewBtn) openReviewBtn.addEventListener('click', openReviewModal);
    if (stickyReviewBtn) stickyReviewBtn.addEventListener('click', (e) => { e.preventDefault(); openReviewModal(); });
    if (reviewModalClose) reviewModalClose.addEventListener('click', closeReviewModal);
    if (reviewModal) reviewModal.addEventListener('click', (e) => { if (e.target === reviewModal) closeReviewModal(); });

    stars.forEach((star, idx) => {
        star.addEventListener('mouseenter', () => stars.forEach((s, i) => s.classList.toggle('hover', i <= idx)));
        star.addEventListener('mouseleave', () => stars.forEach(s => s.classList.remove('hover')));
        star.addEventListener('click', () => {
            const rating = parseInt(star.dataset.value, 10);
            stars.forEach((s, i) => { s.classList.toggle('active', i < rating); s.classList.remove('hover'); });
            setTimeout(() => showStep(rating <= 3 ? stepFeed : stepGoogle), 350);
        });
    });

    const privateFeedbackForm = document.getElementById('private-feedback-form');
    if (privateFeedbackForm) {
        privateFeedbackForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = privateFeedbackForm.querySelector('button[type="submit"]');
            btn.textContent = '✓ Sending…';
            btn.disabled = true;
            setTimeout(() => {
                privateFeedbackForm.reset();
                btn.textContent = 'Send Feedback';
                btn.disabled = false;
                showStep(stepDone);
            }, 1200);
        });
    }

    const skipBtn = document.getElementById('review-skip-btn');
    const doneCloseBtn = document.getElementById('review-done-close');
    if (skipBtn) skipBtn.addEventListener('click', closeReviewModal);
    if (doneCloseBtn) doneCloseBtn.addEventListener('click', closeReviewModal);

    /* ─── 17. ENTRY MODAL ─── */
    const entryModal = document.getElementById('entry-modal');
    const entryClose = document.getElementById('entry-modal-close');
    const entryGetEstimate = document.getElementById('entry-get-estimate');
    const entryDismiss = document.getElementById('entry-dismiss');

    if (entryModal) {
        const entryShown = sessionStorage.getItem('osbfc_entry_shown');
        if (!entryShown) {
            setTimeout(() => {
                entryModal.classList.remove('hidden');
                document.body.style.overflow = 'hidden';
            }, 5000);
        }

        function closeEntryModal() {
            entryModal.classList.add('hidden');
            document.body.style.overflow = '';
            sessionStorage.setItem('osbfc_entry_shown', '1');
        }

        if (entryClose) entryClose.addEventListener('click', closeEntryModal);
        if (entryDismiss) entryDismiss.addEventListener('click', closeEntryModal);
        entryModal.addEventListener('click', (e) => { if (e.target === entryModal) closeEntryModal(); });

        if (entryGetEstimate) {
            entryGetEstimate.addEventListener('click', () => {
                closeEntryModal();
                const trialForm = document.getElementById('trial-form');
                if (trialForm) trialForm.scrollIntoView({ behavior: 'smooth' });
                else window.location.href = '/contact/';
            });
        }
    }

    /* ─── 18. ACTIVE NAV LINK ─── */
    const currentPath = window.location.pathname;
    document.querySelectorAll('.nav-links a').forEach(a => {
        const href = a.getAttribute('href');
        if (href === currentPath || (currentPath === '/' && href === '/') || (currentPath !== '/' && href !== '/' && currentPath.startsWith(href))) {
            a.classList.add('active');
        } else {
            a.classList.remove('active');
        }
    });

});
