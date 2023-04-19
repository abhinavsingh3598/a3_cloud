const express = require('express');
const app = express();
app.use(express.json());
const NodeRSA = require('node-rsa');
const fs=require('fs')

const privateKeyStr = fs.readFileSync('./private_key.txt', 'utf-8')
const publicKeyStr = fs.readFileSync('./public_key.txt', 'utf-8')

const privateKey = new NodeRSA(privateKeyStr);
const publicKey = new NodeRSA(publicKeyStr);


app.post('/decrypt', (req, res) => {
    const encryptedMessage = req.body.message;
    const decryptedMessage = privateKey.decrypt(encryptedMessage,'utf8').toString();
    res.json({ response: decryptedMessage });
  });
  
  app.post('/encrypt', (req, res) => {
    const message = req.body.message;
    const encryptedData = publicKey.encrypt(message);
    const encryptedMessage = encryptedData.toString('base64');
    res.json({ response: encryptedMessage });
  });
  

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
