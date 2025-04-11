# Get all .mdx files in the current folder
# $mdxFiles = Get-ChildItem -Path . -Filter *ai-app*.mdx | Select-Object -First 10
$mdxFiles = Get-ChildItem -Path . -Filter *.mdx

# Loop through each file
foreach ($file in $mdxFiles) {
    # Pass the filename to image-setup.ps1
    Write-Host "Processing file: $($file.Name)"
    ..\script\image-setup.ps1 $file.Name
    Write-Host "--------------------------"
}

# Loop through each file
foreach ($file in $mdxFiles) {
    # Pass the filename to image-setup.ps1
    Write-Host "Processing file: $($file.Name)"
    ..\script\image-rename.ps1 $file.Name
    Write-Host "--------------------------"
}

