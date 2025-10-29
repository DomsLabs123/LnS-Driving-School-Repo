import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Briefcase, GraduationCap } from "lucide-react";

function AdminDashboard() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Welcome Admin</h1>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Total Instructors */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Total Instructors</CardTitle>
            <Users className="w-6 h-6 text-blue-500" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">15</p>
          </CardContent>
        </Card>

        {/* Total Staff */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Total Staff</CardTitle>
            <Briefcase className="w-6 h-6 text-green-500" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">8</p>
          </CardContent>
        </Card>

        {/* Total Students */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Total Students</CardTitle>
            <GraduationCap className="w-6 h-6 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">50</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default AdminDashboard;
