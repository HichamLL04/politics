#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

// Read command line arguments
// Usage: node scripts/generate-policy.js --name "Nombre App" --slug "nombre-app" [--category "Juegos"] [--email "correo@ejemplo.com"]
const args = process.argv.slice(2);
function getArg(flag, defaultValue = '') {
  const index = args.indexOf(flag);
  return index !== -1 && args[index + 1] ? args[index + 1] : defaultValue;
}

const appName = getArg('--name') || process.env.APP_NAME;
const appSlug = (getArg('--slug') || process.env.APP_SLUG || (appName ? appName.toLowerCase().replace(/[^a-z0-9]+/g, '-') : '')).replace(/^-+|-+$/g, '');
const category = getArg('--category') || process.env.APP_CATEGORY || 'Aplicación';
const email = getArg('--email') || process.env.APP_EMAIL || 'soporte.apps.hicham@gmail.com';
const developer = getArg('--dev') || process.env.APP_DEV || 'Hicham (Desarrollador)';

if (!appName || !appSlug) {
  console.error('❌ Error: Debes especificar --name "Nombre de la App" y --slug "nombre-carpeta"');
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
  <meta name="description" content="Política de Privacidad oficial para la app ${appName} conforme al RGPD (UE 2016/679), LOPD-GDD (Ley Orgánica 3/2018) y directrices de Google Play Console.">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="../../assets/css/styles.css">
</head>
<body>

  <!-- Navigation -->
  <header class="navbar">
    <div class="container nav-content">
      <a href="../../index.html" class="brand-link">
        <div class="brand-icon">⚖️</div>
        <div>
          <span class="brand-title">Legal & Policies Hub</span>
        </div>
      </a>
      <div class="nav-actions">
        <div class="lang-selector">
          <button type="button" class="lang-btn active" data-lang="es" onclick="setLanguage('es')">ES</button>
          <button type="button" class="lang-btn" data-lang="en" onclick="setLanguage('en')">EN</button>
        </div>
        <button id="theme-toggle-btn" class="control-btn" onclick="toggleTheme()" aria-label="Cambiar tema">
          <span>☀️</span> Modo Claro
        </button>
      </div>
    </div>
  </header>

  <main class="container">
    <!-- Header -->
    <section class="policy-header">
      <nav class="policy-breadcrumb" aria-label="Migas de pan">
        <a href="../../index.html" data-lang-es="Inicio" data-lang-en="Home">Inicio</a>
        <span>/</span>
        <a href="../../index.html#apps-container" data-lang-es="Aplicaciones" data-lang-en="Apps">Aplicaciones</a>
        <span>/</span>
        <span>${appName}</span>
      </nav>

      <div class="policy-badge-row">
        <span class="status-badge">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"></polyline></svg>
          <span data-lang-es="Conforme a RGPD, LOPD-GDD y Google Play" data-lang-en="GDPR, LOPD-GDD & Google Play Compliant">Conforme a RGPD, LOPD-GDD y Google Play</span>
        </span>
        <span class="tag-badge">Android App</span>
        <span class="tag-badge" data-lang-es="${category}" data-lang-en="${category}">${category}</span>
        <span class="tag-badge">v1.0</span>
      </div>

      <h1 class="policy-title" data-lang-es="Política de Privacidad — ${appName}" data-lang-en="Privacy Policy — ${appName}">
        Política de Privacidad — ${appName}
      </h1>

      <div class="policy-meta-info">
        <div>📅 <strong data-lang-es="Última actualización:" data-lang-en="Last updated:">Última actualización:</strong> ${today}</div>
        <div>👤 <strong data-lang-es="Responsable:" data-lang-en="Data Controller:">Responsable:</strong> ${developer}</div>
        <div>🎮 <strong data-lang-es="Aplicación:" data-lang-en="Application:">Aplicación:</strong> ${appName}</div>
      </div>
    </section>

    <!-- Google Play Direct Copy Banner -->
    <div class="google-play-banner">
      <div class="banner-text">
        <h4 data-lang-es="📋 URL pública para Google Play Console" data-lang-en="📋 Public URL for Google Play Console">📋 URL pública para Google Play Console</h4>
        <p data-lang-es="Copia esta URL directa para pegarla en Google Play Console (Contenido de la aplicación &gt; Política de privacidad)." data-lang-en="Copy this direct URL to paste into Google Play Console (App Content &gt; Privacy Policy).">
          Copia esta URL directa para pegarla en Google Play Console (Contenido de la aplicación &gt; Política de privacidad).
        </p>
      </div>
      <div class="url-box">
        <code id="current-page-url">https://tu-usuario.github.io/politics/apps/${appSlug}/</code>
        <button class="btn-primary" onclick="copyCurrentUrl()" style="padding: 6px 14px; font-size: 0.82rem;" data-lang-es="Copiar URL" data-lang-en="Copy URL">Copiar URL</button>
      </div>
    </div>

    <!-- Layout: Sidebar + Document Content -->
    <div class="policy-layout">
      <!-- Sidebar TOC -->
      <aside class="policy-sidebar">
        <div class="toc-title" data-lang-es="Secciones" data-lang-en="Sections">Secciones</div>
        <ul class="toc-nav">
          <li><a href="#responsable" class="toc-link" data-lang-es="1. Identidad del Responsable" data-lang-en="1. Identity of Controller">1. Identidad del Responsable</a></li>
          <li><a href="#principios" class="toc-link" data-lang-es="2. Principios de Tratamiento" data-lang-en="2. Data Principles">2. Principios de Tratamiento</a></li>
          <li><a href="#obtencion" class="toc-link" data-lang-es="3. Obtención y Datos" data-lang-en="3. Data Collection">3. Obtención y Datos</a></li>
          <li><a href="#finalidad" class="toc-link" data-lang-es="4. Finalidad del Tratamiento" data-lang-en="4. Purpose of Processing">4. Finalidad del Tratamiento</a></li>
          <li><a href="#legitimacion" class="toc-link" data-lang-es="5. Legitimación Legal" data-lang-en="5. Legal Basis">5. Legal Basis</a></li>
          <li><a href="#destinatarios" class="toc-link" data-lang-es="6. Destinatarios y Terceros" data-lang-en="6. Third-Party Services">6. Destinatarios y Terceros</a></li>
          <li><a href="#derechos" class="toc-link" data-lang-es="7. Tus Derechos (ARCO)" data-lang-en="7. Your Rights">7. Tus Derechos (ARCO)</a></li>
          <li><a href="#menores" class="toc-link" data-lang-es="8. Menores (COPPA / RGPD)" data-lang-en="8. Children's Privacy">8. Menores (COPPA / RGPD)</a></li>
          <li><a href="#seguridad" class="toc-link" data-lang-es="9. Seguridad de los Datos" data-lang-en="9. Security Measures">9. Seguridad de los Datos</a></li>
          <li><a href="#exactitud" class="toc-link" data-lang-es="10. Exactitud y Consentimiento" data-lang-en="10. Accuracy & Consent">10. Exactitud y Consentimiento</a></li>
          <li><a href="#cambios" class="toc-link" data-lang-es="11. Modificaciones" data-lang-en="11. Policy Changes">11. Modificaciones</a></li>
          <li><a href="#contacto" class="toc-link" data-lang-es="12. Contacto" data-lang-en="12. Contact Us">12. Contacto</a></li>
        </ul>
      </aside>

      <!-- Content -->
      <article class="policy-content">

        <!-- 1. Identidad del Responsable -->
        <section id="responsable" class="policy-section">
          <h2 data-lang-es="1. Identidad del Responsable" data-lang-en="1. Identity of Data Controller">1. Identidad del Responsable</h2>
          <p data-lang-es="El Titular te informa sobre su Política de Privacidad respecto del tratamiento y protección de los datos de carácter personal de los usuarios que puedan ser recabados por el uso o instalación de la aplicación móvil <strong>${appName}</strong>." data-lang-en="The Controller informs you about its Privacy Policy regarding the processing and protection of personal data that may be collected through the use or installation of the mobile application <strong>${appName}</strong>.">
            El Titular te informa sobre su Política de Privacidad respecto del tratamiento y protección de los datos de carácter personal de los usuarios que puedan ser recabados por el uso o instalación de la aplicación móvil <strong>${appName}</strong>.
          </p>
          <p data-lang-es="En este sentido, el Titular garantiza el cumplimiento de la normativa vigente en materia de protección de datos personales, reflejada en la <strong>Ley Orgánica 3/2018, de 5 de diciembre, de Protección de Datos Personales y de Garantía de Derechos Digitales (LOPD-GDD)</strong>. Cumple también con el <strong>Reglamento (UE) 2016/679 del Parlamento Europeo y del Consejo (RGPD)</strong>, así como las directrices para desarrolladores de <strong>Google Play Console</strong>." data-lang-en="The Controller ensures compliance with current regulations on personal data protection under the <strong>Spanish Organic Law 3/2018 (LOPD-GDD)</strong>, the <strong>European Regulation (EU) 2016/679 (GDPR)</strong>, and <strong>Google Play Developer Policies</strong>.">
            En este sentido, el Titular garantiza el cumplimiento de la normativa vigente en materia de protección de datos personales, reflejada en la <strong>Ley Orgánica 3/2018, de 5 de diciembre, de Protección de Datos Personales y de Garantía de Derechos Digitales (LOPD-GDD)</strong>. Cumple también con el <strong>Reglamento (UE) 2016/679 del Parlamento Europeo y del Consejo (RGPD)</strong>, así como las directrices para desarrolladores de <strong>Google Play Console</strong>.
          </p>
          
          <div class="info-box">
            <span class="info-box-icon">📌</span>
            <div class="info-box-content">
              <ul>
                <li><strong>Titular / Desarrollador:</strong> ${developer}</li>
                <li><strong>Aplicación:</strong> ${appName} para Android</li>
                <li><strong>Correo electrónico:</strong> <a href="mailto:${email}">${email}</a></li>
                <li><strong>Sitio Web / Portal:</strong> <a href="../../index.html">Portal de Políticas</a></li>
              </ul>
            </div>
          </div>
        </section>

        <!-- 2. Principios -->
        <section id="principios" class="policy-section">
          <h2 data-lang-es="2. Principios aplicados en el tratamiento de datos" data-lang-en="2. Principles Applied in Data Processing">2. Principios aplicados en el tratamiento de datos</h2>
          <p data-lang-es="En el tratamiento de tus datos personales, el Titular aplicará los siguientes principios ajustados a las exigencias del RGPD:" data-lang-en="In processing your data, the Controller strictly applies the principles required by GDPR:">
            En el tratamiento de tus datos personales, el Titular aplicará los siguientes principios ajustados a las exigencias del RGPD:
          </p>
          <ul>
            <li data-lang-es="<strong>Principio de licitud, lealtad y transparencia:</strong> Siempre se requerirá el consentimiento para el tratamiento de datos, informando previamente con absoluta claridad." data-lang-en="<strong>Lawfulness, fairness, and transparency:</strong> Consent is always requested where required, providing complete prior transparency.">
              <strong>Principio de licitud, lealtad y transparencia:</strong> Siempre se requerirá el consentimiento para el tratamiento de datos, informando previamente con absoluta claridad.
            </li>
            <li data-lang-es="<strong>Principio de minimización de datos:</strong> La aplicación está diseñada bajo el estándar de 'privacidad desde el diseño' (Privacy by Design), solicitando únicamente lo estrictamente indispensable para su funcionamiento." data-lang-en="<strong>Data minimization:</strong> The application follows Privacy by Design, never requesting unnecessary personal information.">
              <strong>Principio de minimización de datos:</strong> La aplicación está diseñada bajo el estándar de "privacidad desde el diseño" (Privacy by Design), solicitando únicamente lo estrictamente indispensable para su funcionamiento.
            </li>
            <li data-lang-es="<strong>Principio de limitación del plazo de conservación:</strong> Los datos locales se conservan únicamente en el dispositivo del usuario mientras la app permanezca instalada." data-lang-en="<strong>Storage limitation:</strong> Local data is kept solely on the user's device while the application remains installed.">
              <strong>Principio de limitación del plazo de conservación:</strong> Los datos locales se conservan únicamente en el dispositivo del usuario mientras la app permanezca instalada.
            </li>
            <li data-lang-es="<strong>Principio de integridad y confidencialidad:</strong> Los datos son protegidos para evitar cualquier pérdida, uso indebido o acceso no autorizado." data-lang-en="<strong>Integrity and confidentiality:</strong> Data is handled ensuring security and preventing unauthorized access.">
              <strong>Principio de integridad y confidencialidad:</strong> Los datos son protegidos para evitar cualquier pérdida, uso indebido o acceso no autorizado.
            </li>
          </ul>
        </section>

        <!-- 3. Obtención de datos personales -->
        <section id="obtencion" class="policy-section">
          <h2 data-lang-es="3. Obtención y Categorías de Datos" data-lang-en="3. Data Collection & Categories">3. Obtención y Categorías de Datos</h2>
          <p data-lang-es="Para usar <strong>${appName}</strong> no es necesario proporcionar datos personales identificativos (como nombre, apellidos, dirección física o número de teléfono). La aplicación no cuenta con sistema de registro obligatorio de cuentas." data-lang-en="Using <strong>${appName}</strong> does not require personal identifying details (like your name, address, or phone number). The app requires no mandatory user accounts.">
            Para usar <strong>${appName}</strong> no es necesario proporcionar datos personales identificativos (como nombre, apellidos, dirección física o número de teléfono). La aplicación no cuenta con sistema de registro obligatorio de cuentas.
          </p>

          <h3 data-lang-es="Categorías de datos procesados:" data-lang-en="Categories of data processed:">Categorías de datos procesados:</h3>
          <ul>
            <li data-lang-es="<strong>Datos de almacenamiento local:</strong> Ajustes, preferencias y estados locales del usuario. Estos datos residen exclusivamente en la memoria interna de tu dispositivo y nunca se transmiten a servidores externos." data-lang-en="<strong>Local Storage Data:</strong> Settings, user preferences, and local states. Stored strictly in local internal memory and never sent to remote servers.">
              <strong>Datos de almacenamiento local:</strong> Ajustes, preferencias y estados locales del usuario. Estos datos residen exclusivamente en la memoria interna de tu dispositivo y nunca se transmiten a servidores externos.
            </li>
            <li data-lang-es="<strong>Datos técnicos y de diagnóstico:</strong> Modelo de dispositivo y versión de Android para garantizar el funcionamiento correcto." data-lang-en="<strong>Technical Diagnostics:</strong> Device model and Android version to ensure correct software execution.">
              <strong>Datos técnicos y de diagnóstico:</strong> Modelo de dispositivo y versión de Android para garantizar el funcionamiento correcto.
            </li>
            <li data-lang-es="<strong>Comunicaciones directas:</strong> Si contactas al soporte por correo electrónico, trataremos tu dirección únicamente para responder a tu consulta." data-lang-en="<strong>Support Communications:</strong> If you contact support via email, we process your address solely to resolve your inquiry.">
              <strong>Comunicaciones directas:</strong> Si contactas al soporte por correo electrónico, trataremos tu dirección únicamente para responder a tu consulta.
            </li>
          </ul>
        </section>

        <!-- 4. Finalidad -->
        <section id="finalidad" class="policy-section">
          <h2 data-lang-es="4. Finalidad del Tratamiento" data-lang-en="4. Purpose of Data Processing">4. Finalidad del Tratamiento</h2>
          <p data-lang-es="El Titular trata los datos de la aplicación para las siguientes finalidades específicas:" data-lang-en="The Controller processes application data for the following specific purposes:">
            El Titular trata los datos de la aplicación para las siguientes finalidades específicas:
          </p>
          <ul>
            <li data-lang-es="Permitir el correcto funcionamiento de la aplicación en el dispositivo." data-lang-en="Enable the correct operation of the application on the device.">Permitir el correcto funcionamiento de la aplicación en el dispositivo.</li>
            <li data-lang-es="Garantizar la estabilidad técnica y prevenir fallos en Android." data-lang-en="Ensure technical stability and prevent crashes on Android.">Garantizar la estabilidad técnica y prevenir fallos en Android.</li>
            <li data-lang-es="Atender solicitudes de soporte o sugerencias enviadas por el usuario." data-lang-en="Answer customer support requests or feedback.">Atender solicitudes de soporte o sugerencias enviadas por el usuario.</li>
          </ul>
        </section>

        <!-- 5. Legitimación -->
        <section id="legitimacion" class="policy-section">
          <h2 data-lang-es="5. Legitimación para el Tratamiento" data-lang-en="5. Legal Basis for Processing">5. Legitimación para el Tratamiento</h2>
          <p data-lang-es="La base legal para el tratamiento de tus datos es:" data-lang-en="The legal basis for processing your data is:">
            La base legal para el tratamiento de tus datos es:
          </p>
          <ul>
            <li data-lang-es="<strong>El consentimiento del interesado:</strong> Otorgado al instalar y hacer uso de la aplicación móvil o al contactar por correo electrónico." data-lang-en="<strong>The data subject's consent:</strong> Granted by installing and launching the application, or by sending a direct inquiry.">
              <strong>El consentimiento del interesado:</strong> Otorgado al instalar y hacer uso de la aplicación móvil o al contactar por correo electrónico.
            </li>
            <li data-lang-es="<strong>El interés legítimo:</strong> Para asegurar la estabilidad técnica, prevenir fallos y mantener la seguridad de la app." data-lang-en="<strong>Legitimate interest:</strong> To maintain technical stability, prevent bugs, and uphold software security.">
              <strong>El interés legítimo:</strong> Para asegurar la estabilidad técnica, prevenir fallos y mantener la seguridad de la app.
            </li>
          </ul>
        </section>

        <!-- 6. Destinatarios y Terceros -->
        <section id="destinatarios" class="policy-section">
          <h2 data-lang-es="6. Destinatarios de Datos y Servicios de Terceros" data-lang-en="6. Recipients and Third Parties">6. Destinatarios de Datos y Servicios de Terceros</h2>
          <p data-lang-es="El Titular no vende ni comparte datos con empresas externas. Únicamente intervienen proveedores de infraestructura estándar:" data-lang-en="The Controller does not sell or share data. Only standard platform infrastructure providers are involved:">
            El Titular no vende ni comparte datos con empresas externas. Únicamente intervienen proveedores de infraestructura estándar:
          </p>
          <ul>
            <li>
              <strong>Google Play Services:</strong> 
              <span data-lang-es="Distribución de actualizaciones y servicios esenciales de Android." data-lang-en="Update distribution and baseline Android OS runtime services.">Distribución de actualizaciones y servicios esenciales de Android.</span>
              (<a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Política de Privacidad de Google</a>)
            </li>
            <li>
              <strong>GitHub Pages:</strong> 
              <span data-lang-es="Alojamiento web seguro mediante protocolo HTTPS." data-lang-en="Secure web hosting via HTTPS protocol.">Alojamiento web seguro mediante protocolo HTTPS.</span>
              (<a href="https://docs.github.com/en/site-policy/privacy-policies/github-privacy-statement" target="_blank" rel="noopener noreferrer">GitHub Privacy Statement</a>)
            </li>
          </ul>
        </section>

        <!-- 7. Tus Derechos -->
        <section id="derechos" class="policy-section">
          <h2 data-lang-es="7. Tus Derechos (Acceso, Rectificación y Supresión)" data-lang-en="7. Your Rights (ARCO-POL)">7. Tus Derechos (Acceso, Rectificación y Supresión)</h2>
          <p data-lang-es="De conformidad con el RGPD y la LOPD-GDD, tienes derecho a solicitar acceso, rectificación, supresión, limitación y oposición al tratamiento de tus datos personales." data-lang-en="In accordance with GDPR and LOPD-GDD, you have the right to request access, rectification, erasure, limitation, and opposition to the processing of your personal data.">
            De conformidad con el RGPD y la LOPD-GDD, tienes derecho a solicitar acceso, rectificación, supresión, limitación y oposición al tratamiento de tus datos personales.
          </p>
          <p data-lang-es="Para ejercer cualquiera de estos derechos, escribe a <a href='mailto:${email}'>${email}</a>. Para eliminar cualquier dato local del juego o app, puedes desinstalar la app o borrar su almacenamiento en los Ajustes de Android." data-lang-en="To exercise these rights, email us at <a href='mailto:${email}'>${email}</a>. To clear local app data, uninstall the app or clear storage in Android Settings.">
            Para ejercer cualquiera de estos derechos, escribe a <a href="mailto:${email}">${email}</a>. Para eliminar cualquier dato local del juego o app, puedes desinstalar la app o borrar su almacenamiento en los Ajustes de Android.
          </p>
          <p data-lang-es="Tienes derecho a presentar una reclamación ante la autoridad de control en España: la <strong>Agencia Española de Protección de Datos (AEPD)</strong> (<a href='https://www.aepd.es' target='_blank' rel='noopener noreferrer'>www.aepd.es</a>)." data-lang-en="You also have the right to lodge a complaint with the supervisory authority: the <strong>Spanish Data Protection Agency (AEPD)</strong> (<a href='https://www.aepd.es' target='_blank' rel='noopener noreferrer'>www.aepd.es</a>).">
            Tienes derecho a presentar una reclamación ante la autoridad de control en España: la <strong>Agencia Española de Protección de Datos (AEPD)</strong> (<a href="https://www.aepd.es" target="_blank" rel="noopener noreferrer">www.aepd.es</a>).
          </p>
        </section>

        <!-- 8. Privacidad de Menores -->
        <section id="menores" class="policy-section">
          <h2 data-lang-es="8. Privacidad de Menores (COPPA y RGPD)" data-lang-en="8. Children's Privacy (COPPA & GDPR)">8. Privacidad de Menores (COPPA y RGPD)</h2>
          <div class="info-box alert-success">
            <span class="info-box-icon">👶</span>
            <div class="info-box-content" data-lang-es="<strong>Apto para todas las edades:</strong> ${appName} es apto para todos los públicos y familias. No recopilamos conscientemente ningún tipo de información identificativa de menores de 13 años (COPPA) ni menores de 14 años en España (LOPD-GDD)." data-lang-en="<strong>Family Friendly:</strong> ${appName} is suitable for all ages. We do not knowingly collect personal information from children under 13 (COPPA) or under 14 in Spain (LOPD-GDD).">
              <strong>Apto para todas las edades:</strong> ${appName} es apto para todos los públicos y familias. No recopilamos conscientemente ningún tipo de información identificativa de menores de 13 años (COPPA) ni menores de 14 años en España (LOPD-GDD).
            </div>
          </div>
        </section>

        <!-- 9. Seguridad -->
        <section id="seguridad" class="policy-section">
          <h2 data-lang-es="9. Seguridad de los Datos Personales" data-lang-en="9. Security of Personal Data">9. Seguridad de los Datos Personales</h2>
          <p data-lang-es="Para proteger tus datos personales, el Titular toma precauciones razonables y aplica las mejores prácticas de seguridad de Android para evitar pérdidas, accesos no autorizados o alteraciones." data-lang-en="To safeguard user information, the Controller takes reasonable precautions and follows Android security best practices.">
            Para proteger tus datos personales, el Titular toma precauciones razonables y aplica las mejores prácticas de seguridad de Android para evitar pérdidas, accesos no autorizados o alteraciones.
          </p>
        </section>

        <!-- 10. Exactitud y Consentimiento -->
        <section id="exactitud" class="policy-section">
          <h2 data-lang-es="10. Exactitud, Aceptación y Consentimiento" data-lang-en="10. Accuracy, Acceptance & Consent">10. Exactitud, Aceptación y Consentimiento</h2>
          <p data-lang-es="Como usuario, declaras haber sido informado de las condiciones sobre protección de datos personales, consintiendo su tratamiento en la forma y para las finalidades indicadas en este documento." data-lang-en="As a user, you acknowledge being informed of the data protection conditions, consenting to processing for the purposes outlined.">
            Como usuario, declaras haber sido informado de las condiciones sobre protección de datos personales, consintiendo su tratamiento en la forma y para las finalidades indicadas en este documento.
          </p>
        </section>

        <!-- 11. Cambios -->
        <section id="cambios" class="policy-section">
          <h2 data-lang-es="11. Modificaciones de esta Política" data-lang-en="11. Policy Changes">11. Modificaciones de esta Política</h2>
          <p data-lang-es="El Titular se reserva el derecho de modificar esta Política de Privacidad para adaptarla a futuras actualizaciones legislativas o nuevas versiones de la aplicación." data-lang-en="The Controller reserves the right to modify this Privacy Policy to comply with legal updates or new application versions.">
            El Titular se reserva el derecho de modificar esta Política de Privacidad para adaptarla a futuras actualizaciones legislativas o nuevas versiones de la aplicación.
          </p>
        </section>

        <!-- 12. Contacto -->
        <section id="contacto" class="policy-section">
          <h2 data-lang-es="12. Contacto" data-lang-en="12. Contact Us">12. Contacto</h2>
          <div class="info-box">
            <span class="info-box-icon">✉️</span>
            <div class="info-box-content">
              <strong>Email de Soporte:</strong> <a href="mailto:${email}">${email}</a><br>
              <strong>Desarrollador:</strong> ${developer}
            </div>
          </div>
          <div style="margin-top: 20px;">
            <button class="btn-secondary" onclick="window.print()" data-lang-es="🖨️ Imprimir / Guardar en PDF" data-lang-en="🖨️ Print / Save as PDF">
              🖨️ Imprimir / Guardar en PDF
            </button>
          </div>
        </section>

      </article>
    </div>
  </main>

  <footer>
    <div class="container footer-content">
      <p data-lang-es="&copy; ${new Date().getFullYear()} ${developer}. Todos los derechos reservados." data-lang-en="&copy; ${new Date().getFullYear()} ${developer}. All rights reserved.">&copy; ${new Date().getFullYear()} ${developer}. Todos los derechos reservados.</p>
      <p><a href="../../index.html" data-lang-es="← Volver al Portal de Políticas" data-lang-en="← Back to Policies Hub">← Volver al Portal de Políticas</a></p>
    </div>
  </footer>

  <script src="../../assets/js/app.js"></script>
</body>
</html>
`;

fs.writeFileSync(targetFile, template, 'utf8');
console.log(`✅ Política generada con éxito en: apps/${appSlug}/index.html`);

// Now let's register the app in index.html if not already present
const indexPath = path.join(__dirname, '..', 'index.html');
if (fs.existsSync(indexPath)) {
  let indexContent = fs.readFileSync(indexPath, 'utf8');
  if (!indexContent.includes(`apps/${appSlug}/index.html`)) {
    const cardHtml = `
        <!-- ${appName} Card -->
        <article class="app-card">
          <div class="app-header">
            <div class="app-avatar">📱</div>
            <div class="app-title-group">
              <h3>${appName}</h3>
              <div class="app-meta">Android &bull; Google Play Console</div>
            </div>
          </div>
          <p class="app-desc" data-lang-es="Política de privacidad oficial para la aplicación ${appName}." data-lang-en="Official privacy policy for ${appName}.">
            Política de privacidad oficial para la aplicación ${appName}.
          </p>
          <div class="app-tags">
            <span class="tag-badge">🛡️ RGPD / LOPD-GDD</span>
            <span class="tag-badge">👶 Apto para familias</span>
            <span class="tag-badge">✅ Play Console Ready</span>
          </div>
          <div class="app-footer">
            <a href="apps/${appSlug}/index.html" class="btn-primary" data-lang-es="Ver Política de Privacidad" data-lang-en="View Privacy Policy">
              Ver Política de Privacidad &rarr;
            </a>
          </div>
        </article>
`;
    // Insert before the template / next app card
    indexContent = indexContent.replace('<!-- Template / Next App Card -->', `${cardHtml}\n        <!-- Template / Next App Card -->`);
    fs.writeFileSync(indexPath, indexContent, 'utf8');
    console.log(`✅ App añadida automáticamente al catálogo de index.html`);
  }
}
