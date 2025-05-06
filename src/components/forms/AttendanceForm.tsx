"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import InputField from "../InputField";
import { Dispatch, SetStateAction, useEffect } from "react";
import { useFormState } from "react-dom";
import { createAttendance, updateAttendance } from "@/lib/actions";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { z } from "zod";

const attendanceSchema = z.object({
  id: z.string().optional(),
  date: z.string().min(1, "Date is required"),
  present: z.boolean(),
  studentId: z.string().min(1, "Student is required"),
  lessonId: z.string().min(1, "Lesson is required"),
});

type AttendanceFormData = z.infer<typeof attendanceSchema>;

const AttendanceForm = ({
  type,
  data,
  setOpen,
  relatedData,
}: {
  type: "create" | "update";
  data?: AttendanceFormData;
  setOpen: Dispatch<SetStateAction<boolean>>;
  relatedData?: {
    students: { id: string; name: string; surname: string }[];
    lessons: { id: string; name: string; class: { name: string } }[];
  };
}) => {
  console.log('AttendanceForm relatedData:', relatedData);
  console.log('AttendanceForm type:', type);
  console.log('AttendanceForm data:', data);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AttendanceFormData>({
    resolver: zodResolver(attendanceSchema),
  });

  const [state, formAction] = useFormState(
    async (prevState: { success: boolean; error: boolean }, formData: FormData) => {
      return type === "create" ? createAttendance(formData) : updateAttendance(formData);
    },
    {
      success: false,
      error: false,
    }
  );

  const onSubmit = handleSubmit((formData) => {
    const formDataObj = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (key === "present") {
        // Convert the present field to a boolean
        formDataObj.append(key, value === "true" ? "true" : "false");
      } else if (value !== undefined) {
        formDataObj.append(key, value.toString());
      }
    });
    formAction(formDataObj);
  });

  const router = useRouter();

  useEffect(() => {
    if (state.success) {
      toast(`Attendance has been ${type === "create" ? "created" : "updated"}!`);
      setOpen(false);
      router.refresh();
    }
  }, [state, router, type, setOpen]);

  return (
    <form className="flex flex-col gap-8" onSubmit={onSubmit}>
      <h1 className="text-xl font-semibold">
        {type === "create" ? "Create new attendance" : "Update attendance"}
      </h1>
      <div className="flex justify-between flex-wrap gap-4">
        <InputField
          label="Date"
          name="date"
          type="date"
          defaultValue={data?.date ? new Date(data.date).toISOString().split('T')[0] : undefined}
          register={register}
          error={errors?.date}
        />
        <div className="flex flex-col gap-2 w-full md:w-[48%]">
          <label className="text-sm font-medium">Student</label>
          <select
            className="border rounded-md p-2"
            {...register("studentId")}
            defaultValue={data?.studentId}
          >
            <option value="">Select a student</option>
            {Array.isArray(relatedData?.students) && relatedData.students.length > 0 ? (
              relatedData.students.map((student) => (
                <option key={student.id} value={student.id}>
                  {student.name} {student.surname}
                </option>
              ))
            ) : (
              <option value="" disabled>No students available</option>
            )}
          </select>
          {errors?.studentId && (
            <span className="text-red-500 text-sm">{errors.studentId.message}</span>
          )}
        </div>
        <div className="flex flex-col gap-2 w-full md:w-[48%]">
          <label className="text-sm font-medium">Lesson</label>
          <select
            className="border rounded-md p-2"
            {...register("lessonId")}
            defaultValue={data?.lessonId}
          >
            <option value="">Select a lesson</option>
            {Array.isArray(relatedData?.lessons) && relatedData.lessons.map((lesson) => (
              <option key={lesson.id} value={lesson.id}>
                {lesson.name} ({lesson.class.name})
              </option>
            ))}
          </select>
          {errors?.lessonId && (
            <span className="text-red-500 text-sm">{errors.lessonId.message}</span>
          )}
        </div>
        <div className="flex flex-col gap-2 w-full md:w-[48%]">
          <label className="text-sm font-medium">Status</label>
          <select
            className="border rounded-md p-2"
            {...register("present")}
            defaultValue={data?.present?.toString()}
          >
            <option value="true">Present</option>
            <option value="false">Absent</option>
          </select>
          {errors?.present && (
            <span className="text-red-500 text-sm">{errors.present.message}</span>
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
      <button
        type="submit"
        className="bg-lamaPurple text-white py-2 px-4 rounded-md hover:bg-lamaPurpleDark"
      >
        {type === "create" ? "Create" : "Update"}
      </button>
    </form>
  );
};

export default AttendanceForm;