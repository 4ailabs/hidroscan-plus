import React from 'react';
import styled from 'styled-components';

// Estilos
const BarraContenedor = styled.div`
  width: 100%;
  height: 6px;
  background-color: #e0e0e0;
  border-radius: 3px;
  margin-bottom: 20px;
  overflow: hidden;
  cursor: pointer;
`;

const BarraProgreso = styled.div`
  width: ${props => (props.progreso * 100)}%;
  height: 100%;
  background-color: ${props => props.theme.colors.primary};
  border-radius: 3px;
  transition: width 0.5s ease;
`;

const TextoProgreso = styled.div`
  text-align: right;
  font-size: ${props => props.theme.fonts.baseSize * 0.8}px;
  color: ${props => props.theme.colors.text}80;
  margin-bottom: 5px;
`;

const SeccionesContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 5px;
  margin-bottom: 15px;
`;

const SeccionIndicador = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${props => 
    props.activa 
      ? props.theme.colors.primary 
      : props.completada 
        ? props.theme.colors.success + '80'
        : '#e0e0e0'
  };
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: scale(1.2);
  }
`;

// Componente de barra de progreso
const BarraProgresoComponente = ({ secciones, seccionActual, onClickSeccion }) => {
  const progreso = secciones.length > 0 ? (seccionActual + 1) / secciones.length : 0;
  
  return (
    <>
      <TextoProgreso>
        {seccionActual + 1} de {secciones.length} {secciones.length === 1 ? 'sección' : 'secciones'}
      </TextoProgreso>
      
      <BarraContenedor>
        <BarraProgreso progreso={progreso} />
      </BarraContenedor>
      
      {secciones.length > 1 && (
        <SeccionesContainer>
          {secciones.map((_, index) => (
            <SeccionIndicador 
              key={index}
              activa={index === seccionActual}
              completada={index < seccionActual}
              onClick={() => onClickSeccion(index)}
            />
          ))}
        </SeccionesContainer>
      )}
    </>
  );
};

export default BarraProgresoComponente;