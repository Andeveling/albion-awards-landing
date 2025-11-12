# Feature Specification: Landing de Pre-Lanzamiento Albion Awards

**Feature Branch**: `002-landing-countdown`  
**Created**: 2025-11-11  
**Status**: Draft  
**Input**: Landing page de pre-lanzamiento con cuenta regresiva para generar expectativa antes del lanzamiento del sistema de votación Albion Awards

## Clarifications

### Session 2025-11-11

- Q: ¿Dónde y cómo debe aparecer el disclaimer que aclara que es un evento de la comunidad? → A: Footer discreto con texto pequeño: "Evento no oficial organizado por la comunidad"
- Q: ¿Cómo debe presentarse la información de los organizadores en la landing? → A: Sección "Sobre el Evento" que incluya: "Organizado por [kuruogg](twitch) y [andeveling](portfolio) para la comunidad de Albion Online"
- Q: ¿Cuál debe ser la descripción principal del evento en la landing? → A: "Evento comunitario de premiación donde los jugadores y espectadores de Albion Online votan por los mejores streamers, creadores de contenido y momentos del año"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Ver Cuenta Regresiva del Evento (Priority: P1)

Un visitante llega a la landing page y ve inmediatamente una cuenta regresiva que muestra cuánto tiempo falta para el inicio de las votaciones de los Albion Awards. La cuenta regresiva se actualiza en tiempo real y muestra días, horas, minutos y segundos restantes en la zona horaria de Bogotá, Colombia.

**Why this priority**: Es el elemento central de la landing. Sin la cuenta regresiva, no se genera la expectativa necesaria para el pre-lanzamiento.

**Independent Test**: Puede ser probado accediendo a la página y verificando que la cuenta regresiva se muestra correctamente, se actualiza cada segundo, y refleja la zona horaria de Bogotá.

**Acceptance Scenarios**:

1. **Given** un usuario accede a la landing page, **When** la página carga, **Then** debe ver una cuenta regresiva prominente con formato "DD días HH:MM:SS"
2. **Given** la cuenta regresiva está activa, **When** pasa un segundo, **Then** el contador debe actualizarse automáticamente sin recargar la página
3. **Given** el evento está a más de 24 horas, **When** se muestra la cuenta regresiva, **Then** debe mostrar días completos además de horas, minutos y segundos
4. **Given** el evento está a menos de 24 horas, **When** se muestra la cuenta regresiva, **Then** debe mostrar solo horas, minutos y segundos
5. **Given** la cuenta regresiva llega a cero, **When** el tiempo expira, **Then** debe mostrar un mensaje indicando que las votaciones ya están abiertas

---

### User Story 2 - Conocer las Categorías del Evento (Priority: P2)

Un visitante interesado puede explorar las 10 categorías de premiación que estarán disponibles cuando se abran las votaciones, generando anticipación sobre quiénes podrían ser los nominados.

**Why this priority**: Complementa la cuenta regresiva al dar contexto sobre qué se votará. Genera curiosidad y engagement sin ser crítico para el MVP.

**Independent Test**: Puede ser probado navegando por la sección de categorías y verificando que las 10 categorías están listadas con descripciones breves.

**Acceptance Scenarios**:

1. **Given** un usuario está en la landing, **When** hace scroll hacia abajo, **Then** debe ver una sección con las 10 categorías listadas
2. **Given** las categorías están visibles, **When** el usuario lee cada una, **Then** debe entender claramente qué tipo de contenido/streamer se premiará en cada categoría
3. **Given** el usuario está en móvil, **When** visualiza las categorías, **Then** debe poder leerlas cómodamente sin hacer zoom horizontal

---

### User Story 3 - Recibir Notificación del Lanzamiento (Priority: P2)

Un visitante interesado puede dejar su correo electrónico para recibir una notificación cuando las votaciones estén abiertas, asegurando que no se pierda el evento.

**Why this priority**: Ayuda a capturar audiencia y medir el interés previo al lanzamiento. No es crítico para el MVP pero aumenta la conversión.

**Independent Test**: Puede ser probado ingresando un email válido y verificando que se muestra un mensaje de confirmación (sin necesidad de envío real de correo en MVP).

**Acceptance Scenarios**:

