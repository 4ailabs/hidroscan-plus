// Información base sobre nutrientes
export const NUTRIENTES_INFO = {
    B1: {
        nombre: "Vitamina B1 (Tiamina)",
        nombreCientifico: "Tiamina pirofosfato (TPP)",
        fuentes:
            "Cereales integrales, legumbres, carnes (especialmente cerdo), semillas, nueces",
        deficiencia:
            "Beriberi (periférico, húmedo o seco), encefalopatía de Wernicke, síndrome de Korsakoff, neuropatía periférica, insuficiencia cardíaca de alto gasto",
        imagen: "🌾",
        descripcion:
            "Coenzima esencial para el metabolismo de carbohidratos, función neurológica y producción de energía celular, crucial para la actividad de enzimas del ciclo de Krebs",
        RDA: {
            infantil: "0.5 mg/día",
            adolescentes: "1.0-1.2 mg/día",
            adultos: "Hombres: 1.2 mg/día, Mujeres: 1.1 mg/día",
            embarazo: "1.4 mg/día",
            lactancia: "1.4 mg/día",
            mayores65: "1.2 mg/día",
        },
        biomarcadores: {
            sangre: "Tiamina pirofosfato eritrocitaria (ETPP)",
            celular: "Actividad transketolasa eritrocitaria",
            valor_referencia: "ETPP > 70 nmol/L",
            intervalo_referencia: [70, 180],
            sensibilidad: 0.82,
            especificidad: 0.88,
        },
        interaccionesNutrientes: {
            magnesio: {
                efecto: "negativo",
                magnitud: 0.7,
                mecanismo:
                    "El magnesio es cofactor para actividad de tiamina kinasa",
            },
            alcohol: {
                efecto: "negativo",
                magnitud: 1.8,
                mecanismo:
                    "Interfiere con absorción intestinal y conversión a forma activa",
            },
        },
        interaccionesFarmacos: {
            diureticos: {
                efecto: "negativo",
                magnitud: 1.4,
                mecanismo: "Aumento de excreción renal",
                tiempo_efecto: 4,
            },
            metformina: {
                efecto: "negativo",
                magnitud: 1.2,
                mecanismo: "Posible alteración de absorción intestinal",
                tiempo_efecto: 12,
            },
        },
        pesoEnSintomas: {
            neurologicos: {
                peso: 1.8,
                especificidad: 0.75,
                prevalencia_deficiencia: 0.85,
                prevalencia_normal: 0.15,
            },
            cardiovasculares: {
                peso: 1.5,
                especificidad: 0.82,
                prevalencia_deficiencia: 0.68,
                prevalencia_normal: 0.08,
            },
            gastrointestinales: {
                peso: 0.9,
                especificidad: 0.45,
                prevalencia_deficiencia: 0.55,
                prevalencia_normal: 0.22,
            },
        },
        ponderacionTotal: 1.6,
        incertidumbre: {
            base: 0.2,
            con_biomarcadores: 0.08,
            min_preguntas_relevantes: 5,
        },
        prevalencia: {
            general: 0.02,
            alcoholismo: 0.25,
            adultos_mayores: 0.06,
            embarazo: 0.04,
            actividad_fisica_intensa: 0.08,
        },
    },
    B2: {
        nombre: "Vitamina B2 (Riboflavina)",
        nombreCientifico:
            "Flavina adenina dinucleótido (FAD), Flavina mononucleótido (FMN)",
        fuentes:
            "Lácteos, huevos, carnes magras, vegetales de hoja verde, cereales enriquecidos, hongos",
        deficiencia:
            "Queilosis, estomatitis angular, glositis (lengua magenta), dermatitis seborreica, anemia normocítica",
        imagen: "👄",
        descripcion:
            "Componente esencial de coenzimas FAD y FMN, críticas para reacciones oxidativas celulares, metabolismo energético y protección antioxidante",
        RDA: {
            infantil: "0.5 mg/día",
            adolescentes: "1.0-1.3 mg/día",
            adultos: "Hombres: 1.3 mg/día, Mujeres: 1.1 mg/día",
            embarazo: "1.4 mg/día",
            lactancia: "1.6 mg/día",
            mayores65: "1.3 mg/día",
        },
        biomarcadores: {
            sangre: "Riboflavina plasmática, Coeficiente de activación de glutatión reductasa eritrocitaria (EGRAC)",
            celular: "Niveles de FAD y FMN en glóbulos rojos",
            valor_referencia: "EGRAC < 1.4",
            intervalo_referencia: [1.0, 1.4],
            sensibilidad: 0.85,
            especificidad: 0.92,
        },
        interaccionesNutrientes: {
            hierro: {
                efecto: "bidireccional",
                magnitud: 0.9,
                mecanismo: "B2 necesaria para utilización de hierro",
            },
            b6: {
                efecto: "positivo",
                magnitud: 0.8,
                mecanismo: "Necesaria para activación de piridoxal kinasa",
            },
            zinc: {
                efecto: "positivo",
                magnitud: 0.7,
                mecanismo: "Cofactor en metabolismo de B2",
            },
        },
        interaccionesFarmacos: {
            anticonvulsivantes: {
                efecto: "negativo",
                magnitud: 1.3,
                mecanismo: "Inducción enzimática, aumento de catabolismo",
                tiempo_efecto: 8,
            },
            antidepresivos: {
                efecto: "negativo",
                magnitud: 1.2,
                mecanismo: "Interferencia con metabolismo de flavinas",
                tiempo_efecto: 6,
            },
            anticonceptivos: {
                efecto: "negativo",
                magnitud: 1.4,
                mecanismo: "Alteración de absorción y metabolismo",
                tiempo_efecto: 12,
            },
        },
        pesoEnSintomas: {
            mucosas: {
                peso: 1.7,
                especificidad: 0.82,
                prevalencia_deficiencia: 0.88,
                prevalencia_normal: 0.12,
            },
            dermatologicos: {
                peso: 1.6,
                especificidad: 0.75,
                prevalencia_deficiencia: 0.78,
                prevalencia_normal: 0.15,
            },
            oculares: {
                peso: 1.3,
                especificidad: 0.65,
                prevalencia_deficiencia: 0.55,
                prevalencia_normal: 0.18,
            },
        },
        ponderacionTotal: 1.4,
        incertidumbre: {
            base: 0.25,
            con_biomarcadores: 0.1,
            min_preguntas_relevantes: 4,
        },
        prevalencia: {
            general: 0.04,
            veganos: 0.15,
            adultos_mayores: 0.08,
            embarazo: 0.07,
            deportistas: 0.05,
        },
    },
    B3: {
        nombre: "Vitamina B3 (Niacina)",
        nombreCientifico:
            "Nicotinamida adenina dinucleótido (NAD), Nicotinamida adenina dinucleótido fosfato (NADP)",
        fuentes:
            "Carnes (pollo, pavo, cerdo), pescado (atún, salmón), cacahuetes, cereales enriquecidos, champiñones",
        deficiencia:
            "Pelagra (dermatitis, diarrea, demencia), glositis, estomatitis, fatiga, depresión",
        imagen: "🍄",
        descripcion:
            "Esencial para más de 400 enzimas, implicada en metabolismo energético, reparación del ADN y señalización celular.",
        RDA: {
            infantil: "6-8 mg NE/día",
            adolescentes: "12-16 mg NE/día",
            adultos: "Hombres: 16 mg NE/día, Mujeres: 14 mg NE/día",
            embarazo: "18 mg NE/día",
            lactancia: "17 mg NE/día",
            mayores65: "16 mg NE/día",
        },
        biomarcadores: {
            sangre: "Niveles de NAD/NADP en eritrocitos",
            celular:
                "Excreción urinaria de N-methylnicotinamide (NMN) y 2-piridona",
            valor_referencia: "NMN > 1.2 mg/día",
            intervalo_referencia: [1.2, 4.0],
            sensibilidad: 0.75,
            especificidad: 0.8,
        },
        interaccionesNutrientes: {
            triptofano: {
                efecto: "positivo",
                magnitud: 0.8,
                mecanismo:
                    "El triptófano puede convertirse en niacina en el cuerpo",
            },
            b2_b6: {
                efecto: "positivo",
                magnitud: 0.7,
                mecanismo:
                    "B2 y B6 son cofactores en la conversión de triptófano a niacina",
            },
        },
        interaccionesFarmacos: {
            isoniazida: {
                efecto: "negativo",
                magnitud: 1.5,
                mecanismo: "Inhibe la conversión de triptófano a niacina",
                tiempo_efecto: 8,
            },
        },
        pesoEnSintomas: {
            dermatologicos: {
                peso: 1.9,
                especificidad: 0.9,
                prevalencia_deficiencia: 0.8,
                prevalencia_normal: 0.02,
            },
            gastrointestinales: {
                peso: 1.5,
                especificidad: 0.7,
                prevalencia_deficiencia: 0.65,
                prevalencia_normal: 0.1,
            },
            neurologicos: {
                peso: 1.8,
                especificidad: 0.85,
                prevalencia_deficiencia: 0.5,
                prevalencia_normal: 0.05,
            },
        },
        ponderacionTotal: 1.7,
        incertidumbre: {
            base: 0.22,
            con_biomarcadores: 0.09,
            min_preguntas_relevantes: 5,
        },
        prevalencia: {
            general: 0.01,
            alcoholismo: 0.15,
            malabsorcion: 0.1,
            dietas_maiz: 0.2,
        },
    },
    // Incluir aquí el resto de nutrientes...
};

