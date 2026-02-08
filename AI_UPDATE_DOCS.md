# AI-Powered Daily Blog Updates for map2-audio

This system automatically analyzes the `map2-audio` GitHub project daily and creates blog posts only when meaningful updates are detected.

## 🎯 How It Works

1. **Daily Schedule**: GitHub Actions workflow runs daily at 9 AM UTC
2. **AI Analysis**: Python script analyzes commits for patterns and categories
3. **Smart Detection**: Only creates posts if updates match defined "concerning" topics
4. **Admin Control**: Manage post subjects and keywords via web interface

## 📋 System Components

### Scripts

#### `scripts/analyze_updates.py`
Intelligent update analyzer using pattern matching:
- Fetches recent commits from repository
- Categorizes changes by keyword matching
- Detects concerning updates automatically
- Outputs structured JSON data

**Usage:**
```bash
python scripts/analyze_updates.py /path/to/repo [days]
```

#### `scripts/daily_update.sh`
Main orchestration script:
- Clones/updates the map2-audio repository
- Runs AI analysis
- Only creates posts if updates detected
- Automatically commits and pushes changes

**Called by GitHub Actions workflow**

#### `scripts/admin_subjects.py`
Command-line admin tool for managing categories:

**Interactive mode:**
```bash
python scripts/admin_subjects.py
```

**CLI mode:**
```bash
# List all subjects
python scripts/admin_subjects.py list

# Add new subject
python scripts/admin_subjects.py add "Performance Issues" "Performance degradation" "slow,performance,latency"

# Delete subject
python scripts/admin_subjects.py delete 0

# Export configuration
python scripts/admin_subjects.py export backup.json
```

### Web Admin Interface

#### `admin_server.py`
Flask-based web UI for managing post subjects:

**Start the server:**
```bash
export ADMIN_SECRET="your-secure-token"
python admin_server.py
```

Access at: `http://localhost:5000/?token=your-secure-token`

**Features:**
- View all configured subjects
- Add new post categories
- Delete subjects
- Responsive web interface
- JSON API endpoints

### Configuration

#### `_config/post_subjects.json`
Defines all post categories and keywords:

```json
[
  {
    "name": "Performance Issues",
    "description": "Performance degradation, latency problems",
    "keywords": ["slow", "performance", "latency", "bottleneck"]
  },
  {
    "name": "Bug Fixes",
    "description": "Critical and non-critical bug fixes",
    "keywords": ["bug", "fix", "crash", "error"]
  }
]
```

## 🚀 Quick Start

### 1. Local Testing

```bash
# Test AI analysis on map2-audio
python scripts/analyze_updates.py /path/to/map2-audio

# Manage subjects interactively
python scripts/admin_subjects.py

# Start admin web interface (requires Flask)
pip install flask
export ADMIN_SECRET="test-token"
python admin_server.py
```

### 2. Deploy to GitHub

Push to your `USERNAME.github.io` repository:

```bash
git add .
git commit -m "Add AI-powered daily updates"
git push origin main
```

### 3. Configure Workflows

The workflows are ready to use. They'll run automatically:

- **daily-blog-update.yml**: Runs daily at 9 AM UTC (customizable)
- **jekyll-deploy.yml**: Deploys site on any push to main

Edit cron schedule in `.github/workflows/daily-blog-update.yml`:

```yaml
on:
  schedule:
    # Current: 9 AM UTC
    - cron: '0 9 * * *'
    
    # Examples:
    # - cron: '0 8 * * 1'    # Monday 8 AM UTC
    # - cron: '0 */6 * * *'  # Every 6 hours
```

## 📊 Update Detection Logic

The system identifies "concerning" updates using keyword matching:

### Current Categories

| Category | Keywords | Example |
|----------|----------|---------|
| Performance Issues | slow, performance, latency, bottleneck | "Fix slow audio processing" |
| Bug Fixes | bug, fix, crash, error, broken | "Fix crash in audio decoder" |
| Security Updates | security, vulnerability, cve, auth | "Fix authentication bypass" |
| Feature Updates | feature, add, implement, new, support | "Add WAV file support" |
| Dependencies | dependency, update, upgrade, version | "Update audio library" |
| Documentation | doc, readme, guide, tutorial | "Update README" |

### How It Works

