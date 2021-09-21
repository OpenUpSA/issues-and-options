import csv
import json

# constants
PERSONAL_ISSUES = "just me"
NATIONAL_ISSUES = "all southafricans"
CSV_FILE = "data/PA issues and options spreadsheet prototype - data.csv"

with open(CSV_FILE, "r") as f:
    data = csv.DictReader(f)
    final_data = {"issues": {}, PERSONAL_ISSUES: {}, NATIONAL_ISSUES: {}}

    # These are all the entities that exists in all issues and person scenario
    asterisk_entities = []

    for index, issue in enumerate(data):
        related_issue = issue["What does your issue most closely relate to?"]
        people_affected = issue["How many people are affected by your issue?"]
        if related_issue and related_issue != "*":
            if related_issue not in final_data["issues"]:
                final_data["issues"][related_issue] = index
        if related_issue == "*":
            asterisk_entities.append(issue)
            continue
        if people_affected == "Just me":
            if related_issue not in final_data[PERSONAL_ISSUES]:
                final_data[PERSONAL_ISSUES][related_issue] = []
            final_data[PERSONAL_ISSUES][related_issue].append(issue)
        elif people_affected == "*":
            if related_issue not in final_data[NATIONAL_ISSUES]:
                final_data[NATIONAL_ISSUES][related_issue] = []
            final_data[NATIONAL_ISSUES][related_issue].append(issue)
            if related_issue not in final_data[PERSONAL_ISSUES]:
                final_data[PERSONAL_ISSUES][related_issue] = []
            final_data[PERSONAL_ISSUES][related_issue].append(issue)

    # access all south africans issues
    for issue in final_data[NATIONAL_ISSUES]:
        # append asterisk issues to all south africans issues
        final_data[NATIONAL_ISSUES][issue].extend(asterisk_entities)

    for issue in final_data[PERSONAL_ISSUES]:
        # append asterisk issues to just me issues
        final_data[PERSONAL_ISSUES][issue].extend(asterisk_entities)

    with open("src/data/data.json", "w") as f:
        json.dump(final_data, f)
