import json

# Path to the uploaded file
file_path = 'C:/Users/DUNAMIS_GH/Desktop/obs_bible_plugin/assets/paired.js'

# Cleaning the JS-like structure manually to create valid JSON
with open(file_path, 'r', encoding='utf-8') as file:
    content = file.read().strip()

# Remove the JavaScript variable assignment to isolate the JSON array
json_start = content.find('[')
json_data = content[json_start:].strip().rstrip(';')  # Remove trailing semicolon if present

# Parse the JSON array
hymns = json.loads(json_data)

# Process each hymn to create formatted text
formatted_output = []
for hymn in hymns:
    formatted_text = f"{hymn['name']}\n{hymn['verse']}"
    formatted_output.append(formatted_text)

# Combine all formatted texts
final_output = "\n\n".join(formatted_output)

# Save the result as a plain text file
output_path = 'C:/Users/DUNAMIS_GH/Desktop/obs_bible_plugin/assets/paired.txt'
with open(output_path, 'w', encoding='utf-8') as output_file:
    output_file.write(final_output)

output_path
