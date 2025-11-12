# Documento de Requerimientos del Producto (PRD)

## 1. Resumen Ejecutivo

Esta aplicación web permite a los usuarios votar por su streamer favorito en distintas categorías. Cada categoría tiene tres streamers postulados, y los usuarios pueden emitir un voto por categoría. El objetivo es ofrecer una plataforma transparente, fácil de usar y segura para destacar a los mejores streamers en cada área, fomentando la participación de la comunidad y la visibilidad de los creadores de contenido.

Público objetivo: espectadores de streaming, streamers nominados y organizadores de eventos.
Valor: Promueve la interacción, el reconocimiento y la transparencia en la premiación de streamers.

---

## 2. Objetivo del Proyecto

- Resolver la falta de una plataforma centralizada y confiable para premiar streamers por categorías.
- Facilitar la participación de la audiencia en la selección de ganadores.
- Esperar resultados claros, auditables y accesibles para todos los participantes.

---

## 3. Público Objetivo

- Espectadores de plataformas de streaming (Twitch, YouTube, etc.)
- Streamers nominados en cada categoría
- Organizadores de eventos y premiaciones

---

## 4. Funcionalidades Principales

- Visualización de categorías y los 3 nominados por cada una
- Votación por streamer favorito en cada categoría (un voto por usuario y categoría)
- Visualización de resultados (en tiempo real o al cierre de votaciones)
- Panel de administración para definir categorías y nominados
- Seguridad: prevención de votos duplicados y fraudulentos

---

## 5. Reglas de Negocio

- Cada usuario puede votar una vez por categoría
- Solo 3 nominados por categoría
- Las categorías y nominados son definidos por el administrador
- El periodo de votación está limitado por fechas
- Los resultados pueden ser públicos o privados según configuración

---

## 6. Categorías y Criterios de Votación

- Categorías:
  - Streamer del año
  - Youtuber del año
  - Streamer revelación
  - Rey de las nieblas
  - Mejor trayectoria
  - Mejor video tutorial
  - Mejor clip del año
  - Mejor kill del año
  - Blooper del año
  - Enfado del año

- Criterios: popularidad, impacto, calidad de contenido

---

## 7. Requisitos Técnicos y Restricciones

- SPA 100% estática (React + Vite)
- Backend PHP (API REST)
- Hosting en Hostinger (solo archivos estáticos y PHP)
- Sin SSR ni Node.js en producción
- Uso de Tailwind CSS para estilos
- Base de datos: MySQL (Hostinger)

---

## 8. Flujo de Usuario y Escenarios Clave

- El usuario accede a la app y ve las categorías
- Selecciona una categoría y visualiza los 3 nominados
- Vota por su favorito (solo una vez por categoría)
- Recibe confirmación de voto
- Puede ver resultados si están habilitados

---

## 9. Métricas de Éxito

- Número de votos por categoría
- Participación de usuarios
- Tiempo de carga y rendimiento
- Seguridad (prevención de votos duplicados/fraudulentos)

---

## 10. Roadmap Inicial

- Fase 1: MVP con votación básica y visualización de resultados
- Fase 2: Panel de administración y gestión de categorías
- Fase 3: Mejoras de seguridad y experiencia de usuario

---

## 11. Anexos

- Mockups o wireframes
- Referencias de proyectos similares
- Documentos legales o de privacidad

---

## 12. Seguridad y Control de Votos

Para asegurar que la votación sea justa y evitar trampas:
- Cada persona solo podrá votar una vez por categoría.
- Se pedirá iniciar sesión con Google para identificar a cada usuario de forma sencilla y segura.
- Si alguien intenta votar más de una vez en la misma categoría, el sistema no lo permitirá.
- Se usará un sistema para evitar robots y votos automáticos.
- Todos los votos quedarán registrados para poder revisar y garantizar transparencia.
