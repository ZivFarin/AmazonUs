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
