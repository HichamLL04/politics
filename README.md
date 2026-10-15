# ⚖️ Portal de Políticas de Privacidad (Legal Hub)

WebUI diseñada para alojar de forma limpia, centralizada y automatizada las **Políticas de Privacidad** de tus aplicaciones móviles para **Google Play Console** y repositorios de software.

Adaptada a la normativa europea y española (**RGPD** - Reglamento UE 2016/679 y **LOPD-GDD** - Ley Orgánica 3/2018), así como a las directrices de desarrollador de Google Play (incluyendo **COPPA** para menores).

---

## 📁 Arquitectura Modular del Repositorio

```text
politics/
├── .github/
│   └── workflows/
│       ├── deploy.yml            # Despliegue automático a GitHub Pages en cada push
│       └── new-policy.yml        # Generador automático de políticas con 1 clic
├── apps/                         # Cada aplicación aislada en su propia carpeta
│   └── tic-tac-toe/
│       └── index.html            # Política completa de Tic Tac Toe (RGPD + Play Console)
├── assets/                       # Recursos comunes aislados
│   ├── css/
│   │   └── styles.css
│   └── js/
│       └── app.js
├── scripts/
│   └── generate-policy.js        # Script generador de políticas conforme a RGPD
├── index.html                    # Portal principal (Buscador y catálogo de apps)
└── README.md                     # Documentación
```

---

## ⚡ Automatización con GitHub Actions (Workflows)

El repositorio incluye dos flujos de trabajo (*workflows*) totalmente listos:

### 1. `deploy.yml` — Despliegue Automático a GitHub Pages
Cada vez que haces un `git push` a la rama `main`:
- Se compila y publica automáticamente a GitHub Pages.
- Para habilitarlo la primera vez:
  1. En GitHub ve a **Settings** > **Pages**.
  2. En **Build and deployment > Source**, selecciona **GitHub Actions**.

### 2. `new-policy.yml` — Crear Nuevas Políticas con 1 Clic desde GitHub
Puedes crear la política para cualquier nueva aplicación sin escribir código:
1. Ve a la pestaña **Actions** en tu repositorio de GitHub.
2. Selecciona **Crear Nueva Política de App** en la columna izquierda.
3. Haz clic en **Run workflow**, escribe el nombre de la app (ej: `Brick Breaker`), su categoría y tu correo.
4. El bot de GitHub creará automáticamente la carpeta `apps/brick-breaker/index.html`, actualizará el catálogo en `index.html` y la publicará en internet.

*(También puedes ejecutarlo localmente desde tu terminal con:)*
```bash
node scripts/generate-policy.js --name "Mi Nuevo Juego" --slug "mi-nuevo-juego" --category "Juegos"
```

---

## 🚀 URL para Google Play Console

Tu enlace público directo para **Tic Tac Toe** es:

```text
https://<tu-usuario-github>.github.io/politics/apps/tic-tac-toe/
```

Pégalo directamente en **Google Play Console** &rarr; **Contenido de la aplicación** &rarr; **Política de privacidad**.
