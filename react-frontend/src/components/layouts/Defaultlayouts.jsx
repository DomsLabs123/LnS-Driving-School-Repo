import React, { useState, useEffect } from 'react';
import { useLocation, Outlet, useNavigate } from 'react-router-dom';
import { Menu, LogOut, User, Settings, Loader2 } from 'lucide-react';
import { getUser, logoutUser } from '@/lib/services/authservices';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import Logo from '@/assets/logo.png';

// Backgrounds
import BgDashboard from '@/assets/drivingarea.png';
import BgSession1 from '@/assets/drivingalone.png';
import BgSession2 from '@/assets/drivingalone.png';
import BgSession3 from '@/assets/drivingalone.png';
import BgSession4 from '@/assets/drivingalone.png';
import BgSession5 from '@/assets/drivingalone.png';
import BgSession6 from '@/assets/drivingalone.png';
import BgSession7 from '@/assets/drivingalone.png';
import BgSession8 from '@/assets/drivingalone.png';
import BgSession9 from '@/assets/drivingalone.png';

const Navbar = () => {
  const [username, setUsername] = useState('');
  const [logoutLoading, setLogoutLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getUser();
        setUsername(userData.username || userData.name || 'Guest');
      } catch {
        navigate('/login-credentials');
      }
    };
    fetchUser();
  }, [navigate]);

  const handleLogout = async () => {
    setLogoutLoading(true);
    await logoutUser();
    navigate('/login-credentials');
  };

  return (
    <nav className="bg-white border-b shadow-sm relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between h-16 items-center">
        <div
          onClick={() => navigate('/authstudent')}
          className="flex items-center cursor-pointer"
        >
          <img src={Logo} alt="L&S Logo" className="h-10 w-10 mr-2" />
          <h1 className="text-xl font-bold text-blue-600">
            L&S Driving School
          </h1>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center space-x-2">
              <User className="h-5 w-5 text-gray-500" />
              <span className="text-gray-700">{username}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem
              onClick={() => navigate('/authstudent/user-setting')}
              className="flex items-center space-x-2"
            >
              <Settings className="h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={handleLogout}
              disabled={logoutLoading}
              className="flex items-center space-x-2"
            >
              {logoutLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <LogOut className="h-4 w-4" />
              )}
              <span>{logoutLoading ? 'Logging out...' : 'Logout'}</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
};

const DefaultLayout = () => {
  const location = useLocation();

  const backgroundMap = {
    '/authstudent': BgDashboard,
    '/authstudent/tdc-video': BgSession1,
    '/authstudent/session2-tdc-video': BgSession2,
    '/authstudent/tdc-powerpoint': BgSession3,
    '/authstudent/tdc-examination': BgSession4,
    '/authstudent/session2-powerpoint': BgSession5,
    '/authstudent/session2-exam': BgSession6,
    '/authstudent/exam-results': BgSession7,
    '/authstudent/feedback': BgSession8,
    '/authstudent/user-setting': BgSession9,
    
  };

  const currentBackground = backgroundMap[location.pathname] || BgDashboard;

  return (
    <div className="relative min-h-screen bg-gray-50 text-white">
      <Navbar />
      <div className="relative min-h-[calc(100vh-4rem)] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center brightness-90"
          style={{
            backgroundImage: `url(${currentBackground})`,
          }}
        ></div>
        <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DefaultLayout;
