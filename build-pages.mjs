/* Generador de las páginas de tratamiento de ViBa.
   Todas comparten encabezado, pie y botón flotante, así que se definen una sola
   vez aquí y cada página aporta únicamente su contenido y sus metadatos.

   Regenerar tras editar este archivo:
     node build-pages.mjs
   y después recompilar Tailwind para que existan las clases nuevas:
     npx @tailwindcss/cli -i tailwind.source.css -o tailwind.css --minify
*/

import { writeFileSync } from 'node:fs';

const SITE = 'https://clinicaviba.com';
const CSS_V = '20260718';
const WA_NUM = '50240135131';
const TEL = '+50277673308';
const TEL_DISPLAY = '(502) 7767-3308';

// --- Iconos SVG (inline: el sitio no carga librerías de iconos externas) ---
const SVG_WA = '<path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>';
const SVG_FB = '<path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647Z"/>';
const SVG_IG = '<path d="M7.0301.084c-1.2768.0602-2.1487.264-2.911.5634-.7888.3075-1.4575.72-2.1228 1.3877-.6652.6677-1.075 1.3368-1.3802 2.127-.2954.7638-.4956 1.6365-.552 2.914-.0564 1.2775-.0689 1.6882-.0626 4.947.0062 3.2586.0206 3.6671.0825 4.9473.061 1.2765.264 2.1482.5635 2.9107.308.7889.72 1.4573 1.388 2.1228.6679.6655 1.3365 1.0743 2.1285 1.38.7632.295 1.6361.4961 2.9134.552 1.2773.056 1.6884.069 4.9462.0627 3.2578-.0062 3.668-.0207 4.9478-.0814 1.28-.0607 2.147-.2652 2.9098-.5633.7889-.3086 1.4578-.72 2.1228-1.3881.665-.6682 1.0745-1.3378 1.3795-2.1284.2957-.7632.4966-1.636.552-2.9124.056-1.2809.0692-1.6898.063-4.948-.0063-3.2583-.021-3.6668-.0817-4.9465-.0607-1.2797-.264-2.1487-.5633-2.9117-.3084-.7889-.72-1.4568-1.3876-2.1228C21.2982 1.33 20.628.9208 19.8378.6165 19.074.321 18.2017.1197 16.9244.0645 15.6471.0093 15.236-.005 11.977.0014 8.718.0076 8.31.0215 7.0301.0839m.1402 21.6932c-1.17-.0509-1.8053-.2453-2.2287-.408-.5606-.216-.96-.4771-1.3819-.895-.422-.4178-.6811-.8186-.9-1.378-.1644-.4234-.3624-1.058-.4171-2.228-.0595-1.2645-.072-1.6442-.079-4.848-.007-3.2037.0053-3.583.0607-4.848.05-1.169.2456-1.805.408-2.2282.216-.5613.4762-.96.895-1.3816.4188-.4217.8184-.6814 1.3783-.9003.423-.1651 1.0575-.3614 2.227-.4171 1.2655-.06 1.6447-.072 4.848-.079 3.2033-.007 3.5835.005 4.8495.0608 1.169.0508 1.8053.2445 2.228.408.5608.216.96.4754 1.3816.895.4217.4194.6816.8176.9005 1.3787.1653.4217.3617 1.056.4169 2.2263.0602 1.2655.0739 1.645.0796 4.848.0058 3.203-.0055 3.5834-.061 4.848-.051 1.17-.245 1.8055-.408 2.2294-.216.5604-.4763.96-.8954 1.3814-.419.4215-.8181.6811-1.3783.9-.4224.1649-1.0577.3617-2.2262.4174-1.2656.0595-1.6448.072-4.8493.079-3.2045.007-3.5825-.006-4.848-.0608M16.953 5.5864A1.44 1.44 0 1 0 18.39 4.144a1.44 1.44 0 0 0-1.437 1.4424M5.8385 12.012c.0067 3.4032 2.7706 6.1557 6.173 6.1493 3.4026-.0065 6.157-2.7701 6.1506-6.1733-.0065-3.4032-2.771-6.1565-6.174-6.1498-3.403.0067-6.156 2.771-6.1496 6.1738M8 12.0077a4 4 0 1 1 4.008 3.9921A3.9996 3.9996 0 0 1 8 12.0077"/>';
const SVG_CHECK = '<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/>';
const SVG_ARROW = '<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>';

const waLink = (msg) => `https://wa.me/${WA_NUM}?text=${encodeURIComponent(msg)}`;
const WA_DEFAULT = waLink('Hola, quisiera agendar una cita en ViBa Clínica de Tratamiento del Dolor.');

const icon = (paths, cls) =>
  `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths}</svg>`;

const waIcon = (cls) => `<svg class="${cls}" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">${SVG_WA}</svg>`;

/** Lista con viñetas de escudo/check, el patrón ya usado en la página de osteoporosis. */
const checkList = (items) => `<ul class="space-y-3 mt-6">
${items.map((t) => `                            <li class="flex items-start">${icon(SVG_CHECK, 'w-6 h-6 text-primary mr-3 flex-shrink-0')}<span>${t}</span></li>`).join('\n')}
                        </ul>`;

const disclaimer = `<div class="bg-lavender-50 border border-[var(--color-border)] rounded-xl p-5 mt-8">
                            <p class="text-sm text-ink-soft"><strong class="text-ink">Nota:</strong> esta información es educativa y no sustituye una consulta médica. Cada caso debe ser evaluado individualmente por un especialista.</p>
                        </div>`;

const navLinks = (active) => {
  const item = (href, label, key) =>
    key === active
      ? `<a href="${href}" class="text-primary font-semibold transition-colors" aria-current="page">${label}</a>`
      : `<a href="${href}" class="text-ink-soft hover:text-primary transition-colors">${label}</a>`;
  return [
    item('index.html#inicio', 'Inicio', 'inicio'),
    item('index.html#quienes-somos', 'Quiénes Somos', 'quienes'),
    item('tratamientos.html', 'Tratamientos', 'tratamientos'),
    item('index.html#blog', 'Blog', 'blog'),
  ].join('\n                ');
};

const mobileNavLinks = (active) => {
  const item = (href, label, key) =>
    key === active
      ? `<a href="${href}" class="block py-3 text-primary font-semibold" aria-current="page">${label}</a>`
      : `<a href="${href}" class="block py-3 text-ink-soft hover:text-primary">${label}</a>`;
  return [
    item('index.html#inicio', 'Inicio', 'inicio'),
    item('index.html#quienes-somos', 'Quiénes Somos', 'quienes'),
    item('tratamientos.html', 'Tratamientos', 'tratamientos'),
    item('index.html#blog', 'Blog', 'blog'),
  ].join('\n            ');
};

