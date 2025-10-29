import React, { useState, useEffect } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Car,
  BookOpen,
  Bike,
  LayoutDashboard,
  UserCircle,
  LogOut,
  Menu,
  Loader2,
  Users,
  GraduationCap,
  HardDriveUpload,
  Calendar
} from 'lucide-react';
import { cn } from "@/lib/utils";
import { getAdmin, logoutUser } from '@/lib/services/authservices';

function DefaultLayouts() {
  const [isMobile, setIsMobile] = useState(false);
  const [open, setOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      try {
        const response = await getAdmin();
        setUser(response.user);
      }  catch (error) {
        console.error("Failed to fetch user:", error);
        // If unauthorized, redirect to login
        if (error.response?.status === 401) {
          navigate('/login-credentials', { replace: true });
        }
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const navigation = [
    {
      group: "Overview",
      items: [
        {
          name: 'Dashboard',
          description: 'View key metrics and statistics',
          icon: LayoutDashboard,
          href: '/authadmin/maindashboard'
        }
      ]
    },
    {
      group: "Courses",
      items: [
        {
          name: 'Courses',
          description: 'Manage driving courses and schedules',
          icon: Car,
          href: 'courses'
        },
      
      ]
    },
    {
      group: "Online Learning",
      items:[
        {
          name: 'Online Enrollment Requests',
          description: 'Handle digital course registrations',
          icon: GraduationCap,
          href: 'online-enrollment-request'
        },
      ]
    },
    {
      group: "Booking Appoinments",
      items:[
        {
          name: 'Booking Enrollment Requests',
          description: 'Manage in-person booking requests',
          icon: BookOpen,
          href: 'Booking-enrollment-request'
        }
      ]
    },
    {
      group: "Management",
      items: [
        {
          name: 'Users',
          description: 'Manage student and instructor accounts',
          icon: Users,
          href: 'users-account'
        },
        {
          name: 'Schedule',
          description: 'Manage to Change the Availability of Instructors',
          icon: Calendar,
          href: 'schedule'
        },
        {
          name: 'Feedbacks',
          description: 'Learners Feedback Report',
          icon: Users,
          href: 'feedback'
        },
        {
        name: 'Audit Logs',
        description: 'View system activity logs',
        icon: UserCircle, // you can change this icon
        href: 'audit-logs'
        }
      ]
    }
  ];

  const handleLogout = async () => {
    if (loggingOut) return;
    
    setLoggingOut(true);
    try {
      await logoutUser();
      setOpen(false);
      navigate('/login-credentials', { replace: true });
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setLoggingOut(false);
    }
  };

  const NavContent = () => (
    <div className="h-full flex flex-col bg-slate-900 text-white">
      {/* Logo area */}
      <div className="h-16 flex items-center justify-center border-b border-slate-700">
        <div className="flex items-center space-x-2">
          <Car className="h-6 w-6 text-blue-400" />
          <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-blue-300 bg-clip-text text-transparent">
            Admin Control
          </h1>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-6 p-4 overflow-y-auto">
        {navigation.map((section) => (
          <div key={section.group} className="space-y-2">
            <h2 className="px-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">
              {section.group}
            </h2>
            <div className="space-y-1">
              {section.items.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.href;

                return (
                  <TooltipProvider key={item.name}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Link
                          to={item.href}
                          onClick={() => isMobile && setOpen(false)}
                          className={cn(
                            "flex items-center space-x-3 rounded-lg px-3 py-2 text-sm transition-colors relative overflow-hidden group",
                            isActive
                              ? "bg-blue-600 text-white"
                              : "hover:bg-slate-800 text-slate-300 hover:text-white"
                          )}
                        >
                          <Icon className={cn(
                            "h-5 w-5 flex-shrink-0 transition-colors",
                            isActive ? "text-white" : "text-slate-400 group-hover:text-white"
                          )} />
                          <span>{item.name}</span>
                          {isActive && (
                            <span className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-blue-400 rounded-l-full" />
                          )}
                        </Link>
                      </TooltipTrigger>
                      <TooltipContent side="right" className="bg-slate-800 text-white border-slate-700">
                        {item.description}
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Bottom section - Admin Profile */}
      <div className="p-4 border-t border-slate-700 bg-slate-800/50">
        {loading ? (
          <div className="flex items-center justify-center p-4">
            <Loader2 className="h-6 w-6 animate-spin text-blue-400" />
          </div>
        ) : user ? (
          <div className="flex items-center gap-4 mb-4 p-2 rounded-lg hover:bg-slate-800 transition-colors">
            <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center">
              <UserCircle className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="font-medium text-white">{user.name}</p>
              <p className="text-sm text-slate-400">{user.email}</p>
              <p className="text-xs text-slate-500 capitalize">{user.role}</p>
            </div>
          </div>
        ) : null}
        
        <Button
          variant="outline"
          className="w-full bg-slate-800 hover:bg-slate-700 text-white border-slate-600 flex items-center justify-center space-x-2"
          onClick={handleLogout}
          disabled={loggingOut}
        >
          {loggingOut ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <LogOut className="h-4 w-4" />
          )}
          <span>Logout</span>
        </Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 h-16 border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 z-30">
        <div className="flex items-center justify-between px-4 h-full">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 w-72">
              <NavContent />
            </SheetContent>
          </Sheet>
          <div className="flex items-center space-x-2">
            <Car className="h-5 w-5 text-blue-600" />
            <h1 className="font-semibold text-slate-900">Driving School</h1>
          </div>
          <div className="w-10" />
        </div>
      </header>

      {/* Desktop Sidebar */}
      <div className="hidden lg:block fixed inset-y-0 left-0 w-64 border-r border-slate-200 bg-white z-30">
        <NavContent />
      </div>

      {/* Main content */}
      <main className="lg:pl-64">
        <div className="container mx-auto p-4 pt-20 lg:py-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default DefaultLayouts;