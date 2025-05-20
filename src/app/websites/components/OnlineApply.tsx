'use client';

import React, { useState } from 'react';
import styles from './OnlineApply.module.css';
import { toast } from 'react-toastify';
import Image from 'next/image';

interface FormData {
  schoolBranch: string;
  session: string;
  version: string;
  class: string;
  group: string;
  formNo: string;
  formDate: string;
  shift: string;
  name: string;
  presentSchool: string;
  presentClass: string;
  dateOfBirth: string;
  gender: string;
  religion: string;
  nationality: string;
  email: string;
  mobileNo: string;
  homeAddress: string;
  photo: File | null;
  formFee: string;
  motherName: string;
  motherNID: string;
  motherMobile: string;
  motherQualification: string;
  motherOccupation: string;
  motherDesignation: string;
  motherOfficeAddress: string;
  motherEmail: string;
  fatherName: string;
  fatherNID: string;
  fatherMobile: string;
  fatherQualification: string;
  fatherOccupation: string;
  fatherDesignation: string;
  fatherOfficeAddress: string;
  fatherEmail: string;
  siblingName: string;
  siblingClass: string;
  schoolName: string;
  siblingSession: string;
  bloodGroup: string;
  medicalProblems: string;
}

const OnlineApply = () => {
  const [currentTab, setCurrentTab] = useState(0);
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [formData, setFormData] = useState<FormData>({
    // Preliminary Information
    schoolBranch: '',
    session: '',
    version: '',
    class: '',
    group: '',
    formNo: '',
    formDate: new Date().toISOString().split('T')[0],
    shift: '',

    // Student Information
    name: '',
    presentSchool: '',
    presentClass: '',
    dateOfBirth: '',
    gender: '',
    religion: '',
    nationality: '',
    email: '',
    mobileNo: '',
    homeAddress: '',
    photo: null,
    formFee: '',

    // Parent Information
    motherName: '',
    motherNID: '',
    motherMobile: '',
    motherQualification: '',
    motherOccupation: '',
    motherDesignation: '',
    motherOfficeAddress: '',
    motherEmail: '',
    
    fatherName: '',
    fatherNID: '',
    fatherMobile: '',
    fatherQualification: '',
    fatherOccupation: '',
    fatherDesignation: '',
    fatherOfficeAddress: '',
    fatherEmail: '',

    // Sibling Information 
    siblingName: '',
    siblingClass: '',
    schoolName: '',
    siblingSession: '',

    // Medical Information
    bloodGroup: '',
    medicalProblems: ''
  });
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  const tabs = [
    { id: 0, title: "School & Session Information" },
    { id: 1, title: "Student's Information" },
    { id: 2, title: "Parent Information" },
    { id: 3, title: "Siblings Information" },
    { id: 4, title: "Medical Information" }
  ];

  const handleTabClick = (tabId: number) => {
    setCurrentTab(tabId);
  };

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};
    
    // Preliminary Information Validation
    if (!formData.schoolBranch) newErrors.schoolBranch = 'School branch is required';
    if (!formData.session) newErrors.session = 'Session is required';
    if (!formData.version) newErrors.version = 'Version is required';
    if (!formData.class) newErrors.class = 'Class is required';
    if (!formData.shift) newErrors.shift = 'Shift is required';

    // Student Information Validation
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
    if (!formData.gender) newErrors.gender = 'Gender is required';
    if (!formData.religion) newErrors.religion = 'Religion is required';
    if (!formData.nationality) newErrors.nationality = 'Nationality is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (formData.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }
    if (!formData.mobileNo) newErrors.mobileNo = 'Mobile number is required';
    if (!formData.homeAddress) newErrors.homeAddress = 'Home address is required';

    // Parent Information Validation
    if (!formData.motherName) newErrors.motherName = "Mother's name is required";
    if (!formData.motherMobile) newErrors.motherMobile = "Mother's mobile number is required";
    if (!formData.fatherName) newErrors.fatherName = "Father's name is required";
    if (!formData.fatherMobile) newErrors.fatherMobile = "Father's mobile number is required";

    // Medical Information
    if (!formData.bloodGroup) newErrors.bloodGroup = 'Blood group is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFormData(prev => ({
        ...prev,
        photo: file
      }));
      
      // Create preview URL
      const reader = new FileReader();
      reader.onload = (e) => {
        setPhotoPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      // Show error toast if validation fails
      toast.error('Please fill in all required fields correctly');
      return;
    }

    try {
      // Here you would typically send the form data to your backend
      console.log('Form submitted:', formData);
      toast.success('Application submitted successfully!');
      
      // Reset form after successful submission
      setFormData({
        schoolBranch: '',
        session: '',
        version: '',
        class: '',
        group: '',
        formNo: '',
        formDate: new Date().toISOString().split('T')[0],
        shift: '',
        name: '',
        presentSchool: '',
        presentClass: '',
        dateOfBirth: '',
        gender: '',
        religion: '',
        nationality: '',
        email: '',
        mobileNo: '',
        homeAddress: '',
        photo: null,
        formFee: '',
        motherName: '',
        motherNID: '',
        motherMobile: '',
        motherQualification: '',
        motherOccupation: '',
        motherDesignation: '',
        motherOfficeAddress: '',
        motherEmail: '',
        fatherName: '',
        fatherNID: '',
        fatherMobile: '',
        fatherQualification: '',
        fatherOccupation: '',
        fatherDesignation: '',
        fatherOfficeAddress: '',
        fatherEmail: '',
        siblingName: '',
        siblingClass: '',
        schoolName: '',
        siblingSession: '',
        bloodGroup: '',
        medicalProblems: ''
      });
    } catch (error) {
      toast.error('Error submitting application. Please try again.');
    }
  };

  const renderPreliminaryInfo = () => (
    <div className={styles.formSection}>
      <div className={styles.formRow}>
        <div className={styles.formGroup} style={{ flex: '1 1 25%' }}>
          <label>School Branch<span className={styles.required}>*</span></label>
          <select 
            name="schoolBranch" 
            value={formData.schoolBranch}
            onChange={handleInputChange}
            className={errors.schoolBranch ? styles.inputError : ''}
          >
            <option value="">Select</option>
            <option value="main">Main Branch</option>
            <option value="north">North Branch</option>
            <option value="south">South Branch</option>
          </select>
          {errors.schoolBranch && <span className={styles.errorText}>{errors.schoolBranch}</span>}
        </div>

        <div className={styles.formGroup} style={{ flex: '1 1 25%' }}>
          <label>Session<span className={styles.required}>*</span></label>
          <select 
            name="session" 
            value={formData.session}
            onChange={handleInputChange}
            className={errors.session ? styles.inputError : ''}
          >
            <option value="">Select</option>
            <option value="2024">2024</option>
            <option value="2025">2025</option>
          </select>
          {errors.session && <span className={styles.errorText}>{errors.session}</span>}
        </div>
      
        <div className={styles.formGroup} style={{ flex: '1 1 25%' }}>
          <label>Version<span className={styles.required}>*</span></label>
          <select 
            name="version" 
            value={formData.version}
            onChange={handleInputChange}
            className={errors.version ? styles.inputError : ''}
          >
            <option value="">Select</option>
            <option value="bangla">Bangla</option>
            <option value="english">English</option>
          </select>
          {errors.version && <span className={styles.errorText}>{errors.version}</span>}
        </div>

        <div className={styles.formGroup} style={{ flex: '1 1 25%' }}>
          <label>Class<span className={styles.required}>*</span></label>
          <select 
            name="class" 
            value={formData.class}
            onChange={handleInputChange}
            className={errors.class ? styles.inputError : ''}
          >
            <option value="">Select</option>
            <option value="6">Six</option>
            <option value="7">Seven</option>
            <option value="8">Eight</option>
            <option value="9">Nine</option>
            <option value="10">Ten</option>
          </select>
          {errors.class && <span className={styles.errorText}>{errors.class}</span>}
        </div>
      </div>

      <div className={styles.formRow}>
        <div className={styles.formGroup}>
          <label>Group</label>
          <select 
            name="group" 
            value={formData.group}
            onChange={handleInputChange}
          >
            <option value="">Select</option>
            <option value="science">Science</option>
            <option value="commerce">Commerce</option>
            <option value="humanities">Humanities</option>
          </select>
        </div>

        <div className={styles.formGroup}>
          <label>Form No.</label>
          <input 
            type="text" 
            name="formNo" 
            value={formData.formNo}
            onChange={handleInputChange}
            readOnly
          />
        </div>
      
        <div className={styles.formGroup}>
          <label>Form Date</label>
          <input 
            type="date" 
            name="formDate" 
            value={formData.formDate}
            onChange={handleInputChange}
            readOnly
          />
        </div>

        <div className={styles.formGroup}>
          <label>Shift<span className={styles.required}>*</span></label>
          <select 
            name="shift" 
            value={formData.shift}
            onChange={handleInputChange}
            className={errors.shift ? styles.inputError : ''}
          >
            <option value="">Select</option>
            <option value="morning">Morning</option>
            <option value="day">Day</option>
          </select>
          {errors.shift && <span className={styles.errorText}>{errors.shift}</span>}
        </div>
      </div>
    </div>
  );

  const renderStudentInfo = () => (
    <div className={styles.formSection}>
      <div className={styles.formRow}>
        <div className={styles.formGroup}>
          <label>Name<span className={styles.required}>*</span></label>
          <input 
            type="text" 
            name="name" 
            value={formData.name} 
            onChange={handleInputChange}
            className={errors.name ? styles.inputError : ''}
          />
          {errors.name && <span className={styles.errorText}>{errors.name}</span>}
        </div>
        <div className={styles.formGroup}>
          <label>Present school</label>
          <input type="text" name="presentSchool" value={formData.presentSchool} onChange={handleInputChange} />
        </div>
      
        <div className={styles.formGroup}>
          <label>Present class</label>
          <input type="text" name="presentClass" value={formData.presentClass} onChange={handleInputChange} />
        </div>
        <div className={styles.formGroup}>
          <label>Date of birth<span className={styles.required}>*</span></label>
          <input 
            type="date" 
            name="dateOfBirth" 
            value={formData.dateOfBirth} 
            onChange={handleInputChange}
            className={errors.dateOfBirth ? styles.inputError : ''}
          />
          {errors.dateOfBirth && <span className={styles.errorText}>{errors.dateOfBirth}</span>}
        </div>
      </div>

      <div className={styles.formRow}>
        <div className={styles.formGroup}>
          <label>Gender<span className={styles.required}>*</span></label>
          <select 
            name="gender" 
            value={formData.gender} 
            onChange={handleInputChange}
            className={errors.gender ? styles.inputError : ''}
          >
            <option value="">Select</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          {errors.gender && <span className={styles.errorText}>{errors.gender}</span>}
        </div>
        <div className={styles.formGroup}>
          <label>Religion<span className={styles.required}>*</span></label>
          <select 
            name="religion" 
            value={formData.religion} 
            onChange={handleInputChange}
            className={errors.religion ? styles.inputError : ''}
          >
            <option value="">Select</option>
            <option value="islam">Islam</option>
            <option value="hinduism">Hinduism</option>
            <option value="christianity">Christianity</option>
            <option value="buddhism">Buddhism</option>
            <option value="other">Other</option>
          </select>
          {errors.religion && <span className={styles.errorText}>{errors.religion}</span>}
        </div>
     
        <div className={styles.formGroup}>
          <label>Nationality<span className={styles.required}>*</span></label>
          <select 
            name="nationality" 
            value={formData.nationality} 
            onChange={handleInputChange}
            className={errors.nationality ? styles.inputError : ''}
          >
            <option value="">Select</option>
            <option value="bangladeshi">Bangladeshi</option>
            <option value="other">Other</option>
          </select>
          {errors.nationality && <span className={styles.errorText}>{errors.nationality}</span>}
        </div>
        <div className={styles.formGroup}>
          <label>Email<span className={styles.required}>*</span></label>
          <input 
            type="email" 
            name="email" 
            value={formData.email} 
            onChange={handleInputChange}
            className={errors.email ? styles.inputError : ''}
          />
          {errors.email && <span className={styles.errorText}>{errors.email}</span>}
        </div>
      </div>

      <div className={styles.formRow}>
        <div className={styles.formGroup}>
          <label>Mobile NO. (+88)<span className={styles.required}>*</span></label>
          <input 
            type="tel" 
            name="mobileNo" 
            value={formData.mobileNo} 
            onChange={handleInputChange}
            className={errors.mobileNo ? styles.inputError : ''}
          />
          {errors.mobileNo && <span className={styles.errorText}>{errors.mobileNo}</span>}
        </div>
        <div className={styles.formGroup}>
          <label>Form fee</label>
          <input type="text" name="formFee" value={formData.formFee} onChange={handleInputChange} />
        </div>
      </div>

      <div className={styles.formGroup}>
        <label>Home address<span className={styles.required}>*</span></label>
        <textarea 
          name="homeAddress" 
          value={formData.homeAddress} 
          onChange={handleInputChange}
          className={errors.homeAddress ? styles.inputError : ''}
        />
        {errors.homeAddress && <span className={styles.errorText}>{errors.homeAddress}</span>}
      </div>

      <div className={styles.formGroup}>
        <label>Photo</label>
        <div className={styles.photoUpload}>
          <div className={styles.photoPreview}>
            {photoPreview ? (
              <Image src={photoPreview} alt="Preview" width={150} height={150} />
            ) : (
              <div>No file chosen</div>
            )}
          </div>
          <label className={styles.uploadButton}>
            Choose File
            <input
              type="file"
              onChange={handleFileChange}
              accept="image/*"
              style={{ display: 'none' }}
            />
          </label>
        </div>
      </div>
    </div>
  );

  const renderParentInfo = () => (
    <div className={styles.parentContainer}>
      <div className={styles.parentSection}>
        <h3 className={styles.parentTitle}>Mother Information</h3>
        <div className={styles.parentForm}>
          <div className={styles.formGroup}>
            <label>Mother's name<span className={styles.required}>*</span></label>
            <input 
              type="text" 
              name="motherName" 
              value={formData.motherName} 
              onChange={handleInputChange}
              className={errors.motherName ? styles.inputError : ''}
            />
            {errors.motherName && <span className={styles.errorText}>{errors.motherName}</span>}
          </div>

          <div className={styles.formGroup}>
            <label>Mother NID</label>
            <input 
              type="text" 
              name="motherNID" 
              value={formData.motherNID} 
              onChange={handleInputChange}
            />
          </div>

          <div className={styles.formGroup}>
            <label>Mobile NO. (+88)<span className={styles.required}>*</span></label>
            <input 
              type="tel" 
              name="motherMobile" 
              value={formData.motherMobile} 
              onChange={handleInputChange}
              className={errors.motherMobile ? styles.inputError : ''}
            />
            {errors.motherMobile && <span className={styles.errorText}>{errors.motherMobile}</span>}
          </div>

          <div className={styles.formGroup}>
            <label>Qualification</label>
            <input 
              type="text" 
              name="motherQualification" 
              value={formData.motherQualification} 
              onChange={handleInputChange}
            />
          </div>

          <div className={styles.formGroup}>
            <label>Occupation</label>
            <select 
              name="motherOccupation" 
              value={formData.motherOccupation} 
              onChange={handleInputChange}
            >
              <option value="">Select</option>
              <option value="service">Service</option>
              <option value="business">Business</option>
              <option value="homemaker">Homemaker</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className={styles.formGroup}>
            <label>Designation</label>
            <select 
              name="motherDesignation" 
              value={formData.motherDesignation} 
              onChange={handleInputChange}
            >
              <option value="">Select</option>
              <option value="executive">Executive</option>
              <option value="manager">Manager</option>
              <option value="officer">Officer</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className={styles.formGroup}>
            <label>Office address</label>
            <textarea 
              name="motherOfficeAddress" 
              value={formData.motherOfficeAddress} 
              onChange={handleInputChange}
            />
          </div>

          <div className={styles.formGroup}>
            <label>Email</label>
            <input 
              type="email" 
              name="motherEmail" 
              value={formData.motherEmail} 
              onChange={handleInputChange}
            />
          </div>
        </div>
      </div>

      <div className={styles.parentSection}>
        <h3 className={styles.parentTitle}>Father Information</h3>
        <div className={styles.parentForm}>
          <div className={styles.formGroup}>
            <label>Father's name<span className={styles.required}>*</span></label>
            <input 
              type="text" 
              name="fatherName" 
              value={formData.fatherName} 
              onChange={handleInputChange}
              className={errors.fatherName ? styles.inputError : ''}
            />
            {errors.fatherName && <span className={styles.errorText}>{errors.fatherName}</span>}
          </div>

          <div className={styles.formGroup}>
            <label>Father NID</label>
            <input 
              type="text" 
              name="fatherNID" 
              value={formData.fatherNID} 
              onChange={handleInputChange}
            />
          </div>

          <div className={styles.formGroup}>
            <label>Mobile NO. (+88)<span className={styles.required}>*</span></label>
            <input 
              type="tel" 
              name="fatherMobile" 
              value={formData.fatherMobile} 
              onChange={handleInputChange}
              className={errors.fatherMobile ? styles.inputError : ''}
            />
            {errors.fatherMobile && <span className={styles.errorText}>{errors.fatherMobile}</span>}
          </div>

          <div className={styles.formGroup}>
            <label>Qualification</label>
            <input 
              type="text" 
              name="fatherQualification" 
              value={formData.fatherQualification} 
              onChange={handleInputChange}
            />
          </div>

          <div className={styles.formGroup}>
            <label>Occupation</label>
            <select 
              name="fatherOccupation" 
              value={formData.fatherOccupation} 
              onChange={handleInputChange}
            >
              <option value="">Select</option>
              <option value="service">Service</option>
              <option value="business">Business</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className={styles.formGroup}>
            <label>Designation</label>
            <select 
              name="fatherDesignation" 
              value={formData.fatherDesignation} 
              onChange={handleInputChange}
            >
              <option value="">Select</option>
              <option value="executive">Executive</option>
              <option value="manager">Manager</option>
              <option value="officer">Officer</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className={styles.formGroup}>
            <label>Office address</label>
            <textarea 
              name="fatherOfficeAddress" 
              value={formData.fatherOfficeAddress} 
              onChange={handleInputChange}
            />
          </div>

          <div className={styles.formGroup}>
            <label>Email</label>
            <input 
              type="email" 
              name="fatherEmail" 
              value={formData.fatherEmail} 
              onChange={handleInputChange}
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderSiblingInfo = () => (
    <div className={styles.formSection}>
      <div className={styles.formRow}>
        <div className={styles.formGroup}>
          <label>Sibling name</label>
          <input type="text" name="siblingName" value={formData.siblingName} onChange={handleInputChange} />
        </div>
        <div className={styles.formGroup}>
          <label>Class</label>
          <select name="siblingClass" value={formData.siblingClass} onChange={handleInputChange}>
            <option value="">Select</option>
            <option value="six">Six</option>
            <option value="seven">Seven</option>
            <option value="eight">Eight</option>
            <option value="nine">Nine</option>
            <option value="ten">Ten</option>
          </select>
        </div>
      
        <div className={styles.formGroup}>
          <label>School name</label>
          <select name="schoolName" value={formData.schoolName} onChange={handleInputChange}>
            <option value="">Select</option>
            <option value="abc">ABC School</option>
          </select>
        </div>
        <div className={styles.formGroup}>
          <label>Session</label>
          <select name="siblingSession" value={formData.siblingSession} onChange={handleInputChange}>
            <option value="">Select</option>
            <option value="2024">2024</option>
            <option value="2025">2025</option>
          </select>
        </div>
      </div>
    </div>
  );

  const renderMedicalInfo = () => (
    <div className={styles.formSection}>
      <div className={styles.formRow}>
        <div className={styles.formGroup}>
          <label>Blood group<span className={styles.required}>*</span></label>
          <select 
            name="bloodGroup" 
            value={formData.bloodGroup} 
            onChange={handleInputChange}
            className={errors.bloodGroup ? styles.inputError : ''}
          >
            <option value="">Select</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
          </select>
          {errors.bloodGroup && <span className={styles.errorText}>{errors.bloodGroup}</span>}
        </div>
      </div>

      <div className={styles.formGroup}>
        <label>Medical problem</label>
        <textarea 
          name="medicalProblems" 
          value={formData.medicalProblems} 
          onChange={handleInputChange}
          placeholder="If any exist"
        />
      </div>
    </div>
  );

  return (
    <div className={styles.container}>
      {/* Tab Navigation */}
      <div className={styles.tabNavigation}>
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`${styles.tabButton} ${currentTab === tab.id ? styles.activeTab : ''}`}
            onClick={() => handleTabClick(tab.id)}
          >
            {tab.title}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div>
        {/* School & Session Information */}
        {currentTab === 0 && (
          <div>
            <div className={styles.formRow}>
              {renderPreliminaryInfo()}
            </div>
          </div>
        )}

        {/* Student Information */}
        {currentTab === 1 && (
          <div>
            <h3 className={styles.formTitle}>Student's Information</h3>
            {renderStudentInfo()}
          </div>
        )}

        {/* Parent Information */}
        {currentTab === 2 && (
          <div>
            <div className={styles.sectionTitle}>Parent Information</div>
            {renderParentInfo()}
          </div>
        )}

        {/* Siblings Information */}
        {currentTab === 3 && (
          <div>
            <h3 className={styles.formTitle}>Siblings Information</h3>
            {renderSiblingInfo()}
          </div>
        )}

        {/* Medical Information */}
        {currentTab === 4 && (
          <div>
            <h3 className={styles.formTitle}>Medical Description</h3>
            {renderMedicalInfo()}
          </div>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className={styles.navigationButtons}>
        {currentTab >= 0 && (
          <button 
            type="button"
            className={`${styles.prevButton}`}
            onClick={() => setCurrentTab(prev => prev - 1)}
            disabled={currentTab === 0}
          >
            Previous
          </button>
        )}
        {currentTab < tabs.length - 1 && (
          <button 
            type="button"
            className={styles.nextButton}
            onClick={() => setCurrentTab(prev => prev + 1)}
          >
            Next
          </button>
        )}
        {currentTab === tabs.length - 1 && (
          <button 
            type="submit" 
            className={`${styles.nextButton}`}
            onClick={handleSubmit}
          >
            Submit
          </button>
        )}
      </div>
    </div>
  );
};

export default OnlineApply;