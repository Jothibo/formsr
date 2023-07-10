 // Profile.js

import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { db } from '../firebase/firebaseConfig';
import { doc, updateDoc, deleteDoc } from 'firebase/firestore';

const Profile = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(location.state);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    document.title = `${formData.firstName} ${formData.lastName} - Profile`;
  }, [formData]);

  const handleEdit = () => {
    setEditMode((prevMode) => !prevMode);
  };

  const handleSave = async () => {
    try {
      await updateDoc(doc(db, 'profiles', formData.email), formData);
      console.log('Document successfully updated');
      setEditMode((prevMode) => !prevMode);
    } catch (error) {
      console.error('Error updating document: ', error);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteDoc(doc(db, 'profiles', formData.email));
      console.log('Document successfully deleted');
      navigate('/');
    } catch (error) {
      console.error('Error deleting document: ', error);
    }
  };

  const handleGoBack = () => {
    navigate('/', { state: formData });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSkillChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setFormData((prevData) => ({
        ...prevData,
        skills: [...prevData.skills, value],
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        skills: prevData.skills.filter((skill) => skill !== value),
      }));
    }
  };

  return (
    <div className="profile-container">
      <h2>Profile</h2>
      <div className="profile-content">
        <div className="profile-field">
          <label>First Name:</label>
          {editMode ? (
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
            />
          ) : (
            <p>{formData.firstName}</p>
          )}
        </div>
        <div className="profile-field">
          <label>Last Name:</label>
          {editMode ? (
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
            />
          ) : (
            <p>{formData.lastName}</p>
          )}
        </div>
        <div className="profile-field">
          <label>Email:</label>
          {editMode ? (
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          ) : (
            <p>{formData.email}</p>
          )}
        </div>
        <div className="profile-field">
          <label>Phone Number:</label>
          {editMode ? (
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
            />
          ) : (
            <p>{formData.phoneNumber}</p>
          )}
        </div>
        <div className="profile-field">
          <label>Gender:</label>
          {editMode ? (
            <>
              <input
                type="radio"
                name="gender"
                value="male"
                checked={formData.gender === 'male'}
                onChange={handleChange}
              />
              Male
              <input
                type="radio"
                name="gender"
                value="female"
                checked={formData.gender === 'female'}
                onChange={handleChange}
              />
              Female
              <input
                type="radio"
                name="gender"
                value="others"
                checked={formData.gender === 'others'}
                onChange={handleChange}
              />
              Others
            </>
          ) : (
            <p>{formData.gender}</p>
          )}
        </div>
        <div className="profile-field">
          <label>Skills:</label>
          {editMode ? (
            <>
              <input
                type="checkbox"
                value="html"
                checked={formData.skills.includes('html')}
                onChange={handleSkillChange}
              />
              HTML
              <input
                type="checkbox"
                value="css"
                checked={formData.skills.includes('css')}
                onChange={handleSkillChange}
              />
              CSS
              <input
                type="checkbox"
                value="javascript"
                checked={formData.skills.includes('javascript')}
                onChange={handleSkillChange}
              />
              JavaScript
              <input
                type="checkbox"
                value="bootstrap"
                checked={formData.skills.includes('bootstrap')}
                onChange={handleSkillChange}
              />
              Bootstrap
              <input
                type="checkbox"
                value="reactjs"
                checked={formData.skills.includes('reactjs')}
                onChange={handleSkillChange}
              />
              React.js
            </>
          ) : (
            <p>{formData.skills.join(', ')}</p>
          )}
        </div>
        <div className="profile-field">
          <label>Experience:</label>
          {editMode ? (
            <select name="experience" value={formData.experience} onChange={handleChange}>
              <option value="">Select Experience</option>
              <option value="freshers">Freshers</option>
              <option value="experienced">Experienced</option>
              <option value="others">Others</option>
            </select>
          ) : (
            <p>{formData.experience}</p>
          )}
        </div>
        {/* <div className="profile-field">
          <label>Resume Upload:</label>
          {editMode ? (
            <input type="file" accept=".pdf,.doc,.docx" onChange={handleResumeChange} />
          ) : (
            <p>{formData.resume ? formData.resume.name : 'N/A'}</p>
          )}
        </div> */}
        <div className="profile-field">
          <label>Additional Information:</label>
          {editMode ? (
            <textarea name="additionalInfo" value={formData.additionalInfo} onChange={handleChange} />
          ) : (
            <p>{formData.additionalInfo}</p>
          )}
        </div>
      </div>
      <div className="profile-buttons">
        {editMode ? (
          <>
            <button onClick={handleSave}>Save</button>
            <button onClick={handleDelete}>Delete</button>
          </>
        ) : (
          <>
            <button onClick={handleEdit}>Edit</button>
            <button onClick={handleGoBack}>Go Back</button>
          </>
        )}
      </div>
    </div>
  );
};

export default Profile;

 