function shell({ slug, title, description, ogImage = 'media/og-cover.jpg', jsonLd, body, active = 'tratamientos', preloadImage }) {
  const url = `${SITE}/${slug}`;
  return `<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
    <title>${title}</title>
    <meta name="description" content="${description}">
    <link rel="canonical" href="${url}">
    <meta property="og:type" content="article">
    <meta property="og:locale" content="es_GT">
    <meta property="og:site_name" content="ViBa Clínica de Tratamiento del Dolor">
    <meta property="og:title" content="${title}">
    <meta property="og:description" content="${description}">
    <meta property="og:url" content="${url}">
    <meta property="og:image" content="${SITE}/${ogImage}">
    <meta name="twitter:card" content="summary_large_image">
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
    <link rel="manifest" href="/site.webmanifest">
    <script>document.documentElement.classList.add('js');</script>${preloadImage ? `\n    <link rel="preload" as="image" href="${preloadImage}" fetchpriority="high">` : ''}
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:wght@600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="tailwind.css?v=${CSS_V}">
    <link rel="stylesheet" href="styles.css?v=${CSS_V}">
    <script type="application/ld+json">
${JSON.stringify(jsonLd, null, 4).split('\n').map((l) => '    ' + l).join('\n')}
    </script>
</head>
<body class="bg-white text-ink-soft">

    <a href="#main-content" class="skip-link">Saltar al contenido principal</a>

    <!-- Header & Navigation -->
    <header id="header" class="bg-white sticky top-0 z-50 transition-shadow duration-300">
        <div class="container mx-auto px-6 py-3 flex justify-between items-center">
            <a href="index.html#inicio" class="flex items-center text-xl font-bold text-ink font-serif">
                <img src="media/logo.webp" alt="Logo ViBa" class="h-12 w-auto mr-3" width="135" height="96" />
                ViBa <span class="font-normal ml-1 text-ink-soft hidden sm:inline">Clínica de Tratamiento del Dolor</span>
            </a>
            <nav class="hidden md:flex items-center space-x-8">
                ${navLinks(active)}
                <a href="index.html#contacto" class="bg-primary text-white px-5 py-2 rounded-full hover:bg-primary-light transition-colors shadow font-semibold">Contactar</a>
            </nav>
            <button id="mobile-menu-button" class="md:hidden flex items-center justify-center w-11 h-11 -mr-2" aria-label="Abrir menú" aria-expanded="false" aria-controls="mobile-menu">
                ${icon('<path d="M4 5h16"/><path d="M4 12h16"/><path d="M4 19h16"/>', 'w-6 h-6 text-ink')}
            </button>
        </div>
        <!-- Mobile Menu -->
        <div id="mobile-menu" class="hidden md:hidden bg-white px-6 pb-4 border-t border-[var(--color-border)]">
            ${mobileNavLinks(active)}
            <a href="index.html#contacto" class="block mt-2 bg-primary text-white text-center px-4 py-3 rounded-full hover:bg-primary-light shadow font-semibold">Contactar</a>
        </div>
    </header>

    <main id="main-content">
${body}
    </main>

    <!-- Footer -->
    <footer class="bg-ink text-white">
        <div class="container mx-auto px-6 py-12">
            <div class="grid md:grid-cols-3 gap-8">
                <div>
                    <h3 class="text-xl font-bold mb-4 font-serif">ViBa Clínica de Tratamiento del Dolor</h3>
                    <p class="text-white/60">Mejorando la calidad de vida de nuestros pacientes en Quetzaltenango (Xela) a través de un tratamiento del dolor humano y especializado.</p>
                </div>
                <div>
                    <h3 class="text-xl font-bold mb-4 font-serif">Tratamientos</h3>
                    <ul class="space-y-2">
                        <li><a href="hernia-de-disco.html" class="text-white/60 hover:text-white transition-colors inline-block py-1">Hernia de Disco</a></li>
                        <li><a href="radiofrecuencia-ozonoterapia.html" class="text-white/60 hover:text-white transition-colors inline-block py-1">Radiofrecuencia y Ozono</a></li>
                        <li><a href="lumbalgia-ciatica.html" class="text-white/60 hover:text-white transition-colors inline-block py-1">Lumbalgia y Ciática</a></li>
                        <li><a href="osteoporosis.html" class="text-white/60 hover:text-white transition-colors inline-block py-1">Osteoporosis</a></li>
                        <li><a href="tratamientos.html" class="text-white/60 hover:text-white transition-colors inline-block py-1">Ver todos</a></li>
                    </ul>
                </div>
                <div>
                    <h3 class="text-xl font-bold mb-4 font-serif">Contacto</h3>
                    <ul class="space-y-2">
                        <li><a href="${WA_DEFAULT}" target="_blank" rel="noopener" class="text-white/60 hover:text-white transition-colors inline-block py-1">WhatsApp (502) 4013-5131</a></li>
                        <li><a href="tel:${TEL}" class="text-white/60 hover:text-white transition-colors inline-block py-1">Tel. ${TEL_DISPLAY}</a></li>
                        <li><a href="index.html#contacto" class="text-white/60 hover:text-white transition-colors inline-block py-1">Ubicación y horarios</a></li>
                    </ul>
                    <div class="flex space-x-4 mt-4">
                        <a href="https://www.facebook.com/vibasindolor" target="_blank" rel="noopener noreferrer" aria-label="Facebook" class="text-white/60 hover:text-white transition-colors inline-flex p-2 -m-2"><svg class="w-6 h-6" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">${SVG_FB}</svg></a>
                        <a href="https://www.instagram.com/clinicaviba/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" class="text-white/60 hover:text-white transition-colors inline-flex p-2 -m-2"><svg class="w-6 h-6" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">${SVG_IG}</svg></a>
                    </div>
                </div>
            </div>
            <div class="mt-12 border-t border-white/10 pt-8 text-center text-white/60">
                <p>&copy; <span id="current-year">2026</span> ViBa Clínica de Tratamiento del Dolor. Todos los derechos reservados.</p>
            </div>
        </div>
    </footer>

    <!-- Floating WhatsApp button -->
    <a href="${WA_DEFAULT}" target="_blank" rel="noopener" class="whatsapp-float" aria-label="Agendar cita por WhatsApp">
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">${SVG_WA}</svg>
    </a>

    <script src="js/site.js" defer></script>
</body>
</html>
`;
}

/** Encabezado con miga de pan para las páginas de detalle. */
const pageHeader = (h1, intro, crumb) => `        <section class="bg-gradient-to-br from-ink via-primary-dark to-primary text-white">
            <div class="container mx-auto px-6 py-14 md:py-20">
                <nav class="text-sm mb-5" aria-label="Ruta de navegación">
                    <a href="index.html" class="text-white/70 hover:text-white inline-block py-2">Inicio</a>
                    <span class="mx-2 text-white/40">/</span>
                    <a href="tratamientos.html" class="text-white/70 hover:text-white inline-block py-2">Tratamientos</a>
                    <span class="mx-2 text-white/40">/</span>
                    <span class="text-white">${crumb}</span>
                </nav>
                <h1 class="text-3xl md:text-5xl font-bold font-serif mb-4 max-w-4xl">${h1}</h1>
                <p class="text-lg md:text-xl text-white/90 max-w-3xl">${intro}</p>
            </div>
        </section>`;

/** Llamado a la acción final, con mensaje de WhatsApp adaptado a cada página. */
const cta = (titulo, texto, waMsg) => `        <section class="py-16 md:py-20 bg-beige-50">
            <div class="container mx-auto px-6 max-w-3xl text-center reveal">
                <h2 class="section-title mb-4">${titulo}</h2>
                <p class="text-ink-soft mb-8">${texto}</p>
                <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <a href="${waLink(waMsg)}" target="_blank" rel="noopener" class="inline-flex items-center gap-2 bg-[#25D366] text-white font-bold py-4 px-8 rounded-full text-lg hover:brightness-110 transition-all shadow-lg">
                        ${waIcon('w-6 h-6')}
                        Agendar por WhatsApp
                    </a>
                    <a href="tel:${TEL}" class="inline-flex items-center gap-2 border border-primary text-primary font-semibold py-4 px-8 rounded-full text-lg hover:bg-lavender-50 transition-colors">
                        ${icon('<path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384"/>', 'w-5 h-5')}
                        Llamar ${TEL_DISPLAY}
                    </a>
                </div>
                <p class="text-sm text-ink-soft mt-6">Atendemos en Quetzaltenango (Xela) · Lunes a viernes 8:00–13:00 y 15:00–18:00 · Sábado 8:00–13:00</p>
            </div>
        </section>`;

