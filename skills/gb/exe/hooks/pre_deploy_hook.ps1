# Powershell script for ask-cli pre-deploy hook for Node.js
# Script Usage: pre_deploy_hook.ps1 <SKILL_NAME> <DO_DEBUG> <TARGET>
 
# SKILL_NAME is the preformatted name passed from the CLI, after removing special characters.
# DO_DEBUG is boolean value for debug logging
# TARGET is the deploy TARGET provided to the CLI. (eg: all, skill, lambda etc.)
 
# Run this script under the skill root folder
 
# The script does the following:
#  - Builds each sourceDir in skill.json

param( 
    [string] $SKILL_NAME,
    [bool] $DO_DEBUG = $False,
    [string] $TARGET = "all"
)

if ($DO_DEBUG) {
    Write-Output "###########################"
    Write-Output "##### pre-deploy hook #####"
    Write-Output "###########################"
}

if ($TARGET -eq "all" -Or $TARGET -eq "lambda") {
    powershell.exe -Command "Set-Location `"lambda\custom`" `n rush install `n rush rebuild"

    if ($DO_DEBUG) {
        Write-Output "###########################"
    }
}

exit 0
