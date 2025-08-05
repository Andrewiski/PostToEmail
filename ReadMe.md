A Simple HTTP Post data and forward to an email address

to Test Local in Visual Studio Code create a localDebug.env file

'''
EMAIL_USER=user@gmail.com
EMAIL_PASS=app password 
EMAIL_RECIPIENT=someuser@example.com
PORT=8080
'''
To Create Google App Password Visit https://myaccount.google.com/apppasswords

Run via Docker 

'''
docker run -d --name posttoemail --env EMAIL_USER=user@gmail.com --env EMAIL_PASS=app password --env EMAIL_RECIPIENT=someuser@example.com --env PORT=8080 -p:8080:8080 andrewiski/posttoemail
'''

or use .env file

'''
docker run -d --name posttoemail --env-file posttoemail.env -p:8080:8080 andrewiski/posttoemail


'''