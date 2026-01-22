const navbarBurger = document.getElementById("burger");
const navbarBurgerMenu = document.getElementById("burger-menu");

navbarBurger.addEventListener("click", () => {
    const navMenu = navbarBurger.target;
    navbarBurger.classList.toggle("is-active");
    navbarBurgerMenu.classList.toggle("is-active");
})