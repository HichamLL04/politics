#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
function getArg(flag, defaultValue = '') {
  const index = args.indexOf(flag);
  return index !== -1 && args[index + 1] ? args[index + 1] : defaultValue;
}

const appName = getArg('--name') || process.env.APP_NAME;
const appSlug = (getArg('--slug') || process.env.APP_SLUG || (appName ? appName.toLowerCase().replace(/[^a-z0-9]+/g, '-') : '')).replace(/^-+|-+$/g, '');
const category = getArg('--category') || process.env.APP_CATEGORY || 'Aplicación';
const email = getArg('--email') || process.env.APP_EMAIL || 'suport+hichamlaaouni.dev@gmail.com';
const developer = getArg('--dev') || process.env.APP_DEV || 'Hicham';

if (!appName || !appSlug) {
  console.error('Error: Debes especificar --name "Nombre de la App" y --slug "nombre-carpeta"');
  process.exit(1);
}

const targetDir = path.join(__dirname, '..', 'apps', appSlug);
const targetFile = path.join(targetDir, 'index.html');

if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

const today = new Date().toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' });

const template = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Política de Privacidad | ${appName}</title>
  <meta name="description" content="Política de Privacidad para la aplicación ${appName}. Cumplimiento con RGPD, LOPD-GDD y Google Play Console.">
  <link rel="stylesheet" href="../../assets/css/styles.css">
