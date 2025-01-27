import { defineConfig, type PluginOption } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { visualizer } from 'rollup-plugin-visualizer';
import { createHtmlPlugin } from 'vite-plugin-html';
import terser from '@rollup/plugin-terser';
import path from 'path';

export default defineConfig({
  plugins: [
    react(),
    visualizer({
      open: true, // Открыть визуализатор после сборки
      filename: 'adsource-app_bundle-visualizer.html', // Имя файла для визуализатора
      template: 'treemap', // Тип диаграммы
    }) as PluginOption,
    createHtmlPlugin({
      minify: true, // Минификация HTML
    }),
    terser(), // Минификация
  ],
  build: {
    target: 'esnext', // Поддержка динамического импорта и транспиляции
    minify: 'terser', // Минификация с помощью Terser
    sourcemap: true, // Включение sourcemaps
    terserOptions: {
      compress: {
        drop_console: true, // Удаление console.log
        pure_funcs: ['console.info', 'console.debug'], // Удаление других консольных функций
      },
    },
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return id.toString().split('node_modules/')[1].split('/')[0].toString(); // Разделение на чанки по библиотекам
          }
        },
      },
    },
  },
  server: {
    open: true, // Автоматически открывать браузер
    hmr: true, // Замена модулей
    port: 3000, // Порт сервера
    strictPort: true, // Использование указанного порта
    cors: true, // Включение CORS
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "@/app/styles/_variables.scss";', // Импорт переменных SCSS
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), // Алиас для папки src
    },
  },
  define: {
    'process.env': {
      NODE_ENV: process.env.NODE_ENV, // Поддержка переменных окружения
    },
  },
  optimizeDeps: {
    include: ['react', 'react-dom'], // Оптимизация зависимостей
  },
})
