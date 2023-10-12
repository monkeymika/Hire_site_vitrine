/**************************** Loader ********************************/
let loaderTimeline = gsap.timeline({ paused: true });

// Première partie : Animation de disparition des barres
loaderTimeline.staggerTo(".bar", 0.6, {
    width: "0%",
    ease: "power2.inOut",
}, -0.1);  // Remarque le '-' devant 0.1 pour inverser l'ordre de l'animation.

// Ajout d'une pause
loaderTimeline.to(".bar", { delay: 0.7, onComplete: function () { } }); // Pause de 0,7 seconde

// Deuxième partie : Animation d'apparition des barres (inverse de la première partie)
loaderTimeline.staggerTo(".bar", 0.6, {
    width: "20%",
    ease: "power2.inOut",
}, 0.1);

// Troisième partie : Faire disparaître le loader immédiatement après la fin de l'animation des barres
loaderTimeline.to("#loader", {
    opacity: 0,
    duration: 0.5,
    onComplete: function () {
        document.getElementById("loader").style.display = "none";
    }
});

window.addEventListener("load", () => {
    loaderTimeline.play();
});


/**************************** Apparition de la Hero Section ********************************/
// On commence par définir une fonction pour initialiser les éléments à animer
function setInitialStates() {
    gsap.set("nav", { x: 100, opacity: 0 });
    gsap.set("#hirePhone", { x: -100, opacity: 0 });
    gsap.set(".hero-content", { opacity: 0 });
}

setInitialStates(); // On appelle la fonction au chargement du JS

// Ensuite, on ajoute ces animations à la fin de notre timeline loader
loaderTimeline.to("nav", { x: 0, opacity: 1, duration: 0.4 });
loaderTimeline.to("#hirePhone", { x: 0, opacity: 1, duration: 0.6 }, "-=0.2"); // chevauche avec l'animation précédente
loaderTimeline.to(".hero-content", { opacity: 1, duration: 0.8 }, "-=0.2"); // chevauche également

// Puis on joue la timeline comme avant lorsque la page est chargée
window.addEventListener("load", () => {
    loaderTimeline.play();
});


/**************************** Animation navBar ********************************/
window.addEventListener("scroll", function () {
    const nav = document.querySelector("nav");
    if (window.scrollY > 10) {  // Changer 10 en fonction de la position où vous voulez que la modification se produise
        nav.classList.add("nav-scrolled");
    } else {
        nav.classList.remove("nav-scrolled");
    }
});



/**************************** Animation Hero Section ********************************/

gsap.to("#hirePhone", {
    y: 10,
    duration: 0.6,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut"
});

/**************************** Animation Swipe ********************************/
let tl = gsap.timeline({ repeat: -1 });

// Basculer à gauche
tl.to("#screenHireSwipe", { duration: 0.5, rotate: "-15deg", ease: "power1.inOut" })

    // Changement d'image
    .add(() => {
        document.querySelector("#screenHireSwipe").src = "./images/matchNo.png";
    })

    // "Pause" en maintenant la position
    .to("#screenHireSwipe", { duration: 0.6, rotate: "-15deg" })

    // Rétablir l'image originale
    .add(() => {
        document.querySelector("#screenHireSwipe").src = "./images/screenHireSwipe.png";
    })

    // Revenir à la position initiale
    .to("#screenHireSwipe", { duration: 0.5, rotate: "0deg", ease: "power1.inOut" })

    // Basculer à droite
    .to("#screenHireSwipe", { duration: 0.5, rotate: "15deg", ease: "power1.inOut" })

    // Changement d'image
    .add(() => {
        document.querySelector("#screenHireSwipe").src = "./images/matchYes.png";
    })

    // "Pause" en maintenant la position
    .to("#screenHireSwipe", { duration: 0.6, rotate: "15deg" })

    // Rétablir l'image originale
    .add(() => {
        document.querySelector("#screenHireSwipe").src = "./images/screenHireSwipe.png";
    })

    // Revenir à la position initiale
    .to("#screenHireSwipe", { duration: 0.5, rotate: "0deg", ease: "power1.inOut" });


