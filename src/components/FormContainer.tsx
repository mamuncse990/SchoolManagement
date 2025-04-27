'use client'

import { useState, useEffect } from "react";
import { prisma } from "@/lib/prisma";
import FormModal from "./FormModal";

export type FormContainerProps = {
  table:
    | "teacher"
    | "user"
    | "student"
    | "parent"
    | "subject"
    | "class"
    | "lesson"
    | "exam"
    | "assignment"
    | "result"
    | "attendance"
    | "event"
    | "announcement";
  type: "create" | "update" | "delete";
  data?: any;
  id?: number | string;
};

const FormContainer = ({ table, type, data, id }: FormContainerProps) => {
  const [relatedData, setRelatedData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        switch (table) {
          case "subject":
            const subjectTeachersRes = await fetch('/api/teachers', {
              credentials: 'include'
            });
            if (!subjectTeachersRes.ok) throw new Error('Failed to fetch teachers');
            const subjectTeachersData = await subjectTeachersRes.json();
            setRelatedData({ teachers: subjectTeachersData });
            break;
          case "class":
            const [classGradesRes, classTeachersRes] = await Promise.all([
              fetch('/api/grades', { credentials: 'include' }),
              fetch('/api/teachers', { credentials: 'include' })
            ]);
            
            if (!classGradesRes.ok || !classTeachersRes.ok) {
              throw new Error('Failed to fetch class data');
            }
            
            const [classGradesData, classTeachersData] = await Promise.all([
              classGradesRes.json(),
              classTeachersRes.json()
            ]);
            setRelatedData({ teachers: classTeachersData, grades: classGradesData });
            break;
          case "teacher":
            try {
              const response = await fetch('/api/subjects', {
                credentials: 'include',
                headers: {
                  'Content-Type': 'application/json',
                },
              });
              
              if (!response.ok) {
                const errorText = await response.text();
                console.error('API Error:', errorText);
                throw new Error(`Failed to fetch subjects: ${response.status}`);
              }
              
              const teacherSubjects = await response.json();
              setRelatedData({ subjects: teacherSubjects });
            } catch (error) {
              console.error('Error in teacher case:', error);
              setError(error instanceof Error ? error.message : 'Failed to fetch subjects');
            }
            break;
          case "student":
            const studentDataResponse = await fetch('/api/student-data', { credentials: 'include' });
            if (!studentDataResponse.ok) throw new Error('Failed to fetch student data');
            const { grades: studentGrades, classes: studentClasses } = await studentDataResponse.json();
            setRelatedData({ 
              classes: studentClasses.map((classItem: any) => ({
                ...classItem,
                _count: { students: 0 } // Default value if not provided
              })), 
              grades: studentGrades 
            });
            break;
          case "exam":
            const examResponse = await fetch('/api/lessons', { credentials: 'include' });
            if (!examResponse.ok) throw new Error('Failed to fetch lessons');
            const examLessons = await examResponse.json();
            setRelatedData({ lessons: examLessons });
            break;
          case "event":
            const eventClassesRes = await fetch('/api/classes', { credentials: 'include' });
            if (!eventClassesRes.ok) throw new Error('Failed to fetch classes');
            const { data: eventClasses } = await eventClassesRes.json();
            setRelatedData({ classes: eventClasses });
            break;
          default:
            break;
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error instanceof Error ? error.message : 'An error occurred');
      }
    };
    fetchData();
  }, [table]);

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  return (
    <div className="">
      <FormModal
        table={table}
        type={type}
        data={data}
        id={id}
        relatedData={relatedData}
      />
    </div>
  );
};

export default FormContainer;
