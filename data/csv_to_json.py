import csv
import json
# # read csv file
with open('data/PA issues and options spreadsheet prototype - data.csv', 'r') as f:
    data = csv.DictReader(f)
    final_data = {
        "issues": {}
    }

    for issue in list(data):
        if issue["What does your issue most closely relate to?"]:
            final_data["issues"][issue["What does your issue most closely relate to?"]] = issue["What does your issue most closely relate to?"]

    with open('src/data/data.json', 'w') as f:
        json.dump(final_data, f)
