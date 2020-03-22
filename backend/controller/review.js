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
        const resJSON = await getJsonStore('../localStore/store.json');
        // find the index of review target
        const index = resJSON.employees.findIndex(item => {
            return item.username === username;
        });
        const currentReviewList = resJSON.employees[index].reviews;
        if (currentReviewList.length) {
            // if no review, add one,if has one,then change it
            const reviewIndex = currentReviewList.findIndex(item => {
                return item.reviewer === reviewer;
            });
            if (reviewIndex > -1) {
                resJSON.employees[index].reviews[reviewIndex].content = review;
            }
            else {
                resJSON.employees[index].reviews = resJSON.employees[index].reviews.concat({
                    content: review,
                    reviewer
                });
            }
        }
        else {
            resJSON.employees[index].reviews.push({
                content: review,
                reviewer
            })
        }
        writeJsonStore('../localStore/store.json', resJSON);
        return new SuccessModel(username);
    }
    catch (e) {
        console.log(e);
    }
}

module.exports = {
    addReviewer,
    submitReview
}