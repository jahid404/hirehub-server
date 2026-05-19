import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { ProfileValidation } from './profile.validation';
import { ProfileController } from './profile.controller';
import ROLES from '../../constants/roles';

const router = express.Router();

// Get logged-in user's profile
router.get(
  '/',
  auth(ROLES.CANDIDATE, ROLES.RECRUITER),
  ProfileController.getMyProfile
);

// Create or update candidate profile
router.put(
  '/candidate',
  auth(ROLES.CANDIDATE),
  validateRequest(ProfileValidation.createOrUpdateCandidateProfileSchema),
  ProfileController.updateCandidateProfile
);

// Create or update recruiter profile
router.put(
  '/recruiter',
  auth(ROLES.RECRUITER),
  validateRequest(ProfileValidation.createOrUpdateRecruiterProfileSchema),
  ProfileController.updateRecruiterProfile
);

export const ProfileRoutes = router;
