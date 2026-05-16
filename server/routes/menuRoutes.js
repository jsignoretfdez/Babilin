const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const { auth, isAdmin } = require('../middleware/authMiddleware');
const { uploadMenu, getMenus, getCurrentMenu, getMenuById, downloadMenu, deleteMenu } = require('../controllers/menuController');

router.post('/upload', auth, isAdmin, upload.single('pdf'), uploadMenu);
router.get('/', auth, isAdmin, getMenus);
router.get('/current', getCurrentMenu);
router.get('/:id', getMenuById);
router.get('/:id/download', downloadMenu);
router.delete('/:id', auth, isAdmin, deleteMenu);

module.exports = router;
