# SuelosAR

Sitio web oficial de **SuelosAR**, una aplicación Android para descubrir y comprender los suelos de Argentina.

## Requisitos

- Node.js 22.13 o superior
- npm 10 o superior
- Visual Studio Code (recomendado)

## Ejecutar localmente

1. Descomprimí el proyecto.
2. Abrí la carpeta del proyecto en Visual Studio Code.
3. Abrí una terminal integrada (`Terminal > New Terminal`).
4. Instalá las dependencias:

   ```bash
   npm install
   ```

5. Iniciá el entorno de desarrollo:

   ```bash
   npm run dev
   ```

6. Abrí la dirección local que aparezca en la terminal, normalmente `http://localhost:3000`.

## Comandos disponibles

```bash
npm run dev      # Servidor local con recarga automática
npm run build    # Compilación de producción
npm run start    # Ejecutar la compilación de producción
npm run lint     # Análisis estático del código
npm test         # Compilación y prueba básica del HTML generado
```

## Estructura principal

```text
app/          Rutas, layout, metadatos y estilos globales
components/   Componentes reutilizables de interfaz
lib/          Configuración y utilidades compartidas
public/       Recursos estáticos
styles/       Tokens de color y tipografía
```

La página implementada incluye el encabezado, hero mínimo, pie de página, modo claro/oscuro, animaciones y metadatos SEO. La arquitectura queda preparada para agregar nuevas secciones sin incluir contenido provisional.