/** Bloque de enlaces relacionados para reforzar el enlazado interno. */
const relacionados = (items) => `        <section class="py-12 bg-white border-t border-[var(--color-border)]">
            <div class="container mx-auto px-6 max-w-4xl">
                <h2 class="text-lg font-bold text-ink mb-4 font-serif">También te puede interesar</h2>
                <ul class="grid sm:grid-cols-2 gap-3">
${items.map(([href, label]) => `                    <li><a href="${href}" class="inline-flex items-center font-semibold text-primary hover:text-primary-light py-2">${label} ${icon(SVG_ARROW, 'w-4 h-4 ml-1')}</a></li>`).join('\n')}
                </ul>
            </div>
        </section>`;

const breadcrumbLd = (slug, name) => ({
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Inicio', item: `${SITE}/` },
    { '@type': 'ListItem', position: 2, name: 'Tratamientos', item: `${SITE}/tratamientos.html` },
    { '@type': 'ListItem', position: 3, name, item: `${SITE}/${slug}` },
  ],
});

// =====================================================================
//  Definición de las páginas
// =====================================================================

const pages = [];

// --- 1. Radiofrecuencia y Ozonoterapia ---
pages.push({
  slug: 'radiofrecuencia-ozonoterapia.html',
  title: 'Radiofrecuencia y Ozonoterapia en Quetzaltenango (Xela) | ViBa',
  description: 'Radiofrecuencia y ozonoterapia para dolor crónico de columna, cuello y articulaciones en Quetzaltenango (Xela). Procedimiento ambulatorio con anestesia local.',
  ogImage: 'media/1.webp',
  jsonLd: {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'MedicalProcedure',
        name: 'Radiofrecuencia y Ozonoterapia',
        procedureType: 'https://schema.org/PercutaneousProcedure',
        bodyLocation: 'Columna vertebral, cuello y articulaciones',
        howPerformed: 'Se coloca una aguja fina sobre el nervio responsable del dolor, guiada por Rayos X, y se aplica corriente de radiofrecuencia de uso médico para interrumpir la transmisión de la señal dolorosa. La ozonoterapia aplica ozono medicinal con efecto analgésico y antiinflamatorio.',
        preparation: 'Evaluación previa con el especialista y estudios de imagen del área afectada.',
        followup: 'Procedimiento ambulatorio; la mayoría de los pacientes regresa a casa el mismo día.',
        availableService: { '@id': `${SITE}/#clinica` },
        url: `${SITE}/radiofrecuencia-ozonoterapia.html`,
      },
      breadcrumbLd('radiofrecuencia-ozonoterapia.html', 'Radiofrecuencia y Ozonoterapia'),
    ],
  },
  body: `${pageHeader(
    'Radiofrecuencia y Ozonoterapia para el Dolor Crónico',
    'Dos procedimientos mínimamente invasivos para interrumpir el dolor persistente de columna, cuello y articulaciones, sin cirugía abierta.',
    'Radiofrecuencia y Ozonoterapia'
  )}

        <section class="py-16 md:py-20 bg-white">
            <div class="container mx-auto px-6">
                <div class="grid md:grid-cols-2 gap-12 items-start">
                    <div class="reveal">
                        <h2 class="section-title mb-4">¿Qué es la radiofrecuencia?</h2>
                        <p class="text-ink-soft mb-4">La radiofrecuencia es una corriente eléctrica de uso médico que se utiliza para tratar múltiples causas de dolor crónico: dolor de espalda y cuello, hernias de disco, problemas en las articulaciones facetarias, lumbago, ciática, neuralgia del trigémino y dolor intratable en el talón.</p>
                        <p class="text-ink-soft mb-4">Mediante una aguja fina colocada con precisión sobre el nervio responsable, se interrumpe de forma controlada la transmisión de la señal dolorosa. El objetivo no es "dormir" la zona, sino cortar el mensaje de dolor en su origen.</p>

                        <h3 class="text-2xl font-bold text-ink mt-8 mb-4 font-serif">Dos modalidades</h3>
                        <ul class="list-disc list-inside space-y-2 text-ink-soft mb-6">
                            <li><strong class="text-ink">Radiofrecuencia Convencional:</strong> utiliza calor para crear una lesión controlada en el nervio, interrumpiendo la señal de dolor.</li>
                            <li><strong class="text-ink">Radiofrecuencia Pulsada:</strong> modula la función del nervio sin generar un aumento de temperatura significativo, alterando la transmisión del dolor de forma más suave.</li>
                        </ul>

                        <h2 class="section-title mt-10 mb-4">¿Qué es la ozonoterapia?</h2>
                        <p class="text-ink-soft mb-4">Consiste en la aplicación de ozono medicinal con fines terapéuticos. Es una terapia muy segura, sin efectos adversos y compatible con otros tratamientos. Sus principales efectos son analgésicos, antiinflamatorios y una mejora notable en la microcirculación y oxigenación de los tejidos.</p>
                        <p class="text-ink-soft">Es ideal para tratar lumbago, ciática, espasmos musculares, hernias de disco, osteoartrosis de rodilla, fibromialgia y otros dolores agudos y crónicos.</p>
                    </div>
                    <div class="reveal space-y-6">
                        <img src="media/1.webp" alt="Procedimiento de radiofrecuencia en ViBa Clínica de Tratamiento del Dolor" class="rounded-2xl shadow-xl w-full" width="280" height="280">
                        <div class="video-frame">
                            <iframe class="rounded-2xl shadow-xl" src="https://www.youtube-nocookie.com/embed/ftqsMGtS0W4" title="Video: Radiofrecuencia y Ozonoterapia en ViBa Clínica de Tratamiento del Dolor" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen loading="lazy"></iframe>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section class="py-16 md:py-20 bg-beige-50">
            <div class="container mx-auto px-6 max-w-3xl reveal">
                <h2 class="section-title mb-6">¿Cómo es el procedimiento?</h2>
                <p class="text-ink-soft mb-4">Es un procedimiento <strong class="text-ink">ambulatorio</strong>: se realiza con anestesia local, guiado por Rayos X en tiempo real para asegurar la colocación exacta de la aguja, y la mayoría de los pacientes regresa a casa el mismo día.</p>
                ${checkList([
                  'No requiere anestesia general ni hospitalización prolongada.',
                  'La guía por imagen permite tratar el nervio exacto que produce el dolor.',
                  'Es compatible con otros tratamientos que el paciente ya esté recibiendo.',
                  'Permite retomar las actividades cotidianas en poco tiempo.',
                ])}
                ${disclaimer}
            </div>
        </section>

${cta(
  '¿Tu dolor no cede con tratamiento convencional?',
  'Trae tus estudios y el Dr. Otto Villagrán evaluará si la radiofrecuencia o la ozonoterapia son la mejor opción para tu caso.',
  'Hola, quisiera información sobre radiofrecuencia y ozonoterapia en ViBa Clínica de Tratamiento del Dolor.'
)}

${relacionados([
  ['hernia-de-disco.html', 'Tratamiento de hernia de disco sin cirugía'],
  ['lumbalgia-ciatica.html', 'Lumbalgia y ciática'],
  ['neuropatias.html', 'Neuropatías: trigémino, herpes zóster y diabética'],
  ['fibromialgia.html', 'Fibromialgia'],
])}`,
});

