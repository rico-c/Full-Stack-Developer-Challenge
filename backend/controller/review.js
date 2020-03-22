/**
 * @description review
 * @author caoyu
 */

const { SuccessModel, ErrorModel } = require('../model/ResModel')
const {
    userNameExistInfo,
    lackOfUserName
} = require('../model/ErrorInfo');
const {
    getJsonStore,
    writeJsonStore
} = require('../utils/fileInteract');

/**
* addReviewer
* @param {string} uername
* @param {boolean} result
*/

async function addReviewer(username, reviewer) {
    try {
        if (!username || !reviewer) {
            return new ErrorModel(lackOfUserName)
        }
        const resJSON = await getJsonStore('../localStore/store.json');
        const index = resJSON.employees.findIndex(item => {
            return item.username === username;
        });
        const reviewerList = resJSON.employees[index].reviewer;
        if (reviewerList.includes(reviewer)) {
            return new ErrorModel(userNameExistInfo)
        }
        resJSON.employees[index].reviewer.push(reviewer);
        writeJsonStore('../localStore/store.json', resJSON);
        return new SuccessModel(username);
    }
    catch (e) {
        console.log(e);
    }
}

/**
* submitReviewer
* @param {string} uername
* @param {boolean} result
*/

async function submitReview(username, reviewer, review) {
    try {
        return new SuccessModel('test');
    }
    catch (e) {
        console.log(e);
    }
}

module.exports = {
    addReviewer,
    submitReview
}