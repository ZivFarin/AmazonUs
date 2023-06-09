def create_match_found_mail(user_name, item_name):
    message = f"""\
<html>
  <body>
    <p>Dear {user_name},</p>
    <p>We have great news for you!</p>
    <p>Your item '{item_name}' has been matched!</p>
    <p>Please visit our website and continue with the payment so you can enjoy the benefit of free shipping on your order.</p>
    <p>If you have any questions or need further assistance, please feel free to reach out to our customer support team.</p>
    <p>Thank you for using our website!</p>
    <p>Team AmazonUs</p>
  </body>
</html>
"""
    return message

def send_email(user_mail,subject ,message):
    # Create a multipart message
    msg = MIMEMultipart()
    msg['From'] = "AmazonUsILService@gmail.com"
    msg['To'] = user_mail
    msg['Subject'] = subject
    # Attach the message to the email
    msg.attach(MIMEText(message, 'html'))
    # creates SMTP session
    s = smtplib.SMTP('smtp.gmail.com', 587)
    s.ehlo()
    # start TLS for security
    s.starttls()
    # Authentication
    s.login("AmazonUsILService@gmail.com", "lswugvhjepztmkhf")
    # sending the mail
    s.send_message(msg)
    # terminating the session
    s.quit()