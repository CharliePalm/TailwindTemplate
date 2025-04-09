import sys
import os
import re

def replace_in_file(file_path, old_string, new_string):
    # Read file contents
    with open(file_path, 'r') as file:
        content = file.read()

    # Replace the old string with the new string
    updated_content = content.replace(old_string, new_string)

    # Write the updated content back to the file
    with open(file_path, 'w') as file:
        file.write(updated_content)

def update_website_template(name: str):
    cleaned_name = re.sub(r'(?<!^)(?=[A-Z])', ' ', name)

    # change if needed
    base_dir = f'../{website_name}'

    # paths to the specific files to be updated
    package_json = os.path.join(base_dir, "package.json")
    package_lock = os.path.join(base_dir, "package-lock.json")
    app_component_ts = os.path.join(base_dir, "src", "app", "app.component.ts")
    index_html = os.path.join(base_dir, "src", "index.html")
    angular_json = os.path.join(base_dir, "angular.json")

    replace_in_file(package_json, '"name": "template"', f'"name": "{name.lower()}"')
    replace_in_file(app_component_ts, "title = 'Template';", f"title = '{cleaned_name}';")
    replace_in_file(index_html, "<title>Template</title>", f"<title>{cleaned_name}</title>")
    replace_in_file(package_lock, '"name": "template"', name.lower())
    replace_in_file(angular_json, "Template", name)

if __name__ == "__main__":
    if len(sys.argv) < 2:
      print("Usage: python update_template.py <name>")
      sys.exit(1)

    website_name = sys.argv[1]
    def check(result):
      if result != 0: exit(result)
    check(os.system(f'cd .. && cp -r TailwindTemplate {website_name}'))
    check(os.system(f'cd ../{website_name} && rm -r -f .git && git init && npm i'))
    update_website_template(website_name)
    print('Cloning complete. Happy coding :)')
