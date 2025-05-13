import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { useApp } from '../context/AppContext';
import GlobalStyles from '../styles/globalStyles';
import { theme, darkTheme } from '../styles/theme';
import PantallaInicio from './PantallaInicio';

const AppContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.theme.colors.background};
`;

const ContentContainer = styled.div`
  width: 100%;
  max-width: 600px;
  height: 100%;
  min-height: 80vh;
  border-radius: ${props => props.borderRadius || 12}px;
  overflow: hidden;
  background-color: ${props => props.temaOscuro ? props.theme.colors.dark : 'white'};
  box-shadow: ${props => props.estiloTarjeta === 'elevado' ? props.theme.shadows.md : 'none'};
  border: ${props => props.estiloTarjeta === 'plano' ? `1px solid ${props.theme.colors.text}20` : 'none'};
  display: flex;
  flex-direction: column;
  
  @media (max-width: 640px) {
    max-width: 100%;
    height: 100vh;
    min-height: 100vh;
    border-radius: 0;
  }
`;

const Footer = styled.div`
  width: 100%;
  padding: 5px 0;
  text-align: center;
  font-size: ${props => props.theme.fonts.baseSize * 0.7}px;
  color: ${props => props.theme.colors.text}80;
  background-color: ${props => props.temaOscuro ? 'rgba(0,0,0,0.2)' : 'rgba(0,0,0,0.03)'};
  border-top: 1px solid ${props => props.temaOscuro ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)'};
`;

// Valores predeterminados
const defaultConfig = {
  temaOscuro: false,
  colorPrimario: "#2563eb",
  colorSecundario: "#1e40af",
  colorFondo: "#F8F9FA",
  colorTexto: "#212529",
  colorError: "#dc2626",
  colorWarning: "#f59e0b",
  colorSuccess: "#16a34a",
  mostrarBarraProgreso: true,
  logoUrl: "logo.svg",
  nombreApp: "HidroScanPlus",
  fontSizeBase: 16,
  bordeRedondeado: 12,
  estiloTarjeta: "elevado",
  animaciones: true
};

const App = () => {
  // Manejamos el caso donde el contexto no está disponible
  let pantallaActual = 'inicio';
  let config = defaultConfig;
  
  try {
    // Intentamos usar el contexto, pero podría fallar durante la hidratación
    const context = useApp();
    if (context) {
      pantallaActual = context.pantallaActual || 'inicio';
      config = context.config || defaultConfig;
    }
  } catch (error) {
    console.error("Error al acceder al contexto:", error);
    // Continuamos con los valores por defecto
  }
  
  // Combinar tema base con configuración personalizada
  const temaCompleto = {
    ...(config.temaOscuro ? darkTheme : theme),
    colors: {
      ...(config.temaOscuro ? darkTheme.colors : theme.colors),
      primary: config.colorPrimario,
      secondary: config.colorSecundario,
      background: config.colorFondo,
      text: config.colorTexto,
      error: config.colorError,
      warning: config.colorWarning,
      success: config.colorSuccess,
    },
    fonts: {
      ...(config.temaOscuro ? darkTheme.fonts : theme.fonts),
      baseSize: config.fontSizeBase || theme.fonts.baseSize,
    },
  };
  
  // Renderizar la pantalla actual basada en el estado
  const renderizarPantallaActual = () => {
    switch (pantallaActual) {
      case 'inicio':
        return <PantallaInicio />;
      case 'cuestionario':
        // Temporalmente retornamos un mensaje hasta implementar el componente
        return <div style={{ padding: 20, textAlign: 'center' }}>Componente de Cuestionario (por implementar)</div>;
      case 'resultados':
        // Temporalmente retornamos un mensaje hasta implementar el componente
        return <div style={{ padding: 20, textAlign: 'center' }}>Componente de Resultados (por implementar)</div>;
      default:
        return <PantallaInicio />;
    }
  };

  return (
    <ThemeProvider theme={temaCompleto}>
      <GlobalStyles />
      <AppContainer>
        <ContentContainer 
          borderRadius={config.bordeRedondeado} 
          temaOscuro={config.temaOscuro}
          estiloTarjeta={config.estiloTarjeta}
        >
          {renderizarPantallaActual()}
          
          <Footer temaOscuro={config.temaOscuro}>
            {config.nombreApp} v2.0 © {new Date().getFullYear()}
          </Footer>
        </ContentContainer>
      </AppContainer>
    </ThemeProvider>
  );
};

export default App;