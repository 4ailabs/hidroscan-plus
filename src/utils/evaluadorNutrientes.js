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
    
    // Generar recomendación basada en nivel y respuestas
    const recomendacion = generarRecomendacion(nutrienteId, nivel, puntuacion, respuestas);
    
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
  let tieneBiomarcador = false;
  
  // Procesar cada respuesta
  Object.entries(respuestas).forEach(([preguntaId, valorRespuesta]) => {
    // Buscar si esta pregunta afecta a este nutriente
    let factorEncontrado = false;
    
    // Procesar cada tipo de impacto potencial
    const tiposImpacto = ['impacto', 'interaccionesNutrientes', 'interaccionesFarmacos', 'pesoEnSintomas'];
    
    tiposImpacto.forEach(tipo => {
      // Verificar si hay impacto de respuestas generales o específicas de síntomas
      if ((preguntaId.startsWith('sintomas_') || preguntaId.startsWith('sintomas_especificos_')) && 
          tipo === 'pesoEnSintomas' && nutrienteInfo[tipo]) {
        // Buscar la categoría de síntoma
        const partesPregunta = preguntaId.split('_');
        let categoriaSintoma;
        
        if (preguntaId.startsWith('sintomas_especificos_')) {
          // Para síntomas específicos, usar el tercer elemento como categoría
          categoriaSintoma = partesPregunta[2];
          
          // Mapear categorías específicas a categorías generales si es necesario
          const mapeoCategoriasEspecificas = {
            'neurologicos': 'neurologicos',
            'oculares': 'oculares',
            'bucales': 'mucosas',
            'piel': 'dermatologicos',
            'digestivos': 'gastrointestinales',
            'articulares': 'musculoesqueleticos',
            'inmunidad': 'inmunologicos',
            'cardiovasculares': 'cardiovasculares',
            'metabolicos': 'metabolicos'
          };
          
          if (mapeoCategoriasEspecificas[categoriaSintoma]) {
            categoriaSintoma = mapeoCategoriasEspecificas[categoriaSintoma];
          }
        } else {
          // Para síntomas generales, usar el segundo elemento (sintomas_generales_X)
          categoriaSintoma = partesPregunta[1];
        }
        
        if (nutrienteInfo[tipo][categoriaSintoma] && valorRespuesta !== 'nunca') {
          const pesoSintoma = nutrienteInfo[tipo][categoriaSintoma].peso || 1;
          // Añadir peso según frecuencia del síntoma
          const factorFrecuencia = valorRespuesta === 'frecuente' ? 1 : 
                                  valorRespuesta === 'ocasional' ? 0.5 : 
                                  valorRespuesta === 'si' ? 1 : 0.2;
          
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
              vegana: { [nutrienteId]: nutrienteId === 'B12' ? 2.0 : 0.5 },
              vegetariana: { [nutrienteId]: nutrienteId === 'B12' ? 1.5 : 0.3 },
              keto: { [nutrienteId]: (nutrienteId === 'B1' || nutrienteId === 'B3') ? 0.7 : 0 },
              cetogenica: { [nutrienteId]: (nutrienteId === 'B1' || nutrienteId === 'B3') ? 0.7 : 0 },
              paleo: { [nutrienteId]: nutrienteId === 'B9' ? 0.5 : 0 },
              carnivora: { [nutrienteId]: (nutrienteId === 'C' || nutrienteId === 'B9') ? 1.0 : -0.3 }
            },
            actividad_fisica: { 
              intensa: { [nutrienteId]: 0.4 },
              atleta: { [nutrienteId]: 0.7 },
              moderada: { [nutrienteId]: 0.2 }
            },
            suplementacion: {
              multivitaminico: { [nutrienteId]: -0.7 },
              especifico: { [nutrienteId]: -1.2 }
            },
            medicamentos: {
              anticonceptivos: { 
                [nutrienteId]: (nutrienteId === 'B6' || nutrienteId === 'B9' || nutrienteId === 'B12') ? 0.8 : 0.2 
              },
              antibioticos: { 
                [nutrienteId]: (nutrienteId === 'B2' || nutrienteId === 'B3' || nutrienteId === 'B7') ? 0.6 : 0.1 
              },
              antiacidos: { 
                [nutrienteId]: (nutrienteId === 'B12') ? 1.0 : 0.3 
              },
              diureticos: { 
                [nutrienteId]: (nutrienteId === 'B1' || nutrienteId === 'B6' || nutrienteId === 'C') ? 0.9 : 0.2 
              },
              metformina: { 
                [nutrienteId]: (nutrienteId === 'B12' || nutrienteId === 'B9') ? 1.1 : 0 
              },
              estatinas: { 
                [nutrienteId]: (nutrienteId === 'B7') ? 0.7 : 0 
              }
            },
            factores_riesgo: {
              embarazo: { 
                [nutrienteId]: (nutrienteId === 'B9' || nutrienteId === 'B12' || nutrienteId === 'C') ? 1.0 : 0.3 
              },
              lactancia: { 
                [nutrienteId]: 0.8 
              },
              adulto_mayor: { 
                [nutrienteId]: (nutrienteId === 'B12' || nutrienteId === 'B6' || nutrienteId === 'B9') ? 1.2 : 0.5 
              },
              enfermedad_celiaca: { 
                [nutrienteId]: (nutrienteId === 'B12' || nutrienteId === 'B9' || nutrienteId === 'B1') ? 1.2 : 0.5 
              },
              enfermedad_crohn: { 
                [nutrienteId]: 1.0 
              },
              bypass_gastrico: { 
                [nutrienteId]: 1.5 
              },
              gastrectomia: { 
                [nutrienteId]: (nutrienteId === 'B12') ? 2.0 : 1.0 
              }
            },
            habitos: {
              tabaquismo: { 
                [nutrienteId]: (nutrienteId === 'C') ? 1.5 : 0.3
              },
              consumo_frecuente_procesados: { 
                [nutrienteId]: (nutrienteId === 'B9' || nutrienteId === 'C') ? 0.7 : 0.3 
              },
              bajo_consumo_frutas: { 
                [nutrienteId]: (nutrienteId === 'C') ? 1.2 : 0.4 
              },
              bajo_consumo_verduras: { 
                [nutrienteId]: (nutrienteId === 'B9' || nutrienteId === 'C') ? 1.0 : 0.3 
              }
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
  
  // Procesar biomarcadores si existen
  if (respuestas.biomarcador_disponible && respuestas.biomarcador_disponible === 'si') {
    // Buscar respuestas específicas para este nutriente
    const biomarcadorId = `biomarcador_${nutrienteId.toLowerCase()}`;
    
    if (respuestas[biomarcadorId]) {
      tieneBiomarcador = true;
      const valorBiomarcador = parseFloat(respuestas[biomarcadorId]);
      
      // Si tenemos información de referencia para este nutriente
      if (nutrienteInfo.biomarcadores && nutrienteInfo.biomarcadores.intervalo_referencia) {
        const [min, max] = nutrienteInfo.biomarcadores.intervalo_referencia;
        
        // Ajustar la puntuación basada en el biomarcador
        if (valorBiomarcador < min) {
          // Valor bajo indica deficiencia
          const severidad = (min - valorBiomarcador) / min;  // Normalizado entre 0-1
          const impactoBiomarcador = Math.min(5, 3 + (7 * severidad));
          
          puntuacionBase = Math.max(puntuacionBase, impactoBiomarcador);
          factoresRiesgo.push({
            factor: `biomarcador_bajo`,
            impacto: impactoBiomarcador.toFixed(1)
          });
        } else if (valorBiomarcador > max) {
          // Valor alto puede indicar exceso o error
          factoresRiesgo.push({
            factor: `biomarcador_alto`,
            impacto: "N/A"
          });
        } else {
          // Valor normal indica buen nivel
          const impactoProteccion = -1.5;
          puntuacionBase = Math.max(0, puntuacionBase + impactoProteccion);
          factoresProteccion.push({
            factor: `biomarcador_normal`,
            impacto: Math.abs(impactoProteccion).toFixed(1)
          });
        }
      }
    }
  }
  
  // Calcular confiabilidad final
  const baseConfiabilidad = nutrienteInfo.incertidumbre?.base || 0.25;
  const preguntasNecesarias = nutrienteInfo.incertidumbre?.min_preguntas_relevantes || 5;
  
  // Mayor confiabilidad si hay más preguntas respondidas y/o biomarcadores
  let factorBiomarcador = tieneBiomarcador ? (nutrienteInfo.incertidumbre?.con_biomarcadores || 0.1) : 0;
  const confiabilidad = Math.min(0.95, 1 - baseConfiabilidad + (numPreguntasRelevantes / preguntasNecesarias) * factorConfiabilidad / 10 + factorBiomarcador);
  
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
 * @param {Object} respuestas - Todas las respuestas del cuestionario (opcional)
 * @returns {string} - Recomendación personalizada
 */
const generarRecomendacion = (nutrienteId, nivel, puntuacion, respuestas = {}) => {
  // Obtener el nombre completo de la vitamina
  const nombreVitaminas = {
    B1: "vitamina B1 (tiamina)",
    B2: "vitamina B2 (riboflavina)",
    B3: "vitamina B3 (niacina)",
    B5: "vitamina B5 (ácido pantoténico)",
    B6: "vitamina B6 (piridoxina)",
    B7: "vitamina B7 (biotina)",
    B9: "vitamina B9 (ácido fólico)",
    B12: "vitamina B12 (cobalamina)",
    C: "vitamina C (ácido ascórbico)"
  };
  
  const nombreVitamina = nombreVitaminas[nutrienteId] || nutrienteId;
  
  // Recomendaciones generales según nivel
  const recomendacionesGenerales = {
    bajo: `Su riesgo de deficiencia de ${nombreVitamina} es bajo. Continúe con su dieta actual que parece adecuada para este nutriente.`,
    medio: `Considere aumentar el consumo de alimentos ricos en ${nombreVitamina} en su dieta regular.`,
    alto: `Recomendamos aumentar significativamente el consumo de alimentos ricos en ${nombreVitamina} y considerar suplementación bajo supervisión médica.`,
    critico: `Consulte con un profesional de la salud para evaluar la posible deficiencia de ${nombreVitamina} y discutir opciones de suplementación.`,
    desconocido: `No hay suficiente información para evaluar su estado de ${nombreVitamina}. Complete más preguntas del cuestionario.`
  };
  
  // Si la puntuación es muy baja, añadir nota de buen estado
  if (parseFloat(puntuacion) < 1.5 && nivel === 'bajo') {
    return `Su nutrición parece óptima respecto a ${nombreVitamina}. Continúe con sus buenos hábitos alimenticios.`;
  }
  
  // Generar recomendación básica según nivel
  let recomendacion = recomendacionesGenerales[nivel] || recomendacionesGenerales.desconocido;
  
  // Personalizar según respuestas específicas
  if (respuestas) {
    // Si hay biomarcador disponible
    if (respuestas.biomarcador_disponible === 'si' && respuestas[`biomarcador_${nutrienteId.toLowerCase()}`]) {
      recomendacion += ` Según sus biomarcadores, se ha ajustado la evaluación para reflejar su estado actual.`;
    }
    
    // Si es vegetariano/vegano y es B12
    if (nutrienteId === 'B12' && 
        (respuestas.dieta_tipo === 'vegana' || respuestas.dieta_tipo === 'vegetariana') && 
        nivel !== 'bajo') {
      recomendacion += ` Al seguir una dieta ${respuestas.dieta_tipo}, es especialmente importante la suplementación con B12, ya que esta vitamina se encuentra naturalmente solo en alimentos de origen animal.`;
    }
    
    // Si tiene factor de embarazo y es B9 (ácido fólico)
    if (nutrienteId === 'B9' && respuestas.factores_riesgo_embarazo === 'si') {
      recomendacion += ` Durante el embarazo, se recomienda una ingesta adecuada de ácido fólico para prevenir defectos del tubo neural en el bebé. Consulte con su médico sobre la dosis adecuada.`;
    }
    
    // Si es adulto mayor y es B12
    if (nutrienteId === 'B12' && respuestas.perfil_edad && parseInt(respuestas.perfil_edad) > 65) {
      recomendacion += ` A partir de los 65 años, la absorción de B12 puede disminuir significativamente, por lo que podría ser necesaria la suplementación incluso con una dieta equilibrada.`;
    }
    
    // Si es fumador y es vitamina C
    if (nutrienteId === 'C' && respuestas.tabaquismo === 'si') {
      recomendacion += ` Los fumadores tienen mayores necesidades de vitamina C debido al estrés oxidativo. Se recomienda aumentar la ingesta en al menos un 35% sobre los valores normales.`;
    }
  }
  
  return recomendacion;
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
