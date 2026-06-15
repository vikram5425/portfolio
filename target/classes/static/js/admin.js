/* ==========================================
   Admin Panel - JavaScript (CRUD Operations)
   ========================================== */

const API_BASE = '';

// API endpoint mapping
const API_ENDPOINTS = {
    projects: '/api/projects',
    skills: '/api/skills',
    experience: '/api/experience',
    certificates: '/api/certificates',
    education: '/api/education',
    contacts: '/api/contacts',
    profile: '/api/profile'
};

// Field definitions for each entity
const ENTITY_FIELDS = {
    projects: ['title', 'description', 'techStack', 'features', 'imageUrl', 'liveUrl', 'githubUrl'],
    skills: ['name', 'category', 'proficiency', 'icon'],
    experience: ['title', 'company', 'duration', 'responsibilities', 'type'],
    certificates: ['title', 'issuer', 'date', 'credentialUrl', 'imageUrl'],
    education: ['degree', 'institution', 'cgpa', 'graduationYear', 'description']
};

// Table column definitions
const TABLE_COLUMNS = {
    projects: ['title', 'techStack'],
    skills: ['name', 'category', 'proficiency'],
    experience: ['title', 'company', 'duration'],
    certificates: ['title', 'issuer', 'date'],
    education: ['degree', 'institution', 'cgpa'],
    contacts: ['name', 'email', 'subject', 'message', 'createdAt']
};

// ==========================================
// DOM Ready
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    initTabs();
    loadAllData();
});

// ==========================================
// Tab Navigation
// ==========================================
function initTabs() {
    const tabs = document.querySelectorAll('.admin-tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active from all tabs and panels
            document.querySelectorAll('.admin-tab').forEach(t => t.classList.remove('active'));
            document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));

            // Activate clicked tab and its panel
            tab.classList.add('active');
            const panelId = `tab-${tab.dataset.tab}`;
            document.getElementById(panelId).classList.add('active');
        });
    });
}

// ==========================================
// Load All Data
// ==========================================
async function loadAllData() {
    const entities = ['projects', 'skills', 'experience', 'certificates', 'education', 'contacts'];
    for (const entity of entities) {
        await loadTableData(entity);
    }
    await loadProfile();
}

async function loadTableData(entity) {
    try {
        const response = await fetch(API_BASE + API_ENDPOINTS[entity]);
        const data = await response.json();
        renderTable(entity, data);
    } catch (error) {
        console.error(`Error loading ${entity}:`, error);
    }
}

// ==========================================
// Render Table
// ==========================================
function renderTable(entity, data) {
    const tbody = document.getElementById(`${entity}-table-body`);
    if (!tbody) return;

    if (!data || data.length === 0) {
        tbody.innerHTML = `<tr><td colspan="10" class="empty-state"><p>No ${entity} found. Add one to get started!</p></td></tr>`;
        return;
    }

    const columns = TABLE_COLUMNS[entity];

    tbody.innerHTML = data.map(item => {
        const cells = columns.map(col => {
            let value = item[col] || '';
            if (col === 'createdAt' && value) {
                value = new Date(value).toLocaleDateString();
            }
            if (typeof value === 'string' && value.length > 50) {
                value = value.substring(0, 50) + '...';
            }
            return `<td>${value}</td>`;
        }).join('');

        const actions = entity === 'contacts'
            ? `<td><div class="action-btns"><button class="btn-delete" onclick="deleteItem('${entity}', ${item.id})">Delete</button></div></td>`
            : `<td><div class="action-btns"><button class="btn-edit" onclick="editItem('${entity}', ${item.id})">Edit</button><button class="btn-delete" onclick="deleteItem('${entity}', ${item.id})">Delete</button></div></td>`;

        return `<tr>${cells}${actions}</tr>`;
    }).join('');
}

// ==========================================
// Show / Hide Form
// ==========================================
function showForm(entity) {
    const formContainer = document.getElementById(`form-${entity}`);
    if (formContainer) {
        formContainer.style.display = 'block';
        // Clear form
        clearForm(entity);
    }
}

function hideForm(entity) {
    const formContainer = document.getElementById(`form-${entity}`);
    if (formContainer) {
        formContainer.style.display = 'none';
        clearForm(entity);
    }
}

function clearForm(entity) {
    const fields = ENTITY_FIELDS[entity];
    if (!fields) return;

    document.getElementById(`${entity.slice(0, -1)}-id`).value = '';
    fields.forEach(field => {
        const el = document.getElementById(`${entity.slice(0, -1)}-${field}`);
        if (el) el.value = '';
    });
}

