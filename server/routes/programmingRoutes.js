const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const { auth, isAdmin } = require('../middleware/authMiddleware');
const { uploadProgramming, updateProgramming, getProgrammingByClassroom, getAllProgrammings, downloadProgramming, generateProgrammingPdf, deleteProgramming } = require('../controllers/programmingController');

router.post('/upload', auth, isAdmin, upload.single('pdf'), uploadProgramming);
router.put('/:id', auth, isAdmin, updateProgramming);
router.get('/', auth, isAdmin, getAllProgrammings);
router.get('/:classroom', getProgrammingByClassroom);
router.get('/:id/download', downloadProgramming);
router.get('/:id/generate-pdf', generateProgrammingPdf);
router.delete('/:id', auth, isAdmin, deleteProgramming);

module.exports = router;
