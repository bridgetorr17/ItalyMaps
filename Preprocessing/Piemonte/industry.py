import pandas as pd
import json 

df = pd.read_csv("../../datasets/DatiConCadenzaMensileInfortuniPiemonte.csv", sep=";")

industryList = df["SettoreAttivitaEconomica"].tolist()
# A - Agriculture, forestry, fishing
# B - Mining and quarrying
# C - manufacturing
# D - Electricity, gas, steam and AC supply
# E - water supply, sewage, waste management and remediation
# F - construction
# G - wholesale and retail trade, repare of moto vehicles and motorcycles
# H - transportation and storage
# I - acoomonation and food service activities
# J - infomration and communication
# K - financial and isurance activities
# L - real estate activities
# M - professional, scientific and technical
# N - administrating and suppor service
# O - public adinistratione and defence, compulsory social security
# P - education
# Q - human health and social work activities
# R - arts, entertainment and recreation
# S - other service acitivities
# T -  activites of households as employers, 
# U - activities of extraterritotrial orgnizations
# ND - non disclosed

# industry category letters without subcategories
macroNums = [
    entry.split()[0] 
    for entry in industryList
    if entry != 'ND']
industryNumbers = {}

for letter in range(ord('A'), ord('U') + 1):
    industryNumbers[chr(letter)] = 0

for letter in industryNumbers:
   industryNumbers[letter] = macroNums.count(letter)

sortedIndustryNums = dict(sorted(industryNumbers.items(), key=lambda x: x[1], reverse=True))

sortedList = list(sortedIndustryNums.items())
items = sortedList[-8:]
lowerInd = sum(v for _, v in items)

sortedList = sortedList[0:-8]
sortedList.append(("S",lowerInd))
sortedList = dict(sortedList)

print(sortedList)
totalInjuries = sum(sortedList.values())
percentages = []

for ind in sortedList: 
    percentages.append((ind, round((sortedList[ind]/totalInjuries)*100)))

percentages = dict(percentages)
with open ("industryData.json", "w") as f:
    json.dump({
        "industryNumbers": industryNumbers,
        "sortedIndustryNums": sortedIndustryNums,
        "sortedIndustryNumsConsolidated": sortedList,
        "percentagesConsolidated": percentages
        }, f, indent=4)