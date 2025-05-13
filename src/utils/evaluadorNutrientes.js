import { NIVELES_RIESGO } from '../data/nutrientes';

/**
 * Evalúa el riesgo de deficiencias de vitaminas hidrosolubles basado en las respuestas
 * @param {Object} respuestas - Respuestas al cuestionario
 * @param {Object} nutrientesInfo - Información base sobre nutrientes
 * @returns {Object} - Resultados de evaluación por vitamina
 */
export const evaluarRiesgoVitaminas = (respuestas, nutrientesInfo) => {
  // Objeto para almacenar resultados
  const resultados = {};
  
  // Procesar cada nutriente
  Object.keys(nutrientesInfo).forEach(nutrienteId => {
    const nutriente = nutrientesInfo[nutrienteId];
    const { puntuacion, factoresRiesgo, factoresProteccion, confiabilidad, intervaloConfianza } = calcularPuntuacionNutriente(nutrienteId, respuestas, nutriente);
    
    // Determinar nivel de riesgo
    const nivel = determinarNivelRiesgo(nutrienteId, puntuacion);
    
    // Generar recomendación basada en nivel
    const recomendacion = generarRecomendacion(nutrienteId, nivel, puntuacion);
    
    // Guardar resultados de este nutriente
    resultados[nutrienteId] = {
      nombre: nutriente.nombre,
      nombreCientifico: nutriente.nombreCientifico,
      imagen: nutriente.imagen,
      fuentes: nutriente.fuentes,
      nivel,
      puntuacion,
      recomendacion,
      factoresRiesgoDetallados: factoresRiesgo,
      factoresProteccionDetallados: factoresProteccion,
      confiabilidad,
      intervaloConfianza,
      descripcion: nutriente.descripcion,
      descripcionExtendida: generarDescripcionExtendida(nutrienteId, nivel, nutriente)
    };
  });
  
  return resultados;
};

/**
 * Calcula la puntuación de riesgo para un nutriente específico
 * @param {string} nutrienteId - ID del nutriente
 * @param {Object} respuestas - Respuestas al cuestionario
 * @param {Object} nutrienteInfo - Información del nutriente
 * @returns {Object} - Puntuación, factores de riesgo, protección y confiabilidad
 */
const calcularPuntuacionNutriente = (nutrienteId, respuestas, nutrienteInfo) => {
  let puntuacionBase = 0;
  let factoresRiesgo = [];
  let factoresProteccion = [];
  let factorConfiabilidad = 1;
  let numPreguntasRelevantes = 0;
  
  // Procesar cada respuesta
  Object.entries(respuestas).forEach(([preguntaId, valorRespuesta]) => {
    // Buscar si esta pregunta afecta a este nutriente
    let factorEncontrado = false;
    
    // Procesar cada tipo de impacto potencial
    const tiposImpacto = ['impacto', 'interaccionesNutrientes', 'interaccionesFarmacos', 'pesoEnSintomas'];
    
    tiposImpacto.forEach(tipo => {
      // Verificar si hay impacto de respuestas generales
      if (preguntaId.startsWith('sintomas_') && tipo === 'pesoEnSintomas' && nutrienteInfo[tipo]) {
        // Buscar la categoría de síntoma
        const categoriaSintoma = preguntaId.split('_')[1];
        if (nutrienteInfo[tipo][categoriaSintoma] && valorRespuesta !== 'nunca') {
          const pesoSintoma = nutrienteInfo[tipo][categoriaSintoma].peso || 1;
          // Añadir peso según frecuencia del síntoma
          const factorFrecuencia = valorRespuesta === 'frecuente' ? 1 : valorRespuesta === 'ocasional' ? 0.5 : 0.2;
          
          puntuacionBase += pesoSintoma * factorFrecuencia;
          factoresRiesgo.push({
            factor: `sintoma_${categoriaSintoma}`,
            impacto: (pesoSintoma * factorFrecuencia).toFixed(1)
          });
          
          factorEncontrado = true;
          numPreguntasRelevantes++;
        }
      }
      
      // Verificar impactos en respuestas específicas
      if (respuestas[preguntaId] && tipo === 'impacto') {
        // Buscar si hay impacto específico para esta vitamina en esta pregunta
        const preguntasConImpacto = Object.keys(respuestas).filter(p => 
          p.includes(preguntaId) && respuestas[p] === valorRespuesta
        );
        
        preguntasConImpacto.forEach(p => {
          // Simular base de impactos
          const impactoSimulado = {
            alcohol: { 
              frecuente: { [nutrienteId]: 0.8 },
              diario: { [nutrienteId]: 1.2 }
            },
            dieta: { 
              vegana: { [nutrienteId]: nutrienteId === 'B12' ? 2.0 : 0.5 }
            },
            actividad_fisica: { 
              intensa: { [nutrienteId]: 0.4 },
              atleta: { [nutrienteId]: 0.7 }
            }
          };
          
          // Verificar si hay un impacto simulado para esta combinación
          const categoriaPregunta = preguntaId.split('_')[0];
          if (impactoSimulado[categoriaPregunta] && 
              impactoSimulado[categoriaPregunta][valorRespuesta] && 
              impactoSimulado[categoriaPregunta][valorRespuesta][nutrienteId]) {
            
            const valorImpacto = impactoSimulado[categoriaPregunta][valorRespuesta][nutrienteId];
            puntuacionBase += valorImpacto;
            
            if (valorImpacto > 0) {
              factoresRiesgo.push({
                factor: `${categoriaPregunta}_${valorRespuesta}`,
                impacto: valorImpacto.toFixed(1)
              });
            } else if (valorImpacto < 0) {
              factoresProteccion.push({
                factor: `${categoriaPregunta}_${valorRespuesta}`,
                impacto: Math.abs(valorImpacto).toFixed(1)
              });
            }
            
            factorEncontrado = true;
            numPreguntasRelevantes++;
          }
        });
      }
    });
    
    if (factorEncontrado) {
      factorConfiabilidad += 0.05; // Mejora ligera en confiabilidad por cada pregunta relevante
    }
  });
  
  // Ajustar la puntuación base con la ponderación del nutriente
  puntuacionBase *= (nutrienteInfo.ponderacionTotal || 1);
  
  // Limitar puntuación a un máximo
  puntuacionBase = Math.min(puntuacionBase, 10);
  
  // Ordenar factores de mayor a menor impacto
  factoresRiesgo.sort((a, b) => parseFloat(b.impacto) - parseFloat(a.impacto));
  factoresProteccion.sort((a, b) => parseFloat(b.impacto) - parseFloat(a.impacto));
  
  // Calcular confiabilidad final
  const baseConfiabilidad = nutrienteInfo.incertidumbre?.base || 0.25;
  const preguntasNecesarias = nutrienteInfo.incertidumbre?.min_preguntas_relevantes || 5;
  
  // Mayor confiabilidad si hay más preguntas respondidas
  const confiabilidad = Math.min(0.95, 1 - baseConfiabilidad + (numPreguntasRelevantes / preguntasNecesarias) * factorConfiabilidad / 10);
  
  // Calcular intervalo de confianza (simulado)
  const margenError = (1 - confiabilidad) * 2.5;
  const intervaloConfianza = [
    Math.max(0, puntuacionBase - margenError).toFixed(1),
    Math.min(10, puntuacionBase + margenError).toFixed(1)
  ];
  
  return {
    puntuacion: puntuacionBase.toFixed(1),
    factoresRiesgo,
    factoresProteccion,
    confiabilidad: confiabilidad.toFixed(2),
    intervaloConfianza
  };
};

