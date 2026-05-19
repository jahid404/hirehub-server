import prisma from '../../shared/prisma';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import ROLES from '../../constants/roles';

const getProfileFromDB = async (userId: string, role: string) => {
  if (role === ROLES.CANDIDATE) {
    const profile = await prisma.candidateProfile.findUnique({
      where: { userId },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            role: true,
            createdAt: true,
            updatedAt: true,
          },
        },
      },
    });
    return profile;
  } else if (role === ROLES.RECRUITER) {
    const profile = await prisma.recruiterProfile.findUnique({
      where: { userId },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            role: true,
            createdAt: true,
            updatedAt: true,
          },
        },
      },
    });
    return profile;
  } else {
    throw new AppError(httpStatus.BAD_REQUEST, 'Invalid user role');
  }
};

const createOrUpdateCandidateProfileInDB = async (userId: string, payload: any) => {
  // Ensure user exists
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }

  if (user.role !== ROLES.CANDIDATE) {
    throw new AppError(httpStatus.FORBIDDEN, 'Only candidates can manage candidate profiles');
  }

  const profile = await prisma.candidateProfile.upsert({
    where: { userId },
    update: payload,
    create: {
      userId,
      ...payload,
    },
    include: {
      user: {
        select: {
          id: true,
          email: true,
          role: true,
        },
      },
    },
  });

  return profile;
};

const createOrUpdateRecruiterProfileInDB = async (userId: string, payload: any) => {
  // Ensure user exists
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }

  if (user.role !== ROLES.RECRUITER) {
    throw new AppError(httpStatus.FORBIDDEN, 'Only recruiters can manage recruiter profiles');
  }

  const profile = await prisma.recruiterProfile.upsert({
    where: { userId },
    update: payload,
    create: {
      userId,
      ...payload,
    },
    include: {
      user: {
        select: {
          id: true,
          email: true,
          role: true,
        },
      },
    },
  });

  return profile;
};

export const ProfileService = {
  getProfileFromDB,
  createOrUpdateCandidateProfileInDB,
  createOrUpdateRecruiterProfileInDB,
};
