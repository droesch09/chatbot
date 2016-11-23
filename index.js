var express = require('express')
var bodyParser = require('body-parser')
var request = require('request')
var app = express()

app.set('port', (process.env.PORT || 5000))

// Process application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}))

// Process application/json
app.use(bodyParser.json())

// Index route
app.get('/', function (req, res) {
    res.send('Hello world, I am a chat bot')
})

// for Facebook verification
app.get('/webhook/', function (req, res) {
    if (req.query['hub.verify_token'] === 'my_voice_is_my_password_verify_me') {
        res.send(req.query['hub.challenge'])
    }
    res.send('Error, wrong token')
})



app.post('/webhook/', function (req, res) {
    messaging_events = req.body.entry[0].messaging
    for (i = 0; i < messaging_events.length; i++) {
        event = req.body.entry[0].messaging[i]
        sender = event.sender.id
        if (event.message && event.message.text) {
            text = event.message.text
            if (text.includes('Hello') || text.includes('Hi') || text.includes('hi') || text.includes('Hallo') || text.includes('hallo') || text.includes('hello') || text.includes('Hey') || text.includes('hey')) {
                sendGenericMessage(sender)
                continue
            } 
            else if (text === 'praktikum' || text === 'Praktikum') {
                sendPraktikumMessage(sender)
                continue
            }
            else if (text === 'einstieg' || text === 'Einstieg') {
                sendEinstiegMessage(sender)
                continue
            }            
            else if (text === 'Über Daniel') {
                sendAboutMessage(sender)
                continue
            }
            else if (text.includes('@daniel') || text.includes('@Daniel')) {
                sendDanielMessage(sender)
                continue
            }
            sendTextMessage(sender, "Das habe ich leider nicht verstanden, sorry! Ich werde für dich bei Daniel nachfragen... :).\nBei diesen Dingen kann ich dir gerne sofort helfen:")
        }
    }
    res.sendStatus(200)
})

var token = "EAAFKotdMmt4BACFX4ZA6xPC4hOKZBrbTZAX5foCEKva2KMlXOGGq2DelsWOQDZBCpUZCg11Fdsq0HRZAy7MsqTb95ZAunkXUX9PJzCJqZBpcU2eXJqQT7PQA5tALk9dOGTr0lsVhY1BEPR3ZCbZAq7hZAESoPhbL1lZCJINGDt3kX4yrPwZDZD"

function sendTextMessage(sender, text) {
    messageData = {
        text:text,
        quick_replies: [
        {
          "content_type":"text",
          "title":"Praktikum",
            "payload":"DEVELOPER_DEFINED_PAYLOAD_FOR_PICKING_Praktikum"
        },
        {
          "content_type":"text",
          "title":"Einstieg",
            "payload":"DEVELOPER_DEFINED_PAYLOAD_FOR_PICKING_Einstieg"
        },
        {
          "content_type":"text",
          "title":"Über Daniel",
            "payload":"DEVELOPER_DEFINED_PAYLOAD_FOR_PICKING_ÜberDaniel"
        }
    ]
    }
    request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: {access_token:token},
        method: 'POST',
        json: {
            recipient: {id:sender},
            message: messageData,
        }
    }, function(error, response, body) {
        if (error) {
            console.log('Error sending messages: ', error)
        } else if (response.body.error) {
            console.log('Error: ', response.body.error)
        }
    })
}


function sendGenericMessage(sender) {
    messageData = {
        text:"Hallo, ich bin Mr. Career und arbeite für Daniel Rösch.\nIch kann dich über einige Dinge sofort informieren:\noder schreibe @daniel um direkt mit Daniel zu chatten.",
        quick_replies: [
        {
          "content_type":"text",
          "title":"Praktikum",
            "payload":"DEVELOPER_DEFINED_PAYLOAD_FOR_PICKING_Praktikum"
        },
        {
          "content_type":"text",
          "title":"Einstieg",
            "payload":"DEVELOPER_DEFINED_PAYLOAD_FOR_PICKING_Einstieg"
        },
        {
          "content_type":"text",
          "title":"Über Porsche",
            "payload":"DEVELOPER_DEFINED_PAYLOAD_FOR_PICKING_ÜberDaniel"
        }
    ]
    }
    request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: {access_token:token},
        method: 'POST',
        json: {
            recipient: {id:sender},
            message: messageData,
        }
    }, function(error, response, body) {
        if (error) {
            console.log('Error sending messages: ', error)
        } else if (response.body.error) {
            console.log('Error: ', response.body.error)
        }
    })
}