// --- 2. Hernia de disco ---
pages.push({
  slug: 'hernia-de-disco.html',
  title: 'Tratamiento de Hernia de Disco sin Cirugía en Quetzaltenango (Xela) | ViBa',
  description: 'Discectomía percutánea: tratamiento de hernia de disco sin cirugía abierta en Quetzaltenango (Xela). Anestesia local, guía por Rayos X y recuperación más rápida.',
  ogImage: 'media/hernia-discal-3.webp',
  jsonLd: {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'MedicalProcedure',
        name: 'Discectomía Percutánea',
        alternateName: 'Tratamiento de hernia de disco sin cirugía',
        procedureType: 'https://schema.org/PercutaneousProcedure',
        bodyLocation: 'Disco intervertebral',
        howPerformed: 'A través de una punción en la piel se introduce una cánula delgada hasta el disco afectado, guiada por Rayos X en tiempo real, para retirar o reducir la porción del disco que comprime la raíz nerviosa.',
        preparation: 'Evaluación con el especialista y estudios de imagen que confirmen la hernia.',
        followup: 'Procedimiento ambulatorio con anestesia local y sedación; la mayoría de los pacientes regresa a casa el mismo día.',
        availableService: { '@id': `${SITE}/#clinica` },
        url: `${SITE}/hernia-de-disco.html`,
      },
      breadcrumbLd('hernia-de-disco.html', 'Hernia de Disco'),
    ],
  },
  body: `${pageHeader(
    'Tratamiento de Hernia de Disco sin Cirugía Abierta',
    'La discectomía percutánea trata la hernia a través de una pequeña punción en la piel: anestesia local, sin cirugía abierta y con una recuperación considerablemente más rápida.',
    'Hernia de Disco'
  )}

        <section class="py-16 md:py-20 bg-white">
            <div class="container mx-auto px-6">
                <div class="grid md:grid-cols-2 gap-12 items-start">
                    <div class="reveal">
                        <h2 class="section-title mb-4">¿Qué es una hernia de disco?</h2>
                        <p class="text-ink-soft mb-4">Entre las vértebras de la columna hay discos que funcionan como amortiguadores. Ocurre una hernia cuando el núcleo gelatinoso de un disco se desplaza y comprime las raíces nerviosas cercanas. Puede ser causada por una lesión, un esfuerzo o el desgaste natural.</p>

                        <h3 class="text-2xl font-bold text-ink mt-8 mb-4 font-serif">Síntomas frecuentes</h3>
                        <ul class="list-disc list-inside space-y-2 text-ink-soft mb-4">
                            <li>Dolor punzante que baja hacia la pierna, el brazo o el cuello.</li>
                            <li>Entumecimiento, ardor u hormigueo en la zona afectada.</li>
                            <li>Debilidad muscular en la extremidad comprometida.</li>
                            <li>Dolor que empeora al estar de pie, sentado, por la noche, o al toser y reírse.</li>
                        </ul>

                        <h2 class="section-title mt-10 mb-4">La discectomía percutánea</h2>
                        <p class="text-ink-soft mb-4">"Percutánea" significa "a través de la piel". En lugar de abrir quirúrgicamente la zona, el especialista introduce una cánula delgada hasta el disco afectado, guiado en todo momento por Rayos X en tiempo real. A través de ella se retira o reduce la porción del disco que comprime el nervio, descomprimiendo la raíz nerviosa y aliviando el dolor.</p>
                        <div class="bg-lavender-50 border border-[var(--color-border)] text-ink p-5 rounded-xl">
                            <p class="font-bold text-primary">Procedimiento Mínimamente Invasivo</p>
                            <p class="text-ink-soft">Se realiza con anestesia local y sedación, guiado por Rayos X para máxima seguridad y exactitud, permitiendo una recuperación más rápida y efectiva.</p>
                        </div>
                    </div>
                    <div class="reveal space-y-6">
                        <img src="media/hernia-discal-3.webp" alt="Procedimiento de discectomía percutánea guiado por Rayos X" class="rounded-2xl shadow-xl w-full" width="805" height="447">
                        <div class="video-frame">
                            <iframe class="rounded-2xl shadow-xl" src="https://www.youtube-nocookie.com/embed/V0igcfFY7hg" title="Video: Tratamiento de hernias de disco en ViBa Clínica de Tratamiento del Dolor" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen loading="lazy"></iframe>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section class="py-16 md:py-20 bg-beige-50">
            <div class="container mx-auto px-6 max-w-3xl reveal">
                <h2 class="section-title mb-6">Ventajas frente a la cirugía abierta</h2>
                ${checkList([
                  'Sin incisiones grandes ni cicatrices quirúrgicas.',
                  'Anestesia local y sedación en lugar de anestesia general.',
                  'Procedimiento ambulatorio: en la mayoría de los casos el paciente regresa a casa el mismo día.',
                  'Recuperación considerablemente más rápida.',
                  'Menor riesgo de daño a los tejidos sanos alrededor.',
                ])}

                <h2 class="section-title mt-12 mb-4">¿Quién es candidato?</h2>
                <p class="text-ink-soft mb-4">No todas las hernias requieren el mismo tratamiento. La discectomía percutánea suele considerarse cuando el dolor persiste a pesar del tratamiento conservador (medicamentos, fisioterapia) y los estudios de imagen confirman una hernia que comprime una raíz nerviosa. La única forma de saberlo con certeza es una evaluación especializada con tus estudios en mano.</p>
                ${disclaimer}
            </div>
        </section>

${cta(
  '¿Te diagnosticaron una hernia de disco?',
  'Trae tus estudios y evaluaremos si la discectomía percutánea u otro tratamiento mínimamente invasivo es la mejor opción para ti.',
  'Hola, me diagnosticaron una hernia de disco y quisiera agendar una evaluación en ViBa Clínica de Tratamiento del Dolor.'
)}

${relacionados([
  ['blog-discectomia-percutanea.html', 'Artículo: Discectomía percutánea, una alternativa a la cirugía'],
  ['lumbalgia-ciatica.html', 'Lumbalgia y ciática'],
  ['radiofrecuencia-ozonoterapia.html', 'Radiofrecuencia y ozonoterapia'],
  ['blog-espalda-saludable.html', 'Artículo: 10 recomendaciones para una espalda saludable'],
])}`,
});

