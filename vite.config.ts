import { defineConfig } from 'vite';

export default defineConfig({
  // Jeśli chcesz wymusić obsługę historii (routingu) w dev server:
  server: {
    proxy: {
      // Tu zazwyczaj konfiguruje się API, 
      // ale samo wejście na dowolny URL w dev mode i tak przekieruje do index.html
    }
  },
  // Opcjonalnie, jeśli chcesz mieć pełną kontrolę nad zachowaniem serwera:
  appType: 'spa' // To zapewnia, że Vite zawsze serwuje index.html dla nieznanych ścieżek
});