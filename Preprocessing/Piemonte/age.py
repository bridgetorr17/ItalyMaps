import pandas as pd
import json 

df = pd.read_csv("../../datasets/DatiConCadenzaMensileInfortuniPiemonte.csv", sep=";")

ageList = df["Eta"].tolist()
ageLabels = ['under 15', '15-20', '20-25', '25-30', '30-35', '35-40', '40-45', '45-50', '50-55', '55-60', '60-65', '65-70', '70-75', 'above 75']
ageBins = [0, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70 ,75, float('inf')]

df = pd.DataFrame({'Ages': ageList})

ageGroups = pd.cut(df['Ages'], bins=ageBins, labels=ageLabels, right=False)

ageData = ageGroups.value_counts().reindex(ageLabels, fill_value=0)
ageDataJSON = ageData.to_dict()
print(ageDataJSON)
with open ("ageData.json", "w") as f:
    json.dump(ageDataJSON, f)