# AGES OF BABEL

**AGES OF BABEL** es un videojuego incremental (Idle/Clicker) y simulador 4X en 2D con estética retro de pixel art (Dot-Aesthetic). Combina la gestión estratégica de población y desastres de *Microcivilization* con la progresión de héroes, mecánicas de combate por bloques y avance lateral de *Crusaders Quest: Hero Town*.

El juego está diseñado con una arquitectura responsiva única que permite jugarlo tanto a **Pantalla Completa** (gestión profunda) como **integrado de forma compacta sobre la barra de tareas de Windows** (supervisión pasiva y reacciones rápidas).

---

## 🚀 Pilares del Juego

1.  **Estética Pixel Art Rigurosa (Dot-Aesthetic)**: Diseño basado en cuadrículas de 16x16 y 32x32 píxeles con escalado nítido (`image-rendering: pixelated;`), emulando consolas portátiles y juegos retro premium.
2.  **Interfaz Dual Adaptable**:
    *   **Modo Pantalla Completa**: Vista de dashboard 4X clásica. Gestión de recursos, asignación de trabajadores a gremios, árbol científico y panteón de deidades.
    *   **Modo Barra de Tareas (Desktop Widget)**: Una franja compacta de 55px que muestra a los aldeanos y héroes en un scroll lateral interactivo de combate y recolección autónomos.
3.  **Gestión de Población y Crisis**: Los aldeanos son la moneda de producción, pero la aglomeración genera tensión social que desencadena eventos de crisis (invasiones, incendios, plagas) que requieren intervención militar o milagros.
4.  **La Bifurcación Cultural (Las Sendas)**:
    *   *Senda de la Espada*: Expansión imperial, conquistas, forjas de acero y héroes de daño físico/crítico.
    *   *Senda de la Mente*: Investigación científica acelerada, milagros espirituales, sanaciones y héroes místicos.

---

## 📂 Estructura del Repositorio

*   [README.md](file:///C:/Users/jegom/Ages-Of-Babel/README.md) - Presentación general y manual de juego.
*   [VISUAL_DESIGN.md](file:///C:/Users/jegom/Ages-Of-Babel/VISUAL_DESIGN.md) - Documentación exhaustiva de la dirección artística, paletas, hojas de sprites y animaciones.
*   [index.html](file:///C:/Users/jegom/Ages-Of-Babel/index.html) - Prototipo web interactivo y jugable de Ages of Babel.

---

## 🛠️ Tecnologías y Arquitectura Técnica

*   **Frontend**: HTML5, Canvas API, SVG Inline y Javascript ES6+.
*   **Diseño**: CSS3 Vanilla optimizado para reescalado nítido con variables CSS y rejillas adaptativas (Grid/Flexbox).
*   **Integración de Escritorio (Planificada)**: Empaquetado nativo mediante **Tauri** (Rust) o **Electron** para habilitar la transparencia de ventana (`transparent: true`), el modo click-through y el anclaje a la barra de tareas mediante llamadas directas a las APIs de ventana de Windows (`User32.dll`).