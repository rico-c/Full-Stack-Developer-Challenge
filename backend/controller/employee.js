/**
 * @description employee
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
* getEmplyee
* @param void
*/

async function getEmployee() {
    try {
        const resJSON = await getJsonStore('../localStore/store.json');
        return new SuccessModel(resJSON.employees);
    }
    catch (e) {
        console.log(e);
    }
}

/**
* addEmplyee
* @param {string} uername
*/

async function addEmployee(username) {
    try {
        if (!username) {
            return new ErrorModel(lackOfUserName)
        }
        // read local JSON file
        const resJSON = await getJsonStore('../localStore/store.json');
        // find if this username is existing
        if (resJSON.employees.map(i => i.username).includes(username)) {
            return new ErrorModel(userNameExistInfo)
        }
        else {
            // add new employess
            resJSON.employees = resJSON.employees.concat([{
                username,
                reviews: [],
                reviewer: []
            }]);
            writeJsonStore('../localStore/store.json', resJSON);
            return new SuccessModel(username);
        }
    }
    catch (e) {
        console.log(e);
    }
}

/**
* deleteEmployee
* @param {string} uername
*/

async function deleteEmployee(username) {
    try {
        if (!username) {
            return new ErrorModel(lackOfUserName)
        }
        const resJSON = await getJsonStore('../localStore/store.json');
        if (!resJSON.employees.map(i => i.username).includes(username)) {
            return new ErrorModel(userNameDonotExistInfo)
        }
        else {
            // firt step: get the item's index
            const index = resJSON.employees.findIndex(item => {
                item.username === username;
            });
            // remove the item
            resJSON.employees.splice(index, 1);
            // other emplyee's reviewer including deleted username needs to be clear
            resJSON.employees.forEach((e, i) => {
                const deletedItemIndex = e.reviewer.indexOf(username);
                if (deletedItemIndex > -1) {
                    resJSON.employees[i].reviewer.splice(deletedItemIndex, 1);
                }
            })
            writeJsonStore('../localStore/store.json', resJSON);
            return new SuccessModel(username);
        }
    }
    catch (e) {
        console.log(e);
    }
}

module.exports = {
    addEmployee,
    getEmployee,
    deleteEmployee
}