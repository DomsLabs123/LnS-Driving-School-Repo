import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import BgImage from "@/assets/lp-bg.jpg";
import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageCircle,
  X
} from "lucide-react";

import EnrollNowModal from '@/components/modal/SelectCourse'
import { Card, CardContent } from "@/components/ui/card";
import FAQChatbot from "../ClientPage/ChatBotPage";

// Import images for the slider
import Slide1 from "@/assets/p1.jpg";
import Slide2 from "@/assets/p2.jpg";
import Slide3 from "@/assets/p3.jpg";
import Slide4 from "@/assets/p4.jpg";
import Slide5 from "@/assets/p5.jpg";

// import Images for site
import PDC from "@/assets/p4.jpg";
import TDC from "@/assets/TDC.jpg";
import MDC from "@/assets/p2.jpg";
import Refresher from "@/assets/PDC.jpg";
import Historypic1 from "@/assets/Historypic1.jpg";
import Historypic2 from "@/assets/Historypic2.jpg";
import Historypic3 from "@/assets/Historypic3.jpg";
import Testimony1 from "@/assets/Testimony1.jpg";
import Testimony2 from "@/assets/Testimony2.jpg";
import Testimony3 from "@/assets/Testimony3.jpg";
import Enroll from "@/components/modal/EnrollNow";

/// Slide Attributes
const slides = [
  { src: Slide1, alt: "Driving Lesson 1" },
  { src: Slide2, alt: "Driving Lesson 2" },
  { src: Slide3, alt: "Driving Lesson 3" },
  { src: Slide4, alt: "Driving Lesson 4" },
  { src: Slide5, alt: "Driving Lesson 5" },
];

/// Map and Contact Info
const contactInfo = [
  {
    icon: <MapPin className="h-5 w-5" />,
    title: "Site Location",
    content:
      "2nd Floor Elipe Building, Kauswagan National Highway (2nd floor of Global Dominion)",
  },
  {
    icon: <Phone className="h-5 w-5" />,
    title: "Phone",
    content: "+63 123 456 7890",
  },
  {
    icon: <Mail className="h-5 w-5" />,
    title: "Email",
    content: "info@lsdriving.com",
  },
  {
    icon: <Clock className="h-5 w-5" />,
    title: "Hours",
    content: "Mon-Sat: 8AM - 5PM",
  },
];
function ImageSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prevSlide) => (prevSlide - 1 + slides.length) % slides.length
    );
  };

  return (
    <div className="relative w-full h-[40rem] overflow-hidden rounded-lg ">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute top-0 left-0 w-full h-full transition-opacity  duration-1000 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <img
            src={slide.src}
            alt={slide.alt}
            className="w-full h-full object-contain"
          />
        </div>
      ))}
      {/* <button
        onClick={prevSlide}
        className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
      >
        <ChevronRight size={24} />
      </button> */}
    </div>
  );
}

