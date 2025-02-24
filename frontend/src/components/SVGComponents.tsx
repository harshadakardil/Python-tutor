import React from 'react';

export const FriendlyTeacher: React.FC = () => {
  return (
    <div className="w-24 h-24">
      <img 
        src="/assets/images/characters/friendly-teacher.svg"
        alt="Friendly Teacher"
        className="w-full h-full"
      />
    </div>
  );
};

export const RobotTutor: React.FC = () => {
  return (
    <div className="w-24 h-24">
      <img 
        src="/assets/images/characters/robot-tutor.svg"
        alt="Robot Tutor"
        className="w-full h-full"
      />
    </div>
  );
};

export const WizardMentor: React.FC = () => {
  return (
    <div className="w-24 h-24">
      <img 
        src="/assets/images/characters/wizard-mentor.svg"
        alt="Wizard Mentor"
        className="w-full h-full"
      />
    </div>
  );
};

export const LoadingSpinner: React.FC = () => {
  return (
    <div className="w-12 h-12">
      <img 
        src="/assets/images/ui/loading-spinner.svg"
        alt="Loading Spinner"
        className="w-full h-full animate-spin"
      />
    </div>
  );
};