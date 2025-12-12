// ==================== //
// Admin Panel - Blog Manager (Versión Mejorada)
// ==================== //

const STORAGE_KEY = 'ruvaz_blog_posts';

// State
let posts = [];
let currentPostId = null;
let hasUnsavedChanges = false;

// ==================== //
// Initialize
// ==================== //
document.addEventListener('DOMContentLoaded', () => {
    loadPosts();
    renderPostsList();
    setupToolbar();
    setupEventListeners();
    updateUI();

    console.log('Admin Panel iniciado. Posts cargados:', posts.length);
});

// ==================== //
// DOM Elements
// ==================== //
function getElements() {
    return {
        postsList: document.getElementById('posts-list'),
        titleInput: document.getElementById('post-title'),
        dateInput: document.getElementById('post-date'),
        tagsInput: document.getElementById('post-tags'),
        excerptInput: document.getElementById('post-excerpt'),
        imageInput: document.getElementById('post-image'),
        imagePreview: document.getElementById('image-preview'),
        editorContent: document.getElementById('editor-content'),
        emptyState: document.getElementById('empty-state'),
        editorForm: document.getElementById('editor-form'),
        statusIndicator: document.getElementById('status-indicator'),
        statusText: document.getElementById('status-text')
    };
}

// ==================== //
// Storage Functions
// ==================== //
function loadPosts() {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);

        if (stored) {
            posts = JSON.parse(stored);
            console.log('Posts cargados desde localStorage:', posts.length);
        } else if (typeof blogPosts !== 'undefined' && Array.isArray(blogPosts) && blogPosts.length > 0) {
            // Auto-import from blog.js if no localStorage data exists
            posts = blogPosts.map(p => ({
                id: p.id,
                title: p.title || '',
                excerpt: p.excerpt || '',
                date: p.date || new Date().toISOString().split('T')[0],
                tags: Array.isArray(p.tags) ? p.tags : [],
                content: p.content || ''
            }));
            savePosts();
            console.log('Posts importados automáticamente desde blog.js:', posts.length);
            showToast(`✅ ${posts.length} artículos cargados desde blog.js`, 'success');
        } else {
            posts = [];
            console.log('No hay posts guardados, iniciando vacío');
        }
    } catch (error) {
        console.error('Error cargando posts:', error);
        posts = [];
    }
}

function savePosts() {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
        console.log('Posts guardados:', posts.length);
        return true;
    } catch (error) {
        console.error('Error guardando posts:', error);
        showToast('Error al guardar: ' + error.message, 'error');
        return false;
    }
}

// ==================== //
// UI Update Functions
// ==================== //
function updateUI() {
    const { emptyState, editorForm } = getElements();

    if (currentPostId === null) {
        // Show empty state
        emptyState.style.display = 'flex';
        editorForm.style.display = 'none';
    } else {
        // Show editor
        emptyState.style.display = 'none';
        editorForm.style.display = 'flex';
    }
}

function updateSaveStatus(saved) {
    const { statusIndicator, statusText } = getElements();

    if (saved) {
        statusIndicator.style.color = '#10b981';
        statusText.textContent = 'Guardado ✓';
        hasUnsavedChanges = false;
    } else {
        statusIndicator.style.color = '#f59e0b';
        statusText.textContent = 'Sin guardar';
        hasUnsavedChanges = true;
    }
}

// ==================== //
// Render Posts List
// ==================== //
function renderPostsList() {
    const { postsList } = getElements();
    postsList.innerHTML = '';

    if (posts.length === 0) {
        postsList.innerHTML = `
            <div class="no-posts">
                <p>No hay artículos todavía</p>
                <p class="hint">Haz clic en "Crear Nuevo Artículo" para empezar</p>
            </div>
        `;
        return;
    }

    // Sort by date (newest first)
    const sortedPosts = [...posts].sort((a, b) => new Date(b.date) - new Date(a.date));

    sortedPosts.forEach(post => {
        const item = document.createElement('div');
        item.className = `post-item${currentPostId === post.id ? ' active' : ''}`;
        item.dataset.id = post.id;

        const tagsHtml = (post.tags || []).slice(0, 2).map(tag =>
            `<span class="post-item-tag">${tag}</span>`
        ).join('');

        item.innerHTML = `
            <div class="post-item-header">
                <div class="post-item-title">${post.title || '(Sin título)'}</div>
                <button class="post-item-delete" data-id="${post.id}" title="Eliminar">✕</button>
            </div>
            <div class="post-item-meta">
                <span>${formatDate(post.date)}</span>
                ${tagsHtml}
            </div>
        `;

        // Click on item to edit
        item.addEventListener('click', (e) => {
            if (!e.target.classList.contains('post-item-delete')) {
                loadPost(post.id);
            }
        });

        // Delete button
        const deleteBtn = item.querySelector('.post-item-delete');
        deleteBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            deletePost(post.id);
        });

        postsList.appendChild(item);
    });
}

