import express from 'express';
import {paginaInicio, 
        paginaNosotros, 
        paginaTestimoniales, 
        paginaViajes,
        paginaDetalleViaje} from '../controllers/paginaController.js';
import { guardarTestimonial } from '../controllers/testimonialesController.js';


const router = express.Router();

// Routing GET
router.get('/', paginaInicio);
router.get('/nosotros', paginaNosotros);
router.get('/viajes', paginaViajes);
router.get('/viajes/:slug', paginaDetalleViaje);
router.get('/testimoniales', paginaTestimoniales);


// Routing POST
router.post('/testimoniales', guardarTestimonial);

export default router;