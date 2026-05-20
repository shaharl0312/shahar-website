import json
import csv

with open("etf-data.json", "r", encoding="utf-8") as f:
    data = json.load(f)

rows = []
for market in data["markets"]:
    for category in market["categories"]:
        for etf in category["etfs"]:
            rows.append({
                "שוק": market["name"],
                "קטגוריה": category["name"],
                "סקטור": etf.get("sector", ""),
                "טיקר": etf.get("ticker", ""),
                "דמי ניהול": etf.get("fee", ""),
                "מספר קרן": etf.get("fundNumber", ""),
                "תיאור": etf.get("description", ""),
            })

fields = ["שוק", "קטגוריה", "סקטור", "טיקר", "דמי ניהול", "מספר קרן", "תיאור"]

with open("etf-data.csv", "w", newline="", encoding="utf-8-sig") as f:
    writer = csv.DictWriter(f, fieldnames=fields)
    writer.writeheader()
    writer.writerows(rows)

print(f"נוצר etf-data.csv עם {len(rows)} שורות")
