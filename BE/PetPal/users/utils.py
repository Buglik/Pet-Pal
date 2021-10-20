from django.core.mail import EmailMessage


class Util:
    @staticmethod
    def send_email(data):
        email = EmailMessage(subject=data['email_subject'], body=data['email_body'], to=[data['email_to']])
        email.send()

    @staticmethod
    def sent_activation_email(absurl, user):
        email_body = 'Hi ' + user.username + ', use a link below to verify your email \n' + absurl + '\n' + 'Link is valid for 15 minutes'
        data = {'email_body': email_body, 'email_subject': '[PetPal] Verify your email', 'email_to': user.email}
        Util.send_email(data)
