// Tema claro por defecto
export const theme = {
  colors: {
    primary: '#2563eb',
    secondary: '#1e40af',
    background: '#F8F9FA',
    text: '#212529',
    dark: '#1a1a1a',
    light: '#ffffff',
    error: '#dc2626',
    warning: '#f59e0b',
    success: '#16a34a',
  },
  fonts: {
    family: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif',
    baseSize: 16,
    heading: {
      small: 1.1,
      medium: 1.3,
      large: 1.8,
    },
  },
  borderRadius: 12,
  shadows: {
    sm: '0 1px 3px rgba(0,0,0,0.1)',
    md: '0 4px 6px rgba(0,0,0,0.1)',
    lg: '0 10px 15px rgba(0,0,0,0.1)',
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },
  animaciones: true,
};

// Tema oscuro
export const darkTheme = {
  ...theme,
  colors: {
    ...theme.colors,
    background: '#121212',
    dark: '#1e1e1e',
    text: '#e0e0e0',
    light: '#2a2a2a',
    primary: '#3b82f6',
    secondary: '#60a5fa',
  },
  shadows: {
    sm: '0 1px 3px rgba(0,0,0,0.3)',
    md: '0 4px 6px rgba(0,0,0,0.3)',
    lg: '0 10px 15px rgba(0,0,0,0.3)',
  },
};