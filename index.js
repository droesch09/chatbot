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
                    else if (text === "Einstieg bei Porsche") {
                        sendEinstiegBeiPorscheMessage(sender)
                        continue
                    }
                    else if (text === "Über Porsche") {
                        sendÜberPorscheMessage(sender)
                        continue
                    }
                    else if (text === "Events") {
                        sendEventsMessage(sender)
                        sendEventsMessage2(sender)
                        continue
                    }
                    // Ebene 2
                    else if (text === "Porsche im Profil") {
                        sendPorscheImProfilMessage(sender)
                        continue
                    }
                    else if (text === "Porsche als Arbeitge...") {
                        sendPorscheAlsArbeitgeberMessage(sender)
                        continue
                    }
                    else if (text === "Praktikum") {
                        sendPraktikumMessage(sender)
                        continue
                    }
                    else if (text.includes('@Help') || text.includes('@help')) {
                        sendHelpMessage(sender)
                        continue
                    }
                    else if (text.includes('Zurück') || text.includes('zurück')) {
                        sendZurueckMessage(sender)
                        continue
                    }
                    sendTextMessage(sender, "Das habe ich leider nicht verstanden, sorry! Ich werde für dich bei einem Mitarbeiter nachfragen... :).\nBei diesen Dingen kann ich dir gerne sofort helfen:")
            }
    }
    res.sendStatus(200)
})



var token = "EAAFKotdMmt4BACFX4ZA6xPC4hOKZBrbTZAX5foCEKva2KMlXOGGq2DelsWOQDZBCpUZCg11Fdsq0HRZAy7MsqTb95ZAunkXUX9PJzCJqZBpcU2eXJqQT7PQA5tALk9dOGTr0lsVhY1BEPR3ZCbZAq7hZAESoPhbL1lZCJINGDt3kX4yrPwZDZD"



//---------------------------------Ebene 0---------------------------------