function formatDate(dateString) {
    if (!dateString) return 'Sin fecha';
    const date = new Date(dateString + 'T00:00:00');
    return date.toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' });
}

// ==================== //
// CRUD Operations
// ==================== //
function createNewPost() {
    console.log('Creando nuevo post...');

    const newId = posts.length > 0 ? Math.max(...posts.map(p => p.id)) + 1 : 1;
    const today = new Date().toISOString().split('T')[0];

    const newPost = {
        id: newId,
        title: 'Nuevo Artículo',
        excerpt: '',
        date: today,
        tags: [],
        image: null,
        content: '<h2>Título de sección</h2><p>Escribe tu contenido aquí...</p>'
    };

    posts.push(newPost);

    if (savePosts()) {
        currentPostId = newId;
        loadPostIntoEditor(newPost);
        renderPostsList();
        updateUI();
        showToast('✅ Artículo creado. ¡Empieza a escribir!', 'success');

        // Focus on title
        setTimeout(() => {
            const { titleInput } = getElements();
            titleInput.focus();
            titleInput.select();
        }, 100);
    }
}

function loadPost(id) {
    console.log('Cargando post:', id);

    const post = posts.find(p => p.id === id);
    if (!post) {
        console.error('Post no encontrado:', id);
        return;
    }

    currentPostId = id;
    loadPostIntoEditor(post);
    renderPostsList();
    updateUI();
    updateSaveStatus(true);
}

function loadPostIntoEditor(post) {
    const { titleInput, dateInput, tagsInput, excerptInput, imageInput, editorContent } = getElements();

    titleInput.value = post.title || '';
    dateInput.value = post.date || new Date().toISOString().split('T')[0];
    tagsInput.value = (post.tags || []).join(', ');
    excerptInput.value = post.excerpt || '';
    imageInput.value = post.image || '';
    editorContent.innerHTML = post.content || '';

    // Update image preview
    updateImagePreview(post.image);
}

function saveCurrentPost() {
    if (currentPostId === null) {
        showToast('⚠️ Primero selecciona o crea un artículo', 'error');
        return false;
    }

    const { titleInput, dateInput, tagsInput, excerptInput, imageInput, editorContent } = getElements();

    const postIndex = posts.findIndex(p => p.id === currentPostId);
    if (postIndex === -1) {
        console.error('Post no encontrado para guardar:', currentPostId);
        return false;
    }

    // Get image value and format it
    let imageValue = imageInput.value.trim();
    if (imageValue && !imageValue.startsWith('images/')) {
        imageValue = 'images/' + imageValue;
    }

    posts[postIndex] = {
        id: currentPostId,
        title: titleInput.value.trim() || 'Sin título',
        excerpt: excerptInput.value.trim(),
        date: dateInput.value,
        tags: tagsInput.value.split(',').map(t => t.trim().toLowerCase()).filter(t => t),
        image: imageValue || null,
        content: editorContent.innerHTML
    };

    if (savePosts()) {
        renderPostsList();
        updateSaveStatus(true);
        showToast('💾 Artículo guardado correctamente', 'success');
        return true;
    }

    return false;
}

async function deletePost(id) {
    const post = posts.find(p => p.id === id);
    const postTitle = post?.title || 'este artículo';

    const result = await Swal.fire({
        title: '¿Eliminar artículo?',
        html: `<p>Vas a eliminar: <strong>"${postTitle}"</strong></p><p style="color: #f87171;">Esta acción no se puede deshacer.</p>`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#ef4444',
        cancelButtonColor: '#6b7280',
        confirmButtonText: '🗑️ Sí, eliminar',
        cancelButtonText: 'Cancelar',
        background: '#131c31',
        color: '#fff'
    });

    if (!result.isConfirmed) return;

    posts = posts.filter(p => p.id !== id);
    savePosts();

    if (currentPostId === id) {
        currentPostId = null;
        clearEditor();
    }

    renderPostsList();
    updateUI();

    Swal.fire({
        title: '¡Eliminado!',
        text: 'El artículo ha sido eliminado.',
        icon: 'success',
        timer: 1500,
        showConfirmButton: false,
        background: '#131c31',
        color: '#fff'
    });
}