1. Fetches commits since last update
2. Searches commit messages for keywords
3. If ANY keywords match → Creates post
4. If NO keywords match → Skips post
5. Only English keyword matching (case-insensitive)

## 🔧 Customization

### Add New Categories

**Via CLI:**
```bash
python scripts/admin_subjects.py add \
  "API Changes" \
  "Breaking changes to public APIs" \
  "api,breaking,deprecated,endpoint"
```

**Via Web UI:**
1. Start admin server
2. Navigate to web interface
3. Fill out form
4. Submit

### Modify Keywords

Edit `_config/post_subjects.json` directly or use admin tools.

### Change Detection Behavior

Edit `scripts/analyze_updates.py`:

```python
# Line ~50: Modify keyword matching logic
for subject in subjects_config:
    for keyword in subject['keywords']:
        if keyword.lower() in all_text:
            # Add additional logic here
```

## 📈 Monitoring & Troubleshooting

### Check Workflow Status
1. Go to repository "Actions" tab
2. View "Daily Blog Update" workflow
3. See execution logs and results

### Debug Locally

```bash
# Test analysis (verbose)
bash -x scripts/daily_update.sh

# Check configuration
python scripts/admin_subjects.py list

# View post subjects JSON
cat _config/post_subjects.json | python -m json.tool
```

### Common Issues

**No posts being created?**
- Check that commits exist in last 24 hours
- Verify keywords match commit messages
- Review workflow logs on GitHub

**Posts for every commit?**
- All commits are triggering posts
- Solution: Make keywords more specific
- Or: Require multiple keyword matches

**Workflow not running?**
- Verify cron syntax is valid
- Check GitHub Actions is enabled
- View Actions tab for errors

## 🔐 Security

### Admin Interface Security

The admin interface uses token-based authentication:

```bash
# Set strong token
export ADMIN_SECRET="your-very-secure-random-token-here"
python admin_server.py
```

Access: `http://localhost:5000/?token=your-very-secure-random-token-here`

### GitHub Actions Secrets

Uses automatic `GITHUB_TOKEN` (no setup needed).

For advanced scenarios, create Personal Access Token:
1. GitHub Settings → Developer settings → Personal access tokens
2. Create token with `repo` scope
3. Add as repository secret
4. Use in workflow: `${{ secrets.YOUR_TOKEN }}`

## 📚 API Endpoints (Admin Server)

```
GET    /                          # Web dashboard
GET    /api/subjects              # List all subjects
POST   /api/subjects              # Create subject (requires token)
PUT    /api/subjects/<id>         # Update subject (requires token)
DELETE /api/subjects/<id>         # Delete subject (requires token)
GET    /api/export                # Export config (requires token)
POST   /api/import                # Import config (requires token)
GET    /health                    # Health check
```

## 🎨 Example Blog Post

Posts are automatically formatted:

```markdown
---
layout: post
title: "🔔 map2-audio Update: Performance Issues - 2024-02-07"
date: 2024-02-07
categories: [concerning-update]
---

## map2-audio Project Update

**Repository:** [map2-audio](https://github.com/matthewmackes/map2-audio)

### Summary
Found **3** significant change(s) related to: Performance Issues | Bug Fixes

### Update Details
- Optimized audio buffer handling
- Fixed memory leak in decoder
- Improved real-time performance

[Links to repo, issues, PRs]
```

## 🚀 Advanced Features

### Multiple Repositories

Extend `daily_update.sh` to track multiple projects:

```bash
PROJECT_REPOS=(
  "https://github.com/user/repo1"
  "https://github.com/user/repo2"
)

for repo in "${PROJECT_REPOS[@]}"; do
  python scripts/analyze_updates.py "temp_$repo" 1
  # Process analysis...
done
```

### Custom Analysis

Modify `analyze_updates.py` to add:
- NLP sentiment analysis
- Issue/PR statistics
- Code metrics
- Performance benchmarks

### Integration with CI/CD

Trigger analysis from other workflows:

```yaml
- name: Analyze updates
  run: |
    python scripts/analyze_updates.py . 1
```

## 📖 Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Jekyll Documentation](https://jekyllrb.com/)
- [Flask Documentation](https://flask.palletsprojects.com/)
- [Python frontmatter](https://github.com/eyeseast/python-frontmatter)

---

**Built with automation and AI for smarter blogging!** 🤖✨
