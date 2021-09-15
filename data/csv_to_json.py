import csv
import json
# # read csv file
with open('data/PA issues and options spreadsheet prototype - data.csv', 'r') as f:
    data = csv.DictReader(f)
    final_data = {
        "issues": {},
        "just me": {},
        "all southafricans": {}
    }

    for issue in list(data):
        if issue["What does your issue most closely relate to?"]:
            final_data["issues"][issue["What does your issue most closely relate to?"]] = issue["What does your issue most closely relate to?"]
        if issue["How many people are affected by your issue?"] == "Just me":
            if issue["What does your issue most closely relate to?"] not in final_data["just me"]:
                final_data["just me"][issue["What does your issue most closely relate to?"]] = []
            final_data["just me"][issue["What does your issue most closely relate to?"]].append(issue)
        elif issue["How many people are affected by your issue?"] == "*":
            if issue["What does your issue most closely relate to?"] not in final_data["all southafricans"]:
                final_data["all southafricans"][issue["What does your issue most closely relate to?"]] = []
            final_data["all southafricans"][issue["What does your issue most closely relate to?"]].append(issue)
            if issue["What does your issue most closely relate to?"] not in final_data["just me"]:
                final_data["just me"][issue["What does your issue most closely relate to?"]] = []
            final_data["just me"][issue["What does your issue most closely relate to?"]].append(issue)

    with open('src/data/data.json', 'w') as f:
        json.dump(final_data, f)
