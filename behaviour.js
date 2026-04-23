document.addEventListener("DOMContentLoaded", () => {
    const about = document.querySelector(".about");

    about.style.opacity = "0";
    about.style.transform = "translateY(20px)";

    setTimeout(() => {
        about.style.transition = "all 0.6s ease";
        about.style.opacity = "1";
        about.style.transform = "translateY(0)";
    }, 200);
});
// simple fade-in effect
document.addEventListener("DOMContentLoaded", () => {
    const cards = document.querySelectorAll(".card");

    cards.forEach((card, index) => {
        card.style.opacity = "0";
        card.style.transform = "translateY(20px)";

        setTimeout(() => {
            card.style.transition = "all 0.5s ease";
            card.style.opacity = "1";
            card.style.transform = "translateY(0)";
        }, index * 200);
    });
});