# cPanel Deployment Instructions

## ✅ Your Deployment Package is Ready!

The file `cpanel-deployment.zip` (3.6MB) has been created and is ready to deploy to cPanel.

## 📦 What's Inside

The package contains 19 files including:
- **HTML Pages**: index.html, Services.html, about.html, apps-systems.html, and more
- **Styling**: css/modern-style.css
- **Backend**: process_form.php (for forms), Server.js (optional Node.js)
- **Images**: Picture1.png, image07.png
- **SEO**: sitemap.xml, Google verification files
- **Documentation**: DEPLOYMENT.md, QUICKSTART.md

## 🚀 Step-by-Step Deployment

### Method 1: Extract Directly in public_html (RECOMMENDED)

1. **Login to cPanel**
   - Go to your hosting provider's cPanel login page
   - Enter your credentials

2. **Navigate to File Manager**
   - Find "File Manager" in cPanel (usually under "Files" section)
   - Click to open it

3. **Go to public_html**
   - In File Manager, navigate to the `public_html` directory
   - This is where your website files should be

4. **Clean the Directory (IMPORTANT)**
   - **Before uploading**, make sure `public_html` is empty or backup existing files
   - Delete old files if this is a fresh deployment
   - Having old files can cause conflicts

5. **Upload the Zip File**
   - Click the "Upload" button at the top
   - Select `cpanel-deployment.zip` from your computer
   - Wait for upload to complete (3.6MB should take 10-30 seconds)

6. **Extract the Zip File**
   - Go back to File Manager
   - Find `cpanel-deployment.zip` in the file list
   - **Right-click** on it → Select **"Extract"**
   - A dialog will appear - click **"Extract File(s)"**
   - Files will be extracted to the current directory

7. **Delete the Zip File**
   - After successful extraction, delete `cpanel-deployment.zip`
   - This frees up space and keeps things clean

8. **Verify File Structure**
   - You should see files directly in `public_html/`:
     ```
     public_html/
     ├── index.html
     ├── Services.html
     ├── about.html
     ├── css/
     │   └── modern-style.css
     ├── process_form.php
     ├── Picture1.png
     └── ... (other files)
     ```

### Method 2: Extract Locally First (Alternative)

If extraction in cPanel doesn't work:

1. Extract `cpanel-deployment.zip` on your computer first
2. Upload the **individual files** (not the zip) to `public_html`
3. Maintain the folder structure (keep css/ as a subdirectory)

## ⚠️ Common Issues & Solutions

### Issue: "Site shows directory listing instead of website"
**Cause**: index.html is not in the right location
**Solution**: Make sure `index.html` is directly in `public_html/`, not in a subdirectory

### Issue: "CSS/Styling not loading"
**Cause**: CSS folder path is wrong
**Solution**: 
- Verify `css/modern-style.css` exists
- Check that HTML files reference it correctly as `css/modern-style.css`

### Issue: "Images not displaying"
**Cause**: Image files not uploaded or wrong path
**Solution**: 
- Verify `Picture1.png` and `image07.png` are in `public_html/`
- Check file permissions are 644

### Issue: "Contact form not working"
**Cause**: PHP file has wrong permissions or PHP is disabled
**Solution**: 
- Set `process_form.php` permissions to 644
- Verify PHP is enabled in cPanel
- Check PHP error logs in cPanel

### Issue: "Files extracted to wrong location"
**Cause**: Extracted in subdirectory instead of public_html
**Solution**: 
- Move all files from the subdirectory to `public_html/`
- Or delete and re-extract directly in `public_html/`

### Issue: "Previous deployment not working"
**Likely Causes**:
1. Zip file was extracted into a subdirectory (e.g., `public_html/web/`)
2. Old files are conflicting with new files
3. File permissions are incorrect
4. Wrong extraction method was used

**Solution**: 
1. Clear `public_html/` completely (backup first!)
2. Follow Method 1 above carefully
3. Ensure extraction happens directly in `public_html/`
4. Verify file structure matches the example above

## 🔧 File Permissions

After deployment, verify permissions:
- **Directories**: 755 (drwxr-xr-x)
- **HTML/CSS files**: 644 (-rw-r--r--)
- **PHP files**: 644 (-rw-r--r--)
- **Image files**: 644 (-rw-r--r--)

To set permissions in cPanel File Manager:
1. Right-click on file/folder
2. Select "Change Permissions"
3. Enter the correct value

## ✅ Verification Steps

After deployment:

1. **Check Homepage**: Visit `http://yourdomain.com`
   - Should load index.html
   - CSS should be applied (modern styling visible)
   - Images should display

2. **Check Other Pages**: 
   - Visit `/Services.html`
   - Visit `/about.html`
   - All should load correctly

3. **Check Form**: 
   - Go to `/enquiry-form.html`
   - Try submitting (should be handled by process_form.php)

4. **Check File Structure in cPanel**:
   - Files should be at root of `public_html/`
   - Not in a subdirectory
   - Verify file sizes match (index.html ~30KB, Picture1.png ~3.5MB)

## 📝 Important Notes

- **Do NOT** upload the zip file to a subdirectory
- **Do NOT** extract files with nested folders
- **Always** extract directly in `public_html/`
- **Server.js is optional** - Only needed if you want Node.js functionality
- **For static site**: HTML + CSS + PHP is all you need

## 🆘 Still Having Issues?

1. **Check cPanel Error Logs**:
   - Go to cPanel → Metrics → Errors
   - Look for recent errors

2. **Check File Manager**:
   - Verify all files are present
   - Check file sizes match (index.html should be ~30KB, Picture1.png ~3.5MB)

3. **Clear Browser Cache**:
   - Press Ctrl+F5 (Windows) or Cmd+Shift+R (Mac)
   - Or try incognito/private browsing mode

4. **Contact Support**:
   - If issues persist, contact your hosting provider
   - Share this deployment guide with them

## 📞 Quick Support Checklist

If contacting support, provide:
- ✅ Zip file used: cpanel-deployment.zip (3.6MB)
- ✅ Deployment location: public_html/
- ✅ Expected result: Static website with 19 files
- ✅ Actual result: [describe what you see]
- ✅ Error messages: [from cPanel or browser console]

---

**Package Size**: 3.6MB
**File Count**: 19 files
**Deployment Method**: cPanel File Manager
