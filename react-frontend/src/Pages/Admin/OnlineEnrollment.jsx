import React, { useEffect, useState } from 'react';
import { getOnlineEnrollmentRequest, generateUserCredentials } from '@/lib/services/AdmnServices/AdminServices';
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
import { Eye, FileText, Download, X, ZoomIn, ZoomOut, RotateCw, CheckCircle  } from "lucide-react";
import Swal from 'sweetalert2';

const OnlineEnrollment = () => {
  const [enrollmentRequests, setEnrollmentRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [imageScale, setImageScale] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [approvingId, setApprovingId] = useState(null);


  const handleApprove = async (request) => {
    // First show confirmation dialog
    const result = await Swal.fire({
      title: 'Confirm Approval',
      html: `Are you sure you want to approve the enrollment request for:<br>
            <b>${request.firstname} ${request.lastname}</b>?<br>
            This will generate and send login credentials to their email.`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, approve it!',
      cancelButtonText: 'Cancel'
    });

    if (result.isConfirmed) {
      try {
        // Show loading state
        setApprovingId(request.id);
        Swal.fire({
          title: 'Processing',
          html: 'Generating credentials and sending email...',
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
          }
        });

        // Call the API
        const response = await generateUserCredentials(request.id);

        // Update the local state
        setEnrollmentRequests(prevRequests =>
          prevRequests.map(item =>
            item.id === request.id
              ? { ...item, status: 'approved' }
              : item
          )
        );

        // Show success message
        await Swal.fire({
          icon: 'success',
          title: 'Approved!',
          html: `Credentials have been generated and sent to:<br><b>${request.email}</b>`,
          confirmButtonColor: '#3085d6'
        });

      } catch (error) {
        // Show error message
        await Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to generate credentials. Please try again.',
          confirmButtonColor: '#3085d6'
        });
      } finally {
        setApprovingId(null);
      }
    }
  };


  const renderActionButtons = (request) => {
    if (request.status.toLowerCase() === 'pending') {
      return (
        <div className="flex space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleViewFiles(request)}
            className="hover:bg-blue-50"
          >
            <Eye className="h-4 w-4 mr-2" />
            View Files
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleApprove(request)}
            disabled={approvingId === request.id}
            className="hover:bg-green-50 text-green-600 border-green-200"
          >
            <CheckCircle className="h-4 w-4 mr-2" />
            {approvingId === request.id ? (
              <>
                <span className="animate-spin mr-2">⏳</span>
                Approving...
              </>
            ) : (
              'Approve'
            )}
          </Button>
        </div>
      );
    }
    return (
      <Button
        variant="ghost"
        size="sm"
        onClick={() => handleViewFiles(request)}
        className="hover:bg-blue-50"
      >
        <Eye className="h-4 w-4 mr-2" />
        View Files
      </Button>
    );
  };





  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    fetchEnrollmentRequests();
  }, []);

  // Reset image transformations when modal closes
  useEffect(() => {
    if (!isImageModalOpen) {
      setImageScale(1);
      setRotation(0);
    }
  }, [isImageModalOpen]);

  const fetchEnrollmentRequests = async () => {
    try {
      const response = await getOnlineEnrollmentRequest();
      setEnrollmentRequests(response.enrollmentRequest);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch enrollment requests');
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
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    };
    return new Date(dateString).toLocaleString('en-US', options);
  };

  const getFileExtension = (filename) => filename.split('.').pop().toLowerCase();

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
    return statusColors[status.toLowerCase()] || 'bg-gray-100 text-gray-800';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  return (
    <Card className="w-full">
      <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100">
        <CardTitle className="text-2xl text-blue-900">Online Enrollment Requests</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="rounded-lg border shadow-sm overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead className="font-semibold">First Name</TableHead>
                <TableHead className="font-semibold">Last Name</TableHead>
                <TableHead className="font-semibold">Middle Name</TableHead>
                <TableHead className="font-semibold">Email</TableHead>
                <TableHead className="font-semibold">Contact</TableHead>
                <TableHead className="font-semibold">Course Selected</TableHead>
                <TableHead className="font-semibold">Course Price</TableHead>
                <TableHead className="font-semibold">Date Submitted</TableHead>
                <TableHead className="font-semibold">Status</TableHead>
                <TableHead className="font-semibold">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {enrollmentRequests.map((request) => (
                <TableRow key={request.id} className="hover:bg-gray-50 transition-colors">
                  <TableCell >{request.firstname} </TableCell>
                  <TableCell >{request.lastname} </TableCell>
                  <TableCell >{request.middlename} </TableCell>
                  <TableCell>{request.email}</TableCell>
                  <TableCell>{request.cellphone}</TableCell>
                  <TableCell>
                    <span className="font-medium">
                    {request?.course?.category || 'N/A'} - {request?.course?.title || 'N/A'}
                    </span>
                  </TableCell>
                  <TableCell>₱{request?.amount?.toLocaleString() || 'N/A'}</TableCell>
                  <TableCell>{formatDateTime(request.created_at)}</TableCell>
                  <TableCell>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}>
                      {request.status}
                    </span>
                  </TableCell>
                  <TableCell>
                  {renderActionButtons(request)}
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
                Student Documents - {selectedItem?.firstname} {selectedItem?.lastname}
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
                          src={`${API_BASE_URL}/storage/${selectedItem.proof_image}`}
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
                      {selectedItem.document_path && (
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
            <img
              src={`${API_BASE_URL}/storage/${selectedItem?.proof_image}`}
              alt="Payment Proof Full"
              className="transform object-contain"
              style={{
                transform: `scale(${imageScale}) rotate(${rotation}deg)`,
                maxWidth: '100%',
                maxHeight: '100%',
              }}
            />
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

export default OnlineEnrollment;
