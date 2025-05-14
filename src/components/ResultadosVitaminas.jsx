import React from 'react';
import styled from 'styled-components';
import { NUTRIENTES_INFO } from '../data/nutrientesInfo';

const Container = styled.div`
  padding: 20px;
  max-width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h1`
  color: ${props => props.theme.colors.primary};
  margin-bottom: 20px;
`;

const Subtitle = styled.h2`
  color: ${props => props.theme.colors.text}dd;
  font-size: 1.2rem;
  margin-bottom: 30px;
  text-align: center;
`;

const ResultadoCard = styled.div`
  width: 100%;
  padding: 15px;
  border-radius: 12px;
  margin-bottom: 20px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  background-color: white;
  position: relative;
  overflow: hidden;
  border-left: 6px solid ${props => props.color || props.theme.colors.primary};
`;

const ResultadoHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const VitaminaEmoji = styled.span`
  font-size: 2rem;
  margin-right: 10px;
`;

const VitaminaTitle = styled.h3`
  margin: 0;
  flex: 1;
`;

const EtiquetaRiesgo = styled.span`
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.9rem;
  font-weight: bold;
  background-color: ${props => props.color}20;
  color: ${props => props.color};
`;

const ResultadoInfo = styled.div`
  margin-bottom: 15px;
`;

const BarraRiesgo = styled.div`
  height: 10px;
  background-color: ${props => props.theme.colors.text}20;
  border-radius: 5px;
  margin: 15px 0;
  position: relative;
`;

const IndicadorRiesgo = styled.div`
  position: absolute;
  width: 20px;
  height: 20px;
  background-color: ${props => props.color};
  border-radius: 50%;
  top: -5px;
  left: ${props => (props.nivel / 10) * 100}%;
  transform: translateX(-50%);
  box-shadow: 0 0 0 3px white, 0 0 0 5px ${props => props.color}40;
`;

const Recomendacion = styled.div`
  margin-top: 15px;
  padding: 10px;
  background-color: ${props => props.theme.colors.primary}10;
  border-radius: 8px;
`;

const RecomendacionTitle = styled.h4`
  margin-top: 0;
  margin-bottom: 5px;
  color: ${props => props.theme.colors.primary};
`;

const Button = styled.button`
  background-color: ${props => props.theme.colors.primary};
  color: white;
  border: none;
  border-radius: 8px;
  padding: 12px 25px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  margin-top: 20px;
  transition: background-color 0.3s;
  
  &:hover {
    background-color: ${props => props.theme.colors.secondary};
  }
`;

const ResultadosVitaminas = ({ resultados, navegarA }) => {
  // Si no hay resultados, redirigir al cuestionario
  if (!resultados || Object.keys(resultados).length === 0) {
    return (
      <Container>
        <Title>No hay resultados disponibles</Title>
        <Subtitle>Por favor, complete el cuestionario para ver sus resultados.</Subtitle>
        <Button onClick={() => navegarA('cuestionario')}>Ir al cuestionario</Button>
      </Container>
    );
  }

  const getEtiquetaYColor = (puntaje) => {
    if (puntaje < 3.5) return { etiqueta: 'Riesgo bajo', color: '#16a34a' };
    if (puntaje < 6.5) return { etiqueta: 'Riesgo moderado', color: '#f59e0b' };
    return { etiqueta: 'Riesgo alto', color: '#dc2626' };
  };
  
  // Ordena los resultados por nivel de riesgo (de mayor a menor)
  const resultadosOrdenados = Object.entries(resultados)
    .sort(([, puntajeA], [, puntajeB]) => puntajeB - puntajeA);

  return (
    <Container>
      <Title>Resultados de su evaluación</Title>
      <Subtitle>
        A continuación se muestra su perfil de riesgo para deficiencias de vitaminas hidrosolubles
      </Subtitle>
      
      {resultadosOrdenados.map(([nutrienteKey, puntaje]) => {
        const nutrienteInfo = NUTRIENTES_INFO[nutrienteKey];
        const { etiqueta, color } = getEtiquetaYColor(puntaje);
        
        // Obtener el nivel basado en el puntaje (0-10)
        const nivelRiesgo = Math.min(9.5, puntaje);
        
        // Obtenemos la recomendación según el nivel
        let recomendacion = "";
        if (puntaje < 3.5) {
          recomendacion = "Mantener hábitos alimentarios actuales que incluyan fuentes de esta vitamina.";
        } else if (puntaje < 6.5) {
          recomendacion = `Incrementar el consumo de alimentos ricos en ${nutrienteInfo.nombre} como ${nutrienteInfo.fuentes}.`;
        } else {
          recomendacion = `Considere consultar con un profesional de la salud sobre su nivel de ${nutrienteInfo.nombre} y posibles suplementos.`;
        }
        
        return (
          <ResultadoCard key={nutrienteKey} color={color}>
            <ResultadoHeader>
              <VitaminaEmoji>{nutrienteInfo.imagen}</VitaminaEmoji>
              <VitaminaTitle>{nutrienteInfo.nombre}</VitaminaTitle>
              <EtiquetaRiesgo color={color}>{etiqueta}</EtiquetaRiesgo>
            </ResultadoHeader>
            
            <ResultadoInfo>
              {nutrienteInfo.descripcion}
            </ResultadoInfo>
            
            <BarraRiesgo>
              <IndicadorRiesgo color={color} nivel={nivelRiesgo} />
            </BarraRiesgo>
            
            <Recomendacion>
              <RecomendacionTitle>Recomendación:</RecomendacionTitle>
              <p>{recomendacion}</p>
            </Recomendacion>
          </ResultadoCard>
        );
      })}
      
      <Button onClick={() => navegarA('inicio')}>Volver al inicio</Button>
    </Container>
  );
};

export default ResultadosVitaminas;