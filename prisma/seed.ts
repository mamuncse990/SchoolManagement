import { Day, PrismaClient, UserSex } from "@prisma/client";
import { hash } from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // Clear existing data in correct order to handle dependencies
  await prisma.result.deleteMany({});
  await prisma.attendance.deleteMany({});
  await prisma.exam.deleteMany({});
  await prisma.assignment.deleteMany({});
  await prisma.lesson.deleteMany({});
  await prisma.event.deleteMany({});
  await prisma.announcement.deleteMany({});
  await prisma.student.deleteMany({});
  await prisma.teacher.deleteMany({});
  await prisma.parent.deleteMany({});
  await prisma.class.deleteMany({});
  await prisma.grade.deleteMany({});
  await prisma.subject.deleteMany({});
  await prisma.profile.deleteMany({});
  await prisma.user.deleteMany({});
  await prisma.role.deleteMany({});
  await prisma.menu.deleteMany({});
  await prisma.admin.deleteMany({});

  try {
    // ROLES
    const adminRole = await prisma.role.create({
      data: {
        name: 'admin',
      }
    });

    const teacherRole = await prisma.role.create({
      data: {
        name: 'teacher',
      }
    });

    const parentRole = await prisma.role.create({
      data: {
        name: 'parent',
      }
    });

    const studentRole = await prisma.role.create({
      data: {
        name: 'student',
      }
    });

    // ADMIN
    await prisma.admin.create({
      data: {
        id: "admin1",
        username: "admin1",
      },
    });
    await prisma.admin.create({
      data: {
        id: "admin2",
        username: "admin2",
      },
    });

    // GRADE
    const grades = [];
    for (let i = 1; i <= 6; i++) {
      const grade = await prisma.grade.create({
        data: {
          level: i,
        },
      });
      grades.push(grade);
    }

    // CLASS
    for (let i = 1; i <= 6; i++) {
      await prisma.class.create({
        data: {
          name: `Class ${i}`,
          capacity: 30,
          gradeId: grades[i - 1].id,
        },
      });
    }

    // SUBJECT
    const subjectData = [
      { name: "Mathematics" },
      { name: "Science" },
      { name: "English" },
      { name: "History" },
      { name: "Geography" },
      { name: "Physics" },
      { name: "Chemistry" },
      { name: "Biology" },
      { name: "Computer Science" },
      { name: "Art" },
    ];

    for (const subject of subjectData) {
      await prisma.subject.create({ data: subject });
    }

    // TEACHER
    for (let i = 1; i <= 15; i++) {
      await prisma.teacher.create({
        data: {
          id: `teacher${i}`,
          username: `teacher${i}`,
          name: `TName${i}`,
          surname: `TSurname${i}`,
          email: `teacher${i}@example.com`,
          phone: `123-456-789${i}`,
          address: `Address${i}`,
          bloodType: "A+",
          sex: i % 2 === 0 ? UserSex.MALE : UserSex.FEMALE,
          birthday: new Date(1980, 0, 1),
          subjects: { connect: [{ id: (i % 10) + 1 }] },
        },
      });
    }

    // LESSON
    for (let i = 1; i <= 30; i++) {
      await prisma.lesson.create({
        data: {
          name: `Lesson ${i}`,
          day: Day.MONDAY,
          startTime: new Date(new Date().setHours(new Date().getHours() + 1)),
          endTime: new Date(new Date().setHours(new Date().getHours() + 2)),
          subjectId: (i % 10) + 1,
          classId: (i % 6) + 1,
          teacherId: `teacher${(i % 15) + 1}`,
        },
      });
    }

    // PARENT
    for (let i = 1; i <= 25; i++) {
      await prisma.parent.create({
        data: {
          id: `parentId${i}`,
          username: `parent${i}`,
          name: `PName${i}`,
          surname: `PSurname ${i}`,
          email: `parent${i}@example.com`,
          phone: `123-456-789${i}`,
          address: `Address${i}`,
        },
      });
    }

    // STUDENT
    for (let i = 1; i <= 50; i++) {
      await prisma.student.create({
        data: {
          id: `student${i}`,
          username: `student${i}`,
          name: `SName${i}`,
          surname: `SSurname ${i}`,
          email: `student${i}@example.com`,
          phone: `987-654-321${i}`,
          address: `Address${i}`,
          bloodType: "O-",
          sex: i % 2 === 0 ? UserSex.MALE : UserSex.FEMALE,
          birthday: new Date(2005, 0, 1),
          parentId: `parentId${Math.ceil(i / 2) % 25 || 25}`,
          gradeId: (i % 6) + 1,
          classId: (i % 6) + 1
        },
      });
    }

    // EXAM
    for (let i = 1; i <= 10; i++) {
      await prisma.exam.create({
        data: {
          title: `Exam ${i}`,
          startTime: new Date(new Date().setHours(new Date().getHours() + 1)),
          endTime: new Date(new Date().setHours(new Date().getHours() + 2)),
          lessonId: (i % 30) + 1,
        },
      });
    }

    // ASSIGNMENT
    for (let i = 1; i <= 10; i++) {
      await prisma.assignment.create({
        data: {
          title: `Assignment ${i}`,
          startDate: new Date(new Date().setDate(new Date().getDate() + 1)),
          dueDate: new Date(new Date().setDate(new Date().getDate() + 7)),
          lessonId: (i % 30) + 1,
        },
      });
    }

    // RESULT
    for (let i = 1; i <= 10; i++) {
      await prisma.result.create({
        data: {
          score: 85,
          studentId: `student${i}`,
          examId: (i % 5) + 1,
        },
      });
    }

    // ATTENDANCE
    for (let i = 1; i <= 10; i++) {
      await prisma.attendance.create({
        data: {
          date: new Date(),
          present: true,
          studentId: `student${i}`,
          lessonId: (i % 30) + 1,
        },
      });
    }

    // EVENT
    for (let i = 1; i <= 5; i++) {
      await prisma.event.create({
        data: {
          title: `Event ${i}`,
          description: `Description for Event ${i}`,
          startTime: new Date(new Date().setHours(new Date().getHours() + 1)),
          endTime: new Date(new Date().setHours(new Date().getHours() + 2)),
          classId: (i % 5) + 1,
        },
      });
    }

    // ANNOUNCEMENT
    for (let i = 1; i <= 5; i++) {
      await prisma.announcement.create({
        data: {
          title: `Announcement ${i}`,
          description: `Description for Announcement ${i}`,
          date: new Date(),
          classId: (i % 5) + 1,
        },
      });
    }

   // Create Users with Profiles
    // Admin Users
    for (let i = 1; i <= 2; i++) {
      await prisma.user.create({
        data: {
          email: `admin${i}@school.com`,
          password: await hash('admin123', 10),
          name: `Admin ${i}`,
          roleId: adminRole.id,
          profile: {
            create: {
              bio: `School Administrator ${i}`
            }
          }
        }
      });
    }

    // Teacher Users
    for (let i = 1; i <= 15; i++) {
      await prisma.user.create({
        data: {
          email: `teacher${i}@school.com`,
          password: await hash('teacher123', 10),
          name: `Teacher ${i}`,
          roleId: teacherRole.id,
          profile: {
            create: {
              bio: `School Teacher ${i}`
            }
          }
        }
      });
    }

    // Parent Users
    for (let i = 1; i <= 25; i++) {
      await prisma.user.create({
        data: {
          email: `parent${i}@school.com`,
          password: await hash('parent123', 10),
          name: `Parent ${i}`,
          roleId: parentRole.id,
          profile: {
            create: {
              bio: `Parent of Student(s) ${i}`
            }
          }
        }
      });
    }

    // Student Users
    for (let i = 1; i <= 50; i++) {
      await prisma.user.create({
        data: {
          email: `student${i}@school.com`,
          password: await hash('student123', 10),
          name: `Student ${i}`,
          roleId: studentRole.id,
          profile: {
            create: {
              bio: `Student in Grade ${(i % 6) + 1}`
            }
          }
        }
      });
    }

    // MENU ITEMS
    const menuItems = [
      { id: 1, name: 'Dashboard', path: '/dashboard', icon: '📊', order: 1, parentId: null },
      { id: 2, name: 'Admin', path: '/dashboard/admin', icon: '👤', order: 2, parentId: null },
      { id: 3, name: 'List', path: '/dashboard/list', icon: '📝', order: 3, parentId: null },
      { id: 4, name: 'Announcements', path: '/dashboard/list/announcements', icon: '📢', order: 1, parentId: 3 },
      { id: 5, name: 'Assignments', path: '/dashboard/list/assignments', icon: '📚', order: 2, parentId: 3 },
      { id: 6, name: 'Classes', path: '/dashboard/list/classes', icon: '✨', order: 3, parentId: 3 },
      { id: 7, name: 'Exams', path: '/dashboard/list/exams', icon: '📝', order: 4, parentId: 3 },
      { id: 8, name: 'Lessons', path: '/dashboard/list/lessons', icon: '📚', order: 5, parentId: 3 },
      { id: 9, name: 'Students', path: '/dashboard/list/students', icon: '👨‍🎓', order: 6, parentId: 3 },
      { id: 10, name: 'Teachers', path: '/dashboard/list/teachers', icon: '👨‍🏫', order: 7, parentId: 3 },
    ];

    for (const item of menuItems) {
      await prisma.menu.create({
        data: {
          id: item.id,
          name: item.name,
          path: item.path,
          icon: item.icon,
          order: item.order,
          parentId: item.parentId,
        },
      });
    }

    console.log('Database has been seeded. 🌱');
  } catch (error) {
    console.error('Error seeding database:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
