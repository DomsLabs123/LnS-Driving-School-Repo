import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { getBookingRequests, rescheduleBooking } from '@/lib/services/StaffServices/StaffApi';

const RescheduleMain = () => {
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const data = await getBookingRequests();
      console.log('Fetched data:', data); // Log the entire response
      console.log('Booking requests:', data.bookingRequest); // Log just the booking requests
      setBookings(data.bookingRequest);
      setFilteredBookings(data.bookingRequest);
    } catch (error) {
      console.error('Fetch error:', error);
      setMessage('Failed to fetch bookings');
    }
};

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    
    if (!bookings || bookings.length === 0) return;

    const filtered = bookings.filter(booking => {
        // Add safety checks
        if (!booking) return false;
        
        return (
            (booking.firstname?.toString().toLowerCase().includes(term) || false) ||
            (booking.lastname?.toString().toLowerCase().includes(term) || false) ||
            (booking.email?.toString().toLowerCase().includes(term) || false)
        );
    });
    
    console.log('Search term:', term);
    console.log('Filtered results:', filtered);
    
    setFilteredBookings(filtered);
};

  const handleReschedule = async (bookingId, newDate, newTime) => {
    setLoading(true);
    try {
        const updates = {};
        
        // Only include date if it changed
        if (newDate) {
            updates.date_booked = newDate;
        }
        
        // Only include time if it changed
        if (newTime) {
            updates.time_booked = newTime;
        }

        // Only make the API call if there are changes
        if (Object.keys(updates).length > 0) {
            await rescheduleBooking(bookingId, updates);
            setMessage('Booking rescheduled successfully');
            fetchBookings(); // Refresh the list
        }
    } catch (error) {
        setMessage(error.message || 'Failed to reschedule booking');
    }
    setLoading(false);
  };

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Reschedule Bookings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 mb-6">
            <Search className="w-5 h-5 text-gray-500" />
            <Input
              type="text"
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={handleSearch}
              className="w-full"
            />
          </div>

          {message && (
            <Alert className="mb-4">
              <AlertDescription>{message}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-4">
          {filteredBookings && filteredBookings.length > 0 ? (
        filteredBookings.map(booking => (
            <Card key={booking.id} className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <h3 className="font-medium">
                            {booking.firstname || ''} {booking.lastname || ''}
                        </h3>
                        <p className="text-sm text-gray-600">{booking.email || ''}</p>
                        <p className="text-sm text-gray-600">
                            Current Schedule: {booking.date_booked ? new Date(booking.date_booked).toLocaleDateString() : 'N/A'} at {booking.time_booked || 'N/A'}
                        </p>
                    </div>
                    <div className="space-y-2">
                    <Input
                      type="date"
                      defaultValue={booking.date_booked}
                      onChange={(e) => booking.newDate = e.target.value}
                      className="mb-2"
                    />
                    <Input
                      type="time"
                      defaultValue={booking.time_booked}
                      onChange={(e) => booking.newTime = e.target.value}
                      className="mb-2"
                    />
                    <Button 
                      onClick={() => handleReschedule(booking.id, booking.newDate, booking.newTime)}
                      disabled={loading}
                      className="w-full"
                    >
                      Update Schedule
                    </Button>
                  </div>
                </div>
            </Card>
        ))
    ) : (
        <p>No bookings found</p>
    )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RescheduleMain;