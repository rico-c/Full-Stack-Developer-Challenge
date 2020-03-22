/**
 * API host config
 */

const host = 'http://localhost:3000';

export default {
    addEmployee: `${host}/addEmployee`,
    getEmployee: `${host}/getEmployee`,
    deleteEmployee: `${host}/deleteEmployee`,
    addReviewer: `${host}/addReviewer`,
    submitReview: `${host}/submitReview`,
};
