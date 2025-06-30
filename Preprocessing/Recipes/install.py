import kagglehub

# Download latest version
path = kagglehub.dataset_download("edoardoscarpaci/italian-food-recipes")

print("Path to dataset files:", path)