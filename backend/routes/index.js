const express = require('express');
const router = express.Router();

const {
    addEmployee,
    getEmployee,
    deleteEmployee,
} = require('../controller/employee');

const {
    addReviewer,
    submitReview
} = require('../controller/review');

// routes
router.get('/addEmployee', async (req, res, next) => {
    try {
        const result = await addEmployee(req.query.username);
        res.json(result);
    }
    catch(e) {
        console.log(e);
    }
});

router.get('/getEmployee', async (req, res, next) => {
    try {
        const result = await getEmployee();
        res.json(result);
    }
    catch(e) {
        console.log(e);
    }
});

router.get('/deleteEmployee', async (req, res, next) => {
    try {
        const result = await deleteEmployee(req.query.username);
        res.json(result);
    }
    catch(e) {
        console.log(e);
    }
});

router.get('/addReviewer', async (req, res, next) => {
    try {
        const result = await addReviewer(req.query.username, req.query.reviewer);
        res.json(result);
    }
    catch(e) {
        console.log(e);
    }
});

router.get('/submitReview', async (req, res, next) => {
    try {
        const result = await submitReview(req.query.username, req.query.reviewer, req.query.review);
        res.json(result);
    }
    catch(e) {
        console.log(e);
    }
});

module.exports = router;
