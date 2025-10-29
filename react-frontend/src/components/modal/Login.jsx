import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { getCsrfToken, loginUser } from '@/lib/services/authservices';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handlePasswordChange = (e) => {
    const cleanPassword = e.target.value.replace(/\s+/g, '');
    setPassword(cleanPassword);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    try {
      await getCsrfToken();
      const response = await loginUser({ 
        email, 
        password: password.trim()
      });
     
      if (response.user) {
        if (response.user.role === 'admin') {
          navigate('/authadmin/maindashboard');
        } else if (response.user.role === 'student') {
          navigate('/authstudent');
        } else if (response.user.role === 'staff'){
          navigate('/l&sStaff/StaffMain');
        } else if (response.user.role === 'instructor'){
          navigate('/L&SInstructors');
        }
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left side with background image */}
      <div 
        className="hidden md:flex w-1/2 bg-cover bg-center"
        style={{ backgroundImage: "url('/src/assets/wallpaper.png')" }} // 👈 replace with your image path
      >
        {/* You can also add overlay text here if you want */}
      </div>

      {/* Right side with login form */}
      <div className="flex w-full md:w-1/2 items-center justify-center bg-gray-100">
        <Card className="w-full max-w-md shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">Login to Your Account</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
             
              <div className="space-y-2">
                <Input
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full"
                />
              </div>
             
              <div className="space-y-2">
                <Input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={handlePasswordChange}
                  required
                  className="w-full"
                />
              </div>
              <Button
                type="submit"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? 'Logging in...' : 'Login'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;
