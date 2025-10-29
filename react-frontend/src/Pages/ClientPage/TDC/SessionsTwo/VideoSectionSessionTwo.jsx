import React, { useRef, useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, Pause, Clock, BookOpen, ChevronRight, FastForward, AlertTriangle } from 'lucide-react'; 
import VideoOne from '@/assets/TdcVideos//SessionTwoVideo/SessiontTwoPart1.mp4'
import VideoTwo from '@/assets/TdcVideos/SessionTwoVideo/SessionTwoPart2.mp4'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Link, useNavigate } from 'react-router-dom';

// In a real app, these would be imported from your assets
const Video1 = VideoOne;
const Video2 = VideoTwo;

const videoList = [
  {
    id: 1,
    title: 'Driver Lecture (B.L.O.W.P.A.G.S.Y)',
    src: Video1,
    duration: '19 mins',
    description: 'A driver lecture covers essential road rules, penalties for violations, safe driving practices, and provides basic knowledge on vehicle maintenance, troubleshooting, and ensuring safe vehicle operation.',
    highlights: ['Driver Responsibilities', 'Vehicle Requirements','Penalties and Violations','Special Rules'],
  },
  {
    id: 2,
    title: 'Road Crash Prevention',
    src: Video2,
    duration: '6 mins',
    description: "In a Road Crash Prevention lesson, you'll learn defensive driving, hazard awareness, safe driving practices, vehicle maintenance, and how to respond to emergencies to avoid accidents.",
    highlights: ['avoid accidents', 'defensive driving techniques', 'obeying traffic signals', 'recognizing potential hazards','Action'],
  },
];

