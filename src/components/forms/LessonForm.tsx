"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import InputField from "../InputField";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { createLesson, updateLesson } from "@/lib/actions";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { Day } from "@prisma/client";

interface LessonFormData {
  id?: string;
  name: string;
  day: Day;
  startTime: string;
  endTime: string;
  subjectId: string;
  classId: string;
  teacherId: string;
}

const LessonForm = ({
  type,
  data,
  setOpen,
  relatedData,
}: {
  type: "create" | "update";
  data?: LessonFormData;
  setOpen: Dispatch<SetStateAction<boolean>>;
  relatedData?: {
    subjects: { id: number; name: string }[];
    classes: { id: number; name: string }[];
    teachers: { id: string; name: string; surname: string }[];
  };
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LessonFormData>();

  const [state, formAction] = useFormState(
    async (prevState: { success: boolean; error: boolean }, formData: FormData) => {
      return type === "create" ? createLesson(formData) : updateLesson(formData);
    },
    {
      success: false,
      error: false,
    }
  );

  const onSubmit = handleSubmit((formData) => {
    const formDataObj = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      formDataObj.append(key, value as string);
    });
    formAction(formDataObj);
  });

  const router = useRouter();

  useEffect(() => {
    if (state.success) {
      toast(`Lesson has been ${type === "create" ? "created" : "updated"}!`);
      setOpen(false);
      router.refresh();
    }
  }, [state, router, type, setOpen]);

  return (
    <form className="flex flex-col gap-8" onSubmit={onSubmit}>
      <h1 className="text-xl font-semibold">
        {type === "create" ? "Create a new lesson" : "Update the lesson"}
      </h1>
      <div className="flex justify-between flex-wrap gap-4">
        <InputField
          label="Name"
          name="name"
          defaultValue={data?.name}
          register={register}
          error={errors?.name}
        />
        <div className="flex flex-col gap-2 w-full md:w-[48%]">
          <label className="text-sm font-medium">Day</label>
          <select
            className="border rounded-md p-2"
            {...register("day")}
            defaultValue={data?.day}
          >
            <option value="">Select a day</option>
            {Object.values(Day).map((day) => (
              <option key={day} value={day}>
                {day}
              </option>
            ))}
          </select>
          {errors?.day && (
            <span className="text-red-500 text-sm">{errors.day.message}</span>
          )}
        </div>
        <InputField
          label="Start Time"
          name="startTime"
          type="time"
          defaultValue={data?.startTime}
          register={register}
          error={errors?.startTime}
        />
        <InputField
          label="End Time"
          name="endTime"
          type="time"
          defaultValue={data?.endTime}
          register={register}
          error={errors?.endTime}
        />
        <div className="flex flex-col gap-2 w-full md:w-[48%]">
          <label className="text-sm font-medium">Subject</label>
          <select
            className="border rounded-md p-2"
            {...register("subjectId")}
            defaultValue={data?.subjectId}
          >
            <option value="">Select a subject</option>
            {relatedData?.subjects.map((subject) => (
              <option key={subject.id} value={subject.id}>
                {subject.name}
              </option>
            ))}
          </select>
          {errors?.subjectId && (
            <span className="text-red-500 text-sm">{errors.subjectId.message}</span>
          )}
        </div>
        <div className="flex flex-col gap-2 w-full md:w-[48%]">
          <label className="text-sm font-medium">Class</label>
          <select
            className="border rounded-md p-2"
            {...register("classId")}
            defaultValue={data?.classId}
          >
            <option value="">Select a class</option>
            {relatedData?.classes.map((classItem) => (
              <option key={classItem.id} value={classItem.id}>
                {classItem.name}
              </option>
            ))}
          </select>
          {errors?.classId && (
            <span className="text-red-500 text-sm">{errors.classId.message}</span>
          )}
        </div>
        <div className="flex flex-col gap-2 w-full md:w-[48%]">
          <label className="text-sm font-medium">Teacher</label>
          <select
            className="border rounded-md p-2"
            {...register("teacherId")}
            defaultValue={data?.teacherId}
          >
            <option value="">Select a teacher</option>
            {relatedData?.teachers.map((teacher) => (
              <option key={teacher.id} value={teacher.id}>
                {teacher.name} {teacher.surname}
              </option>
            ))}
          </select>
          {errors?.teacherId && (
            <span className="text-red-500 text-sm">{errors.teacherId.message}</span>
          )}
        </div>
        {data && (
          <InputField
            label="Id"
            name="id"
            defaultValue={data?.id}
            register={register}
            error={errors?.id}
            hidden
          />
        )}
      </div>
      {state.error && (
        <span className="text-red-500">Something went wrong!</span>
      )}
      <button className="bg-blue-400 text-white p-2 rounded-md">
        {type === "create" ? "Create" : "Update"}
      </button>
    </form>
  );
};

export default LessonForm; 