# cPanel Deployment Guide

This repository contains a web application ready for deployment on cPanel.

## Quick Deployment

### Step 1: Create Deployment Package

Run the deployment script to create a clean zip file:

```bash
./create-deployment-package.sh
```

This will create `cpanel-deployment.zip` containing all necessary files for deployment.

### Step 2: Upload to cPanel

1. Log in to your cPanel account
2. Navigate to **File Manager**
3. Go to the `public_html` directory (or your desired deployment directory)
4. Click **Upload** and upload the `cpanel-deployment.zip` file
5. After upload completes, right-click on the zip file and select **Extract**
6. Delete the zip file after successful extraction

### Step 3: Set Permissions (if needed)

For PHP files to work correctly, you may need to set proper permissions:
- PHP files: 644
- Directories: 755

## What's Included

The deployment package contains:
- HTML files (index.html, Services.html, etc.)
- CSS files (in css/ directory)
- PHP files (process_form.php)
- Images (PNG files)
- Server.js (Node.js server - optional for cPanel)
- Google verification files
- Sitemap

## What's Excluded

The following are automatically excluded from the deployment package:
- `.git` directory and all Git metadata
- The deployment script itself
- Any previous deployment zip files

## Verification

The deployment script automatically:
- ✅ Tests the zip file integrity
- ✅ Lists all files included
- ✅ Shows the package size
- ✅ Ensures no duplicate files
- ✅ Ensures clean extraction without errors

## Notes for Node.js (Server.js)

If you plan to use the Node.js server (`Server.js`), you'll need to:
1. Install Node.js on your cPanel hosting (check if Node.js is available)
2. Install dependencies: `npm install express mongoose cors helmet express-rate-limit express-validator nodemailer morgan dotenv`
3. Configure your `.env` file with necessary environment variables
4. Set up Node.js application through cPanel's interface

For static HTML deployment (most common cPanel use case), the Server.js file is optional and the HTML/PHP/CSS files will work directly.

## Troubleshooting

**Issue:** Files have wrong permissions after extraction
- **Solution:** Use cPanel File Manager to set permissions (644 for files, 755 for directories)

**Issue:** PHP forms not working
- **Solution:** Ensure PHP is enabled and process_form.php has correct permissions

**Issue:** Zip extraction fails
- **Solution:** Re-create the package using the script and re-upload

## Support

For issues with deployment, check:
1. cPanel error logs
2. PHP error logs  
3. Browser console for client-side errors