// --- 3. Lumbalgia y ciática ---
pages.push({
  slug: 'lumbalgia-ciatica.html',
  title: 'Tratamiento de Lumbalgia y Ciática en Quetzaltenango (Xela) | ViBa',
  description: 'Tratamiento especializado del dolor lumbar y la ciática en Quetzaltenango (Xela): radiofrecuencia, ozonoterapia y procedimientos mínimamente invasivos.',
  jsonLd: {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'MedicalCondition',
        name: 'Lumbalgia y Ciática',
        alternateName: ['Dolor lumbar', 'Lumbago', 'Dolor del nervio ciático'],
        signOrSymptom: [
          { '@type': 'MedicalSignOrSymptom', name: 'Dolor en la zona baja de la espalda' },
          { '@type': 'MedicalSignOrSymptom', name: 'Dolor que irradia hacia la pierna' },
          { '@type': 'MedicalSignOrSymptom', name: 'Hormigueo o entumecimiento en la pierna' },
        ],
        possibleTreatment: [
          { '@type': 'MedicalProcedure', name: 'Radiofrecuencia' },
          { '@type': 'MedicalProcedure', name: 'Ozonoterapia' },
        ],
        url: `${SITE}/lumbalgia-ciatica.html`,
      },
      breadcrumbLd('lumbalgia-ciatica.html', 'Lumbalgia y Ciática'),
    ],
  },
  body: `${pageHeader(
    'Tratamiento de Lumbalgia y Ciática',
    'El dolor lumbar es una de las causas más frecuentes de consulta médica. Cuando no cede con el tratamiento habitual, existen procedimientos especializados que atacan el origen del dolor.',
    'Lumbalgia y Ciática'
  )}

        <section class="py-16 md:py-20 bg-white">
            <div class="container mx-auto px-6">
                <div class="grid md:grid-cols-2 gap-12 items-start">
                    <div class="reveal">
                        <h2 class="section-title mb-4">Lumbalgia: el dolor de la espalda baja</h2>
                        <p class="text-ink-soft mb-4">La lumbalgia —o lumbago— es el dolor localizado en la parte baja de la espalda. Puede aparecer de forma repentina tras un esfuerzo o instalarse poco a poco por el desgaste de las estructuras de la columna: discos, articulaciones facetarias, músculos y ligamentos.</p>
                        <p class="text-ink-soft mb-4">La mayoría de los episodios mejora en semanas. El problema aparece cuando el dolor <strong class="text-ink">persiste más de tres meses</strong>: en ese punto deja de ser un simple síntoma y empieza a limitar el trabajo, el sueño y la vida diaria.</p>

                        <h2 class="section-title mt-10 mb-4">Ciática: cuando el dolor baja por la pierna</h2>
                        <p class="text-ink-soft mb-4">La ciática no es una enfermedad en sí, sino un síntoma: el dolor que se produce cuando el nervio ciático —el más largo del cuerpo— se irrita o queda comprimido, con frecuencia por una hernia de disco o por el estrechamiento del canal por donde pasa la raíz nerviosa.</p>
                        <p class="text-ink-soft">Se caracteriza por un dolor que <strong class="text-ink">baja desde la zona lumbar hacia el glúteo y la pierna</strong>, generalmente de un solo lado, y que puede acompañarse de ardor, hormigueo, entumecimiento o debilidad.</p>
                    </div>
                    <div class="reveal">
                        <img src="media/dolor-de-espalda.jpg" alt="Persona con dolor lumbar en su rutina diaria" class="rounded-2xl shadow-xl w-full mb-6" width="1280" height="720">
                        <div class="bg-lavender-50 border border-[var(--color-border)] rounded-xl p-5">
                            <p class="font-bold text-primary mb-2">¿Cuándo consultar a un especialista?</p>
                            <ul class="list-disc list-inside space-y-1 text-ink-soft text-sm">
                                <li>El dolor lleva más de tres meses pese al tratamiento.</li>
                                <li>Te despierta por la noche o te impide trabajar.</li>
                                <li>Sientes debilidad, hormigueo o entumecimiento en la pierna.</li>
                                <li>Dependes cada vez más de analgésicos para funcionar.</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section class="py-16 md:py-20 bg-beige-50">
            <div class="container mx-auto px-6 max-w-3xl reveal">
                <h2 class="section-title mb-6">Cómo lo tratamos en ViBa</h2>
                <p class="text-ink-soft mb-4">Atendemos las patologías que no han obtenido alivio con tratamientos convencionales. Tras una evaluación con tus estudios, el plan puede incluir:</p>
                ${checkList([
                  '<strong class="text-ink">Radiofrecuencia:</strong> interrumpe de forma controlada la señal dolorosa en el nervio responsable, incluidas las articulaciones facetarias de la columna lumbar.',
                  '<strong class="text-ink">Ozonoterapia:</strong> efecto analgésico y antiinflamatorio, especialmente útil en lumbago, ciática y espasmos musculares.',
                  '<strong class="text-ink">Discectomía percutánea:</strong> cuando la causa es una hernia de disco que comprime la raíz nerviosa.',
                ])}
                <p class="text-ink-soft mt-6">Todos son procedimientos mínimamente invasivos, guiados por imagen y realizados de forma ambulatoria con anestesia local.</p>
                ${disclaimer}
            </div>
        </section>

${cta(
  '¿Tu dolor de espalda lleva meses sin mejorar?',
  'Una evaluación especializada identifica el origen exacto del dolor y define el tratamiento adecuado para tu caso.',
  'Hola, tengo dolor lumbar o ciática y quisiera agendar una evaluación en ViBa Clínica de Tratamiento del Dolor.'
)}

${relacionados([
  ['hernia-de-disco.html', 'Tratamiento de hernia de disco sin cirugía'],
  ['radiofrecuencia-ozonoterapia.html', 'Radiofrecuencia y ozonoterapia'],
  ['blog-espalda-saludable.html', 'Artículo: 10 recomendaciones para una espalda saludable'],
  ['blog-que-es-el-dolor.html', 'Artículo: ¿Qué es el dolor y cómo se clasifica?'],
])}`,
});

