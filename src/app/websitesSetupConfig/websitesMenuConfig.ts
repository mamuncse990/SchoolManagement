import { websitesDataConfig } from "../websitesDataTypes/websitesData";

export const websitesMenuConfig: Record<string, websitesDataConfig> = {
 "About": {
    tableName: "about",
    label: "ABOUT",
    icon: "/about.png",
    hasSubmenu: true,
    fields: [],
    submenu: [
      {
        tableName: "aboutUs",
        label: "About Us",
        icon: "/about.png",
        fields: [
          {
            name: "aboutUs",
            label: "About Us",
            type: "textarea",
            placeholder: "Enter founder & doner list content",
            required: true
          }
        ]
      },
      {
        tableName: "founderAndDoner",
        label: "Founder & Doner List",
        icon: "/about.png",
        fields: [
          {
            name: "founderAndDonerList",
            label: "Founder & Doner List",
            type: "textarea",
            placeholder: "Enter founder & doner list content",
            required: true
          }
        ]
      },
      {
        tableName: "history",
        label: "History",
        icon: "/about.png",
        fields: [
          {
            name: "history",
            label: "History",
            type: "textarea",
            placeholder: "Enter history content",
            required: true
          }
        ]
      },
      {
        tableName: "vision",
        label: "Our Vision",
        icon: "/about.png",
        fields: [
          {
            name: "vision",
            label: "Our Vision",
            type: "textarea",
            placeholder: "Enter our vision content",
            required: true
          }
        ]
      },
      {
        tableName: "CampusTour",
        label: "Campus Tour",
        icon: "/about.png",
        fields: [
          {
            name: "campusTour",
            label: "Campus Tour",
            type: "textarea",
            placeholder: "Enter campus tour content",
            required: true
          }
        ]
      },
      {
        tableName: "achievements",
        label: "Achievements",
        icon: "/about.png",
        fields: [
          {
            name: "achievements",
            label: "Achievements",
            type: "textarea",
            placeholder: "Enter achievements content",
            required: true
          }
        ]
      },
      {
        tableName: "honorableChairman",
        label: "Honorable Chairman",
        icon: "/about.png",
        fields: [
          {
            name: "chairman",
            label: "Honorable Chairman",
            type: "textarea",
            placeholder: "Enter honorable chairman content",
            required: true
          }
        ]
      },
      {
        tableName: "governingBody",
        label: "Governing Body",
        icon: "/about.png",
        fields: [
          {
            name: "governingBody",
            label: "Governing Body",
            type: "textarea",
            placeholder: "Enter governing body content",
            required: true
          }
        ]
      },
      {
        tableName: "exGoverningBody",
        label: "Ex Governing Body",
        icon: "/about.png",
        fields: [
          {
            name: "exGoverningBody",
            label: "Ex Governing Body",
            type: "textarea",
            placeholder: "Enter ex governing body content",
            required: true
          }
        ]
      },
      {
        tableName: "principal",
        label: "Our Principal",
        icon: "/about.png",
        fields: [
          {
            name: "principal",
            label: "Our Principal",
            type: "textarea",
            placeholder: "Enter our principal content",
            required: true
          }
        ]
      },
      {
        tableName: "exPrincipals",
        label: "Our Ex Principals",
        icon: "/about.png",
        fields: [
          {
            name: "exPrincipals",
            label: "Our Ex Principals",
            type: "textarea",
            placeholder: "Enter our ex principals content",
            required: true
          }
        ]
      },
      {
        tableName: "administrator",
        label: "Administrator",
        icon: "/about.png",
        fields: [
          {
            name: "administrator",
            label: "Administrator",
            type: "textarea",
            placeholder: "Enter administrator content",
            required: true
          }
        ]
      }
    ]
  },
  "Information": {
    tableName: "information",
    label: "INFORMATION",
    icon: "/information.png",
    hasSubmenu: true,
    fields: [],
    submenu: [
      {
        tableName: "teaching-permission",
        label: "Teaching Permission & Recognition Letter",
        icon: "/teaching-permission.png",
        fields: [
          {
            name: "teachingPermission",
            label: "Teaching Permission",
            type: "textarea",
            placeholder: "Enter teaching permission content",
            required: true
          }
        ]
      },
      {
        tableName: "Nationalization",
        label: "Nationalization",
        icon: "/nationalization.png",
        fields: [
          {
            name: "nationalization",
            label: "Nationalization",
            type: "textarea",
            placeholder: "Enter nationalization content",
            required: true
          }
        ]
      },
      {
        tableName: "StatisticsReport",
        label: "Statistics Report",
        icon: "/recognition.png",
        fields: [
          {
            name: "statisticsReport",
            label: "Statistics Report",
            type: "textarea",
            placeholder: "Enter statistics report content",
            required: true
          }
        ]
      },
      {
        tableName: "approval-letter",
        label: "Govt. Approval Letter",
        icon: "/approval-letter.png",
        fields: [
          {
            name: "approvalLetter",
            label: "Govt. Approval Letter",
            type: "textarea",
            placeholder: "Enter govt. approval letter content",
            required: true
          }
        ]
      }
    ],
  },
  "Academic": {
    tableName: "academic",
    label: "ACADEMIC",
    icon: "/academic.png",
    hasSubmenu: true, 
    fields: [],
    submenu: [
      {
        tableName: "classSchedule",
        label: "Class Schedule",
        icon: "/academic.png",
        fields: [{
          name: "classSchedule", 
          label: "Class Schedule",
          type: "textarea",
          placeholder: "Enter class schedule content",
          required: true
        }]
      },
      {
        tableName: "teachers",
        label: "Our Teachers",
        icon: "/teachers.png",
        fields: [{
          name: "teachers",
          label: "Teachers",
          type: "textarea",
          placeholder: "Enter teachers content",
          required: true
        }]
      },
      {
        tableName:"prior-teachers",
        label: "Prior Teachers",
        icon: "/teachers.png",
        fields: [{
          name: "priorTeachers",
          label: "Prior Teachers",
          type: "textarea",
          placeholder: "Enter prior teachers content",
          required: true
        }]
      },
      {
        tableName:"staffs",
        label: "Our Staffs",
        icon: "/staffs.png",
        fields: [{
          name: "staffs",
          label: "Staffs",
          type: "textarea",
          placeholder: "Enter staffs content",
          required: true
        }]
      },
      {
        tableName:"PriorStaffs",
        label: "Prior Staffs", 
        icon: "/staffs.png",
        fields: [{
          name: "priorStaffs",
          label: "Prior Staffs",
          type: "textarea",
          placeholder: "Enter prior staffs content",
          required: true
        }]
      },
      {
        tableName: "AcademicCalendar",
        label: "Academic Calendar",
        icon: "/academic-calender.png",
        fields: [{
          name: "academicCalendar",
          label: "Academic Calendar",
          type: "textarea",
          placeholder: "Enter academic calendar content",
          required: true
        }]
      },
      {
        tableName: "AttendanceSheet",
        label: "Attendance Sheet",
        icon: "/attendance-sheet.png",
        fields: [{
          name: "attendanceSheet",
          label: "Attendance Sheet",
          type: "textarea",
          placeholder: "Enter attendance sheet content",
          required: true
        }]
      }
    ]
  },
  "Admission": {
    tableName: "admission",
    label: "ADMISSION",
    icon: "/admission.png",
    hasSubmenu: true,
    fields: [],
    submenu: [
      {
        tableName: "whyStudy",
        label: "Why Study ?",
        icon: "/admission.png",
        fields: [{
          name: "whyStudy",
          label: "Why Study ?",
          type: "textarea",
          placeholder: "Enter why study content",
          required: true
        }]
      },
      {
        tableName: "how-to-apply",
        label: "How To Apply ?",
        icon: "/admission.png",
        fields: [{
          name: "howToApply",
          label: "How To Apply ?",
          type: "textarea",
          placeholder: "Enter how to apply content",
          required: true
        }]
      },
      {
        tableName: "AdmissionTest",
        label: "Admission Test",
        icon: "/admission.png",
        fields: [{
          name: "admissionTest",
          label: "Admission Test",
          type: "textarea",
          placeholder: "Enter admission test content",
          required: true
        }]
      },
      {
        tableName: "AdmissionPolicy",
        label: "Admission Policy",
        icon: "/admission.png",
        fields: [{
          name: "admissionPolicy",
          label: "Admission Policy",
          type: "textarea",
          placeholder: "Enter admission policy content",
          required: true
        }]
      },
      {
        tableName: "Registration",
        label: "Online Registration",
        icon: "/registration.png",
        fields: [{
          name: "registration",
          label: "Online Registration",
          type: "textarea",
          placeholder: "Enter online registration content",
          required: true
        }]
      }
    ]
  },
  "Student": {
    tableName: "student", 
    label: "STUDENT",
    icon: "/student.png",
    hasSubmenu: true,
    fields: [],
    submenu: [
      {
        tableName: "student",
        label: "Student List",
        icon: "/student.png",
        fields: [{
          name: "studentList",
          label: "Student List", 
          type: "textarea",
          placeholder: "Enter student list content",
          required: true
        }]
      },
      {tableName: "Tuition Fees",
        label: "Tuition Fees",
        icon: "/student.png",
        fields: [{
          name: "tuitionFees",
          label: "Tuition Fees",
          type: "textarea",
          placeholder: "Enter tuition fees content",
          required: true
        }]
      },
      {
        tableName: "MobileBanking",
        label: "Mobile Banking",
        icon: "/bank.png",
        fields: [{
          name: "mobileBanking",
          label: "Mobile Banking",
          type: "textarea",
          placeholder: "Enter mobile banking content",
          required: true
        }]
      },
      {
        tableName: "activities",
        label: "Daily Activities",
        icon: "/activities.png",
        fields: [{
          name: "activities",
          label: "Daily Activities",
          type: "textarea",
          placeholder: "Enter daily activities content",
          required: true
        }]
      },
      {
        tableName: "exam-schedule",
        label: "Exam Schedule",
        icon: "/exam-schedule.png",
        fields: [{
          name: "examSchedule",
          label: "Exam Schedule",
          type: "textarea",
          placeholder: "Enter exam schedule content",
          required: true
        }]
      },
      {
        tableName: "exam-routine",
        label: "Exam Routine",
        icon: "/exam-routine.png",
        fields: [{
          name: "examRoutine",
          label: "Exam Routine",
          type: "textarea",
          placeholder: "Enter exam routine content",
          required: true
        }]
      },
      {
        tableName: "uniform",
        label: "Student Uniform",
        icon: "/uniform.png",
        fields: [{
          name: "uniform",
          label: "Student Uniform",
          type: "textarea",
          placeholder: "Enter student uniform content",
          required: true
        }]
      },
      {
        tableName: "exam-system",
        label: "Exam System",
        icon: "/exam-system.png",
        fields: [{
          name: "examSystem",
          label: "Exam System",
          type: "textarea",
          placeholder: "Enter exam system content",
          required: true
        }]
      },
      {
        tableName: "rules",
        label: "Rules & Regulations",
        icon: "/rules.png",
        fields: [{
          name: "rules",
          label: "Rules & Regulations",
          type: "textarea",
          placeholder: "Enter rules & regulations content",
          required: true
        }]
      },
      {
        tableName: "scholarship",
        label: "Scholarship",
        icon: "/scholarship.png",
        fields: [{
          name: "scholarship",
          label: "Scholarship",
          type: "textarea",
          placeholder: "Enter scholarship content",
          required: true
        }]
      },
      {
        tableName: "student-council",
        label: "Student Council",
        icon: "/student-council.png",
        fields: [{
          name: "studentCouncil",
          label: "Student Council",
          type: "textarea",
          placeholder: "Enter student council content",
          required: true
        }]
      },
      {
        tableName: "VerifyCertificate",
        label: "Verify Certificate",
        icon: "/verify-certificate.png",
        fields: [{
          name: "verifyCertificate",
          label: "Verify Certificate",
          type: "textarea",
          placeholder: "Enter verify certificate content",
          required: true
        }]
      }
      // ...add other Student submenu items  
    ]
  },
  "Facilities": {
    tableName: "facilities",
    label: "FACILITIES", 
    icon: "/facilities.png",
    hasSubmenu: true,
    fields: [],
    submenu: [
      {
        tableName: "library",
        label: "Library",
        icon: "/facilities.png",
        fields: [{
          name: "library",
          label: "Library",
          type: "textarea", 
          placeholder: "Enter library content",
          required: true
        }]
      },
      {
        tableName: "computer-lab",
        label: "Computer Lab",
        icon: "/facilities.png",
        fields: [{
          name: "computerLab",
          label: "Computer Lab",
          type: "textarea",
          placeholder: "Enter computer lab content",
          required: true
        }]
      },
      {
        tableName: "science-lab",
        label: "Science Lab",
        icon: "/facilities.png",
        fields: [{
          name: "scienceLab",
          label: "Science Lab",
          type: "textarea",
          placeholder: "Enter science lab content",
          required: true
        }]
      },
      {
        tableName: "sports-facility",
        label: "Sports Facility",
        icon: "/facilities.png", 
        fields: [{
          name: "sportsFacility",
          label: "Sports Facility",
          type: "textarea",
          placeholder: "Enter sports facility content",
          required: true
        }]
      },
      {
        tableName: "transportation",
        label: "Transportation",
        icon: "/facilities.png",
        fields: [{
          name: "transportation",
          label: "Transportation",
          type: "textarea",
          placeholder: "Enter transportation content",
          required: true
        }]
      },
      {
        tableName: "hostel",
        label: "Hostel",
        icon: "/facilities.png",
        fields: [{
          name: "hostel",
          label: "Hostel",
          type: "textarea",
          placeholder: "Enter hostel content",
          required: true
        }]
      },
      {
        tableName: "canteen",
        label: "Canteen",
        icon: "/facilities.png",
        fields: [{
          name: "canteen",
          label: "Canteen",
          type: "textarea",
          placeholder: "Enter canteen content",
          required: true
        }]
      },
      {
        tableName: "medical-facility",
        label: "Medical Facility",
        icon: "/facilities.png",
        fields: [{
          name: "medicalFacility",
          label: "Medical Facility",
          type: "textarea",
          placeholder: "Enter medical facility content",
          required: true
        }]
      },
      {
        tableName: "wifi",
        label: "WiFi",
        icon: "/facilities.png",
        fields: [{
          name: "wifi",
          label: "WiFi",
          type: "textarea",
          placeholder: "Enter WiFi content",
          required: true
        }]
      },
      {
        tableName: "auditorium",
        label: "Auditorium",
        icon: "/facilities.png",
        fields: [{
          name: "auditorium",
          label: "Auditorium",
          type: "textarea",
          placeholder: "Enter auditorium content",
          required: true
        }]
      },
      {
        tableName: "playground",
        label: "Playground",
        icon: "/facilities.png",
        fields: [{
          name: "playground",
          label: "Playground",
          type: "textarea",
          placeholder: "Enter playground content",
          required: true
        }]
      },
      {tableName: "co-curricular",
        label: "Co-Curricular Activities",
        icon: "/facilities.png",
        fields: [{
          name: "coCurricular",
          label: "Co-Curricular Activities",
          type: "textarea",
          placeholder: "Enter co-curricular activities content",
          required: true
        }]
      },
      {
        tableName: "extra-curricular",
        label: "Extra-Curricular Activities",
        icon: "/facilities.png",
        fields: [{
          name: "extraCurricular",
          label: "Extra-Curricular Activities",
          type: "textarea",
          placeholder: "Enter extra-curricular activities content",
          required: true
        }]
      }
      // ...add other Facilities submenu items
    ]
  },
  "Result": {
    tableName: "result",
    label: "RESULT",
    icon: "/result.png",
    hasSubmenu: true,
    fields: [],
    submenu: [
      {
        tableName: "result",
        label: "Result",
        icon: "/result.png", 
        fields: [{
          name: "result",
          label: "Result",
          type: "textarea",
          placeholder: "Enter result content",
          required: true
        }]
      },
      {
        tableName: "resultAnalysis",
        label: "Result Analysis",
        icon: "/result.png",
        fields: [{
          name: "resultAnalysis",
          label: "Result Analysis",
          type: "textarea",
          placeholder: "Enter result analysis content",
          required: true
        }]
      },
      {
        tableName: "resultPublication",
        label: "Result Publication",
        icon: "/result.png",
        fields: [{
          name: "resultPublication",
          label: "Result Publication",
          type: "textarea",
          placeholder: "Enter result publication content",
          required: true
        }]
      },
      {
        tableName: "resultDistribution",
        label: "Result Distribution",
        icon: "/result.png",
        fields: [{
          name: "resultDistribution",
          label: "Result Distribution",
          type: "textarea",
          placeholder: "Enter result distribution content",
          required: true
        }]
      },
      {
        tableName: "resultRechecking",
        label: "Result Rechecking",
        icon: "/result.png",
        fields: [{
          name: "resultRechecking",
          label: "Result Rechecking",
          type: "textarea",
          placeholder: "Enter result rechecking content",
          required: true
        }]
      },
      {
        tableName: "resultGrievance",
        label: "Result Grievance",
        icon: "/result.png",
        fields: [{
          name: "resultGrievance",
          label: "Result Grievance",
          type: "textarea",
          placeholder: "Enter result grievance content",
          required: true
        }]
      },
      {
        tableName: "resultCorrection",
        label: "Result Correction",
        icon: "/result.png",
        fields: [{
          name: "resultCorrection",
          label: "Result Correction",
          type: "textarea",
          placeholder: "Enter result correction content",
          required: true
        }]
      },
      {
        tableName: "resultVerification",
        label: "Result Verification",
        icon: "/result.png",
        fields: [{
          name: "resultVerification",
          label: "Result Verification",
          type: "textarea",
          placeholder: "Enter result verification content",
          required: true
        }]
      },
      {
        tableName: "resultReissue",
        label: "Result Reissue",
        icon: "/result.png",
        fields: [{
          name: "resultReissue",
          label: "Result Reissue",
          type: "textarea",
          placeholder: "Enter result reissue content",
          required: true
        }]
      },
      {
        tableName: "resultCorrectionPolicy",
        label: "Result Correction Policy",
        icon: "/result.png",
        fields: [{
          name: "resultCorrectionPolicy",
          label: "Result Correction Policy",
          type: "textarea",
          placeholder: "Enter result correction policy content",
          required: true
        }]
      },
      {
        tableName: "resultGrievancePolicy",
        label: "Result Grievance Policy",
        icon: "/result.png",
        fields: [{
          name: "resultGrievancePolicy",
          label: "Result Grievance Policy",
          type: "textarea",
          placeholder: "Enter result grievance policy content",
          required: true
        }]
      },
      {
        tableName: "resultRecheckingPolicy",
        label: "Result Rechecking Policy",
        icon: "/result.png",
        fields: [{
          name: "resultRecheckingPolicy",
          label: "Result Rechecking Policy",
          type: "textarea",
          placeholder: "Enter result rechecking policy content",
          required: true
        }]
      },
      {
        tableName: "resultPublicationPolicy",
        label: "Result Publication Policy",
        icon: "/result.png",
        fields: [{
          name: "resultPublicationPolicy",
          label: "Result Publication Policy",
          type: "textarea",
          placeholder: "Enter result publication policy content",
          required: true
        }]
      },
      {
        tableName: "resultDistributionPolicy",
        label: "Result Distribution Policy",
        icon: "/result.png",
        fields: [{
          name: "resultDistributionPolicy",
          label: "Result Distribution Policy",
          type: "textarea",
          placeholder: "Enter result distribution policy content",
          required: true
        }]
      },
      {
        tableName: "resultVerificationPolicy",
        label: "Result Verification Policy",
        icon: "/result.png",
        fields: [{
          name: "resultVerificationPolicy",
          label: "Result Verification Policy",
          type: "textarea",
          placeholder: "Enter result verification policy content",
          required: true
        }]
      },
      {
        tableName: "resultReissuePolicy",
        label: "Result Reissue Policy",
        icon: "/result.png",
        fields: [{
          name: "resultReissuePolicy",
          label: "Result Reissue Policy",
          type: "textarea",
          placeholder: "Enter result reissue policy content",
          required: true
        }]
      },
      {
        tableName: "resultCorrectionRequest",
        label: "Result Correction Request",
        icon: "/result.png",
        fields: [{
          name: "resultCorrectionRequest",
          label: "Result Correction Request",
          type: "textarea",
          placeholder: "Enter result correction request content",
          required: true
        }]
      },
      {
        tableName: "resultGrievanceRequest",
        label: "Result Grievance Request",
        icon: "/result.png",
        fields: [{
          name: "resultGrievanceRequest",
          label: "Result Grievance Request",
          type: "textarea",
          placeholder: "Enter result grievance request content",
          required: true
        }]
      },
      {
        tableName: "resultRecheckingRequest",
        label: "Result Rechecking Request",
        icon: "/result.png",
        fields: [{
          name: "resultRecheckingRequest",
          label: "Result Rechecking Request",
          type: "textarea",
          placeholder: "Enter result rechecking request content",
          required: true
        }]
      },
      {
        tableName: "evaluation",
        label: "Result Evaluation",
        icon: "/result.png",
        fields: [{
          name: "evaluation",
          label: "Result Evaluation",
          type: "textarea",
          placeholder: "Enter result evaluation content",
          required: true
        }]
      },
      {
        tableName: "board-exam",
        label: "Board exam",
        icon: "/result.png",
        fields: [{
          name: "boardExam",
          label: "Board exam",
          type: "textarea",
          placeholder: "Enter board exam content",
          required: true
        }]
      }
      // ...add other Result submenu items
    ]
  },
  "Others": {
    tableName: "others",
    label: "OTHERS",
    icon: "/others.png", 
    hasSubmenu: true,
    fields: [],
    submenu: [
      {
        tableName: "notice",
        label: "Notice",
        icon: "/others.png",
        fields: [{
          name: "notice",
          label: "Notice",
          type: "textarea",
          placeholder: "Enter notice content",
          required: true
        }]
      },
      {
        tableName: "events",
        label: "Events",
        icon: "/others.png",
        fields: [{
          name: "events",
          label: "Events",
          type: "textarea",
          placeholder: "Enter events content",
          required: true
        }]
      },
      {
        tableName: "gallery",
        label: "Gallery",
        icon: "/others.png",
        fields: [{
          name: "gallery",
          label: "Gallery",
          type: "textarea",
          placeholder: "Enter gallery content",
          required: true
        }]
      },
      {
        tableName: "news",
        label: "News & Updates",
        icon: "/others.png",
        fields: [{
          name: "newsAndUpdates",
          label: "News & Updates",
          type: "textarea",
          placeholder: "Enter news & updates content",
          required: true
        }]
      },
      {
        tableName:"career-opportunity", 
        label:"Career Opportunity", 
        icon:"/others.png", 
        fields:[{
            name:"careerOpportunity", 
            label:"Career Opportunity", 
            type:"textarea", 
            placeholder:"Enter career opportunity content", 
            required:true
          }]
      },
      {
        tableName: "admissionCircular",
        label: "Admission Circular",
        icon: "/others.png",
        fields: [{
          name: "admissionCircular",
          label: "Admission Circular",
          type: "textarea",
          placeholder: "Enter admission circular content",
          required: true
        }]
      },
      {
        tableName: "scholarshipCircular",
        label: "Scholarship Circular",
        icon: "/others.png",
        fields: [{
          name: "scholarshipCircular",
          label: "Scholarship Circular",
          type: "textarea",
          placeholder: "Enter scholarship circular content",
          required: true
        }]
      },
      {
        tableName: "routine",
        label: "Routine",
        icon: "/others.png",
        fields: [{
          name: "routine",
          label: "Routine",
          type: "textarea",
          placeholder: "Enter routine content",
          required: true
        }]
      },
      
      // ...add other Others submenu items
    ]
  },
  "Contact": {
    tableName: "contact",
    label: "CONTACT",
    icon: "/contact.png",
    hasSubmenu: true,
    fields: [],
    submenu: [
      {
        tableName: "contactUs",
        label: "Contact Us",
        icon: "/contact.png",
        fields: [{
          name: "contactUs",
          label: "Contact Us",
          type: "textarea",
          placeholder: "Enter contact us content",
          required: true
        }]
      },
      {
        tableName: "location",
        label: "Location",
        icon: "/location.png",
        fields: [{
          name: "location",
          label: "Location",
          type: "textarea",
          placeholder: "Enter location content",
          required: true
        }]
      }
    ]
  },
  "Alumni": {
    tableName: "alumni",
    label: "ALUMNI",
    icon: "/alumni.png",
    hasSubmenu: true,
    fields: [],
    submenu: [
      {
        tableName: "alumniRegistration",
        label: "Alumni Registration",
        icon: "/alumni.png",
        fields: [{
          name: "alumniRegistration",
          label: "Alumni Registration",
          type: "textarea",
          placeholder: "Enter alumni registration content",
          required: true
        }]
      },
      {
        tableName: "alumniList",
        label: "Alumni List", 
        icon: "/alumni.png",
        fields: [{
          name: "alumniList",
          label: "Alumni List",
          type: "textarea",
          placeholder: "Enter alumni list content",
          required: true
        }]
      }
    ]
  }
};