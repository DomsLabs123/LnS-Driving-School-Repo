import React, { useEffect, useState } from 'react';
import { getBookingRequest, approveBookingEnrollment, rejectBookingEnrollment } from '@/lib/services/AdmnServices/AdminServices';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, FileText, Download, X, ZoomIn, ZoomOut, RotateCw, Check } from "lucide-react";

const BookingEnrollment = () => {
  const [enrollmentRequests, setEnrollmentRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [imageScale, setImageScale] = useState(1);
  const [rotation, setRotation] = useState(0);

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;


  const handleApproveEnrollment = async (id) => {
    try {
      await approveBookingEnrollment(id);
      fetchEnrollmentRequests();
    } catch (error) {
      console.error(error);
    }
  };


  const handleRejectEnrollment = async (id) => {
    try {
      await rejectBookingEnrollment(id);
      fetchEnrollmentRequests();
    } catch (error) {
      console.error(error);
    }
  };



  useEffect(() => {
    fetchEnrollmentRequests();
  }, []);

  useEffect(() => {
    if (!isImageModalOpen) {
      setImageScale(1);
      setRotation(0);
    }
  }, [isImageModalOpen]);

  const fetchEnrollmentRequests = async () => {
    try {
      const response = await getBookingRequest();
      // Add null check and default to empty array if enrollmentRequest is undefined
      setEnrollmentRequests(response?.bookingRequest || []);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching enrollment requests:', err);
      setError('Failed to fetch enrollment requests. Please try again later.');
      setLoading(false);
    }
  };

  const handleViewFiles = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleZoomIn = () => {
    setImageScale((prev) => Math.min(prev + 0.5, 3));
  };

  const handleZoomOut = () => {
    setImageScale((prev) => Math.max(prev - 0.5, 0.5));
  };

  const handleRotate = () => {
    setRotation((prev) => (prev + 90) % 360);
  };

  const formatDateTime = (dateString) => {
    try {
      const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      };
      return new Date(dateString).toLocaleString('en-US', options);
    } catch (err) {
      console.error('Error formatting date:', err);
      return 'Invalid Date';
    }
  };

  const formatTime = (timeString) => {
    if (!timeString) return 'N/A';
    
    const hour = parseInt(timeString.split(':')[0]);
    
    if (hour >= 8 && hour <= 11) {
      return `${timeString} AM`;
    } else if (hour >= 12 && hour <= 17) {
      return `${timeString} PM`;
    }
    
    return timeString;
  };

  const getFileExtension = (filename) => {
    try {
      return filename?.split('.').pop().toLowerCase() || '';
    } catch {
      return '';
    }
  };

  const isImageFile = (filename) => {
    const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp'];
    return imageExtensions.includes(getFileExtension(filename));
  };



  const getStatusColor = (status) => {
    const statusColors = {
      pending: 'bg-yellow-100 text-yellow-800',
      approved: 'bg-green-100 text-green-800',
      rejected: 'bg-red-100 text-red-800',
    };
    return statusColors[status?.toLowerCase()] || 'bg-gray-100 text-gray-800';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <Card className="w-full">
        <CardContent className="p-6">
          <div className="text-red-500 text-center flex flex-col items-center gap-4">
            <span>{error}</span>
            <Button onClick={fetchEnrollmentRequests} variant="outline">
              <RotateCw className="h-4 w-4 mr-2" />
              Retry
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Handle case where enrollmentRequests is empty
  if (!enrollmentRequests.length) {
    return (
      <Card className="w-full">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100">
          <CardTitle className="text-2xl text-blue-900">Booking Enrollment Requests</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="text-center text-gray-500">No enrollment requests found.</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100">
        <CardTitle className="text-2xl text-blue-900">Booking Enrollment Requests</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
      <div className="rounded-lg border shadow-sm overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead className="font-semibold">First Name</TableHead>
                <TableHead className="font-semibold">Last Name</TableHead>
                <TableHead className="font-semibold">Middle Name</TableHead>
                <TableHead className="font-semibold">Course Selected</TableHead>
                <TableHead className="font-semibold">Course Price</TableHead>
                <TableHead className="font-semibold">Email</TableHead>
                <TableHead className="font-semibold">Contact</TableHead>
                <TableHead className="font-semibold">Booking Date</TableHead>
                <TableHead className="font-semibold">Booking Time</TableHead>
                <TableHead className="font-semibold">Status</TableHead>
                <TableHead className="font-semibold">Actions</TableHead>
                <TableHead className="font-semibold">Update Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {enrollmentRequests.map((request) => (
                <TableRow key={request?.id || Math.random()} className="hover:bg-gray-50 transition-colors">
                  <TableCell>{request?.firstname || 'N/A'}</TableCell>
                  <TableCell>{request?.lastname || 'N/A'}</TableCell>
                  <TableCell>{request?.middlename || 'N/A'}</TableCell>
                  <TableCell>
                    <span className="font-medium">
                      {request?.course?.title || 'N/A'}
                    </span>
                  </TableCell>
                  <TableCell>₱{request?.amount?.toLocaleString() || 'N/A'}</TableCell>
                  <TableCell>{request?.email || 'N/A'}</TableCell>
                  <TableCell>{request?.cellphone || 'N/A'}</TableCell>
                  <TableCell>{request?.date_booked}</TableCell>
                  <TableCell>{formatTime(request?.time_booked)}</TableCell>
                  <TableCell>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(request?.status)}`}>
                      {request?.status || 'Unknown'}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleViewFiles(request)}
                      className="hover:bg-blue-50"
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      View Files
                    </Button>
                  </TableCell>


                  <TableCell>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleApproveEnrollment(request.id)}
                  className="hover:bg-blue-50"
                >
                  <Check className="h-4 w-4 mr-2" />
                  Approve
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleRejectEnrollment(request.id)}
                  className="hover:bg-blue-50"
                >
                  <X className="h-4 w-4 mr-2" />
                  Reject
                </Button>
              </div>
            </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Files Dialog */}
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="max-w-4xl">
            <DialogHeader className="border-b pb-4">
              <DialogTitle className="text-xl">
                Student Documents - {selectedItem?.firstname || 'N/A'} {selectedItem?.lastname || ''}
              </DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
              {selectedItem && (
                <>
                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg text-blue-900">Payment Image Proof</h3>
                    <div className="border rounded-lg p-2 shadow-sm hover:shadow-md transition-shadow">
                      <div className="relative group">
                        <img
                          src={selectedItem.proof_image ? `${API_BASE_URL}/storage/${selectedItem.proof_image}` : "/placeholder-profile.png"}
                          alt="Payment Proof"
                          className="w-full h-auto object-contain cursor-pointer"
                          onClick={() => setIsImageModalOpen(true)}
                          onError={(e) => {
                            e.target.src = "/placeholder-profile.png";
                            e.target.onerror = null;
                          }}
                        />
                      </div>
                    </div>
                    <p className="text-sm text-gray-500">
                      Submitted on: {formatDateTime(selectedItem.created_at)}
                    </p>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg text-blue-900">Documents</h3>
                    <div className="border rounded-lg p-4 space-y-4 shadow-sm">
                      {selectedItem.document_path ? (
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <FileText className="h-5 w-5 text-blue-500" />
                            <span className="font-medium">PSA Birth Certificate</span>
                          </div>
                          <div className="flex space-x-2">
                            {isImageFile(selectedItem.document_path) && (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => window.open(`${API_BASE_URL}/storage/${selectedItem.document_path}`, '_blank')}
                                className="hover:bg-blue-50"
                              >
                                <Eye className="h-4 w-4 mr-2" />
                                View
                              </Button>
                            )}
                            <Button
                              variant="outline"
                              size="sm"
                              asChild
                              className="hover:bg-blue-50"
                            >
                              <a href={`${API_BASE_URL}/storage/${selectedItem.document_path}`} download>
                                <Download className="h-4 w-4 mr-2" />
                                Download
                              </a>
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <div className="text-gray-500 text-center">No documents available</div>
                      )}
                    </div>
                  </div>
                </>
              )}
            </div>
          </DialogContent>
        </Dialog>

        {/* Enhanced Full Image Modal */}
        <Dialog open={isImageModalOpen} onOpenChange={setIsImageModalOpen}>
          <DialogContent className="max-w-[95vw] max-h-[95vh] overflow-hidden flex justify-center items-center">
            {selectedItem?.proof_image && (
              <img
                src={`${API_BASE_URL}/storage/${selectedItem.proof_image}`}
                alt="Payment Proof Full"
                className="transform object-contain"
                style={{
                  transform: `scale(${imageScale}) rotate(${rotation}deg)`,
                  maxWidth: '100%',
                  maxHeight: '100%',
                }}
              />
            )}
            <div className="absolute top-2 right-2 flex space-x-2">
              <Button onClick={handleZoomIn} variant="ghost" className="hover:bg-blue-50">
                <ZoomIn className="w-4 h-4" />
              </Button>
              <Button onClick={handleZoomOut} variant="ghost" className="hover:bg-blue-50">
                <ZoomOut className="w-4 h-4" />
              </Button>
              <Button onClick={handleRotate} variant="ghost" className="hover:bg-blue-50">
                <RotateCw className="w-4 h-4" />
              </Button>
              <Button onClick={() => setIsImageModalOpen(false)} variant="ghost" className="hover:bg-blue-50">
                <X className="w-4 h-4" />
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default BookingEnrollment;