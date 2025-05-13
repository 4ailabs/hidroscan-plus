// Este archivo contendrá toda la información detallada sobre vitaminas hidrosolubles
// para la evaluación de deficiencias.

// Información sobre cada vitamina hidrosoluble
export const NUTRIENTES_INFO = {
  B1: {
    nombre: "Vitamina B1 (Tiamina)",
    nombreCientifico: "Tiamina pirofosfato (TPP)",
    fuentes: "Cereales integrales, legumbres, carnes (especialmente cerdo), semillas, nueces",
    deficiencia: "Beriberi (periférico, húmedo o seco), encefalopatía de Wernicke, síndrome de Korsakoff, neuropatía periférica, insuficiencia cardíaca de alto gasto",
    imagen: "🌾",
    descripcion: "Coenzima esencial para el metabolismo de carbohidratos, función neurológica y producción de energía celular, crucial para la actividad de enzimas del ciclo de Krebs",
    RDA: {
      infantil: "0.5 mg/día",
      adolescentes: "1.0-1.2 mg/día",
      adultos: "Hombres: 1.2 mg/día, Mujeres: 1.1 mg/día",
      embarazo: "1.4 mg/día",
      lactancia: "1.4 mg/día",
      mayores65: "1.2 mg/día",
    },
    // Datos adicionales irían aquí
  },
  B2: {
    nombre: "Vitamina B2 (Riboflavina)",
    nombreCientifico: "Flavina adenina dinucleótido (FAD), Flavina mononucleótido (FMN)",
    fuentes: "Lácteos, huevos, carnes magras, vegetales de hoja verde, cereales enriquecidos, hongos",
    deficiencia: "Queilosis, estomatitis angular, glositis (lengua magenta), dermatitis seborreica, anemia normocítica",
    imagen: "👄",
    descripcion: "Componente esencial de coenzimas FAD y FMN, críticas para reacciones oxidativas celulares, metabolismo energético y protección antioxidante",
    RDA: {
      infantil: "0.5 mg/día",
      adolescentes: "1.0-1.3 mg/día",
      adultos: "Hombres: 1.3 mg/día, Mujeres: 1.1 mg/día",
      embarazo: "1.4 mg/día",
      lactancia: "1.6 mg/día",
      mayores65: "1.3 mg/día",
    },
    // Datos adicionales irían aquí
  },
  // Información adicional sobre otras vitaminas hidrosolubles
  B3: {
    nombre: "Vitamina B3 (Niacina)",
    imagen: "🍄",
    // Más información
  },
  B5: {
    nombre: "Vitamina B5 (Ácido Pantoténico)",
    imagen: "🥑",
    // Más información
  },
  B6: {
    nombre: "Vitamina B6 (Piridoxina)",
    imagen: "🍌",
    // Más información
  },
  B7: {
    nombre: "Vitamina B7 (Biotina)",
    imagen: "🥚",
    // Más información
  },
  B9: {
    nombre: "Vitamina B9 (Ácido Fólico)",
    imagen: "🥬",
    // Más información
  },
  B12: {
    nombre: "Vitamina B12 (Cobalamina)",
    imagen: "🥩",
    // Más información
  },
  C: {
    nombre: "Vitamina C (Ácido Ascórbico)",
    imagen: "🍊",
    // Más información
  },
};

// Niveles de riesgo y rangos de puntuación
export const NIVELES_RIESGO = {
  B1: [
    {
      min: 0,
      max: 2.5,
      etiqueta: "bajo",
      icono: "✓",
      color: "#16a34a", // success
      recomendacion: "Mantener ingesta actual",
      descripcionExtendida: "Su riesgo de deficiencia de vitamina B1 es bajo. Continúe con sus hábitos alimentarios actuales, asegurándose de incluir alimentos ricos en tiamina como cereales integrales, legumbres y carnes magras.",
    },
    {
      min: 2.5,
      max: 5.5,
      etiqueta: "medio",
      icono: "!",
      color: "#f59e0b", // warning
      recomendacion: "Optimizar fuentes alimentarias",
      descripcionExtendida: "Su riesgo de deficiencia de vitamina B1 es moderado. Considere aumentar el consumo de alimentos ricos en tiamina como cereales integrales, legumbres, carnes (especialmente cerdo) y frutos secos. Reduzca el consumo de alcohol si aplica.",
    },
    // Niveles adicionales y para otras vitaminas...
  ],
  // Información para otras vitaminas...
};

export default NUTRIENTES_INFO;