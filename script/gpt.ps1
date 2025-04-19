param (
    [string]$ImagePath,
    [string]$blog
)

# Check if the image file exists
if (-Not (Test-Path $ImagePath)) {
    Write-Host "Image file not found: $ImagePath"
    exit 1
}


# Write-Host "blog: $ImagePath"
# Write-Host "blog: $blog"

# Convert the image to a Base64 string
$ImageBytes = [System.IO.File]::ReadAllBytes($ImagePath)
$Base64Image = [Convert]::ToBase64String($ImageBytes)

# Prepare the request body
$RequestBody = @"
{
  "messages": [
    {
      "role": "system",
      "content": [
        {
          "type": "text",
          "text": "You are an AI assistant that helps people find information."
        }
      ]
    },
    {
      "role": "user",
      "content": [
        {
          "type": "text",
          "text": "please summarize the photo in 6 words or less for image markdown description. Do NOT use quotation mark. the photo is based on this blog: $blog"
        },
        {
          "type": "image",
          "image": "$Base64Image"
        }
      ]
    }
  ],
  "temperature": 0.7,
  "top_p": 0.95,
  "max_tokens": 800
}
"@

# Send the request to Azure OpenAI
try {
    $Response = Invoke-RestMethod -Uri "https://test23233232.openai.azure.com/openai/deployments/gpt-4o/chat/completions?api-version=2025-01-01-preview" `
        -Method Post `
        -Headers @{
            "Content-Type" = "application/json"
            "api-key" = "xxx"
        } `
        -Body $RequestBody

    # Output the description
    Write-Host "Image Description: $($Response.choices[0].message.content)"
} catch {
    Write-Host "Error: $($_.Exception.Message)"
}

return $($Response.choices[0].message.content)