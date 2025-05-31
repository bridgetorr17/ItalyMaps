# GOAL FORMAT: 
# [
#   { date: '2012-01-01', value: 3 },
#   { date: '2012-01-02', value: 6 },
#   ...
# ];

import pandas as pd
from datetime import datetime
from collections import Counter
import json 

df = pd.read_csv("../../datasets/DatiConCadenzaMensileInfortuniPiemonte.csv", sep=";")

dates = df['DataAccadimento'].tolist()

# EXTRAPLOATING DATES
start2024 = datetime.strptime('01/01/2024', '%d/%m/%Y')
end2024 = datetime.strptime('31/03/2024', '%d/%m/%Y')
start2025 = datetime.strptime('01/01/2025', '%d/%m/%Y')
end2025 = datetime.strptime('31/03/2025', '%d/%m/%Y')

dt_dates = [datetime.strptime(date, '%d/%m/%Y') for date in dates]

dates2024 = []
dates2025 = []
for d in dt_dates:
    if d >= start2024 and d <= end2024:
        dates2024.append(d)
    elif d>= start2025 and d<= end2025:
        dates2025.append(d)


dates2024 = [d.strftime('%Y/%m/%d') for d in dates2024]
dates2025 = [d.strftime('%Y/%m/%d') for d in dates2025]

dates2024counter = Counter(dates2024)
dates2025counter = Counter(dates2025)

dates2024JSON = [{ "date": date, "value": count}
    for date, count in sorted(dates2024counter.items())
]
dates2025JSON = [{ "date": date, "value": count}
    for date, count in sorted(dates2025counter.items())
]

with open ("dateData2024.json", "w") as f:
    json.dump(dates2024JSON, f)

with open ("dateData2025.json", "w") as f:
    json.dump(dates2025JSON, f)