  // Form.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';

const Form = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [gender, setGender] = useState('');
  const [skills, setSkills] = useState([]);
  const [experience, setExperience] = useState('');
  // const [resume, setResume] = useState(null);
  const [additionalInfo, setAdditionalInfo] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
     
    const formData = {
      firstName,
      lastName,
      email,
      phoneNumber,
      gender,
      skills,
      experience,
      // resume,
      additionalInfo,
    };
    console.log('Form submitted:', formData);

    // Save form data to Firebase Firestore
    try {
      await addDoc(collection(db, 'profiles'), formData); // Change 'profiles' to your desired collection name
      console.log('Document successfully written');
       
      navigate('/profile', { state: formData });
    } catch (error) {
      console.error('Error adding document: ', error);
    }
  };

  const handleSkillChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setSkills((prevSkills) => [...prevSkills, value]);
    } else {
      setSkills((prevSkills) => prevSkills.filter((skill) => skill !== value));
    }
  };

  // const handleResumeChange = (e) => {
  //   const file = e.target.files[0];
  //   setResume(file);
  // };

  const handleAdditionalInfoChange = (e) => {
    setAdditionalInfo(e.target.value);
  };

  return (
    <div class="form-box"> 
    <h1>User form details</h1>
    <form className="form-container" onSubmit={handleSubmit}>
      <label>
        First Name:
        <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
      </label>
      <br />
      <label>
        Last Name:
        <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
      </label>
      <br />
      <label>
        Email:
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </label>
      <br />
      <label>
        Phone Number:
        <input type="tel" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
      </label>
      <br />
      <label>
        Gender:
        <br />
        <input
          type="radio"
          name="gender"
          value="male"
          checked={gender === 'male'}
          onChange={(e) => setGender(e.target.value)}
        />
        Male
        <input
          type="radio"
          name="gender"
          value="female"
          checked={gender === 'female'}
          onChange={(e) => setGender(e.target.value)}
        />
        Female
        <input
          type="radio"
          name="gender"
          value="others"
          checked={gender === 'others'}
          onChange={(e) => setGender(e.target.value)}
        />
        Others
      </label>
      <br />
      <label>
        Skills:
        <br />
        <input type="checkbox" value="html" checked={skills.includes('html')} onChange={handleSkillChange} />
        HTML
        <br />
        <input type="checkbox" value="css" checked={skills.includes('css')} onChange={handleSkillChange} />
        CSS
        <br />
        <input
          type="checkbox"
          value="javascript"
          checked={skills.includes('javascript')}
          onChange={handleSkillChange}
        />
        JavaScript
        <br />
        <input
          type="checkbox"
          value="bootstrap"
          checked={skills.includes('bootstrap')}
          onChange={handleSkillChange}
        />
        Bootstrap
        <br />
        <input type="checkbox" value="reactjs" checked={skills.includes('reactjs')} onChange={handleSkillChange} />
        React.js
      </label>
      <br />
      <label>
        Experience:
        <select value={experience} onChange={(e) => setExperience(e.target.value)}>
          <option value="">Select Experience</option>
          <option value="freshers">Freshers</option>
          <option value="experienced">Experienced</option>
          <option value="others">Others</option>
        </select>
      </label>
      <br />
      {/* <label>
        Resume Upload:
        <input type="file" accept=".pdf,.doc,.docx" onChange={handleResumeChange} />
      </label> */}
      <br />
      <label>
        Additional Information:
        <textarea value={additionalInfo} onChange={handleAdditionalInfoChange} />
      </label>
      <br />
      <button type="submit">Submit</button>
    </form>
    </div>
  );
};

export default Form;