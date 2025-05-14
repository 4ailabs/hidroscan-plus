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
    B5: {
        nombre: "Vitamina B5 (Ácido Pantoténico)",
        nombreCientifico: "Coenzima A (CoA)",
        fuentes: "Amplia distribución: hígado, riñón, pollo, ternera, huevos, brócoli, aguacate, cereales integrales",
        deficiencia: "Rara, pero puede incluir fatiga, insomnio, parestesias ('síndrome de los pies ardientes'), irritabilidad, vómitos.",
        imagen: "🥑",
        descripcion: "Componente esencial de la Coenzima A (CoA), crucial para el metabolismo de carbohidratos, grasas y proteínas, y la síntesis de ácidos grasos, colesterol y hormonas esteroideas.",
        RDA: {
            infantil: "1.7-3 mg/día",
            adolescentes: "4-5 mg/día",
            adultos: "5 mg/día",
            embarazo: "6 mg/día",
            lactancia: "7 mg/día",
            mayores65: "5 mg/día",
        },
        biomarcadores: {
            sangre: "Concentración de ácido pantoténico en sangre total",
            celular: "Excreción urinaria de ácido pantoténico",
            valor_referencia: "Excreción urinaria > 1 mg/día",
            intervalo_referencia: [1, 7],
            sensibilidad: 0.6,
            especificidad: 0.7,
        },
        pesoEnSintomas: {
            neurologicos: {
                peso: 1.4,
                especificidad: 0.5,
                prevalencia_deficiencia: 0.7,
                prevalencia_normal: 0.2,
            },
            gastrointestinales: {
                peso: 0.8,
                especificidad: 0.4,
                prevalencia_deficiencia: 0.5,
                prevalencia_normal: 0.25,
            },
        },
        ponderacionTotal: 1.1,
        incertidumbre: {
            base: 0.3,
            con_biomarcadores: 0.15,
            min_preguntas_relevantes: 3,
        },
        prevalencia: {
            general: 0.005,
            malnutricion_severa: 0.05,
            alcoholismo_cronico: 0.03,
        },
    },
    B6: {
        nombre: "Vitamina B6 (Piridoxina)",
        nombreCientifico: "Piridoxal 5'-fosfato (PLP), Piridoxamina, Piridoxina",
        fuentes: "Garbanzos, hígado, atún, salmón, pollo, patatas, plátanos, cereales fortificados",
        deficiencia: "Dermatitis seborreica, glositis, queilosis, confusión, depresión, convulsiones, anemia microcítica",
        imagen: "🍌",
        descripcion: "Coenzima para más de 100 enzimas, implicada en el metabolismo de aminoácidos, neurotransmisores, glucógeno y síntesis de hemo.",
        RDA: {
            infantil: "0.5-0.6 mg/día",
            adolescentes: "1.0-1.3 mg/día",
            adultos: "Hombres/Mujeres (19-50): 1.3 mg/día; Hombres (>50): 1.7 mg/día; Mujeres (>50): 1.5 mg/día",
            embarazo: "1.9 mg/día",
            lactancia: "2.0 mg/día",
            mayores65: "H: 1.7 mg/d, M: 1.5 mg/d",
        },
        biomarcadores: {
            sangre: "Piridoxal 5'-fosfato (PLP) plasmático",
            celular: "Actividad de transaminasas eritrocitarias",
            valor_referencia: "PLP > 30 nmol/L",
            intervalo_referencia: [30, 110],
            sensibilidad: 0.88,
            especificidad: 0.85,
        },
        pesoEnSintomas: {
            dermatologicos: {
                peso: 1.6,
                especificidad: 0.75,
                prevalencia_deficiencia: 0.7,
                prevalencia_normal: 0.1,
            },
            neurologicos: {
                peso: 1.7,
                especificidad: 0.8,
                prevalencia_deficiencia: 0.6,
                prevalencia_normal: 0.1,
            },
            psicologicos: {
                peso: 1.5,
                especificidad: 0.7,
                prevalencia_deficiencia: 0.65,
                prevalencia_normal: 0.15,
            },
            hematologicos: {
                peso: 1.3,
                especificidad: 0.65,
                prevalencia_deficiencia: 0.4,
                prevalencia_normal: 0.05,
            },
        },
        ponderacionTotal: 1.5,
        incertidumbre: {
            base: 0.2,
            con_biomarcadores: 0.07,
            min_preguntas_relevantes: 5,
        },
        prevalencia: {
            general: 0.03,
            adultos_mayores: 0.1,
            alcoholismo: 0.2,
            uso_farmacos_antagonistas: 0.15,
        },
    },
    B7: {
        nombre: "Vitamina B7 (Biotina)",
        nombreCientifico: "Biotina, Coenzima R",
        fuentes: "Hígado, yema de huevo, salmón, cerdo, aguacate, nueces, semillas, levadura",
        deficiencia: "Rara, pero incluye dermatitis (especialmente periorificial), alopecia, conjuntivitis, síntomas neurológicos (depresión, letargo, alucinaciones, parestesias).",
        imagen: "🥚",
        descripcion: "Cofactor para carboxilasas esenciales en el metabolismo de grasas, carbohidratos y aminoácidos, y en la gluconeogénesis.",
        RDA: {
            infantil: "6-12 µg/día",
            adolescentes: "20-25 µg/día",
            adultos: "30 µg/día",
            embarazo: "30 µg/día",
            lactancia: "35 µg/día",
            mayores65: "30 µg/día",
        },
        biomarcadores: {
            sangre: "Biotina plasmática o sérica",
            celular: "Excreción urinaria de biotina y sus metabolitos (bisnorbiotina, biotina sulfóxido)",
            valor_referencia: "Excreción urinaria de biotina > 10 µg/día",
            intervalo_referencia: [10, 80],
            sensibilidad: 0.7,
            especificidad: 0.75,
        },
        pesoEnSintomas: {
            dermatologicos: {
                peso: 1.8,
                especificidad: 0.85,
                prevalencia_deficiencia: 0.9,
                prevalencia_normal: 0.05,
            },
            neurologicos: {
                peso: 1.2,
                especificidad: 0.6,
                prevalencia_deficiencia: 0.5,
                prevalencia_normal: 0.1,
            },
        },
        ponderacionTotal: 1.3,
        incertidumbre: {
            base: 0.28,
            con_biomarcadores: 0.12,
            min_preguntas_relevantes: 3,
        },
        prevalencia: {
            general: 0.001,
            consumo_avidina: 0.02,
            trastornos_geneticos_biotinidasa: 0.01,
        },
    },
    B9: {
        nombre: "Vitamina B9 (Ácido Fólico)",
        nombreCientifico: "Tetrahidrofolato (THF), 5-metiltetrahidrofolato (5-MTHF)",
        fuentes: "Vegetales de hoja verde (espinacas, kale), legumbres, espárragos, brócoli, aguacate, frutas cítricas, hígado, cereales fortificados",
        deficiencia: "Anemia megaloblástica, glositis, diarrea, fatiga, irritabilidad, defectos del tubo neural en recién nacidos.",
        imagen: "🥬",
        descripcion: "Esencial para la síntesis de ADN y ARN, metilación, metabolismo de aminoácidos (especialmente homocisteína) y división celular.",
        RDA: {
            infantil: "150-200 µg DFE/día",
            adolescentes: "300-400 µg DFE/día",
            adultos: "400 µg DFE/día",
            embarazo: "600 µg DFE/día",
            lactancia: "500 µg DFE/día",
            mayores65: "400 µg DFE/día",
        },
        biomarcadores: {
            sangre: "Folato sérico, folato eritrocitario (indicador de reservas a largo plazo)",
            celular: "Niveles de homocisteína plasmática (aumenta en deficiencia)",
            valor_referencia: "Folato eritrocitario > 140 ng/mL (>317 nmol/L)",
            intervalo_referencia: [140, 628],
            sensibilidad: 0.9,
            especificidad: 0.88,
        },
        pesoEnSintomas: {
            hematologicos: {
                peso: 1.8,
                especificidad: 0.85,
                prevalencia_deficiencia: 0.8,
                prevalencia_normal: 0.05,
            },
            neurologicos_desarrollo: {
                peso: 2.0,
                especificidad: 0.95,
                prevalencia_deficiencia: 0.1,
                prevalencia_normal: 0.001,
            },
            psicologicos: {
                peso: 1.4,
                especificidad: 0.65,
                prevalencia_deficiencia: 0.55,
                prevalencia_normal: 0.15,
            },
            gastrointestinales: {
                peso: 1.3,
                especificidad: 0.6,
                prevalencia_deficiencia: 0.5,
                prevalencia_normal: 0.15,
            },
        },
        ponderacionTotal: 1.8,
        incertidumbre: {
            base: 0.18,
            con_biomarcadores: 0.07,
            min_preguntas_relevantes: 5,
        },
        prevalencia: {
            general: 0.05,
            embarazo: 0.15,
            alcoholismo: 0.3,
            malabsorcion: 0.2,
        },
    },
    B12: {
        nombre: "Vitamina B12 (Cobalamina)",
        nombreCientifico: "Metilcobalamina, Adenosilcobalamina",
        fuentes: "Exclusivamente de origen animal: carnes, pescado, huevos, lácteos, mariscos. Alimentos fortificados.",
        deficiencia: "Anemia megaloblástica, neuropatía periférica, degeneración combinada subaguda de la médula espinal, fatiga, glositis, deterioro cognitivo, depresión.",
        imagen: "🥩",
        descripcion: "Esencial para la síntesis de ADN, función neurológica, formación de glóbulos rojos y metabolismo de grasas y proteínas (vía metilmalonil-CoA).",
        RDA: {
            infantil: "0.9-1.2 µg/día",
            adolescentes: "1.8-2.4 µg/día",
            adultos: "2.4 µg/día",
            embarazo: "2.6 µg/día",
            lactancia: "2.8 µg/día",
            mayores65: "2.4 µg/día (a menudo se recomienda suplemento o alimentos fortificados)",
        },
        biomarcadores: {
            sangre: "B12 sérica, holotranscobalamina (holoTC), ácido metilmalónico (MMA), homocisteína",
            celular: "Holotrascobalmina, análisis de neutrófilos hipersegmentados",
            valor_referencia: "B12 > 200 pg/mL, holoTC > 35 pmol/L, MMA < 0.4 µmol/L",
            intervalo_referencia: [200, 900],
            sensibilidad: 0.95,
            especificidad: 0.9,
        },
        pesoEnSintomas: {
            hematologicos: {
                peso: 1.7,
                especificidad: 0.8,
                prevalencia_deficiencia: 0.75,
                prevalencia_normal: 0.05,
            },
            neurologicos: {
                peso: 1.9,
                especificidad: 0.85,
                prevalencia_deficiencia: 0.7,
                prevalencia_normal: 0.1,
            },
            psiquiatricos: {
                peso: 1.5,
                especificidad: 0.7,
                prevalencia_deficiencia: 0.6,
                prevalencia_normal: 0.15,
            },
        },
        ponderacionTotal: 1.9,
        incertidumbre: {
            base: 0.15,
            con_biomarcadores: 0.06,
            min_preguntas_relevantes: 6,
        },
        prevalencia: {
            general: 0.04,
            adultos_mayores: 0.2,
            veganos: 0.7,
            vegetarianos: 0.25,
            gastrectomizados: 0.8,
        },
    },
    C: {
        nombre: "Vitamina C (Ácido Ascórbico)",
        nombreCientifico: "L-Ácido ascórbico, Ascorbato",
        fuentes: "Frutas cítricas, kiwi, pimientos, brócoli, fresas, tomates, patatas",
        deficiencia: "Escorbuto (sangrado gingival, petequias, equimosis, hiperqueratosis folicular), debilidad, dolor articular, cicatrización deficiente, anemia.",
        imagen: "🍊",
        descripcion: "Potente antioxidante, esencial para síntesis de colágeno, carnitina y neurotransmisores, metabolismo de aminoácidos, absorción de hierro no hemo y función inmune.",
        RDA: {
            infantil: "15-25 mg/día",
            adolescentes: "45-75 mg/día",
            adultos: "Hombres: 90 mg/día, Mujeres: 75 mg/día (fumadores +35 mg/día)",
            embarazo: "85 mg/día",
            lactancia: "120 mg/día",
            mayores65: "90 mg/día",
        },
        biomarcadores: {
            sangre: "Ascorbato plasmático o sérico, ascorbato leucocitario (mejor indicador de reservas tisulares)",
            celular: "Concentración intraleucocitaria de ascorbato",
            valor_referencia: "Ascorbato plasmático > 0.4 mg/dL (>23 µmol/L)",
            intervalo_referencia: [0.4, 2.0],
            sensibilidad: 0.92,
            especificidad: 0.9,
        },
        pesoEnSintomas: {
            tejido_conectivo: {
                peso: 1.8,
                especificidad: 0.85,
                prevalencia_deficiencia: 0.9,
                prevalencia_normal: 0.05,
            },
            inmunologicos: {
                peso: 1.4,
                especificidad: 0.6,
                prevalencia_deficiencia: 0.7,
                prevalencia_normal: 0.25,
            },
            mucosas: {
                peso: 1.7,
                especificidad: 0.75,
                prevalencia_deficiencia: 0.85,
                prevalencia_normal: 0.1,
            },
        },
        ponderacionTotal: 1.6,
        incertidumbre: {
            base: 0.2,
            con_biomarcadores: 0.1,
            min_preguntas_relevantes: 4,
        },
        prevalencia: {
            general: 0.05,
            malnutricion: 0.3,
            fumadores: 0.4,
            alcoholismo: 0.25,
            estres_cronico: 0.2,
        },
    }
};

