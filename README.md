# 💍 noscasamos.uy

> Plataforma MVP de bodas para Uruguay — inspirada en Bodas.net

## ¿Qué es?

**noscasamos.uy** es un MVP (Producto Mínimo Viable) de una plataforma web para parejas que planifican su boda en Uruguay. Permite explorar proveedores, espacios de celebración y herramientas de planificación nupcial, todo localizado para el mercado uruguayo.

## ¿Cómo está construido?

| Tecnología | Uso |
|---|---|
| **React 19** | Framework UI principal |
| **TypeScript** | Tipado estático |
| **Vite 5** | Bundler y servidor de desarrollo |
| **React Router v7** | Navegación entre páginas |
| **lucide-react** | Librería de íconos |
| **CSS Vanilla** | Estilos personalizados sin frameworks |
| **Netlify** | Hosting y deploy automático |

### Estructura del proyecto

```
src/
├── components/     # Navbar, Footer, íconos
├── pages/          # Home, Directorio, Detalle de proveedor
├── data/           # Fuentes de datos (estáticas por ahora)
├── domain/         # Entidades y casos de uso (arquitectura limpia)
└── presentation/   # Contextos y hooks
```

## Estado actual del MVP

- ✅ Landing page con buscador de categorías y departamentos de Uruguay
- ✅ Sección de planificación con tarjetas
- ✅ Navbar responsive con dropdowns
- ✅ Footer informativo
- ✅ Rutas: Home / Directorio / Detalle de proveedor
- ✅ Deploy en Netlify con CI/CD via GitHub

## Finalidad

Validar la demanda del mercado nupcial uruguayo con una interfaz atractiva y funcional, antes de invertir en backend, base de datos y perfil de proveedores reales.

## 🚀 Hoja de ruta — Hacia dónde escalaremos

### Fase 2 — Backend y proveedores reales
- [ ] Base de datos de proveedores reales (Supabase / PostgreSQL)
- [ ] Sistema de registro y perfil de proveedor
- [ ] Búsqueda y filtros avanzados por categoría, precio y zona
- [ ] Galería de fotos por proveedor

### Fase 3 — Monetización
- [ ] Plan premium para proveedores (destacados, analytics)
- [ ] Sistema de contacto y solicitud de presupuesto
- [ ] Reseñas y valoraciones verificadas

### Fase 4 — Herramientas para parejas
- [ ] Planificador de bodas (checklist, presupuesto, lista de invitados)
- [ ] Web de boda personalizada para compartir con invitados
- [ ] Organizador de mesas

### Fase 5 — Expansión regional
- [ ] Adaptación para Argentina, Chile y Paraguay
- [ ] App móvil (React Native)

---

## Desarrollo local

```bash
npm install
npm run dev       # Servidor de desarrollo en localhost:5173
npm run build     # Build de producción en /dist
```

## Deploy

El proyecto se despliega automáticamente en **Netlify** al hacer `git push` a la rama `main`.

```bash
git add .
git commit -m "descripción del cambio"
git push
```
