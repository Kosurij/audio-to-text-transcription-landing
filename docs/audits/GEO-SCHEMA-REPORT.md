# Проверка JSON-LD — audio-to-text-transcription.com

Дата: 2026-09-15. Проверены исходники и HTML семи опубликованных страниц.

## Исправления после аудита

Внесены локально 2026-09-15: разметка разделена по страницам; FAQ и HowTo используют общие данные с интерфейсом; Organization описывает Kobaltstack LLC без неподтверждённого founder; профили продукта перенесены в SoftwareApplication; publisher связан через @id; логотип заменён доступным PNG 512×512; фиктивный SearchAction и browserRequirements удалены; непроверенные даты/версия исключены; рейтинг 5.0/70 синхронизирован с hero; недостоверные featureList и FAQ удалены; внутренние страницы получили WebPage/ContactPage и корректные BreadcrumbList.

Проверка: сборка и 18 тестов проходят, включая 4 новые проверки, воспроизводившие ошибки до исправлений. Рейтинг — снимок магазина, а не автоматическая синхронизация. Ниже сохранены результаты первоначального аудита. Изменения ещё не опубликованы.

## Результат первоначального аудита

JSON корректно разбирается на всех страницах и находится в исходном HTML в head, без необходимости выполнять JavaScript. Однако смысловые ошибки делают разметку ненадёжной. Числовая GEO-оценка не выставлялась: универсальная шкала с баллами за Article, SearchAction и количество профилей неприменима к этому лендингу и не измеряет цитируемость AI.

## Обнаруженные схемы

На каждой из страниц `/`, `/privacy/`, `/terms/`, `/refund/`, `/contact/`, `/welcome/`, `/uninstall/` присутствует одинаковый набор: WebSite, Organization, SoftwareApplication, HowTo, FAQPage, BreadcrumbList. Других форматов разметки при этой проверке не оценивали отдельно. Welcome и uninstall имеют noindex.

## Приоритетные исправления

1. **Высокий: недостоверные сведения о данных.** Layout.astro: featureList содержит `Privacy-Focused (no data collection)`, а FAQ — `we don't store or share your data`. Privacy явно описывает серверную обработку, передачу аудио Groq/OpenAI, аккаунты и аналитику. Заменить утверждения точным описанием: аудио обрабатывается на сервере временно, история хранится локально; условия — в Privacy. `Offline Functionality` и `Real-time Transcription` также требуют уточнения по реальным возможностям продукта.
2. **Высокий: разметка не соответствует странице.** FAQ, отзывы, предложения и HowTo главной распространяются на юридические страницы и Contact. Оставить подробную продуктовую разметку на главной; на внутренних страницах добавить WebPage/ContactPage с собственным URL, названием и описанием. Общую Organization можно использовать на всех страницах.
3. **Высокий: смешаны продукт и юридическое лицо.** Organization имеет legalName Kobaltstack LLC, founder Yuri Kosenko и sameAs на карточки расширения. Авторство продукта не подтверждает основание Kobaltstack LLC. Не утверждать founder компании без подтверждения; профили продукта связать с SoftwareApplication. WebSite.publisher должен ссылаться на один Organization через @id вместо отдельного анонимного объекта.
4. **Средний: сломанный логотип.** https://audio-to-text-transcription.com/logo.png возвращает HTTP 404; файла нет в public. Указать существующий доступный логотип, проверив размер и содержание.
5. **Средний: FAQ расходится с видимым контентом.** Из 11 вопросов JSON-LD только 5 дословно встречаются в видимом тексте. Разметка содержит отсутствующие вопросы о приватности, экспорте, языках и интернете, а также неподтверждённую цифру точности 95%. Использовать один источник вопросов/ответов для интерфейса и JSON-LD.
6. **Средний: устаревшие сведения магазина.** JSON-LD: версия 1.5, рейтинг 4.9, 72 оценки, dateModified 2026-08-29. Карточка Chrome Web Store на момент проверки: версия 1.20.0, рейтинг 5.0, 70 оценок, обновление 2026-09-10. В видимом hero также 4.9, а число 72 не показано. Обновлять видимый контент и разметку согласованно либо убрать поля, которые не поддерживаются в актуальном состоянии. Источник даты первой публикации 2025-01-01 не подтверждён.
7. **Средний: фиктивный поиск.** SearchAction ведёт на `/?q={search_term_string}`, но реализации поиска в проекте нет. Удалить действие. Google убрал sitelinks search box в 2024 году; наличие SearchAction не требуется для хорошей разметки.
8. **Низкий: хлебные крошки.** Везде только Home. На внутренних страницах нужны Home → текущая страница с корректным URL; одноэлементные крошки главной не дают полезной иерархии.
9. **Низкий: browserRequirements.** По Schema.org это свойство WebApplication, а текущий тип — SoftwareApplication. Для расширения можно удалить поле; выбирать WebApplication только если он точно описывает продукт.