// Niveles de riesgo para cada nutriente
export const NIVELES_RIESGO = {
    B1: [
        { min: 0, max: 2.5, nivel: "bajo" },
        { min: 2.5, max: 5.5, nivel: "medio" },
        { min: 5.5, max: 10, nivel: "alto" },
    ],
    B2: [
        { min: 0, max: 2.5, nivel: "bajo" },
        { min: 2.5, max: 5.5, nivel: "medio" },
        { min: 5.5, max: 10, nivel: "alto" },
    ],
    B3: [
        { min: 0, max: 2.5, nivel: "bajo" },
        { min: 2.5, max: 5.5, nivel: "medio" },
        { min: 5.5, max: 10, nivel: "alto" },
    ],
    B5: [
        { min: 0, max: 2.5, nivel: "bajo" },
        { min: 2.5, max: 5.5, nivel: "medio" },
        { min: 5.5, max: 10, nivel: "alto" },
    ],
    B6: [
        { min: 0, max: 2.5, nivel: "bajo" },
        { min: 2.5, max: 5.5, nivel: "medio" },
        { min: 5.5, max: 10, nivel: "alto" },
    ],
    B7: [
        { min: 0, max: 2.5, nivel: "bajo" },
        { min: 2.5, max: 5.5, nivel: "medio" },
        { min: 5.5, max: 10, nivel: "alto" },
    ],
    B9: [
        { min: 0, max: 2.5, nivel: "bajo" },
        { min: 2.5, max: 5.5, nivel: "medio" },
        { min: 5.5, max: 10, nivel: "alto" },
    ],
    B12: [
        { min: 0, max: 2.5, nivel: "bajo" },
        { min: 2.5, max: 5.5, nivel: "medio" },
        { min: 5.5, max: 10, nivel: "alto" },
    ],
    C: [
        { min: 0, max: 2.5, nivel: "bajo" },
        { min: 2.5, max: 5.5, nivel: "medio" },
        { min: 5.5, max: 10, nivel: "alto" },
    ],
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
