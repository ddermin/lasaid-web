# LASAID — Sitio Web Institucional (V2)

Sitio web académico del **Laboratorio de Adquisición de Señales y Análisis Inteligente de Datos (LASAID)**, adscrito al **Centro Universitario de Ciencias Exactas e Ingenierías (CUCEI)** de la **Universidad de Guadalajara**.

## Descripción breve

Esta versión V2 implementa la arquitectura de información, páginas estáticas, rutas dinámicas y relaciones de datos entre investigadores, estudiantes (con soporte para múltiples etapas académicas sin duplicar registros), trabajos dirigidos (tesis y proyectos modulares), proyectos de investigación, desarrollo de software, publicaciones destacadas y actividades del laboratorio.

## Tecnologías principales

- **Framework:** [Astro](https://astro.build/) (Generación de Sitios Estáticos — SSG)
- **Esquemas y validación de datos:** Astro Content Collections + Zod (`src/content.config.ts`)
- **Estilos:** CSS propio modular y responsive (sin dependencias externas de UI)
- **Lenguajes:** TypeScript, HTML, CSS y JavaScript nativo ligero (para filtros interactivos y menú móvil)
- **Servidor web local:** Nginx

## Requisitos

- **Node.js:** v18.17.1 o superior (recomendado v20 LTS o superior)
- **npm:** v9 o superior
- **Nginx:** Instalado en entorno local (Linux / WSL o Windows) para servir la compilación estática

## Instalación

Clonar el repositorio e instalar las dependencias desde la raíz del proyecto:

```bash
npm install
```

## Ejecución en desarrollo

Para iniciar el servidor local de desarrollo con recarga en vivo:

```bash
npm run dev
```

## Build (Compilación estática)

Para validar los esquemas de las colecciones y generar la versión estática de producción en el directorio `dist/`:

```bash
npm run build
```

## Preview

Para previsualizar localmente el contenido compilado mediante Astro antes de pasarlo a Nginx:

```bash
npm run preview
```

## Estructura general del proyecto

```text
lasaid-web/
├── public/
│   └── images/
│       ├── people/        # Fotografías y avatares locales
│       ├── software/      # Imágenes de sistemas de software
│       ├── projects/      # Imágenes de proyectos
│       └── activities/    # Imágenes de actividades
├── src/
│   ├── components/        # 14 componentes reutilizables (tarjetas, navegación, placeholders)
│   ├── content/           # 7 Content Collections en formato Markdown (.md)
│   ├── data/
│   │   └── institutional.ts # Fuente única de líneas de investigación, dirección y URL base
│   ├── layouts/           # BaseLayout.astro y ContentLayout.astro
│   ├── pages/             # Rutas principales y rutas dinámicas [slug].astro
│   └── content.config.ts  # Definición y validación de esquemas con Zod
├── astro.config.mjs
├── package.json
└── tsconfig.json
```

## Content Collections utilizadas

El modelo de datos reside en `src/content/` y se divide en 7 colecciones validadas:

1. `researchers`: Perfiles de los investigadores titulares de LASAID.
2. `students`: Registro único por persona (sin duplicar estudiantes que cursaron más de un nivel académico).
3. `academic-works`: Unifica **tesis** (`thesis`) y **proyectos modulares** (`modular-project`) de licenciatura, maestría y doctorado.
4. `projects`: Proyectos y agrupaciones de investigación; incluye el atributo booleano `featured` para determinar cuáles se muestran en la página de Inicio.
5. `software`: Sistemas y plataformas tecnológicas desarrolladas en el laboratorio (preparado para incorporar nuevos sistemas como `SICAM`).
6. `publications`: Publicaciones científicas recientes; aquellas con `featured: true` se muestran como destacadas.
7. `activities`: Registro de eventos, congresos, divulgación y formación.

## Cómo agregar o actualizar contenido

- **Agregar un trabajo académico, proyecto, software, publicación o actividad:** Crear un nuevo archivo `.md` dentro de la carpeta correspondiente en `src/content/<coleccion>/` respetando los campos definidos en `src/content.config.ts`.
- **Actualizar líneas de investigación, dirección física o URL base para `<link rel="canonical">`:** Editar el archivo centralizado `src/data/institutional.ts`. Los cambios se reflejarán automáticamente en Inicio, Investigación, Contacto, Footer y cabeceras SEO.
- **Destacar proyectos en la portada:** Cambiar `featured: true` o `featured: false` en el frontmatter de los archivos dentro de `src/content/projects/`.

## Cómo funcionan los placeholders

Cuando un dato aún no está disponible, se registra en el archivo Markdown o configuración con la cadena `"PENDIENTE"` (por ejemplo, `title: "PENDIENTE"` o `repository: "PENDIENTE"`).

Los componentes detectan automáticamente este marcador y delegan su renderizado al componente central `src/components/Placeholder.astro`, el cual muestra una etiqueta visual discreta (`Información pendiente`) que permite identificar qué campos faltan por actualizar sin romper el diseño ni mostrar errores. Cuando el dato real se captura en el archivo `.md`, el placeholder desaparece automáticamente al compilar.

## Cómo generar el sitio para Nginx

1. Ejecutar la compilación estática:
   ```bash
   npm run build
   ```
2. Copiar el contenido generado dentro de `dist/` al directorio raíz configurado en Nginx (por ejemplo, `/var/www/lasaid-web`):
   ```bash
   sudo mkdir -p /var/www/lasaid-web
   sudo rm -rf /var/www/lasaid-web/*
   sudo cp -r dist/* /var/www/lasaid-web/
   ```
3. Validar la configuración de Nginx y recargar el servicio:
   ```bash
   sudo nginx -t
   sudo service nginx reload
   ```
4. Acceder desde el navegador a `http://localhost`.

## Alcance de la Versión 2 (V2)

Esta versión V2 está diseñada exclusivamente para validación arquitectónica, de contenido y funcionamiento local mediante **Nginx (`localhost`)**. **El despliegue en el servidor institucional, la configuración de DNS, certificados HTTPS/Certbot y servicios en producción no forman parte del alcance de la V2.**
