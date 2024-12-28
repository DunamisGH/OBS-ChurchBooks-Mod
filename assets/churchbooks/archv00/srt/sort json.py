import json
import os

# Get the directory where the script is located
script_dir = os.path.dirname(os.path.abspath(__file__))

# Loop through all JSON files in the directory
for file_name in os.listdir(script_dir):
    if file_name.endswith('.json'):  # Check for JSON files
        json_path = os.path.join(script_dir, file_name)

        try:
            # Load JSON data
            with open(json_path, mode='r', encoding='utf-8') as json_file:
                data = json.load(json_file)

            # Sort JSON data by 'name' field
            sorted_data = sorted(data, key=lambda x: x['name'])

            # Write the sorted data back to the file
            with open(json_path, mode='w', encoding='utf-8') as json_file:
                json.dump(sorted_data, json_file, indent=4, ensure_ascii=False)

            print(f"Sorted: {file_name}")

        except Exception as e:
            print(f"Error processing {file_name}: {e}")

print("All JSON files sorted successfully!")