// --- 4. Osteoporosis ---
pages.push({
  slug: 'osteoporosis.html',
  title: 'Prevención de Fracturas por Osteoporosis en Quetzaltenango (Xela) | ViBa',
  description: 'Procedimiento de vanguardia para prevenir fracturas de cadera por osteoporosis en Quetzaltenango (Xela): refuerza el hueso desde adentro, guiado por Rayos X.',
  ogImage: 'media/fracturas-osteoporosis.webp',
  jsonLd: {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'MedicalProcedure',
        name: 'Prevención de fracturas de cadera por osteoporosis',
        procedureType: 'https://schema.org/PercutaneousProcedure',
        bodyLocation: 'Cadera',
        howPerformed: 'Se introduce un cemento especial de uso médico en la zona donde es más frecuente que ocurra la fractura, fortaleciendo el hueso desde adentro, guiado por Rayos X en tiempo real.',
        followup: 'No requiere anestesia general, lo que facilita y acelera la recuperación del paciente.',
        availableService: { '@id': `${SITE}/#clinica` },
        url: `${SITE}/osteoporosis.html`,
      },
      breadcrumbLd('osteoporosis.html', 'Osteoporosis'),
    ],
  },
  body: `${pageHeader(
    'Prevención de Fracturas por Osteoporosis',
    'Un procedimiento de vanguardia que refuerza el hueso desde adentro para prevenir la fractura de cadera, antes de que ocurra.',
    'Osteoporosis'
  )}

        <section class="py-16 md:py-20 bg-white">
            <div class="container mx-auto px-6">
                <div class="grid md:grid-cols-2 gap-12 items-start">
                    <div class="reveal">
                        <h2 class="section-title mb-4">¿Qué es la osteoporosis?</h2>
                        <p class="text-ink-soft mb-4">La osteoporosis es una enfermedad que vuelve los huesos frágiles y más propensos a fracturarse. Aproximadamente la mitad de todas las mujeres mayores de 50 años sufrirá una fractura de cadera, muñeca o columna.</p>
                        <p class="text-ink-soft mb-4">La causa principal es genética, pero factores como la falta de calcio, el tabaquismo y otras enfermedades aumentan el riesgo.</p>
                        <p class="text-ink-soft">La fractura de cadera es especialmente seria en personas mayores, porque compromete la autonomía y la calidad de vida de forma prolongada. Por eso el enfoque más valioso es <strong class="text-ink">prevenirla antes de que suceda</strong>.</p>

                        <h2 class="section-title mt-10 mb-4">El procedimiento</h2>
                        <p class="text-ink-soft mb-4">En ViBa Clínica de Tratamiento del Dolor realizamos un procedimiento médico de vanguardia para <strong class="text-ink">prevenir las fracturas de cadera</strong>. Consiste en la introducción de un cemento especial de uso médico en la zona donde es más frecuente que ocurra la fractura, fortaleciendo el hueso desde adentro.</p>
                        ${checkList([
                          'Procedimiento seguro con un alto margen de éxito para reforzar la estructura ósea.',
                          'Es guiado por Rayos X en tiempo real para asegurar una colocación precisa del cemento.',
                          'No requiere anestesia general, lo que facilita y acelera la recuperación del paciente.',
                        ])}
                    </div>
                    <div class="reveal">
                        <img src="media/fracturas-osteoporosis.webp" alt="Prevención de fracturas de cadera por osteoporosis" class="rounded-2xl shadow-xl w-full" width="1000" height="568">
                    </div>
                </div>
            </div>
        </section>

        <section class="py-16 md:py-20 bg-beige-50">
            <div class="container mx-auto px-6 max-w-3xl reveal">
                <h2 class="section-title mb-6">¿Quién puede beneficiarse?</h2>
                <p class="text-ink-soft mb-4">Este procedimiento está dirigido principalmente a personas con diagnóstico de osteoporosis y riesgo elevado de fractura de cadera. La evaluación especializada, junto con tus estudios de densidad ósea, determina si eres candidato.</p>
                <p class="text-ink-soft">Si un familiar mayor tiene osteoporosis diagnosticada y te preocupa el riesgo de una caída, una consulta de valoración es el punto de partida.</p>
                ${disclaimer}
            </div>
        </section>

${cta(
  '¿Osteoporosis diagnosticada? Prevenir es mejor que tratar',
  'Agenda una evaluación para conocer el riesgo real de fractura y las opciones de prevención disponibles.',
  'Hola, quisiera información sobre la prevención de fracturas por osteoporosis en ViBa Clínica de Tratamiento del Dolor.'
)}

${relacionados([
  ['tratamientos.html', 'Ver todos nuestros tratamientos'],
  ['radiofrecuencia-ozonoterapia.html', 'Radiofrecuencia y ozonoterapia'],
  ['blog-espalda-saludable.html', 'Artículo: 10 recomendaciones para una espalda saludable'],
  ['index.html#contacto', 'Ubicación, horarios y contacto'],
])}`,
});

// --- 5. Neuropatías ---
pages.push({
  slug: 'neuropatias.html',
  title: 'Neuralgia del Trigémino, Herpes Zóster y Neuropatía Diabética | ViBa Xela',
  description: 'Tratamiento del dolor neuropático en Quetzaltenango (Xela): neuralgia del trigémino, neuralgia posterior al Herpes Zóster y neuropatía diabética.',
  jsonLd: {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'MedicalCondition',
        name: 'Dolor neuropático',
        alternateName: ['Neuralgia del trigémino', 'Neuralgia posherpética', 'Neuropatía diabética'],
        signOrSymptom: [
          { '@type': 'MedicalSignOrSymptom', name: 'Ardor' },
          { '@type': 'MedicalSignOrSymptom', name: 'Hormigueo' },
          { '@type': 'MedicalSignOrSymptom', name: 'Dolor punzante tipo corriente eléctrica' },
        ],
        possibleTreatment: [{ '@type': 'MedicalProcedure', name: 'Radiofrecuencia' }],
        url: `${SITE}/neuropatias.html`,
      },
      breadcrumbLd('neuropatias.html', 'Neuropatías'),
    ],
  },
  body: `${pageHeader(
    'Tratamiento de Neuropatías y Dolor Neuropático',
    'Cuando el dolor nace del propio nervio dañado, los analgésicos comunes no bastan. Tratamos la neuralgia del trigémino, el dolor posterior al Herpes Zóster y la neuropatía diabética.',
    'Neuropatías'
  )}

        <section class="py-16 md:py-20 bg-white">
            <div class="container mx-auto px-6 max-w-3xl reveal">
                <h2 class="section-title mb-4">¿Qué es el dolor neuropático?</h2>
                <p class="text-ink-soft mb-4">A diferencia del dolor que proviene de un músculo o una articulación lesionada, el dolor neuropático se origina en un <strong class="text-ink">daño o mal funcionamiento del propio nervio</strong>. Los pacientes lo describen como ardor, corriente eléctrica, hormigueo o punzadas — a veces desencadenado por algo tan leve como el roce de la ropa.</p>
                <p class="text-ink-soft">Esta diferencia importa: el dolor neuropático no responde bien a los analgésicos comunes, pero sí a técnicas que modulan directamente la señal del nervio afectado, como la radiofrecuencia.</p>
            </div>
        </section>

        <section class="py-16 md:py-20 bg-beige-50">
            <div class="container mx-auto px-6">
                <h2 class="section-title text-center mb-12 reveal">Condiciones que tratamos</h2>
                <div class="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                    <div class="reveal bg-white rounded-2xl p-8 shadow-md">
                        <h3 class="text-xl font-bold text-ink mb-3 font-serif">Neuralgia del Trigémino</h3>
                        <p class="text-ink-soft">El nervio trigémino transmite la sensibilidad de la cara. Cuando se irrita produce episodios de dolor facial intenso y punzante, a menudo desencadenados por hablar, masticar, lavarse los dientes o incluso una corriente de aire. Es uno de los dolores más incapacitantes que existen, y responde bien al tratamiento especializado.</p>
                    </div>
                    <div class="reveal bg-white rounded-2xl p-8 shadow-md">
                        <h3 class="text-xl font-bold text-ink mb-3 font-serif">Neuralgia por Herpes Zóster</h3>
                        <p class="text-ink-soft">Después de un episodio de Herpes Zóster —conocido popularmente como "culebrilla"— el dolor puede persistir durante meses o años en la zona afectada, aun cuando la erupción de la piel ya sanó. Se trata de una secuela del daño que el virus provocó en el nervio.</p>
                    </div>
                    <div class="reveal bg-white rounded-2xl p-8 shadow-md">
                        <h3 class="text-xl font-bold text-ink mb-3 font-serif">Neuropatía Diabética</h3>
                        <p class="text-ink-soft">La diabetes de larga evolución puede dañar progresivamente los nervios, sobre todo de pies y piernas. Produce ardor, hormigueo, sensación de calcetín apretado y dolor que suele empeorar por la noche. El manejo del dolor es una parte esencial del cuidado integral del paciente diabético.</p>
                    </div>
                </div>
            </div>
        </section>

        <section class="py-16 md:py-20 bg-white">
            <div class="container mx-auto px-6 max-w-3xl reveal">
                <h2 class="section-title mb-6">Nuestro enfoque</h2>
                <p class="text-ink-soft mb-4">Tratamos estas condiciones con <strong class="text-ink">radiofrecuencia</strong> y terapias especializadas que modulan la señal dolorosa del nervio afectado, en lugar de simplemente enmascarar el síntoma.</p>
                <p class="text-ink-soft">La radiofrecuencia pulsada es especialmente útil en dolor neuropático, ya que altera la transmisión del dolor sin generar un aumento significativo de temperatura en el nervio. Cada plan se define tras una evaluación individual.</p>
                ${disclaimer}
            </div>
        </section>

${cta(
  '¿Sientes ardor, hormigueo o corrientes de dolor?',
  'El dolor neuropático tiene tratamiento. Agenda una evaluación para identificar el nervio afectado y las opciones disponibles.',
  'Hola, quisiera información sobre el tratamiento de neuropatías en ViBa Clínica de Tratamiento del Dolor.'
)}

${relacionados([
  ['radiofrecuencia-ozonoterapia.html', 'Radiofrecuencia y ozonoterapia'],
  ['blog-que-es-el-dolor.html', 'Artículo: ¿Qué es el dolor y cómo se clasifica?'],
  ['fibromialgia.html', 'Fibromialgia'],
  ['tratamientos.html', 'Ver todos nuestros tratamientos'],
])}`,
});

