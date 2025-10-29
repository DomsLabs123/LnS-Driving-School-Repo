import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CalendarCheck, FileText, UserCheck, Clock, CheckCircle, Users } from "lucide-react";

function InstructorMain() {
  return (
    <div className="p-6 space-y-6">
      {/* Exam Scores */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-blue-600 text-white">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-2">
              <CheckCircle className="w-6 h-6" /> Total Students Passed on Online TDC
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">45 Students</p>
          </CardContent>
        </Card>
        
        <Card className="bg-green-600 text-white">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-2">
              <Users className="w-6 h-6" /> Total Practical Students Enrolled
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">30 Students</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2">
            <FileText className="w-6 h-6 text-blue-600" /> Exam Scores
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student Name</TableHead>
                <TableHead>Session 1</TableHead>
                <TableHead>Session 2</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>John Doe</TableCell>
                <TableCell>85</TableCell>
                <TableCell>90</TableCell>
                <TableCell className="text-green-600">Passed</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Jane Smith</TableCell>
                <TableCell>75</TableCell>
                <TableCell>80</TableCell>
                <TableCell className="text-yellow-600">Pending</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Practical Driving Schedule */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2">
            <CalendarCheck className="w-6 h-6 text-green-600" /> Practical Driving Schedule
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            <li className="p-4 bg-gray-100 rounded-lg flex justify-between items-center">
              <span>John Doe - Feb 12, 2025</span>
              <Clock className="text-blue-600" /> 10:00 AM
            </li>
            <li className="p-4 bg-gray-100 rounded-lg flex justify-between items-center">
              <span>Jane Smith - Feb 15, 2025</span>
              <Clock className="text-blue-600" /> 2:00 PM
            </li>
          </ul>
        </CardContent>
      </Card>

      {/* Student Progress */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2">
            <UserCheck className="w-6 h-6 text-purple-600" /> Student Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student Name</TableHead>
                <TableHead>Progress</TableHead>
                <TableHead>Remarks</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>John Doe</TableCell>
                <TableCell>80%</TableCell>
                <TableCell>Good Performance</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Jane Smith</TableCell>
                <TableCell>60%</TableCell>
                <TableCell>Needs Improvement</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

export default InstructorMain;
