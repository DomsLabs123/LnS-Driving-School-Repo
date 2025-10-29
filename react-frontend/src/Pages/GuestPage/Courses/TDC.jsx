import React,{ useState, useEffect }  from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Car, Book, BookOpenText, Clock, Users } from 'lucide-react';
import TDCEnrollment from '@/components/modal/TDCEnrollment';
import { TDCCourse } from '@/lib/services/Courses';
import { Button } from "@/components/ui/button";

const TDC = () => {
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setIsLoading(true);
        const response = await TDCCourse();
        console.log('Full Response:', response);
        setCourses(response.courses);
        setIsLoading(false);
      } catch (err) {
        console.error('Error fetching courses:', err);
        setError(err.message);
        setIsLoading(false);
      }
    };
  
    fetchCourses();
  }, []);


  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <p className="text-xl">Loading courses...</p>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[300px] text-red-500">
        <p className="text-xl">Error: {error}</p>
      </div>
    );
  }

  const features = [
    { icon: Book, title: "Comprehensive Theory", description: "In-depth coverage of traffic rules and regulations" },
    { icon: Car, title: "Virtual Simulations", description: "Practice with realistic driving scenarios" },
    { icon: BookOpenText, title: "Certification", description: "Recognized completion certificate" },
    { icon: Clock, title: "Flexible Schedule", description: "Learn at your own pace" }
  ];

  const packages = [
    {
      features: [ "Basic Simulations", "Study Materials", "Practice Tests"]
    },
    {
      features: ["Advanced Simulations", "Study Materials", "Unlimited Practice Tests", "1-on-1 Instructor Support"]
    },
    {
      features: ["Premium Simulations", "Study Materials", "Unlimited Practice Tests", "1-on-1 Instructor Support", "Guaranteed Pass Support"]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-[#03346E] text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Theoretical Driving Practice {"(TDC)"}</h1>
          <p className="text-xl mb-8">Master the rules of the road with our comprehensive theoretical driving course</p>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="text-lg">
              <Users className="w-4 h-4 mr-2" />
              5000+ Students Trained
            </Badge>
            <Badge variant="secondary" className="text-lg">
              <BookOpenText className="w-4 h-4 mr-2" />
              98% Pass Rate
            </Badge>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">What We Offer</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="flex flex-col items-center text-center p-6">
              <feature.icon className="w-12 h-12 text-[#03346E] mb-4" />
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Pricing Plans</h2>
          {courses && courses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {courses.map((pkg, index) => (
                <Card key={index} className="flex flex-col">
                  <CardHeader>
                    <CardTitle className="text-2xl font-bold">{pkg.title}</CardTitle>
                    <CardDescription className="text-3xl font-bold text-blue-600">
                      ₱ {pkg.price}
                    </CardDescription>
                    <div className="text-left mt-5 mb-5 font-semibold line-clamp-4">
                      {pkg.description}
                    </div>
                  </CardHeader>
                  <CardContent className="flex flex-col gap-4">
                    <ul className="space-y-3">
                      {packages[index]?.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center">
                          <span className="mr-2 text-green-500">✓</span>
                          {feature}
                        </li>
                      ))}
                    </ul>

                    {/* Enroll button inside course cards */}
                    <div className="mt-6 flex justify-center">
                      <TDCEnrollment>
                        <Button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                          Enroll Now
                        </Button>
                      </TDCEnrollment>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-500">
              <p>No courses available</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA  (Call to Action) Section (no button now) */}
      <section className="bg-[#03346E] text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your Journey?</h2>
          <p className="text-xl mb-8">Join thousands of successful drivers who started with our theoretical driving course</p>
          {/* Removed Enroll button here */}
        </div>
      </section>
    </div>
  );
};

export default TDC;
