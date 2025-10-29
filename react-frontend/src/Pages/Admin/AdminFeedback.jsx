import React, { useEffect, useState } from 'react';
import axiosInstance from '@/lib/axios/axiosInstance'; // your existing Axios
import { Card, CardContent } from '@/components/ui/card';

function AdminFeedback() {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const token = localStorage.getItem('admin_token'); // use admin token
        const response = await axiosInstance.get('/adminfeedbacks', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setFeedbacks(response.data);
      } catch (error) {
        console.error('Failed to fetch feedbacks', error);
      }
    };

    fetchFeedbacks();
  }, []);

  return (
    <div className="container mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold text-center">Feedback</h1>

      {feedbacks.length === 0 && (
        <p className="text-center text-gray-500">No feedback available.</p>
      )}

      {feedbacks.map(fb => (
        <Card key={fb.id} className="p-4">
          <CardContent>
            <p><strong>User:</strong> {fb.user?.name || 'Unknown'}</p>
            <p><strong>Title:</strong> {fb.feedback_title}</p>
            <p>{fb.feedback_description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default AdminFeedback;