// --- 6. Fibromialgia ---
pages.push({
  slug: 'fibromialgia.html',
  title: 'Tratamiento de Fibromialgia en Quetzaltenango (Xela) | ViBa',
  description: 'Manejo integral de la fibromialgia en Quetzaltenango (Xela): ozonoterapia y un plan personalizado para reducir el dolor generalizado y recuperar funcionalidad.',
  jsonLd: {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'MedicalCondition',
        name: 'Fibromialgia',
        signOrSymptom: [
          { '@type': 'MedicalSignOrSymptom', name: 'Dolor generalizado en músculos y articulaciones' },
          { '@type': 'MedicalSignOrSymptom', name: 'Fatiga' },
          { '@type': 'MedicalSignOrSymptom', name: 'Alteraciones del sueño' },
        ],
        possibleTreatment: [{ '@type': 'MedicalProcedure', name: 'Ozonoterapia' }],
        url: `${SITE}/fibromialgia.html`,
      },
      breadcrumbLd('fibromialgia.html', 'Fibromialgia'),
    ],
  },
  body: `${pageHeader(
    'Tratamiento de la Fibromialgia',
    'Un dolor real, generalizado y con frecuencia mal comprendido. Ofrecemos un manejo integral enfocado en reducir el dolor y recuperar la funcionalidad diaria.',
    'Fibromialgia'
  )}

        <section class="py-16 md:py-20 bg-white">
            <div class="container mx-auto px-6 max-w-3xl reveal">
                <h2 class="section-title mb-4">¿Qué es la fibromialgia?</h2>
                <p class="text-ink-soft mb-4">La fibromialgia es una condición que causa <strong class="text-ink">dolor generalizado en músculos y articulaciones</strong>, acompañado de fatiga y alteraciones del sueño. Muchas personas la describen como un cansancio profundo que no mejora con el descanso, sumado a un dolor que cambia de lugar y de intensidad.</p>
                <p class="text-ink-soft mb-4">Es frecuente que quienes la padecen recorran varios médicos antes de recibir un diagnóstico, y que en el camino escuchen que "no tienen nada". El dolor de la fibromialgia es real y merece un abordaje serio.</p>

                <h2 class="section-title mt-10 mb-4">Síntomas frecuentes</h2>
                <ul class="list-disc list-inside space-y-2 text-ink-soft">
                    <li>Dolor difuso en varias zonas del cuerpo, presente la mayor parte del tiempo.</li>
                    <li>Fatiga persistente, incluso después de dormir.</li>
                    <li>Sueño no reparador y despertares frecuentes.</li>
                    <li>Rigidez matutina y sensibilidad aumentada al tacto o a la presión.</li>
                    <li>Dificultad para concentrarse.</li>
                </ul>
            </div>
        </section>

        <section class="py-16 md:py-20 bg-beige-50">
            <div class="container mx-auto px-6 max-w-3xl reveal">
                <h2 class="section-title mb-6">Nuestro enfoque</h2>
                <p class="text-ink-soft mb-4">Ofrecemos un manejo integral que combina terapias como la <strong class="text-ink">ozonoterapia</strong> —con efecto analgésico, antiinflamatorio y de mejora en la oxigenación de los tejidos— con un plan personalizado para reducir el dolor y recuperar la funcionalidad diaria.</p>
                <p class="text-ink-soft">El objetivo no es solo bajar la intensidad del dolor, sino devolverte autonomía: dormir mejor, moverte con menos rigidez y retomar actividades que habías dejado.</p>
                ${disclaimer}
            </div>
        </section>

${cta(
  '¿Convives con dolor generalizado y fatiga?',
  'Agenda una evaluación para definir un plan de manejo adaptado a tu caso.',
  'Hola, quisiera información sobre el tratamiento de fibromialgia en ViBa Clínica de Tratamiento del Dolor.'
)}

${relacionados([
  ['radiofrecuencia-ozonoterapia.html', 'Radiofrecuencia y ozonoterapia'],
  ['neuropatias.html', 'Neuropatías: trigémino, herpes zóster y diabética'],
  ['blog-que-es-el-dolor.html', 'Artículo: ¿Qué es el dolor y cómo se clasifica?'],
  ['tratamientos.html', 'Ver todos nuestros tratamientos'],
])}`,
});

// --- 7. Dolor por cáncer ---
pages.push({
  slug: 'dolor-por-cancer.html',
  title: 'Manejo del Dolor por Cáncer y Cuidados Paliativos en Xela | ViBa',
  description: 'Cuidados paliativos y manejo especializado del dolor oncológico en Quetzaltenango (Xela), en coordinación con el equipo médico tratante del paciente.',
  jsonLd: {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'MedicalCondition',
        name: 'Dolor oncológico',
        alternateName: 'Dolor por cáncer',
        possibleTreatment: [
          { '@type': 'MedicalTherapy', name: 'Cuidados paliativos' },
          { '@type': 'MedicalProcedure', name: 'Bloqueos y procedimientos para el control del dolor' },
        ],
        url: `${SITE}/dolor-por-cancer.html`,
      },
      breadcrumbLd('dolor-por-cancer.html', 'Dolor por Cáncer'),
    ],
  },
  body: `${pageHeader(
    'Manejo del Dolor por Cáncer y Cuidados Paliativos',
    'El dolor oncológico requiere un manejo especializado y compasivo, enfocado en el bienestar del paciente y el acompañamiento de su familia.',
    'Dolor por Cáncer'
  )}

        <section class="py-16 md:py-20 bg-white">
            <div class="container mx-auto px-6 max-w-3xl reveal">
                <h2 class="section-title mb-4">El dolor no tiene por qué formar parte del proceso</h2>
                <p class="text-ink-soft mb-4">Durante un tratamiento oncológico, el dolor puede provenir de la enfermedad misma o de los procedimientos necesarios para tratarla. Aunque es frecuente, <strong class="text-ink">no es algo que el paciente deba simplemente soportar</strong>: existe una especialidad médica dedicada a controlarlo.</p>
                <p class="text-ink-soft">Brindamos cuidados paliativos enfocados en aliviar el dolor y mejorar la calidad de vida del paciente y su familia, siempre <strong class="text-ink">en coordinación con su equipo médico tratante</strong>. No sustituimos al oncólogo: trabajamos junto a él para que el tratamiento sea más llevadero.</p>

                <h2 class="section-title mt-10 mb-6">Qué incluye el acompañamiento</h2>
                ${checkList([
                  'Evaluación especializada del tipo y la intensidad del dolor.',
                  'Plan de manejo individualizado, ajustado conforme evoluciona el tratamiento.',
                  'Procedimientos para el control del dolor cuando la medicación no es suficiente.',
                  'Comunicación con el equipo oncológico que lleva el caso.',
                  'Orientación a la familia, que también forma parte del proceso.',
                ])}
                ${disclaimer}
            </div>
        </section>

${cta(
  'Hablemos sobre el manejo del dolor',
  'Si un familiar atraviesa un tratamiento oncológico y el dolor no está controlado, podemos ayudar. Escríbenos y te orientamos.',
  'Hola, quisiera información sobre el manejo del dolor por cáncer y cuidados paliativos en ViBa Clínica de Tratamiento del Dolor.'
)}

${relacionados([
  ['radiofrecuencia-ozonoterapia.html', 'Radiofrecuencia y ozonoterapia'],
  ['neuropatias.html', 'Neuropatías: trigémino, herpes zóster y diabética'],
  ['blog-que-es-el-dolor.html', 'Artículo: ¿Qué es el dolor y cómo se clasifica?'],
  ['index.html#contacto', 'Ubicación, horarios y contacto'],
])}`,
});