function sendPraktikumMessage(sender) {
    messageData = {
        text:"Daniel benötigt gerade unbedingt Unterstützung einigen Bereichen.\nWähle einfach unten den Bereich aus, der dich interessiert und ich zeige dir passende Stellen.",
        quick_replies: [
        {
          "content_type":"text",
          "title":"Connected Car",
            "payload":"asdf"
        },
        {
          "content_type":"text",
          "title":"Entwicklung",
            "payload":"DEVELOPER_DEFINED_PAYLOAD_FOR_PICKING_Einstieg"
        },   
        {
          "content_type":"text",
          "title":"IT",
            "payload":"DEVELOPER_DEFINED_PAYLOAD_FOR_PICKING_Einstieg"
        },   
        {
          "content_type":"text",
          "title":"Einstieg",
            "payload":"DEVELOPER_DEFINED_PAYLOAD_FOR_PICKING_Einstieg"
        },
        {
          "content_type":"text",
          "title":"Über Daniel",
            "payload":"DEVELOPER_DEFINED_PAYLOAD_FOR_PICKING_ÜberDaniel"
        }
    ]
    }
    request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: {access_token:token},
        method: 'POST',
        json: {
            recipient: {id:sender},
            message: messageData,
        }
    }, function(error, response, body) {
        if (error) {
            console.log('Error sending messages: ', error)
        } else if (response.body.error) {
            console.log('Error: ', response.body.error)
        }
    })
}

function sendPraktikumMessage2(sender) {
    var url = getPorscheURL("5", "141");
    console.log(url);
    messageData = {
        text:url,
        quick_replies: [
        {
          "content_type":"text",
          "title":"Einstieg",
            "payload":"DEVELOPER_DEFINED_PAYLOAD_FOR_PICKING_Einstieg"
        },
        {
          "content_type":"text",
          "title":"Über Daniel",
            "payload":"DEVELOPER_DEFINED_PAYLOAD_FOR_PICKING_ÜberDaniel"
        }
    ]
    }
    request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: {access_token:token},
        method: 'POST',
        json: {
            recipient: {id:sender},
            message: messageData,
        }
    }, function(error, response, body) {
        if (error) {
            console.log('Error sending messages: ', error)
        } else if (response.body.error) {
            console.log('Error: ', response.body.error)
        }
    })
}

function sendEinstiegMessage(sender) {
    messageData = {
        text: "Studium fertig? Perfekt! Daniel sucht gerade Absolventen in folgenden Bereichen:\nTee kochen\nWäsche waschen\nBier brauen\nInteressiert dich ein Bereich? Dann schreibe das am besten mit @daniel direkt an Daniel.",
         quick_replies: [
        {
          "content_type":"text",
          "title":"Praktikum",
            "payload":"DEVELOPER_DEFINED_PAYLOAD_FOR_PICKING_Praktikum"
        },
        {
          "content_type":"text",
          "title":"Über Daniel",
            "payload":"DEVELOPER_DEFINED_PAYLOAD_FOR_PICKING_ÜberDaniel"
        }
    ]
    }
    request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: {access_token:token},
        method: 'POST',
        json: {
            recipient: {id:sender},
            message: messageData,
        }
    }, function(error, response, body) {
        if (error) {
            console.log('Error sending messages: ', error)
        } else if (response.body.error) {
            console.log('Error: ', response.body.error)
        }
    })
}

function sendAboutMessage(sender) {
    messageData = {
        text: "Daniel ist ein professioneller Facebook Developer und hat mich am 15.11.2016 ins Leben gerufen. Erfahre mehr über Daniel und seine Projekte auf https://github.com/droesch09",
         quick_replies: [
        {
          "content_type":"text",
          "title":"Praktikum",
            "payload":"DEVELOPER_DEFINED_PAYLOAD_FOR_PICKING_Praktikum"
        },
        {
          "content_type":"text",
          "title":"Einstieg",
            "payload":"DEVELOPER_DEFINED_PAYLOAD_FOR_PICKING_Einstieg"
        }
    ]
    }
    request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: {access_token:token},
        method: 'POST',
        json: {
            recipient: {id:sender},
            message: messageData,
        }
    }, function(error, response, body) {
        if (error) {
            console.log('Error sending messages: ', error)
        } else if (response.body.error) {
            console.log('Error: ', response.body.error)
        }
    })
}

function sendDanielMessage(sender) {
    messageData = {
        text: "Ich habe dein Anliegen an Daniel weitergeleitet. Er wird sich bald bei dir melden. Kann ich solange etwas anderes für dich tun?",
         quick_replies: [
        {
          "content_type":"text",
          "title":"Praktikum",
            "payload":"DEVELOPER_DEFINED_PAYLOAD_FOR_PICKING_Praktikum"
        },
        {
          "content_type":"text",
          "title":"Einstieg",
            "payload":"DEVELOPER_DEFINED_PAYLOAD_FOR_PICKING_Einstieg"
        },
        {
          "content_type":"text",
          "title":"Über Daniel",
            "payload":"DEVELOPER_DEFINED_PAYLOAD_FOR_PICKING_ÜberDaniel"
        }
    ]
    }
    request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: {access_token:token},
        method: 'POST',
        json: {
            recipient: {id:sender},
            message: messageData,
        }
    }, function(error, response, body) {
        if (error) {
            console.log('Error sending messages: ', error)
        } else if (response.body.error) {
            console.log('Error: ', response.body.error)
        }
    })
}

function getPorscheURL(entryLevel, activityLevel){
    return "https://jobs.porsche.com/index.php?ac=search_result&ac=search_result&search_criterion_activity_level=" + activityLevel + "&search_criterion_entry_level=" + entryLevel + "&btn_dosearch=1000+Treffer+#search-options";
}

// Spin up the server
app.listen(app.get('port'), function() {
    console.log('running on port', app.get('port'))
})

