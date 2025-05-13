import { useState, useEffect } from 'react';
import { NUTRIENTES_INFO, NIVELES_RIESGO } from '../data/nutrientes';

// Hook personalizado para la evaluación de riesgo de deficiencias de vitaminas
const useEvaluacion = (respuestas) => {
  const [resultados, setResultados] = useState(null);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);
  const [factorIncertidumbre, setFactorIncertidumbre] = useState({});
  
  // Función auxiliar para evaluar la intensidad de un síntoma
  const evaluarIntensidadSintoma = (
    respuesta,
    escala = ["Nunca", "Raramente", "A veces", "Frecuentemente", "Siempre"]
  ) => {
    if (!respuesta) return 0;
    const indice = escala.indexOf(respuesta);
    if (indice <= 0) return 0;
    return (1 / (1 + Math.exp(-1.5 * (indice - 2)))) * 2 - 0.3;
  };
  
  // Función auxiliar para calcular la protección nutricional basada en frecuencia
  const calcularProteccionNutricional = (frecuencia, intensidadEfecto = 1.0) => {
    if (!frecuencia) return 0;
    const frecuenciaValores = {
      "Nunca": 0,
      "1-2 veces/mes": 0.15,
      "1-2 veces/semana": 0.3,
      "3-4 veces/semana": 0.6,
      "Diariamente": 1.0,
    };
    const valorFrecuencia = frecuenciaValores[frecuencia] || 0;
    if (valorFrecuencia <= 0) return 0;
    return Math.pow(valorFrecuencia, 0.7) * intensidadEfecto;
  };
  
  // Calcular el factor de incertidumbre para cada nutriente
  const calcularFactorIncertidumbre = (respuestasUsuario, nutrienteKey) => {
    const infoNutriente = NUTRIENTES_INFO[nutrienteKey];
    if (!infoNutriente) return 0.5;

    // Factor base de incertidumbre con o sin biomarcadores
    let factorBase = 0.25;
    if (respuestasUsuario.biomarcadores_completados_flag === true) {
      factorBase = 0.1;
    }
    
    // Incertidumbre ajustada según la completitud del cuestionario
    // Esta es una versión simplificada que se expandiría en la implementación completa
    return factorBase;
  };
  
  // Función principal para evaluar riesgo de deficiencias
  const calcularResultados = () => {
    setCargando(true);
    
    try {
      // Aquí iría la lógica completa de evaluación
      // Este es un esqueleto que se expandiría con toda la lógica de análisis
      
      // Crear estructura de resultados para cada vitamina
      const resultadosVitaminas = Object.keys(NUTRIENTES_INFO).reduce(
        (acc, key) => {
          acc[key] = {
            ...NUTRIENTES_INFO[key],
            // En una implementación real, estos valores se calcularían mediante algoritmos complejos
            puntuacion: Math.random() * 10, // Simulado para esqueleto inicial
            nivel: "medio", // Simulado para esqueleto inicial
            recomendacion: "Consultar con profesional",
            descripcionExtendida: "Descripción detallada de la recomendación...",
            intervaloConfianza: [0, 0],
            confiabilidad: "media",
            nivelPosibleRango: ["bajo", "medio"],
            factoresRiesgoDetallados: [],
            factoresProteccionDetallados: [],
          };
          return acc;
        },
        {}
      );
      
      // Calcular incertidumbre para cada nutriente
      const incertidumbre = {};
      Object.keys(NUTRIENTES_INFO).forEach((key) => {
        incertidumbre[key] = calcularFactorIncertidumbre(respuestas, key);
      });
      
      setFactorIncertidumbre(incertidumbre);
      setResultados(resultadosVitaminas);
      setError(null);
    } catch (err) {
      console.error("Error en cálculo de resultados:", err);
      setError("Ocurrió un error al evaluar los datos. Por favor, intente nuevamente.");
    } finally {
      setCargando(false);
    }
  };
  
  // Recalcular cuando cambian las respuestas
  useEffect(() => {
    if (Object.keys(respuestas).length > 5) { // Mínimo de respuestas para evaluar
      calcularResultados();
    }
  }, [respuestas]);
  
  return { 
    resultados, 
    cargando, 
    error, 
    calcularResultados,
    factorIncertidumbre,
  };
};

export default useEvaluacion;