import { createBrowserRouter } from "react-router-dom";
import LandingPage from "@/Pages/GuestPage/LandingPage";
import GuestLayouts from '@/components/layouts/Guestlayouts'
import Defaultlayouts from "@/components/layouts/Defaultlayouts";
import MainDashboard from "@/Pages/ClientPage/MainDashboard";
import AdminLayouts from "@/components/layouts/AdminLayouts"
import AdminDashboard from "@/Pages/Admin/adminDashboard";
import MDC from "@/Pages/GuestPage/Courses/MDC";
import PDC from "@/Pages/GuestPage/Courses/PDC";
import TDC from "@/Pages/GuestPage/Courses/TDC";
import Refresher from "@/Pages/GuestPage/Courses/Refresher";
import Courses from "@/Pages/Admin/Courses";
import Users from "@/Pages/Admin/Users";
import OnlineEnrollment from "@/Pages/Admin/OnlineEnrollment";
import BookingEnrollment from "@/Pages/Admin/BookingEnrollment";
import ChatBotPage from '@/Pages/ClientPage/ChatBotPage'
import Login from '@/components/modal/Login'
import VideoTutorial from "@/Pages/ClientPage/TDC/SessionsOne/VideoSection";
import PowerPointSection from "@/Pages/ClientPage/TDC/SessionsOne/PowerPointSection";
import QuizSection from '@/Pages/ClientPage/TDC/SessionsOne/QuizSection';
import TDCEnrollment from '@/Pages/ClientPage/Enrollments/TDCEnrollments'
import RefresherEnrollment from '@/Pages/ClientPage/Enrollments/RefresherEnrollments';
import TDCBooking from '@/Pages/ClientPage/Enrollments/TDCBookingEnrollments'
import PDCBooking from '@/Pages/ClientPage/Enrollments/PDCEnrollments';
import MDCBooking from '@/Pages/ClientPage/Enrollments/MDCEnrollments';
import UserSetting from "@/Pages/ClientPage/UserSetting";
import UploadVideo from "@/Pages/Admin/UploadVideo";
import VideoSection from "@/Pages/ClientPage/TDC/SessionsTwo/VideoSectionSessionTwo";
import PowerPointSession2 from "@/Pages/ClientPage/TDC/SessionsTwo/PowerPointSessionTwo";
import Session2QuizSection from '@/Pages/ClientPage/TDC/SessionsTwo/Session2QuizSection';
import Finalization from '@/Pages/ClientPage/Finalization';
import StaffLayouts from "@/components/layouts/StaffLayouts";
import path from "path";
import StaffMain from "@/Pages/Staff/StaffMain";
import InstructorLayouts from "@/components/layouts/InstructorLayouts";
import InstructorMain from "@/Pages/Instructor/InstructorMain";
import RecheduleMain from "@/Pages/Staff/RecheduleMain";
import AuditLogs from "@/Pages/Admin/AuditLogs";
import AdminFeedback from '@/Pages/Admin/Feedback';
import LearnerFeedback from '@/Pages/ClientPage/Feedback';
import AdminLayout from "@/components/layouts/AdminLayouts";
import StaffLayout from "@/components/layouts/StaffLayouts";
import ScheduleManagement from "@/Pages/ScheduleManagement";




const router = createBrowserRouter([

    {
        path: '/',
        element: <GuestLayouts />,
        children: [
            {
                path: '',
                element: <LandingPage />
            },
            {
                path: '/course-mdc',
                element: <MDC />
            },
            {
                path: '/course-pdc',
                element: <PDC />
            },
            {
                path: '/course-tdc',
                element: <TDC />
            },
            {
                path: '/course-refresher',
                element: <Refresher />
            },
            {
                path: '/refresher-booking-enrollment-proccess',
                element: <RefresherEnrollment />
            },

            {
                path: '/tdc-enrollment-proccess',
                element: <TDCEnrollment />
            },
            {
                path: '/tdc-booking-enrollment-proccess',
                element: <TDCBooking />
            },
            {
                path: '/pdc-booking-enrollment-proccess',
                element: <PDCBooking />
            },
            {
                path: '/mdc-booking-enrollment-proccess',
                element: <MDCBooking />
            },




        ]
    },

    /// Login 
    {
        path: '/login-credentials',
        element: <Login />
    },

    // Default Layouts for users
    {
        path: '/authstudent',
        element: <Defaultlayouts />,
        children: [
            {
                path: '',
                element: <MainDashboard />
            },
            {
                path: 'user-setting',
                element: <UserSetting />
            },
            /// Session 1
            {
                path: 'tdc-video',
                element: <VideoTutorial />
            },
            {
                path: 'tdc-powerpoint',
                element: <PowerPointSection />
            },
            {
                path: 'tdc-examination',
                element: <QuizSection />
            },
            /// Session 2
            {
                path: 'session2-tdc-video',
                element: <VideoSection />
            },
            {
                path: 'session2-powerpoint',
                element: <PowerPointSession2 />
            },
            {
                path: 'session2-exam',
                element: <Session2QuizSection />
            },
            {
                path: 'exam-results',
                element: <Finalization />
            },
            {
                path: 'feedback',
                element: <LearnerFeedback />
            }


        ]
    },

    // Default Layouts for Admin
    {
        path: '/authadmin',
        element: <AdminLayouts />,
        children: [
            {
                path: 'maindashboard',
                element: <AdminDashboard />
            },
            {
                path: 'courses',
                element: <Courses />
            },
            {
                path: 'users-account',
                element: <Users />
            },
            {
                path: 'online-enrollment-request',
                element: <OnlineEnrollment />
            },
            {
                path: 'Booking-enrollment-request',
                element: <BookingEnrollment />
            },
            {
                path: 'upload-video',
                element: <UploadVideo />
            },
            {
                path: 'audit-logs',
                element: <AuditLogs />   // ✅ plural, must match your import
            },
            {
                path: 'feedback',
                element: <AdminFeedback />   // ✅ plural, must match your import
            },
            {
                path: "schedule",
                element: <ScheduleManagement />,
            },



        ]

    },

    /**
     * Staff Layouts & Routes
     */
    {
        path: '/l&sStaff',
        element: <StaffLayouts />,
        children: [
            {
                path: 'StaffMain',
                element: <StaffMain />
            },
            {
                path: 'online-enrollment-request',
                element: <OnlineEnrollment />
            },
            {
                path: 'Booking-enrollment-request',
                element: <BookingEnrollment />
            },
            {
                path: 'RescheduleClient',
                element: <RecheduleMain />
            },
            {
                path: "schedule",
                element: <ScheduleManagement />,
            },

        ]
    },
    /**
     * Instructor Layouts & Routes
     */
    {
        path: '/L&SInstructors',
        element: <InstructorLayouts />,
        children: [
            {
                path: 'InstructorMain',
                element: <InstructorMain />
            },
            {
                path: 'users-account',
                element: <Users />
            },
        ]
    }

]);
export default router