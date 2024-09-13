# First create a google sheet file

# Second: Go to the tab Extensions and choose App Script to create Google App Script linked to your current google sheet file

# Add all of code file Google App Script with correct filename

# Using these cURL command line to testing it

## Read data

curl --location 'https://script.google.com/macros/s/get_from_your_deploy_link/exec?action=read'

## Add data

curl --location --request POST 'https://script.google.com/macros/s/get_from_your_deploy_link/exec?action=add&name=John%20Doe%209&age=31&city=New%20York&active=true'
