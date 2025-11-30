// Optional: toggle fullscreen PDF on click
const pdfWrapper = document.querySelector('.pdf-wrapper');

pdfWrapper.addEventListener('click', () => {
    pdfWrapper.classList.toggle('fullscreen');
});
