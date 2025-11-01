import { useState, useEffect } from "react";
import { CalendarIcon, Clock, CheckCircle2, Pencil } from "lucide-react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

function ScheduleManagement() {
  const [date, setDate] = useState(null);
  const [selectedSession, setSelectedSession] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedPracticalType, setSelectedPracticalType] = useState(null);

  const sessions = [
    { id: "morning", name: "Morning Session", time: "8:00 AM - 12:00 PM", icon: Clock, available: true },
    { id: "afternoon", name: "Afternoon Session", time: "1:00 PM - 5:00 PM", icon: Clock, available: true },
  ];

  useEffect(() => {
    if (date) {
      sessions.forEach((session) => {
        session.available = Math.random() > 0.2;
      });
    }
  }, [date]);

  const handleUpdate = () => {
    if (!date || (!selectedSession && !selectedPracticalType))
      return alert("Please complete all selections first.");

    const type =
      selectedCategory === "TDC"
        ? `(${selectedSession})`
        : `(${selectedPracticalType})`;

    alert(`Schedule updated for ${format(date, "yyyy-MM-dd")} ${type}`);
  };

  const handleReset = () => {
    setDate(null);
    setSelectedSession(null);
    setSelectedCategory(null);
    setSelectedPracticalType(null);
  };

  // 🔹 Helper to determine if date is "every other Saturday"
  const isEveryOtherSaturday = (d) => {
    const day = d.getDay(); // 6 = Saturday
    if (day !== 6) return false;

    const firstDay = new Date(d.getFullYear(), d.getMonth(), 1);
    let saturdayCount = 0;
    for (let i = 1; i <= d.getDate(); i++) {
      const temp = new Date(d.getFullYear(), d.getMonth(), i);
      if (temp.getDay() === 6) saturdayCount++;
    }
    // Keep 1st, 3rd, 5th Saturdays only
    return saturdayCount % 2 !== 0;
  };

  return (
    <Card className="shadow-lg">
      <CardHeader className="space-y-4 text-center border-b pb-6">
        <div className="flex items-center justify-center space-x-3">
          <div className="bg-primary/10 p-2 rounded-lg">
            <CalendarIcon className="w-12 h-12 text-primary" />
          </div>
          <h2 className="text-2xl font-bold text-primary">Manage Driving Schedules</h2>
        </div>
        <p className="text-muted-foreground">
          Edit scheduled sessions for students or instructors
        </p>
      </CardHeader>

      <CardContent className="pt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Date Picker */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <CalendarIcon className="w-5 h-5 text-primary" />
              <h3 className="font-medium">Select Date</h3>
            </div>
            <div className="flex flex-col items-center p-4 border rounded-lg bg-card">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                disabled={(d) => {
                  const isPast = d < new Date();
                  if (selectedCategory === "TDC") {
                    // disable everything except every other Saturday
                    return isPast || !isEveryOtherSaturday(d);
                  } else {
                    // Practical or not selected → all future dates allowed
                    return isPast;
                  }
                }}
                className="rounded-md border"
              />
            </div>
          </div>

          {/* Category + Session Picker */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5 text-primary" />
              <h3 className="font-medium">Select Type</h3>
            </div>

            {/* Step 1: Choose TDC or Practical */}
            <div className="flex gap-3">
              <Button
                variant={selectedCategory === "TDC" ? "default" : "outline"}
                onClick={() => {
                  setSelectedCategory("TDC");
                  setSelectedPracticalType(null);
                  setSelectedSession(null);
                }}
                className="flex-1"
              >
                TDC
              </Button>
              <Button
                variant={selectedCategory === "Practical" ? "default" : "outline"}
                onClick={() => {
                  setSelectedCategory("Practical");
                  setSelectedSession(null);
                  setSelectedPracticalType(null);
                }}
                className="flex-1"
              >
                Practical
              </Button>
            </div>

            {/* Step 2: If TDC, show session choices */}
            {selectedCategory === "TDC" && (
              <div className="border rounded-lg p-4 bg-card space-y-3">
                <p className="text-center text-sm text-primary font-semibold mb-3">
                  📚 Theoretical Driving Course (TDC)
                </p>

                <div className="text-left space-y-2">
                  <p className="text-sm">
                    <strong>Instructor:</strong> Mr. Renato Cabeltes
                  </p>
                  <p className="text-sm">
                    <strong>Duration:</strong> 15 hours (split into 2 sessions)
                  </p>
                </div>

                {date ? (
                  <div className="space-y-3 mt-4">
                    {sessions.map((session) => {
                      const Icon = session.icon;
                      return (
                        <Button
                          key={session.id}
                          variant={selectedSession === session.id ? "default" : "outline"}
                          className={cn(
                            "w-full justify-start py-6",
                            !session.available && "opacity-50 cursor-not-allowed",
                            selectedSession === session.id && "border-primary"
                          )}
                          disabled={!session.available}
                          onClick={() => setSelectedSession(session.id)}
                        >
                          <Icon className="mr-2 h-5 w-5" />
                          <div className="flex flex-col items-start">
                            <span className="font-medium">{session.name}</span>
                            <span className="text-sm text-muted-foreground">{session.time}</span>
                          </div>
                          {!session.available && (
                            <Badge variant="secondary" className="ml-auto">
                              Booked
                            </Badge>
                          )}
                        </Button>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    Please select a date first
                  </div>
                )}
              </div>
            )}

            {selectedCategory === "Practical" && (
              <div className="border rounded-lg p-4 bg-card space-y-3">
                <p className="text-center text-sm text-primary font-semibold mb-3">
                  ⚠️ LTO Requires 8hrs of PDC — Pick your time and date schedule!
                </p>

                {date ? (
                  <>
                    {/* Step 1: Choose schedule type (4xWeek or 2xWeek) */}
                    {!selectedPracticalType && (
                      <>
                        <Button
                          variant="outline"
                          className="w-full justify-start py-6"
                          onClick={() => setSelectedPracticalType("4xWeek")}
                        >
                          4 Times a Week, 2 Hours a Day
                        </Button>
                        <Button
                          variant="outline"
                          className="w-full justify-start py-6"
                          onClick={() => setSelectedPracticalType("2xWeek")}
                        >
                          2 Times a Week, 4 Hours a Day
                        </Button>
                      </>
                    )}

                    {/* Step 2: If a schedule type is selected, show session + instructor */}
                    {selectedPracticalType && (
                      <div className="space-y-4">
                        <div className="text-left">
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Choose Time Session
                          </label>
                          <div className="space-y-3">
                            <Button
                              variant={selectedSession === "morning" ? "default" : "outline"}
                              className="w-full justify-start py-6"
                              onClick={() => setSelectedSession("morning")}
                            >
                              Morning Session (8:00 AM - 12:00 PM)
                            </Button>
                            <Button
                              variant={selectedSession === "afternoon" ? "default" : "outline"}
                              className="w-full justify-start py-6"
                              onClick={() => setSelectedSession("afternoon")}
                            >
                              Afternoon Session (1:00 PM - 5:00 PM)
                            </Button>
                          </div>
                        </div>


                        {/* Instructor Dropdown */}
                        {selectedSession && (
                          <div className="mt-4 text-left">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Select Instructor
                            </label>
                            <select
                              className="w-full border rounded-lg p-3 bg-white focus:outline-none focus:ring-2 focus:ring-primary"
                              onChange={(e) =>
                                setSelectedPracticalType((prev) => ({
                                  ...prev,
                                  instructor: e.target.value,
                                }))
                              }
                              defaultValue=""
                            >
                              <option value="" disabled>
                                -- Choose an Instructor --
                              </option>
                              <option value="Mr. Alfe Paculba">Mr. Alfe Paculba</option>
                              <option value="Mr. TJ Barilla">Mr. TJ Barilla</option>
                              <option value="Mr. Diogenes Solito">Mr. Diogenes Solito</option>
                              <option value="Mr. Renato Cabeltes">Mr. Renato Cabeltes</option>
                            </select>
                          </div>
                        )}

                        {/* Back button */}
                        <div className="flex justify-end pt-3">
                          <Button
                            variant="outline"
                            onClick={() => {
                              setSelectedPracticalType(null);
                              setSelectedSession(null);
                            }}
                          >
                            ← Back
                          </Button>
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    Please select a date first
                  </div>
                )}
              </div>
            )}


          </div>
        </div>

        {/* Selected Schedule Summary */}
        {date && (selectedSession || selectedPracticalType) && (
          <Alert className="bg-primary/5 border-primary/20 mt-6">
            <CheckCircle2 className="h-4 w-4 text-primary" />
            <AlertTitle>Selected Schedule</AlertTitle>
            <AlertDescription>
              Editing schedule for{" "}
              <span className="font-medium">
                {format(date, "EEEE, MMMM do, yyyy")}
              </span>{" "}
              –{" "}
              <span className="font-medium">
                {selectedCategory === "TDC"
                  ? sessions.find((s) => s.id === selectedSession)?.name
                  : selectedPracticalType === "4xWeek"
                    ? "4 Times a Week, 2 Hours a Day"
                    : "2 Times a Week, 4 Hours a Day"}
              </span>
            </AlertDescription>
          </Alert>
        )}

        {/* Action Buttons */}
        <div className="flex justify-end pt-6 gap-3">
          <Button variant="outline" onClick={handleReset}>
            Cancel
          </Button>
          <Button
            onClick={handleUpdate}
            disabled={!date || (!selectedSession && !selectedPracticalType)}
          >
            <Pencil className="w-4 h-4 mr-2" /> Update Schedule
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default ScheduleManagement;
