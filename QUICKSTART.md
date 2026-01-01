# Quick Start - cPanel Deployment

## Create Package
```bash
./create-deployment-package.sh
```

## Upload to cPanel
1. Login to cPanel
2. File Manager → public_html
3. Upload `cpanel-deployment.zip`
4. Right-click → Extract
5. Delete zip file

## What's Included
✅ All HTML, CSS, PHP, JS files
✅ Images and assets
✅ Google verification files
✅ Sitemap

## What's Excluded
❌ .git directory
❌ Development files (.env, node_modules)
❌ IDE files (.vscode, .idea)
❌ Deployment scripts

## Verification
The script automatically:
- Tests zip integrity
- Lists all files
- Shows package size
- Ensures no duplicates

**Package size:** ~3.6M
**File count:** 15 files

For detailed instructions, see DEPLOYMENT.md
