import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card } from '@/components/ui/card';

function AdminFeedback() {
    const [feedbacks, setFeedbacks] = useState([]);

    // src/pages/AdminFeedback.jsx

    useEffect(() => {
        const fetchFeedbacks = async () => {
            try {
                const response = await axios.get(
                    'http://127.0.0.1:8080/api/feedback', // 🔹 UPDATE HERE
                    {
                        withCredentials: true // 🔹 important for Sanctum
                    }
                );

                setFeedbacks(response.data);
            } catch (error) {
                console.error('Error fetching feedbacks:', error);
            }
        };

        fetchFeedbacks();
    }, []);

    return (
        <div className="p-6 space-y-4">
            <h1 className="text-2xl font-bold mb-4">Student Feedbacks</h1>
            {feedbacks.length === 0 ? (
                <p>No feedbacks yet.</p>
            ) : (
                feedbacks.map((fb) => (
                    <Card key={fb.feedback_id} className="p-4 space-y-2">
                        <h2 className="text-lg font-semibold">{fb.feedback_title}</h2>
                        <p className="text-gray-700">{fb.feedback_description}</p>
                        <p className="text-sm text-gray-500">
                            by {fb.user?.name || 'Unknown User'}
                        </p>
                    </Card>
                ))
            )}
        </div>
    );
}

export default AdminFeedback;
