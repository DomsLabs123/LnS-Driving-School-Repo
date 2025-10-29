import React,{useState} from 'react'
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { startExam, CheckSessionOneStatus, CheckSessionTwoStatus } from '@/lib/services/TDCOnlineTraining/onlineTrainingSevice';

function MainDashboard() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const handleStartExam = async () => {
    setIsLoading(true);
    try {
      // Start the exam
      await startExam();
      
      // Check session one status
      const checkisFinished = await CheckSessionOneStatus();
      const checkSessionTwo = await CheckSessionTwoStatus();
      
      // If session is finished, redirect to the given links
      if (checkSessionTwo ) {
        navigate('/authStudent/exam-results');
  
      }
      else if (checkisFinished) {
        navigate('/authstudent/session2-tdc-video');
      } 
      else {
        navigate('/authstudent/tdc-video');
      }
    } catch (error) {
      console.error('Failed to start exam:', error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="mt-[15rem] flex items-center ">
    <div className="max-w-2xl text-left p-10  ">
      <h1 className="text-4xl font-bold mb-4 text-white-800">
        Welcome to TDC Online Exam
      </h1>
      <p className="text-xl text-white-600 mb-8">
        Congratulations on taking the first step toward achieving your goals with TDC! We’re thrilled to have you on board. Get ready to begin your online exam and showcase your skills.
      </p>
      <Button
          size="lg"
          className="text-lg py-4 px-8"
          onClick={handleStartExam}
          disabled={isLoading}
        >
             {isLoading ? 'Loading...' : 'Get Started'}
        </Button>
    </div>
  </div>
  )
}

export default MainDashboard