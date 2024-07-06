import React, { useState } from 'react';
import MeetingService from '../../services/MeetingService';
import IDuos from '../../interfaces/IDuos';

interface EndOfYearMeetingFormProps {
  duo: IDuos;
  token: string;
  onClose: () => void;
}

const EndOfYearMeetingForm: React.FC<EndOfYearMeetingFormProps> = ({ duo, token, onClose }) => {
  const [form, setForm] = useState({
    duoId: duo.idDuo,
    studentId: duo.Alternant?.id || '',
    studentName: duo.Alternant?.name || '',
    studentFirstName: duo.Alternant?.lastname || '',
    enterpriseName: duo.enterpriseName || '',
    tutorName: duo.Tuteur?.name || '',
    tutorFirstName: duo.Tuteur?.lastname || '',
    tutorPosition: '',
    studentMissions: '',
    meetingDate: '',
    followUpFormat: 'Présentiel',
    projectsForNextYear: '',
    improvementAxes: '',
    strengths: '',
    thesisSubject: '',
    recruitmentPlans: false,
    continuationOfStudies: false,
    followUpComment: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const { checked } = e.target as HTMLInputElement;
      setForm(prevForm => ({
        ...prevForm,
        [name]: checked
      }));
    } else {
      setForm(prevForm => ({
        ...prevForm,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await MeetingService.submitEndOfYearMeetingForm(form, token);
      onClose();
    } catch (error) {
      console.error('Failed to submit end of year meeting form:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        ID étudiant:
        <input type="text" name="studentId" value={form.studentId} onChange={handleChange} required />
      </label>
      <label>
        Nom de l'étudiant:
        <input type="text" name="studentName" value={form.studentName} onChange={handleChange} required />
      </label>
      <label>
        Prénom de l'étudiant:
        <input type="text" name="studentFirstName" value={form.studentFirstName} onChange={handleChange} required />
      </label>
      <label>
        Nom de l'entreprise:
        <input type="text" name="enterpriseName" value={form.enterpriseName} onChange={handleChange} required />
      </label>
      <label>
        Nom du tuteur:
        <input type="text" name="tutorName" value={form.tutorName} onChange={handleChange} required />
      </label>
      <label>
        Prénom du tuteur:
        <input type="text" name="tutorFirstName" value={form.tutorFirstName} onChange={handleChange} required />
      </label>
      <label>
        Poste du tuteur:
        <input type="text" name="tutorPosition" value={form.tutorPosition} onChange={handleChange} required />
      </label>
      <label>
        Missions de l'étudiant:
        <textarea name="studentMissions" value={form.studentMissions} onChange={handleChange} required />
      </label>
      <label>
        Date du suivi:
        <input type="date" name="meetingDate" value={form.meetingDate} onChange={handleChange} required />
      </label>
      <label>
        Format du suivi:
        <select name="followUpFormat" value={form.followUpFormat} onChange={handleChange} required>
          <option value="Présentiel">Présentiel</option>
          <option value="Distanciel">Distanciel</option>
        </select>
      </label>
      <label>
        Projets pour l'année prochaine:
        <textarea name="projectsForNextYear" value={form.projectsForNextYear} onChange={handleChange} required />
      </label>
      <label>
        Axes d'amélioration:
        <textarea name="improvementAxes" value={form.improvementAxes} onChange={handleChange} required />
      </label>
      <label>
        Points forts:
        <textarea name="strengths" value={form.strengths} onChange={handleChange} required />
      </label>
      <label>
        Sujet de mémoire (si applicable):
        <textarea name="thesisSubject" value={form.thesisSubject} onChange={handleChange} />
      </label>
      <label>
        Plans de recrutement:
        <input type="checkbox" name="recruitmentPlans" checked={form.recruitmentPlans} onChange={handleChange} />
      </label>
      <label>
        Poursuite d'études:
        <input type="checkbox" name="continuationOfStudies" checked={form.continuationOfStudies} onChange={handleChange} />
      </label>
      <label>
        Commentaire sur le suivi:
        <textarea name="followUpComment" value={form.followUpComment} onChange={handleChange} required />
      </label>
      <button type="submit">Soumettre</button>
    </form>
  );
};

export default EndOfYearMeetingForm;
