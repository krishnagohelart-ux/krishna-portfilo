/* =====================================================
   KRISHNA PORTFOLIO - JAVASCRIPT
   ===================================================== */

document.addEventListener("DOMContentLoaded", function () {

    /* =================================================
       1. TYPING EFFECT
       ================================================= */

    const typingElement = document.getElementById("typing");

    if (typingElement) {

        const words = [
            "AI Engineer",
            "Developer",
            "Problem Solver",
            "Tech Enthusiast"
        ];

        let wordIndex = 0;
        let charIndex = 0;
        let deleting = false;

        function typeEffect() {

            const currentWord = words[wordIndex];

            if (!deleting) {

                typingElement.textContent =
                    currentWord.substring(0, charIndex + 1);

                charIndex++;

                if (charIndex === currentWord.length) {

                    deleting = true;

                    setTimeout(typeEffect, 1500);
                    return;
                }

            } else {

                typingElement.textContent =
                    currentWord.substring(0, charIndex - 1);

                charIndex--;

                if (charIndex === 0) {

                    deleting = false;

                    wordIndex++;

                    if (wordIndex >= words.length) {
                        wordIndex = 0;
                    }
                }
            }

            setTimeout(
                typeEffect,
                deleting ? 60 : 100
            );
        }

        typeEffect();
    }


    /* =================================================
       2. SCROLL REVEAL
       ================================================= */

    const revealElements =
        document.querySelectorAll(".reveal");

    if ("IntersectionObserver" in window) {

        const revealObserver =
            new IntersectionObserver(
                function (entries, observer) {

                    entries.forEach(function (entry) {

                        if (entry.isIntersecting) {

                            entry.target.classList.add("show");

                            observer.unobserve(entry.target);
                        }

                    });

                },
                {
                    threshold: 0.15
                }
            );

        revealElements.forEach(function (element) {
            revealObserver.observe(element);
        });

    } else {

        revealElements.forEach(function (element) {
            element.classList.add("show");
        });
    }


    /* =================================================
       3. COUNTER ANIMATION
       ================================================= */

    const counters =
        document.querySelectorAll(".counter");

    function startCounter(counter) {

        const target =
            Number(counter.getAttribute("data-target"));

        if (isNaN(target)) {
            return;
        }

        let current = 0;

        const duration = 1200;
        const startTime = performance.now();

        function updateCounter(currentTime) {

            const progress =
                Math.min(
                    (currentTime - startTime) / duration,
                    1
                );

            current =
                Math.floor(progress * target);

            counter.textContent = current;

            if (progress < 1) {

                requestAnimationFrame(updateCounter);

            } else {

                counter.textContent = target;
            }
        }

        requestAnimationFrame(updateCounter);
    }


    if ("IntersectionObserver" in window) {

        const counterObserver =
            new IntersectionObserver(
                function (entries, observer) {

                    entries.forEach(function (entry) {

                        if (entry.isIntersecting) {

                            startCounter(entry.target);

                            observer.unobserve(entry.target);
                        }

                    });

                },
                {
                    threshold: 0.5
                }
            );

        counters.forEach(function (counter) {
            counterObserver.observe(counter);
        });

    } else {

        counters.forEach(function (counter) {
            startCounter(counter);
        });
    }


    /* =================================================
       4. PARTICLES BACKGROUND
       ================================================= */

    const canvas =
        document.getElementById("particles");

    if (canvas) {

        const ctx = canvas.getContext("2d");

        let particles = [];

        function resizeCanvas() {

            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }

        resizeCanvas();

        window.addEventListener(
            "resize",
            resizeCanvas
        );


        function createParticles() {

            particles = [];

            const particleCount =
                Math.min(
                    100,
                    Math.floor(window.innerWidth / 12)
                );

            for (let i = 0; i < particleCount; i++) {

                particles.push({

                    x: Math.random() * canvas.width,

                    y: Math.random() * canvas.height,

                    size:
                        Math.random() * 2 + 0.5,

                    speedX:
                        (Math.random() - 0.5) * 0.4,

                    speedY:
                        (Math.random() - 0.5) * 0.4,

                    opacity:
                        Math.random() * 0.6 + 0.2
                });
            }
        }

        createParticles();


        function drawParticles() {

            ctx.clearRect(
                0,
                0,
                canvas.width,
                canvas.height
            );

            particles.forEach(function (particle) {

                ctx.beginPath();

                ctx.arc(
                    particle.x,
                    particle.y,
                    particle.size,
                    0,
                    Math.PI * 2
                );

                ctx.fillStyle =
                    `rgba(216,183,122,${particle.opacity})`;

                ctx.fill();


                particle.x += particle.speedX;
                particle.y += particle.speedY;


                if (particle.x < 0) {
                    particle.x = canvas.width;
                }

                if (particle.x > canvas.width) {
                    particle.x = 0;
                }

                if (particle.y < 0) {
                    particle.y = canvas.height;
                }

                if (particle.y > canvas.height) {
                    particle.y = 0;
                }
            });

            requestAnimationFrame(drawParticles);
        }

        drawParticles();
    }


    /* =================================================
       5. ACTIVE NAVIGATION
       ================================================= */

    const sections =
        document.querySelectorAll("section[id]");

    const navLinks =
        document.querySelectorAll(
            ".nav-links a"
        );

    function updateActiveNav() {

        let currentSection = "";

        sections.forEach(function (section) {

            const sectionTop =
                section.offsetTop - 150;

            const sectionHeight =
                section.offsetHeight;

            if (
                window.scrollY >= sectionTop &&
                window.scrollY <
                sectionTop + sectionHeight
            ) {

                currentSection =
                    section.getAttribute("id");
            }
        });


        navLinks.forEach(function (link) {

            link.classList.remove("active");

            const href =
                link.getAttribute("href");

            if (
                href === "#" + currentSection
            ) {

                link.classList.add("active");
            }
        });
    }

    window.addEventListener(
        "scroll",
        updateActiveNav
    );

    updateActiveNav();


    /* =================================================
       6. SMOOTH SCROLL
       ================================================= */

    navLinks.forEach(function (link) {

        link.addEventListener(
            "click",
            function (event) {

                const targetId =
                    link.getAttribute("href");

                if (
                    targetId &&
                    targetId.startsWith("#")
                ) {

                    const target =
                        document.querySelector(
                            targetId
                        );

                    if (target) {

                        event.preventDefault();

                        target.scrollIntoView({
                            behavior: "smooth"
                        });
                    }
                }
            }
        );
    });


    /* =================================================
       7. MOUSE GLOW EFFECT
       ================================================= */

    document.addEventListener(
        "mousemove",
        function (event) {

            document.documentElement.style.setProperty(
                "--mouse-x",
                event.clientX + "px"
            );

            document.documentElement.style.setProperty(
                "--mouse-y",
                event.clientY + "px"
            );
        }
    );


    /* =================================================
       8. PROJECT CARD TILT
       ================================================= */

    const cards =
        document.querySelectorAll(".project-card");

    cards.forEach(function (card) {

        card.addEventListener(
            "mousemove",
            function (event) {

                const rect =
                    card.getBoundingClientRect();

                const x =
                    event.clientX - rect.left;

                const y =
                    event.clientY - rect.top;

                const centerX =
                    rect.width / 2;

                const centerY =
                    rect.height / 2;

                const rotateX =
                    ((y - centerY) / centerY) * -4;

                const rotateY =
                    ((x - centerX) / centerX) * 4;

                card.style.transform =
                    `perspective(800px)
                     rotateX(${rotateX}deg)
                     rotateY(${rotateY}deg)
                     translateY(-8px)`;
            }
        );


        card.addEventListener(
            "mouseleave",
            function () {

                card.style.transform = "";
            }
        );
    });


    /* =================================================
       9. CONSOLE MESSAGE
       ================================================= */

    console.log(
        "🚀 Krishna Portfolio Loaded Successfully!"
    );

});
/* =========================================
   PROJECT DETAILS MODAL
========================================= */

