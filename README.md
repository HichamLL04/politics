# Portal de Políticas de Privacidad

WebUI diseñada para alojar de forma limpia, centralizada y automatizada las políticas de privacidad de tus aplicaciones móviles para Google Play Console y repositorios de software.

Cumple con el RGPD (Reglamento UE 2016/679), la LOPD-GDD (Ley Orgánica 3/2018) y las directrices de desarrollador de Google Play (incluyendo COPPA para menores).

---

## Estructura del Repositorio

```text
politics/
├── .github/
│   └── workflows/
│       ├── deploy.yml            # Despliegue automático a GitHub Pages en cada push
│       └── new-policy.yml        # Generador de políticas con 1 clic
├── apps/                         # Cada aplicación aislada en su propia carpeta
│   └── tic-tac-toe/
│       └── index.html            # Política de Tic Tac Toe
├── assets/                       # Recursos comunes
│   ├── css/
│   │   └── styles.css
│   └── js/
│       └── app.js
├── scripts/
│   └── generate-policy.js        # Script generador de políticas conforme a RGPD
├── index.html                    # Portal principal
└── README.md                     # Documentación
```

---

## Automatización con GitHub Actions

### 1. deploy.yml — Despliegue Automático a GitHub Pages
Cada vez que haces push a `main`:
- Se compila y publica automáticamente a GitHub Pages.
- Para habilitarlo:
  1. En GitHub ve a **Settings** > **Pages**.
  2. En **Build and deployment > Source**, selecciona **GitHub Actions**.

### 2. new-policy.yml — Crear Nuevas Políticas desde GitHub
Para añadir una política sin tocar código:
1. Ve a la pestaña **Actions** en tu repositorio de GitHub.
2. Selecciona **Crear Nueva Política de App**.
3. Haz clic en **Run workflow**, introduce el nombre de la app (ej: `Brick Breaker`) y la categoría.
4. El workflow creará `apps/brick-breaker/index.html`, actualizará `index.html` y desplegará la web.

También puedes ejecutarlo localmente:
```bash
node scripts/generate-policy.js --name "Mi App" --slug "mi-app" --category "Juegos"
```

---

## URL para Google Play Console

Enlace directo para Tic Tac Toe:

```text
https://<tu-usuario-github>.github.io/politics/apps/tic-tac-toe/
```

Contacto de soporte configurado: `suport+hichamlaaouni.dev@gmail.com`.
