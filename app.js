const Address = require('./Address.js');
const express = require('express');
const request = require('request');
const TARGET_URL = 'https://api.line.me/v2/bot/message/reply'
const TOKEN = 'YK56BfHFgpILrxRk1FZrdcouFguf5CBA5qxM3zfDH6N9jR/cfPxVdK1P9vZHAk69mZDSlSkXNLy25pzqJbXrn3y76hwmH0Kiuvx3OadFYcuidWSp7VYAj4SqJSljv/q5KoYAOE2il8jmQkf4bQKvXQdB04t89/1O/w1cDnyilFU='
const fs = require('fs');
const path = require('path');
const HTTPS = require('https');
const domain = "2019102158.oss2022chatbot.tk"
const sslport = 23023;
const bodyParser = require('body-parser');
const app = express();



app.use(bodyParser.json());
app.post('/hook', function (req, res) {
    var eventObj = req.body.events[0];
    //var source = eventObj.source;
    //var message = eventObj.message;
    // request log
    console.log('======================', new Date() ,'======================');
    console.log((Address.getAddress('석수동길')).road_address.address_name)
    request.post(
        {
            url: TARGET_URL,
            headers: {
                'Authorization': `Bearer ${TOKEN}`
            },
            json: {
                "replyToken":eventObj.replyToken, //eventObj.replyToken
                "messages":[
                    {
                        "type":"text",
                        "text":address
                    },
                    {
                        "type":"text",
                        "text":"맞나요?"
                    }
                ],
                "status" : 1
            }
        },(error, response, body) => {
            console.log(body)
        });
    
    res.sendStatus(200);
});






try {
    const option = {
        ca: fs.readFileSync('/etc/letsencrypt/live/' + domain +'/fullchain.pem'),
        key: fs.readFileSync(path.resolve(process.cwd(), '/etc/letsencrypt/live/' + domain +'/privkey.pem'), 'utf8').toString(),
        cert: fs.readFileSync(path.resolve(process.cwd(), '/etc/letsencrypt/live/' + domain +'/cert.pem'), 'utf8').toString(),
    };
  
    HTTPS.createServer(option, app).listen(sslport, () => {
      console.log(`[HTTPS] Server is started on port ${sslport}`);
    });
  } catch (error) {
    console.log('[HTTPS] HTTPS 오류가 발생하였습니다. HTTPS 서버는 실행되지 않습니다.');
    console.log(error);
  }