// Helper to get singular form of entity name for form field IDs
function getSingular(entity) {
    const singulars = {
        projects: 'project',
        skills: 'skill',
        experience: 'experience',
        certificates: 'certificate',
        education: 'education',
        contacts: 'contact'
    };
    return singulars[entity] || entity;
}

// ==========================================
// Save Item (Create / Update)
// ==========================================
async function saveItem(event, entity) {
    event.preventDefault();

    const singular = getSingular(entity);
    const idEl = document.getElementById(`${singular}-id`);
    const id = idEl ? idEl.value : '';
    const fields = ENTITY_FIELDS[entity];
    const data = {};

    fields.forEach(field => {
        const el = document.getElementById(`${singular}-${field}`);
        if (el) {
            let value = el.value;
            if (field === 'proficiency') value = parseInt(value) || 0;
            data[field] = value;
        }
    });

    try {
        const url = id
            ? `${API_BASE}${API_ENDPOINTS[entity]}/${id}`
            : `${API_BASE}${API_ENDPOINTS[entity]}`;

        const response = await fetch(url, {
            method: id ? 'PUT' : 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            showToast(`${singular} ${id ? 'updated' : 'created'} successfully!`, 'success');
            hideForm(entity);
            await loadTableData(entity);
        } else {
            showToast(`Failed to save ${singular}. Please try again.`, 'error');
        }
    } catch (error) {
        showToast(`Error saving ${singular}: ${error.message}`, 'error');
    }
}

// ==========================================
// Edit Item
// ==========================================
async function editItem(entity, id) {
    try {
        const response = await fetch(`${API_BASE}${API_ENDPOINTS[entity]}/${id}`);
        const item = await response.json();
        const singular = getSingular(entity);
        const fields = ENTITY_FIELDS[entity];

        // Show form and populate fields
        showForm(entity);
        document.getElementById(`${singular}-id`).value = item.id;

        fields.forEach(field => {
            const el = document.getElementById(`${singular}-${field}`);
            if (el && item[field] !== undefined && item[field] !== null) {
                el.value = item[field];
            }
        });
    } catch (error) {
        showToast('Error loading item for editing.', 'error');
    }
}

// ==========================================
// Delete Item
// ==========================================
async function deleteItem(entity, id) {
    if (!confirm(`Are you sure you want to delete this ${getSingular(entity)}?`)) return;

    try {
        const response = await fetch(`${API_BASE}${API_ENDPOINTS[entity]}/${id}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            showToast(`${getSingular(entity)} deleted successfully!`, 'success');
            await loadTableData(entity);
        } else {
            showToast('Failed to delete. Please try again.', 'error');
        }
    } catch (error) {
        showToast('Error deleting item.', 'error');
    }
}

// ==========================================
// Profile (Special - Update Only)
// ==========================================
async function loadProfile() {
    try {
        const response = await fetch(API_BASE + '/api/profile');
        if (!response.ok) return;
        const profile = await response.json();

        document.getElementById('profile-id').value = profile.id || '';
        document.getElementById('profile-name').value = profile.name || '';
        document.getElementById('profile-title').value = profile.title || '';
        document.getElementById('profile-bio').value = profile.bio || '';
        document.getElementById('profile-email').value = profile.email || '';
        document.getElementById('profile-phone').value = profile.phone || '';
        document.getElementById('profile-github').value = profile.github || '';
        document.getElementById('profile-linkedin').value = profile.linkedin || '';
        document.getElementById('profile-resumeUrl').value = profile.resumeUrl || '';
    } catch (error) {
        console.error('Error loading profile:', error);
    }
}

async function saveProfile(event) {
    event.preventDefault();

    const id = document.getElementById('profile-id').value;
    const data = {
        name: document.getElementById('profile-name').value,
        title: document.getElementById('profile-title').value,
        bio: document.getElementById('profile-bio').value,
        email: document.getElementById('profile-email').value,
        phone: document.getElementById('profile-phone').value,
        github: document.getElementById('profile-github').value,
        linkedin: document.getElementById('profile-linkedin').value,
        resumeUrl: document.getElementById('profile-resumeUrl').value
    };

    try {
        const response = await fetch(`${API_BASE}/api/profile/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            showToast('Profile updated successfully!', 'success');
        } else {
            showToast('Failed to update profile.', 'error');
        }
    } catch (error) {
        showToast('Error updating profile.', 'error');
    }
}

// ==========================================
// Toast Notification
// ==========================================
function showToast(message, type = 'success') {
    const container = document.getElementById('toastContainer');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    container.appendChild(toast);

    setTimeout(() => { toast.remove(); }, 3000);
}
