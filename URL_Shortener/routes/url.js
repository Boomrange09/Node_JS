const express = require('express');
const { handleGenerateNewShortURL, handleRedirectURL } = require('../controllers/url');
const router = express.Router();

router.route('/url').post(handleGenerateNewShortURL);
router.route('/:shortId').get(handleRedirectURL);
module.exports = router;