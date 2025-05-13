import React from 'react';
import styled from 'styled-components';
import { useApp } from '../context/AppContext';

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
  text-align: center;
`;

const Logo = styled.img`
  max-width: 150px;
  max-height: 150px;
  margin-bottom: 20px;
`;

const Title = styled.h1`
  color: ${props => props.theme.colors.primary};
  font-size: ${props => props.theme.fonts.baseSize * 1.8}px;
  margin-bottom: 15px;
`;

const Description = styled.p`
  font-size: ${props => props.theme.fonts.baseSize * 1.1}px;
  color: ${props => props.theme.colors.text};
  margin-bottom: 30px;
  max-width: 500px;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 350px;
  gap: 12px;
`;

const PrimaryButton = styled.button`
  background-color: ${props => props.theme.colors.primary};
  color: white;
  border: none;
  border-radius: ${props => props.theme.borderRadius}px;
  padding: 12px 20px;
  font-size: ${props => props.theme.fonts.baseSize * 1.1}px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  
  &:hover {
    background-color: ${props => props.theme.colors.secondary};
    transform: translateY(-2px);
    box-shadow: 0 6px 8px rgba(0,0,0,0.12);
  }
`;

const SecondaryButton = styled.button`
  background-color: transparent;
  color: ${props => props.theme.colors.primary};
  border: 1px solid ${props => props.theme.colors.primary};
  border-radius: ${props => props.theme.borderRadius}px;
  padding: 12px 20px;
  font-size: ${props => props.theme.fonts.baseSize * 1.1}px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: ${props => props.theme.colors.primary}10;
  }
`;

const Disclaimer = styled.p`
  margin-top: 30px;
  font-size: ${props => props.theme.fonts.baseSize * 0.8}px;
  color: ${props => props.theme.colors.text}99;
  max-width: 450px;
`;

const PantallaInicio = () => {
  const { navegarA, resultados, config } = useApp();
  
  const handleIniciarEvaluacion = () => {
    navegarA('cuestionario');
  };
  
  const handleVerResultados = () => {
    navegarA('resultados');
  };
  
  return (
    <Container>
      {config.logoUrl && (
        <Logo src={config.logoUrl || '/logo.svg'} alt="Logo" />
      )}
      
      <Title>{config.nombreApp || 'HidroScanPlus'}</Title>
      
      <Description>
        Evaluador avanzado de vitaminas hidrosolubles con análisis 
        de precisión y recomendaciones personalizadas
      </Description>
      
      <ButtonContainer>
        <PrimaryButton onClick={handleIniciarEvaluacion}>
          Iniciar evaluación
        </PrimaryButton>
        
        {resultados && (
          <SecondaryButton onClick={handleVerResultados}>
            Ver últimos resultados
          </SecondaryButton>
        )}
      </ButtonContainer>
      
      <Disclaimer>
        Nota: Este evaluador no reemplaza el diagnóstico de un profesional sanitario. 
        Consulte siempre con su médico. Desarrollado por 4iaLabs.
      </Disclaimer>
    </Container>
  );
};

export default PantallaInicio;