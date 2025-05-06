"use server";

import { revalidatePath } from "next/cache";
import {
  ClassSchema,
  ExamSchema,
  StudentSchema,
  SubjectSchema,
  TeacherSchema,
} from "./formValidationSchemas";
import { prisma } from "./prisma";
import { Clerk } from "@clerk/clerk-sdk-node";
import { UserSex, Day } from "@prisma/client";

const clerk = Clerk({ secretKey: process.env.CLERK_SECRET_KEY });

type CurrentState = { success: boolean; error: boolean };

export const createSubject = async (
  currentState: CurrentState,
  data: SubjectSchema
) => {
  try {
    await prisma.subject.create({
      data: {
        name: data.name,
        teachers: {
          connect: data.teachers.map((teacherId) => ({ id: teacherId })),
        },
      },
    });

    // revalidatePath("/list/subjects");
    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};

export const updateSubject = async (
  currentState: CurrentState,
  data: SubjectSchema
) => {
  try {
    await prisma.subject.update({
      where: {
        id: data.id,
      },
      data: {
        name: data.name,
        teachers: {
          set: data.teachers.map((teacherId) => ({ id: teacherId })),
        },
      },
    });

    // revalidatePath("/list/subjects");
    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};

export const deleteSubject = async (
  currentState: CurrentState,
  data: FormData
) => {
  const id = data.get("id") as string;
  try {
    await prisma.subject.delete({
      where: {
        id: parseInt(id),
      },
    });

    // revalidatePath("/list/subjects");
    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};

export const createClass = async (
  currentState: CurrentState,
  data: ClassSchema
) => {
  try {
    await prisma.class.create({
      data,
    });

    // revalidatePath("/list/class");
    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};

export const updateClass = async (
  currentState: CurrentState,
  data: ClassSchema
) => {
  try {
    await prisma.class.update({
      where: {
        id: data.id,
      },
      data,
    });

    // revalidatePath("/list/class");
    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};

export const deleteClass = async (
  currentState: CurrentState,
  data: FormData
) => {
  const id = data.get("id") as string;
  try {
    await prisma.class.delete({
      where: {
        id: parseInt(id),
      },
    });

    // revalidatePath("/list/class");
    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};

// Helper function to generate a random password
function generatePassword() {
  const length = 12;
  const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
  let password = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset[randomIndex];
  }
  return password;
}

export async function createStudent(prevState: any, formData: FormData) {
  try {
    const { username, name, surname, email, phone, address, bloodType, sex, birthday, parentId, classId, gradeId } =
      Object.fromEntries(formData);

    // Create user in Clerk
    const user = await clerk.users.createUser({
      username: username as string,
      emailAddress: [email as string],
      password: generatePassword(),
    });

    // Create student in database
    await prisma.student.create({
      data: {
        id: user.id,
        username: username as string,
        name: name as string,
        surname: surname as string,
        email: email as string,
        phone: phone as string,
        address: address as string,
        bloodType: bloodType as string,
        sex: sex as UserSex,
        birthday: new Date(birthday as string),
        parentId: parentId as string,
        classId: parseInt(classId as string),
        gradeId: parseInt(gradeId as string),
      },
    });

    return { success: true, error: false };
  } catch (error: unknown) {
    console.error("Error creating student:", error instanceof Error ? error.message : error);
    return { success: false, error: true };
  }
}

export async function updateStudent(prevState: any, formData: FormData) {
  try {
    const { id, username, name, surname, email, phone, address, bloodType, sex, birthday, parentId, classId, gradeId } =
      Object.fromEntries(formData);

    // Update student in database
    await prisma.student.update({
      where: { id: id as string },
      data: {
        username: username as string,
        name: name as string,
        surname: surname as string,
        email: email as string,
        phone: phone as string,
        address: address as string,
        bloodType: bloodType as string,
        sex: sex as UserSex,
        birthday: new Date(birthday as string),
        parentId: parentId as string,
        classId: parseInt(classId as string),
        gradeId: parseInt(gradeId as string),
      },
    });

    return { success: true, error: false };
  } catch (error: unknown) {
    console.error("Error updating student:", error instanceof Error ? error.message : error);
    return { success: false, error: true };
  }
}

export async function deleteStudent(prevState: any, formData: FormData) {
  try {
    const { id } = Object.fromEntries(formData);

    // Delete student from database first
    await prisma.student.delete({
      where: { id: id as string },
    });

    // Try to delete user from Clerk, but continue even if it fails
    try {
      await clerk.users.deleteUser(id as string);
    } catch (clerkError) {
      console.error("Error deleting user from Clerk:", clerkError);
      // Continue execution even if Clerk deletion fails
    }

    return { success: true, error: false };
  } catch (error: unknown) {
    console.error("Error deleting student:", error instanceof Error ? error.message : error);
    return { success: false, error: true };
  }
}

export const createExam = async (
  currentState: CurrentState,
  data: ExamSchema
) => {
  // const { userId, sessionClaims } = auth();
  // const role = (sessionClaims?.metadata as { role?: string })?.role;

  try {
    // if (role === "teacher") {
    //   const teacherLesson = await prisma.lesson.findFirst({
    //     where: {
    //       teacherId: userId!,
    //       id: data.lessonId,
    //     },
    //   });

    //   if (!teacherLesson) {
    //     return { success: false, error: true };
    //   }
    // }

    await prisma.exam.create({
      data: {
        title: data.name,
        startTime: data.date,
        endTime: data.date,
        lessonId: parseInt(data.lessonId),
      },
    });

    // revalidatePath("/list/subjects");
    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};

export const updateExam = async (
  currentState: CurrentState,
  data: ExamSchema
) => {
  // const { userId, sessionClaims } = auth();
  // const role = (sessionClaims?.metadata as { role?: string })?.role;

  try {
    // if (role === "teacher") {
    //   const teacherLesson = await prisma.lesson.findFirst({
    //     where: {
    //       teacherId: userId!,
    //       id: data.lessonId,
    //     },
    //   });

    //   if (!teacherLesson) {
    //     return { success: false, error: true };
    //   }
    // }

    await prisma.exam.update({
      where: {
        id: parseInt(data.id!),
      },
      data: {
        title: data.name,
        startTime: data.date,
        endTime: data.date,
        lessonId: parseInt(data.lessonId),
      },
    });

    // revalidatePath("/list/subjects");
    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};

export const deleteExam = async (
  currentState: CurrentState,
  data: FormData
) => {
  const id = data.get("id") as string;

  // const { userId, sessionClaims } = auth();
  // const role = (sessionClaims?.metadata as { role?: string })?.role;

  try {
    await prisma.exam.delete({
      where: {
        id: parseInt(id),
      },
    });

    // revalidatePath("/list/subjects");
    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};

export async function createTeacher(prevState: any, formData: FormData) {
  try {
    const { username, name, surname, email, phone, address, bloodType, sex, birthday } =
      Object.fromEntries(formData);

    // Create user in Clerk
    const user = await clerk.users.createUser({
      username: username as string,
      emailAddress: [email as string],
      password: generatePassword(),
    });

    // Create teacher in database
    await prisma.teacher.create({
      data: {
        id: user.id,
        username: username as string,
        name: name as string,
        surname: surname as string,
        email: email as string,
        phone: phone as string,
        address: address as string,
        bloodType: bloodType as string,
        sex: sex as UserSex,
        birthday: new Date(birthday as string),
      },
    });

    return { success: true, error: false };
  } catch (error: unknown) {
    console.error("Error creating teacher:", error instanceof Error ? error.message : error);
    return { success: false, error: true };
  }
}

export async function updateTeacher(prevState: any, formData: FormData) {
  try {
    const { id, username, name, surname, email, phone, address, bloodType, sex, birthday } =
      Object.fromEntries(formData);

    // Update teacher in database
    await prisma.teacher.update({
      where: { id: id as string },
      data: {
        username: username as string,
        name: name as string,
        surname: surname as string,
        email: email as string,
        phone: phone as string,
        address: address as string,
        bloodType: bloodType as string,
        sex: sex as UserSex,
        birthday: new Date(birthday as string),
      },
    });

    return { success: true, error: false };
  } catch (error: unknown) {
    console.error("Error updating teacher:", error instanceof Error ? error.message : error);
    return { success: false, error: true };
  }
}

export async function deleteTeacher(prevState: any, formData: FormData) {
  try {
    const { id } = Object.fromEntries(formData);

    // Delete teacher from database first
    await prisma.teacher.delete({
      where: { id: id as string },
    });

    // Try to delete user from Clerk, but continue even if it fails
    try {
      await clerk.users.deleteUser(id as string);
    } catch (clerkError) {
      console.error("Error deleting user from Clerk:", clerkError);
      // Continue execution even if Clerk deletion fails
    }

    return { success: true, error: false };
  } catch (error: unknown) {
    console.error("Error deleting teacher:", error instanceof Error ? error.message : error);
    return { success: false, error: true };
  }
}
export async function deleteUser(prevState: any, formData: FormData) {
  try {
    const { id } = Object.fromEntries(formData);

    // Delete user from database first
    await prisma.user.delete({
      where: { id: parseInt(id as string) },
    });

    // Try to delete user from Clerk, but continue even if it fails
    try {
      await clerk.users.deleteUser(id as string);
    } catch (clerkError) {
      console.error("Error deleting user from Clerk:", clerkError);
      // Continue execution even if Clerk deletion fails
    }

    return { success: true, error: false };
  } catch (error: unknown) {
    console.error("Error deleting user:", error instanceof Error ? error.message : error);
    return { success: false, error: true };
  }
}

export async function createParent(prevState: any, formData: FormData) {
  try {
    const { username, name, surname, email, phone, address } = Object.fromEntries(formData);

    // Create user in Clerk
    const user = await clerk.users.createUser({
      username: username as string,
      emailAddress: [email as string],
      password: generatePassword(),
    });

    // Create parent in database
    await prisma.parent.create({
      data: {
        id: user.id,
        username: username as string,
        name: name as string,
        surname: surname as string,
        email: email as string,
        phone: phone as string,
        address: address as string,
      },
    });

    return { success: true, error: false };
  } catch (error: unknown) {
    console.error("Error creating parent:", error instanceof Error ? error.message : error);
    return { success: false, error: true };
  }
}

export async function updateParent(prevState: any, formData: FormData) {
  try {
    const { id, username, name, surname, email, phone, address } = Object.fromEntries(formData);

    // Update parent in database
    await prisma.parent.update({
      where: { id: id as string },
      data: {
        username: username as string,
        name: name as string,
        surname: surname as string,
        email: email as string,
        phone: phone as string,
        address: address as string,
      },
    });

    return { success: true, error: false };
  } catch (error: unknown) {
    console.error("Error updating parent:", error instanceof Error ? error.message : error);
    return { success: false, error: true };
  }
}

export async function createLesson(formData: FormData) {
  try {
    const name = formData.get("name") as string;
    const day = formData.get("day") as Day;
    const startTime = formData.get("startTime") as string;
    const endTime = formData.get("endTime") as string;
    const subjectId = parseInt(formData.get("subjectId") as string);
    const classId = parseInt(formData.get("classId") as string);
    const teacherId = formData.get("teacherId") as string;

    await prisma.lesson.create({
      data: {
        name,
        day,
        startTime,
        endTime,
        subjectId,
        classId,
        teacherId,
      },
    });

    return { success: true, error: false };
  } catch (error) {
    console.error("Error creating lesson:", error);
    return { success: false, error: true };
  }
}

export async function updateLesson(formData: FormData) {
  try {
    const id = parseInt(formData.get("id") as string);
    const name = formData.get("name") as string;
    const day = formData.get("day") as Day;
    const startTime = formData.get("startTime") as string;
    const endTime = formData.get("endTime") as string;
    const subjectId = parseInt(formData.get("subjectId") as string);
    const classId = parseInt(formData.get("classId") as string);
    const teacherId = formData.get("teacherId") as string;

    await prisma.lesson.update({
      where: { id },
      data: {
        name,
        day,
        startTime,
        endTime,
        subjectId,
        classId,
        teacherId,
      },
    });

    return { success: true, error: false };
  } catch (error) {
    console.error("Error updating lesson:", error);
    return { success: false, error: true };
  }
}

export async function createEvent(formData: FormData) {
  try {
    const title = formData.get("title") as string;
    const startTime = formData.get("startTime") as string;
    const endTime = formData.get("endTime") as string;
    const classId = formData.get("classId") as string;

    const eventData: any = {
      title,
      startTime: new Date(startTime),
      endTime: new Date(endTime),
    };
    if (classId) {
      eventData.classId = parseInt(classId);
    }
    await prisma.event.create({ data: eventData });

    return { success: true, error: false };
  } catch (error) {
    console.error("Error creating event:", error);
    return { success: false, error: true };
  }
}

export async function updateEvent(formData: FormData) {
  try {
    const id = parseInt(formData.get("id") as string);
    const title = formData.get("title") as string;
    const startTime = formData.get("startTime") as string;
    const endTime = formData.get("endTime") as string;
    const classId = formData.get("classId") as string;

    await prisma.event.update({
      where: { id },
      data: {
        title,
        startTime: new Date(startTime),
        endTime: new Date(endTime),
        ...(classId ? { classId: parseInt(classId) } : {}),
      },
    });

    return { success: true, error: false };
  } catch (error) {
    console.error("Error updating event:", error);
    return { success: false, error: true };
  }
}

export async function deleteMessage(prevState: any, formData: FormData) {
  const id = formData.get("id") as string;
  try {
    await prisma.message.delete({ where: { id } });
    return { success: true, error: false };
  } catch (error) {
    console.error("Error deleting message:", error instanceof Error ? error.message : error);
    return { success: false, error: true };
  }
}

export async function createAttendance(formData: FormData) {
  try {
    const date = formData.get("date") as string;
    const present = formData.get("present") === "true";
    const studentId = formData.get("studentId") as string;
    const lessonId = formData.get("lessonId") as string;

    await prisma.attendance.create({
      data: {
        date: new Date(date),
        present,
        studentId,
        lessonId: parseInt(lessonId),
      },
    });

    return { success: true, error: false };
  } catch (error) {
    console.error("Error creating attendance:", error);
    return { success: false, error: true };
  }
}

export async function updateAttendance(formData: FormData) {
  try {
    const id = formData.get("id") as string;
    const date = formData.get("date") as string;
    const present = formData.get("present") === "true";
    const studentId = formData.get("studentId") as string;
    const lessonId = formData.get("lessonId") as string;

    await prisma.attendance.update({
      where: { id: parseInt(id) },
      data: {
        date: new Date(date),
        present,
        studentId,
        lessonId: parseInt(lessonId),
      },
    });

    return { success: true, error: false };
  } catch (error) {
    console.error("Error updating attendance:", error);
    return { success: false, error: true };
  }
}
