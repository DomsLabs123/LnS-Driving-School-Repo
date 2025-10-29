import React, { useState } from 'react';
import { updateUserAccount } from '@/lib/services/TDCOnlineTraining/onlineTrainingSevice';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle, CheckCircle2, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const UserSettings = () => {
  const navigate = useNavigate(); 
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [alert, setAlert] = useState({
    show: false,
    type: 'success',
    message: '',
  });

  const showAlert = (type, message) => {
    setAlert({
      show: true,
      type,
      message,
    });

    setTimeout(() => {
      setAlert({ show: false, type: 'success', message: '' });
    }, 5000);
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      showAlert('error', 'New passwords do not match');
      return;
    }

    try {
      await updateUserAccount({
        currentPassword,
        newPassword,
      });

      showAlert('success', 'Profile updated successfully');

      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to update profile';
      showAlert('error', errorMessage);
      console.error('Update profile error:', error);
    }
  };

 return (
    <div className="max-w-lg p-6 sm:p-10 bg-white bg-opacity-95 shadow-lg rounded-2xl border border-gray-100">
      <Button onClick={() => navigate(-1)} className="mb-[5rem] flex items-center gap-3">
        <ArrowLeft className='w-5 h-5' /> Go Back
      </Button>

      <h1 className="text-3xl font-bold text-black">User Settings</h1>
      <p className="text-sm text-gray-600 mt-2">
        Update your account details and password below.
      </p>

      {alert.show && (
        <Alert
          className={`mt-6 ${
            alert.type === 'success'
              ? 'bg-green-100 border-green-500 text-green-800'
              : 'bg-red-100 border-red-500 text-red-800'
          }`}
        >
          {alert.type === 'success' ? (
            <CheckCircle2 className="h-5 w-5 text-green-500" />
          ) : (
            <AlertCircle className="h-5 w-5 text-red-500" />
          )}
          <AlertTitle>
            {alert.type === 'success' ? 'Success' : 'Error'}
          </AlertTitle>
          <AlertDescription>{alert.message}</AlertDescription>
        </Alert>
      )}

      <form onSubmit={handleUpdateProfile} className="mt-8 space-y-6">
        <div>
          <label
            htmlFor="currentPassword"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Current Password
          </label>
          <Input
            type="password"
            id="currentPassword"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            placeholder="Enter current password"
            className="w-full"
          />
        </div>

        <div>
          <label
            htmlFor="newPassword"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            New Password
          </label>
          <Input
            type="password"
            id="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Enter a new password"
            className="w-full"
          />
        </div>

        <div>
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Confirm New Password
          </label>
          <Input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm your new password"
            className="w-full"
          />
        </div>

        <Button type="submit" className="mt-4">
          Update Profile
        </Button>
      </form>
    </div>
  );
};

export default UserSettings;
