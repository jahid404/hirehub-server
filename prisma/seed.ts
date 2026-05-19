import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');

  const adminEmail = 'admin@hirehub.com';
  const recruiterEmail = 'recruiter@hirehub.com';
  const candidateEmail = 'candidate@hirehub.com';

  const hashedPassword = await bcrypt.hash('password123', 10);

  // 1. Seed Admin User
  const admin = await prisma.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      email: adminEmail,
      password: hashedPassword,
      role: 'admin',
    },
  });
  console.log(`✅ Admin user seeded: ${admin.email}`);

  // 2. Seed Recruiter User and Recruiter Profile
  const recruiter = await prisma.user.upsert({
    where: { email: recruiterEmail },
    update: {},
    create: {
      email: recruiterEmail,
      password: hashedPassword,
      role: 'recruiter',
      recruiterProfile: {
        create: {
          name: 'TechCorp Solutions',
          website: 'https://techcorp.example.com',
          description: 'A leading global software engineering and IT consulting firm.',
          location: 'San Francisco, CA',
          logo: 'https://images.unsplash.com/photo-1549923746-c502d488b3ea?auto=format&fit=crop&w=200&h=200&q=80',
        },
      },
    },
  });
  console.log(`✅ Recruiter user and profile seeded: ${recruiter.email}`);

  // 3. Seed Candidate User and Candidate Profile
  const candidate = await prisma.user.upsert({
    where: { email: candidateEmail },
    update: {},
    create: {
      email: candidateEmail,
      password: hashedPassword,
      role: 'candidate',
      candidateProfile: {
        create: {
          fullName: 'John Doe',
          email: candidateEmail,
          phoneNumber: '+1-555-0199',
          skills: ['TypeScript', 'Node.js', 'React', 'Prisma', 'PostgreSQL'],
          experience: '3 years of experience as a full stack software engineer at StartupInc.',
          education: 'Bachelor of Science in Computer Science, State University',
          resume: 'https://hirehub-resumes.s3.amazonaws.com/john_doe_resume.pdf',
          githubLink: 'https://github.com/johndoe',
          linkedInLink: 'https://linkedin.com/in/johndoe',
        },
      },
    },
  });
  console.log(`✅ Candidate user and profile seeded: ${candidate.email}`);

  console.log('🌱 Seeding completed successfully!');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
