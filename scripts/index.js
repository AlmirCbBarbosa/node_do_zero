const formulario = document.querySelector('[data-formulario]');
const entradasFormulario = document.querySelectorAll('[required]');


formulario.addEventListener('submit', async e=>{
    e.preventDefault();

    const videoDados = {
        "title": e.target.elements["entradaTitulo"].value,
        "description": e.target.elements["entradaDescricao"].value,
        "duration": e.target.elements["entradaDuracao"].value
    };

    try{
        const response = await fetch('http://localhost:3333/videos', {
            method: "POST",
            body: JSON.stringify(videoDados),
            headers: {"Content-Type": "application/json"}
        });
        if(!response.ok){
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const json = await response.json();
        console.log(json);
    }catch (err){
        console.log(err);
    }

});






/* formulario.addEventListener('submit', (e)=>{
    e.preventDefault();  

    
    const videoDados = {
        "title": e.target.elements["entradaTitulo"].value,
        "description": e.target.elements["entradaDescricao"].value,
        "duration": e.target.elements["entradaDuracao"].value
    }

    fetch(' http://localhost:3333/videos', {
        method: "POST",
        body: JSON.stringify(videoDados),
        headers: {"Content-Type": "application/json; charset=UTF-8"}
    })
    .then(response => response.json())
    .then(json => console.log(json))
    .catch(err=> console.log(err));
    
}); */