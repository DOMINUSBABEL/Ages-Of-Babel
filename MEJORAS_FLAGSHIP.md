# 20 Propuestas de Mejora Flagship: AGES OF BABEL

Este documento recopila **20 mejoras estratégicas, mecánicas y técnicas** para convertir a **Ages of Babel** en un referente absoluto del género de estrategia incremental (Idle 4X) y aplicaciones de escritorio de tipo barra de tareas/widget (companion apps).

---

## I. Integración y Rendimiento en Segundo Plano (Sidebar & Taskbar)

### 1. Sistema Click-Through e Interactividad Selectiva
*   **Mecánica**: Permitir que el widget de la barra de tareas o la barra lateral se vuelvan intangibles a los clics del ratón (Click-Through) con un deslizador de opacidad (0% a 100%).
*   **Implementación**: Habilitar un atajo de teclado global (e.g., `Ctrl + Alt + B`) para cambiar instantáneamente la ventana de Tauri de interactiva a transparente al clic, evitando que interrumpa el trabajo ordinario del usuario en su sistema.

### 2. Estrangulación de FPS Dinámica (Battery Saver)
*   **Mecánica**: Optimizar el consumo de batería y CPU cuando la ventana del juego no está enfocada o está minimizada como widget.
*   **Implementación**: Bajar el bucle de renderizado a **1 FPS** o pausarlo por completo cuando el usuario interactúa con otras aplicaciones, manteniendo activos los hilos matemáticos secundarios (Web Workers) para que los cálculos de producción no se detengan.

### 3. Integración con el System Tray y Notificaciones Windows Toast
*   **Mecánica**: Mantener el juego en ejecución silenciosa en la bandeja del sistema de Windows.
*   **Implementación**: Diseñar un icono en la bandeja que parpadee en rojo durante crisis graves e integración con notificaciones del sistema de Windows para alertar sobre hitos críticos (e.g., "💡 Ciencia al Máximo" o "👾 Crisis Inminente").

### 4. Fondo de Escritorio Dinámico (Wallpaper Mode)
*   **Mecánica**: Permitir que el mapa pixel art de la civilización y el desfile de héroes se proyecten directamente como fondo de pantalla activo (estilo Wallpaper Engine).
*   **Implementación**: Habilitar a través de Tauri un modo de ventana anclada detrás de todos los iconos del escritorio (`HWND_BOTTOM`), ofreciendo una experiencia pasiva continua.

---

## II. Mecánicas Avanzadas de Combate y Héroes (Crusaders Quest Influence)

### 5. Combos Tridimensionales por Clases de Héroe
*   **Mecánica**: Refinar el sistema de Crusaders Quest donde encadenar 3 bloques otorga efectos masivos.
*   **Implementación**: Si activas un bloque de cada clase de héroe (Guerrero + Mago + Arquera) en menos de 1.5 segundos, desencadenas un ataque cooperativo definitivo (*"El Juicio de Babel"*) con una animación pixel art a pantalla completa.

### 6. Sistema Gacha de Héroes con "Habilidades de Oficio" pasivas
*   **Mecánica**: Permitir reclutar héroes legendarios en la taberna que impacten no solo en la batalla, sino en la producción activa/pasiva.
*   **Implementación**: Héroes con habilidades como *"Cosechadora Ancestral"* (+20% comida si está asignado al pueblo) o *"Herrero de Acero"* (reduce costo de evolución), motivando al jugador a coleccionar y rotar héroes en la taberna.

### 7. Crisis de Combate Multietapa (Asedios)
*   **Mecánica**: Las crisis no se resuelven en un solo clic; ocurren en fases secuenciales que se ven en el widget lateral.
*   **Implementación**: Fase 1: Exploradores bárbaros roban recursos (reducibles por arqueros). Fase 2: Campamento de asedio (bloquea la producción de piedra). Fase 3: Asalto al muro (combate final con el jefe).

### 8. Panteón de Deidades y Milagros Activos
*   **Mecánica**: Un panteón donde adorar dioses que cambian el cielo visualmente y otorgan poderes basados en fe.
*   **Implementación**: Adorar al *Dios de la Tempestad* desata rayos pixelados sobre los enemigos y acelera los molinos de viento; adorar al *Dios de la Luz* reduce el índice de plagas a cero por 2 minutos.

---

## III. Gestión 4X e Incremental Profunda (Microcivilization Influence)

### 9. El Diluvio y Prestigio de Babel (Reset Loop)
*   **Mecánica**: El clásico bucle de prestigio de los juegos Idle.
*   **Implementación**: Cuando la tensión de la civilización llega al 100%, puedes provocar "El Colapso de Babel". Esto destruye tu ciudad, pero te otorga *"Fragmentos del Firmamento"*, una divisa persistente utilizada para comprar reliquias permanentes en el Árbol del Panteón.

