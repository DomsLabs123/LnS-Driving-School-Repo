import React, { createContext, useContext, useState, useEffect,useRef } from 'react';
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import Logo from '@/assets/logo.png';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {Select,SelectContent,SelectItem,SelectTrigger,SelectValue,} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ArrowRight, ArrowLeft,  CheckCircle2, Upload, AlertCircle, Loader2, FormInput,Calendar as CalendarIcon,Sun,SunDim, Clock } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import PaymentQRCode from '@/assets/qrcode.png'
import {submitBookingEnrollment} from '@/lib/services/BookingEnrollmentServices/BookingEnrollment'
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { format,parse } from "date-fns";
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
// PDF Style
const styles = StyleSheet.create({
  page: {
    padding: 30,
  },
  header: {
    marginTop: 20,
    marginBottom: 20,
    textAlign: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 20,
    color: '#666',
    marginBottom: 20,
  },
  section: {
    marginBottom: 15,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  label: {
    marginBottom:10,
    fontSize: 10,
    color: '#666',
  },
  value: {
    marginBottom:10,
    fontSize: 12,
    marginTop: 2,
  },
  paymentProof: {
    marginTop: 20,
    maxWidth: 600,
    alignSelf: 'center',
  }
});
  
  // PDF Document Component
  const EnrollmentPDF = ({ formData, paymentData }) => (
    <Document>
      <Page size="letter" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.title}>L & S Driving School</Text>
          <Text style={styles.subtitle}>Enrollment Receipt</Text>
        </View>
  
        <View style={styles.section}>
          <View style={styles.row}>
            <View>
              <Text style={styles.label}>Student Name</Text>
              <Text style={styles.value}>
                {`${formData.firstName} ${formData.middleName} ${formData.familyName}`}
              </Text>
            </View>
            <View>
              <Text style={styles.label}>Date Created</Text>
              <Text style={styles.value}>{new Date().toLocaleDateString()}</Text>
            </View>
          </View>
  
          <View style={styles.row}>
            <View>
              <Text style={styles.label}>Selected Course</Text>
              <Text style={styles.value}>{formData.selectedCourseDetails.category}-{formData.selectedCourseDetails?.title}</Text>
            </View>
            <View>
              <Text style={styles.label}>Course Price</Text>
              <Text style={styles.value}>
                {formData.selectedCourseDetails?.price?.toLocaleString()}
              </Text>
            </View>
          </View>


          <View style={styles.row}>
          <View>
            <Text style={styles.label}>Course Field</Text>
            <Text style={styles.value}>Physical Exam & Lecture</Text>
          </View>
          </View>
        </View>
  
        {paymentData.paymentProofUrl && (
          <View style={styles.section}>
            <Text style={styles.label}>Payment Proof</Text>
            <Image
              src={paymentData.paymentProofUrl}
              style={styles.paymentProof}
            />
          </View>
        )}
      </Page>
    </Document>
  );
  

// Context for managing enrollment data across steps
const EnrollmentContext = createContext();

