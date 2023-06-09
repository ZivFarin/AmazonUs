import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

def registration(name):
    return f"""\
<html>
  <body>
    <p>{name},</p>
    <p>Enjoying your shopping experience on AmazonUS! We are thrilled to have you as a member of our growing community.</p>
    <p>Here's how it works:</p>
    <ol>
      <li>Browse through the vast selection of products available on AmazonUS and find something you love that is priced under $49.</li>
      <li>Copy the product link from AmazonUS and head over to our website.</li>
      <li>Paste the product link into our user-friendly interface, and our advanced algorithm will get to work.</li>
      <li>Our algorithm will search for other users in your region who have uploaded products that, when combined with your selected item, total a cost above $49. This way, you can benefit from free shipping!</li>
      <li>Once the algorithm finds a suitable match, you will be presented with the option to add the additional product(s) to your cart.</li>
      <li>Review your cart to ensure the combined cost exceeds $49, and proceed to checkout on our website.</li>
      <li>Complete your order with us, and we will take care of the rest. Your selected item and the additional product(s) will be ordered from AmazonUS, and we'll handle the shipping logistics.</li>
    </ol>
    <p>By utilizing this feature, you not only discover great deals on AmazonUS but also benefit from free shipping on your order. It's a win-win situation!</p>
    <p>Thank you for choosing our website as your trusted shopping companion. We are committed to providing you with an exceptional experience and helping you save more on your favorite products.</p>
    <p>Happy shopping and enjoy the convenience of free shipping!</p>
    <p>Team AmazonUs</p>
  </body>
</html>
"""


def create_upload_mail(user_name, item_name):
    message = f"""\
    <html>
    <body>
        <p>Dear {user_name},</p>
        <p>Thank you for uploading the item '{item_name}' on our website!</p>
        <p>Our advanced algorithm will now search for matching items from other users that, when combined with your item, total a cost above $49. Once we find a suitable match, we will notify you so that you can proceed with the order.</p>
        <p>If you have any questions or need further assistance, please feel free to reach out to our customer support team.</p>
        <p>Thank you again for using our website!</p>
        <p>Team AmazonUs</p>
    </body>
    </html>
    """
    return message

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

def create_purchase_reminder_mail(user_name, item_name):
    message = f"""\
    <html>
    <body>
        <p>Dear {user_name},</p>
        <p>We noticed that you have an outstanding purchase on our website.</p>
        <p>Your selected item '{item_name}' is waiting for you in your shopping cart. Don't miss out on this opportunity to complete your purchase!</p>
        <p>Visit our website and proceed to checkout to finalize your order. Remember, by completing the purchase, you can benefit from free shipping on your item.</p>
        <p>If you have any questions or need assistance, please feel free to reach out to our customer support team.</p>
        <p>Thank you for considering our website for your purchase!</p>
        <p>Team AmazonUs</p>
    </body>
    </html>
    """
    return message

def create_collection_confirmation_mail(user_name, item_name):
    message = f"""\
<html>
  <body>
    <p>Dear {user_name},</p>
    <p>Thank you for collecting your item '{item_name}'!</p>
    <p>Enjoy your new product and the benefits it brings! If you encounter any issues or require assistance, please do not hesitate to contact our customer support team. We are here to help.</p>
    <p>Thank you for choosing our website for your purchase!</p>
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