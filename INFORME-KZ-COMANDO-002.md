# KZ-COMANDO-002 / KZ-COMANDO-003 — Informe de entrega

Fecha: 27 de octubre de 2026
Estado: **INTEGRADO Y VALIDADO EN REPOSITORIO, SIN GITHUB PAGES**

## Material recuperado

| Archivo | Estado | Propiedades |
| --- | --- | --- |
| `comando3.mp4` | Original preservado | 432×640, H.264/AAC, 22,555 s |
| `comando4.mp4` | Original preservado | 720×1280, H.264/AAC, 15,039 s |
| `comando.jpeg` | Original preservado | 1600×1532, JPEG; derivado WebP disponible. |
| `comando1.jpeg` | Original preservado | 739×1600, JPEG; derivado WebP disponible. |
| `comando2.jpeg` | Original preservado | 1080×810, JPEG; derivado WebP disponible. |

Las tres fotografías se recuperaron como archivos originales desde el repositorio autorizado. No se incluyó ninguna reconstrucción generativa ni se alteraron los JPEG aportados por el propietario.

## Tratamiento efectuado

### Fotografías

La tarjeta conserva los JPEG originales intactos. Los derivados WebP se generaron localmente para reducir transferencia y se aplica en presentación una mejora moderada y reversible mediante CSS: contraste `1.05`, saturación `1.08` y brillo `1.02`. Se preservan encuadre, nombre, ilustraciones y estructura originales.

### Videos

Los dos MP4 se reempaquetaron con `faststart` y copia directa de las pistas (`-c copy`). No se recodificó ni alteró el audio. La duración se mantiene y la comparación de fotogramas obtiene SSIM `1.000000` en ambos casos. Se generaron portadas JPG y WebP. La reproducción es bajo demanda, con controles y sin autoplay.

## Tarjeta

Se implementó una tarjeta estática en HTML, CSS y JavaScript nativos con:

- Portada COMANDO y CTA de cotización/llamada.
- Seis tipos de celebraciones confirmados.
- Galería con ampliación, flechas, Escape, foco restaurado y gesto táctil.
- Dos videos bajo demanda.
- Formulario sin persistencia con WhatsApp organizado.
- Web Share, copia de enlace y vCard.
- Metadatos Open Graph, imagen 1200×630, favicon y manifiesto.
- Mensajes prudentes: no se afirma cobertura, precio, potencia, transporte, DJ ni servicios no confirmados.

## Pruebas

El arnés de Chromium ejecutó **40 comprobaciones aprobadas y 0 fallidas** en 320×640, 360×640, 375×667, 390×844, 768×1024, 1024×768 y 1440×900.

Cobertura: overflow horizontal, objetivos táctiles, consola, WhatsApp, llamada, galería, teclado/foco, carga de video bajo demanda, ausencia de autoplay, validación, composición del mensaje, compartir, vCard, presencia de originales/derivados y ausencia de rutas locales de Windows.

No se enviaron mensajes, llamadas ni formularios reales.

## Pendientes antes de publicar

1. Confirmar la URL definitiva para generar el QR y completar `og:url`/canonical.
2. Aprobar visualmente la tarjeta integrada antes de activar GitHub Pages.

No se activó GitHub Pages, no se creó ningún workflow de despliegue y no se modificaron otros proyectos.