1. **Given** un usuario ve el formulario de notificación, **When** ingresa un email válido, **Then** debe ver un mensaje de confirmación de registro exitoso
2. **Given** un usuario intenta registrarse, **When** ingresa un email inválido, **Then** debe ver un mensaje de error indicando el formato correcto
3. **Given** un usuario ya registró su email, **When** intenta registrarse nuevamente con el mismo email, **Then** debe ver un mensaje indicando que ya está registrado
4. **Given** el formulario está vacío, **When** el usuario intenta enviar sin llenar el email, **Then** debe ver un mensaje pidiendo completar el campo

---

### User Story 4 - Compartir en Redes Sociales (Priority: P3)

Un visitante emocionado puede compartir la landing page en sus redes sociales para invitar a otros a conocer sobre los Albion Awards.

**Why this priority**: Facilita la viralización orgánica, pero no es esencial para el funcionamiento del pre-lanzamiento.

**Independent Test**: Puede ser probado haciendo clic en los botones de redes sociales y verificando que se abre la ventana de compartir correcta.

**Acceptance Scenarios**:

1. **Given** un usuario ve los botones de redes sociales, **When** hace clic en compartir en Twitter/X, **Then** debe abrirse una ventana con el tweet pre-formateado
2. **Given** un usuario hace clic en compartir en Facebook, **When** la ventana se abre, **Then** debe incluir el enlace de la landing y una imagen de preview
3. **Given** un usuario está en móvil, **When** hace clic en compartir, **Then** debe abrirse la app nativa de la red social si está instalada

---

### Edge Cases

