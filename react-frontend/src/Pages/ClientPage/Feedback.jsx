// src/pages/Feedback.jsx
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { ChevronLeft } from 'lucide-react';

function Feedback() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // src/pages/Feedback.jsx

const handleSubmitFeedback = async () => {
  if (!title || !description) {
    toast.error('Please fill out all fields');
    return;
  }

  setIsLoading(true);
  try {
    const response = await axios.post(
  'http://127.0.0.1:8080/api/feedback', // 🔹 UPDATE HERE
  {
    user_id: 1, // dynamically use logged-in user ID
    enrollment_id: 15, // dynamically use enrollment ID
    feedback_title: title,
    feedback_description: description,
  },
  {
    withCredentials: true // 🔹 important for Sanctum
  }
);

    toast.success('Feedback submitted successfully!');
    setTitle('');
    setDescription('');
    console.log(response.data);
  } catch (error) {
    console.error('Error submitting feedback:', error);
    toast.error('Failed to submit feedback');
  } finally {
    setIsLoading(false);
  }
};


  // 🧭 Go back to previous page
  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <>
      {/* Modal Background */}
      <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
        {/* Modal Card */}
        <Card className="p-8 space-y-4 shadow-lg bg-white rounded-2xl w-full max-w-2xl mx-4">
          <h1 className="text-2xl font-bold text-gray-800 text-center">
            Share Your Feedback!
          </h1>
          <p className="text-gray-600 text-center mb-4">
            We value your thoughts. Let us know how your learning experience has been.
          </p>

          <input
            type="text"
            placeholder="Feedback Title"
            className="w-full p-3 border rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            placeholder="Feedback Description"
            className="w-full p-3 border rounded h-32 resize-none"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <button
            onClick={handleSubmitFeedback}
            disabled={isLoading}
            style={{ padding: '12px 20px', backgroundColor: 'black', color: 'white', width: '100%' }}
          >
            {isLoading ? 'Submitting...' : 'Submit Feedback'}
          </button>

          <Button
            variant="outline"
            onClick={handleGoBack}
            className="w-full flex items-center justify-center gap-2 mt-2"
          >
            <ChevronLeft size={18} />
            Back
          </Button>
        </Card>
      </div>
    </>
  );
}

export default Feedback;