async function deleteCurrentPost() {
    if (currentPostId === null) {
        showToast('⚠️ No hay artículo seleccionado', 'error');
        return;
    }
    await deletePost(currentPostId);
}

async function clearAllPosts() {
    if (posts.length === 0) {
        showToast('No hay artículos para borrar', 'info');
        return;
    }

    const result = await Swal.fire({
        title: '⚠️ ¿Borrar TODO?',
        html: `<p>Vas a eliminar <strong>${posts.length} artículos</strong>.</p><p style="color: #f87171;">Esta acción NO se puede deshacer.</p>`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#ef4444',
        cancelButtonColor: '#6b7280',
        confirmButtonText: '🗑️ Sí, borrar todo',
        cancelButtonText: 'Cancelar',
        background: '#131c31',
        color: '#fff'
    });

    if (!result.isConfirmed) return;

    posts = [];
    currentPostId = null;
    savePosts();
    clearEditor();
    renderPostsList();
    updateUI();

    Swal.fire({
        title: '¡Listo!',
        text: 'Todos los artículos han sido eliminados.',
        icon: 'success',
        timer: 1500,
        showConfirmButton: false,
        background: '#131c31',
        color: '#fff'
    });
}

function clearEditor() {
    const { titleInput, dateInput, tagsInput, excerptInput, imageInput, editorContent } = getElements();

    titleInput.value = '';
    dateInput.value = new Date().toISOString().split('T')[0];
    tagsInput.value = '';
    excerptInput.value = '';
    imageInput.value = '';
    editorContent.innerHTML = '';
    updateImagePreview(null);
}

// ==================== //
// Image Preview
// ==================== //
function updateImagePreview(imagePath) {
    const { imagePreview } = getElements();

    if (imagePath) {
        // Clean path - remove 'images/' prefix if user enters full path
        let cleanPath = imagePath;
        if (!cleanPath.startsWith('images/')) {
            cleanPath = 'images/' + cleanPath;
        }

        imagePreview.innerHTML = `<img src="${cleanPath}" alt="Preview" onerror="this.parentElement.innerHTML='<span class=\\'preview-placeholder\\'>⚠️ Imagen no encontrada</span>'">`;
    } else {
        imagePreview.innerHTML = '<span class="preview-placeholder">Vista previa de imagen</span>';
    }
}

// ==================== //
// Toolbar & Formatting
// ==================== //
function setupToolbar() {
    document.querySelectorAll('.toolbar-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            executeCommand(btn.dataset.command);
        });
    });
}

function executeCommand(command) {
    const { editorContent } = getElements();
    editorContent.focus();

    switch (command) {
        case 'bold':
            document.execCommand('bold', false, null);
            break;
        case 'italic':
            document.execCommand('italic', false, null);
            break;
        case 'h2':
            document.execCommand('formatBlock', false, '<h2>');
            break;
        case 'h3':
            document.execCommand('formatBlock', false, '<h3>');
            break;
        case 'paragraph':
            document.execCommand('formatBlock', false, '<p>');
            break;
        case 'ul':
            document.execCommand('insertUnorderedList', false, null);
            break;
        case 'ol':
            document.execCommand('insertOrderedList', false, null);
            break;
        case 'code':
            wrapWithCode();
            break;
        case 'pre':
            insertCodeBlock();
            break;
    }

    updateSaveStatus(false);
}

function wrapWithCode() {
    const selection = window.getSelection();
    if (selection.rangeCount > 0 && selection.toString()) {
        const range = selection.getRangeAt(0);
        const code = document.createElement('code');
        code.textContent = selection.toString();
        range.deleteContents();
        range.insertNode(code);
    }
}

