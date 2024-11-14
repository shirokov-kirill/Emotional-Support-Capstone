import smtplib
import sys
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText


msg_template = """
<!DOCTYPE html>
<html>
<head>
    <style>
        body {
            font-family: Arial, Helvetica, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f0f0f0;
        }
        .container {
            width: 80%;
            margin: 0 auto;
            padding: 20px;
            text-align: center;
        }
        .content {
            background-color: #fff;
            border-radius: 10px;
            padding: 20px;
            margin-top: 20px;
        }
        h1, p {
            color: #333;
        }
        .button {
            display: inline-block;
            background-color: #4070f4;
            color: #ffffff;
            padding: 10px 20px;
            margin-top: 20px;
            text-decoration: none;
            border-radius: 5px;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>[ACTION_NAME]</h1>
        <div class="content">
            <p>Hi, [USER_NAME]!</p>
            [TEXT]
            <a href="https://emotionalsupport.life/" class="button">Contact Us</a>
        </div>
    </div>
</body>
</html>
"""

def send_email_to_user(to_address, subject, email_body_html):
    smtp_server = "smtp.gmail.com"
    smtp_port = 587

    sender_password = "qoee mxln acxi occo"
    sender_email = "emotional.app52@gmail.com"

    try:
        msg = MIMEMultipart()
        msg['From'] = sender_email
        msg['To'] = to_address
        msg['Subject'] = subject

        msg.attach(MIMEText(email_body_html, 'html'))

        with smtplib.SMTP(smtp_server, smtp_port) as server:
            server.starttls()
            server.login(sender_email, sender_password)
            server.send_message(msg)
    except Exception as e:
        print(f"Failed to send email. Error: {str(e)}")


email = sys.argv[1]
name = sys.argv[2]
text = sys.argv[3]
action_name = sys.argv[4]

msg_html = msg_template.replace("[USER_NAME]", name)
msg_html = msg_html.replace("[ACTION_NAME]", action_name)
msg_html = msg_html.replace("[TEXT]", text)
send_email_to_user(email, f"Alert: {action_name}", msg_html)
