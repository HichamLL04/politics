# ⚖️ Portal de Políticas de Privacidad (Legal Hub)

WebUI diseñada para alojar de forma limpia, centralizada y modular las **Políticas de Privacidad** de tus aplicaciones móviles para **Google Play Console** y repositorios de software.

Adaptada a la normativa legal europea y española (**RGPD** - Reglamento UE 2016/679 y **LOPD-GDD** - Ley Orgánica 3/2018), así como a las directrices de desarrollador de Google Play (incluyendo **COPPA** para menores).

---

## 📁 Nueva Estructura Modular y Limpia

Para evitar tener archivos sueltos y mezclar repositorios, la arquitectura se divide por carpetas aisladas:

```text
politics/
├── index.html                   # Portal principal (Buscador y catálogo de apps)
├── assets/                      # Estilos y scripts comunes
│   ├── css/
│   │   └── styles.css
│   └── js/
│       └── app.js
├── apps/                        # Cada app/repositorio tiene su subcarpeta propia
│   └── tic-tac-toe/
│       └── index.html           # Política específica de Tic Tac Toe (RGPD + Play Console)
└── README.md                    # Documentación
```

> **¿Por qué carpetas aisladas en lugar de ramas (branches)?**  
> GitHub Pages solo permite servir **una única rama a la vez** por repositorio en `Settings > Pages`. Si usáramos una rama para cada aplicación, solo una de ellas podría estar online a la vez.  
> Con la estructura de subcarpetas `apps/<nombre-app>/index.html`:
> - Todas tus aplicaciones están 100% online simultáneamente bajo el mismo dominio gratuito de GitHub Pages.
> - La raíz queda completamente limpia.
> - La URL para Google Play Console queda corta y sin extensiones: `https://<tu-usuario>.github.io/politics/apps/tic-tac-toe/`.

---

## 📋 Estructura Legal Implementada (Plantilla RGPD / LOPD-GDD)

Basada en los estándares de cumplimiento legal de referencia:

1. **Identidad del Responsable:** Datos del desarrollador y contacto.
2. **Principios del Tratamiento:** Licitud, transparencia, minimización y confidencialidad.
3. **Obtención y Categorías de Datos:** Especifica el almacenamiento local en dispositivo y ausencia de datos identificativos.
4. **Finalidad del Tratamiento:** Funcionamiento técnico y soporte.
5. **Legitimación:** Consentimiento del interesado e interés legítimo.
6. **Destinatarios y Terceros:** Google Play Services, Google AdMob, GitHub Pages.
7. **Derechos del Usuario (ARCO-POL):** Acceso, rectificación, supresión y derecho de reclamación ante la AEPD.
8. **Privacidad de Menores:** Cumplimiento de COPPA y RGPD (aptitud para familias).
9. **Seguridad de los Datos:** Medidas de protección en Android.
10. **Contacto Directo:** Canal de soporte por correo.

---

## 🚀 Despliegue en GitHub Pages y Google Play Console

1. **Sube tus cambios a GitHub:**
   ```bash
   git add .
   git commit -m "Organizacion modular apps/ y politica RGPD Tic Tac Toe"
   git push origin main
   ```

2. **Activa GitHub Pages:**
   - En tu repositorio de GitHub: **Settings** &rarr; **Pages**.
   - En **Source**, selecciona **Deploy from a branch**.
   - En **Branch**, selecciona `main` y la carpeta `/(root)`.
   - Guarda los cambios.

3. **URL para Google Play Console:**
   Tu URL pública directa es:
   ```text
   https://<tu-usuario-github>.github.io/politics/apps/tic-tac-toe/
   ```
   Pégala en **Google Play Console** &rarr; **Contenido de la aplicación** &rarr; **Política de privacidad**.
