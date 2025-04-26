// Prisma seed file for populating the database with initial data
// Run with: npm run db:seed

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  console.log('Starting database seeding...');

  // Clean up existing data
  await prisma.review.deleteMany();
  await prisma.booking.deleteMany();
  await prisma.categoryOnEvent.deleteMany();
  await prisma.category.deleteMany();
  await prisma.event.deleteMany();
  await prisma.user.deleteMany();

  console.log('Cleaned up existing data');

  // Create categories
  const categories = await Promise.all([
    prisma.category.create({
      data: {
        name: 'Conference',
        description: 'Professional conferences and meetups',
      },
    }),
    prisma.category.create({
      data: {
        name: 'Workshop',
        description: 'Hands-on learning experiences',
      },
    }),
    prisma.category.create({
      data: {
        name: 'Concert',
        description: 'Music performances and shows',
      },
    }),
    prisma.category.create({
      data: {
        name: 'Networking',
        description: 'Social and professional networking events',
      },
    }),
  ]);

  console.log('Created categories');

  // Create users
  const users = await Promise.all([
    prisma.user.create({
      data: {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123', // we'll hash this in real db calls
        bio: 'Event organizer with 5 years of experience',
      },
    }),
    prisma.user.create({
      data: {
        name: 'Jane Smith',
        email: 'jane@example.com',
        password: 'password123',
        bio: 'Music enthusiast and concert promoter',
      },
    }),
  ]);

  console.log('Created users');

  // Create events
  const events = await Promise.all([
    prisma.event.create({
      data: {
        title: 'Web Development Conference 2025',
        description: 'A conference for web developers to learn about the latest technologies and best practices.',
        location: 'Tech Center, Ghaziabad',
        isOnline: false,
        startTime: new Date('2025-06-15T09:00:00Z'),
        endTime: new Date('2025-06-16T17:00:00Z'),
        capacity: 200,
        price: 99.99,
        hostId: users[0].id,
        categories: {
          create: [
            { categoryId: categories[0].id },
            { categoryId: categories[3].id },
          ],
        },
      },
    }),
    prisma.event.create({
      data: {
        title: 'JavaScript Workshop',
        description: 'Hands-on workshop to learn advanced JavaScript concepts.',
        isOnline: true,
        startTime: new Date('2025-05-20T14:00:00Z'),
        endTime: new Date('2025-05-20T17:00:00Z'),
        capacity: 50,
        price: 29.99,
        hostId: users[0].id,
        categories: {
          create: [
            { categoryId: categories[1].id },
          ],
        },
      },
    }),
    prisma.event.create({
      data: {
        title: 'Summer Music Festival',
        description: 'Annual music festival featuring local and international artists.',
        location: 'Central Park, Delhi',
        isOnline: false,
        startTime: new Date('2025-07-10T12:00:00Z'),
        endTime: new Date('2025-07-12T23:00:00Z'),
        capacity: 5000,
        price: 149.99,
        hostId: users[1].id,
        categories: {
          create: [
            { categoryId: categories[2].id },
          ],
        },
      },
    }),
  ]);

  console.log('Created events');

  // Create bookings
  const bookings = await Promise.all([
    prisma.booking.create({
      data: {
        userId: users[1].id,
        eventId: events[0].id,
        status: 'CONFIRMED',
        quantity: 1,
        totalPrice: 99.99,
      },
    }),
    prisma.booking.create({
      data: {
        userId: users[0].id,
        eventId: events[2].id,
        status: 'CONFIRMED',
        quantity: 2,
        totalPrice: 299.98,
      },
    }),
  ]);

  console.log('Created bookings');

  // Create reviews
  const reviews = await Promise.all([
    prisma.review.create({
      data: {
        authorId: users[1].id,
        eventId: events[0].id,
        rating: 5,
        comment: 'Excellent conference! Learned a lot and made great connections.',
      },
    }),
    prisma.review.create({
      data: {
        authorId: users[0].id,
        eventId: events[2].id,
        rating: 4,
        comment: 'Great music and atmosphere. Would attend again!',
      },
    }),
  ]);

  console.log('Created reviews');

  console.log('Database seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });