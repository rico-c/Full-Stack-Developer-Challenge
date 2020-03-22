/**
 * @description utils
 * @author caoyu
 */

/**
* getJsonStore
* @param {string} filePath
*/

const path = require('path');
const fs = require('fs');

async function getJsonStore(filePath) {
    try {
        const res = await fs.readFileSync(
            path.join(__dirname, filePath)
        ).toString();
        return JSON.parse(res);
    }
    catch (e) {
        console.log(e);
    }
}

/**
* writeJsonStore
* @param {string} filePath
* @param {json} content
*/

async function writeJsonStore(filePath, content) {
    try {
        await fs.writeFileSync(path.join(__dirname, filePath), JSON.stringify(content));
    }
    catch (e) {
        console.log(e);
    }
}

module.exports = {
    getJsonStore,
    writeJsonStore
}