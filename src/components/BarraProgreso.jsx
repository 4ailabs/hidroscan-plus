import React from 'react';
import styled from 'styled-components';

const BarraContainer = styled.div`
  width: 100%;
  height: 8px;
  background-color: ${props => props.theme.colors.text}20;
  border-radius: 4px;
  margin-bottom: 20px;
  overflow: hidden;
`;

const BarraRelleno = styled.div`
  height: 100%;
  width: ${props => props.progreso}%;
  background-color: ${props => props.theme.colors.primary};
  border-radius: 4px;
  transition: width 0.5s ease;
`;

const BarraProgreso = ({ progreso }) => {
  return (
    <BarraContainer>
      <BarraRelleno progreso={progreso} />
    </BarraContainer>
  );
};

export default BarraProgreso;