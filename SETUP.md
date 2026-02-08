# GitHub Pages Jekyll Blog with Daily Automation

A Jekyll-based GitHub Pages blog that automatically populates with daily outputs from your GitHub projects.

## 🎯 Features

- **GitHub Pages Hosting**: Free, fast, and built-in with GitHub
- **Jekyll Blog**: Static site generator with minimal dependencies
- **Automated Daily Updates**: GitHub Actions workflow runs on schedule
- **AI-Powered Analysis**: Detects meaningful updates and only posts when needed
- **Project Integration**: Tracks map2-audio and other repositories
- **Responsive Theme**: Built on Minima theme (customizable)
- **Admin Interface**: Web-based and CLI tools for managing post subjects
- **Smart Filtering**: Only creates posts for "concerning" updates

## 📋 New AI Features

### What's New

✨ **AI-Powered Daily Updates**
- Analyzes commits automatically
- Categorizes changes by topic
- Only posts when meaningful updates detected
- Smart keyword matching

⚙️ **Administrative Interface**
- Web dashboard for managing post subjects
- CLI tools for batch operations
- JSON-based configuration
- Real-time category management

🎯 **Intelligent Filtering**
- Detects Performance Issues, Bug Fixes, Security Updates, etc.
- Configurable keywords per category
- Never posts trivial updates

## 📋 Setup Instructions

### 1. Prerequisites

- GitHub account
- A repository named `YOUR-USERNAME.github.io` (for GitHub Pages)
- Git installed locally

### 2. Initial Setup

1. **Clone or create your pages repository:**
   ```bash
   git clone https://github.com/YOUR-USERNAME/YOUR-USERNAME.github.io.git
   cd YOUR-USERNAME.github.io
   ```

2. **Copy all files from this setup** into your repository

3. **Update Configuration** - Edit `_config.yml`:
   ```yaml
   url: "https://YOUR-USERNAME.github.io"
   github_username: YOUR-USERNAME
   twitter_username: your-twitter
   email: your-email@example.com
   ```

