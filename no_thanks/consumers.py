from channels import Group

def ws_add(message):
    message.reply_channel.send({"accept": True})
    Group("socket").add(message.reply_channel)

def ws_message(message):
    Group("socket").send({
        "text": message.content['text'],
    })

def ws_disconnect(message):
    Group("socket").discard(message.reply_channel)
