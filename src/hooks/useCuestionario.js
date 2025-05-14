import { useState, useEffect } from 'react';

// Hook personalizado para gestionar el estado del cuestionario
const useCuestionario = (seccionesCuestionario = [], respuestasIniciales = {}) => {
  const [respuestas, setRespuestas] = useState(respuestasIniciales);
  const [seccionActual, setSeccionActual] = useState(0);
  const [preguntasAdicionales, setPreguntasAdicionales] = useState({});

  // Manejar cambio en respuestas
  const actualizarRespuesta = (preguntaId, valor) => {
    setRespuestas(prev => {
      const nuevasRespuestas = { ...prev, [preguntaId]: valor };
      
      // Si es la pregunta sobre biomarcadores completados, añadir flag
      if (preguntaId === 'biomarcadores_completados_confirm' && valor === 'Sí') {
        return {
          ...nuevasRespuestas,
          biomarcadores_completados_flag: true,
        };
      }
      
      return nuevasRespuestas;
    });
  };

  // Navegar entre secciones
  const cambiarSeccion = (direccion) => {
    if (direccion === 'siguiente') {
      if (seccionActual < seccionesCuestionario.length - 1) {
        setSeccionActual(s => s + 1);
        // Scroll al inicio de la página para mejor UX
        if (typeof window !== 'undefined') window.scrollTo(0, 0);
      }
    } else if (direccion === 'anterior') {
      if (seccionActual > 0) {
        setSeccionActual(s => s - 1);
        // Scroll al inicio de la página para mejor UX
        if (typeof window !== 'undefined') window.scrollTo(0, 0);
      }
    } else if (typeof direccion === 'number' && direccion >= 0 && direccion < seccionesCuestionario.length) {
      // Si se proporciona un índice directamente
      setSeccionActual(direccion);
      if (typeof window !== 'undefined') window.scrollTo(0, 0);
    }
  };

  // Generar preguntas adaptativas basadas en respuestas anteriores
  useEffect(() => {
    const generarPreguntasAdaptativas = () => {
      const nuevasPreguntas = {};
      
      // Ejemplo: Si ha reportado hormigueo frecuente, preguntar por la simetría
      if (respuestas.hormigueo && ['Frecuentemente', 'Siempre'].includes(respuestas.hormigueo)) {
        if (!respuestas.hormigueo_simetria) {
          nuevasPreguntas.hormigueo_simetria = {
            id: 'hormigueo_simetria',
            texto: '¿El hormigueo/entumecimiento es simétrico en ambos lados del cuerpo?',
            tipo: 'radio',
            opciones: [
              'Sí, simétrico',
              'No, asimétrico',
              'No estoy seguro/a',
            ],
            nutrientes: ['B12'],
            seccionOriginal: 'sintomas_especificos',
          };
        }
      }
      
      // Si es vegetariano/vegano por más de 1 año pero no toma suplementos de B12
      if ((respuestas.alimentacion === 'Vegana (ningún producto animal)' || 
          respuestas.alimentacion === 'Vegetariana (sin carne ni pescado)') && 
          respuestas.duracion_dieta && 
          ['1-5 años', 'Más de 5 años'].includes(respuestas.duracion_dieta)) {
          
        if (!respuestas.suplementos_b || 
            !respuestas.suplementos_b.includes('B12 (cobalamina/metilcobalamina)')) {
          nuevasPreguntas.b12_recomendacion = {
            id: 'b12_recomendacion',
            texto: '¿Sabía que las personas que siguen dietas vegetarianas o veganas deberían suplementar con vitamina B12?',
            tipo: 'radio',
            opciones: [
              'Sí, pero no lo hago',
              'Sí, planeo hacerlo',
              'No lo sabía',
              'Ya tomo otros suplementos',
            ],
            nutrientes: ['B12'],
            seccionOriginal: 'suplementacion',
          };
        }
      }
      
      setPreguntasAdicionales(nuevasPreguntas);
    };
    
    generarPreguntasAdaptativas();
  }, [respuestas]);

  return {
    respuestas,
    actualizarRespuesta,
    seccionActual,
    cambiarSeccion,
    preguntasAdicionales,
    seccionesTotales: seccionesCuestionario.length,
    seccionesFiltradas: seccionesCuestionario,
  };
};

export default useCuestionario;