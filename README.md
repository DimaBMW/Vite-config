# Vite-config
`vite.config.ts`
## Vite plugins
> [Rollup Plugin Visualizer](https://github.com/btd/rollup-plugin-visualizer.git)
 (68.4k / gzipped: 21.4k) 
Визуализируйте и проанализируйте свой пакет Rollup, чтобы увидеть, какие модули занимают место.

> [Vite Plugin Html](https://github.com/vbenjs/vite-plugin-html.git) (1.2М / gzipped: 346.9k)  Оптимизация HTML

> [Rollup Plugin Terser](https://github.com/rollup/plugins/tree/master/packages/terser#readme) (490.2k / gzipped: 133.9k) Плагин Rollup для создания минимизированного пакета с помощью terser.

## Vite build settings [читать](https://vite.dev/config/build-options.html)
> `target: 'esnext'` - Другое специальное значение 'esnext'— «-», которое предполагает собственную поддержку динамического импорта и будет выполнять только минимальную транспиляцию.

> `minify: 'terser'` - Минификация с помощью Terser, [подробнее](https://terser.org/docs/api-reference/#minify-options)
```ts
    terserOptions: {
      compress: {
        drop_console: true, 
        pure_funcs: ['console.info', 'console.debug'],
      },
    },
```

> `rollupOptions` - Разделение на чанки по библиотекам
```ts
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return id.toString().split('node_modules/')[1].split('/')[0].toString(); 
          }
        },
      },
    },
```

## Vite server settings [читать](https://vite.dev/config/server-options.html)
```ts
  server: {
    open: true, // Автоматически открывать браузер
    hmr: true, // Замена модулей
    port: 3000, // Порт сервера
    strictPort: true, // Использование указанного порта
    cors: true, // Включение CORS
  },
```

## Vite scss variables [читать](https://vite.dev/config/shared-options.html#css-modules)
```ts
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "@/app/styles/_variables.scss";',
      },
    },
  },
```
> Применение глобальных переменных для всего проекта

## Vite alias settings [читать](https://vite.dev/config/shared-options.html#resolve-alias)
> `npm path` - необходимо установить `npm install --save path` далее установить типы для Node.js `npm install --save-dev @types/node`. Создаем файл `typings.d.t` с содержимым ->
```ts
declare module 'path'
```
Настройка alias
```ts
resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
```

## Vite .env settings [читать](https://vite.dev/guide/env-and-mode.html#env-variables-and-modes)
```ts
  define: {
    'process.env': {
      NODE_ENV: process.env.NODE_ENV, 
    },
  },
```

## Vite optimizeDeps settings [читать](https://vite.dev/config/dep-optimization-options.html#optimizedeps-entries)
```ts
  optimizeDeps: {
    include: ['react', 'react-dom'], 
  },
```


"Буду рад слышать ваши предложения по улучшению данной кофигурации Vite"
