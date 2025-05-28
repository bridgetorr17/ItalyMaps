import pandas as pd
import json

df = pd.read_csv("../../datasets/DatiConCadenzaMensileInfortuniPiemonte.csv", sep=";")

genderList = df["Genere"].tolist()

males = genderList.count("M")
females = genderList.count("F")

genderData = {
    "males": males,
    "females": females,
}

with open ("genderData.json", "w") as f:
    json.dump(genderData, f)