const projectModal = document.getElementById("projectModal");
const closeProjectModal = document.getElementById("closeProjectModal");

const modalTitle = document.getElementById("modalTitle");
const modalDescription = document.getElementById("modalDescription");
const modalTech = document.getElementById("modalTech");
const modalStatus = document.getElementById("modalStatus");

const modalGithub = document.getElementById("modalGithub");
const modalDemo = document.getElementById("modalDemo");


const projectData = {

    krishara: {
        title: "KRISHARA Luxury Fashion",
        status: "WEB PROJECT",
        description:
            "A premium luxury fashion website inspired by modern Indian elegance, designed with a futuristic glass-style interface.",
        tech: ["HTML", "CSS", "JavaScript", "UI Design"]
    },

    expense: {
        title: "Family Expense Tracker",
        status: "WEB APP",
        description:
            "A personal finance project designed to track family expenses, income and wealth information through a simple dashboard.",
        tech: ["HTML", "CSS", "JavaScript", "Dashboard"]
    },

    crypto: {
        title: "Cryptography Project",
        status: "SECURITY PROJECT",
        description:
            "A learning project focused on cryptography concepts including encryption, decryption and classical security algorithms.",
        tech: ["Python", "Cryptography", "RSA", "Security"]
    }

};


function openProject(project) {

    const data = projectData[project];

    if (!data) return;

    modalTitle.textContent = data.title;

    modalStatus.textContent = data.status;

    modalDescription.textContent = data.description;

    modalTech.innerHTML = "";

    data.tech.forEach(function (tech) {

        const tag = document.createElement("span");

        tag.textContent = tech;

        modalTech.appendChild(tag);

    });

    modalGithub.href = "#";
    modalDemo.href = "#";

    projectModal.classList.add("active");

}


function closeModal() {

    projectModal.classList.remove("active");

}


closeProjectModal.addEventListener(
    "click",
    closeModal
);


projectModal.addEventListener(
    "click",
    function (event) {

        if (event.target === projectModal) {
            closeModal();
        }

    }
);
/* =========================================
   BACK TO TOP
========================================= */

const backToTop = document.getElementById("backToTop");

if (backToTop) {

    window.addEventListener("scroll", function () {

        if (window.scrollY > 500) {

            backToTop.classList.add("show");

        } else {

            backToTop.classList.remove("show");

        }

    });


    backToTop.addEventListener("click", function () {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });

}
/* =========================================
   CURSOR GLOW
========================================= */

const cursorGlow = document.querySelector(".cursor-glow");

if (cursorGlow) {

    document.addEventListener("mousemove", function (event) {

        cursorGlow.style.left = event.clientX + "px";
        cursorGlow.style.top = event.clientY + "px";

    });

}
