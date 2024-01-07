const formulario = document.querySelector('[data-formulario]');
const entradasFormulario = document.querySelectorAll('[required]');


formulario.addEventListener('submit', (e)=>{
    e.preventDefault();  

    
    const videoDados = {
        "title": e.target.elements["entradaTitulo"].value,
        "description": e.target.elements["entradaDescricao"].value,
        "duration": e.target.elements["entradaDuracao"].value
    }

    console.log(videoDados);
    
})