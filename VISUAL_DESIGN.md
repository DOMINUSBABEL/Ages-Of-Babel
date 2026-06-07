# Especificaciones de Diseño Visual y Dirección Artística: AGES OF BABEL

Este documento establece los estándares visuales, limitaciones técnicas de renderizado, guías de color, y hojas de ruta para los assets en el desarrollo de **AGES OF BABEL**. Toda la dirección artística está diseñada para emular la estética retro del pixel art (Dot-Aesthetic) de juegos de rol de 16-bits (como *Crusaders Quest*), preservando la legibilidad en pantallas compactas y de fondo.

---

## 1. Limitaciones Técnicas del Renderizado Pixel Art

Para lograr un acabado de pixel art auténtico y nítido (sharp pixels) que no se difumine al cambiar el zoom de la pantalla o la resolución, se deben aplicar las siguientes reglas técnicas:

### A. Reglas de Renderizado CSS
Todos los elementos visuales (imágenes, lienzos de canvas, SVGs) deben tener las siguientes propiedades de renderizado para evitar que el motor del navegador aplique suavizado bilineal:

```css
.pixel-art {
    image-rendering: -moz-crisp-edges;         /* Firefox */
    image-rendering: -webkit-crisp-edges;      /* Safari/WebKit */
    image-rendering: -o-crisp-edges;           /* Opera older */
    image-rendering: pixelated;                 /* Estándar Chrome/Edge/Firefox */
    -ms-interpolation-mode: nearest-neighbor;  /* IE */
}
```

### B. Atributos de Renderizado Vectorial (SVG)
Para los assets SVG que representan sprites y estructuras, se debe usar la directiva de renderizado de bordes limpios en el nodo raíz:

```xml
<svg viewBox="0 0 16 16" shape-rendering="crispEdges">
    <!-- El navegador renderizará cada rect y path sin suavizado de bordes -->
</svg>
```

### C. Relación de Aspecto y Escalado de Pantalla (Pixel Perfect)
*   **Resolución Base del Canvas Lateral**: El desfile de combate en el modo barra de tareas tiene un alto físico de **32 píxeles de canvas** (escalado a 40px en pantalla mediante CSS).
*   **Factor de Escala**: Todos los assets deben escalarse únicamente en múltiplos enteros ($2\times$, $3\times$, $4\times$) para evitar artefactos de interpolación (píxeles desiguales o "pixel bleeding").

---

## 2. Paletas de Colores de Eras y Sendas

Para dar coherencia a la evolución histórica y a la filosofía elegida, se utilizan paletas de colores específicas que cambian dinámicamente el estilo general del juego:

### A. Paleta Base por Eras (Evolución de Fondos y Entornos)

| Era | Paleta Dominante | Tonos de Tierra / Suelo | Tono del Cielo / Fondo |
| :--- | :--- | :--- | :--- |
| **0. Nómadas** | Orgánica Silvestre | `#14532d` (Verde Pícea) | `#0c102b` (Azul Noche Profundo) |
| **1. Edad de Piedra**| Ocre y Tierra Seca | `#451a03` (Marrón Barro) | `#171b3c` (Violeta Oscuro) |
| **2. Edad de Bronce**| Cálida y Cobriza | `#78350f` (Marrón Arcilla) | `#29244c` (Púrpura Atardecer) |
| **3. Edad de Hierro**| Metálica y Fría | `#1f2937` (Gris Carbón) | `#0f172a` (Gris Pizarra) |
| **4. Edad Media** | Feudal y Boscosa | `#064e3b` (Verde Bosque) | `#020617` (Negro Azulado) |
| **5. Renacimiento**| Pastel y Náutica | `#0e7490` (Azul Océano) | `#1e293b` (Gris Azulado Claro) |
| **6. Era Industrial**| Carbón, Acero y Hollín| `#1e293b` (Gris Fábrica) | `#0f172a` (Gris Industrial) |
| **7. Era Espacial** | Neón y Ciberespacio | `#0f172a` (Placa Integrada) | `#030712` (Vacío Cósmico) |

### B. Paleta de las Sendas (Bifurcación Cultural)
Al tomar una decisión, las interfaces de usuario (UI), los bordes de los paneles y los efectos de partículas del juego se tiñen según el camino filosófico:

*   **Senda de la Espada (Militarista/Conquista)**:
    *   *Color de Acento*: `#ef4444` (Rojo Carmesí)
    *   *Glow/Brillo*: `rgba(239, 68, 68, 0.4)`
    *   *Estilo de UI*: Bordes metálicos oscuros con pernos marcados, simulando placas de armadura.
*   **Senda de la Mente (Filosófica/Científica)**:
    *   *Color de Acento*: `#06b6d4` (Cian de Luz/Zafiro)
    *   *Glow/Brillo*: `rgba(6, 182, 212, 0.4)`
    *   *Estilo de UI*: Bordes de cristal translúcido (glassmorphism con desenfoque de fondo y líneas delgadas de brillo cian).

---

## 3. Estructura de Animaciones y Hojas de Sprites (Sprite Sheets)

Cada personaje (héroe, enemigo o aldeano) se compone de un sprite de **16x16 píxeles** (o **32x32 píxeles** para jefes de crisis como el Dragón). La hoja de sprites de un personaje está organizada en una sola fila o cuadrícula horizontal con los siguientes frames:

