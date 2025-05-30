import React from 'react';
import styled from 'styled-components';
import Pregunta from './Pregunta';

// Estilos
const SeccionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 25px;
`;

const SeccionHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const IconoSeccion = styled.span`
  font-size: 24px;
  margin-right: 10px;
`;

const SeccionInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const SeccionTitulo = styled.h2`
  font-size: ${props => props.theme.fonts.baseSize * 1.3}px;
  margin: 0;
  margin-bottom: 5px;
  color: ${props => props.theme.colors.primary};
`;

const SeccionDescripcion = styled.p`
  font-size: ${props => props.theme.fonts.baseSize * 0.9}px;
  margin: 0;
  color: ${props => props.theme.colors.text}CC;
`;

// Componente de sección
const Seccion = ({ seccion, respuestas, onRespuestaChange, preguntasAdicionales, mostrarRequeridos }) => {
  // Verificar si se pasaron los datos necesarios
  if (!seccion) {
    return <div>Error: No se proporcionaron datos de sección</div>;
  }
  
  // Filtrar preguntas que deben mostrarse según condiciones
  const preguntasFiltradas = seccion.preguntas.filter(pregunta => {
    // Si la pregunta tiene una condición para mostrarse, evaluarla
    if (pregunta.mostrarSi) {
      return pregunta.mostrarSi(respuestas || {});
    }
    // Si no tiene condición, siempre se muestra
    return true;
  });
  
  // Obtener preguntas adicionales que pertenecen a esta sección
  const preguntasAdicionalesFiltradas = Object.values(preguntasAdicionales || {}).filter(
    pregunta => pregunta.seccionOriginal === seccion.id
  );
  
  // Combinar preguntas regulares y adicionales
  const todasLasPreguntas = [...preguntasFiltradas, ...preguntasAdicionalesFiltradas];
  
  return (
    <SeccionContainer>
      <SeccionHeader>
        <IconoSeccion>{seccion.icon}</IconoSeccion>
        <SeccionInfo>
          <SeccionTitulo>{seccion.titulo}</SeccionTitulo>
          <SeccionDescripcion>{seccion.descripcion}</SeccionDescripcion>
        </SeccionInfo>
      </SeccionHeader>
      
      {todasLasPreguntas.map(pregunta => (
        <Pregunta
          key={pregunta.id}
          pregunta={pregunta}
          respuesta={respuestas ? respuestas[pregunta.id] : undefined}
          onChange={valor => onRespuestaChange(pregunta.id, valor)}
          requerida={mostrarRequeridos && pregunta.requerida}
        />
      ))}
      
      {todasLasPreguntas.length === 0 && (
        <p>No hay preguntas disponibles en esta sección.</p>
      )}
    </SeccionContainer>
  );
};

export default Seccion;