param (
    [string]$MarkdownFile
)
# chmod +x image-rename.ps1
# .\image-rename.ps1 .\2025-03-01-community-university-of-sydney-syncs-ai-poster.md

$MarkdownFile = Join-Path -Path (Get-Location) -ChildPath $MarkdownFile

# Check if the file exists
if (-Not (Test-Path $MarkdownFile)) {
    Write-Host "Markdown file not found: $MarkdownFile"
    exit 1
}

# Read the content of the markdown file
$MarkdownContent = Get-Content $MarkdownFile
$MarkdownContentNew = $MarkdownContent

# Extract the directory of the markdown file
$MarkdownDir = Split-Path -Path $MarkdownFile

# Extract the base name of the markdown file (without extension)
$MarkdownBaseName = [System.IO.Path]::GetFileNameWithoutExtension($MarkdownFile)

# Regex to match ![alt text](xxx) tags
$ImageRegex = '!\[.*?\]\((.*?)\)'

# Process each match in a loop
$MatchList = [regex]::Matches($MarkdownContent, $ImageRegex)

$NewImageNames = @()
foreach ($Match in $MatchList) {
    # Increment the counter
    $ImagePath = $Match.Groups[1].Value

    # Get the full path of the image
    $FullImagePath = Join-Path $MarkdownDir $ImagePath

    if (-Not (Test-Path $FullImagePath)) {
        Write-Host "Image file not found: $FullImagePath"
    }

    # Call gpt.ps1 with the content and image full path
    $Description = & ../script/gpt.ps1 -Blog ($MarkdownContent -replace '<.*?>', '') -ImagePath $FullImagePath
    Write-Host $Description

    $MarkdownContentNew = $MarkdownContentNew -replace [regex]::Escape($Match.Value), "![${Description}]($ImagePath)"
}


Set-Content -Path $MarkdownFile -Value $MarkdownContentNew

# # Write the updated content back to the markdown file
# if ($CounterUpdate -gt 0) {
#     Set-Content -Path $MarkdownFile -Value $MarkdownContent
#     Write-Host "Image renaming and markdown update completed successfully."
# }
