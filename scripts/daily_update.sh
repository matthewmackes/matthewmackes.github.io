#!/bin/bash
# AI-powered daily update generator for map2-audio project
# Only creates posts if meaningful updates are detected

set -e

# Configuration
PROJECT_REPO="https://github.com/matthewmackes/map2-audio"
TEMP_DIR="temp_project"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

echo "🤖 Starting AI-powered update analysis..."

# Clone or update project
if [ ! -d "$TEMP_DIR" ]; then
    echo "📥 Cloning repository..."
    git clone "$PROJECT_REPO" "$TEMP_DIR"
else
    echo "🔄 Updating repository..."
    cd "$TEMP_DIR"
    git pull origin main 2>/dev/null || git pull origin master 2>/dev/null || true
    cd ..
fi

# Analyze updates using AI
echo "🧠 Analyzing project updates..."
ANALYSIS=$(python "$SCRIPT_DIR/analyze_updates.py" "$TEMP_DIR" 1)

# Check if there are updates
HAS_UPDATES=$(echo "$ANALYSIS" | python3 -c "import json, sys; print(json.load(sys.stdin).get('has_updates', False))" 2>/dev/null || echo "false")

if [ "$HAS_UPDATES" = "False" ] || [ "$HAS_UPDATES" = "false" ]; then
    echo "✓ No significant updates detected. Skipping post creation."
    rm -rf "$TEMP_DIR"
    exit 0
fi

# Extract analysis data
COMMIT_COUNT=$(echo "$ANALYSIS" | python3 -c "import json, sys; print(json.load(sys.stdin).get('commit_count', 0))" 2>/dev/null || echo "0")
SUMMARY=$(echo "$ANALYSIS" | python3 -c "import json, sys; print(json.load(sys.stdin).get('summary', ''))" 2>/dev/null || echo "")
SUBJECTS=$(echo "$ANALYSIS" | python3 -c "import json, sys; subjects = [s['name'] for s in json.load(sys.stdin).get('detected_subjects', [])]; print(' | '.join(subjects))" 2>/dev/null || echo "Updates")

# Create post title
POST_TITLE="🔔 map2-audio Update: $SUBJECTS - $(date +%Y-%m-%d)"

# Create full post content
POST_CONTENT="## map2-audio Project Update

**Repository:** [map2-audio](https://github.com/matthewmackes/map2-audio)

### Summary
Found **$COMMIT_COUNT** significant change(s) related to: $SUBJECTS

### Update Details
$SUMMARY

### Repository Links
- [Project Repository](https://github.com/matthewmackes/map2-audio)
- [Issues](https://github.com/matthewmackes/map2-audio/issues)
- [Pull Requests](https://github.com/matthewmackes/map2-audio/pulls)
"

# Generate the blog post
echo "📝 Creating blog post..."
python "$SCRIPT_DIR/generate_post.py" "$POST_TITLE" "$POST_CONTENT" "concerning-update"

# Cleanup
echo "🧹 Cleaning up..."
rm -rf "$TEMP_DIR"

echo "✅ Daily update complete! Post created for meaningful changes."
