#!/usr/bin/env python3
"""
Generate daily blog posts from GitHub project outputs
Usage: python generate_post.py "Post Title" "Post Content"
"""

import os
import sys
from datetime import datetime
import frontmatter

def generate_post(title, content, category="daily-update"):
    """Generate a Jekyll blog post with frontmatter"""
    
    # Create filename with date
    now = datetime.now()
    date_str = now.strftime("%Y-%m-%d")
    slug = title.lower().replace(" ", "-").replace("/", "-")
    filename = f"{date_str}-{slug}.md"
    
    # Create post frontmatter
    post = frontmatter.Post(content)
    post['layout'] = 'post'
    post['title'] = title
    post['date'] = now
    post['categories'] = [category]
    post['author'] = 'Automated Bot'
    post['excerpt'] = content[:200] + "..." if len(content) > 200 else content
    
    # Write post
    posts_dir = "_posts"
    os.makedirs(posts_dir, exist_ok=True)
    
    filepath = os.path.join(posts_dir, filename)
    with open(filepath, 'w') as f:
        f.write(frontmatter.dumps(post))
    
    print(f"✓ Created post: {filepath}")
    return filepath

if __name__ == "__main__":
    if len(sys.argv) < 3:
        print("Usage: python generate_post.py \"Title\" \"Content\"")
        sys.exit(1)
    
    title = sys.argv[1]
    content = sys.argv[2]
    category = sys.argv[3] if len(sys.argv) > 3 else "daily-update"
    
    generate_post(title, content, category)
