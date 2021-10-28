import { Testimoniales } from "../models/Testimoniales.js";

const guardarTestimonial = async(req, res) =>{
    
    // Validar...
    const {nombre, correo, mensaje} = req.body;
    let errores = [];
    console.log(typeof mensaje);

    if(nombre.trim() === ''){
        errores.push('El Nombre está vacío');
    }
    if(correo.trim() === ''){
        errores.push('El Correo está vacío');
    }
    if(mensaje.trim() === ''){
        errores.push('El Mensaje está vacío');
    }
    if(errores.length > 0){
        // Cargar testimonios a la vista
        const testimonios = await Testimoniales.findAll();
        // Mostrar la vista con los errores
        res.render('testimoniales', {
            pagina: 'Testimoniales',
            testimonios,
            errores,
            nombre,
            correo,
            mensaje
        });
    }else{
        // Guardar en DB
        try{
            await Testimoniales.create({
                nombre,
                correo,
                mensaje
            });

            res.redirect('/testimoniales');
        }catch(error){
            console.log(error)
        }
    }

}

export{
    guardarTestimonial
}