4. **Configure Project Tracking** - The system is pre-configured to track:
   - Repository: `map2-audio` (https://github.com/matthewmackes/map2-audio)
   
   To track different projects, edit `scripts/daily_update.sh` and update:
   ```bash
   PROJECT_REPO="https://github.com/YOUR-USERNAME/YOUR-PROJECT"
   ```

### 3. Enable GitHub Pages

1. Go to repository Settings → Pages
2. Set Source to "Deploy from a branch"
3. Select `main` branch and `/root` folder
4. Save

Your site will be available at: `https://YOUR-USERNAME.github.io`

### 4. Configure Workflows

The setup includes two GitHub Actions workflows:

**`jekyll-deploy.yml`** - Builds and deploys the Jekyll site
- Runs on push to main branch
- Builds the static site
- Deploys to GitHub Pages

**`daily-blog-update.yml`** - AI-powered daily analysis
- Runs daily at 9 AM UTC (edit the `cron` schedule as needed)
- Fetches project data
- Analyzes for meaningful updates
- Only creates posts if updates detected
- Commits and pushes changes

### 5. Manual Testing

Test the post generation locally:

```bash
# Install dependencies
pip install frontmatter

# Generate a test post
python scripts/generate_post.py "Test Post" "This is test content"

# Test AI analysis (map2-audio)
python scripts/analyze_updates.py /path/to/map2-audio/repo

# Build locally (requires Ruby/Jekyll)
bundle install
bundle exec jekyll serve
```

Visit `http://localhost:4000` to preview your site.

## 🤖 AI Update System

### How It Works

1. **Daily Schedule**: Runs at configurable time (default: 9 AM UTC)
2. **Fetch Updates**: Clones/pulls the tracked repository
3. **Analyze Changes**: AI identifies update categories
4. **Smart Decision**: Only creates post if updates are meaningful
5. **Auto-Publish**: Commits and deploys new posts

### Managing Post Subjects

#### CLI Method (Recommended)

```bash
# Interactive menu
python scripts/admin_subjects.py

# List subjects
python scripts/admin_subjects.py list

# Add new category
python scripts/admin_subjects.py add "Security Issues" "Security-related fixes" "security,vulnerability,cve"

# Remove category
python scripts/admin_subjects.py delete 0
```

#### Web Admin Interface

```bash
# Start server (requires Flask)
pip install flask
export ADMIN_SECRET="your-secure-token"
python admin_server.py
```

Access: `http://localhost:5000/?token=your-secure-token`

**Features:**
- View all categories
- Add/delete subjects
- Manage keywords
- Import/export config

### Default Categories

| Category | Keywords |
|----------|----------|
| Performance Issues | slow, performance, latency, bottleneck |
| Bug Fixes | bug, fix, crash, error, broken |
| Security Updates | security, vulnerability, cve, exploit |
| Feature Updates | feature, add, implement, new |
| Dependencies | dependency, update, upgrade, version |
| Documentation | doc, readme, documentation, guide |

## 📚 Advanced Customization

### Customize Daily Updates

Edit `scripts/daily_update.sh` to track multiple projects or extract different data.

### Modify Analysis Logic

Edit `scripts/analyze_updates.py` to implement custom detection:

```python
# Add custom analysis
if "critical" in all_text:
    detected_subjects.append(custom_category)
```

### Change Theme

Edit `_config.yml`:
```yaml
theme: jekyll-theme-minimal
# or
remote_theme: owner/repo
```

### Create Custom Layouts

Add custom templates to `_layouts/`:
- `post.html` - Single post layout
- `page.html` - Page layout
- `default.html` - Base layout

### Add CSS

Create `assets/css/style.scss`:
```scss
---
---

@import "{{ site.theme }}";

// Your custom styles
```

## 🔒 Security & Tokens

The GitHub Actions workflow uses `secrets.GITHUB_TOKEN` (automatically provided).

For admin interface:
1. Set strong `ADMIN_SECRET` environment variable
2. Use URL parameter `?token=YOUR_SECRET` to authenticate

## 📊 Workflow Schedule Examples

```yaml
# Every day at 9 AM UTC
- cron: '0 9 * * *'

# Every Monday at 8 AM UTC
- cron: '0 8 * * 1'

# Every 6 hours
- cron: '0 */6 * * *'

# Every day at 2 PM (your timezone UTC+5)
- cron: '0 9 * * *'  # 9 AM UTC = 2 PM UTC+5
```

## 📖 Documentation

See full documentation:
- [AI Update System](AI_UPDATE_DOCS.md) - In-depth guide to AI features
- [Original Setup Guide](SETUP.md) - Basic setup instructions

## 🚀 Next Steps

1. **Customize post subjects** for your specific projects
2. **Test the AI analysis** locally
3. **Deploy to GitHub** and enable workflows
4. **Monitor** the Actions tab for execution
5. **Refine keywords** based on actual updates

## 📖 Useful Resources

- [Jekyll Documentation](https://jekyllrb.com/)
- [GitHub Pages Docs](https://docs.github.com/en/pages)
- [GitHub Actions](https://docs.github.com/en/actions)
- [AI Update System Docs](AI_UPDATE_DOCS.md)

## 🐛 Troubleshooting

**Site not building?**
- Check GitHub Actions tab for error logs
- Verify Ruby version compatibility in Gemfile

**Posts not appearing?**
- Check workflow logs in Actions tab
- Verify post subjects match commit messages
- Try manual test: `python scripts/analyze_updates.py /path/to/repo`

**No AI posts being created?**
- Ensure commits exist in tracked repository
- Verify keywords in `_config/post_subjects.json` match commit text
- Review workflow execution logs

**Admin interface not accessible?**
- Verify Flask is installed: `pip install flask`
- Check ADMIN_SECRET is set correctly
- Ensure token parameter matches in URL

---

**Made with ❤️ and 🤖 for smart automated blogging**
