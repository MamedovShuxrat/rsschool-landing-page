# rsschool-landing-page

Landing Page (Coffee House) — задание RS School.

## Стили

Стили написаны на SCSS:

- `styles/style.scss` — основной файл (сброс, шрифты, общие классы);
- `styles/blocks/` — стили отдельных блоков (`_header.scss` и т.д.), подключаются через `@use`.

Компиляция — расширение VS Code **Live Sass Compiler**: нажать «Watch Sass» в статус-баре.
Результат — `styles/style.css`. Он подключён в HTML и хранится в репозитории,
потому что GitHub Pages не компилирует SCSS.
