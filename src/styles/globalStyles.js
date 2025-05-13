import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  
  body {
    font-family: ${props => props.theme.fonts.family};
    font-size: ${props => props.theme.fonts.baseSize}px;
    line-height: 1.5;
    color: ${props => props.theme.colors.text};
    background-color: ${props => props.theme.colors.background};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  
  h1, h2, h3, h4, h5, h6 {
    font-weight: 600;
    line-height: 1.2;
    margin-bottom: 0.5em;
  }
  
  p {
    margin-bottom: 1em;
  }
  
  button {
    cursor: pointer;
    font-family: inherit;
  }
  
  /* Estilo personalizado para campos de formulario */
  input, select, textarea, button {
    font-family: inherit;
    font-size: ${props => props.theme.fonts.baseSize}px;
  }
  
  input:focus, select:focus, textarea:focus {
    outline: 2px solid ${props => props.theme.colors.primary};
    outline-offset: 1px;
  }
  
  /* Animaciones condicionales */
  * {
    transition: ${props => props.theme.animaciones ? 'all 0.3s ease' : 'none'};
  }
`;

export default GlobalStyles;