/**************************** Animation Match Section ********************************/

gsap.to("#matchPhone", {
    scale: 1.02, // Scale 1.1 = 110% de la taille originale
    duration: 0.8,
    repeat: -1, // Répète indéfiniment
    yoyo: true, // Retourne à l'état original
    ease: "sine.inOut"
});
/**************************** Animation Profil section ********************************/

gsap.to("#profilPhone", {
    scale: 1.02, // Scale 1.1 = 110% de la taille originale
    duration: 0.8,
    repeat: -1, // Répète indéfiniment
    yoyo: true, // Retourne à l'état original
    ease: "sine.inOut"
});
/**************************** Animation Du H de la section Contact ********************************/

gsap.to("#logoH", {
    scale: 1.1, // Scale 1.1 = 110% de la taille originale
    duration: 0.8,
    repeat: -1, // Répète indéfiniment
    yoyo: true, // Retourne à l'état original
    ease: "sine.inOut"
});


/********************* Animation du losange en arriére plan ************************/

// Capture la taille initiale ici
let initialSize = document.getElementById("diamond").offsetWidth;

function handleScroll() {
    const scrollPosition = window.scrollY;

    // Utilise la taille initiale capturée plutôt que 600
    let newSize = initialSize + scrollPosition * 0.2;

    gsap.to("#diamond", {
        width: newSize + "px",
        height: newSize + "px",
        duration: 0,
    });
}

window.addEventListener("scroll", function () {
    requestAnimationFrame(handleScroll);
});




/********************* Boutton, backToTop ************************/
document.addEventListener("scroll", function () {
    const backToTopButton = document.getElementById("backToTop");

    // Affichez le bouton si l'utilisateur a fait défiler plus de 100px
    if (window.scrollY > 100) {
        backToTopButton.style.display = "block";
    } else {
        backToTopButton.style.display = "none";
    }
});

// Action pour remonter au top
document.getElementById("backToTop").addEventListener("click", function () {
    window.scrollTo({
        top: 0,
        behavior: "smooth"  // effet de smooth scrolling
    });
});

/********************** Animation apparition *******************************/

// Configuration de base de ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Fonction pour créer une animation de révélation
function revealSection(section) {
    const img = section.querySelector(".section-img");
    const h2 = section.querySelector("h2");
    const p = section.querySelector("p");

    gsap.from(img, {
        opacity: 0,
        x: -100,
        duration: 1,
        scrollTrigger: {
            trigger: section,
            start: "top 90%",  // Modifié de 80% à 90%
            end: "bottom 80%",
            scrub: 1
        }
    });

    gsap.from(h2, {
        opacity: 0,
        x: 100,
        duration: 1,
        scrollTrigger: {
            trigger: section,
            start: "top 80%",  // Modifié de 70% à 80%
            end: "bottom 90%",
            scrub: 1
        }
    });

    gsap.from(p, {
        opacity: 0,
        y: 100,
        duration: 1,
        scrollTrigger: {
            trigger: section,
            start: "top 70%",  // Modifié de 60% à 70%
            end: "bottom 40%",
            scrub: 1
        }
    });

}

// Appliquer l'animation à chaque section
document.querySelectorAll("section").forEach(revealSection);


/********************* Bande noires************************ */

const rows = document.querySelectorAll(".cb-tagreel-row");

rows.forEach(function (e, i) {
    let row_width = e.getBoundingClientRect().width;
    let row_item_width = e.children[0].getBoundingClientRect().width;
    let initial_offset = ((2 * row_item_width) / row_width) * 100 * -1;
    let x_translation = initial_offset * -1;
    // console.log(e.children[0].clientWidth);
    console.log(x_translation);

    gsap.set(e, {
        xPercent: `${initial_offset}`
    });

    let duration = 3;

    var tl = gsap.timeline();

    tl.to(e, {
        ease: "none",
        duration: duration,
        xPercent: 0,
        repeat: -1
    });
});



