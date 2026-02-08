---
layout: home
---

# Welcome to My Daily Updates Blog

This blog is automatically populated daily with outputs from my GitHub projects. Check back often for the latest updates!

{% for post in site.posts limit:5 %}
## {{ post.title }}
*{{ post.date | date: "%B %d, %Y" }}*

{{ post.excerpt }}

[Read more...]({{ post.url }})
{% endfor %}