// Niveles de riesgo para cada nutriente
export const NIVELES_RIESGO = {
    B1: [
        { min: 0, max: 2, nivel: "bajo" },
        { min: 2, max: 4, nivel: "medio" },
        { min: 4, max: 7, nivel: "alto" },
        { min: 7, max: Infinity, nivel: "critico" },
    ],
    B2: [
        { min: 0, max: 2, nivel: "bajo" },
        { min: 2, max: 4.5, nivel: "medio" },
        { min: 4.5, max: 7, nivel: "alto" },
        { min: 7, max: Infinity, nivel: "critico" },
    ],
    B3: [
        { min: 0, max: 2, nivel: "bajo" },
        { min: 2, max: 5, nivel: "medio" },
        { min: 5, max: 8, nivel: "alto" },
        { min: 8, max: Infinity, nivel: "critico" },
    ],
    // Incluir aquí el resto de niveles para otros nutrientes...
};

// Referencias científicas
export const REFERENCIAS_CIENTIFICAS = [
    {
        id: "ref-1",
        titulo: "Thiamine deficiency and its prevention and control",
        autores: "Johnson LE, Nasser M",
        revista: "Annual Review of Nutrition",
        año: 2022,
        doi: "10.1146/annurev-nutr-072921-125738",
        url: "https://doi.org/10.1146/annurev-nutr-072921-125738"
    },
    {
        id: "ref-2",
        titulo: "Biochemical and clinical assessment of riboflavin status",
        autores: "Powers HJ, Wright AJ, Davis RE",
        revista: "Journal of Nutritional Biochemistry",
        año: 2021,
        doi: "10.1016/j.jnutbio.2020.108569",
        url: "https://doi.org/10.1016/j.jnutbio.2020.108569"
    },
    {
        id: "ref-3",
        titulo: "Niacin requirements and metabolic function in human nutrition",
        autores: "Kirkland JB, Meyer-Ficca ML",
        revista: "Nutrients",
        año: 2023,
        doi: "10.3390/nu15010187",
        url: "https://doi.org/10.3390/nu15010187"
    },
    // Otras referencias pueden agregarse aquí
];

export default NUTRIENTES_INFO;