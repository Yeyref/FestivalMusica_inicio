document.addEventListener('DOMContentLoaded', function () {
    
    iniciarApp(); //PRIMER CALLBACK Y UNICO PARA EL PROYECTO PORQUE ESTE ES UN PROYECTO PEQUENO

});

    function iniciarApp() {
        navegacionFija();
        crearGaleria();     //SEGUNDO CALLBACK
        scrollNav();
    };

    function navegacionFija(){
        const barra = document.querySelector('.header');
        const sobreFestival = document.querySelector('.contenido-festival');
        const body = document.querySelector('body');

        window.addEventListener('scroll', function(){
          console.log(sobreFestival.getBoundingClientRect());
          if (sobreFestival.getBoundingClientRect().bottom < 0) {
                body.classList.add('body-scroll');
                barra.classList.add('fijo');
          } else {
            body.classList.remove('body-scroll');
            barra.classList.remove('fijo');
          }  
        })
        
    }

    function scrollNav(){
        const enlaces = document.querySelectorAll('.navegacion-principal a')
        enlaces.forEach( enlace => {
            enlace.addEventListener('click', function(e){
                e.preventDefault();
                const seccionScroll = e.target.attributes.href.value;
                const seccion = document.querySelector(seccionScroll);

                seccion.scrollIntoView({behavior: 'smooth'});

            });
            


        });
    
    }   


    function crearGaleria() {
        const galeria = document.querySelector(".galeria-imagenes")

        // galeria.textContent = 'Vamos que vamos, a por esa galeria';

        for (let i = 1; i <= 12; i++) {    //ITERAMOS EN LAS 12 IMAGENES CON UN FOR Y EN NUMEROS YA QUE ESTA ESTA' EN ORDEN DEL 1 AL 12.
            const imagen = document.createElement('picture');  // ACA EN ESTA ITERACCION SE ESTAN DESPLEGANDO LA IMGS CHICAS EN LA GALERIA
        imagen.innerHTML =  `
                <source srcset="build/img/thumb/${i}.avif" type="image/avif">
                <source srcset="build/img/thumb/${i}.webp" type="image/webp">
                <img loading="lazy" width="200" height="300" src="/src/img/thumb/${i}.jpg" alt="Imagen Galeria">
        ` 
            imagen.onclick = function(){
            mostrarImagen(i);   //TERCAR CALLBACK DENTRO DEL BUCLE FOR
            }

        galeria.appendChild(imagen);
           console.log(imagen);
            
        }
     }


    


     function mostrarImagen(id){
        const imagen = document.createElement('picture');   //CUARTO CALLBACK DONDE YA SE MUESTRAN LAS IMAGENES EN GRANDE. SE NOTA EN EL BUILD
        imagen.innerHTML =  `
                <source srcset="build/img/grande/${id}.avif" type="image/avif">
                <source srcset="build/img/grande/${id}.webp" type="image/webp">
                <img loading="lazy" width="200" height="300" src="/src/img/grande/${id}.jpg" alt="Imagen Galeria">
        ` ;
        
        //CREAR OVERLAY O MODAL PARA MOSTRAR IMAGEN EN GRANDE DESPUES DEL CLICK
        const overlay = document.createElement('div');
        overlay.appendChild(imagen);
        overlay.classList.add('overlay');

        //   ESTO LO AGREGUE DE ULTIMO, BASICAMENTE SI DAS CLICK EN CUALQUIER PARTE DEL MODAL DESPLEGADO, 
        //   HAY UN CALLBACK QUE ELIMINA TODA LA IMAGEN, AL IGUAL QUE EL FIJAR BODY.
        overlay.onclick = function() {
            overlay.remove();
            body.classList.remove('fijar-body')        
        }
        
        //CERRAR MODAL DEL OVERLAY

        const cerrarModal = document.createElement('p');
        cerrarModal.textContent = 'X';
        overlay.appendChild(cerrarModal);
        cerrarModal.classList.add('btn-cerrar');

        //ESTE ES EL PENULTIMO, DANDO CLICK EN LA 'X' SE CIERRA EL MODAL Y SE REMUEVE LA FIJACION DE BODY.
        cerrarModal.onclick = function(){
            overlay.remove();
            body.classList.remove('fijar-body')        }

        
        //ANADIR EL OVERLAY AL HTML
        //ACA ANADIMOS EL HIJO OVERLAY AL HTML PARA QUE APAREZCA CUANDO DEMOS CLICK EN LA IMAGEN
        //APARTE LE ANADIMOS LA CLASE 'FIJAR-BODY' AL BODY Y ESTA LE DAMOS SU FUNCION EN EL BODY _GLOBALES DE SCSS
        const body = document.querySelector('body');
        body.appendChild(overlay)
        body.classList.add('fijar-body')
     }