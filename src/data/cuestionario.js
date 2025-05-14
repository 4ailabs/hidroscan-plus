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
      {
        id: "alimentacion_otra",
        texto: "Por favor, especifique su tipo de alimentación:",
        tipo: "texto",
        mostrarSi: (r) => r.alimentacion === "Otra",
        descripcionCientifica: "Dietas específicas (cetogénica, paleo) pueden afectar perfil de micronutrientes.",
      },
      {
        id: "duracion_dieta",
        texto: "¿Cuánto tiempo lleva siguiendo esta alimentación?",
        tipo: "radio",
        opciones: [
          "Menos de 1 mes",
          "1-6 meses",
          "6-12 meses",
          "1-5 años",
          "Más de 5 años",
        ],
        mostrarSi: (r) =>
          [
            "Vegetariana (sin carne ni pescado)",
            "Vegana (ningún producto animal)",
            "Restrictiva (dieta baja en calorías/ayuno)",
            "Otra",
          ].includes(r.alimentacion),
        descripcionCientifica: "Duración de dieta restrictiva influye en riesgo. Reservas de B12 duran años, otras (C) se agotan en meses.",
      },
      {
        id: "embarazo",
        texto: "¿Está embarazada o en período de lactancia?",
        tipo: "radio",
        opciones: [
          "No aplica",
          "No",
          "Embarazada",
          "Período de lactancia",
          "Embarazada y lactancia",
        ],
        mostrarSi: (r) =>
          r.genero === "Femenino" && r.edad >= 15 && r.edad <= 50,
        descripcionCientifica: "Embarazo/lactancia aumentan requerimientos de folato, B12, B6, C. Deficiencias pueden tener consecuencias.",
      },
      {
        id: "trimestre_embarazo",
        texto: "¿En qué trimestre de embarazo se encuentra?",
        tipo: "radio",
        opciones: [
          "Primer trimestre",
          "Segundo trimestre",
          "Tercer trimestre",
        ],
        mostrarSi: (r) =>
          r.embarazo === "Embarazada" ||
          r.embarazo === "Embarazada y lactancia",
        descripcionCientifica:
          "Requerimientos varían por trimestre. Folato crítico en primer trimestre.",
      },
      {
        id: "altura",
        texto: "¿Cuál es su altura? (cm)",
        tipo: "numero",
        min: 0,
        max: 250,
        descripcionCientifica:
          "Altura y peso para IMC. Bajo peso aumenta riesgo, obesidad puede asociarse a deficiencias específicas.",
      },
      {
        id: "peso",
        texto: "¿Cuál es su peso? (kg)",
        tipo: "numero",
        min: 3,
        max: 300,
        descripcionCientifica:
          "Peso y altura para IMC. Importante para estimar requerimientos energéticos y nutricionales.",
      },
      {
        id: "perdida_peso",
        texto: "¿Ha perdido peso involuntariamente en los últimos 3 meses?",
        tipo: "radio",
        opciones: [
          "No",
          "Sí, menos del 5% de mi peso",
          "Sí, entre 5-10% de mi peso",
          "Sí, más del 10% de mi peso",
        ],
        descripcionCientifica:
          "Pérdida de peso involuntaria puede indicar malabsorción o ingesta insuficiente. >10% en 3 meses es significativo.",
      }
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
      {
        id: "fatiga_hora",
        texto: "¿En qué momento del día la fatiga es más intensa?",
        tipo: "radio",
        opciones: [
          "Por la mañana, al despertar",
          "A media mañana",
          "Después de comer (postprandial)",
          "Por la tarde",
          "Todo el día, sin variación clara",
        ],
        mostrarSi: (r) =>
          r.fatiga &&
          ["A veces", "Frecuentemente", "Siempre"].includes(r.fatiga),
        nutrientes: ["B1", "B12"],
        descripcionCientifica: "Fatiga postprandial sugiere B1, matutina persistente B12 o anemias.",
      },
      {
        id: "irritabilidad",
        texto: "¿Se siente irritable, ansioso/a o con cambios de humor sin motivo aparente?",
        tipo: "escala",
        opciones: [
          "Nunca",
          "Raramente",
          "A veces",
          "Frecuentemente",
          "Siempre",
        ],
        nutrientes: ["B1", "B6", "B9", "B12"],
        descripcionCientifica: "B6, B9, B12 involucradas en síntesis de neurotransmisores del estado de ánimo.",
      },
      {
        id: "concentracion",
        texto: "¿Tiene dificultad para concentrarse o problemas de memoria?",
        tipo: "escala",
        opciones: [
          "Nunca",
          "Raramente",
          "A veces",
          "Frecuentemente",
          "Siempre",
        ],
        nutrientes: ["B1", "B3", "B6", "B12"],
        descripcionCientifica: "B1, B3, B6, B12 esenciales para función cognitiva. B12 particularmente importante.",
      }
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
      {
        id: "problemas_piel",
        texto: "¿Ha notado problemas en la piel como dermatitis, descamación o erupciones?",
        tipo: "escala",
        opciones: [
          "No",
          "Ligeramente",
          "Moderadamente",
          "Bastante",
          "Mucho",
        ],
        nutrientes: ["B2", "B3", "B6", "B7"],
        descripcionCientifica: "Manifestaciones dermatológicas características de B2, B3, B6, B7.",
      },
      {
        id: "tipo_problemas_piel",
        texto: "¿Qué tipo de problemas de piel ha notado principalmente?",
        tipo: "checkbox",
        opciones: [
          "Descamación o piel seca",
          "Erupciones o manchas rojas",
          "Dermatitis seborreica (escamas grasientas)",
          "Lesiones en zonas expuestas al sol",
          "Mala cicatrización",
        ],
        mostrarSi: (r) => r.problemas_piel && r.problemas_piel !== "No",
        nutrientes: ["B2", "B3", "B6", "B7", "C"],
        descripcionCientifica: "Dermatitis seborreica (B2,B6), lesiones fotoexpuestas (B3), descamación (B7), mala cicatrización (C).",
      }
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
      {
        id: "cantidad_alcohol",
        texto: "En un día típico de consumo, ¿cuántas unidades de alcohol consume? (1 unidad = 1 cerveza pequeña, 1 copa de vino o 1 medida de licor)",
        tipo: "radio",
        opciones: [
          "1-2 unidades",
          "3-4 unidades",
          "5-6 unidades",
          "Más de 6 unidades",
        ],
        mostrarSi: (r) => r.alcohol && r.alcohol !== "Nunca",
        nutrientes: ["B1", "B6", "B9", "B12"],
        descripcionCientifica: "Consumos >4 unidades/día (H) y >3 (M) aumentan riesgo.",
      },
      {
        id: "estres",
        texto: "¿Cuál es su nivel habitual de estrés?",
        tipo: "escala",
        opciones: ["Muy bajo", "Bajo", "Moderado", "Alto", "Muy alto"],
        nutrientes: ["B5", "B6", "B9", "C"],
        descripcionCientifica: "Estrés crónico aumenta utilización de B5, B6, C.",
      }
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
      {
        id: "tipo_carne",
        texto: "¿Qué tipo de carne consume con mayor frecuencia?",
        tipo: "radio",
        opciones: [
          "Principalmente carne roja (res, cordero)",
          "Principalmente carne blanca (pollo, pavo)",
          "Ambas por igual",
          "Principalmente vísceras (hígado, riñones)",
        ],
        mostrarSi: (r) =>
          r.carnes &&
          r.carnes !== "Nunca" &&
          r.alimentacion !== "Vegana (ningún producto animal)" &&
          r.alimentacion !== "Vegetariana (sin carne ni pescado)",
        nutrientes: ["B1", "B2", "B3", "B12"],
        descripcionCientifica: "Vísceras (hígado) muy ricas en B12. Roja más B12/hierro, aves más niacina.",
      },
      {
        id: "pescados",
        texto: "¿Con qué frecuencia consume pescado o mariscos?",
        tipo: "escala",
        opciones: [
          "Nunca",
          "1-2 veces/mes",
          "1-2 veces/semana",
          "3-4 veces/semana",
          "Diariamente",
        ],
        nutrientes: ["B1", "B3", "B6", "B12"],
        mostrarSi: (r) =>
          r.alimentacion !== "Vegana (ningún producto animal)" &&
          r.alimentacion !== "Vegetariana (sin carne ni pescado)",
        descripcionCientifica: "Pescados grasos (salmón, sardinas) excelentes fuentes de B12 y niacina. Mariscos (almejas) muy ricos en B12.",
      }
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
      {
        id: "marca_multivitaminico", 
        texto: "Si recuerda la marca o nombre del multivitamínico, indíquelo aquí:",
        tipo: "texto",
        mostrarSi: (r) => r.multivitaminico && r.multivitaminico !== "No",
        descripcionCientifica: "Composición varía. Conocer producto permite evaluación precisa."
      },
      {
        id: "suplementos_b",
        texto: "¿Toma algún suplemento específico de vitaminas del complejo B?",
        tipo: "checkbox",
        opciones: [
          "B12 (cobalamina/metilcobalamina)",
          "B9 (ácido fólico/metilfolato)",
          "B6 (piridoxina)",
          "B1 (tiamina)",
          "Complejo B (mezcla)",
          "Ninguno",
        ],
        descripcionCientifica: "Suplementos específicos necesarios en ciertos casos (veganos B12, embarazadas folato)."
      }
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
      {
        id: "folato_serico_input",
        texto: "Folato sérico (ng/mL o nmol/L)",
        tipo: "numero",
        min: 0,
        nutrientes: ["B9"],
        descripcionCientifica: "Nivel sérico de folato. Valores <3-4 ng/mL indican deficiencia."
      },
      {
        id: "homocisteina_input",
        texto: "Homocisteína plasmática (μmol/L)",
        tipo: "numero",
        min: 0,
        nutrientes: ["B12", "B9", "B6"],
        descripcionCientifica: "Elevada en deficiencia de B12, B9, B6. Óptimo <10 μmol/L."
      }
    ],
  },
];

export default SECCIONES_CUESTIONARIO;
