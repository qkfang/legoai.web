param (
    [string]$MarkdownFile
)
# chmod +x image-rename.ps1

$MarkdownFile = Join-Path -Path (Get-Location) -ChildPath $MarkdownFile

# Check if the file exists
if (-Not (Test-Path $MarkdownFile)) {
    Write-Host "Markdown file not found: $MarkdownFile"
    exit 1
}

# Read the content of the markdown file
$MarkdownContent = Get-Content $MarkdownFile

# Extract the directory of the markdown file
$MarkdownDir = Split-Path -Path $MarkdownFile

# Extract the base name of the markdown file (without extension)
$MarkdownBaseName = [System.IO.Path]::GetFileNameWithoutExtension($MarkdownFile)

# Initialize a counter for sequence numbers
$Counter = 1

# Regex to match ![alt text](xxx) tags
$ImageRegex = '!\[.*?\]\((.*?)\)'

# Process each match
$UpdatedContent = $MarkdownContent -replace $ImageRegex, {
    param ($Match)
    $ImagePath = $Match.Groups[1].Value

    # Get the full path of the image
    $FullImagePath = Join-Path $MarkdownDir $ImagePath

    # Check if the image file exists
    if (-Not (Test-Path $FullImagePath)) {
        Write-Host "Image file not found: $FullImagePath"
        return $Match.Value
    }

    # Generate the new image name
    $ImageExtension = [System.IO.Path]::GetExtension($ImagePath)
    $NewImageName = "$MarkdownBaseName-$Counter$ImageExtension"
    $NewImagePath = Join-Path $MarkdownDir $NewImageName

    # Rename the image file
    Rename-Item -Path $FullImagePath -NewName $NewImageName

    # Increment the counter
    $Counter++

    # Return the updated markdown tag
    return $Match.Value -replace [regex]::Escape($ImagePath), $NewImageName
}

# Write the updated content back to the markdown file
Set-Content -Path $MarkdownFile -Value $UpdatedContent

Write-Host "Image renaming and markdown update completed successfully."