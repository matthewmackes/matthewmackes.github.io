// Site.js - Dynamic content loading for Matthew Mackes Blog
// Handles loading and displaying GitHub repository updates

document.addEventListener('DOMContentLoaded', function() {
    loadRepoUpdates();
});

/**
 * Load and display repository updates from the data file
 */
async function loadRepoUpdates() {
    const container = document.getElementById('updates-container');
    const lastUpdateElement = document.getElementById('last-update-time');
    
    try {
        const response = await fetch('data/repo-updates.json');
        
        if (!response.ok) {
            throw new Error('Failed to fetch updates');
        }
        
        const data = await response.json();
        
        // Update last check time
        if (data.last_updated) {
            const lastUpdate = new Date(data.last_updated);
            lastUpdateElement.textContent = formatRelativeTime(lastUpdate);
        }
        
        // Display updates
        if (data.updates && data.updates.length > 0) {
            container.innerHTML = data.updates.map(update => createUpdateCard(update)).join('');
        } else {
            container.innerHTML = `
                <div class="loading-state">
                    <p>No recent updates found.</p>
                </div>
            `;
        }
    } catch (error) {
        console.error('Error loading updates:', error);
        container.innerHTML = `
            <div class="loading-state">
                <p>Unable to load updates. Please check back later.</p>
            </div>
        `;
        lastUpdateElement.textContent = 'Error loading data';
    }
}

/**
 * Create HTML for a single update card
 */
function createUpdateCard(update) {
    const date = new Date(update.timestamp);
    const typeIcon = getTypeIcon(update.type);
    const typeColor = getTypeColor(update.type);
    
    return `
        <div class="update-item">
            <div class="update-header">
                <span class="update-type" style="background-color: ${typeColor};">
                    <span class="material-icons" style="font-size: 14px;">${typeIcon}</span>
                    ${update.type}
                </span>
                <span class="update-time">${formatRelativeTime(date)}</span>
            </div>
            <div class="update-message">${escapeHtml(update.message)}</div>
            ${update.author ? `<div class="update-author">by ${escapeHtml(update.author)}</div>` : ''}
            ${update.sha ? `<div class="caption">Commit: <code>${update.sha.substring(0, 7)}</code></div>` : ''}
        </div>
    `;
}

/**
 * Get Material icon for update type
 */
function getTypeIcon(type) {
    const icons = {
        'commit': 'commit',
        'push': 'upload',
        'release': 'new_releases',
        'issue': 'bug_report',
        'pr': 'merge',
        'star': 'star',
        'fork': 'call_split',
        'default': 'update'
    };
    
    return icons[type.toLowerCase()] || icons['default'];
}

/**
 * Get color for update type
 */
function getTypeColor(type) {
    const colors = {
        'commit': '#E3F2FD',
        'push': '#E1F5FE',
        'release': '#E8F5E9',
        'issue': '#FFF3E0',
        'pr': '#F3E5F5',
        'star': '#FFF9C4',
        'fork': '#E0F2F1',
        'default': '#BBDEFB'
    };
    
    return colors[type.toLowerCase()] || colors['default'];
}

/**
 * Format timestamp as relative time (e.g., "2 hours ago")
 */
function formatRelativeTime(date) {
    const now = new Date();
    const diffMs = now - date;
    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHour = Math.floor(diffMin / 60);
    const diffDay = Math.floor(diffHour / 24);
    
    if (diffSec < 60) {
        return 'just now';
    } else if (diffMin < 60) {
        return `${diffMin} minute${diffMin !== 1 ? 's' : ''} ago`;
    } else if (diffHour < 24) {
        return `${diffHour} hour${diffHour !== 1 ? 's' : ''} ago`;
    } else if (diffDay < 7) {
        return `${diffDay} day${diffDay !== 1 ? 's' : ''} ago`;
    } else {
        return date.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric' 
        });
    }
}

/**
 * Escape HTML to prevent XSS
 */
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

/**
 * Refresh updates (can be called manually or on a timer)
 */
function refreshUpdates() {
    loadRepoUpdates();
}

// Optional: Auto-refresh every 5 minutes when page is active
let refreshInterval = setInterval(refreshUpdates, 5 * 60 * 1000);

// Stop auto-refresh when page is hidden
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        clearInterval(refreshInterval);
    } else {
        refreshInterval = setInterval(refreshUpdates, 5 * 60 * 1000);
        refreshUpdates(); // Refresh immediately when page becomes visible
    }
});
