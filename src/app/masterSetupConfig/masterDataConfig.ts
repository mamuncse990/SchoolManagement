import { MasterDataConfig } from "../masterDataTypes/masterData";

export const masterDataConfigs: Record<string, MasterDataConfig> = {
  "school-information": {
    tableName: "schoolInformation",
    label: "School Information",
    icon: "/school.png",
    fields: [
      { name: "name", label: "School Name", type: "text", required: true },
      { name: "address", label: "Address", type: "textarea", required: true },
      { name: "phone", label: "Phone", type: "text", required: true },
      { name: "email", label: "Email", type: "text", required: true },
      { name: "website", label: "Website", type: "text" },
      { name: "logo", label: "Logo", type: "file" },
      { name: "establishedYear", label: "Established Year", type: "number" },
      { name: "description", label: "Description", type: "textarea" },
      { name: "principalName", label: "Principal Name", type: "text" },
      { name: "principalEmail", label: "Principal Email", type: "text" },
      { name: "principalPhone", label: "Principal Phone", type: "text" },
      { name: "principalAddress", label: "Principal Address", type: "textarea" },
      { name: "principalPhoto", label: "Principal Photo", type: "file" },
      { name: "principalSignature", label: "Principal Signature", type: "file" },
      { name: "schoolType", label: "School Type", type: "text" },
      { name: "schoolCategory", label: "School Category", type: "text" },
      { name: "schoolBoard", label: "School Board", type: "text" },
      { name: "schoolAffiliationNumber", label: "School Affiliation Number", type: "text" },
      { name: "schoolLicenseNumber", label: "School License Number", type: "text" },
    ],
  },
  branch: {
    tableName: "Branch",
    label: "Branch",
    icon: "/branch.png",
    fields: [
      { name: "name", label: "Branch Name", type: "text", required: true },
      { name: "address", label: "Address", type: "textarea", required: true },
    ],
  },
  session: {
    tableName: "Session",
    label: "Session",
    icon: "/session.png",
    fields: [
      { name: "name", label: "Session Name", type: "text", required: true },
      { name: "startDate", label: "Start Date", type: "date", required: true },
      { name: "endDate", label: "End Date", type: "date", required: true },
    ],
  }, 
  group: {
    tableName: "Group",
    label: "Group",
    icon: "/group.png",
    fields: [
      { name: "name", label: "Group Name", type: "text", required: true },
      { name: "description", label: "Description", type: "textarea" },
    ],
  },
  shift: {
    tableName: "Shift",
    label: "Shift",
    icon: "/shift.png",
    fields: [
      { name: "name", label: "Shift Name", type: "text", required: true },
      { name: "startTime", label: "Start Time", type: "time", required: true },
      { name: "endTime", label: "End Time", type: "time", required: true },
    ],
  }, 
  version: {
    tableName: "Version",
    label: "Version",
    icon: "/version.png",
    fields: [
      { name: "name", label: "Version Name", type: "text", required: true },
      { name: "description", label: "Description", type: "textarea" },
    ],
  },
  gender: {
    tableName:"Gender",
    label:"Gender",
    icon: "/gender.png",
    fields: [
      { name: "name",
        label: "Gender Name",
        type: "text",
        required: true},
      { name: "description",
        label: "Description",
        type: "textarea",
        required: false},
    ],
  },
  religion: {
    tableName: "Religion",
    label: "Religion",
    icon: "/religion.png",
    fields: [
      { name: "name", label: "Religion Name", type: "text", required: true },
      { name: "description", label: "Description", type: "textarea" },
    ],
  },
  nationality: {
    tableName:"Nationality",
    label:"Nationality",  
    icon: "/nationality.png",
    fields: [
      { name: "name",
        label:"Name",
        type: "text",
        required: true},
      { name: "description",
        label: "Description",
        type: "textarea",
        required: false},
    ],
  },
  occupation: {
    tableName: "Occupation",  
    label: "Occupation",
    icon: "/occupation.png",
    fields: [
      { name: "name", label: "Occupation Name", type: "text", required: true },
      { name: "description", label: "Description", type: "textarea" },
    ],
  },
  designation: {
    tableName: "Designation", 
    label: "Designation",
    icon: "/designation.png",
    fields: [
      { name: "name", label: "Designation Name", type: "text", required: true },
      { name: "description", label: "Description", type: "textarea" },
    ],
  },
  bloodGroup: {
    tableName: "BloodGroup",
    label: "Blood Group",
    icon: "/bloodGroup.png",
    fields: [
      { name: "name", label: "Blood Group Name", type: "text", required: true },
      { name: "description", label: "Description", type: "textarea" },
    ],
  },
  class: {    tableName: "class",
    label: "Class",
    icon: "/class.png",
    fields: [
      { name: "name", label: "Class Name", type: "text", required: true },
      { name: "capacity", label: "Capacity", type: "number", required: true },
      { 
        name: "gradeId", 
        label: "Grade", 
        type: "select", 
        required: true,
        options: [] 
      },
      {
        name: "supervisorId",
        label: "Supervisor",
        type: "select",
        required: false,
        options: [],
      }
    ],
  },
  subject: {    tableName: "subject",
    label: "Subject",
    icon: "/subject.png",
    fields: [
      { name: "name", label: "Subject Name", type: "text", required: true },
    ],
  },
   "exam-type": {
    tableName: "examType",
    label: "Exam Type",
    icon: "/examType.png",
    fields: [
      { name: "name", label: "Type Name", type: "text", required: true },
      { name: "description", label: "Description", type: "textarea" },
    ],
  },
  "exam-grade": {
    tableName: "examGrade",
    label: "Exam Grade",
    icon: "/exam-grade.png",
    fields: [
      { name: "name", label: "Grade Name", type: "text", required: true },
      { name: "minScore", label: "Minimum Score", type: "number", required: true },
      { name: "maxScore", label: "Maximum Score", type: "number", required: true },
    ],
  },
  "menu": {
    tableName: "menu",
    label: "Menu",
    icon: "/menu.png",
    fields: [
      { name: "name", label: "Menu Name", type: "text", required: true },
      { name: "path", label: "Path", type: "text", required: true },
      { name: "icon", label: "Icon", type: "text" },
      { name: "order", label: "Order", type: "number" },
      { name: "isActive", label: "Is Active", type: "checkbox" },
      { name: "isVisible", label: "Is Visible", type: "checkbox" },
      { name: "isExternalLink", label: "Is External Link", type: "checkbox" },
      { name: "isParent", label: "Is Parent Menu", type: "checkbox" },
      { name: "parentId", label: "Parent Menu", type: "select" },
    ],
  },
//   student: {
//     tableName: "student",
//     label: "Student",
//     icon: "/student.png",
//     fields: [
//       { name: "firstName", label: "First Name", type: "text", required: true },
//       { name: "lastName", label: "Last Name", type: "text", required: true },
//       { name: "dob", label: "Date of Birth", type: "date", required: true },
//       {
//         name: "classId",
//         label: "Class",
//         type: "select",
//         required: true,
//         options: [],
//       }, // Options will be populated dynamically
//     ],
//   },
//   teacher: {
//     tableName: "teacher",
//     label: "Teacher",
//     icon: "/teacher.png",
//     fields: [
//       { name: "firstName", label: "First Name", type: "text", required: true },
//       { name: "lastName", label: "Last Name", type: "text", required: true },
//       { name: "dob", label: "Date of Birth", type: "date", required: true },
//       {
//         name: "subjectId",
//         label: "Subject",
//         type: "select",
//         required: true,
//         options: [],
//       }, // Options will be populated dynamically
//     ],
//   },
//   attendance: {
//     tableName: "attendance",
//     label: "Attendance",
//     icon: "/attendance.png",
//     fields: [
//       {
//         name: "studentId",
//         label: "Student",
//         type: "select",
//         required: true,
//         options: [],
//       }, // Options will be populated dynamically
//       { name: "date", label: "Date", type: "date", required: true },
//       {
//         name: "status",
//         label: "Status",
//         type: "select",
//         required: true,
//         options: [
//           { label: "Present", value: "present" },
//           { label: "Absent", value: "absent" },
//         ],
//       },
//     ],
//   },
//   exam: {
//     tableName: "exam",
//     label: "Exam",
//     icon: "/exam.png",
//     fields: [
//       { name: "name", label: "Exam Name", type: "text", required: true },
//       { name: "date", label: "Date", type: "date", required: true },
//       {
//         name: "classId",
//         label: "Class",
//         type: "select",
//         required: true,
//         options: [],
//       }, // Options will be populated dynamically
//     ],
//   },
//   grade: {
//     tableName: "grade",
//     label: "Grade",
//     icon: "/grade.png",
//     fields: [
//       { name: "name", label: "Grade Name", type: "text", required: true },
//       {
//         name: "minScore",
//         label: "Minimum Score",
//         type: "number",
//         required: true,
//       },
//       {
//         name: "maxScore",
//         label: "Maximum Score",
//         type: "number",
//         required: true,
//       },
//     ],
//   },
//   fee: {
//     tableName: "fee",
//     label: "Fee",
//     icon: "/fee.png",
//     fields: [
//       { name: "amount", label: "Amount", type: "number", required: true },
//       { name: "dueDate", label: "Due Date", type: "date", required: true },
//       {
//         name: "studentId",
//         label: "Student",
//         type: "select",
//         required: true,
//         options: [],
//       }, // Options will be populated dynamically
//     ],
//   },
//   notification: {
//     tableName: "notification",
//     label: "Notification",
//     icon: "/notification.png",
//     fields: [
//       { name: "title", label: "Title", type: "text", required: true },
//       { name: "message", label: "Message", type: "textarea", required: true },
//       { name: "date", label: "Date", type: "date", required: true },
//     ],
//   },
//   event: {
//     tableName: "event",
//     label: "Event",
//     icon: "/event.png",
//     fields: [
//       { name: "title", label: "Title", type: "text", required: true },
//       {
//         name: "description",
//         label: "Description",
//         type: "textarea",
//         required: true,
//       },
//       { name: "date", label: "Date", type: "date", required: true },
//     ],
//   },
//   "report-card": {
//     tableName: "reportCard",
//     label: "Report Card",
//     icon: "/report-card.png",
//     fields: [
//       {
//         name: "studentId",
//         label: "Student",
//         type: "select",
//         required: true,
//         options: [],
//       }, // Options will be populated dynamically
//       {
//         name: "examId",
//         label: "Exam",
//         type: "select",
//         required: true,
//         options: [],
//       }, // Options will be populated dynamically
//       {
//         name: "gradeId",
//         label: "Grade",
//         type: "select",
//         required: true,
//         options: [],
//       }, // Options will be populated dynamically
//     ],
//   },
//   library: {
//     tableName: "library",
//     label: "Library",
//     icon: "/library.png",
//     fields: [
//       { name: "bookTitle", label: "Book Title", type: "text", required: true },
//       { name: "author", label: "Author", type: "text", required: true },
//       { name: "isbn", label: "ISBN", type: "text", required: true },
//       {
//         name: "publishedDate",
//         label: "Published Date",
//         type: "date",
//         required: true,
//       },
//     ],
//   },
//   transportation: {
//     tableName: "transportation",
//     label: "Transportation",
//     icon: "/transportation.png",
//     fields: [
//       {
//         name: "vehicleNumber",
//         label: "Vehicle Number",
//         type: "text",
//         required: true,
//       },
//       {
//         name: "driverName",
//         label: "Driver Name",
//         type: "text",
//         required: true,
//       },
//       { name: "route", label: "Route", type: "textarea", required: true },
//     ],
//   },
//   circular: {
//     tableName: "circular",
//     label: "Circular",
//     icon: "/circular.png",
//     fields: [
//       { name: "title", label: "Title", type: "text", required: true },
//       { name: "message", label: "Message", type: "textarea", required: true },
//       { name: "date", label: "Date", type: "date", required: true },
//     ],
//   },
//   holiday: {
//     tableName: "holiday",
//     label: "Holiday",
//     icon: "/holiday.png",
//     fields: [
//       { name: "name", label: "Holiday Name", type: "text", required: true },
//       { name: "date", label: "Date", type: "date", required: true },
//     ],
//   },
//   "fee-structure": {
//     tableName: "feeStructure",
//     label: "Fee Structure",
//     icon: "/fee-structure.png",
//     fields: [
//       {
//         name: "classId",
//         label: "Class",
//         type: "select",
//         required: true,
//         options: [],
//       }, // Options will be populated dynamically
//       { name: "amount", label: "Amount", type: "number", required: true },
//       { name: "dueDate", label: "Due Date", type: "date", required: true },
//     ],
//   },
//   "exam-schedule": {
//     tableName: "examSchedule",
//     label: "Exam Schedule",
//     icon: "/exam-schedule.png",
//     fields: [
//       {
//         name: "examId",
//         label: "Exam",
//         type: "select",
//         required: true,
//         options: [],
//       }, // Options will be populated dynamically
//       { name: "date", label: "Date", type: "date", required: true },
//       { name: "time", label: "Time", type: "text", required: true },
//     ],
//   },
//   "attendance-report": {
//     tableName: "attendanceReport",
//     label: "Attendance Report",
//     icon: "/attendance-report.png",
//     fields: [
//       {
//         name: "studentId",
//         label: "Student",
//         type: "select",
//         required: true,
//         options: [],
//       }, 
//       { name: "date", label: "Date", type: "date", required: true },
//       {
//         name: "status",
//         label: "Status",
//         type: "select",
//         required: true,
//         options: [
//           { label: "Present", value: "present" },
//           { label: "Absent", value: "absent" },
//         ],
//       },
//     ],
//   },
//   "exam-report": {
//     tableName: "examReport",
//     label: "Exam Report",
//     icon: "/exam-report.png",
//     fields: [
//       {
//         name: "studentId",
//         label: "Student",
//         type: "select",
//         required: true,
//         options: [],
//       }, // Options will be populated dynamically
//       {
//         name: "examId",
//         label: "Exam",
//         type: "select",
//         required: true,
//         options: [],
//       }, // Options will be populated dynamically
//       {
//         name: "gradeId",
//         label: "Grade",
//         type: "select",
//         required: true,
//         options: [],
//       }, // Options will be populated dynamically
//     ],
//   },
//   "library-issue": {
//     tableName: "libraryIssue",
//     label: "Library Issue",
//     icon: "/library-issue.png",
//     fields: [
//       {
//         name: "studentId",
//         label: "Student",
//         type: "select",
//         required: true,
//         options: [],
//       }, // Options will be populated dynamically
//       {
//         name: "bookId",
//         label: "Book",
//         type: "select",
//         required: true,
//         options: [],
//       }, // Options will be populated dynamically
//       { name: "issueDate", label: "Issue Date", type: "date", required: true },
//       { name: "returnDate", label: "Return Date", type: "date" },
//     ],
//   },
 
  // Add more table configurations as needed
};
