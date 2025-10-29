import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock, Play, ChevronRight, ChevronLeft, ChevronRight as NextIcon } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// 🧩 Automatically import all slides per folder
const preDrivingSlides = Object.values(
  import.meta.glob('@/assets/TdcDocs/Session2/Predriving on orientation/*.jpg', { eager: true })
).map((mod) => mod.default);

const defensiveDrivingSlides = Object.values(
  import.meta.glob('@/assets/TdcDocs/Session2/Defensive Driving/*.jpg', { eager: true })
).map((mod) => mod.default);

const handlingEmergencySlides = Object.values(
  import.meta.glob('@/assets/TdcDocs/Session2/Handling Emergencies/*.jpg', { eager: true })
).map((mod) => mod.default);

// 🧩 Each lecture with its own slide set
const lectures = [
  {
    id: 1,
    title: 'Pre-Driving on Orientation',
    description: 'Vehicle basics, operation, and safety principles.',
    slides: preDrivingSlides,
  },
  {
    id: 2,
    title: 'Defensive Driving',
    description: 'Learn proactive driving strategies to prevent accidents.',
    slides: defensiveDrivingSlides,
  },
  {
    id: 3,
    title: 'Handling Emergencies',
    description: 'Managing road emergencies safely and efficiently.',
    slides: handlingEmergencySlides,
  },
];

const PowerPointSection = () => {
  const [timerStarted, setTimerStarted] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(10);
  const [timerComplete, setTimerComplete] = useState(false);
  const [selectedLecture, setSelectedLecture] = useState(lectures[0]);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Prevent back navigation
  useEffect(() => {
    const preventNavigation = (e) => {
      e.preventDefault();
      e.returnValue = '';
      return e.returnValue;
    };
    const preventBackButton = () => {
      window.history.pushState(null, '', window.location.href);
    };
    window.history.pushState(null, '', window.location.href);
    window.addEventListener('popstate', preventBackButton);
    window.addEventListener('beforeunload', preventNavigation);
    return () => {
      window.removeEventListener('popstate', preventBackButton);
      window.removeEventListener('beforeunload', preventNavigation);
    };
  }, []);

  // Timer logic
  useEffect(() => {
    let interval;
    if (timerStarted && timeRemaining > 0) {
      interval = setInterval(() => setTimeRemaining((prev) => prev - 1), 1000);
    } else if (timeRemaining === 0) {
      setTimerComplete(true);
    }
    return () => clearInterval(interval);
  }, [timerStarted, timeRemaining]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % selectedLecture.slides.length);
  };
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + selectedLecture.slides.length) % selectedLecture.slides.length);
  };

  const handleLectureChange = (lecture) => {
    setSelectedLecture(lecture);
    setCurrentSlide(0);
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-semibold mb-6">Session 2 Course Materials</h1>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Main Lesson Section */}
        <div className="md:col-span-2 space-y-4">
          <Tabs defaultValue={`lecture-${selectedLecture.id}`} className="w-full">
            <TabsList className="w-full">
              {lectures.map((lecture) => (
                <TabsTrigger
                  key={lecture.id}
                  value={`lecture-${lecture.id}`}
                  onClick={() => handleLectureChange(lecture)}
                  className="flex-1"
                >
                  {lecture.title}
                </TabsTrigger>
              ))}
            </TabsList>

            {lectures.map((lecture) => (
              <TabsContent key={lecture.id} value={`lecture-${lecture.id}`}>
                <Card>
                  <CardHeader>
                    <CardTitle>{lecture.title}</CardTitle>
                    <p className="text-gray-600 text-sm">{lecture.description}</p>
                  </CardHeader>

                  <CardContent>
                    <div className="relative w-full overflow-hidden rounded-lg shadow-md">
                      <img
                        src={lecture.slides[currentSlide]}
                        alt={`Slide ${currentSlide + 1}`}
                        className="w-full h-auto object-contain"
                      />

                      {/* Slide controls */}
                      <div className="absolute inset-0 flex items-center justify-between px-3">
                        <Button
                          variant="secondary"
                          size="icon"
                          onClick={prevSlide}
                          disabled={currentSlide === 0}
                          className="bg-white/80 hover:bg-white/90"
                        >
                          <ChevronLeft />
                        </Button>
                        <Button
                          variant="secondary"
                          size="icon"
                          onClick={nextSlide}
                          disabled={currentSlide === lecture.slides.length - 1}
                          className="bg-white/80 hover:bg-white/90"
                        >
                          <NextIcon />
                        </Button>
                      </div>
                    </div>

                    <div className="text-center mt-2 text-gray-500 text-sm">
                      Slide {currentSlide + 1} of {lecture.slides.length}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        </div>

        {/* Timer & Exam Section */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Required Reading Time</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">{formatTime(timeRemaining)}</div>
                <p className="text-gray-500 text-sm">Time Remaining</p>
              </div>

              {!timerStarted ? (
                <Button
                  onClick={() => setTimerStarted(true)}
                  className="w-full flex items-center justify-center gap-2"
                >
                  <Play size={16} />
                  Start Timer
                </Button>
              ) : (
                <Alert>
                  <Clock className="h-4 w-4" />
                  <AlertDescription>
                    Please review all lecture slides carefully
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Next Steps</CardTitle>
            </CardHeader>
            <CardContent>
              {timerComplete ? (
                <Link to="/authstudent/session2-exam" className="w-full block">
                  <Button className="w-full flex items-center justify-center gap-2">
                    Proceed to Exam
                    <ChevronRight size={16} />
                  </Button>
                </Link>
              ) : (
                <div className="text-sm text-center text-gray-500">
                  Complete the required reading time to proceed to the exam
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PowerPointSection;
