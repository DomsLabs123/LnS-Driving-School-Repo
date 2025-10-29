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
import Elearning from '@/assets/elearning.png';
import Plearning from '@/assets/classroom.png';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

function TDCEnrollment({ children }) {
  const courses = [
    {
      id: 1,
      title: "Online Lecture",
      icon: <img src={Elearning} alt="" className="object-cover w-16 h-16" />,
      path: "/tdc-enrollment-proccess",
    },
    {
      id: 2,
      title: "Physical Lecture",
      icon: <img src={Plearning} alt="" className="object-cover w-16 h-16" />,
      path: "/tdc-booking-enrollment-proccess",
    },
  ];

  return (
    <div className="flex justify-center items-center">
      <Dialog>
        {/* Allow custom trigger button */}
        <DialogTrigger asChild>
          {children}
        </DialogTrigger>

        <DialogContent className="sm:max-w-[900px]">
          <DialogHeader>
            <DialogTitle>Select what you want.</DialogTitle>
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
                    <Button className="w-full">Go on this</Button>
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

export default TDCEnrollment
