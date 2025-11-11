# Audio To Text Transcription Landing Page

Лендинг-страница для Chrome расширения Audio To Text Transcription, созданная на Astro + Vue.

## Технологии

- **Astro** - для SSR и SEO оптимизации
- **Vue 3** - для интерактивных компонентов
- **TypeScript** - для типобезопасности

## Установка

```bash
npm install
```

## Разработка

```bash
npm run dev
```

Откройте [http://localhost:4321](http://localhost:4321) в браузере.

## Сборка

```bash
npm run build
```

Собранные файлы будут в папке `dist/`.

## Структура проекта

```
/
├── public/          # Статические файлы (favicon, robots.txt)
├── src/
│   ├── components/  # Vue компоненты
│   ├── layouts/     # Astro layouts
│   └── pages/       # Страницы (index.astro)
└── package.json
```

## Особенности

- ✅ SEO оптимизация с мета-тегами
- ✅ Open Graph и Twitter Cards
- ✅ Адаптивный дизайн
- ✅ Темная/светлая тема (поддержка системной темы)
- ✅ Плавные анимации
- ✅ Современный UI/UX

## TODO

- [ ] Добавить страницу `/welcome` с гифкой
- [ ] Добавить страницу `/uninstall`
- [ ] Обновить URL Chrome Web Store в `InstallButton.vue`
- [ ] Добавить sitemap.xml
- [ ] Добавить аналитику (если нужно)

