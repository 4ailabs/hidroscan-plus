import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { SECCIONES_CUESTIONARIO } from '../data/cuestionario';
import Pregunta from './Pregunta';
import BarraProgreso from './BarraProgreso';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  flex: 1;
  overflow-y: auto;
  padding: 20px;
`;

const SeccionTitulo = styled.h2`
  color: ${props => props.theme.colors.primary};
  margin-bottom: 15px;
  font-size: ${props => props.theme.fonts.baseSize * 1.5}px;
`;

const SeccionDescripcion = styled.p`
  margin-bottom: 20px;
  color: ${props => props.theme.colors.text}aa;
`;

const NavButtons = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
  gap: 10px;
`;

const Button = styled.button`
  background-color: ${props => props.isPrimary ? props.theme.colors.primary : 'transparent'};
  color: ${props => props.isPrimary ? 'white' : props.theme.colors.primary};
  border: ${props => props.isPrimary ? 'none' : `1px solid ${props.theme.colors.primary}`};
  border-radius: 8px;
  padding: 12px 25px;
  font-size: ${props => props.theme.fonts.baseSize * 1.1}px;
  font-weight: 500;
  cursor: pointer;
  flex: ${props => props.fullWidth ? '1' : 'initial'};
  transition: all 0.3s ease;
  
  &:hover {
    background-color: ${props => props.isPrimary ? props.theme.colors.secondary : props.theme.colors.primary + '11'};
  }
  
  &:disabled {
    background-color: ${props => props.theme.colors.text}33;
    color: ${props => props.theme.colors.text}77;
    border-color: transparent;
    cursor: not-allowed;
  }
`;

const SeccionIcon = styled.span`
  font-size: 24px;
  margin-right: 10px;
  vertical-align: middle;
`;

const Cuestionario = ({ navegarA }) => {
  const [seccionActual, setSeccionActual] = useState(0);
  const [respuestas, setRespuestas] = useState({});
  const [preguntasAdicionales, setPreguntasAdicionales] = useState({});
  const [seccionesFiltradas, setSeccionesFiltradas] = useState([]);
  
  // Filtramos secciones según mostrarSiGlobal
  useEffect(() => {
    const secciones = SECCIONES_CUESTIONARIO.filter(
      s => !s.mostrarSiGlobal || s.mostrarSiGlobal({ mostrarBiomarcadores: false })
    );
    setSeccionesFiltradas(secciones);
  }, []);
  
  // Generamos preguntas adaptativas según las respuestas
  useEffect(() => {
    const nuevasPreguntas = generarPreguntasAdaptativas(respuestas);
    setPreguntasAdicionales(nuevasPreguntas);
  }, [respuestas]);
  
  // Función para generar preguntas adaptativas
  const generarPreguntasAdaptativas = (respuestasUsuario) => {
    const nuevasPreguntas = {};
    
    // Ejemplo de pregunta adaptativa
    if (
      respuestasUsuario.hormigueo &&
      ["Frecuentemente", "Siempre"].includes(respuestasUsuario.hormigueo)
    ) {
      if (!respuestasUsuario.hormigueo_simetria) {
        nuevasPreguntas.hormigueo_simetria = {
          id: "hormigueo_simetria",
          texto: "¿El hormigueo/entumecimiento es simétrico en ambos lados del cuerpo?",
          tipo: "radio",
          opciones: [
            "Sí, simétrico",
            "No, asimétrico",
            "No estoy seguro/a",
          ],
          nutrientes: ["B12"],
          seccionOriginal: "sintomas_especificos"
        }
      }
    }
    
    return nuevasPreguntas;
  };
  
  const handleRespuesta = (preguntaId, valor) => {
    setRespuestas(prevState => ({
      ...prevState,
      [preguntaId]: valor
    }));
  };
  
  const avanzarSeccion = () => {
    if (seccionActual < seccionesFiltradas.length - 1) {
      setSeccionActual(seccionActual + 1);
      window.scrollTo(0, 0);
    } else {
      // Enviar respuestas para análisis
      console.log("Respuestas completas:", respuestas);
      navegarA('resultados', { respuestas });
    }
  };
  
  const retrocederSeccion = () => {
    if (seccionActual > 0) {
      setSeccionActual(seccionActual - 1);
      window.scrollTo(0, 0);
    } else {
      navegarA('inicio');
    }
  };
  
  // Si aún no hay secciones filtradas, mostramos un loading
  if (seccionesFiltradas.length === 0) {
    return <Container>Cargando cuestionario...</Container>;
  }
  
  const seccionActualData = seccionesFiltradas[seccionActual];
  const progreso = ((seccionActual + 1) / seccionesFiltradas.length) * 100;
  
  const preguntasVisibles = seccionActualData.preguntas.filter(
    pregunta => !pregunta.mostrarSi || pregunta.mostrarSi(respuestas)
  );
  
  // Añadir preguntas adicionales que pertenecen a esta sección
  const preguntasAdicionalesSeccion = Object.values(preguntasAdicionales)
    .filter(p => p.seccionOriginal === seccionActualData.id);
  
  const todasLasPreguntas = [...preguntasVisibles, ...preguntasAdicionalesSeccion];
  
  return (
    <Container>
      <BarraProgreso progreso={progreso} />
      
      <SeccionTitulo>
        <SeccionIcon>{seccionActualData.icon}</SeccionIcon>
        {seccionActualData.titulo}
      </SeccionTitulo>
      
      <SeccionDescripcion>
        {seccionActualData.descripcion}
      </SeccionDescripcion>
      
      {todasLasPreguntas.map((pregunta) => (
        <Pregunta
          key={pregunta.id}
          pregunta={pregunta}
          valor={respuestas[pregunta.id]}
          onChange={(valor) => handleRespuesta(pregunta.id, valor)}
        />
      ))}
      
      <NavButtons>
        <Button 
          onClick={retrocederSeccion}
        >
          {seccionActual === 0 ? "Volver al inicio" : "Anterior"}
        </Button>
        
        <Button 
          isPrimary 
          onClick={avanzarSeccion}
        >
          {seccionActual === seccionesFiltradas.length - 1 ? "Ver resultados" : "Siguiente"}
        </Button>
      </NavButtons>
    </Container>
  );
};

export default Cuestionario;