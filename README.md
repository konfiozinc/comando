# COMANDO

Tarjeta digital interactiva del pickup **COMANDO**, especializado en sonido para fiestas y eventos especiales. El proyecto es estático, mobile-first y no utiliza backend.

## Funciones

- Cotización preparada para WhatsApp `+57 314 578 6472`.
- Llamada telefónica, descarga de contacto y Web Share.
- Galería accesible con las tres fotografías originales.
- Dos videos originales preparados para reproducción web bajo demanda.
- Formulario validado que no persiste datos en el navegador.
- Navegación por teclado, movimiento reducido y diseño responsive.

## Estructura

- `index.html`, `styles.css`, `app.js`: tarjeta publicable desde la raíz.
- `comando*.jpeg`: fotografías originales aportadas por el propietario.
- `assets/img/`: derivados WebP, portadas, Open Graph y favicon.
- `assets/video/`: videos optimizados para web.
- `originales/videos/`: videos recibidos sin modificación.
- `tests/`: regresión funcional con Chromium y datos ficticios.
- `capturas/`: evidencias en siete resoluciones.
- `comparativas/`: fotogramas de referencia de los videos.

## Pruebas locales

La tarjeta debe servirse por HTTP desde la raíz del repositorio. El arnés se ejecuta con:

```bash
KZ_PLAYWRIGHT_MODULE=/ruta/a/playwright node tests/card.test.cjs
```

El código fuente procede del candidato KZ-COMANDO-002 `71fd41c6e9e87d2211d4281422bde76aa1c8f130` y fue integrado sobre el historial existente de este repositorio.

GitHub Pages no está activado ni forma parte de esta entrega.

Desarrollado por KONFÍO ZINC.
