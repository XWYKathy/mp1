const NAV_SCROLL_OFFSET = 90;

function initNav() {
    const navbar = document.getElementById("navbar");
    const navLinks = document.querySelectorAll(".nav-container a");
    const sections = document.querySelectorAll("header[id], section[id]");

    if (!navbar || navLinks.length === 0 || sections.length === 0) {
        return;
    }

    let lockedSection = null;

    function setActiveNav(sectionId) {
        navLinks.forEach((link) => {
            link.classList.toggle(
                "active",
                link.hash === `#${sectionId}`
            );
        });
    }

    function updateNavbarState() {
        navbar.classList.toggle("small", window.scrollY > 50);

        const atBottom =
            window.innerHeight + window.scrollY >=
            document.documentElement.scrollHeight - 2;

        /*
         * If the user clicked a navbar link, keep that link highlighted
         * until the target section reaches the navbar offset.
         */
        if (lockedSection) {
            const targetSection =
                document.getElementById(lockedSection);

            const targetReached =
                targetSection &&
                targetSection.getBoundingClientRect().top <=
                    NAV_SCROLL_OFFSET + 5;

            if (targetReached || atBottom) {
                lockedSection = null;
            } else {
                setActiveNav(lockedSection);
                return;
            }
        }

        let currentSection = "";

        sections.forEach((section) => {
            const sectionTop =
                section.getBoundingClientRect().top;

            if (sectionTop <= NAV_SCROLL_OFFSET + 5) {
                currentSection = section.id;
            }
        });

        if (atBottom) {
            currentSection =
                sections[sections.length - 1].id;
        }

        setActiveNav(currentSection);
    }

    navLinks.forEach((link) => {
        link.addEventListener("click", () => {
            lockedSection = link.hash.slice(1);
            setActiveNav(lockedSection);
        });
    });

    window.addEventListener("scroll", updateNavbarState);

    updateNavbarState();
}

function initCarousel() {
    const slides = document.querySelectorAll(".slide");
    const prevButton = document.querySelector(".prev");
    const nextButton = document.querySelector(".next");

    if (
        slides.length === 0 ||
        !prevButton ||
        !nextButton
    ) {
        return;
    }

    let currentSlide = 0;

    function showSlide(index) {
        currentSlide =
            (index + slides.length) % slides.length;

        slides.forEach((slide, i) => {
            slide.classList.toggle(
                "active",
                i === currentSlide
            );
        });
    }

    prevButton.addEventListener("click", () => {
        showSlide(currentSlide - 1);
    });

    nextButton.addEventListener("click", () => {
        showSlide(currentSlide + 1);
    });

    showSlide(currentSlide);
}

function initModal() {
    const modal = document.getElementById("project-modal");
    const modalButtons =
        document.querySelectorAll(".modal-button");

    if (!modal || modalButtons.length === 0) {
        return;
    }

    modalButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const modalTitle = modal.querySelector("h2");
            const modalBody = modal.querySelector("p");

            if (modalTitle && button.dataset.modalTitle) {
                modalTitle.textContent = button.dataset.modalTitle;
            }

            if (modalBody && button.dataset.modalBody) {
                modalBody.textContent = button.dataset.modalBody;
            }

            modal.classList.add("show");
        });
    });

    modal.addEventListener("click", (event) => {
        if (
            event.target === modal ||
            event.target.closest(".modal-close")
        ) {
            modal.classList.remove("show");
        }
    });
}

initNav();
initCarousel();
initModal();
