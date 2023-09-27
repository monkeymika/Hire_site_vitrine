ScrollTrigger.create({
    animation: gsap.from(".logo", {
        y: "50vh",
        scale: 6,
        yPercent: -50,
    }),
    scrub: true,
    trigger: "main",
    start: "top bottom",
    endTrigger: "main",
    end: "top center"
});

/* Animation de l'apparition du texte*/

const reveal = gsap.utils.toArray('.reveal');
reveal.forEach((text, i) => {
    ScrollTrigger.create({
        trigger: text,
        toggleClass: 'active',
        start: "top 90%",
        end: "top 20%",
    })
})

/* Animation de l'apparition de l'image*/

const images = gsap.utils.toArray('img');
images.forEach((img, i) => {
    ScrollTrigger.create({
        trigger: img,
        toggleClass: 'active',
        start: "top 95%",
        end: "top -10%",
        scrub: 2,
    })
})

/*Animation - transition de la couleur du background au scroll*/

gsap.to("body", {
    backgroundColor: "#69c2c3",
    scrollTrigger: {
        trigger: "main", // ou choisissez l'élément approprié pour déclencher l'animation
        start: "top 90%",
        end: "bottom bottom",
        scrub: true,
    }
});

