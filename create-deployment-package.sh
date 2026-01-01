#!/bin/bash

# cPanel Deployment Package Creator
# This script creates a clean zip file for cPanel deployment

echo "Creating cPanel deployment package..."

# Define the output zip file name
OUTPUT_ZIP="cpanel-deployment.zip"

# Remove old deployment package if it exists
if [ -f "$OUTPUT_ZIP" ]; then
    echo "Removing old deployment package..."
    rm "$OUTPUT_ZIP"
fi

# Create zip file excluding .git directory and the deployment script itself
echo "Packaging files..."
zip -r "$OUTPUT_ZIP" . \
    -x "*.git*" \
    -x "*create-deployment-package.sh" \
    -x "*cpanel-deployment.zip"

if [ $? -eq 0 ]; then
    echo "✓ Deployment package created successfully: $OUTPUT_ZIP"
    echo ""
    echo "Package contents:"
    unzip -l "$OUTPUT_ZIP"
    echo ""
    echo "Package size: $(du -h "$OUTPUT_ZIP" | cut -f1)"
else
    echo "✗ Error creating deployment package"
    exit 1
fi