const VideoSection = () => {
  const navigate = useNavigate();
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(videoList[0]);
  const [videoCompletionStatus, setVideoCompletionStatus] = useState({
    1: false,
    2: false
  });
  const [canFastForward, setCanFastForward] = useState(false);
  const videoRef = useRef(null);


  // Prevent back navigation
    useEffect(() => {
      const preventNavigation = (e) => {
        e.preventDefault();
        e.returnValue = '';
        return e.returnValue;
      };
  
      const preventBackButton = (e) => {
        window.history.pushState(null, '', window.location.href);
      };
  
      // Add event listeners
      window.history.pushState(null, '', window.location.href);
      window.addEventListener('popstate', preventBackButton);
      window.addEventListener('beforeunload', preventNavigation);
  
      // Cleanup
      return () => {
        window.removeEventListener('popstate', preventBackButton);
        window.removeEventListener('beforeunload', preventNavigation);
      };
    }, []);

  const handlePlayPauseClick = () => {
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleFastForwardClick = () => {
    if (videoRef.current) {
      videoRef.current.currentTime += 10; // Fast forward by 10 seconds
    }
  };

  const handleVideoSelect = (video) => {
    // Only allow video selection if previous video is completed
    const canAccessVideo = video.id === 1 || videoCompletionStatus[video.id - 1];
    
    if (canAccessVideo) {
      setSelectedVideo(video);
      setIsPlaying(false);
    }
  };

  const handleVideoEnd = () => {
    setVideoCompletionStatus(prev => ({
      ...prev,
      [selectedVideo.id]: true
    }));
    setIsPlaying(false);
  };

  // Handle seeking based on fast-forward setting
  const RESTRICT_FAST_FORWARD = false; // Set to false to remove restriction

  const handleSeek = (e) => {
    if (RESTRICT_FAST_FORWARD && !canFastForward) {
      e.preventDefault();
      videoRef.current.currentTime = videoRef.current.currentTime;
    }
  };

  // Check if all videos are completed
  const areAllVideosCompleted = Object.values(videoCompletionStatus).every(status => status);


  useEffect(() => {
    const handleBeforeUnload = (e) => {
      const message = "Warning: Your video progress will be lost if you refresh the page. Are you sure you want to continue?";
      e.preventDefault();
      e.returnValue = message;
      return message;
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  return (
    <div className="max-w-7xl mx-auto mt-8 p-6 bg-gray-50">
     
      <h1 className='mb-[5rem] text-3xl font-semibold text-black'>Session Two - Video Demo</h1>

      <div className="grid gap-8 md:grid-cols-3">
        {/* Main Content */}
        <div className="md:col-span-2 space-y-6">
          {/* Video Container */}
          <div className="relative w-full aspect-video bg-slate-900 rounded-xl overflow-hidden shadow-lg">
            <video
              ref={videoRef}
              src={selectedVideo.src}
              className="w-full h-full object-cover"
              onEnded={handleVideoEnd}
              onSeeking={handleSeek}
            >
              Your browser does not support the video tag.
            </video>
            
            {/* Custom Video Controls */}
            <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
              <button 
                onClick={handlePlayPauseClick} 
                className="bg-white/20 hover:bg-white/30 p-2 rounded-full backdrop-blur-sm"
              >
                {isPlaying ? <Pause size={24} className="text-white" /> : <Play size={24} className="text-white" />}
              </button>

              {/* Fast Forward Button */}
              {!RESTRICT_FAST_FORWARD && (
                <button
                  onClick={handleFastForwardClick}
                  className="bg-white/20 hover:bg-white/30 p-2 rounded-full backdrop-blur-sm"
                >
                  <FastForward size={24} className="text-white" />
                </button>
              )}
            </div>

            {/* Play Overlay */}
            {!isPlaying && !videoCompletionStatus[selectedVideo.id] && (
              <div
                className="absolute inset-0 flex items-center justify-center bg-black/40 cursor-pointer transition-all hover:bg-black/50"
                onClick={() => {
                  videoRef.current.play();
                  setIsPlaying(true);
                }}
              >
                <div className="bg-white/10 p-6 rounded-full backdrop-blur-sm">
                  <Play size={48} className="text-white" />
                </div>
              </div>
            )}
          </div>

          {/* Description Card */}
          <Card className="border-0 shadow-md">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl font-bold text-gray-800">
                    {selectedVideo.title}
                  </CardTitle>
                  <div className="flex items-center mt-2 space-x-4">
                    <span className="flex items-center text-sm text-gray-600">
                      <Clock size={16} className="mr-1" />
                      {selectedVideo.duration}
                    </span>
                  </div>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <p className="text-gray-700 leading-relaxed">
                {selectedVideo.description}
              </p>
              
              <div className="mt-6">
                <h3 className="font-semibold text-gray-800 mb-3">What you'll learn:</h3>
                <div className="grid grid-cols-2 gap-3">
                  {selectedVideo.highlights.map((highlight, index) => (
                    <div key={index} className="flex items-center text-gray-700">
                      <ChevronRight size={16} className="mr-2 text-blue-500" />
                      {highlight}
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>

            <CardFooter className="flex justify-end items-center border-t pt-4">
              {areAllVideosCompleted && (
                <Link to="/authstudent/session2-powerpoint"> 
                  <Button 
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6"
                  >
                    Proceed to Reviewer
                  </Button>
                </Link>
              )}
            </CardFooter>
          </Card>
        </div>

        {/* Video List Sidebar */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Course Content</h2>
          <div className="space-y-3">
            {videoList.map((video) => {
              const isAccessible = video.id === 1 || videoCompletionStatus[video.id - 1];
              return (
                <Card
                  key={video.id}
                  className={`cursor-pointer transition-all hover:shadow-md ${
                    selectedVideo.id === video.id ? 'ring-2 ring-blue-500' : ''
                  } ${!isAccessible ? 'opacity-50 pointer-events-none' : ''}`}
                  onClick={() => handleVideoSelect(video)}
                >
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="font-semibold text-gray-800 mb-2">{video.title}</div>
                        <div className="flex items-center space-x-3 text-sm text-gray-600">
                          <span className="flex items-center">
                            <Clock size={14} className="mr-1" />
                            {video.duration}
                          </span>
                          <span>•</span>
                          <span className="flex items-center">
                            <BookOpen size={14} className="mr-1" />
                            {video.level}
                          </span>
                        </div>
                      </div>
                      {videoCompletionStatus[video.id] && (
                        <span className="text-green-500">✓</span>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoSection;