</head>
<body>

  <!-- Navigation -->
  <header class="navbar">
    <div class="container nav-content">
      <a href="../../index.html" class="brand-link">
        Políticas de Privacidad
      </a>
      <div class="nav-actions">
        <div class="lang-selector">
          <button type="button" class="lang-btn active" data-lang="es" onclick="setLanguage('es')">ES</button>
          <button type="button" class="lang-btn" data-lang="en" onclick="setLanguage('en')">EN</button>
        </div>
        <button id="theme-toggle-btn" class="control-btn" onclick="toggleTheme()" aria-label="Cambiar tema">
          Modo Claro
        </button>
      </div>
    </div>
  </header>

  <main class="container">
    <!-- Header -->
    <section class="policy-header">
      <nav class="policy-breadcrumb" aria-label="Breadcrumb">
        <a href="../../index.html" data-lang-es="Inicio" data-lang-en="Home">Inicio</a>
        <span>/</span>
        <span>${appName}</span>
      </nav>

      <h1 class="policy-title" data-lang-es="Política de Privacidad — ${appName}" data-lang-en="Privacy Policy — ${appName}">
        Política de Privacidad — ${appName}
      </h1>

      <div class="policy-meta-info">
        <div><strong data-lang-es="Última actualización:" data-lang-en="Last updated:">Última actualización:</strong> ${today}</div>
        <div><strong data-lang-es="Responsable:" data-lang-en="Data Controller:">Responsable:</strong> ${developer}</div>
        <div><strong data-lang-es="Aplicación:" data-lang-en="Application:">Aplicación:</strong> ${appName} (Android)</div>
      </div>
    </section>

    <!-- Google Play Direct Copy Banner -->
    <div class="google-play-banner">
      <div class="banner-text">
        <h4 data-lang-es="URL para Google Play Console" data-lang-en="Google Play Console URL">URL para Google Play Console</h4>
        <p data-lang-es="Enlace público para el apartado Política de Privacidad en Play Console." data-lang-en="Public URL for the Privacy Policy section in Play Console.">
          Enlace público para el apartado Política de Privacidad en Play Console.
        </p>
      </div>
      <div class="url-box">
        <code id="current-page-url">https://tu-usuario.github.io/politics/apps/${appSlug}/</code>
        <button class="btn-primary" onclick="copyCurrentUrl()" style="padding: 6px 12px; font-size: 0.8rem;" data-lang-es="Copiar" data-lang-en="Copy">Copiar</button>
      </div>
    </div>

    <!-- Layout: Sidebar + Document Content -->
    <div class="policy-layout">
      <!-- Sidebar TOC -->
      <aside class="policy-sidebar">
        <div class="toc-title" data-lang-es="Contenido" data-lang-en="Contents">Contenido</div>
        <ul class="toc-nav">
          <li><a href="#responsable" class="toc-link" data-lang-es="1. Responsable" data-lang-en="1. Controller">1. Responsable</a></li>
          <li><a href="#principios" class="toc-link" data-lang-es="2. Principios de tratamiento" data-lang-en="2. Principles">2. Principios de tratamiento</a></li>
          <li><a href="#datos" class="toc-link" data-lang-es="3. Datos tratados" data-lang-en="3. Data Handled">3. Datos tratados</a></li>
          <li><a href="#finalidad" class="toc-link" data-lang-es="4. Finalidad" data-lang-en="4. Purpose">4. Finalidad</a></li>
          <li><a href="#legitimacion" class="toc-link" data-lang-es="5. Legitimación" data-lang-en="5. Legal Basis">5. Legitimación</a></li>
          <li><a href="#terceros" class="toc-link" data-lang-es="6. Servicios de terceros" data-lang-en="6. Third Parties">6. Servicios de terceros</a></li>
          <li><a href="#derechos" class="toc-link" data-lang-es="7. Tus derechos" data-lang-en="7. Your Rights">7. Tus derechos</a></li>
          <li><a href="#menores" class="toc-link" data-lang-es="8. Privacidad de menores" data-lang-en="8. Children's Privacy">8. Privacidad de menores</a></li>
          <li><a href="#seguridad" class="toc-link" data-lang-es="9. Seguridad" data-lang-en="9. Security">9. Seguridad</a></li>
          <li><a href="#contacto" class="toc-link" data-lang-es="10. Contacto" data-lang-en="10. Contact">10. Contacto</a></li>
        </ul>
      </aside>

      <!-- Content -->
      <article class="policy-content">

        <section id="responsable" class="policy-section">
          <h2 data-lang-es="1. Identidad del Responsable" data-lang-en="1. Identity of Data Controller">1. Identidad del Responsable</h2>
          <p data-lang-es="El Titular informa a los usuarios sobre su Política de Privacidad respecto del tratamiento de datos al usar <strong>${appName}</strong>." data-lang-en="The Controller informs users regarding the Privacy Policy applicable to <strong>${appName}</strong>.">
            El Titular informa a los usuarios sobre su Política de Privacidad respecto del tratamiento de datos al usar <strong>${appName}</strong>.
          </p>
          <div class="info-box">
            <ul>
              <li><strong>Titular:</strong> ${developer}</li>
              <li><strong>Aplicación:</strong> ${appName}</li>
              <li><strong>Correo electrónico:</strong> <a href="mailto:${email}">${email}</a></li>
              <li><strong>Sitio Web:</strong> <a href="../../index.html">Portal de Políticas</a></li>
            </ul>
          </div>
        </section>

        <section id="principios" class="policy-section">
          <h2 data-lang-es="2. Principios de Tratamiento" data-lang-en="2. Principles of Data Processing">2. Principios de Tratamiento</h2>
          <p data-lang-es="Se aplican estrictamente los principios de licitud, transparencia, minimización de datos y confidencialidad exigidos por el RGPD." data-lang-en="Strict adherence to GDPR principles of lawfulness, transparency, data minimization, and confidentiality.">
            Se aplican estrictamente los principios de licitud, transparencia, minimización de datos y confidencialidad exigidos por el RGPD.
          </p>
        </section>

        <section id="datos" class="policy-section">
          <h2 data-lang-es="3. Datos Tratados" data-lang-en="3. Data Handled">3. Datos Tratados</h2>
          <p data-lang-es="La aplicación no requiere registro. La información técnica y preferencias se guardan de forma estrictamente local en el dispositivo." data-lang-en="The application does not require registration. Technical preferences are stored strictly locally on the device.">
            La aplicación no requiere registro. La información técnica y preferencias se guardan de forma estrictamente local en el dispositivo.
          </p>
        </section>

        <section id="finalidad" class="policy-section">
          <h2 data-lang-es="4. Finalidad del Tratamiento" data-lang-en="4. Purpose of Data Processing">4. Finalidad del Tratamiento</h2>
          <p data-lang-es="Garantizar la correcta ejecución de la app en Android y atender consultas de soporte técnico." data-lang-en="Ensure proper app execution on Android and handle technical support inquiries.">
            Garantizar la correcta ejecución de la app en Android y atender consultas de soporte técnico.
          </p>
        </section>

        <section id="legitimacion" class="policy-section">
          <h2 data-lang-es="5. Legitimación para el Tratamiento" data-lang-en="5. Legal Basis">5. Legitimación para el Tratamiento</h2>
          <p data-lang-es="Consentimiento del usuario al instalar la aplicación o contactar por correo electrónico." data-lang-en="User consent upon installing the app or sending an email inquiry.">
            Consentimiento del usuario al instalar la aplicación o contactar por correo electrónico.
          </p>
        </section>

        <section id="terceros" class="policy-section">
          <h2 data-lang-es="6. Servicios de Terceros" data-lang-en="6. Third-Party Services">6. Servicios de Terceros</h2>
          <p data-lang-es="Servicios estándar de plataforma provistos por Google Play Services." data-lang-en="Standard platform services provided by Google Play Services.">
            Servicios estándar de plataforma provistos por Google Play Services.
          </p>
        </section>

        <section id="derechos" class="policy-section">
          <h2 data-lang-es="7. Tus Derechos" data-lang-en="7. Your Rights">7. Tus Derechos</h2>
          <p data-lang-es="Para ejercer tus derechos de acceso, rectificación o supresión, escribe a <a href='mailto:${email}'>${email}</a>." data-lang-en="To exercise your rights, email us at <a href='mailto:${email}'>${email}</a>.">
            Para ejercer tus derechos de acceso, rectificación o supresión, escribe a <a href="mailto:${email}">${email}</a>.
          </p>
        </section>

        <section id="menores" class="policy-section">
          <h2 data-lang-es="8. Privacidad de Menores" data-lang-en="8. Children's Privacy">8. Privacidad de Menores</h2>
          <p data-lang-es="La aplicación es apta para todos los públicos y no recopila datos de menores." data-lang-en="The application is family friendly and does not collect children's personal data.">
            La aplicación es apta para todos los públicos y no recopila datos de menores.
          </p>
        </section>

        <section id="seguridad" class="policy-section">
          <h2 data-lang-es="9. Seguridad" data-lang-en="9. Security">9. Seguridad</h2>
          <p data-lang-es="Se implementan las mejores prácticas de seguridad de Android para proteger la integridad del software." data-lang-en="Android security best practices are applied to safeguard software integrity.">
            Se implementan las mejores prácticas de seguridad de Android para proteger la integridad del software.
          </p>
        </section>

        <section id="contacto" class="policy-section">
          <h2 data-lang-es="10. Contacto" data-lang-en="10. Contact">10. Contacto</h2>
          <div class="info-box">
            <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            <p><strong>Desarrollador:</strong> ${developer}</p>
          </div>
          <div style="margin-top: 16px;">
            <button class="btn-secondary" onclick="window.print()" data-lang-es="Imprimir / Guardar en PDF" data-lang-en="Print / Save as PDF">
              Imprimir / Guardar en PDF
            </button>
          </div>
        </section>

      </article>
    </div>
  </main>

  <footer>
    <div class="container">
      <p data-lang-es="&copy; ${new Date().getFullYear()} ${developer}. Todos los derechos reservados." data-lang-en="&copy; ${new Date().getFullYear()} ${developer}. All rights reserved.">&copy; ${new Date().getFullYear()} ${developer}. Todos los derechos reservados.</p>
      <p><a href="../../index.html" data-lang-es="Volver al inicio" data-lang-en="Back to home">Volver al inicio</a></p>
    </div>
  </footer>

  <script src="../../assets/js/app.js"></script>