- ¿Qué pasa cuando la fecha objetivo de la cuenta regresiva ya pasó? → Mostrar mensaje "¡Las votaciones ya están abiertas!" con enlace al sistema de votación
- ¿Qué pasa si el usuario está en una zona horaria diferente a Bogotá? → La cuenta regresiva siempre se calcula en zona horaria de Bogotá (America/Bogota), pero se muestra correctamente ajustada al tiempo local del navegador
- ¿Qué pasa si el usuario desactiva JavaScript? → Mostrar mensaje básico estático con la fecha de lanzamiento en texto
- ¿Qué pasa si la fecha de lanzamiento necesita cambiar? → El administrador debe poder actualizar la fecha objetivo fácilmente (configuración en variable de entorno o archivo de config)
- ¿Qué pasa si el servidor de emails para notificaciones falla? → Mostrar mensaje genérico de confirmación y guardar emails en base de datos local para procesamiento posterior

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: La página DEBE mostrar una cuenta regresiva visual prominente en la parte superior que indique días, horas, minutos y segundos hasta el lanzamiento
- **FR-002**: La cuenta regresiva DEBE actualizarse automáticamente cada segundo sin recargar la página
- **FR-003**: La cuenta regresiva DEBE calcularse usando la zona horaria de Bogotá, Colombia (America/Bogota)
- **FR-004**: La página DEBE mostrar las 10 categorías de premiación de forma clara y legible
- **FR-005**: La página DEBE incluir un formulario para capturar emails de personas interesadas en recibir notificaciones
- **FR-006**: El formulario DEBE validar que el email ingresado tenga formato válido antes de aceptarlo
- **FR-007**: La página DEBE mostrar un mensaje de confirmación cuando un email se registre exitosamente
- **FR-008**: La página DEBE incluir botones para compartir en redes sociales (al menos Twitter/X y Facebook)
- **FR-009**: La página DEBE ser completamente responsive y funcionar en dispositivos móviles, tablets y desktop
- **FR-010**: La página DEBE cargar en menos de 3 segundos en conexiones 3G
- **FR-011**: Cuando la cuenta regresiva llegue a cero, la página DEBE mostrar un mensaje indicando que las votaciones están abiertas
- **FR-012**: La fecha objetivo de la cuenta regresiva DEBE ser configurable sin necesidad de modificar código
- **FR-013**: La página DEBE incluir una descripción del evento que indique: "Evento comunitario de premiación donde los jugadores y espectadores de Albion Online votan por los mejores streamers, creadores de contenido y momentos del año"
- **FR-014**: Los emails registrados DEBEN guardarse de forma persistente para uso posterior
- **FR-015**: La página DEBE funcionar correctamente en los navegadores Chrome, Firefox, Safari y Edge (últimas 2 versiones)
- **FR-016**: La página DEBE incluir en el footer un disclaimer que indique "Evento no oficial organizado por la comunidad" para aclarar que no es un evento oficial de Albion Online
- **FR-017**: La página DEBE incluir una sección "Sobre el Evento" que indique que está organizado por kuruogg (con enlace a https://www.twitch.tv/kuruogg) y andeveling (con enlace a https://andeveling.vercel.app/) para la comunidad de Albion Online

### Key Entities

- **Cuenta Regresiva**: Representa el tiempo restante hasta el lanzamiento. Atributos: fecha objetivo, zona horaria (Bogotá), estado (activa/expirada)
- **Registro de Email**: Representa el interés de un visitante. Atributos: dirección de email, fecha de registro, estado de notificación
- **Categoría**: Representa una categoría de premiación. Atributos: nombre, descripción breve, orden de visualización
- **Configuración de Lanzamiento**: Representa los parámetros del evento. Atributos: fecha de lanzamiento, zona horaria, mensaje cuando expire, estado del evento

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: La landing page carga completamente en menos de 3 segundos en conexiones 3G o superiores
- **SC-002**: La cuenta regresiva se actualiza visiblemente cada segundo sin errores ni saltos
- **SC-003**: Al menos 80% de los visitantes permanecen en la página más de 10 segundos (indicador de engagement)
- **SC-004**: Al menos 15% de los visitantes dejan su email para notificaciones (tasa de conversión)
- **SC-005**: La página tiene una tasa de rebote menor al 60% en los primeros 5 segundos
- **SC-006**: El 100% de los emails registrados cumplen con formato válido (validación efectiva)
- **SC-007**: La página es completamente funcional en dispositivos móviles con pantallas desde 320px de ancho
- **SC-008**: Los botones de compartir en redes sociales tienen una tasa de uso del 5% o superior
- **SC-009**: La cuenta regresiva muestra la hora correcta en zona horaria de Bogotá sin desviación superior a 1 segundo
- **SC-010**: El 90% de los usuarios encuentran las categorías de premiación sin necesidad de scroll adicional o búsqueda

## Assumptions *(optional)*

- Se asume que la fecha de lanzamiento del evento será al menos 7 días después del deployment de la landing
- Se asume que los emails registrados serán procesados manualmente o mediante un sistema de envío de correos masivos en una fase posterior
- Se asume que la landing tendrá tráfico moderado (menos de 10,000 visitantes concurrentes) por lo que una solución estática es suficiente
- Se asume que el público objetivo tiene acceso a dispositivos con navegadores modernos (últimas 2 versiones)
- Se asume que los visitantes entienden español (idioma por defecto de la landing)

## Scope Boundaries *(optional)*

### In Scope
- Landing page estática con cuenta regresiva
- Formulario de captura de emails
- Visualización de las 10 categorías
- Botones de compartir en redes sociales
- Responsive design para todos los dispositivos
- Cuenta regresiva en zona horaria de Bogotá

### Out of Scope
- Sistema de envío automático de emails de notificación (se implementará en fase posterior)
- Sistema de votación (es una feature separada: 001-streamer-voting)
- Panel de administración para modificar contenido de la landing
- Autenticación de usuarios
- Integración con plataformas de streaming (Twitch, YouTube)
- Analytics avanzados o tracking personalizado (se usará Google Analytics básico)
- Versiones en múltiples idiomas (solo español en MVP)
- Animaciones complejas o interacciones 3D

## Dependencies *(optional)*

- La landing page NO depende del sistema de votación completo (funciona independientemente)
- Se requiere definir la fecha exacta de lanzamiento antes del deployment
- Se requiere hosting configurado (Hostinger) para el deployment de archivos estáticos
- Se requiere base de datos MySQL para guardar emails registrados (puede ser la misma del sistema de votación)

## Open Questions *(optional)*

- ¿Cuál es la fecha exacta de lanzamiento de las votaciones? → Necesario para configurar la cuenta regresiva
- ¿Se requiere algún branding específico, logo o colores corporativos? → Asumir paleta de colores genérica si no se especifica
- ¿Se debe incluir enlaces a redes sociales oficiales de Albion Awards? → Asumir que sí, pero pueden dejarse como placeholders si aún no existen

## Notes *(optional)*

- Esta landing es temporal y será reemplazada por el sistema de votación completo cuando la cuenta regresiva expire
- La cuenta regresiva usa zona horaria de Bogotá (UTC-5) de forma fija, independiente de la ubicación del visitante
- La captura de emails debe cumplir con GDPR/normativas de privacidad básicas (incluir aviso de privacidad simple)
- Se recomienda usar la librería Tempo (como solicitó el usuario) para la gestión de fechas y zona horaria