function insertCodeBlock() {
    const code = prompt('Pega tu código aquí:');
    if (code) {
        const { editorContent } = getElements();
        const pre = document.createElement('pre');
        const codeEl = document.createElement('code');
        codeEl.textContent = code;
        pre.appendChild(codeEl);

        const selection = window.getSelection();
        if (selection.rangeCount > 0) {
            const range = selection.getRangeAt(0);
            range.deleteContents();
            range.insertNode(pre);

            // Add paragraph after
            const p = document.createElement('p');
            p.innerHTML = '<br>';
            pre.parentNode.insertBefore(p, pre.nextSibling);
        } else {
            editorContent.appendChild(pre);
        }
    }
}

// ==================== //
// Export / Import
// ==================== //
function exportPosts(e) {
    if (e) e.stopPropagation();

    if (posts.length === 0) {
        showToast('No hay artículos para exportar', 'error');
        return;
    }

    const exportData = posts.map(post => ({
        id: post.id,
        title: post.title,
        excerpt: post.excerpt,
        date: post.date,
        tags: post.tags,
        image: null,
        content: post.content
    }));

    const jsCode = `const blogPosts = ${JSON.stringify(exportData, null, 4)};`;

    document.getElementById('export-code').value = jsCode;

    // Use setTimeout to ensure modal opens after event bubbling completes
    setTimeout(() => {
        document.getElementById('export-modal').classList.add('active');
    }, 10);
}

function importPosts(e) {
    if (e) e.stopPropagation();

    setTimeout(() => {
        document.getElementById('import-modal').classList.add('active');
    }, 10);
}

function doImport() {
    const importCode = document.getElementById('import-code').value.trim();

    if (!importCode) {
        showToast('Pega el código JSON primero', 'error');
        return;
    }

    try {
        let parsed;

        // Try to extract array
        if (importCode.startsWith('[')) {
            parsed = JSON.parse(importCode);
        } else if (importCode.includes('blogPosts')) {
            const match = importCode.match(/\[[\s\S]*\]/);
            if (match) {
                parsed = JSON.parse(match[0]);
            }
        } else {
            // Try parsing as-is
            parsed = JSON.parse(importCode);
        }

        if (!Array.isArray(parsed)) {
            throw new Error('El código debe ser un array de artículos');
        }

        posts = parsed.map((p, index) => ({
            id: p.id || index + 1,
            title: p.title || '',
            excerpt: p.excerpt || '',
            date: p.date || new Date().toISOString().split('T')[0],
            tags: Array.isArray(p.tags) ? p.tags : [],
            content: p.content || ''
        }));

        savePosts();
        currentPostId = null;
        renderPostsList();
        updateUI();
        closeAllModals();
        showToast(`✅ ${posts.length} artículos importados`, 'success');

    } catch (error) {
        console.error('Error importando:', error);
        showToast('❌ Error: ' + error.message, 'error');
    }
}

// ==================== //
// Preview
// ==================== //
function showPreview(e) {
    if (e) e.stopPropagation();

    const { titleInput, dateInput, tagsInput, editorContent } = getElements();

    const previewContainer = document.getElementById('preview-container');
    previewContainer.innerHTML = `
        <h1 style="font-size: 2rem; margin-bottom: 1rem;">${titleInput.value || 'Sin título'}</h1>
        <p style="color: var(--text-secondary); margin-bottom: 2rem;">
            <em>${formatDate(dateInput.value)} · ${tagsInput.value || 'Sin tags'}</em>
        </p>
        ${editorContent.innerHTML}
    `;

    setTimeout(() => {
        document.getElementById('preview-modal').classList.add('active');
    }, 10);
}

// ==================== //
// Utilities
// ==================== //
function closeAllModals() {
    document.querySelectorAll('.modal').forEach(modal => {
        modal.classList.remove('active');
    });
}