function LandingPage() {
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  
  const toggleChatbot = () => {
    setIsChatbotOpen(!isChatbotOpen);
  };
  return (
    <div>
      <div className='className="min-h-screen"'>
        <section
          className="relative min-h-[50rem] bg-cover bg-center bg-no-repeat flex items-center"
          style={{ backgroundImage: `url(${BgImage})` }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="text-left space-y-6 max-w-xl mb-8 md:mb-0">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight">
                  Welcome to <span className="text-yellow-400">L & S</span>{" "}
                  Driving School
                </h1>
                <p className="text-lg sm:text-2xl text-white">
                  Master essential driving skills with our top-notch courses.
                  Where safety meets excellence on the road.
                </p>
                <div className="flex items-center gap-5">
                  <EnrollNowModal />
                </div>
              </div>
              <div className="md:block hidden w-full md:w-1/2 mt-8 md:mt-0">
                <ImageSlider />
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Section Section Courses */}
      <section className="container mx-auto px-4 py-16 max-w-7xl">
        <div className="space-y-4 mb-1">
          <h1 className="text-4xl font-bold text-gray-900 tracking-tight">
            Featured Courses & Services
          </h1>
          <h3 className="text-xl text-gray-600">
            You can select from a diverse range of vehicles, tailored schedules,
            and detailed instructions that cater specifically to your individual
            needs and preferences. This ensures you have the ultimate
            flexibility and convenience for your journey.
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-[2.5rem]">
          <Card className="group hover:shadow-lg transition-shadow duration-300">
            <CardContent className="p-0">
              <div className="relative">
                <img
                  src={TDC}
                  alt="TDC Course"
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="p-6 space-y-4">
                <h3 className="text-2xl font-semibold text-gray-900">
                  Theoretical Driving Course
                </h3>
                <p className="text-gray-600">
                  Aspiring Drivers are now required to attend 15-hours
                  Theoritical Driving Course before applying for student permits
                </p>
                <Link to='/course-tdc'>
                <Button className="w-full group/button hover:translate-y-[-2px] transition-transform duration-200">
                  Learn more about {"(TDC)"}
                  <ArrowRight className="ml-2 h-4 w-4 group-hover/button:translate-x-1 transition-transform duration-200" />
                </Button>
                </Link>
              
              </div>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-lg transition-shadow duration-300">
            <CardContent className="p-0">
              <div className="relative">
                <img
                  src={PDC}
                  alt="PDC Course"
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="p-6 space-y-4">
                <h3 className="text-2xl font-semibold text-gray-900">
                  Practical Driving Course
                </h3>
                <p className="text-gray-600">
                  Aspiring Drivers are now required to attend 15-hours
                  Theoritical Driving Course before applying for student permits
                </p>
                <Link to="/course-pdc">
                <Button className="w-full group/button hover:translate-y-[-2px] transition-transform duration-200">
                  Learn more about {"(PDC)"}
                  <ArrowRight className="ml-2 h-4 w-4 group-hover/button:translate-x-1 transition-transform duration-200" />
                </Button>
                </Link>
               
              </div>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-lg transition-shadow duration-300">
            <CardContent className="p-0">
              <div className="relative">
                <img
                  src={MDC}
                  alt="MDC Course"
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="p-6 space-y-4">
                <h3 className="text-2xl font-semibold text-gray-900">
                  Motorcycle Riding Course
                </h3>
                <p className="text-gray-600">
                  Aspiring Drivers are now required to attend 15-hours
                  Theoritical Driving Course before applying for student permits
                </p>
                <Link to='/course-mdc'>
                <Button className="w-full group/button hover:translate-y-[-2px] transition-transform duration-200">
                  Learn more about {"(MDC)"}
                  <ArrowRight className="ml-2 h-4 w-4 group-hover/button:translate-x-1 transition-transform duration-200" />
                </Button>
                </Link>
              </div>
            </CardContent>
          </Card>


            <Card className="group hover:shadow-lg transition-shadow duration-300">
            <CardContent className="p-0">
              <div className="relative">
                <img
                  src={Refresher}
                  alt="Refresher Course"
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="p-6 space-y-4">
                <h3 className="text-2xl font-semibold text-gray-900">
                  Refresher Course
                </h3>
                <p className="text-gray-600">
                  For the greater good for new learners specially from special people
                </p>
                <Link to='/course-refresher'>
                <Button className="w-full group/button hover:translate-y-[-2px] transition-transform duration-200">
                  Learn more about {"(Refresher)"}
                  <ArrowRight className="ml-2 h-4 w-4 group-hover/button:translate-x-1 transition-transform duration-200" />
                </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>


      {/* Google Map Location */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Visit Our Location
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Find us at our convenient location. Drop by for inquiries or
              schedule your driving lessons today.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Contact Cards */}
            <div className="space-y-4">
              {contactInfo.map((info, index) => (
                <Card
                  key={index}
                  className="border-l-4 border-yellow-400 hover:shadow-md transition-shadow"
                >
                  <CardContent className="flex items-start p-4">
                    <div className="rounded-full bg-yellow-100 p-3 mr-4">
                      {info.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {info.title}
                      </h3>
                      <p className="text-gray-600">{info.content}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Map Container */}
            <div className="lg:col-span-2 rounded-lg overflow-hidden shadow-lg relative min-h-[400px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d2078.234901088884!2d124.63815868327599!3d8.489489715601403!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x32fff3202c91fb2f%3A0x164d03cd3b7875cd!2sFJQQ%2BGGV%2C%20Cagayan%20de%20Oro%2C%20Misamis%20Oriental!5e1!3m2!1sen!2sph!4v1729150082160!5m2!1sen!2sph"
                className="absolute inset-0 w-full h-full"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-12 text-center bg-yellow-50 rounded-lg p-8 shadow-inner">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              Ready to Start Your Driving Journey?
            </h3>
            <p className="text-gray-600 mb-6">
              Contact us today to schedule your first lesson or get more
              information about our courses.
            </p>
            <button className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold px-6 py-3 rounded-lg transition-colors duration-200">
              Contact Us
            </button>
          </div>
        </div>
      </section>

      {/* L&S History Location */}
      <section className="container mx-auto px-4 py-16 max-w-7xl ">
        <div className="space-y-4 mb-1">
          <h1 className="text-4xl font-bold text-gray-900 tracking-tight">
            L & S Driving School History
          </h1>
          <h3 className="text-xl text-gray-600">
            L & S Driving School has a rich history of commitment to excellence,
            founded on the principles of safety, skill development, and
            personalized instruction, empowering countless drivers to navigate
            the roads confidently since its inception.
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-[2.5rem]">
          <Card className="group hover:shadow-lg transition-shadow duration-300">
            <CardContent className="p-0">
              <div className="relative">
                <img
                  src={Historypic1}
                  alt="Hisotry Picture"
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="p-6 space-y-4">
                <h3 className="text-2xl font-semibold text-gray-900">
                  Comprehensive Courses
                </h3>
                <p className="text-gray-600 font-normal">
                  Our courses cover everything from basic driving skills to
                  advanced defensive techniques, ensuring our student are fully
                  equipped for safe and responsible driving
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-lg transition-shadow duration-300">
            <CardContent className="p-0">
              <div className="relative">
                <img
                  src={Historypic2}
                  alt="Hisotry Picture"
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="p-6 space-y-4">
                <h3 className="text-2xl font-semibold text-gray-900">
                  Flexible Scheduling
                </h3>
                <p className="text-gray-600 font-normal">
                  We offer flexible scheduling options to accommodate busy
                  lifestyle, making it easy for students to fit driver education
                  into thier schedules.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-lg transition-shadow duration-300">
            <CardContent className="p-0">
              <div className="relative">
                <img
                  src={Historypic3}
                  alt="Hisotry Picture"
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="p-6 space-y-4">
                <h3 className="text-2xl font-semibold text-gray-900">
                  Experienced Instructor
                </h3>
                <p className="text-gray-600 font-normal">
                  Our team of experienced instructors is dedicated to providing
                  personalized attentions and guidance to each student, ensuring
                  the receive the best education possible.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section id="testimonial" className="container mx-auto px-4 py-16 max-w-7xl">
        <div className="space-y-4 mb-1 text-center">
          <h1 className="text-4xl font-bold text-gray-900 tracking-tight">
            L & S Driving School Enrollees FeedBacks
          </h1>
          <h3 className="text-xl px-6 text-gray-600">
            Read what our students have to say about their learning journey with
            L&S Driving School, as they share their personal experiences,
            insights, and testimonials that highlight the skills they acquired,
            the challenges they overcame, and the confidence they gained along
            the way.
          </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-[2.5rem]">
          <Card className="group hover:shadow-lg transition-shadow duration-300">
            <CardContent className="p-0 h-80">
              {" "}
              {/* Adjust height as needed */}
              <div className="relative h-full">
                <img
                  src={Testimony1}
                  alt="Testimony Picture"
                  className="w-full h-full object-cover rounded-t-lg"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-lg transition-shadow duration-300">
            <CardContent className="p-0 h-80">
              {" "}
              {/* Adjust height as needed */}
              <div className="relative h-full">
                <img
                  src={Testimony2}
                  alt="Testimony Picture"
                  className="w-full h-full object-cover rounded-t-lg"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-lg transition-shadow duration-300">
            <CardContent className="p-0 h-80">
              {" "}
              {/* Adjust height as needed */}
              <div className="relative h-full">
                <img
                  src={Testimony3}
                  alt="Testimony Picture"
                  className="w-full h-full object-cover rounded-t-lg"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="container mx-auto px-4 text-center py-16 max-w-7xl border-2 border-yellow-400 mb-16 mt-10 rounded-lg shadow-xl">
            <div className="">
              <h1 className="text-4xl font-semibold mb-5">What are you waiting for <span className="text-yellow-600">Start Your Driving Journey</span></h1>
              <p className="px-5 mb-5 text-lg">Take the first step towards becoming a skilled and confident driver by enrolling in a course today, where you'll receive expert instruction, hands-on experience, and personalized guidance tailored to your individual learning needs. With our comprehensive curriculum and supportive environment, you’ll gain the knowledge and skills necessary to navigate the roads with assurance and competence</p>
            </div>
             < EnrollNowModal />
      </section>


        {/* Floating Chatbot Button */}
        <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={toggleChatbot}
          className="h-14 w-14 rounded-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 shadow-lg"
        >
          {isChatbotOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <MessageCircle className="h-6 w-6" />
          )}
        </Button>

        {isChatbotOpen && (
        <div className="fixed bottom-24 right-6 z-50 animate-in slide-in-from-bottom-10 duration-300">
          <div className="w-[400px] max-h-[600px] shadow-2xl rounded-lg">
            <FAQChatbot />
          </div>
        </div>
      )}
      </div>

    </div>
  );
}

export default LandingPage;
