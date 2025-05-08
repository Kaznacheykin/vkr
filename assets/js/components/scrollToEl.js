export function scrollTo () {
    document.querySelectorAll("a[href^='#']").forEach(link => {
        link.addEventListener("click", function (e) {
            e.preventDefault();
            let href = this.getAttribute("href").substring(1);
            const scrollTarget = document.getElementById(href);
            const topOffset = document.querySelector(".header").offsetHeight + 50;
            // const topOffset = 0; // если не нужен отступ сверху
            const elementPosition = scrollTarget.getBoundingClientRect().top;
            const offsetPosition = elementPosition - topOffset;

            window.scrollBy({
                top: offsetPosition,
                behavior: "smooth"
            });
        });
    });
}