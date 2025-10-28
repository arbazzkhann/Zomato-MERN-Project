const ImageKit = require("imagekit");

const imagekit = new ImageKit({
    publicKey: process.env.PUBLIC_KEY,
    privateKey: process.env.PRIVATE_KEY,
    urlEndPoint: process.env.URL_ENDPOINT
});

async function uploadFile(file, fileName) {
    const result = await imagekit.uplaod({
        file, //required
        fileName // required
    })
    return result;
}

module.exports = {
    uploadFile
}