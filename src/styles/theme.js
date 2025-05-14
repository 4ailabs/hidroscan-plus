// Definición de temas para la aplicación

export const theme = {
  colors: {
    primary: '#2563eb',    // Azul principal
    secondary: '#1e40af',  // Azul más oscuro
    background: '#F8F9FA', // Gris muy claro
    dark: '#121212',       // Casi negro para modo oscuro
    text: '#212529',       // Gris muy oscuro (casi negro)
    error: '#dc2626',      // Rojo
    warning: '#f59e0b',    // Ámbar
    success: '#16a34a',    // Verde
  },
  fonts: {
    baseSize: 16,
    family: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
  },
  shadows: {
    sm: '0 1px 2px rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px rgba(0, 0, 0, 0.1)',
  },
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
  },
};

export const darkTheme = {
  ...theme,
  colors: {
    ...theme.colors,
    primary: '#3b82f6',    // Azul principal (más brillante para modo oscuro)
    secondary: '#60a5fa',   // Azul más claro
    background: '#121212',  // Casi negro
    dark: '#1f1f1f',        // Gris muy oscuro
    text: '#E9ECEF',        // Gris muy claro (casi blanco)
  },
};