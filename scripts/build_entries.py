#!/usr/bin/env python3
"""Generate the updates section in index.html from plain text entry files."""

from __future__ import annotations

from dataclasses import dataclass
from datetime import date
from html import escape
from pathlib import Path
import re
import sys


ROOT = Path(__file__).resolve().parent.parent
INDEX_PATH = ROOT / "index.html"
ENTRIES_DIR = ROOT / "entries"
START_MARKER = "<!-- ENTRIES:START -->"
END_MARKER = "<!-- ENTRIES:END -->"
FIELD_RE = re.compile(r"^(Title|Date|Link):\s*(.+?)\s*$")


@dataclass(frozen=True)
class Entry:
    title: str
    entry_date: date
    link: str | None
    body_paragraphs: list[str]
    source_name: str


def parse_entry(path: Path) -> Entry:
    raw = path.read_text(encoding="utf-8").replace("\r\n", "\n")
    header_text, separator, body_text = raw.partition("\n---\n")
    if not separator:
      raise ValueError("missing required separator line '---'")

    fields: dict[str, str] = {}
    for line in header_text.splitlines():
        stripped = line.strip()
        if not stripped:
            continue
        match = FIELD_RE.match(stripped)
        if not match:
            raise ValueError(f"invalid header line: {line!r}")
        fields[match.group(1).lower()] = match.group(2).strip()

    missing = [name for name in ("title", "date") if not fields.get(name)]
    if missing:
        raise ValueError(f"missing required field(s): {', '.join(missing)}")

    try:
        entry_date = date.fromisoformat(fields["date"])
    except ValueError as exc:
        raise ValueError("date must use YYYY-MM-DD") from exc

    paragraphs = [line.strip() for line in body_text.split("\n\n") if line.strip()]
    if not paragraphs:
        raise ValueError("entry body must contain at least one paragraph")

    link = fields.get("link")
    return Entry(
        title=fields["title"],
        entry_date=entry_date,
        link=link if link else None,
        body_paragraphs=paragraphs,
        source_name=path.name,
    )


def format_human_date(value: date) -> str:
    return value.strftime("%B %d, %Y").replace(" 0", " ")


def render_entry(entry: Entry) -> str:
    safe_title = escape(entry.title)
    body_html = "\n".join(
        f"            <p>{escape(paragraph)}</p>" for paragraph in entry.body_paragraphs
    )
    link_html = ""
    if entry.link:
        safe_link = escape(entry.link, quote=True)
        link_html = (
            "\n"
            '            <p class="update-card__link">\n'
            f'              <a href="{safe_link}" target="_blank" rel="noreferrer">Read more</a>\n'
            "            </p>"
        )

    return (
        "          <article class=\"update-card\">\n"
        "            <div class=\"update-card__meta\">\n"
        "              <span class=\"eyebrow\">Update</span>\n"
        f"              <time datetime=\"{entry.entry_date.isoformat()}\">{format_human_date(entry.entry_date)}</time>\n"
        "            </div>\n"
        f"            <h3>{safe_title}</h3>\n"
        "            <div class=\"update-card__body\">\n"
        f"{body_html}\n"
        "            </div>"
        f"{link_html}\n"
        "          </article>"
    )


def render_entries(entries: list[Entry]) -> str:
    if not entries:
        return (
            "          <article class=\"update-card\">\n"
            "            <div class=\"update-card__meta\">\n"
            "              <span class=\"eyebrow\">Update</span>\n"
            "              <span>No entries yet</span>\n"
            "            </div>\n"
            "            <h3>Add a text file to publish an update</h3>\n"
            "            <div class=\"update-card__body\">\n"
            "              <p>Create a <code>.txt</code> file in <code>entries/</code> with <code>Title</code>, <code>Date</code>, an optional <code>Link</code>, and a body below <code>---</code>.</p>\n"
            "            </div>\n"
            "          </article>"
        )
    return "\n".join(render_entry(entry) for entry in entries)


def replace_generated_block(index_html: str, rendered_entries: str) -> str:
    pattern = re.compile(
        rf"({re.escape(START_MARKER)})(.*)({re.escape(END_MARKER)})",
        re.DOTALL,
    )
    replacement = f"{START_MARKER}\n{rendered_entries}\n          {END_MARKER}"
    updated, count = pattern.subn(replacement, index_html, count=1)
    if count != 1:
        raise ValueError("could not find unique entries marker block in index.html")
    return updated


def main() -> int:
    if not ENTRIES_DIR.exists():
        raise FileNotFoundError(f"entries directory not found: {ENTRIES_DIR}")

    entries = [parse_entry(path) for path in sorted(ENTRIES_DIR.glob("*.txt"))]
    entries.sort(key=lambda entry: (entry.entry_date, entry.source_name), reverse=True)

    index_html = INDEX_PATH.read_text(encoding="utf-8")
    updated_html = replace_generated_block(index_html, render_entries(entries))
    INDEX_PATH.write_text(updated_html, encoding="utf-8")
    print(f"Generated {len(entries)} update entr{'y' if len(entries) == 1 else 'ies'}")
    return 0


if __name__ == "__main__":
    try:
        raise SystemExit(main())
    except Exception as exc:  # pragma: no cover
        print(f"build_entries.py: {exc}", file=sys.stderr)
        raise SystemExit(1)
