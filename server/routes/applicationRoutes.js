const express = require('express');
const router = express.Router();
const {
    applyForJob,
    getMyApplications,
    getJobApplications,
    updateApplicationStatus,
} = require('../controllers/applicationController');
const { protect, authorize } = require('../middleware/authMiddleware');

const upload = require('../middleware/uploadMiddleware');

router.post('/', protect, authorize('student'), upload.single('resume'), applyForJob);
router.get('/my', protect, authorize('student'), getMyApplications);
router.get('/job/:jobId', protect, authorize('recruiter', 'admin'), getJobApplications);
router.put('/:id', protect, authorize('recruiter', 'admin'), updateApplicationStatus);

module.exports = router;
