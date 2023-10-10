const nacl = require('tweetnacl');
var chisteService = require("chiste");

exports.handler = async (event) => {
  // Checking signature (requirement 1.)
  // Your public key can be found on your application in the Developer Portal
  const PUBLIC_KEY = process.env.BOT_KEY;
  const signature = event.headers['x-signature-ed25519']
  const timestamp = event.headers['x-signature-timestamp'];
  const strBody = event.body; // should be string, for successful sign

  console.log("strBody" + strBody);

  const isVerified = nacl.sign.detached.verify(
    Buffer.from(timestamp + strBody),
    Buffer.from(signature, 'hex'),
    Buffer.from(PUBLIC_KEY, 'hex')
  );

  if (!isVerified) {
    return {
      statusCode: 401,
      body: JSON.stringify('invalid request signature'),
    };
  }
  
  const body = JSON.parse(strBody)
  // Replying to ping (requirement 2.)
  if (body.type == 1) {
    return {
      statusCode: 200,
      body: JSON.stringify({ "type": 1 }),
    }
  }
  if (Object.hasOwn(body.data, 'name')) {
    if (body.data.name == 'hola') {
      return {
        statusCode: 200,
        body: JSON.stringify({"type": 4,"data": {"content": "Mi choto pa tu cola!"}}),
        "headers": { "Content-Type": "application/json" }          
      }
    }
  }

  if (Object.hasOwn(body.data, 'name')) {
    if (body.data.name == 'chiste') {
      console.log("detecta chiste");
      return {
        statusCode: 200,
        body: JSON.stringify({"type": 4,"data": {"content": "Aca va un chiste: " + await chisteService.getChiste()}}),
        "headers": { "Content-Type": "application/json" }          
      }
    }
  }
};