## Что уже корректно

- Kobaltstack LLC и полный новый адрес присутствуют в Organization. При первом запросе главная ещё возвращала SHIFT LLC; повторный запрос уже вернул Kobaltstack LLC. Причина переходного состояния не установлена.
- Цены Free $0, Basic $6.99, Pro $12.99, Max $19.99 совпадают с текущими тарифами в исходниках; платные предложения содержат месячную длительность P1M.
- FAQ о возврате сохраняет 30-дневную гарантию.
- JSON синтаксически валиден, используется @graph, абсолютные URL, существующие типы Schema.org.
- Семь текстов отзывов представлены на главной; для одного отличается типографский апостроф. Текущая подлинность каждого отзыва отдельно не проверялась.

## Проверка sameAs

| Профиль | HTTP | Примечание |
|---|---|---|
| https://www.producthunt.com/products/audio-to-text-transcription | 200 | Карточка продукта, не доказательство идентичности Kobaltstack LLC |
| https://chromewebstore.google.com/detail/audio-to-text-transcription/pkfoaaglghblmjjjpbniicjcpehfbmgd | 200 после перенаправления | Финальный slug audio-to-text-transcripti; ID расширения совпадает |
| https://www.nxgntools.com/tools/audio-to-text-transcription | 200 | Карточка продукта |

HTTP 200 подтверждает доступность, но не юридическую принадлежность профиля. Не добавлять вымышленные профили ради количества sameAs.

## Пример разметки внутренней страницы

Добавить в общий @graph для /privacy/ после того, как WebSite получит @id https://audio-to-text-transcription.com/#website:

```json
{
  "@type": "WebPage",
  "@id": "https://audio-to-text-transcription.com/privacy/#webpage",
  "url": "https://audio-to-text-transcription.com/privacy/",
  "name": "Privacy Policy - Audio To Text Transcription",
  "description": "Learn how Audio To Text Transcription collects, uses, and protects your data.",
  "isPartOf": { "@id": "https://audio-to-text-transcription.com/#website" },
  "publisher": { "@id": "https://audio-to-text-transcription.com/#organization" },
  "inLanguage": "en",
  "dateModified": "2026-09-15"
}
```

Не добавлять Article, LocalBusiness, speakable или SearchAction без подходящего реального контента/функциональности. FAQPage и HowTo остаются словарными типами, но их наличие не гарантирует расширенную выдачу или AI-цитирование. Google прекратил FAQ rich results с 7 мая 2026 года.

## Методика и ограничения

Использованы GET-запросы опубликованных страниц, JSON.parse/JSON-декодирование, сопоставление с видимым HTML и исходниками, HTTP-проверки ссылок. Проверка не является результатом Google Rich Results Test, Schema.org Validator или Search Console. Изменения в код в рамках аудита не вносились.

После исправлений нужны тесты на состав графа каждой страницы, отсутствие недостоверных утверждений, единый FAQ и доступность URL логотипа, затем проверка опубликованных страниц в Rich Results Test и Schema.org Validator.

## Официальные источники

- https://developers.google.com/search/docs/appearance/structured-data/sd-policies — достоверность, видимость и релевантность разметки.
- https://developers.google.com/search/docs/appearance/structured-data/software-app — требования к SoftwareApplication.
- https://schema.org/SoftwareApplication — словарь типа.
- https://schema.org/browserRequirements — область применения WebApplication.
- https://developers.google.com/search/updates — отмена FAQ rich results в мае 2026 года.
- https://developers.google.com/search/blog/2024/10/sitelinks-search-box — отмена sitelinks search box.
