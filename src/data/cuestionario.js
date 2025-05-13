// Este archivo contiene la estructura del cuestionario para la evaluación de deficiencias

export const SECCIONES_CUESTIONARIO = [
  {
    id: "perfil",
    titulo: "Información Personal",
    icon: "👤",
    descripcion: "Datos para personalizar su evaluación nutricional",
    preguntas: [
      {
        id: "genero",
        texto: "¿Cuál es su género?",
        tipo: "radio",
        opciones: [
          "Masculino",
          "Femenino",
          "No binario",
          "Prefiero no especificar",
        ],
        descripcionCientifica: "El género influye en requerimientos y metabolismo. Mujeres en edad fértil tienen necesidades aumentadas de folato y hierro.",
      },
      {
        id: "edad",
        texto: "¿Cuál es su edad?",
        tipo: "numero",
        min: 1,
        max: 120,
        descripcionCientifica: "Requerimientos varían por etapa vital. Edad afecta absorción (B12 en mayores) y necesidades metabólicas.",
      },
      {
        id: "alimentacion",
        texto: "¿Qué tipo de alimentación sigue habitualmente?",
        tipo: "radio",
        opciones: [
          "Omnívora (incluye todos los alimentos)",
          "Vegetariana (sin carne ni pescado)",
          "Vegana (ningún producto animal)",
          "Pescetariana (vegetariana + pescado)",
          "Restrictiva (dieta baja en calorías/ayuno)",
          "Otra",
        ],
        descripcionCientifica: "Patrón alimentario afecta riesgo. Dietas veganas requieren suplemento B12, restrictivas pueden reducir ingesta global.",
      },
      // Más preguntas...
    ],
  },
  {
    id: "sintomas_generales",
    titulo: "Síntomas Generales",
    icon: "🔍",
    descripcion: "Indique si ha experimentado estos síntomas en los últimos 3 meses",
    preguntas: [
      {
        id: "fatiga",
        texto: "¿Siente fatiga o cansancio persistente, incluso después de descansar?",
        tipo: "escala",
        opciones: [
          "Nunca",
          "Raramente",
          "A veces",
          "Frecuentemente",
          "Siempre",
        ],
        nutrientes: ["B1", "B2", "B3", "B5", "B6", "B9", "B12", "C"],
        descripcionCientifica: "Fatiga es síntoma inespecífico pero frecuente en deficiencias de complejo B (producción de energía).",
      },
      // Más preguntas...
    ],
  },
  {
    id: "sintomas_especificos",
    titulo: "Síntomas Específicos",
    icon: "🩺",
    descripcion: "Estos síntomas tienen mayor correlación clínica con deficiencias concretas",
    preguntas: [
      {
        id: "hormigueo",
        texto: "¿Siente hormigueo, entumecimiento o ardor en manos o pies?",
        tipo: "escala",
        opciones: [
          "Nunca",
          "Raramente",
          "A veces",
          "Frecuentemente",
          "Siempre",
        ],
        nutrientes: ["B1", "B6", "B12"],
        descripcionCientifica: "Síntomas neuropáticos tienen alta especificidad para B1, B6, B12. Patrón 'guante y calcetín'.",
      },
      // Más preguntas...
    ],
  },
  {
    id: "factores_riesgo",
    titulo: "Factores de Riesgo",
    icon: "⚠️",
    descripcion: "Elementos que pueden afectar su absorción o metabolismo de vitaminas",
    preguntas: [
      {
        id: "alcohol",
        texto: "¿Con qué frecuencia consume bebidas alcohólicas?",
        tipo: "escala",
        opciones: [
          "Nunca",
          "Ocasionalmente (1-2 veces al mes)",
          "Moderadamente (1-2 veces por semana)",
          "Frecuentemente (3-4 veces por semana)",
          "Diariamente",
        ],
        nutrientes: ["B1", "B6", "B9", "B12"],
        descripcionCientifica: "Alcohol interfiere con absorción y metabolismo de vitaminas B, especialmente tiamina (B1).",
      },
      // Más preguntas...
    ],
  },
  {
    id: "habitos_alimentarios",
    titulo: "Hábitos Alimentarios",
    icon: "🍎",
    descripcion: "Su consumo de alimentos ricos en vitaminas hidrosolubles",
    preguntas: [
      {
        id: "carnes",
        texto: "¿Con qué frecuencia consume carnes rojas o blancas?",
        tipo: "escala",
        opciones: [
          "Nunca",
          "1-2 veces/mes",
          "1-2 veces/semana",
          "3-4 veces/semana",
          "Diariamente",
        ],
        nutrientes: ["B1", "B2", "B3", "B5", "B6", "B12"],
        mostrarSi: (r) =>
          r.alimentacion !== "Vegana (ningún producto animal)" &&
          r.alimentacion !== "Vegetariana (sin carne ni pescado)",
        descripcionCientifica: "Carnes son fuentes principales de B12, B1, B3, B6. Hígado muy rico.",
      },
      // Más preguntas...
    ],
  },
  {
    id: "suplementacion",
    titulo: "Suplementación Actual",
    icon: "💊",
    descripcion:
      "Información sobre suplementos que podrían influir en sus niveles vitamínicos",
    preguntas: [
      {
        id: "multivitaminico",
        texto: "¿Toma algún suplemento multivitamínico regularmente?",
        tipo: "radio",
        opciones: [
          "No",
          "Sí, ocasionalmente",
          "Sí, regularmente (3-5 días/semana)",
          "Sí, diariamente",
        ],
        descripcionCientifica:
          "Multivitamínicos aportan vitaminas. Formas activas (metilcobalamina, 5-MTHF) más biodisponibles.",
      },
      // Más preguntas...
    ],
  },
  {
    id: "biomarcadores",
    titulo: "Análisis de Biomarcadores (Opcional)",
    icon: "🩸",
    descripcion: "Introduzca valores de análisis clínicos si los tiene. Esto mejora la precisión.",
    mostrarSiGlobal: (componentProps) => componentProps.mostrarBiomarcadores,
    preguntas: [
      {
        id: "b12_serica_input",
        texto: "Vitamina B12 sérica (pg/mL o pmol/L)",
        tipo: "numero",
        min: 0,
        nutrientes: ["B12"],
        descripcionCientifica: "Nivel sérico de B12. Valores <200 pg/mL indican deficiencia. Óptimo >400 pg/mL.",
      },
      // Más preguntas...
    ],
  },
];

export default SECCIONES_CUESTIONARIO;