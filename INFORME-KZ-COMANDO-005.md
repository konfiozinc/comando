# KZ-COMANDO-005 — Fotografías visibles y marca KONFÍO ZINC

**Base:** `8ffecf28f1648c65c5fd10f76a61482d2c3ef4c8`
**Rama:** `fix/kz-comando-005-galeria-y-marca`
**Sitio:** https://konfiozinc.github.io/comando/

---

## 1. Qué se corrigió

### Galería de fotografías

La galería vivía dentro de un `<details>` cerrado, así que las tres fotografías solo aparecían
después de pulsar «Ver fotografías».

| Antes | Ahora |
|---|---|
| `<details>` cerrado con el botón «Ver fotografías» | Las tres fotografías **visibles al llegar** a «COMANDO en detalle» |
| Carrusel horizontal: solo se veía una foto, las otras dos requerían deslizar | Móvil: **tres fotos apiladas** en una columna · Escritorio: **tres en fila** (como estaba) |
| Botón «Cerrar fotografías» para volver a esconderlas | Sin botón: no hay nada que cerrar |

Se conserva todo lo demás: ampliación al pulsar, flechas, Escape, retorno del foco, navegación
táctil, `<picture>` con WebP por delante del JPEG y respaldo `data-fallback`. Los **originales
`comando.jpeg`, `comando1.jpeg`, `comando2.jpeg` no se tocaron**.

Los videos siguen **bajo demanda**: su panel continúa cerrado y cada video se crea solo al pulsar
«▶».

### Pie de página

Se añadió la línea **«Desarrollado por KONFÍO ZINC»** con enlace a
`https://github.com/konfiozinc` (`target="_blank"` + `rel="noopener noreferrer"`).

- Color `--green` (#39ff9c) sobre el fondo del pie (#05070c): **contraste 15,31** (mínimo exigido 4.5).
- Alcanzable por teclado y con anillo de foco visible (regla `:focus-visible` ya existente).

---

## 2. Dos defectos de maquetación que estaban ocultos

Al sacar la galería del `<details>` aparecieron dos fallos que **ya existían pero no se veían**,
porque un panel cerrado no se maqueta:

1. **Desbordamiento horizontal** en 768, 1024 y 1440 px: los ítems de la rejilla no podían
   encogerse (`min-width:auto` + imagen) y la galería medía 1053 px dentro de un contenedor de 704.
   Corregido con `minmax(0, …)` y `min-width:0`.
2. **Ancho derivado del alto**: `aspect-ratio: 4/3` junto a `height: 430px` hacía que cada foto
   reclamara 573 px de ancho (430 × 4/3). Se anula `aspect-ratio` donde la altura es fija.

Sin estas dos correcciones el arreglo visual habría roto la página en tableta y escritorio.

---

## 3. Pruebas

```
node tests/card.test.cjs   →  83 comprobaciones · PASA 83 · FALLA 0
```

Cubre las siete resoluciones (320×640, 360×640, 375×667, 390×844, 768×1024, 1024×768, 1440×900)
y en cada una: sin desbordamiento, objetivos táctiles ≥ 44 px, sin errores de consola y las tres
fotografías visibles sin desplazamiento horizontal (`scrollWidth == clientWidth`).

Además: galería ampliada, flechas, Escape, retorno del foco, tres fotos sin romperse, WebP servido,
enlace del pie (destino, `rel`, tamaño, contraste, foco), formulario, WhatsApp y teléfono,
vCard y compartir, y **reproducción real de los dos videos** (`videoWidth` 432 y 720, `currentTime`
avanzando, sin errores).

La suite necesitó dos ajustes para poder ejecutarse fuera de Linux:

- El lanzador tenía `executablePath:'/usr/bin/chromium'` fijo. Ahora usa
  `process.env.KZ_CHROMIUM_PATH`, y en Linux mantiene `/usr/bin/chromium` igual que antes.
- La comprobación de tamaño de los MP4 usaba `HEAD`, y el servidor de pruebas no devuelve
  `content-length` en `HEAD`: pasó a `GET` + `arrayBuffer()`.

Resultados completos: `tests/resultado-pruebas.json`.

## 4. Capturas

- `capturas/comando-galeria-390x844.png` — galería visible (390×844)
- `capturas/comando-footer-390x844.png` — pie con la marca KONFÍO ZINC
- `capturas/comando-<ancho>x<alto>.png` — página completa en las siete resoluciones

## 5. Pendiente

- Revisión del PR. **Nada fusionado ni desplegado.**
- Confirmar si el enlace del pie debe ir a `https://github.com/konfiozinc` (provisional) o a la web
  corporativa.
