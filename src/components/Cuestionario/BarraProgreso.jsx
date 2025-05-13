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

// Componente de barra de progreso
const BarraProgresoComponente = ({ actual, total }) => {
  const progreso = total > 0 ? actual / total : 0;
  
  return (
    <>
      <TextoProgreso>
        {actual} de {total} {total === 1 ? 'sección' : 'secciones'}
      </TextoProgreso>
      <BarraContenedor>
        <BarraProgreso progreso={progreso} />
      </BarraContenedor>
    </>
  );
};

export default BarraProgresoComponente;