@echo off
echo Starting Git push process...

REM Initialize Git repository if not already done
if not exist ".git" (
    echo Initializing Git repository...
    git init
)

REM Add all files
echo Adding files to Git...
git add .

REM Commit changes
echo Committing changes...
git commit -m "Update website with KSP logo and navigation"

REM Check if remote exists, if not prompt for GitHub URL
git remote -v >nul 2>&1
if errorlevel 1 (
    echo.
    echo No GitHub repository connected yet.
    echo Please create a new repository on GitHub.com
    echo Then copy the repository URL and paste it below:
    set /p github_url="Enter GitHub repository URL: "
    git remote add origin %github_url%
)

REM Push to GitHub
echo Pushing to GitHub...
git push -u origin main

REM If main branch doesn't exist, try master
if errorlevel 1 (
    echo Trying master branch...
    git push -u origin master
)

echo.
echo Done! Your website is now on GitHub.
echo You can share the GitHub Pages URL with others.
pause 