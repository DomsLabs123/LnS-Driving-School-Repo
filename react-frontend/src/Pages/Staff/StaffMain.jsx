import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell, CalendarCheck } from "lucide-react";

function StaffMain() {
  return (
    <div className="p-6 space-y-6">
      {/* Welcome Banner */}
      <Card className="bg-green-600 text-white">
        <CardHeader>
          <CardTitle className="text-2xl flex items-center gap-2">
            <Bell className="w-6 h-6" /> Welcome to the Dashboard
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lg">
            Manage your bookings and requests seamlessly.
          </p>
        </CardContent>
      </Card>

      {/* Booking Requests */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2">
            <CalendarCheck className="w-6 h-6 text-green-600" /> Booking Requests
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 bg-gray-100 rounded-lg flex justify-between items-center">
              <span>John Doe - 2/10/2025</span>
              <button className="px-3 py-1 bg-green-500 text-white rounded-md">
                Approve
              </button>
            </div>
            <div className="p-4 bg-gray-100 rounded-lg flex justify-between items-center">
              <span>Jane Smith - 2/15/2025</span>
              <button className="px-3 py-1 bg-green-500 text-white rounded-md">
                Approve
              </button>
            </div>
            <div className="p-4 bg-gray-100 rounded-lg flex justify-between items-center">
              <span>Alan Walker - 2/20/2025</span>
              <button className="px-3 py-1 bg-green-500 text-white rounded-md">
                Approve
              </button>
            </div>
          </div>
        </CardContent>
      </Card>


      <Card>
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2">
            <CalendarCheck className="w-6 h-6 text-green-600" /> Online Requests
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 bg-gray-100 rounded-lg flex justify-between items-center">
              <span>John Doe - 2/10/2025</span>
              <button className="px-3 py-1 bg-green-500 text-white rounded-md">
                Approve
              </button>
            </div>
            <div className="p-4 bg-gray-100 rounded-lg flex justify-between items-center">
              <span>Jane Smith - 2/15/2025</span>
              <button className="px-3 py-1 bg-green-500 text-white rounded-md">
                Approve
              </button>
            </div>
            <div className="p-4 bg-gray-100 rounded-lg flex justify-between items-center">
              <span>Alan Walker - 2/20/2025</span>
              <button className="px-3 py-1 bg-green-500 text-white rounded-md">
                Approve
              </button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default StaffMain;
