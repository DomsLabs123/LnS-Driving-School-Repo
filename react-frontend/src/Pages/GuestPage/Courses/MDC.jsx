import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bike, Shield, Award, Star, HardHat, Map, Gauge, Wind, Cloud, BookOpen } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { MDCCourse } from '@/lib/services/Courses';
import { Link } from "react-router-dom";


const MDC = () => {
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setIsLoading(true);
        const response = await MDCCourse();
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
    { icon: HardHat, title: "Safety Training", description: "Comprehensive safety protocols and gear training" },
    { icon: Bike, title: "Modern Motorcycles", description: "Train on well-maintained bikes of various sizes" },
    { icon: Map, title: "Road Skills", description: "Master different road conditions and scenarios" },
    { icon: Gauge, title: "Speed Control", description: "Learn proper speed management and control" }
  ];

  const courseLevels = [
    {
      features: [
        "Motorcycle basics and controls",
        "Safety gear essentials",
        "Basic maneuvering",
        "Traffic rules for motorcycles",
        "Parking techniques",
        "License test preparation"
      ]
    },
    {
      features: [
        "Advanced bike control",
        "Cornering techniques",
        "Highway riding skills",
        "Group riding protocols",
        "Emergency maneuvers",
        "Night riding skills",
        "Weather condition handling"
      ]
    },
    {
      features: [
        "Expert riding techniques",
        "Track day experience",
        "Advanced safety maneuvers",
        "Cross-country preparation",
        "Maintenance knowledge",
        "Race track basics",
        "Professional certification"
      ]
    }
  ];

  const safetyGear = [
    {
      name: "Required Safety Gear",
      items: [
        "DOT-approved helmet",
        "Armored jacket",
        "Riding pants",
        "Motorcycle boots",
        "Riding gloves"
      ]
    },
    {
      name: "Optional Gear",
      items: [
        "Rain gear",
        "High-visibility vest",
        "Spine protector",
        "Knee guards",
        "Elbow protectors"
      ]
    }
  ];

  const specializedTraining = [
    {
      title: "Weather Conditions",
      icon: Cloud,
      items: ["Rain riding", "Wind management", "Cold weather operation", "Hot weather techniques"]
    },
    {
      title: "Advanced Skills",
      icon: Gauge,
      items: ["Counter-steering", "Emergency braking", "Slow speed control", "Corner entry and exit"]
    },
    {
      title: "Theory Sessions",
      icon: BookOpen,
      items: ["Traffic laws", "Road psychology", "Risk assessment", "Route planning"]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-[#1A3636] text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Motorcycle Driving Course</h1>
          <p className="text-xl mb-8">Master the art of motorcycle riding with professional instruction</p>
          <div className="flex flex-wrap gap-4">
            <Badge variant="secondary" className="text-lg">
              <Shield className="w-4 h-4 mr-2" />
              Safety First Approach
            </Badge>
            <Badge variant="secondary" className="text-lg">
              <Award className="w-4 h-4 mr-2" />
              Certified Instructors
            </Badge>
            <Badge variant="secondary" className="text-lg">
              <Wind className="w-4 h-4 mr-2" />
              All Weather Training
            </Badge>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Program Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="flex flex-col items-center text-center p-6">
              <feature.icon className="w-12 h-12 text-purple-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Course Levels Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Course Levels</h2>
          {courses && courses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {courses.map((pkg, index) =>
                <Card key={index} className="flex flex-col">
                  <CardHeader>
                    <CardTitle className="text-2xl font-bold">{pkg.title}</CardTitle>
                    <CardDescription>
                      <span className="text-3xl font-bold text-purple-600">₱ {pkg.price}</span>
                      <br />
                      <span className="text-lg">Duration: {pkg.duration}</span>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 mb-4">
                      {courseLevels[index]?.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center">
                          <span className="mr-2 text-purple-500">✓</span>
                          {feature}
                        </li>
                      ))}
                    </ul>

                    {/* Enroll button inside each course card, centered */}
                    <div className="flex justify-center">
                      <Link to="/mdc-booking-enrollment-proccess">
                        <Badge
                          variant="secondary"
                          className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                        >
                          Enroll Now
                        </Badge>
                      </Link>
                    </div>
                  </CardContent>

                </Card>
              )}
            </div>
          ) : (
            <div className="text-center text-gray-500">
              <p>No courses available</p>
            </div>
          )}
        </div>
      </section>

      {/* Safety Gear Section */}
      <section className="py-16 container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Safety Equipment</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {safetyGear.map((category, index) => (
            <Card key={index} className="p-6">
              <CardHeader>
                <CardTitle className="text-xl font-bold">{category.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {category.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-center">
                      <Shield className="w-4 h-4 text-purple-600 mr-2" />
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Specialized Training Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Specialized Training</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {specializedTraining.map((training, index) => (
              <Card key={index} className="p-6">
                <CardHeader className="flex flex-col items-center">
                  <training.icon className="w-12 h-12 text-purple-600 mb-4" />
                  <CardTitle className="text-xl font-bold">{training.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {training.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-center">
                        <span className="mr-2 text-purple-500">✓</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA  (Call to Action) Section (text only, no button) */}
      <section className="bg-[#1A3636] text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Start Your Motorcycle Journey</h2>
          <p className="text-xl mb-8">Join our professional motorcycle training program and ride with confidence</p>
          {/* Button removed */}
        </div>
      </section>
    </div>
  );
};

export default MDC;
