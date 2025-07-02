from google import genai
from google.genai import types
import pathlib
import time
import pandas as pd

# filePath = '../../datasets/gz_recipe.csv'
# chunk = pd.read_csv(filePath, chunksize=5)

# for i, df_chunk in enumerate(chunk):
#     out_name = f'chunk_{i:03d}.csv'
#     df_chunk.to_csv(out_name, index=False)
#     print(f"Wrote {out_name} with {len(df_chunk)} rows")

testChunk = pathlib.Path('chunk_001.csv')
client = genai.Client()

# Retrieve and encode the PDF byte
#filepath = pathlib.Path('../../datasets/gz_recipe.csv')

prompt = "Translate this csv file to English, keeping the Italian name and adding the english equivalent to each row. Ouput should have one additional header than the input, which should be labeled 'EnglishName'. Convert temperatures to the closest Fahrenheit degree."
response = client.models.generate_content(
  model="gemini-2.5-flash",
  contents=[
      types.Part.from_bytes(
        data=testChunk.read_bytes(),
        mime_type='text/csv',
      ),
      prompt])

translated_csv = response.text
pathlib.Path('translated_chunk_001.csv').write_text(translated_csv, encoding="utf-8")
print("Saved as translated_recipes.csv")