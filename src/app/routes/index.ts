import express from 'express';
import { UserRoutes } from '../modules/user/user.route';
import { AuthRoutes } from '../modules/auth/auth.route';
import { ProfileRoutes } from '../modules/profile/profile.route';
import { FileRoutes } from '../modules/file/file.route';
import { JobRoutes } from '../modules/job/job.route';
import { ApplicationRoutes } from '../modules/application/application.route';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/profile',
    route: ProfileRoutes,
  },
  {
    path: '/file',
    route: FileRoutes,
  },
  {
    path: '/jobs',
    route: JobRoutes,
  },
  {
    path: '/applications',
    route: ApplicationRoutes,
  },
];


moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
