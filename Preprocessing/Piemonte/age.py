import pandas as pd
import json 

df = pd.read_csv("../../datasets/DatiConCadenzaMensileInfortuniPiemonte.csv", sep=";")

ageList = df["Eta"].tolist()

print(ageList)