import React, { useState, useEffect } from 'react';
import { getAllCourses, updateCourse, deleteCourse } from '@/lib/services/AdmnServices/AdminServices';
import { Card, CardContent } from '@/components/ui/card';
import { Clock, CalendarDays, Loader2, Pencil, Trash2, CheckCircle2, AlertCircle } from 'lucide-react';
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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import CreateCourse from '@/components/modal/CreateCourse';
const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [editingCourse, setEditingCourse] = useState(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [courseToDelete, setCourseToDelete] = useState(null);
  const [alert, setAlert] = useState(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  useEffect(() => {
    fetchCourses();
  }, []);

  useEffect(() => {
    if (alert) {
      const timer = setTimeout(() => {
        setAlert(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [alert]);

  const fetchCourses = async () => {
    try {
      const response = await getAllCourses();
      if (response.courses && Array.isArray(response.courses)) {
        setCourses(response.courses);
      } else {
        console.error('Unexpected data structure:', response);
        setError('Invalid data format received');
      }
      setLoading(false);
    } catch (err) {
      console.error('Error fetching courses:', err);
      setError('Failed to fetch courses');
      setLoading(false);
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await updateCourse(editingCourse.id, editingCourse);
      await fetchCourses();
      setEditingCourse(null);
      setIsEditDialogOpen(false); // Close the edit dialog
      setAlert({
        type: 'success',
        title: 'Success',
        message: 'Course updated successfully'
      });
    } catch (error) {
      setAlert({
        type: 'error',
        title: 'Error',
        message: 'Failed to update course'
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteConfirm = async () => {
    setSubmitting(true);
    try {
      await deleteCourse(courseToDelete.id);
      await fetchCourses();
      setIsDeleteDialogOpen(false);
      setCourseToDelete(null);
      setAlert({
        type: 'success',
        title: 'Success',
        message: 'Course deleted successfully'
      });
    } catch (error) {
      setAlert({
        type: 'error',
        title: 'Error',
        message: 'Failed to delete course'
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-500 text-lg">{error}</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      {alert && (
        <div className="fixed top-4 right-4 z-[100] w-96">
          <Alert variant={alert.type === 'success' ? 'default' : 'destructive'} className='bg-emerald-500'>
            {alert.type === 'success' ? (
              <CheckCircle2 className="h-4 w-4 text-white font-semibold" />
            ) : (
              <AlertCircle className="h-4 w-4 text-red-400 font-semibold" />
            )}
            <AlertTitle className='text-white font-semibold'>{alert.title}</AlertTitle>
            <AlertDescription className='text-white font-semibold'>{alert.message}</AlertDescription>
          </Alert>
        </div>
      )}

      <h1 className="text-3xl font-bold mb-8 text-center">Manage Courses</h1>
      <div className='flex items-center justify-end'>
        <CreateCourse />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <Card key={course.id} className="hover:shadow-lg transition-all duration-300 group">
            <CardContent className="p-6">
               <h1 className='text-2xl font-bold mb-3 text-gray-800'>Course: {course.category}</h1>
              <h2 className="text-xl font-bold mb-3 text-gray-800">{course.title}</h2>
              <p className="text-gray-600 mb-6 line-clamp-3">{course.description}</p>
              
              <div className="space-y-3 mb-6">
                <div className="flex items-center text-gray-600">
                  <Clock size={18} className="mr-2 text-blue-500" />
                  <span>{course.duration}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <CalendarDays size={18} className="mr-2 text-blue-500" />
                  <span>{course.session} sessions</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="text-2xl font-bold text-slate-500">₱ {course.price}</div>
                <div className="space-x-2">

                  {/* Edit Modal */}
                  <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setEditingCourse({ ...course });
                          setIsEditDialogOpen(true);
                        }}
                      >
                        <Pencil size={16} className="mr-2" />
                        Edit
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Edit Course</DialogTitle>
                      </DialogHeader>
                      <form onSubmit={handleEditSubmit}>
                        <div className="space-y-4 py-4">
                          <label>Title</label>
                          <Input
                            value={editingCourse?.title || ''}
                            onChange={(e) => setEditingCourse({ ...editingCourse, title: e.target.value })}
                          />
                          <label>Description</label>
                          <Textarea
                            value={editingCourse?.description || ''}
                            onChange={(e) => setEditingCourse({ ...editingCourse, description: e.target.value })}
                          />
                          <label>Duration</label>
                          <Input
                            value={editingCourse?.duration || ''}
                            onChange={(e) => setEditingCourse({ ...editingCourse, duration: e.target.value })}
                          />
                          <label>Sessions</label>
                          <Input
                            type="number"
                            value={editingCourse?.session || ''}
                            onChange={(e) => setEditingCourse({ ...editingCourse, session: e.target.value })}
                          />
                          <label>Price</label>
                          <Input
                            type="number"
                            value={editingCourse?.price || ''}
                            onChange={(e) => setEditingCourse({ ...editingCourse, price: e.target.value })}
                          />
                        </div>
                        <DialogFooter>
                          <Button type="button" variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                            Cancel
                          </Button>
                          <Button type="submit" disabled={submitting}>
                            {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Save Changes'}
                          </Button>
                        </DialogFooter>
                      </form>
                    </DialogContent>
                  </Dialog>

                  {/* Delete Modal */}
                  <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                    <DialogTrigger asChild>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => {
                          setCourseToDelete(course);
                          setIsDeleteDialogOpen(true);
                        }}
                      >
                        <Trash2 size={16} className="mr-2" />
                        Delete
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]" >
                      <DialogHeader>
                        <DialogTitle>Delete Course</DialogTitle>
                      </DialogHeader>
                      <div className="py-4">
                        <p>Are you sure you want to delete "{courseToDelete?.title}"? This action cannot be undone.</p>
                      </div>
                      <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
                          Cancel
                        </Button>
                        <Button
                          variant="destructive"
                          onClick={handleDeleteConfirm}
                          disabled={submitting}
                        >
                          {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Delete'}
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {courses.length === 0 && !loading && !error && (
        <div className="text-center text-gray-500 mt-8">
          No courses available at the moment.
        </div>
      )}
    </div>
  );
};

export default Courses;