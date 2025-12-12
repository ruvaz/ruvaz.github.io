// ==================== //
// Blog Data
// ==================== //
const blogPosts = [
    {
        id: 1,
        title: "Introducción a JavaScript Moderno: ES6 y más allá",
        excerpt: "Descubre las características más importantes de JavaScript moderno, desde arrow functions hasta async/await, y cómo pueden mejorar tu código.",
        date: "2024-12-10",
        tags: ["javascript", "web"],
        image: null,
        content: `
            <h2>¿Qué es ES6?</h2>
            <p>ECMAScript 6 (ES6), también conocido como ECMAScript 2015, fue un gran salto en la evolución de JavaScript. Introdujo características que hacen el código más limpio, legible y mantenible.</p>
            
            <h3>Arrow Functions</h3>
            <p>Las arrow functions proporcionan una sintaxis más concisa para escribir funciones:</p>
            <pre><code>// Función tradicional
function suma(a, b) {
    return a + b;
}

// Arrow function
const suma = (a, b) => a + b;</code></pre>
            
            <h3>Template Literals</h3>
            <p>Permiten crear strings de manera más flexible:</p>
            <pre><code>const nombre = "RuVaz";
const saludo = \`Hola, \${nombre}! Bienvenido al blog.\`;</code></pre>
            
            <h3>Destructuring</h3>
            <p>Facilita la extracción de valores de arrays y objetos:</p>
            <pre><code>const usuario = { nombre: "RuVaz", edad: 25 };
const { nombre, edad } = usuario;</code></pre>
            
            <h3>Async/Await</h3>
            <p>Simplifica el trabajo con código asíncrono:</p>
            <pre><code>async function obtenerDatos() {
    try {
        const response = await fetch('https://api.ejemplo.com/datos');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
    }
}</code></pre>
            
            <h2>Conclusión</h2>
            <p>JavaScript moderno ofrece herramientas poderosas que mejoran significativamente la experiencia de desarrollo. Estas características no solo hacen el código más elegante, sino también más fácil de mantener y debuggear.</p>
        `
    },
    {
        id: 2,
        title: "Python para Data Science: Primeros Pasos",
        excerpt: "Una guía práctica para comenzar con Python en el mundo del análisis de datos, incluyendo pandas, numpy y visualización.",
        date: "2024-12-08",
        tags: ["python"],
        image: null,
        content: `
            <h2>¿Por qué Python para Data Science?</h2>
            <p>Python se ha convertido en el lenguaje preferido para ciencia de datos gracias a su simplicidad y el ecosistema de bibliotecas especializadas.</p>
            
            <h3>Bibliotecas Esenciales</h3>
            <ul>
                <li><strong>NumPy:</strong> Operaciones numéricas y arrays multidimensionales</li>
                <li><strong>Pandas:</strong> Manipulación y análisis de datos</li>
                <li><strong>Matplotlib/Seaborn:</strong> Visualización de datos</li>
                <li><strong>Scikit-learn:</strong> Machine Learning</li>
            </ul>
            
            <h3>Ejemplo con Pandas</h3>
            <pre><code>import pandas as pd

# Crear un DataFrame
datos = {
    'nombre': ['Ana', 'Luis', 'María'],
    'edad': [25, 30, 28],
    'ciudad': ['Madrid', 'Barcelona', 'Valencia']
}

df = pd.DataFrame(datos)
print(df.head())</code></pre>
            
            <h3>Visualización Básica</h3>
            <pre><code>import matplotlib.pyplot as plt

# Crear un gráfico simple
edades = [25, 30, 28, 35, 40]
plt.plot(edades)
plt.title('Distribución de Edades')
plt.xlabel('Índice')
plt.ylabel('Edad')
plt.show()</code></pre>
            
            <h2>Próximos Pasos</h2>
            <p>Una vez domines estas herramientas básicas, podrás explorar análisis más avanzados, machine learning y visualizaciones interactivas con bibliotecas como Plotly.</p>
        `
    },
    {
        id: 3,
        title: "Desarrollo Web Responsivo: Guía Completa",
        excerpt: "Aprende las mejores prácticas para crear sitios web que se vean perfectos en cualquier dispositivo, desde móviles hasta pantallas grandes.",
        date: "2024-12-05",
        tags: ["web", "javascript"],
        image: null,
        content: `
            <h2>¿Qué es el Diseño Responsivo?</h2>
            <p>El diseño responsivo es una técnica de desarrollo web que permite que los sitios se adapten automáticamente a diferentes tamaños de pantalla y dispositivos.</p>
            
            <h3>Mobile-First Approach</h3>
            <p>Comenzar diseñando para móviles y luego expandir a pantallas más grandes:</p>
            <pre><code>/* Estilos base para móvil */
.container {
    width: 100%;
    padding: 1rem;
}

/* Tablet */
@media (min-width: 768px) {
    .container {
        max-width: 720px;
        margin: 0 auto;
    }
}

/* Desktop */
@media (min-width: 1024px) {
    .container {
        max-width: 960px;
    }
}</code></pre>
            
            <h3>CSS Grid y Flexbox</h3>
            <p>Herramientas modernas para layouts responsivos:</p>
            <pre><code>/* Grid responsivo */
.grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1rem;
}

/* Flexbox */
.flex-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
}</code></pre>
            
            <h3>Imágenes Responsivas</h3>
            <pre><code>&lt;img 
    src="imagen-small.jpg"
    srcset="imagen-small.jpg 480w,
            imagen-medium.jpg 768w,
            imagen-large.jpg 1200w"
    sizes="(max-width: 768px) 100vw, 50vw"
    alt="Descripción"
/&gt;</code></pre>
            
            <h2>Mejores Prácticas</h2>
            <ul>
                <li>Usa unidades relativas (rem, em, %) en lugar de píxeles fijos</li>
                <li>Prueba en dispositivos reales, no solo en el navegador</li>
                <li>Optimiza las imágenes para diferentes resoluciones</li>
                <li>Considera la experiencia táctil en dispositivos móviles</li>
            </ul>
        `
    },
    {
        id: 4,
        title: "Git y GitHub: Control de Versiones Esencial",
        excerpt: "Domina Git y GitHub para gestionar tus proyectos de manera profesional y colaborar eficientemente con otros desarrolladores.",
        date: "2024-12-01",
        tags: ["devops"],
        image: null,
        content: `
            <h2>¿Por qué usar Git?</h2>
            <p>Git es el sistema de control de versiones más popular, permitiéndote rastrear cambios, colaborar con otros y mantener un historial completo de tu proyecto.</p>
            
            <h3>Comandos Básicos</h3>
            <pre><code># Inicializar un repositorio
git init

# Añadir archivos al staging
git add .

# Crear un commit
git commit -m "Descripción del cambio"

# Ver el estado
git status

# Ver el historial
git log --oneline</code></pre>
            
            <h3>Trabajando con Ramas</h3>
            <pre><code># Crear una nueva rama
git branch feature-nueva

# Cambiar a la rama
git checkout feature-nueva

# O crear y cambiar en un solo comando
git checkout -b feature-nueva

# Fusionar ramas
git checkout main
git merge feature-nueva</code></pre>
            
            <h3>GitHub Workflow</h3>
            <pre><code># Clonar un repositorio
git clone https://github.com/usuario/repo.git

# Añadir un remoto
git remote add origin https://github.com/usuario/repo.git

# Subir cambios
git push origin main

# Obtener cambios
git pull origin main</code></pre>
            
            <h3>Mejores Prácticas</h3>
            <ul>
                <li>Haz commits pequeños y frecuentes</li>
                <li>Escribe mensajes de commit descriptivos</li>
                <li>Usa ramas para nuevas características</li>
                <li>Revisa los cambios antes de hacer commit</li>
                <li>Mantén tu rama principal siempre funcional</li>
            </ul>
            
            <h2>GitHub Pages</h2>
            <p>GitHub Pages te permite alojar sitios web estáticos directamente desde tu repositorio, ¡como este blog!</p>
        `
    }
];