### 10. Árbol Científico de Eras Cruzadas y Tecnologías Prohibidas
*   **Mecánica**: Permitir investigar tecnologías fuera de su era natural asumiendo riesgos.
*   **Implementación**: Investigar la pólvora en la Edad de Bronce acelerará tu producción militar, pero multiplicará por $4\times$ el índice de accidentes urbanos e incendios involuntarios.

### 11. Biomas y Rutas de Exploración en Segundo Plano
*   **Mecánica**: Enviar héroes a explorar misiones fuera del scroll habitual.
*   **Implementación**: Los héroes viajan a "Dungeons" de biomas lejanos en segundo plano. El progreso se proyecta en la barra de tareas como un pequeño carro tirado por bueyes que avanza hacia un cofre de recompensa.

### 12. Gestión de Consumo y Tensión Social (Fatiga de Aldeanos)
*   **Mecánica**: Los trabajadores se fatigan si se mantienen asignados a la misma tarea sin descansos o mejoras.
*   **Implementación**: Si un aldeano trabaja demasiado tiempo en las minas de piedra, su eficiencia baja y aumenta la probabilidad de "Huelga Laboral" (crisis civil), requiriendo asignación a ocio/templos.

---

## IV. Dirección Visual y Sonido Premium (Dot-Aesthetics)

### 13. Mapas Ortogonales e Isometric Town Construction
*   **Mecánica**: Expandir la visualización del pueblo en pantalla completa de una línea lateral a una cuadrícula isométrica en pixel art.
*   **Implementación**: Permitir colocar los edificios y decoraciones en bloques isométricos de $32\times32$, viendo cómo los aldeanos caminan de forma inteligente entre las casas y las granjas.

### 14. Climatología Dinámica en Tiempo Real
*   **Mecánica**: Sincronización del clima in-game con el clima de la ubicación real del jugador mediante una API de geolocalización meteorológica.
*   **Implementación**: Si llueve en la ubicación del usuario, el fondo del juego muestra gotas pixeladas, la producción de comida aumenta un 30% y se desactivan las crisis de incendios.

### 15. Sistema de Partículas Pixeladas Retro
*   **Mecánica**: Efectos visuales de chispas, polvo, hojas al viento y fragmentos mágicos basados únicamente en píxeles gigantes.
*   **Implementación**: Generación de colisiones de partículas de $2\times2$ píxeles que rebotan en el suelo del juego cuando un héroe hace un golpe crítico o el fuego consume madera.

### 16. Banda Sonora Adaptativa Chiptune
*   **Mecánica**: Música procedural de 8/16 bits que cambia de ritmo y tono según la tensión.
*   **Implementación**: En tiempos de paz, una melodía folclórica lenta acompaña al widget; al iniciarse una crisis, la música transiciona dinámicamente a un ritmo de percusión de batalla acelerado con efectos de sintetizador de chiptune.

---

## V. Conectividad y Retención de Jugadores

### 17. Comercio Descentralizado P2P (El Puerto de Babel)
*   **Mecánica**: Intercambio de recursos sobrantes entre jugadores sin servidor centralizado.
*   **Implementación**: Los jugadores pueden enviar barcos comerciales virtuales a través de WebSockets con un código de amigo, permitiendo vender madera a cambio de oro en tiempo real.

### 18. Registro Histórico de Crónicas de la Civilización
*   **Mecánica**: Generar un libro digital que resuma tus hazañas de forma narrativa.
*   **Implementación**: Cada era completada o gran crisis resuelta escribe una línea automática en una bitácora retro (e.g., *"Año 245: Korg derrotó al Lobo Alfa usando un combo de Tajo Crítico durante la Gran Sequía"*), exportable como imagen en pixel art.

### 19. Desafíos y Logros Diarios de Barra de Tareas
*   **Mecánica**: Logros específicos adaptados a jugar de fondo mientras trabajas.
*   **Implementación**: Logros como *"Supervisión Silenciosa"* (jugar durante 3 horas seguidas en modo widget sin maximizar el juego) o *"Reflejos Rápidos"* (resolver una crisis en menos de 2 segundos desde la notificación).

### 20. Editor de Héroes y Pixel Paint integrado
*   **Mecánica**: Un pequeño taller para personalizar los sprites de tus héroes.
*   **Implementación**: Un lienzo simple de $16\times16$ píxeles in-game para pintar los colores del casco, capa o armadura de tu héroe favorito y exportar tu diseño como skin personalizada.
