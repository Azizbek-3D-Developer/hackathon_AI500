// SOLUTION PAGE INTERACTIONS

console.log("Solution page loaded!");

document.addEventListener("DOMContentLoaded", () => {
    // Example: Animate title
    const title = document.querySelector(".solution-title");
    title.style.opacity = 0;

    setTimeout(() => {
        title.style.transition = "1s ease";
        title.style.opacity = 1;
    }, 200);
});


document.addEventListener("DOMContentLoaded", () => {
    const pdf = document.getElementById("pdf-viewer");
    const loader = document.getElementById("pdf-loader");

    const MIN_LOAD_TIME = 5000; // 5 seconds
    const pageStart = Date.now();

    pdf.onload = () => {
        const timePassed = Date.now() - pageStart;
        const remaining = MIN_LOAD_TIME - timePassed;

        setTimeout(() => {
            loader.style.display = "none";
            pdf.style.display = "block";
        }, remaining > 0 ? remaining : 0);
    };
});
