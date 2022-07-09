const googleTTS = require('google-tts-api');
const path = require('path');
const urlParse = require('url').parse;
const http = require('http');
const https = require('https');
const fs = require('fs-extra');

async function downloadFile(url, dest) {
    return new Promise((resolve, reject) => {
        const info = urlParse(url);
        const httpClient = info.protocol === 'https:' ? https : http;

        const options = {
            host: info.host,
            path: info.path,
            headers: {
                'user-agent': 'WHAT_EVER',
            },
        };

        httpClient
            .get(options, (res) => {
                if (res.statusCode !== 200) {
                    const msg = `request to ${url} failed, status code = ${res.statusCode} (${res.statusMessage})`;
                    reject(new Error(msg));
                    return;
                }
                const file = fs.createWriteStream(dest);
                file.on('finish', function () {
                    file.close(resolve);
                });
                file.on('error', function (err) {
                    fs.unlink(dest);
                    reject(err);
                });
                res.pipe(file);
            })
            .on('error', reject)
            .end();
    });
}

exports.tts = async function tts(client, message) {
    const { id, from, body, sender, isGroupMsg, chat, caption, isMedia, mimetype, quotedMsg } = message;

    const commands = caption || body || "";
    const args = commands.split(" ");

    if (args.length === 1) return client.reply(from, 'Me dê uma frase. o.O', id);

    let string = commands.split(' ').slice(1).join(' ');

    if (string.length >= 200) {
        return client.reply(from, `Porra bisho q treco grande, quer me bugar??`, id);
    }

    const url = googleTTS.getAudioUrl(`${string}`, {
        lang: 'pt_BR',
        slow: false,
        host: 'https://translate.google.com',
    });

    const dest = await path.resolve(__dirname, './media/translate.mp3');

    await downloadFile(url, dest);
    await client.sendPtt(from, dest, 'translate', 'AAAAAAAAAUHHH', id);
}