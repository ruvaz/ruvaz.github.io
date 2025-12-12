// ==================== //
// Article Page Logic
// ==================== //

// Get article ID from URL
function getArticleIdFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return parseInt(urlParams.get('id'));
}

// Format date
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', options);
}

// Get base URL
function getBaseURL() {
    return window.location.origin + window.location.pathname.replace('article.html', '');
}

// Update SEO meta tags
function updateSEO(article) {
    const baseURL = getBaseURL();
    const articleURL = `${baseURL}article.html?id=${article.id}`;
    const imageURL = article.image ? `${baseURL}${article.image}` : '';

    // Page title
    const pageTitle = document.getElementById('page-title');
    if (pageTitle) pageTitle.textContent = `${article.title} - RuVaz Tech Blog`;

    // Meta description
    const metaDesc = document.getElementById('meta-description');
    if (metaDesc) metaDesc.setAttribute('content', article.excerpt || '');

    // Meta keywords
    const metaKeywords = document.getElementById('meta-keywords');
    if (metaKeywords) metaKeywords.setAttribute('content', article.tags.join(', '));

    // Canonical URL
    const canonical = document.getElementById('canonical-url');
    if (canonical) canonical.setAttribute('href', articleURL);

    // Open Graph
    const ogURL = document.getElementById('og-url');
    if (ogURL) ogURL.setAttribute('content', articleURL);

    const ogTitle = document.getElementById('og-title');
    if (ogTitle) ogTitle.setAttribute('content', article.title);

    const ogDesc = document.getElementById('og-description');
    if (ogDesc) ogDesc.setAttribute('content', article.excerpt || '');

    const ogImage = document.getElementById('og-image');
    if (ogImage && imageURL) ogImage.setAttribute('content', imageURL);

    // Twitter Card
    const twitterTitle = document.getElementById('twitter-title');
    if (twitterTitle) twitterTitle.setAttribute('content', article.title);

    const twitterDesc = document.getElementById('twitter-description');
    if (twitterDesc) twitterDesc.setAttribute('content', article.excerpt || '');

    const twitterImage = document.getElementById('twitter-image');
    if (twitterImage && imageURL) twitterImage.setAttribute('content', imageURL);

    // JSON-LD Structured Data
    const schemaScript = document.getElementById('article-schema');
    if (schemaScript) {
        const schema = {
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "headline": article.title,
            "description": article.excerpt || '',
            "image": imageURL || '',
            "author": {
                "@type": "Person",
                "name": "RuVaz"
            },
            "publisher": {
                "@type": "Organization",
                "name": "RuVaz Tech Blog"
            },
            "datePublished": article.date,
            "dateModified": article.date,
            "url": articleURL,
            "keywords": article.tags.join(', ')
        };
        schemaScript.textContent = JSON.stringify(schema, null, 2);
    }
}

// Render article
function renderArticle(article) {
    if (!article) {
        document.getElementById('article-title').textContent = 'Artículo no encontrado';
        document.getElementById('article-content').innerHTML = '<p>Lo sentimos, el artículo que buscas no existe.</p>';
        return;
    }

    // Update page title (legacy support)
    document.title = `${article.title} - RuVaz Tech Blog`;

    // Update SEO meta tags
    updateSEO(article);

    // Show article image if available
    const imageContainer = document.getElementById('article-image-container');
    const articleImage = document.getElementById('article-image');

    if (article.image && imageContainer && articleImage) {
        articleImage.src = article.image;
        articleImage.alt = article.title;
        imageContainer.style.display = 'block';
    }

    // Render meta information
    const metaHtml = `
        ${article.tags.map(tag => `<span class="blog-card-tag">${tag}</span>`).join('')}
        <span class="blog-card-date">${formatDate(article.date)}</span>
    `;
    document.getElementById('article-meta').innerHTML = metaHtml;

    // Render title
    document.getElementById('article-title').textContent = article.title;

    // Render content
    document.getElementById('article-content').innerHTML = article.content;
}

// Render related articles
function renderRelatedArticles(currentArticle, allArticles) {
    const relatedContainer = document.getElementById('related-articles');

    // Find articles with similar tags
    const related = allArticles
        .filter(article => {
            // Exclude current article
            if (article.id === currentArticle.id) return false;

            // Check if has common tags
            return article.tags.some(tag => currentArticle.tags.includes(tag));
        })
        .slice(0, 3); // Limit to 3 articles

    if (related.length === 0) {
        relatedContainer.innerHTML = '<p style="color: var(--text-secondary); font-size: 0.9rem;">No hay artículos relacionados disponibles.</p>';
        return;
    }

    const relatedHtml = related.map(article => `
        <a href="article.html?id=${article.id}" class="related-article" style="text-decoration: none;">
            <div class="related-article-title">${article.title}</div>
            <div class="related-article-date">${formatDate(article.date)}</div>
        </a>
    `).join('');

    relatedContainer.innerHTML = relatedHtml;
}

// Initialize article page
document.addEventListener('DOMContentLoaded', () => {
    const articleId = getArticleIdFromURL();

    // Get blog posts from blog.js
    const allArticles = window.blogPosts || [];

    // Find the specific article
    const article = allArticles.find(post => post.id === articleId);

    // Render article and related content
    renderArticle(article);

    if (article) {
        renderRelatedArticles(article, allArticles);
    }
});
