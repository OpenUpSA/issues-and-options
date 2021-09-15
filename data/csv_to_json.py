import csv
import json
# # read csv file
with open('data/PA issues and options spreadsheet prototype - data.csv', 'r') as f:
    data = csv.DictReader(f)
    final_data = {
        "issues": {},
        "me": {},
        "ZA": {}
    }

    for issue in list(data):
        if issue["What does your issue most closely relate to?"]:
            final_data["issues"][issue["What does your issue most closely relate to?"]] = issue["What does your issue most closely relate to?"]
        if issue["What does your issue most closely relate to?"] == "*":
            if issue["What does your issue most closely relate to?"] not in final_data["ZA"] and issue["What does your issue most closely relate to?"] not in final_data["me"]:
                final_data["ZA"][issue["What does your issue most closely relate to?"]] = []
                final_data["me"][issue["What does your issue most closely relate to?"]] = []
            final_data["me"][issue["What does your issue most closely relate to?"]].append(issue)
        if issue["How many people are affected by your issue?"] == "Just me":
            if issue["What does your issue most closely relate to?"] not in final_data["me"]:
                final_data["me"][issue["What does your issue most closely relate to?"]] = []
            final_data["me"][issue["What does your issue most closely relate to?"]].append({issue["Who"]: issue})
        elif issue["How many people are affected by your issue?"] == "*":
            if issue["What does your issue most closely relate to?"] not in final_data["ZA"]:
                final_data["ZA"][issue["What does your issue most closely relate to?"]] = []
            final_data["ZA"][issue["What does your issue most closely relate to?"]].append({issue["Who"]: issue})

    with open('src/data/data.json', 'w') as f:
        json.dump(final_data, f)