</body>
</html>
`;

fs.writeFileSync(targetFile, template, 'utf8');
console.log(`Politica generada en: apps/${appSlug}/index.html`);

const indexPath = path.join(__dirname, '..', 'index.html');
if (fs.existsSync(indexPath)) {
  let indexContent = fs.readFileSync(indexPath, 'utf8');
  if (!indexContent.includes(`apps/${appSlug}/index.html`)) {
    const cardHtml = `
        <!-- ${appName} Card -->
        <article class="app-card">
          <div class="app-header">
            <h2 class="app-title">${appName}</h2>
            <div class="app-meta">Android &bull; Google Play</div>
          </div>
          <p class="app-desc" data-lang-es="Política de privacidad para ${appName}." data-lang-en="Privacy policy for ${appName}.">
            Política de privacidad para ${appName}.
          </p>
          <div class="app-tags">
            <span class="tag-badge">RGPD / LOPD-GDD</span>
            <span class="tag-badge">${category}</span>
          </div>
          <a href="apps/${appSlug}/index.html" class="btn-primary" data-lang-es="Ver Política de Privacidad" data-lang-en="View Privacy Policy">
            Ver Política de Privacidad
          </a>
        </article>
`;
    indexContent = indexContent.replace('<!-- Template / Next App Card -->', `${cardHtml}\n        <!-- Template / Next App Card -->`);
    fs.writeFileSync(indexPath, indexContent, 'utf8');
    console.log(`App añadida a index.html`);
  }
}