/**
 * Determina el nivel de riesgo según la puntuación y los umbrales definidos
 * @param {string} nutrienteId - ID del nutriente
 * @param {number} puntuacion - Puntuación calculada
 * @returns {string} - Nivel de riesgo (bajo, medio, alto, crítico)
 */
const determinarNivelRiesgo = (nutrienteId, puntuacion) => {
  // Verificar si hay niveles definidos para el nutriente
  if (!NIVELES_RIESGO[nutrienteId]) {
    return "desconocido";
  }
  
  // Convertir a número
  const puntNum = parseFloat(puntuacion);
  
  // Buscar el nivel que corresponde a esta puntuación
  const nivel = NIVELES_RIESGO[nutrienteId].find(n => 
    puntNum >= n.min && puntNum < n.max
  );
  
  // Si no se encuentra coincidencia, devolver "desconocido"
  return nivel ? nivel.nivel : "desconocido";
};

/**
 * Genera una recomendación basada en el nivel de riesgo
 * @param {string} nutrienteId - ID del nutriente
 * @param {string} nivel - Nivel de riesgo
 * @param {number} puntuacion - Puntuación calculada
 * @returns {string} - Recomendación personalizada
 */
const generarRecomendacion = (nutrienteId, nivel, puntuacion) => {
  // Recomendaciones generales según nivel
  const recomendacionesGenerales = {
    bajo: `Su riesgo de deficiencia de ${nutrienteId} es bajo. Continúe con su dieta actual que parece adecuada para este nutriente.`,
    medio: `Considere aumentar el consumo de alimentos ricos en ${nutrienteId} en su dieta regular.`,
    alto: `Recomendamos aumentar significativamente el consumo de alimentos ricos en ${nutrienteId} y considerar suplementación bajo supervisión médica.`,
    critico: `Consulte con un profesional de la salud para evaluar la posible deficiencia de ${nutrienteId} y discutir opciones de suplementación.`,
    desconocido: `No hay suficiente información para evaluar su estado de ${nutrienteId}. Complete más preguntas del cuestionario.`
  };
  
  // Si la puntuación es muy baja, añadir nota de buen estado
  if (parseFloat(puntuacion) < 1.5 && nivel === 'bajo') {
    return `Su nutrición parece óptima respecto a ${nutrienteId}. Continúe con sus buenos hábitos alimenticios.`;
  }
  
  return recomendacionesGenerales[nivel] || recomendacionesGenerales.desconocido;
};

/**
 * Genera una descripción extendida basada en el nivel y la información del nutriente
 * @param {string} nutrienteId - ID del nutriente
 * @param {string} nivel - Nivel de riesgo
 * @param {Object} nutriente - Información del nutriente
 * @returns {string} - Descripción extendida
 */
const generarDescripcionExtendida = (nutrienteId, nivel, nutriente) => {
  // Solo generar descripción extendida para niveles medio, alto y crítico
  if (nivel === 'bajo' || nivel === 'desconocido') {
    return null;
  }
  
  // Incluir información sobre funciones y síntomas
  return `${nutriente.nombre} es crucial para ${nutriente.descripcion}. La deficiencia puede causar ${nutriente.deficiencia}. Se encuentra principalmente en ${nutriente.fuentes}.`;
};

export default evaluarRiesgoVitaminas;