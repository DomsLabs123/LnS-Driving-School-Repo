import React, { useState } from 'react';
import { createCourse } from '@/lib/services/AdmnServices/AdminServices';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { PlusCircle, CheckCircle2, AlertCircle } from 'lucide-react';

const CreateCourse = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [alert, setAlert] = useState(null);
  const [loading, setLoading] = useState(false);
  const [courseData, setCourseData] = useState({
    category: '',
    title: '',
    description: '',
    duration: '',
    session: '',
    price: ''
  });

  // Auto-hide alert after 3 seconds
  React.useEffect(() => {
    if (alert) {
      const timer = setTimeout(() => {
        setAlert(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [alert]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCourseData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCategoryChange = (value) => {
    setCourseData(prev => ({
      ...prev,
      category: value
    }));
  };
  
  const resetForm = () => {
    setCourseData({
      category: '',
      title: '',
      description: '',
      duration: '',
      session: '',
      price: ''
    });
    setIsOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await createCourse(courseData);
      setAlert({
        type: 'success',
        title: 'Success',
        message: 'Course created successfully'
      });
      resetForm();
      window.location.reload();
    } catch (error) {
      setAlert({
        type: 'error',
        title: 'Error',
        message: 'Failed to create course'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Alert Notification */}
      {alert && (
        <div className="fixed top-4 right-4 z-50 w-96">
          <Alert variant={alert.type === 'success' ? 'default' : 'destructive'}>
            {alert.type === 'success' ? (
              <CheckCircle2 className="h-4 w-4" />
            ) : (
              <AlertCircle className="h-4 w-4" />
            )}
            <AlertTitle>{alert.title}</AlertTitle>
            <AlertDescription>{alert.message}</AlertDescription>
          </Alert>
        </div>
      )}

      {/* Create Course Dialog */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button className="mb-6">
            <PlusCircle className="mr-2 h-4 w-4" />
            Create New Course
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Course</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4 py-4">
            <div className="space-y-2">
                <label className="text-sm font-medium">Category</label>
                <Select 
                  value={courseData.category} 
                  onValueChange={handleCategoryChange}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Course Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="TDC">TDC</SelectItem>
                    <SelectItem value="PDC">PDC</SelectItem>
                    <SelectItem value="MDC">MDC</SelectItem>
                    <SelectItem value="Refresher">Refresher</SelectItem>
                  </SelectContent>
                </Select>
              </div>





              <div className="space-y-2">
                <label className="text-sm font-medium">Title</label>
                <Input
                  name="title"
                  value={courseData.title}
                  onChange={handleInputChange}
                  placeholder="Enter course title"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Description</label>
                <Textarea
                  name="description"
                  value={courseData.description}
                  onChange={handleInputChange}
                  placeholder="Enter course description"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Duration</label>
                <Input
                  name="duration"
                  value={courseData.duration}
                  onChange={handleInputChange}
                  placeholder="e.g., 8 weeks"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Number of Sessions</label>
                <Input
                  name="session"
                  type="number"
                  value={courseData.session}
                  onChange={handleInputChange}
                  placeholder="Enter number of sessions"
                  min="1"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Price</label>
                <Input
                  name="price"
                  type="number"
                  value={courseData.price}
                  onChange={handleInputChange}
                  placeholder="Enter price"
                  min="0"
                  step="0.01"
                  required
                />
              </div>
            </div>

            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="outline" onClick={resetForm}>
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit" disabled={loading}>
                {loading ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Creating...
                  </>
                ) : (
                  'Create Course'
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateCourse;