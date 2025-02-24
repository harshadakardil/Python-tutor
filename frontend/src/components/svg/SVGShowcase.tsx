import React from 'react';
import { Card } from '@/components/ui/card';
import Logo from './Logo';
import LoadingSpinner from './loading-spinner';
import WizardMentor from './wizard-mentor';
import RobotTutor from './robot-tutor';
import FriendlyTeacher from './friendly-teacher';

const SVGShowcase: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      <Card className="p-4">
        <h3 className="text-lg font-semibold mb-4">Logo</h3>
        <div className="h-32">
          <Logo />
        </div>
      </Card>

      <Card className="p-4">
        <h3 className="text-lg font-semibold mb-4">Loading Spinner</h3>
        <div className="h-32">
          <LoadingSpinner />
        </div>
      </Card>

      <Card className="p-4">
        <h3 className="text-lg font-semibold mb-4">Wizard Mentor</h3>
        <div className="h-32">
          <WizardMentor />
        </div>
      </Card>

      <Card className="p-4">
        <h3 className="text-lg font-semibold mb-4">Robot Tutor</h3>
        <div className="h-32">
          <RobotTutor />
        </div>
      </Card>

      <Card className="p-4">
        <h3 className="text-lg font-semibold mb-4">Friendly Teacher</h3>
        <div className="h-32">
          <FriendlyTeacher />
        </div>
      </Card>
    </div>
  );
};

export default SVGShowcase;