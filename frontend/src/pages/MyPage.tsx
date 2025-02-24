import React from 'react';
import { Background } from '../components/Background';
import { 
  FriendlyTeacher,
  RobotTutor,
  WizardMentor,
  LoadingSpinner
} from '../components/SVGComponents';
import { PythonTutorLogo } from '../components/PythonTutorLogo';

const MyPage: React.FC = () => {
  return (
    <>
      <Background />
      <div className="relative p-4">
        <div className="flex flex-col items-center gap-4">
          <PythonTutorLogo />
          <div className="flex flex-wrap gap-4 justify-center">
            <FriendlyTeacher />
            <RobotTutor />
            <WizardMentor />
          </div>
          <LoadingSpinner />
        </div>
      </div>
    </>
  );
};

export default MyPage;