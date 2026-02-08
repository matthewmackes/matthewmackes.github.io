# 📁 Complete File Manifest

## Overview

Here's every file in your AI-powered Jekyll blog setup and what it does.

---

## 📚 Documentation Files

### Quick Reference
| File | Purpose | When to Read |
|------|---------|--------------|
| [QUICKSTART.md](QUICKSTART.md) | 5-minute setup guide | First time setup |
| [SETUP.md](SETUP.md) | Full setup & customization | Detailed instructions |
| [AI_UPDATE_DOCS.md](AI_UPDATE_DOCS.md) | AI system deep dive | Understanding how AI works |
| [ARCHITECTURE.md](ARCHITECTURE.md) | System diagrams & flow | Understanding the system |
| [IMPLEMENTATION_SUMMARY.md](IMPLEMENTATION_SUMMARY.md) | What you got & how to use it | Complete reference |

---

## 🔧 Core Blog Files

### Jekyll Configuration
```
_config.yml
├─ Purpose: Main Jekyll configuration
├─ Contains: URL, theme, plugins, gems
├─ Modify: Update url, github_username, email
└─ Status: ✏️ Needs your edits
```

### Blog Pages (Markdown)
```
index.md
├─ Purpose: Homepage - displays recent posts
├─ Shows: 5 latest blog posts with excerpts
└─ Status: 📝 Customizable

about.md
├─ Purpose: About page
├─ Contains: Blog description, repo links
└─ Status: 📝 Customizable
```

### Gemfile
```
Gemfile
├─ Purpose: Ruby dependencies for Jekyll
├─ Includes: jekyll, minima, jekyll-feed, jekyll-seo-tag
├─ Usage: `bundle install` to install
└─ Status: ✅ Ready to use
```

---

## 🤖 AI & Automation Scripts

### Python Scripts

#### `scripts/generate_post.py`
```
Purpose: Create Jekyll blog posts
├─ Input: Title, content, category
├─ Output: Markdown file with frontmatter
├─ Location: _posts/YYYY-MM-DD-slug.md
├─ Called by: daily_update.sh
└─ Status: ✅ Ready to use

Usage:
python scripts/generate_post.py "Title" "Content" "category"
```

#### `scripts/analyze_updates.py` ⭐
```
Purpose: AI-powered update analysis
├─ Input: Repository path, days back
├─ Process: Keyword matching analysis
├─ Output: JSON with detected categories
├─ Features:
│  ├─ Fetches recent commits
│  ├─ Loads post subjects config
│  ├─ Matches keywords
│  └─ Generates summary
├─ Called by: daily_update.sh
└─ Status: ✅ Ready to use

Usage:
python scripts/analyze_updates.py /path/to/repo [days]

Output: JSON
{
  "has_updates": true/false,
  "commit_count": number,
  "detected_subjects": [...],
  "summary": "## markdown..."
}
```

#### `scripts/admin_subjects.py` ⭐
```
Purpose: Manage post categories & keywords
├─ Two modes:
│  ├─ Interactive: Menu-driven interface
│  └─ CLI: Command-line operations
├─ Features:
│  ├─ List all subjects
│  ├─ Add new category
│  ├─ Edit existing category
│  ├─ Delete category
│  └─ Export/import config
├─ Modifies: _config/post_subjects.json
└─ Status: ✅ Ready to use

Usage:
# Interactive mode
python scripts/admin_subjects.py

# List subjects
python scripts/admin_subjects.py list

# Add category
python scripts/admin_subjects.py add "Name" "Description" "kw1,kw2"

# Delete category
python scripts/admin_subjects.py delete 0

# Export
python scripts/admin_subjects.py export backup.json
```

### Bash Scripts

#### `scripts/daily_update.sh` ⭐
```
Purpose: Daily update orchestration
├─ Functions:
│  ├─ Clone/update map2-audio repo
│  ├─ Run AI analysis
│  ├─ Check if updates found
│  ├─ Generate post (if updates)
│  └─ Cleanup temp files
├─ Reads: _config/post_subjects.json
├─ Writes: _posts/YYYY-MM-DD-*.md
├─ Calls: analyze_updates.py, generate_post.py
├─ Called by: GitHub Actions workflow
└─ Status: ✅ Ready to use (pre-configured)

Note: Modify PROJECT_REPO to track different repo
```

---

## 🌐 Admin Interface

### Flask Web Server