// ==================== //
// DOM Elements
// ==================== //
const blogGrid = document.getElementById('blog-grid');
const filterTags = document.querySelectorAll('.tag');
const articleCount = document.getElementById('article-count');

// ==================== //
// Functions
// ==================== //

// Render blog posts
function renderBlogPosts(posts) {
    blogGrid.innerHTML = '';
    
    posts.forEach(post => {
        const card = createBlogCard(post);
        blogGrid.appendChild(card);
    });
    
    // Update article count with animation
    animateCounter(articleCount, posts.length);
}

// Create blog card element
function createBlogCard(post) {
    const card = document.createElement('article');
    card.className = 'blog-card';
    card.dataset.tags = post.tags.join(',');
    
    const imageHtml = post.image 
        ? `<img src="${post.image}" alt="${post.title}" class="blog-card-image">`
        : '<div class="blog-card-image"></div>';
    
    const tagsHtml = post.tags
        .map(tag => `<span class="blog-card-tag">${tag}</span>`)
        .join('');
    
    card.innerHTML = `
        ${imageHtml}
        <div class="blog-card-content">
            <div class="blog-card-meta">
                ${tagsHtml}
                <span class="blog-card-date">${formatDate(post.date)}</span>
            </div>
            <h3 class="blog-card-title">${post.title}</h3>
            <p class="blog-card-excerpt">${post.excerpt}</p>
            <a href="article.html?id=${post.id}" class="blog-card-link">Leer más</a>
        </div>
    `;
    
    return card;
}

// Format date
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', options);
}

// Animate counter
function animateCounter(element, target) {
    let current = 0;
    const increment = target / 30;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 30);
}

// Filter posts by tag
function filterPosts(filterTag) {
    const cards = document.querySelectorAll('.blog-card');
    
    cards.forEach(card => {
        const cardTags = card.dataset.tags.split(',');
        
        if (filterTag === 'all' || cardTags.includes(filterTag)) {
            card.style.display = 'block';
            card.style.animation = 'fadeInUp 0.6s ease forwards';
        } else {
            card.style.display = 'none';
        }
    });
}

// ==================== //
// Event Listeners
// ==================== //

// Filter tags click
filterTags.forEach(tag => {
    tag.addEventListener('click', () => {
        // Remove active class from all tags
        filterTags.forEach(t => t.classList.remove('active'));
        
        // Add active class to clicked tag
        tag.classList.add('active');
        
        // Filter posts
        const filter = tag.dataset.filter;
        filterPosts(filter);
    });
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Header scroll effect
let lastScroll = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
    } else {
        header.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
});

// ==================== //
// Initialize
// ==================== //
document.addEventListener('DOMContentLoaded', () => {
    renderBlogPosts(blogPosts);
});

// ==================== //
// Export for article page
// ==================== //
if (typeof window !== 'undefined') {
    window.blogPosts = blogPosts;
}
