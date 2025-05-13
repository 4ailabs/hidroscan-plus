import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const Title = styled.h1`
  color: #2563eb;
  margin-bottom: 30px;
`;

const Question = styled.div`
  margin-bottom: 30px;
  max-width: 600px;
  width: 100%;
  text-align: left;
  padding: 20px;
  border-radius: 8px;
  background-color: white;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
`;

const QuestionText = styled.h3`
  margin-bottom: 15px;
`;

const Options = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Option = styled.label`
  display: flex;
  align-items: center;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #f0f9ff;
  }
  
  input {
    margin-right: 10px;
  }
`;

const NavButtons = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 20px;
`;

const Button = styled.button`
  background-color: #2563eb;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 12px 25px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s;
  
  &:hover {
    background-color: #1e40af;
  }
  
  &:disabled {
    background-color: #cbd5e1;
    cursor: not-allowed;
  }
`;

const Cuestionario = ({ navegarA }) => {
  const [respuesta, setRespuesta] = React.useState('');
  
  const handleRespuestaChange = (e) => {
    setRespuesta(e.target.value);
  };
  
  const handleVolverClick = () => {
    if (typeof navegarA === 'function') {
      console.log("Volviendo a inicio usando navegarA");
      navegarA('inicio');
    } else {
      console.log("Volviendo a inicio con reload");
      // Fallback si la navegación no está disponible
      window.location.reload();
    }
  };
  
  return (
    <Container>
      <Title>Cuestionario de Evaluación</Title>
      
      <Question>
        <QuestionText>¿Con qué frecuencia consumes alimentos ricos en vitamina B12, como carne, pescado, huevos o lácteos?</QuestionText>
        <Options>
          <Option>
            <input 
              type="radio" 
              name="frecuencia" 
              value="diario" 
              checked={respuesta === 'diario'} 
              onChange={handleRespuestaChange}
            />
            Diariamente
          </Option>
          <Option>
            <input 
              type="radio" 
              name="frecuencia" 
              value="semanal" 
              checked={respuesta === 'semanal'} 
              onChange={handleRespuestaChange}
            />
            2-3 veces por semana
          </Option>
          <Option>
            <input 
              type="radio" 
              name="frecuencia" 
              value="mensual" 
              checked={respuesta === 'mensual'} 
              onChange={handleRespuestaChange}
            />
            Raramente (menos de una vez por semana)
          </Option>
          <Option>
            <input 
              type="radio" 
              name="frecuencia" 
              value="nunca" 
              checked={respuesta === 'nunca'} 
              onChange={handleRespuestaChange}
            />
            Nunca (soy vegetariano/vegano)
          </Option>
        </Options>
      </Question>
      
      <NavButtons>
        <Button onClick={handleVolverClick}>Volver al inicio</Button>
        <Button disabled={!respuesta}>Siguiente pregunta</Button>
      </NavButtons>
    </Container>
  );
};

export default Cuestionario;