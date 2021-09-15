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

    # These are all the entities that exists in all issues and person scenario
    asterisk_entities = []

    for issue in list(data):
        if issue["What does your issue most closely relate to?"] and issue["What does your issue most closely relate to?"] != "*":
            final_data["issues"][issue["What does your issue most closely relate to?"]] = issue["What does your issue most closely relate to?"]
        if issue["What does your issue most closely relate to?"] == "*":
            asterisk_entities.append(issue)
            continue
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

    # access all south africans issues
    for issue in final_data["all southafricans"]:
        # append asterisk issues to all south africans issues
        final_data["all southafricans"][issue].extend(asterisk_entities)

    for issue in final_data["just me"]:
        # append asterisk issues to just me issues
        final_data["just me"][issue].extend(asterisk_entities)

    with open('src/data/data.json', 'w') as f:
        json.dump(final_data, f)
