// ===== HAMBURGER TOGGLE =====
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
});

document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('open');
    });
});

// ===== NAVBAR SHADOW =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
        navbar.style.boxShadow = '0 4px 30px rgba(0,0,0,0.3)';
    } else {
        navbar.style.boxShadow = 'none';
    }
});

// ===== SMOOTH ANCHOR SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// ===== REPLAY INSTALL ANIMATION =====
function replayInstallAnimation() {
    const codeBlock = document.querySelector('.install .code-block');
    if (!codeBlock) return;

    const typingEl = codeBlock.querySelector('.linetyping');
    const lineEls = codeBlock.querySelectorAll('.line');

    if (typingEl) {
        typingEl.classList.remove('linetyping');
        typingEl.style.width = '0';
        typingEl.style.animation = 'none';
        typingEl.style.opacity = '1';
    }

    lineEls.forEach(el => {
        el.classList.remove('line');
        el.style.opacity = '0';
        el.style.transform = 'translateY(6px)';
        el.style.animation = 'none';
    });

    void codeBlock.offsetHeight;

    if (typingEl) {
        setTimeout(() => {
            typingEl.classList.add('linetyping');
            typingEl.style.width = '';
            typingEl.style.animation = '';
            typingEl.style.opacity = '';
        }, 30);
    }

    lineEls.forEach((el, index) => {
        const delay = 30 + (index + 1) * 60;
        setTimeout(() => {
            el.classList.add('line');
            el.style.opacity = '';
            el.style.transform = '';
            el.style.animation = '';
        }, delay);
    });
}

document.querySelectorAll('a[href="#install"]').forEach(link => {
    link.addEventListener('click', function() {
        setTimeout(replayInstallAnimation, 200);
    });
});

document.querySelectorAll('a[href="#features"]').forEach(link => {
    link.addEventListener('click', function() {
        setTimeout(replayInstallAnimation, 200);
    });
});

let lastReplayTime = 0;
document.addEventListener('click', function(e) {
    const installSection = document.getElementById('install');
    if (!installSection) return;
    if (installSection.contains(e.target)) {
        const now = Date.now();
        if (now - lastReplayTime > 1500) {
            lastReplayTime = now;
            replayInstallAnimation();
        }
    }
});

// ===== VIDEO THUMBNAIL + LIGHTBOX =====
document.addEventListener('DOMContentLoaded', () => {
    const thumbs = document.querySelectorAll('.video-thumb');
    const modal = document.getElementById('videoModal');
    const backdrop = document.getElementById('modalBackdrop');
    const closeBtn = document.getElementById('modalClose');
    const modalVideo = document.getElementById('modalVideo');

    if (!modal || !modalVideo) return;

    // Buka modal saat thumbnail diklik
    thumbs.forEach(thumb => {
        thumb.addEventListener('click', () => {
            const src = thumb.dataset.videoSrc;
            if (!src) {
                console.warn('No video source found for thumbnail');
                return;
            }

            // Set source video
            const source = modalVideo.querySelector('source');
            if (source) {
                source.src = src;
            } else {
                // fallback: buat source jika tidak ada
                const newSource = document.createElement('source');
                newSource.src = src;
                newSource.type = 'video/mp4';
                modalVideo.appendChild(newSource);
            }
            modalVideo.load();
            
            // Tampilkan modal
            modal.classList.add('open');
            modalVideo.play().catch(err => {
                console.warn('Autoplay prevented:', err);
            });
        });
    });

    // Tutup modal
    const closeModal = () => {
        modal.classList.remove('open');
        modalVideo.pause();
        // Reset src agar stop loading
        const source = modalVideo.querySelector('source');
        if (source) {
            source.src = '';
            modalVideo.load();
        }
    };

    backdrop.addEventListener('click', closeModal);
    closeBtn.addEventListener('click', closeModal);

    // Tutup dengan tombol ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('open')) {
            closeModal();
        }
    });
});

// ===== IMAGE LIGHTBOX ZOOM =====
document.addEventListener('DOMContentLoaded', () => {
    const piiCards = document.querySelectorAll('.pii-card');
    const imageModal = document.getElementById('imageModal');
    const modalBackdrop = document.getElementById('imageModalBackdrop');
    const modalClose = document.getElementById('imageModalClose');
    const modalImage = document.getElementById('modalImage');

    piiCards.forEach(card => {
        card.addEventListener('click', () => {
            const src = card.dataset.imgSrc || card.querySelector('img')?.src;
            if (!src) return;
            modalImage.src = src;
            imageModal.classList.add('open');
        });
    });

    const closeImageModal = () => {
        imageModal.classList.remove('open');
        modalImage.src = '';
    };

    modalBackdrop.addEventListener('click', closeImageModal);
    modalClose.addEventListener('click', closeImageModal);
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && imageModal.classList.contains('open')) {
            closeImageModal();
        }
    });
});