function showToast(message, type = 'info') {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;

    container.appendChild(toast);

    setTimeout(() => {
        toast.style.animation = 'slideIn 0.3s ease reverse';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

function copyExportCode() {
    const exportCode = document.getElementById('export-code');
    navigator.clipboard.writeText(exportCode.value).then(() => {
        showToast('📋 Código copiado al portapapeles', 'success');
    }).catch(() => {
        // Fallback
        exportCode.select();
        document.execCommand('copy');
        showToast('📋 Código copiado', 'success');
    });
}

// ==================== //
// Sync from blog.js
// ==================== //
async function syncFromBlogJs() {
    // Check if blogPosts exists
    if (typeof blogPosts === 'undefined' || !Array.isArray(blogPosts)) {
        Swal.fire({
            title: 'No se encontró blog.js',
            text: 'No se pudo encontrar el array blogPosts. Asegúrate de que blog.js esté cargado correctamente.',
            icon: 'error',
            background: '#131c31',
            color: '#fff'
        });
        return;
    }

    if (blogPosts.length === 0) {
        showToast('blog.js está vacío, no hay posts para cargar', 'info');
        return;
    }

    const result = await Swal.fire({
        title: '🔄 Recargar desde blog.js',
        html: `
            <p>Se encontraron <strong>${blogPosts.length} artículos</strong> en blog.js.</p>
            <p style="color: #f87171; margin-top: 10px;">⚠️ Esto reemplazará todos los artículos actuales del editor.</p>
        `,
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3b82f6',
        cancelButtonColor: '#6b7280',
        confirmButtonText: '🔄 Sí, recargar',
        cancelButtonText: 'Cancelar',
        background: '#131c31',
        color: '#fff'
    });

    if (!result.isConfirmed) return;

    // Import posts from blog.js
    posts = blogPosts.map(p => ({
        id: p.id,
        title: p.title || '',
        excerpt: p.excerpt || '',
        date: p.date || new Date().toISOString().split('T')[0],
        tags: Array.isArray(p.tags) ? p.tags : [],
        content: p.content || ''
    }));

    savePosts();
    currentPostId = null;
    clearEditor();
    renderPostsList();
    updateUI();

    Swal.fire({
        title: '✅ ¡Listo!',
        text: `${posts.length} artículos cargados desde blog.js`,
        icon: 'success',
        timer: 2000,
        showConfirmButton: false,
        background: '#131c31',
        color: '#fff'
    });
}

// ==================== //
// Event Listeners
// ==================== //
function setupEventListeners() {
    // New post buttons
    document.getElementById('new-post-btn').addEventListener('click', createNewPost);
    document.getElementById('empty-new-btn').addEventListener('click', createNewPost);

    // Save button
    document.getElementById('save-btn').addEventListener('click', saveCurrentPost);

    // Delete button
    document.getElementById('delete-btn').addEventListener('click', deleteCurrentPost);

    // Clear all button
    document.getElementById('clear-all-btn').addEventListener('click', clearAllPosts);

    // Preview
    document.getElementById('preview-btn').addEventListener('click', showPreview);

    // Export/Import/Sync
    document.getElementById('export-btn').addEventListener('click', exportPosts);
    document.getElementById('import-btn').addEventListener('click', importPosts);
    document.getElementById('sync-btn').addEventListener('click', syncFromBlogJs);
    document.getElementById('copy-export-btn').addEventListener('click', copyExportCode);
    document.getElementById('do-import-btn').addEventListener('click', doImport);

    // Modal closes
    document.getElementById('close-preview').addEventListener('click', closeAllModals);
    document.getElementById('close-export').addEventListener('click', closeAllModals);
    document.getElementById('close-import').addEventListener('click', closeAllModals);

    // Close modals on backdrop click - use mousedown instead of click
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('mousedown', (e) => {
            // Only close if clicking directly on the backdrop, not on content
            if (e.target === modal && e.target.classList.contains('modal')) {
                closeAllModals();
            }
        });
    });

    // Prevent modal content clicks from bubbling
    document.querySelectorAll('.modal-content').forEach(content => {
        content.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    });

    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key === 's') {
            e.preventDefault();
            saveCurrentPost();
        }
        if (e.key === 'Escape') {
            closeAllModals();
        }
    });

    // Mark as unsaved on any input
    const inputs = ['post-title', 'post-date', 'post-tags', 'post-excerpt', 'post-image'];
    inputs.forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            el.addEventListener('input', () => updateSaveStatus(false));
        }
    });

    // Image preview update on input
    const imageInput = document.getElementById('post-image');
    if (imageInput) {
        imageInput.addEventListener('input', () => {
            updateImagePreview(imageInput.value);
        });
    }

    const editorContent = document.getElementById('editor-content');
    if (editorContent) {
        editorContent.addEventListener('input', () => updateSaveStatus(false));
    }

    // Warn before leaving with unsaved changes
    window.addEventListener('beforeunload', (e) => {
        if (hasUnsavedChanges) {
            e.preventDefault();
            e.returnValue = '';
        }
    });
}