// =====================================================================
//  Página índice de tratamientos (hub)
// =====================================================================

const hubCards = [
  {
    id: 'radiofrecuencia-ozono',
    href: 'radiofrecuencia-ozonoterapia.html',
    titulo: 'Radiofrecuencia y Ozonoterapia',
    texto: 'Interrumpe la señal del dolor crónico en columna, cuello y articulaciones mediante corriente de uso médico y ozono terapéutico. Procedimiento ambulatorio con anestesia local.',
    img: 'media/1.webp',
    w: 280,
    h: 280,
  },
  {
    id: 'hernias-disco',
    href: 'hernia-de-disco.html',
    titulo: 'Hernia de Disco',
    texto: 'Discectomía percutánea: tratamiento de la hernia a través de una punción en la piel, sin cirugía abierta y con una recuperación considerablemente más rápida.',
    img: 'media/hernia-discal-3.webp',
    w: 805,
    h: 447,
  },
  {
    id: 'lumbalgia-ciatica',
    href: 'lumbalgia-ciatica.html',
    titulo: 'Lumbalgia y Ciática',
    texto: 'Dolor lumbar persistente y dolor que baja por la pierna. Tratamiento especializado cuando no ha cedido con medicamentos ni fisioterapia.',
    img: 'media/dolor-de-espalda.jpg',
    w: 1280,
    h: 720,
  },
  {
    id: 'osteoporosis',
    href: 'osteoporosis.html',
    titulo: 'Osteoporosis',
    texto: 'Procedimiento de vanguardia para prevenir fracturas de cadera fortaleciendo el hueso desde adentro, guiado por Rayos X en tiempo real.',
    img: 'media/fracturas-osteoporosis.webp',
    w: 1000,
    h: 568,
  },
  {
    id: 'neuropatias',
    href: 'neuropatias.html',
    titulo: 'Neuropatías',
    texto: 'Neuralgia del trigémino, dolor posterior al Herpes Zóster y neuropatía diabética: dolor que nace del nervio y no cede con analgésicos comunes.',
  },
  {
    id: 'fibromialgia',
    href: 'fibromialgia.html',
    titulo: 'Fibromialgia',
    texto: 'Manejo integral del dolor generalizado, la fatiga y las alteraciones del sueño, con un plan personalizado para recuperar funcionalidad.',
  },
  {
    id: 'otras-condiciones',
    href: 'dolor-por-cancer.html',
    titulo: 'Dolor por Cáncer',
    texto: 'Cuidados paliativos y manejo especializado del dolor oncológico, en coordinación con el equipo médico tratante del paciente.',
  },
];

const hubCard = (c) => `                    <a href="${c.href}" class="reveal group flex flex-col bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 scroll-mt-24" id="${c.id}">
${c.img ? `                        <img src="${c.img}" alt="${c.titulo}" class="w-full h-44 object-cover" loading="lazy" width="${c.w}" height="${c.h}">` : ''}
                        <div class="p-6 flex flex-col flex-1">
                            <h3 class="text-xl font-bold text-ink mb-2 font-serif">${c.titulo}</h3>
                            <p class="text-ink-soft text-sm mb-4 flex-1">${c.texto}</p>
                            <span class="inline-flex items-center font-semibold text-primary group-hover:text-primary-light">Conocer el tratamiento ${icon(SVG_ARROW, 'w-4 h-4 ml-1')}</span>
                        </div>
                    </a>`;

pages.push({
  slug: 'tratamientos.html',
  title: 'Tratamientos para el Dolor en Quetzaltenango (Xela) | ViBa Clínica de Tratamiento del Dolor',
  description: 'Tratamientos para el dolor crónico en Quetzaltenango (Xela): hernia de disco, radiofrecuencia, ozonoterapia, lumbalgia, ciática, osteoporosis y neuropatías.',
  preloadImage: 'media/cov12-hero.webp',
  jsonLd: {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'MedicalWebPage',
        name: 'Tratamientos para el Dolor | ViBa Clínica de Tratamiento del Dolor',
        url: `${SITE}/tratamientos.html`,
        inLanguage: 'es',
        provider: { '@id': `${SITE}/#clinica` },
      },
      {
        '@type': 'ItemList',
        name: 'Tratamientos disponibles',
        itemListElement: hubCards.map((c, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: c.titulo,
          url: `${SITE}/${c.href}`,
        })),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Inicio', item: `${SITE}/` },
          { '@type': 'ListItem', position: 2, name: 'Tratamientos', item: `${SITE}/tratamientos.html` },
        ],
      },
    ],
  },
  body: `        <!-- Page Header -->
        <section class="relative text-white overflow-hidden page-header-bg">
            <div class="absolute inset-0 bg-gradient-to-br from-ink/90 via-primary-dark/75 to-primary/40"></div>
            <div class="relative py-20 md:py-28">
                <div class="container mx-auto px-6 text-center reveal">
                    <p class="section-subtitle text-white/80 mb-3">NUESTROS PROCEDIMIENTOS</p>
                    <h1 class="text-4xl md:text-6xl font-bold font-serif">Tratamientos para el Dolor en Xela</h1>
                    <p class="text-lg md:text-xl mt-4 max-w-3xl mx-auto text-white/90">Procedimientos de vanguardia para el alivio efectivo y duradero del dolor, en Quetzaltenango.</p>
                </div>
            </div>
        </section>

        <section class="py-16 md:py-20 bg-beige-50">
            <div class="container mx-auto px-6">
                <div class="text-center mb-12 reveal max-w-3xl mx-auto">
                    <h2 class="section-title mb-4">¿Qué necesitas tratar?</h2>
                    <p class="text-ink-soft">Atendemos las patologías que no han obtenido alivio con tratamientos convencionales, utilizando técnicas y procedimientos especializados. Elige tu condición para conocer el tratamiento en detalle.</p>
                </div>
                <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
${hubCards.map(hubCard).join('\n')}
                </div>
            </div>
        </section>

${cta(
  '¿No encuentras tu condición en la lista?',
  'Atendemos todas las patologías de dolor agudo y crónico que no han cedido con tratamiento convencional. Escríbenos y te orientamos sobre tu caso.',
  'Hola, quisiera consultar si tratan mi condición en ViBa Clínica de Tratamiento del Dolor.'
)}`,
});

// =====================================================================
//  Escritura
// =====================================================================

for (const page of pages) {
  writeFileSync(page.slug, shell(page));
  console.log(`✓ ${page.slug}`);
}
console.log(`\n${pages.length} páginas generadas.`);