#### `admin_server.py` ⭐
```
Purpose: Web-based admin dashboard
├─ Framework: Flask (Python)
├─ Port: 5000 (default)
├─ Auth: Token-based (environment variable)
├─ Features:
│  ├─ REST API endpoints
│  ├─ Web dashboard UI
│  ├─ Add/edit/delete subjects
│  ├─ Import/export config
│  └─ Real-time updates
├─ Requires: pip install flask
├─ Configuration: ADMIN_SECRET env var
└─ Status: ✅ Ready to use

Usage:
export ADMIN_SECRET="your-token"
python admin_server.py
# Open http://localhost:5000/?token=your-token

API Endpoints:
GET    /                    # Web dashboard
GET    /api/subjects        # List subjects
POST   /api/subjects        # Create subject
PUT    /api/subjects/<id>   # Update subject
DELETE /api/subjects/<id>   # Delete subject
GET    /api/export          # Export config
POST   /api/import          # Import config
GET    /health              # Health check
```

#### `templates/admin_dashboard.html`
```
Purpose: Web UI for admin interface
├─ Framework: HTML5 + CSS3 + Vanilla JS
├─ Features:
│  ├─ Add subject form
│  ├─ Subject list display
│  ├─ Delete confirmation
│  ├─ Alert notifications
│  └─ Responsive design
├─ Styling: Modern gradient, animations
├─ Authentication: Token-based via URL parameter
└─ Status: ✅ Ready to use
```

---

## ⚙️ Configuration Files

### Post Subjects Configuration

#### `_config/post_subjects.json`
```
Purpose: Define post categories and keywords
├─ Format: JSON array of subjects
├─ Contents:
│  ├─ name: Category name
│  ├─ description: What it's about
│  └─ keywords: Array of keywords to match
├─ Modify via:
│  ├─ admin_subjects.py (CLI)
│  ├─ admin_server.py (Web UI)
│  └─ Direct edit (if you know JSON)
├─ Default subjects:
│  ├─ Performance Issues
│  ├─ Bug Fixes
│  ├─ Security Updates
│  ├─ Feature Updates
│  ├─ Dependencies
│  └─ Documentation
├─ Read by: analyze_updates.py
└─ Status: ✅ Ready to use

Example:
[
  {
    "name": "Performance Issues",
    "description": "Performance degradation and optimization",
    "keywords": ["slow", "performance", "latency"]
  }
]
```

### Python Dependencies

#### `requirements.txt`
```
Purpose: Python package dependencies
├─ Packages:
│  ├─ frontmatter - YAML frontmatter parsing
│  ├─ PyGithub - GitHub API (optional)
│  ├─ flask - Web framework for admin
│  └─ python-dotenv - Environment variable loading
├─ Installation: pip install -r requirements.txt
└─ Status: ✅ Ready to use
```

### Ruby Dependencies

#### `Gemfile`
```
Purpose: Ruby/Jekyll dependencies
├─ Gems:
│  ├─ jekyll - Static site generator
│  ├─ minima - Default theme
│  ├─ jekyll-feed - RSS feed plugin
│  └─ jekyll-seo-tag - SEO optimization
├─ Installation: bundle install
└─ Status: ✅ Ready to use
```

---

## 🔄 GitHub Workflows

### Automation Workflows

#### `.github/workflows/daily-blog-update.yml` ⭐
```
Purpose: Automated daily blog update workflow
├─ Trigger: Daily at 9 AM UTC (cron: '0 9 * * *')
├─ Also: Manual trigger (workflow_dispatch)
├─ Steps:
│  1. Checkout repository
│  2. Set up Python 3.11
│  3. Install dependencies
│  4. Run daily_update.sh
│  5. Configure Git
│  6. Commit & push (if changes)
├─ Secrets: Uses GITHUB_TOKEN (auto-provided)
├─ Customization: Edit cron pattern to change time
└─ Status: ✅ Ready to use

Cron schedule examples:
- '0 9 * * *'    # Daily 9 AM UTC
- '0 8 * * 1'    # Monday 8 AM UTC
- '0 */6 * * *'  # Every 6 hours
```

#### `.github/workflows/jekyll-deploy.yml`
```
Purpose: Build and deploy Jekyll site to GitHub Pages
├─ Trigger: 
│  ├─ Push to main branch
│  ├─ Pull requests
│  └─ Manual trigger (workflow_dispatch)
├─ Steps:
│  1. Checkout code
│  2. Setup Ruby
│  3. Build Jekyll site
│  4. Upload artifact
│  5. Deploy to GitHub Pages
├─ Permissions: Writes to GitHub Pages
└─ Status: ✅ Ready to use

Note: Automatically triggered after daily-blog-update.yml commits
```

---

## 📂 Directory Structure

