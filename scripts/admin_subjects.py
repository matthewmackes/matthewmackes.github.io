#!/usr/bin/env python3
"""
Administrative interface for managing blog post subjects
Allows adding, editing, and removing post categories
"""

import json
import sys
import os
from pathlib import Path

CONFIG_FILE = "_config/post_subjects.json"

def load_config():
    """Load current configuration"""
    if not os.path.exists(CONFIG_FILE):
        os.makedirs(os.path.dirname(CONFIG_FILE), exist_ok=True)
        return []
    
    try:
        with open(CONFIG_FILE, 'r') as f:
            return json.load(f)
    except json.JSONDecodeError:
        print("Error: Invalid JSON in config file")
        return []

def save_config(data):
    """Save configuration to file"""
    os.makedirs(os.path.dirname(CONFIG_FILE), exist_ok=True)
    with open(CONFIG_FILE, 'w') as f:
        json.dump(data, f, indent=2)
    print(f"✓ Configuration saved to {CONFIG_FILE}")

def list_subjects():
    """List all configured post subjects"""
    subjects = load_config()
    if not subjects:
        print("No post subjects configured.")
        return
    
    print("\n📋 Configured Post Subjects:\n")
    for i, subject in enumerate(subjects, 1):
        print(f"{i}. {subject['name']}")
        print(f"   Description: {subject['description']}")
        print(f"   Keywords: {', '.join(subject['keywords'])}\n")

def add_subject(name, description, keywords_str):
    """Add a new post subject"""
    subjects = load_config()
    
    # Check if subject already exists
    if any(s['name'].lower() == name.lower() for s in subjects):
        print(f"Error: Subject '{name}' already exists")
        return False
    
    keywords = [k.strip().lower() for k in keywords_str.split(',')]
    
    new_subject = {
        'name': name,
        'description': description,
        'keywords': keywords
    }
    
    subjects.append(new_subject)
    save_config(subjects)
    print(f"✓ Added subject: {name}")
    return True

def edit_subject(index, name=None, description=None, keywords_str=None):
    """Edit an existing post subject"""
    subjects = load_config()
    
    if index < 0 or index >= len(subjects):
        print(f"Error: Invalid subject index {index}")
        return False
    
    if name:
        subjects[index]['name'] = name
    if description:
        subjects[index]['description'] = description
    if keywords_str:
        keywords = [k.strip().lower() for k in keywords_str.split(',')]
        subjects[index]['keywords'] = keywords
    
    save_config(subjects)
    print(f"✓ Updated subject at index {index}")
    return True

def delete_subject(index):
    """Delete a post subject"""
    subjects = load_config()
    
    if index < 0 or index >= len(subjects):
        print(f"Error: Invalid subject index {index}")
        return False
    
    removed = subjects.pop(index)
    save_config(subjects)
    print(f"✓ Deleted subject: {removed['name']}")
    return True

def interactive_menu():
    """Interactive menu for managing subjects"""
    while True:
        print("\n" + "="*50)
        print("📝 Post Subjects Admin Interface")
        print("="*50)
        print("1. List all subjects")
        print("2. Add new subject")
        print("3. Edit subject")
        print("4. Delete subject")
        print("5. Export configuration")
        print("6. Import configuration")
        print("0. Exit")
        print("="*50)
        
        choice = input("Select option (0-6): ").strip()
        
        if choice == '1':
            list_subjects()
        
        elif choice == '2':
            name = input("Subject name: ").strip()
            description = input("Description: ").strip()
            keywords = input("Keywords (comma-separated): ").strip()
            add_subject(name, description, keywords)
        
        elif choice == '3':
            list_subjects()
            try:
                index = int(input("Enter subject number to edit (0-based index): ")) - 1
                name = input("New name (leave blank to skip): ").strip() or None
                description = input("New description (leave blank to skip): ").strip() or None
                keywords = input("New keywords (comma-separated, leave blank to skip): ").strip() or None
                edit_subject(index, name, description, keywords)
            except ValueError:
                print("Invalid input")
        
        elif choice == '4':
            list_subjects()
            try:
                index = int(input("Enter subject number to delete (0-based index): ")) - 1
                confirm = input(f"Are you sure? (y/n): ").strip().lower()
                if confirm == 'y':
                    delete_subject(index)
            except ValueError:
                print("Invalid input")
        
        elif choice == '5':
            subjects = load_config()
            export_file = f"subjects_backup_{datetime.now().strftime('%Y%m%d_%H%M%S')}.json"
            with open(export_file, 'w') as f:
                json.dump(subjects, f, indent=2)
            print(f"✓ Configuration exported to {export_file}")
        
        elif choice == '6':
            import_file = input("Import file path: ").strip()
            if os.path.exists(import_file):
                with open(import_file, 'r') as f:
                    data = json.load(f)
                save_config(data)
                print("✓ Configuration imported")
            else:
                print("File not found")
        
        elif choice == '0':
            print("Goodbye!")
            break
        
        else:
            print("Invalid choice")

def cli_mode(args):
    """Command-line mode for automated usage"""
    
    if not args:
        interactive_menu()
        return
    
    command = args[0]
    
    if command == 'list':
        list_subjects()
    
    elif command == 'add' and len(args) >= 4:
        add_subject(args[1], args[2], args[3])
    
    elif command == 'delete' and len(args) >= 2:
        try:
            delete_subject(int(args[1]))
        except ValueError:
            print("Invalid index")
    
    elif command == 'export' and len(args) >= 2:
        subjects = load_config()
        with open(args[1], 'w') as f:
            json.dump(subjects, f, indent=2)
        print(f"✓ Exported to {args[1]}")
    
    else:
        print("Usage:")
        print("  Interactive mode:  python admin_subjects.py")
        print("  List:              python admin_subjects.py list")
        print("  Add:               python admin_subjects.py add 'Name' 'Description' 'keyword1,keyword2'")
        print("  Delete:            python admin_subjects.py delete <index>")
        print("  Export:            python admin_subjects.py export <file>")

if __name__ == "__main__":
    from datetime import datetime
    cli_mode(sys.argv[1:])
