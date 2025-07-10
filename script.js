
        document.addEventListener('DOMContentLoaded', function() {
    const mobileMenu = document.getElementById('mobile-menu');
    const menuButton = document.getElementById('menu-button');

    // Function to toggle the mobile menu
    const toggleMenu = () => {
        mobileMenu.classList.toggle('hidden');
    };

    // Event listener for the menu button
    menuButton.addEventListener('click', toggleMenu);

    // Close the menu when a link is clicked
    document.querySelectorAll('#mobile-menu a').forEach(link => {
        link.addEventListener('click', () => {
            if (!mobileMenu.classList.contains('hidden')) {
                toggleMenu();
            }
        });
    });

    // Scroll to sections with offset
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80, // Adjusted for fixed header
                    behavior: 'smooth'
                });
            }
        });
    });

    // Typing effect for hero section
    const typedTextElement = document.getElementById('typed-text');
    const phrases = ["Développeur Full-Stack", "Designer UX/UI"];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeWriter() {
        const currentPhrase = phrases[phraseIndex];
        if (isDeleting) {
            typedTextElement.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typedTextElement.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
        }

        if (!isDeleting && charIndex === currentPhrase.length) {
            setTimeout(() => isDeleting = true, 1000); // Pause at end of typing
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
        }

        const typingSpeed = isDeleting ? 50 : 100; // Faster deleting
        setTimeout(typeWriter, typingSpeed);
    }

    typeWriter(); // Start the typing effect

    // Floating cube rotation
    const cube = document.querySelector('.interactive-cube');
    if (cube) {
        document.addEventListener('mousemove', function(e) {
            const x = (e.clientX / window.innerWidth) * 180 - 90;
            const y = (e.clientY / window.innerHeight) * 180 - 90;
            cube.style.transform = `rotateX(${-y}deg) rotateY(${x}deg)`;
        });
    }

    // Contact Form Submission
    const form = document.getElementById('contact-form');
    const formResult = document.getElementById('form-result');

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const formData = new FormData(form);
        const object = {};
        formData.forEach((value, key) => {
            object[key] = value;
        });
        const json = JSON.stringify(object);
        formResult.innerHTML = "Envoi en cours...";

        fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: json
        })
        .then(async (response) => {
            let jsonResponse = await response.json();
            if (response.status == 200) {
                formResult.innerHTML = jsonResponse.message;
            } else {
                console.log(response);
                formResult.innerHTML = jsonResponse.message;
            }
        })
        .catch(error => {
            console.log(error);
            formResult.innerHTML = "Une erreur s'est produite.";
        })
        .then(function() {
            form.reset();
            setTimeout(() => {
                formResult.style.display = "none";
            }, 3000);
        });
    });
});
    