import { Viaje } from '../models/Viaje.js';
import { Testimoniales } from '../models/Testimoniales.js';


const paginaInicio = async (req, res) =>{
    // Consultar la DB

    let promisesDB = []
    promisesDB.push( Viaje.findAll({limit: 3}) )
    promisesDB.push( Testimoniales.findAll({limit: 3}) )

    try {
        const resultado = await Promise.all(promisesDB);

        res.render('inicio', {
            pagina: 'Inicio',
            clase: 'home',
            viajes: resultado[0],
            testimonios: resultado[1]
        });
    } catch (error) {
        console.log(error);
    }
}

const paginaNosotros = (req, res) =>{
    res.render('nosotros', {
        pagina: 'Nosotros'
    });
}

const paginaViajes = async (req, res) =>{
    const viajes = await Viaje.findAll();

    res.render('viajes', {
        pagina: 'Viajes',
        viajes
    });
}

const paginaTestimoniales =  async (req, res) =>{
    try{
        const testimonios = await Testimoniales.findAll();

        res.render('testimoniales', {
            pagina:'Testimoniales',
            testimonios
        });
    }catch(error){
        console.log(error);
    }
}

const paginaDetalleViaje = async (req, res) =>{
    // Obtenemos info de la URL
    const { slug } = req.params;

    try{
        const viaje = await Viaje.findOne( {where: {slug: slug}});
        res.render('viaje', {
            pagina: 'Info Viaje',
            viaje
        });
    }catch(error){
        console.log(error);
    }
}

export {
    paginaInicio,
    paginaNosotros,
    paginaViajes,
    paginaTestimoniales,
    paginaDetalleViaje
}