function sendTextMessage(sender, text) {
    messageData = {
        text:text,
               quick_replies: [
        {
          "content_type":"text",
          "title":"Einstieg bei Porsche",
            "payload":"EinstiegBeiPorsche1"
        },
        {
          "content_type":"text",
          "title":"Über Porsche",
            "payload":"ÜberPorsche1"
        },
        {
          "content_type":"text",
          "title":"Events",
            "payload":"Events1"
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
        text:"Hallo, ich bin Mr. Career und arbeite für Porsche.\nIch kann dich über einige Dinge sofort informieren. Tippe dazu einfach auf einen der Vorschläge weiter unten.\noder schreibe @hilfe um direkt mit einem Mitarbeiter zu chatten.",
        quick_replies: [
        {
          "content_type":"text",
          "title":"Einstieg bei Porsche",
            "payload":"EinstiegBeiPorsche1"
        },
        {
          "content_type":"text",
          "title":"Über Porsche",
            "payload":"ÜberPorsche1"
        },
        {
          "content_type":"text",
          "title":"Events",
            "payload":"Events1"
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

function sendHelpMessage(sender) {
    messageData = {
        text: "Ich habe dein Anliegen an einen unserer Mitarbeiter weitergeleitet. Dieser wird sich bald bei dir melden. Kann ich solange etwas anderes für dich tun?",
        quick_replies: [
        {
          "content_type":"text",
          "title":"Einstieg bei Porsche",
            "payload":"EinstiegBeiPorsche1"
        },
        {
          "content_type":"text",
          "title":"Über Porsche",
            "payload":"ÜberPorsche1"
        },
        {
          "content_type":"text",
          "title":"Events",
            "payload":"Events1"
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

function sendZurueckMessage(sender) {
    messageData = {
        text: "Alles klar! Wie kann ich dir behilflich sein?",
        quick_replies: [
        {
          "content_type":"text",
          "title":"Einstieg bei Porsche",
            "payload":"EinstiegBeiPorsche1"
        },
        {
          "content_type":"text",
          "title":"Über Porsche",
            "payload":"ÜberPorsche1"
        },
        {
          "content_type":"text",
          "title":"Events",
            "payload":"Events1"
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

//---------------------------------Ebene 1---------------------------------
function sendEinstiegBeiPorscheMessage(sender) {
    messageData = {
        text:"Schön, dass du dich für einen Einstieg bei Porsche interessierst :) Wähle nun eine Einstiegsart aus.",
        quick_replies: [
        {
          "content_type":"text",
          "title":"Praktikum",
            "payload":"Praktikum2"
        },
        {
          "content_type":"text",
          "title":"Abschlussarbeit",
            "payload":"Abschlussarbeit2"
        },   
        {
          "content_type":"text",
          "title":"Schülerpraktikum",
            "payload":"Schülerpraktikum2"
        },   
        {
          "content_type":"text",
          "title":"Vorpraktikum",
            "payload":"Vorpraktikum2"
        },
        {
          "content_type":"text",
          "title":"Aushilfe",
            "payload":"Aushilfe2"
        },
                    
        {"content_type":"text",
          "title":"Werkstudent",
            "payload":"Werkstudent2"
        },
        {
          "content_type":"text",
          "title":"Fachkraft",
            "payload":"Fachkraft2"
        },   
        {
          "content_type":"text",
          "title":"Absolvent",
            "payload":"Absolvent2"
        },   
        {
          "content_type":"text",
          "title":"Young Professional",
            "payload":"YoungProfessional2"
        },
        {
          "content_type":"text",
          "title":"Ausbildung",
            "payload":"Ausbildung2"
        },
        {
          "content_type":"text",
          "title":"Duales Studium",
            "payload":"DualesStudium2"
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

function sendÜberPorscheMessage(sender) {
    messageData = {
        text:"Schön, dass du dich für Porsche interessierst. Über was kann ich dich informieren?",
        quick_replies: [
        {
          "content_type":"text",
          "title":"Porsche im Profil",
            "payload":"PorscheImProfil1"
        },
        {
          "content_type":"text",
          "title":"Porsche als Arbeitgeber",
            "payload":"PorscheAlsArbeitgeber1"
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

function sendEventsMessage(sender) {
    messageData = {
        text:"Du suchst das persönliche Gespräch mit uns? Wir sind bei einer Vielzahl von Veranstaltungen vor Ort und freuen uns, dich kennenzulernen.",
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


function sendEventsMessage2(sender) {
    messageData = {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "generic",
                "elements": [{
                    "title": "Events",
                    "subtitle": "Treffe uns",
                    "image_url": "http://files1.porsche.com/filestore/image/germany/none/rd-2015-jobsandcareer-events-teaser/preview/e73f281c-33c5-11e6-9225-0019999cd470;s3/porsche-preview.jpg",
                    "buttons": [{
                        "type": "web_url",
                        "url": "http://www.porsche.com/germany/aboutporsche/jobs/events/",
                        "title": "Gehe zu Events"
                    }, {
                        "type": "postback",
                        "title": "Zurück",
                        "payload": "Zurück",
                    }],
                }]
            }
        }
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

//---------------------------------Ebene 2---------------------------------
function sendPorscheImProfilMessage(sender) {
    messageData = {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "generic",
                "elements": [{
                    "title": "Mythos Porsche",
                    "subtitle": "Was macht einen Sportwagenhersteller so wertvoll, dass man sogar vom \"Mythos Porsche\" spricht?",
                    "image_url": "http://files2.porsche.com/filestore/image/multimedia/none/rd-2015-jobsandcareer-profile-myth-teaser/preview/d3b7e4fa-aad5-11e4-b849-001a64c55f5c;s3/porsche-preview.jpg",
                    "buttons": [{
                        "type": "web_url",
                        "url": "http://www.porsche.com/germany/aboutporsche/jobs/profile/myth/",
                        "title": "Gehe zu Mythos Porsche"
                    }, {
                        "type": "postback",
                        "title": "Zurück",
                        "payload": "Payload for first element in a generic bubble",
                    }],
                }, {
                    "title": "Auf Wachstumskurs",
                    "subtitle": "Im Rahmen der Unternehmensstrategie 2018 möchte Porsche den Fahrzeugabsatz auf 200.000 Einheiten pro Jahr steigern.",
                    "image_url": "http://files3.porsche.com/filestore/image/multimedia/none/rd-2015-jobsandcareer-profile-growth-teaser/preview/e39ce03f-abaf-11e4-b849-001a64c55f5c/porsche-preview.jpg",
                    "buttons": [{
                        "type": "postback",
                        "title": "Zurück",
                        "payload": "Payload for first element in a generic bubble",
                    }],
                },{
                    "title": "Porsche Mission E",
                    "subtitle": "Der erste rein elektrisch angetriebene Porsche kommt auf die Straße.",
                    "image_url": "http://files3.porsche.com/filestore/image/multimedia/none/rd-2015-jobsandcareer-profile-mission-e-teaser/preview/f2176817-3791-11e6-9225-0019999cd470;s3/porsche-preview.jpg",
                    "buttons": [{
                        "type": "web_url",
                        "url": "http://www.porsche.com/germany/aboutporsche/jobs/profile/mission-e/",
                        "title": "Gehe zu Mission E"
                    }, {
                        "type": "postback",
                        "title": "Zurück",
                        "payload": "Payload for first element in a generic bubble",
                    }],
                }]
            }
        }
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

function sendPorscheAlsArbeitgeberMessage(sender) {
    messageData = {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "generic",
                "elements": [{
                    "title": "Unternehmenswerte und Kultur",
                    "subtitle": "Porsche ist ein einzigartiges Unternehmen mit starken Idealen.",
                    "image_url": "http://files2.porsche.com/filestore/image/multimedia/none/rd-2015-jobsandcareer-employer-values-teaser/preview/52877809-ab83-11e4-b849-001a64c55f5c;s3/porsche-preview.jpg",
                    "buttons": [{
                        "type": "web_url",
                        "url": "http://www.porsche.com/germany/aboutporsche/jobs/employer/values/",
                        "title": "Gehe zu Unternehmenswerte und Kultur"
                    }, {
                        "type": "postback",
                        "title": "Zurück",
                        "payload": "Payload for first element in a generic bubble",
                    }],
                }, {
                    "title": "Beruf und Familie",
                    "subtitle": "Mit vielfältigen Angeboten unterstützen wir unsere Mitarbeiter dabei, die Ansprüche von Beruf und Privatleben in Einklang zu bringen.",
                    "image_url": "http://files1.porsche.com/filestore/image/multimedia/none/rd-2015-jobsandcareer-employer-family-teaser/preview/69c34bea-bc35-11e4-a19d-001a64c55f5c;s3/porsche-preview.jpg",
                    "buttons": [{
                        "type": "web_url",
                        "url": "http://www.porsche.com/germany/aboutporsche/jobs/employer/family/",
                        "title": "Gehe zu Beruf und Familie"
                    },{
                        "type": "postback",
                        "title": "Zurück",
                        "payload": "Payload for first element in a generic bubble",
                    }],
                },{
                    "title": "Chancengleichheit und Vielfalt",
                    "subtitle": "Die Gleichbehandlung von Frauen und Männern in der Arbeitswelt ist Porsche in besonderes Anliegen.",
                    "image_url": "http://files2.porsche.com/filestore/image/multimedia/none/rd-2015-jobsandcareer-employer-equalopportunities-teaser/preview/67e3524d-ab83-11e4-b849-001a64c55f5c;s3/porsche-preview.jpg",
                    "buttons": [{
                        "type": "web_url",
                        "url": "http://www.porsche.com/germany/aboutporsche/jobs/employer/equalopportunities/",
                        "title": "Gehe zu Chancengleichheit und Vielfalt"
                    }, {
                        "type": "postback",
                        "title": "Zurück",
                        "payload": "Payload for first element in a generic bubble",
                    }],
                }]
            }
        }
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
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "list",
                "elements": [{
                    "title": "Praktikum bei Porsche",
                    "subtitle": "Porsche ist ein einzigartiges Unternehmen mit starken Idealen.",
                    "image_url": "http://files2.porsche.com/filestore/image/multimedia/none/rd-2015-jobsandcareer-yourentry-students-practicaltraining-banner/normal/3d1cec69-a85c-11e4-b849-001a64c55f5c/porsche-normal.jpg",
                    "buttons": [{
                        "type": "web_url",
                        "url": "http://www.porsche.com/germany/aboutporsche/jobs/students/practicaltraining/",
                        "title": "Gehe zu Praktikum"
                    }],
                }, {
                    "buttons": [{
                        "type": "web_url",
                        "url": "http://www.porsche.com/germany/aboutporsche/jobs/employer/family/",
                        "title": "Connected Car"
                    }],
                },{
                    "title": "Entwicklung",
                    "subtitle": "Die Gleichbehandlung von Frauen und Männern in der Arbeitswelt ist Porsche in besonderes Anliegen.",
                    "image_url": "http://files2.porsche.com/filestore/image/multimedia/none/rd-2015-jobsandcareer-employer-equalopportunities-teaser/preview/67e3524d-ab83-11e4-b849-001a64c55f5c;s3/porsche-preview.jpg",
                    "buttons": [{
                        "type": "web_url",
                        "url": "http://www.porsche.com/germany/aboutporsche/jobs/employer/equalopportunities/",
                        "title": "Gehe zu Chancengleichheit und Vielfalt"
                    }],
                }]
            }
        }
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

function sendPraktikumURL(sender, activityLevel) {
    
    var url = getPorscheURL("5", "141");
    
    switch(activityLevel) {
    case "Connected Car":
        url = getPorscheURL("5", "141");
        break;
    case "IT":
        url = getPorscheURL("5", "130");
        break;
    default:
        url = getPorscheURL("5", "108");
}
    url += "\nWas kann ich als nächstes für dich tun?";
    
    console.log(url);
    messageData = {
        text:url,
        quick_replies: [
                {
          "content_type":"text",
          "title":"Connected Car",
            "payload":"DEVELOPER_DEFINED_PAYLOAD_FOR_PICKING_Einstieg"
        },
        {
          "content_type":"text",
          "title":"Entwicklung",
            "payload":"DEVELOPER_DEFINED_PAYLOAD_FOR_PICKING_ÜberDaniel"
        },    
        {
          "content_type":"text",
          "title":"IT",
            "payload":"DEVELOPER_DEFINED_PAYLOAD_FOR_PICKING_ÜberDaniel"
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
    return "https://jobs.porsche.com/index.php?ac=search_result&search_criterion_activity_level=" + activityLevel + "&search_criterion_entry_level=" + entryLevel;
}

// Spin up the server
app.listen(app.get('port'), function() {
    console.log('running on port', app.get('port'))
})