```
.
├── _config.yml                         # Jekyll config
├── _config/
│   └── post_subjects.json             # Post categories
├── _posts/                            # Blog posts (auto-generated)
├── _layouts/                          # Jekyll templates (optional)
├── templates/
│   └── admin_dashboard.html           # Web UI
├── scripts/
│   ├── generate_post.py               # Post generator
│   ├── analyze_updates.py             # AI analyzer
│   ├── admin_subjects.py              # CLI admin tool
│   └── daily_update.sh                # Daily orchestration
├── .github/workflows/
│   ├── jekyll-deploy.yml             # Deploy workflow
│   └── daily-blog-update.yml         # Daily update workflow
├── admin_server.py                    # Web admin interface
├── Gemfile                            # Ruby dependencies
├── requirements.txt                   # Python dependencies
├── .gitignore                         # Git ignore rules
└── Documentation/
    ├── QUICKSTART.md                  # 5-min quick start
    ├── SETUP.md                       # Full setup guide
    ├── AI_UPDATE_DOCS.md              # AI system guide
    ├── ARCHITECTURE.md                # System diagrams
    ├── IMPLEMENTATION_SUMMARY.md      # Complete reference
    └── FILE_MANIFEST.md               # This file
```

---

## 📝 Files You Need to Edit

### Required (Initial Setup)

#### `_config.yml`
```yaml
# Must edit:
url: "https://YOUR-USERNAME.github.io"
github_username: YOUR-USERNAME
email: your-email@example.com
twitter_username: your-twitter (optional)
```

#### `scripts/daily_update.sh`
```bash
# May need to edit:
PROJECT_REPO="https://github.com/matthewmackes/map2-audio"
# Change if you want to track different repo
```

### Optional (Customization)

- `_config/post_subjects.json` - Add/modify categories
- `about.md` - Update about page
- `index.md` - Customize homepage
- `.github/workflows/daily-blog-update.yml` - Change schedule

---

## ✅ Files Ready to Use (No Edits Needed)

✅ `scripts/generate_post.py`
✅ `scripts/analyze_updates.py`
✅ `scripts/admin_subjects.py`
✅ `scripts/daily_update.sh` (pre-configured)
✅ `admin_server.py`
✅ `templates/admin_dashboard.html`
✅ `Gemfile`
✅ `requirements.txt`
✅ `.github/workflows/jekyll-deploy.yml`
✅ `.github/workflows/daily-blog-update.yml` (pre-configured)

---

## 🚀 Deployment Checklist

Before pushing to GitHub:

- [ ] Edit `_config.yml` with your details
- [ ] Verify Python dependencies in `requirements.txt`
- [ ] Check Ruby dependencies in `Gemfile`
- [ ] Review default subjects in `_config/post_subjects.json`
- [ ] Test locally: `python scripts/analyze_updates.py ./test_repo`
- [ ] Commit all files
- [ ] Push to main branch
- [ ] Enable GitHub Pages in Settings
- [ ] Check Actions tab for first run

---

## 📊 File Statistics

```
Total Files: 20+

By Category:
├─ Documentation: 5 files (*.md)
├─ Python Scripts: 4 files (*.py)
├─ Shell Scripts: 1 file (*.sh)
├─ Configuration: 6 files (*.yml, *.json, Gemfile, etc)
├─ Templates: 1 file (*.html)
├─ Blog: 2 directories (_posts/, _layouts/)
└─ Git: 1 file (.gitignore)

Total Lines:
├─ Code: ~800 lines
├─ Documentation: ~2000 lines
└─ Config: ~100 lines
```

---

## 🔐 Sensitive Files

Files containing secrets or sensitive data:

❌ `admin_server.py` - Contains authentication logic (set ADMIN_SECRET env var)
❌ `.env` - Not included (create if needed for local development)
⚠️  `_config.yml` - Contains your email (don't expose publicly)

---

## 📚 Quick File Reference

**Need to...**

| Task | File to Edit | Command |
|------|----------|---------|
| Add new post category | `_config/post_subjects.json` or run `python scripts/admin_subjects.py` | Interactive or CLI |
| Track different repo | `scripts/daily_update.sh` | Line 8: Change PROJECT_REPO |
| Change update time | `.github/workflows/daily-blog-update.yml` | Line 10: Edit cron |
| Customize homepage | `index.md` | Edit markdown |
| Add about info | `about.md` | Edit markdown |
| Change theme | `_config.yml` | Change `theme:` value |
| Manage subjects via web | Run `admin_server.py` | Python |
| Manage subjects via CLI | Run `admin_subjects.py` | Python |
| Test AI analysis | Run `analyze_updates.py` | Python |
| Test locally | Run `jekyll serve` | Ruby |

---

## 🎯 Key Files Summary

| File | Type | Why Important | Status |
|------|------|--------|--------|
| `_config.yml` | Config | Core Jekyll settings | ✏️ Edit |
| `scripts/daily_update.sh` | Bash | Daily automation | ✅ Ready |
| `scripts/analyze_updates.py` | Python | AI engine | ✅ Ready |
| `admin_subjects.py` | Python | Admin CLI | ✅ Ready |
| `admin_server.py` | Python | Admin web UI | ✅ Ready |
| `.github/workflows/daily-blog-update.yml` | YAML | GitHub Actions trigger | ✅ Ready |
| `_config/post_subjects.json` | JSON | Update categories | ✏️ Customize |

---

**All files are production-ready. Just update your config and deploy!** 🚀
