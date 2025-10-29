import React from 'react'
import { Link } from 'react-router-dom';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Car, CarFront, Bike } from 'lucide-react';
import Elearning from '@/assets/elearning.png';
import Plearning from '@/assets/classroom.png';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
function RefresherEnrollment() {
    const courses = [
        {
          id: 1,
          title: "Online Lecture",
          icon: <img src={Elearning } alt="" className='object-cover w-16 h-16' />,
          path: "/refresher-enrollment-proccess",
        },
        {
          id: 2,
          title: "Physical Lecture",
          icon: <img src={Plearning } alt="" className='object-cover w-16 h-16' />,
          path: "/refresher-booking-enrollment-proccess",
        },
    ];


  return (
    <div className="flex justify-center items-center">
      <Dialog>
        <DialogTrigger asChild>
          <Button className="px-6 py-3 bg-[#E85C0D] text-white font-semibold rounded-md hover:bg-[#d05511] transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50">
            Enroll Refresher
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[900px]">
          <DialogHeader>
            <DialogTitle>Select what you want for the best.</DialogTitle>
          </DialogHeader>
          <div className="flex flex-wrap gap-4 justify-center py-4">
            {courses.map((course) => (
              <Link
                key={course.id}
                to={course.path}
                className="no-underline flex-1 min-w-[250px]"
              >
                <Card className="h-full hover:bg-gray-100 transition-colors cursor-pointer">
                  <CardHeader className="text-center">
                    <CardTitle className="text-lg">{course.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-col items-center space-y-6">
                    <div className="flex justify-center items-center w-full">
                      {course.icon}
                    </div>
                    <Button className="w-full">
                        Go on this 
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default RefresherEnrollment