```
[Frame 0: Idle] -> [Frame 1-2: Caminando] -> [Frame 3: Preparar Ataque] -> [Frame 4: Lanzar Ataque] -> [Frame 5: Daño Recibido] -> [Frame 6: Derrotado]
```

### Animaciones Clave (Frame-by-Frame):
1.  **Bucle de Espera (Idle Loop)**:
    *   *Frames*: 2 frames en bucle.
    *   *Efecto*: Un leve balanceo vertical de 1 píxel hacia arriba y hacia abajo para simular respiración.
2.  **Bucle de Caminata (Walk Cycle)**:
    *   *Frames*: 4 frames.
    *   *Efecto*: Movimiento de las extremidades inferiores alternando entre píxeles claros y oscuros. En CSS se emula con un balanceo vertical oscilatorio (`walk-bob` de -4px).
3.  **Animación de Ataque (Strike Stance)**:
    *   *Frames*: 2 frames rápidos.
    *   *Efecto*: El personaje avanza rápidamente 12 píxeles hacia adelante, rota levemente $15^\circ$ en sentido de las agujas del reloj, y regresa a su posición inicial, simulando un tajo o disparo.

---

## 4. Fondo en Paralaje (Parallax Scroll) del Entorno

La sección del campo de batalla lateral y el fondo del pueblo utilizan 3 capas de profundidad que se mueven a diferentes velocidades para dar sensación de volumen tridimensional:

1.  **Capa Trasera (Cielo y Horizonte)**:
    *   *Velocidad de movimiento*: $0\%$ (estática).
    *   *Contenido*: Gradiente de la era actual, estrellas pixeladas, satélites lejanos o nubes a la deriva lenta.
2.  **Capa Media (Arquitectura y Bosque)**:
    *   *Velocidad de movimiento*: $10\%$ de la velocidad de caminata de los héroes.
    *   *Contenido*: Siluetas de árboles, chozas de la Edad de Piedra, torres de castillos de la Edad Media, chimeneas humeantes en la Era Industrial, o rascacielos de neón en la Era Espacial.
3.  **Capa Frontal (Suelo y Carretera)**:
    *   *Velocidad de movimiento*: $100\%$ (sincronizada con el avance del scroll).
    *   *Contenido*: Bloques de césped, adoquines, rieles metálicos, o líneas de energía holográficas por donde caminan los héroes.

---

## 5. Plantillas XML de Assets Pixel Art (Ejemplos de Referencia)

A continuación se adjuntan los diseños nativos en SVG que sirven como especificación de cuadrícula para los ilustradores del proyecto:

### Caballero Valerio (Senda de la Espada - Héroe 16x16)
```xml
<svg viewBox="0 0 16 16" width="36" height="36" style="shape-rendering: crispEdges;">
    <!-- Casco e insignia militar -->
    <rect x="7" y="0" width="2" height="2" fill="#ef4444" />
    <rect x="5" y="2" width="6" height="5" fill="#9ca3af" />
    <rect x="4" y="4" width="8" height="2" fill="#9ca3af" />
    <rect x="5" y="5" width="6" height="1" fill="#1f2937" /> <!-- Visor -->
    <!-- Armadura corporal -->
    <rect x="5" y="7" width="6" height="6" fill="#6b7280" />
    <rect x="4" y="8" width="8" height="3" fill="#4b5563" />
    <!-- Escudo Carmesí -->
    <rect x="1" y="7" width="3" height="4" fill="#ef4444" />
    <rect x="2" y="8" width="1" height="2" fill="#facc15" />
    <!-- Espada de Acero -->
    <rect x="12" y="4" width="1" height="7" fill="#e5e7eb" />
    <rect x="11" y="9" width="3" height="1" fill="#b45309" />
    <!-- Piernas y botas de hierro -->
    <rect x="5" y="13" width="2" height="3" fill="#374151" />
    <rect x="9" y="13" width="2" height="3" fill="#374151" />
</svg>
```

### Hechicera Elara (Senda de la Mente - Héroe 16x16)
```xml
<svg viewBox="0 0 16 16" width="36" height="36" style="shape-rendering: crispEdges;">
    <!-- Sombrero de mago cian -->
    <path d="M 7,0 H 9 V 2 H 7 Z M 6,2 H 10 V 4 H 6 Z M 4,4 H 12 V 5 H 4 Z" fill="#0891b2" />
    <!-- Rostro y barba de sabiduría -->
    <rect x="5" y="5" width="6" height="3" fill="#ffedd5" />
    <rect x="5" y="7" width="6" height="2" fill="#ffffff" />
    <rect x="6" y="6" width="1" height="1" fill="#000" />
    <rect x="9" y="6" width="1" height="1" fill="#000" />
    <!-- Túnica mística -->
    <rect x="4" y="9" width="8" height="5" fill="#0e7490" />
    <!-- Báculo zafiro brillante -->
    <rect x="12" y="4" width="2" height="2" fill="#06b6d4" />
    <rect x="12" y="6" width="1" height="8" fill="#78350f" />
    <!-- Calzado -->
    <rect x="5" y="14" width="2" height="2" fill="#1e293b" />
    <rect x="9" y="14" width="2" height="2" fill="#1e293b" />
</svg>
```
