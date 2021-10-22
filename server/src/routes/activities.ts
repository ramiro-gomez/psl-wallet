import express from 'express';
import {
	getActivities,
	addActivity,
	editActivity,
	deleteActivity,
} from '../controllers/activities';

const router = express.Router();

router.route('/').get(getActivities).post(addActivity);
router.route('/:id').patch(editActivity).delete(deleteActivity);

export default router;
