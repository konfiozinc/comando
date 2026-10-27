# KZ-COMANDO-004 — Rediseño visual premium

Fecha: 27 de octubre de 2026

## Alcance aplicado

- Hero más luminoso con fotografías reales adaptadas a móvil y escritorio.
- CTA principal de WhatsApp y acceso destacado a los videos.
- Seis eventos en una cuadrícula compacta que completa el formulario.
- Galería plegable con tres originales, lightbox, flechas, gesto táctil, Escape y retorno de foco.
- Visor plegable con los dos videos originales, controles nativos y reproducción bajo demanda.
- Formulario más compacto; el campo opcional permanece disponible en un desplegable.
- Contacto por WhatsApp, llamada, compartir y vCard preservados.
- Compatibilidad con movimiento reducido, teclado y objetivos táctiles.

No se cambiaron fotografías, videos, teléfono, condiciones comerciales ni metadatos funcionales. No se añadieron dependencias externas.

## Validación

La suite ejecutó **49 comprobaciones aprobadas y 0 fallidas**. Incluye las 40 comprobaciones previas y regresiones nuevas para apertura/cierre de fotografías y videos, selección de evento, foco, paneles, imágenes locales y rutas.

Resoluciones verificadas: 320×640, 360×640, 375×667, 390×844, 768×1024, 1024×768 y 1440×900.

La altura de la vista completa se redujo de 6185 a 3500 px en 390 px de ancho y de 5538 a 3236 px en 1440 px, manteniendo todos los contenidos y acciones.

Evidencias:

- `capturas/comando-{resolución}.png`: siete vistas completas.
- `capturas/comando-galeria-390x844.png`: panel de fotografías abierto.
- `capturas/comando-videos-390x844.png`: panel de videos abierto.
- `comparativas/kz-comando-004-mobile-antes-despues.png`.
- `comparativas/kz-comando-004-escritorio-antes-despues.png`.

## Recomendación

**GO para revisión visual del propietario.** La activación de GitHub Pages y la integración a `main` siguen pendientes de autorización expresa.