// Main wrapper component
export default function EnrollmentProcess() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});
  const [paymentData, setPaymentData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [showAgeAlert, setShowAgeAlert] = useState(false);
  const nextStep = () => step < 4 && !showAgeAlert ? setStep(step + 1) : null;
  const prevStep = () => setStep(step - 1);
  return (
    <EnrollmentContext.Provider value={{ formData, setFormData, paymentData, setPaymentData, nextStep, prevStep,isSubmitting,setIsSubmitting,submitSuccess,setSubmitSuccess,showAgeAlert,setShowAgeAlert
    }}>
      <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Progress Indicator */}
          <div className="mb-8">
            <div className="flex justify-between items-center">
              {['Enrollment Form','Schedule', 'Payment', 'Confirmation'].map((label, index) => (
                <div key={label} className="flex flex-col items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    step > index + 1 ? 'bg-green-500' : 
                    step === index + 1 ? 'bg-primary' : 'bg-gray-300'
                  } text-white mb-2`}>
                    {step > index + 1 ? <CheckCircle2 className="w-5 h-5" /> : index + 1}
                  </div>
                  <span className={`text-sm ${step === index + 1 ? 'text-primary font-medium' : 'text-gray-500'}`}>
                    {label}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-4 h-2 bg-gray-200 rounded-full">
              <div 
                className="h-full bg-primary rounded-full transition-all duration-500"
                style={{ width: `${((step - 1) / 3) * 100}%` }}
              />
            </div>
          </div>

          {step === 1 && <EnrollmentForm />}
          {step === 2 && <SchedulingForm />}
          {step === 3 && <PaymentForm />}
          {step === 4 && <ConfirmationPage />}
        </div>
      </div>
    </EnrollmentContext.Provider>
  );
}

import { MDCCourse } from '@/lib/services/Courses';
import { Validator } from '@/lib/services/BookingEnrollmentServices/BookingEnrollment';
// Step 1: Enrollment Form (Your existing form component modified to use context)
function EnrollmentForm() {
  const { formData, setFormData, nextStep,   showAgeAlert, setShowAgeAlert } = useContext(EnrollmentContext);
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCourseDetails, setSelectedCourseDetails] = useState(null);
  const [error, setError] = useState(null);
  const [validationErrors, setValidationErrors] = useState([]);

  useEffect(() => {
    if (Number(formData.age) >= 18) {
      setShowAgeAlert(false);
    }
  }, [formData.age, setShowAgeAlert]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setValidationErrors([]);
    const formData = new FormData();
    const documentFile = e.target.elements.document_path.files[0];
    formData.append('enrollment[document_path]', documentFile);

    const formElements = e.target.elements;
    const data = {
      id: formData.id,
      firstName: formElements.firstName.value,
      familyName: formElements.familyName.value,
      middleName: formElements.middleName.value,
      address: formElements.address.value,
      cellphone: formElements.cellphone.value,
      email: formElements.email.value,
      document_path: formElements.document_path.files[0],
      business_name: formElements.business_name.value,
      business_email: formElements.business_email.value,
      citizenship: formElements.citizenship.value,
      gender: formElements.gender.value,
      civilStatus: formElements.civilStatus.value,
      age: formElements.age.value,
      hairColor: formElements.hairColor.value,
      bodyBuild: formElements.bodyBuild.value,
      skinColor: formElements.skinColor.value,
      birthday: formElements.birthday.value,
      height: formElements.height.value,
      weight: formElements.weight.value,
      educationAttainment: formElements.educationAttainment.value,
      schoolName: formElements.schoolName.value,
      schoolAddress: formElements.schoolAddress.value,
      spouseName: formElements.spouseName.value,
      fatherName: formElements.fatherName.value,
      motherName: formElements.motherName.value,
      employerName: formElements.employerName.value,
      employerTel: formElements.employerTel.value,
      employerAddress: formElements.employerAddress.value,
      courseEnrolled: selectedCourse,
      selectedCourseDetails: selectedCourseDetails
    };

    if (Number(data.age) < 18) {  
      setShowAgeAlert(true);
      return;
    }
    setShowAgeAlert(false);
    try{
        const validationResult = await Validator(data);
        if (validationResult.valid) {
            // If validation passes, update form data and proceed to next step
            setFormData(data);
            nextStep();
        }
      } catch (error) {
        // Handle validation errors
        console.error('Validation Error:', error);
        if (error.response && error.response.data.errors) {
            // Collect error messages
         
            const errors = error.response.data.errors;
            const errorMessages = Object.values(errors).flat();
            
            // Set validation errors to display in an alert
            setValidationErrors(errorMessages);
        } else {
            // Generic error handling
            setValidationErrors(['An error occurred during validation']);
        }
    }

  };

  useEffect(() => {
    const fetchCourses = async () => {
      setIsLoading(true);
      try {
        const response = await MDCCourse();
        if (response.courses && Array.isArray(response.courses)) {
          setCourses(response.courses);
        } else {
          setError('Failed to load courses data');
        }
      } catch (error) {
        setError('Failed to fetch courses: ' + error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const handleCourseSelect = (courseId) => {
    setSelectedCourse(courseId);
    // Find the course details from the courses array
    const courseDetails = courses.find(course => course.id === courseId);
    if (courseDetails) {
      setSelectedCourseDetails(courseDetails);
      // Update the form data immediately when course is selected
      setFormData(prev => ({
        ...prev,
        courseEnrolled: courseId,
        selectedCourseDetails: courseDetails  // Include the full course details
      }));
    }
  };
  return (
    <Card className="shadow-lg">
      <CardHeader className="space-y-4 text-center border-b pb-6">
        <div className="flex items-center justify-center space-x-3">
          <div className="bg-primary/10 p-2 rounded-lg">
            <img src={Logo} alt="Logo" className="w-12 h-12" />
          </div>
          <h2 className="text-2xl font-bold text-primary">L & S Driving School</h2>
        </div>
        <h1 className="text-3xl font-semibold text-gray-900">Booking Enrollment Form</h1>
      </CardHeader>

      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-6">
                <div className="flex items-center">
                  <h3 className="text-lg font-medium text-gray-900 border-b-2 border-primary/50 pb-1">Personal Information</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">First Name</Label>
                    <Input className="w-full" name='firstName' placeholder="Enter first name"  value={formData.firstName || ''} onChange={e => setFormData({ ...formData, firstName: e.target.value })} required />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Family Name</Label>
                    <Input className="w-full" name='familyName' placeholder="Enter family name" value={formData.familyName || ''} onChange={e => setFormData({ ...formData, familyName: e.target.value })} required />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Middle Name</Label>
                    <Input className="w-full" name="middleName" placeholder="Enter middle name" value={formData.middleName || ''} onChange={e => setFormData({ ...formData, middleName: e.target.value })} required  />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Present Home Address</Label>
                    <Input className="w-full" name='address' placeholder="Street, Barangay, City, Province" value={formData.address || ''} onChange={e => setFormData({ ...formData, address: e.target.value })}  />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Contact Number</Label>
                    <Input className="w-full" type='text' name='cellphone' placeholder="Enter contact number" value={formData.cellphone || ''} onChange={e => setFormData({ ...formData, cellphone: e.target.value })} />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Email Address</Label>
                    <Input className="w-full" type='email' name='email' placeholder="Enter email address"  value={formData.email || ''} onChange={e => setFormData({ ...formData, email: e.target.value })} required />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium">PSA {'(Birth Certificate SoftCopy)'}</Label>
                    <Input className="w-full" type='file' name='document_path' multiple accept='.pdf,.doc,.docx,.txt,.png,.jpg' placeholder="Enter email address" required />
                  </div>
                </div>
              </div>

                {/* Business Information */}
                <div className="space-y-6">
                <div className="flex items-center">
                  <h3 className="text-lg font-medium text-gray-900 border-b-2 border-primary/50 pb-1">Business Information</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Business Name</Label>
                    <Input className="w-full" name='business_name' placeholder="Enter business details" value={formData.business_name || ''} onChange={e => setFormData({ ...formData, business_name: e.target.value })} />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Email Address</Label>
                    <Input className="w-full" type="email" name='business_email' placeholder="Enter email address" value={formData.business_email || ''} onChange={e => setFormData({ ...formData, business_email: e.target.value })} />
                  </div>
                </div>
              </div>

               {/* Demographics */}
               <div className="space-y-6">
                <div className="flex items-center">
                  <h3 className="text-lg font-medium text-gray-900 border-b-2 border-primary/50 pb-1">Demographics</h3>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Citizenship</Label>
                    <Input className="w-full" name='citizenship' placeholder="Enter citizenship" value={formData.citizenship || ''} onChange={e => setFormData({ ...formData, citizenship: e.target.value })} />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Age</Label>
                    <Input className="w-full" type="number" name='age' placeholder="Age" value={formData.age || ''} onChange={e => setFormData({ ...formData, age: e.target.value })}  />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Gender</Label>
                    <Select
                      name='gender'
                      value={formData.gender || ""}
                      onValueChange={(value) => setFormData({ ...formData, gender: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Birthday</Label>
                    <Input className="w-full" name='birthday'  type="date" value={formData.birthday || ''} onChange={e => setFormData({ ...formData, birthday: e.target.value })} />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Height (cm)</Label>
                    <Input className="w-full" name='height' type="number" placeholder="Height" value={formData.height || ''} onChange={e => setFormData({ ...formData, height: e.target.value })} />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Weight (kg)</Label>
                    <Input className="w-full" name='weight' type="number" placeholder="Weight" value={formData.weight || ''} onChange={e => setFormData({ ...formData, weight: e.target.value })}  />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Civil Status */}
                    <div className="space-y-3">
                      <Label className="text-sm font-medium">Civil Status</Label>
                      <RadioGroup
                        defaultValue="single"
                        className="space-y-2"
                        name='civilStatus'
                        onValueChange={(value) => setFormData({ ...formData, civilStatus: value })}
                      >
                        {['Single', 'Married', 'Widower', 'Separated'].map((status) => (
                          <div key={status} className="flex items-center space-x-2">
                            <RadioGroupItem value={status.toLowerCase()} id={status} />
                            <Label htmlFor={status} className="text-sm">{status}</Label>
                          </div>
                        ))}
                      </RadioGroup>
                    </div>

                    {/* Hair Color */}
                    <div className="space-y-3">
                      <Label className="text-sm font-medium">Hair Color</Label>
                      <RadioGroup
                        defaultValue="black"
                        className="space-y-2"
                        name='hairColor'
                        onValueChange={(value) => setFormData({ ...formData, hairColor: value })}
                      >
                        {['Black', 'Gray', 'Brown', 'Blonde'].map((color) => (
                          <div key={color} className="flex items-center space-x-2">
                            <RadioGroupItem value={color.toLowerCase()} id={color} />
                            <Label htmlFor={color} className="text-sm">{color}</Label>
                          </div>
                        ))}
                      </RadioGroup>
                    </div>

                    {/* Body Build */}
                    <div className="space-y-3">
                      <Label className="text-sm font-medium">Body Build</Label>
                      <RadioGroup
                        defaultValue="medium"
                        className="space-y-2"
                         name='bodyBuild'
                        onValueChange={(value) => setFormData({ ...formData, bodyBuild: value })}
                      >
                        {['Light', 'Medium', 'Heavy'].map((build) => (
                          <div key={build} className="flex items-center space-x-2">
                            <RadioGroupItem value={build.toLowerCase()} id={build} />
                            <Label htmlFor={build} className="text-sm">{build}</Label>
                          </div>
                        ))}
                      </RadioGroup>
                    </div>

                    {/* Skin Color */}
                    <div className="space-y-3">
                      <Label className="text-sm font-medium">Skin Color</Label>
                      <RadioGroup
                        defaultValue="medium"
                        className="space-y-2"
                        name='skinColor'
                        onValueChange={(value) => setFormData({ ...formData, skinColor: value })}
                      >
                        {['Light', 'Medium', 'Dark'].map((color) => (
                          <div key={color} className="flex items-center space-x-2">
                            <RadioGroupItem value={color.toLowerCase()} id={color} />
                            <Label htmlFor={color} className="text-sm">{color}</Label>
                          </div>
                        ))}
                      </RadioGroup>
                    </div>
                  </div>
              </div>

              
              {/* Education */}
              <div className="space-y-6">
                <div className="flex items-center">
                  <h3 className="text-lg font-medium text-gray-900 border-b-2 border-primary/50 pb-1">Educational Background</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Highest Education</Label>
                    <Input className="w-full" name='educationAttainment' placeholder="Enter highest education" value={formData.educationAttainment || ''} onChange={e => setFormData({ ...formData, educationAttainment: e.target.value })} />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">School Name</Label>
                    <Input className="w-full" name='schoolName' placeholder="Enter school name" value={formData.schoolName || ''} onChange={e => setFormData({ ...formData, schoolName: e.target.value })} />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">School Address</Label>
                    <Input className="w-full" name='schoolAddress' placeholder="Enter school address" value={formData.schoolAddress || ''} onChange={e => setFormData({ ...formData, schoolAddress: e.target.value })} />
                  </div>
                </div>
              </div>

               {/* Family Information */}
               <div className="space-y-6">
                <div className="flex items-center">
                  <h3 className="text-lg font-medium text-gray-900 border-b-2 border-primary/50 pb-1">Family Information</h3>
                </div>

                <div className="space-y-4">
            
                    <div  className="space-y-2">
                      <Label className="text-sm font-medium">Spouse Name</Label>
                      <Input className="w-full" name='spouseName' placeholder="Enter Spouse's full name" value={formData.spouseName|| ''} onChange={e => setFormData({ ...formData, spouseName: e.target.value })}  />
                    </div>
            
                </div>
                <div className="space-y-4">
            
            <div className="space-y-2">
              <Label className="text-sm font-medium">Father Name</Label>
              <Input className="w-full" name='fatherName' placeholder="Enter Father's full name"  value={formData.fatherName || ''} onChange={e => setFormData({ ...formData, fatherName: e.target.value })}  />
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">Mother Name</Label>
              <Input className="w-full" name='motherName' placeholder="Enter Mother's full name" value={formData.motherName || ''} onChange={e => setFormData({ ...formData, motherName: e.target.value })} />
            </div>
                      
        </div>
              </div>

              {/* Employment */}
              <div className="space-y-6">
                <div className="flex items-center">
                  <h3 className="text-lg font-medium text-gray-900 border-b-2 border-primary/50 pb-1">Employment Information</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Employer Name</Label>
                    <Input className="w-full" name='employerName' placeholder="Enter employer name" value={formData.employerName || ''} onChange={e => setFormData({ ...formData, employerName: e.target.value })} />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Employer Contact</Label>
                    <Input className="w-full" name='employerTel' placeholder="Enter employer contact" value={formData.employerTel || ''} onChange={e => setFormData({ ...formData, employerTel: e.target.value })} />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Employer Address</Label>
                  <Input className="w-full" name='employerAddress' placeholder="Enter employer address" value={formData.employerAddress || ''} onChange={e => setFormData({ ...formData, employerAddress: e.target.value })} />
                </div>
              </div>

                {/* Course Selection */}
                <div className="space-y-6">
      <div className="flex items-center">
        <h3 className="text-lg font-medium text-gray-900 border-b-2 border-primary/50 pb-1">Course Selection</h3>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label className="text-sm font-medium">Select Course</Label>
          {isLoading ? (
            <div className="flex items-center space-x-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Loading Courses...</span>
            </div>
          ) : error ? (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          ) : (
            <>
              <Select 
                value={selectedCourse} // Add this
                onValueChange={handleCourseSelect}
              >
                <SelectTrigger className="w-full md:w-[300px]">
                  <SelectValue placeholder="Choose your course" />
                </SelectTrigger>
                <SelectContent>
                  {courses.map(course => (
                    <SelectItem key={course.id} value={course.id}>
                          {course.category} {course.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {selectedCourseDetails && (
                <div className="mt-4 p-4 bg-primary/5 rounded-lg space-y-2 border border-primary/10">
                  <h4 className="font-medium text-primary">Selected Course Details</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Course Title</p>
                      <p className="text-sm">{selectedCourseDetails.category} {selectedCourseDetails.title}</p>
                    </div>
                    {selectedCourseDetails.description && (
                      <div>
                        <p className="text-sm font-medium text-gray-500">Description</p>
                        <p className="text-sm">{selectedCourseDetails.description}</p>
                      </div>
                    )}
                    {selectedCourseDetails.duration && (
                      <div>
                        <p className="text-sm font-medium text-gray-500">Duration</p>
                        <p className="text-sm">{selectedCourseDetails.duration}</p>
                      </div>
                    )}
                    {selectedCourseDetails.price && (
                      <div>
                        <p className="text-sm font-medium text-gray-500">Price</p>
                        <p className="text-sm">₱{selectedCourseDetails.price.toLocaleString()}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
    {showAgeAlert && (
        <Alert variant="destructive" className="mt-6">
          <AlertTitle>Age Requirement Not Met</AlertTitle>
          <AlertDescription>
            You must be at least 18 years old to enroll in this driving school.
          </AlertDescription>
        </Alert>
      )}

           {/* Validation Error */}
           {validationErrors.length > 0 && (
            <Alert variant="destructive" className="mt-6">
                <AlertTitle>Failed To Proceed Pls Check the missing Fields</AlertTitle>
                <AlertDescription>
                <ul className="list-disc list-inside">
                    {validationErrors.map((error, index) => (
                    <li key={index}>{error}</li>
                    ))}
                </ul>
                </AlertDescription>
            </Alert>
            )}
          <div className="flex justify-between pt-6">
          <button
              type="button"
              className="px-6 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2"
              onClick={() => window.history.back()}
            >
              <ArrowLeft className="w-4 h-4" /> Get Back
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2"
            >
              Proceed to Scheduling <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          
        </form>
      </CardContent>
    </Card>
  );
}


function SchedulingForm() {
  const { formData, setFormData, nextStep, prevStep } = useContext(EnrollmentContext);
  const [date, setDate] = useState(formData.scheduledDate ? new Date(formData.scheduledDate) : null);
  const [selectedSession, setSelectedSession] = useState(formData.scheduledSession || null);


  const sessions = [
    {
      id: 'morning',
      name: 'Morning Session',
      time: '8:00 AM - 12:00 PM',
      icon: Sun,
      available: true
    },
    {
      id: 'afternoon',
      name: 'Afternoon Session',
      time: '1:00 PM - 5:00 PM',
      icon: SunDim,
      available: true
    }
  ];

  useEffect(() => {
    if (date) {
      sessions.forEach(session => {
        session.available = Math.random() > 0.3;
      });
    }
  }, [date]);
 

  const handleSubmit = (e) => {
    e.preventDefault();
    if (date && selectedSession) {
      const session = sessions.find(s => s.id === selectedSession);
      setFormData({
        ...formData,
        scheduledDate: format(date, 'yyyy-MM-dd'),
        scheduledTime: session.name
      });
      nextStep();
    }
  };

  return (
    <Card className="shadow-lg">
      <CardHeader className="space-y-4 text-center border-b pb-6">
        <div className="flex items-center justify-center space-x-3">
          <div className="bg-primary/10 p-2 rounded-lg">
            <CalendarIcon className="w-12 h-12 text-primary" />
          </div>
          <h2 className="text-2xl font-bold text-primary">Schedule Your Session</h2>
        </div>
        <p className="text-muted-foreground">Select your preferred date and time for the driving session</p>
      </CardHeader>

      {/*Date Selection */}
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Date Selection */}
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
                  disabled={(date) => date < new Date() || date < new Date().setHours(0, 0, 0, 0)}
                  className="rounded-md border"
                />
              </div>
            </div>

            {/* Time Selection */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5 text-primary" />
                <h3 className="font-medium">Select Session</h3>
              </div>
              <div className="border rounded-lg p-4 bg-card">
                {date ? (
                  <div className="space-y-3">
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
                          onClick={() => session.available && setSelectedSession(session.id)}
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
                      )}
                    )}
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    Please select a date first
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Selected Schedule Summary */}
           {/* Selected Schedule Summary */}
           {date && selectedSession && (
            <Alert className="bg-primary/5 border-primary/20">
              <CheckCircle2 className="h-4 w-4 text-primary" />
              <AlertTitle>Selected Schedule</AlertTitle>
              <AlertDescription>
                You have selected{" "}
                <span className="font-medium">
                  {format(date, 'EEEE, MMMM do, yyyy')}
                </span>{" "}
                for the{" "}
                <span className="font-medium">
                  {sessions.find(s => s.id === selectedSession)?.name}
                </span>
                {" "}({sessions.find(s => s.id === selectedSession)?.time})
              </AlertDescription>
            </Alert>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-6">
            <Button
              type="button"
              variant="outline"
              onClick={prevStep}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" /> Back
            </Button>
            <Button
              type="submit"
              disabled={!date || !selectedSession}
              className="flex items-center gap-2"
            >
              Proceed to Payment <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}


  // Step 3: Payment Form
function PaymentForm() {
    const { formData, paymentData, setPaymentData, nextStep, prevStep } = useContext(EnrollmentContext);
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
  
    useEffect(() => {
      if (formData?.selectedCourseDetails?.price) {
        setPaymentData(prev => ({
          ...prev,
          amount: formData.selectedCourseDetails.price
        }));
      }
    }, [formData?.selectedCourseDetails]);
  
    const handleFileChange = (e) => {
      const file = e.target.files[0];
      if (file) {
        setSelectedFile(file);
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreviewUrl(reader.result);
        };
        reader.readAsDataURL(file);
      }
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      const data = {
        paymentProof: selectedFile,
        paymentProofUrl: previewUrl,
        amount: formData?.selectedCourseDetails?.price || 0,
      };
      setPaymentData(data);
      nextStep();
    };
  
    return (
      <Card className="shadow-lg">
        <CardHeader className="space-y-4 text-center border-b pb-6">
          <h1 className="text-3xl font-semibold text-gray-900">Payment Details</h1>
          <p className="text-gray-500">Please scan the QR code and upload your payment proof</p>
        </CardHeader>
  
        <CardContent className="pt-6">
          <Alert className="mb-6 bg-yellow-50 border-yellow-200">
            <AlertDescription className="text-yellow-600 flex items-center gap-3 justify-center">
              <AlertCircle className="h-4 w-4 text-yellow-600" />
              Please note: If your payment is not confirmed within 24 hours, a full refund will be processed automatically to your account.
            </AlertDescription>
          </Alert>
  
          <div className="flex flex-col items-center mb-8">
            <div className="bg-white p-4 rounded-lg shadow-sm border mb-4">
              <img 
                src={PaymentQRCode}
                alt="Payment QR Code"
                className="w-48 h-48 object-contain"
              />
            </div>
            <p className="text-sm text-gray-600">Scan this QR code to proceed with payment</p>
          </div>
  
          <div className="mb-6">
            <h3 className="font-medium text-lg mb-2">Course Payment Details</h3>
            <div className="bg-primary/5 p-4 rounded-lg">
              <p className="text-sm font-medium">Selected Course: {formData?.selectedCourseDetails?.title || 'N/A'}</p>
              <p className="text-lg font-bold">Amount to Pay: ₱{formData?.selectedCourseDetails?.price?.toLocaleString() || '0'}</p>
            </div>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium">Amount</Label>
                <Input 
                  name="amount"
                  type="number"
                  value={formData?.selectedCourseDetails?.price || ''}
                  placeholder="Enter amount"
                  required
                  disabled
                />
              </div>
  
              <div className="space-y-2">
                <Label className="text-sm font-medium">Upload Payment Proof</Label>
                <div className="border-2 border-dashed border-gray-200 rounded-lg p-6 text-center">
                  <input
                    type="file"
                    id="payment-proof"
                    className="hidden"
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                  <label
                    htmlFor="payment-proof"
                    className="cursor-pointer flex flex-col items-center gap-2"
                  >
                    <Upload className="w-8 h-8 text-gray-400" />
                    <span className="text-sm text-gray-500">
                      Click to upload payment screenshot
                    </span>
                  </label>
                  {previewUrl && (
                    <div className="mt-4">
                      <img
                        src={previewUrl}
                        alt="Payment proof preview"
                        className="max-w-xs mx-auto rounded-lg"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
  
            <div className="flex justify-between pt-6">
              <button
                type="button"
                className="px-6 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2"
                onClick={prevStep}
              >
                <ArrowLeft className="w-4 h-4" /> Back to Form
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2"
                disabled={!selectedFile}
              >
                Confirm Payment <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        </CardContent>
      </Card>
    );
  }

  // Step 3: Confirmation Page
function ConfirmationPage() {
  const navigate = useNavigate();
    const {   
      formData, 
      paymentData,
      isSubmitting,
      setIsSubmitting,
      submitSuccess,
      setSubmitSuccess
    } = useContext(EnrollmentContext);
  
    const [error, setError] = React.useState(null);


    const showSuccessAlert = () => {
      Swal.fire({
        title: 'Enrollment Submitted Successfully!',
        text: 'Thank you for enrolling with L & S Driving School, We will Send Email after we review your submission',
        icon: 'success',
        confirmButtonText: 'Confirm',
        confirmButtonColor: '#3085d6',
        allowOutsideClick: false,
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/'); // Replace with your homepage route
        }
      });
    };
  
    const handleSubmit = async () => {
      try {
        setIsSubmitting(true);
        setError(null);
  
        // Format the data according to the API requirements
        const enrollmentData = {
          firstName: formData.firstName,
          middleName: formData.middleName,
          familyName: formData.familyName,
          address: formData.address,
          cellphone: formData.cellphone,
          email: formData.email,
          document_path: formData.document_path,
          business_name: formData.business_name,
          business_email: formData.business_email,
          citizenship: formData.citizenship,
          gender: formData.gender,
          civilStatus: formData.civilStatus,
          age: formData.age,
          hairColor: formData.hairColor,
          bodyBuild: formData.bodyBuild,
          skinColor: formData.skinColor,
          birthday: formData.birthday,
          height: formData.height,
          weight: formData.weight,
          educationAttainment: formData.educationAttainment,
          schoolName: formData.schoolName,
          schoolAddress: formData.schoolAddress,
          spouseName: formData.spouseName,
          fatherName: formData.fatherName,
          motherName: formData.motherName,
          employerName: formData.employerName,
          employerTel: formData.employerTel,
          employerAddress: formData.employerAddress,
          courseEnrolled: formData.courseEnrolled,
          scheduledDate: format(new Date(formData.scheduledDate), 'yyyy-MM-dd'),
          scheduledTime: formData.scheduledTime
        };
  
        const paymentDetails = {
          amount: paymentData.amount,
          paymentProof: paymentData.paymentProof,
  
        };
  
        // Submit data using the API service
        await submitBookingEnrollment(enrollmentData, paymentDetails);
        setSubmitSuccess(true);
        showSuccessAlert();
      } catch (error) {
        console.error('Submission error:', error);
        // Show error alert
        Swal.fire({
          title: 'Submission Failed',
          text: error.message || 'Failed to submit enrollment. Please try again.',
          icon: 'error',
          confirmButtonText: 'OK',
          confirmButtonColor: '#d33'
        });
        setError(error.message || 'Failed to submit enrollment. Please try again.');
      } finally {
        setIsSubmitting(false);
      }
    };
  
    return (
      <Card className="shadow-lg">
      <CardHeader className="space-y-4 text-center border-b pb-6">
        <div className="flex justify-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircle2 className="w-8 h-8 text-green-500" />
          </div>
        </div>
        <h1 className="text-3xl font-semibold text-gray-900">Enrollment Complete!</h1>
        <p className="text-gray-500">Thank you for enrolling with L & S Driving School</p>
      </CardHeader>
  
      <CardContent className="pt-6">
        <div className="bg-gray-50 p-6 rounded-lg">
          <div className="mb-6 text-center">
            <h2 className="text-2xl font-bold text-primary">L & S Driving School</h2>
            <p className="text-sm text-gray-500">Enrollment Receipt</p>
          </div>
          
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Student Name</p>
                <p className="font-medium">{formData.firstName} {formData.middleName} {formData.familyName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Date</p>
                <p className="font-medium">{new Date().toLocaleDateString()}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Selected Course</p>
                <p className="font-medium">{formData.selectedCourseDetails?.title}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Course Price</p>
                <p className="font-medium">₱{formData.selectedCourseDetails?.price?.toLocaleString()}</p>
              </div>
            </div>
  
            {paymentData.paymentProofUrl && (
              <div className="mt-6">
                <p className="text-sm text-gray-500 mb-2">Payment Proof</p>
                <img 
                  src={paymentData.paymentProofUrl} 
                  alt="Payment proof" 
                  className="max-w-xs mx-auto rounded-lg border"
                />
              </div>
            )}
          </div>
        </div>
  
        <div className="flex justify-between mt-6">
          <PDFDownloadLink
            document={<EnrollmentPDF formData={formData} paymentData={paymentData} />}
            fileName="enrollment-receipt.pdf"
            className="px-6 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2"
          >
            {({ loading }) => (loading ? 'Generating PDF...' : 'Download PDF')}
          </PDFDownloadLink>
          
          <button
            onClick={handleSubmit}
            disabled={isSubmitting || submitSuccess}
            className={`px-6 py-2 rounded-lg flex items-center gap-2 ${
              submitSuccess 
                ? 'bg-green-500 text-white cursor-not-allowed'
                : 'bg-primary text-primary-foreground hover:bg-primary/90'
            } ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {isSubmitting ? 'Submitting...' : submitSuccess ? 'Submitted Successfully' : 'Submit Enrollment'}
            {!isSubmitting && submitSuccess && <CheckCircle2 className="w-4 h-4" />}
          </button>
        </div>
      </CardContent>
    </Card>
    );
  }

