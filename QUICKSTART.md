# Quick Start Guide: AI-Powered Blog Updates

Get your AI-powered blog running in 5 minutes!

## ⚡ 5-Minute Setup

### Step 1: Clone Your Pages Repository
```bash
git clone https://github.com/YOUR-USERNAME/YOUR-USERNAME.github.io.git
cd YOUR-USERNAME.github.io
```

### Step 2: Add This Project
Copy all files from this setup into your repository.

### Step 3: Update Configuration
Edit `_config.yml`:
```yaml
url: "https://YOUR-USERNAME.github.io"
github_username: YOUR-USERNAME
email: your-email@example.com
```

The system is pre-configured to track **map2-audio** project.

### Step 4: Push to GitHub
```bash
git add .
git commit -m "Add AI-powered blog updates"
git push origin main
```

### Step 5: Enable Pages
GitHub Settings → Pages → Deploy from branch (main)

✅ **Done!** Your AI blog is live. Check back tomorrow for automated updates.

---

## 🧪 Test Locally (Optional)

```bash
# Install dependencies
pip install -r requirements.txt

# Test AI analysis on map2-audio
git clone https://github.com/matthewmackes/map2-audio.git test_repo
python scripts/analyze_updates.py ./test_repo

# Manage post subjects
python scripts/admin_subjects.py

# Preview site locally (requires Ruby)
bundle install
bundle exec jekyll serve
```

Visit `http://localhost:4000`

---

## 🎛️ Manage Post Categories

### Add New Category
```bash
python scripts/admin_subjects.py add \
  "API Changes" \
  "Breaking API changes and deprecations" \
  "api,breaking,deprecated"
```

### List All Categories
```bash
python scripts/admin_subjects.py list
```

### Interactive Management
```bash
python scripts/admin_subjects.py
# Choose options from menu
```

---

## 🌐 Web Admin Dashboard

```bash
pip install flask
export ADMIN_SECRET="your-secure-token"
python admin_server.py
```

Visit: `http://localhost:5000/?token=your-secure-token`

Add, edit, or delete post subjects through beautiful web interface.

---

## 📊 Monitor Your Blog

1. **GitHub Actions Tab**: View daily execution logs
2. **Blog Posts**: See new posts at your site
3. **Commits**: Check repository for automated commits

---

## 🔧 Common Customizations

### Track Different Project
Edit `scripts/daily_update.sh`:
```bash
PROJECT_REPO="https://github.com/YOUR-USERNAME/YOUR-PROJECT"
```

### Change Update Schedule
Edit `.github/workflows/daily-blog-update.yml`:
```yaml
- cron: '0 9 * * *'  # Change 9 to desired hour (UTC)
```

### Add New Keywords
Edit `_config/post_subjects.json` or use admin interface:
```bash
python scripts/admin_subjects.py edit
```

---

## 🚀 What Happens Daily

1. ⏰ **9 AM UTC**: Workflow triggers
2. 📥 **Clone**: Latest repository fetched
3. 🧠 **Analyze**: AI detects meaningful updates
4. 📝 **Post**: If updates found, blog post created
5. 🚀 **Deploy**: Site automatically rebuilt and published

---

## 📚 Full Documentation

- [Setup Guide](SETUP.md) - Detailed setup instructions
- [AI System Guide](AI_UPDATE_DOCS.md) - Deep dive into AI features
- [Jekyll Docs](https://jekyllrb.com/) - Blog customization

---

## ❓ FAQ

**Q: How often does it check?**
A: Daily at 9 AM UTC (configurable)

**Q: What if there are no updates?**
A: No post created - only publishes meaningful changes

**Q: Can I track multiple projects?**
A: Yes! Modify `daily_update.sh` to loop through multiple repos

**Q: How do I customize categories?**
A: Use admin tools or edit `_config/post_subjects.json`

**Q: Is my data secure?**
A: Yes! Everything runs on GitHub infrastructure using your token

---

**Ready to automate?** Push to main and watch your blog grow! 🚀
