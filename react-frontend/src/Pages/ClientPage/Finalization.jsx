import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { AlertCircle, CheckCircle, XCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import { 
  getSessionOneScore, 
  getSessionTwoScore, 
  getTotalScore,
  getUser 
} from '@/lib/services/TDCOnlineTraining/onlineTrainingSevice';
import logo from '@/assets/logo.png'
import signature from '@/assets/signature.png'
import { useNavigate } from 'react-router-dom';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    padding: 20,
  },
  mainBorder: {
    margin: 10,
    border: 2,
    borderColor: '#C4A962', // Gold border
    padding: 20,
  },
  innerBorder: {
    border: 1,
    borderColor: '#C4A962',
    padding: 30,
    height: '95%',
    alignItems: 'center',
    position: 'relative',
  },
  cornerDecoration: {
    position: 'absolute',
    width: 80,
    height: 80,
    borderWidth: 4,
    borderColor: '#C4A962',
  },
  topLeft: {
    top: 10,
    left: 10,
    borderRight: 0,
    borderBottom: 0,
  },
  topRight: {
    top: 10,
    right: 10,
    borderLeft: 0,
    borderBottom: 0,
  },
  bottomLeft: {
    bottom: 10,
    left: 10,
    borderRight: 0,
    borderTop: 0,
  },
  bottomRight: {
    bottom: 10,
    right: 10,
    borderLeft: 0,
    borderTop: 0,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  headerText: {
    fontSize: 42,
    color: '#2B3A67',
    fontWeight: 'bold',
    marginBottom: 15,
    textTransform: 'uppercase',
    textAlign: 'center',
  },
  subHeaderText: {
    fontSize: 24,
    color: '#C4A962',
    marginBottom: 30,
    textTransform: 'uppercase',
    textAlign: 'center',
  },
  certifyText: {
    fontSize: 16,
    marginBottom: 20,
    color: '#666666',
    fontFamily: 'Times-Italic',
    textAlign: 'center',
  },
  userName: {
    fontSize: 36,
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 20,
    textTransform: 'uppercase',
    color: '#2B3A67',
    borderBottom: 1,
    borderColor: '#C4A962',
    paddingBottom: 10,
    marginHorizontal: 100,
  },
  description: {
    fontSize: 14,
    textAlign: 'center',
    marginVertical: 15,
    lineHeight: 1.6,
    color: '#444444',
    maxWidth: 500,
  },
  scoreText: {
    fontSize: 18,
    textAlign: 'center',
    color: '#2B3A67',
    fontWeight: 'bold',
    marginBottom: 30,
  },
  signatureSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginTop: 40,
  },
  signatureBlock: {
    alignItems: 'center',
    width: '45%',
  },
  signature: {
    width: 150,
    height: 60,
    marginBottom: 10,
  },
  signatureLine: {
    width: '100%',
    borderBottom: 1,
    borderColor: '#C4A962',
    marginBottom: 5,
  },
  signatureText: {
    fontSize: 12,
    color: '#666666',
    textAlign: 'center',
  },
  dateText: {
    fontSize: 14,
    color: '#666666',
    marginTop: 30,
    fontStyle: 'italic',
  },
  serialNumber: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    fontSize: 10,
    color: '#999999',
  },
  watermark: {
    position: 'absolute',
    opacity: 0.04,
    transform: 'rotate(-45deg)',
    fontSize: 100,
    color: '#2B3A67',
    top: '40%',
    left: '20%',
  },
  note:{
    fontSize: 10,
    textAlign: 'center',
    marginVertical: 10,
    lineHeight: 1.6,
    color: '#444444',
    maxWidth: 500,
  }
});

const Certificate = ({ userData, totalScore }) => {
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  const serialNumber = `TDC${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

  return (
    <Document>
      <Page size={[962, 840]}  orientation="landscape" style={styles.page}>
        <View style={styles.mainBorder}>
          <View style={styles.innerBorder}>
            {/* Corner Decorations */}
            <View style={[styles.cornerDecoration, styles.topLeft]} />
            <View style={[styles.cornerDecoration, styles.topRight]} />
            <View style={[styles.cornerDecoration, styles.bottomLeft]} />
            <View style={[styles.cornerDecoration, styles.bottomRight]} />
            
            {/* Watermark */}
            <Text style={styles.watermark}>TDC</Text>

            <Image style={styles.logo} src={logo} />
            
            <Text style={styles.headerText}>Certificate of Completion</Text>
            <Text style={styles.subHeaderText}>Online theoretical driving course</Text>
            
            <Text style={styles.certifyText}>This is to certify that</Text>
            <Text style={styles.userName}>{userData.name}</Text>
            
            <Text style={styles.description}>
              has successfully completed the Online Theoretical Driving Course as prescribed by L&S Driving School.
              The course was designed to provide comprehensive knowledge of road safety, traffic rules and regulations,
              and best driving practices, equipping learners with the foundation for responsible driving. 
            </Text>

            <Text style={styles.note}>
            This certificate serves as a temporary record of completion only. 
            The official certificate must be claimed in person at the L&S Driving School Office.
             Kindly present a valid ID upon claiming.  
            </Text>


            <Text style={styles.scoreText}>
              Final Assessment Score: {totalScore}%
            </Text>

            <View style={styles.signatureSection}>
              <View style={styles.signatureBlock}>
                <Image style={styles.signature} src={signature} />
                <View style={styles.signatureLine} />
                <Text style={styles.signatureText}>Mark Calbeltes</Text>
                <Text style={styles.signatureText}>Director of Training</Text>
              </View>
              
              <View style={styles.signatureBlock}>
                <Image style={styles.signature} src={signature} />
                <View style={styles.signatureLine} />
                <Text style={styles.signatureText}>Jane Smith</Text>
                <Text style={styles.signatureText}>Chief Safety Officer</Text>
              </View>
            </View>

            <Text style={styles.dateText}>Awarded on {currentDate}</Text>
            <Text style={styles.serialNumber}>Certificate ID: {serialNumber}</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};



const ScoreCard = ({ title, score, subtitle }) => (
  <Card className="w-full">
    <CardContent className="p-6">
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-3xl font-bold text-primary mb-1">{score}</p>
      {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
    </CardContent>
  </Card>
);

const ResultMessage = ({ score, userData }) => {
  const navigate = useNavigate();
  const certificateFileName = `TDC_Certificate_${userData.name.replace(/\s+/g, '_')}.pdf`;

  const handleFeedback = () => {
    navigate('/authstudent/feedback');
};
    const handleHome = () => {
    navigate('/authstudent'); // or navigate(-1) if you want to just go back
  };
  

  if (score >= 60) {
    return (
      <>
        <Alert className="mt-6 bg-green-50 border-green-200">
          <CheckCircle className="h-5 w-5 text-green-600" />
          <AlertDescription className="text-green-800 flex items-center justify-between">
            <span>Congratulations! You have successfully passed the exam with excellence!</span>
            <PDFDownloadLink
              document={<Certificate userData={userData} totalScore={score} />}
              fileName={certificateFileName}
              className="ml-4 inline-flex items-center justify-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              {({ loading }) => (loading ? 'Preparing...' : 'Download Certificate')}
            </PDFDownloadLink>
          </AlertDescription>
        </Alert>

             {/* ✅ Feedback + Home Buttons (Aligned Right) */}
        <div className="mt-4 flex justify-between">
  <button
    onClick={handleHome}
    className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
  >
    Home
  </button>
  <button
    onClick={handleFeedback}
    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
  >
    Feedback
          </button>
        </div>
      </>
    );
  } else if (score >= 30) {
    return (
      <>
        <Alert className="mt-6 bg-green-50 border-green-200">
          <CheckCircle className="h-5 w-5 text-green-600" />
          <AlertDescription className="text-green-800 flex items-center justify-between">
            <span>Congratulations! You have passed the exam.</span>
            <PDFDownloadLink
              document={<Certificate userData={userData} totalScore={score} />}
              fileName={certificateFileName}
              className="ml-4 inline-flex items-center justify-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              {({ loading }) => (loading ? 'Preparing...' : 'Download Certificate')}
            </PDFDownloadLink>
          </AlertDescription>
        </Alert>

         {/* ✅ Feedback + Home Buttons (Aligned Right) */}
        <div className="mt-4 flex justify-between">
  <button
    onClick={handleHome}
    className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
  >
    Home
  </button>
  <button
    onClick={handleFeedback}
    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
  >
    Feedback
          </button>
        </div>
      </>
    );
  }

    return (
    <div className="mt-6">
      <Alert variant="destructive">
        <XCircle className="h-5 w-5" />
        <AlertDescription>
          We regret to inform you that you have not passed the test. The minimum passing score is 30.
        </AlertDescription>
      </Alert>

      <div className="mt-4 flex justify-end">
        <button
          onClick={() => {
            // Determine which session is lower and redirect accordingly
            const lowerSession =
              userData?.scores?.sessionOne < userData?.scores?.sessionTwo
                ? 'tdc-powerpoint'
                : 'session2-powerpoint';
            navigate(`/authstudent/${lowerSession}`);
          }}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Re-Exam
        </button>
      </div>
    </div>
  );

};


const ScoreDashboard = () => {
  const navigate = useNavigate();
  const [scores, setScores] = useState({
    sessionOne: null,
    sessionTwo: null,
    total: null
  });
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

    // Prevent back navigation
    useEffect(() => {
      const preventNavigation = (e) => {
        e.preventDefault();
        e.returnValue = '';
        return e.returnValue;
      };
  
      const preventBackButton = (e) => {
        window.history.pushState(null, '', window.location.href);
      };
  
      // Add event listeners
      window.history.pushState(null, '', window.location.href);
      window.addEventListener('popstate', preventBackButton);
      window.addEventListener('beforeunload', preventNavigation);
  
      // Cleanup
      return () => {
        window.removeEventListener('popstate', preventBackButton);
        window.removeEventListener('beforeunload', preventNavigation);
      };
    }, []);

  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [sessionOneData, sessionTwoData, totalData, user] = await Promise.all([
          getSessionOneScore(),
          getSessionTwoScore(),
          getTotalScore(),
          getUser()
        ]);

      
        setScores({
          sessionOne: sessionOneData?.data?.session_one_score || null,
          sessionTwo: sessionTwoData?.data?.data?.session_two_score || null,
          total: totalData?.data?.data?.score || null
        });
        setUserData(user);
        setError(null);
      } catch (err) {
        setError('Unable to retrieve scores. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  
  if (loading) {
    return (
      <div className="w-full max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[1, 2, 3].map((index) => (
            <Card key={index} className="w-full">
              <CardContent className="p-6">
                <div className="animate-pulse space-y-3">
                  <div className="h-4 bg-slate-200 rounded w-1/2"></div>
                  <div className="h-8 bg-slate-200 rounded w-1/3"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive" className="w-full max-w-4xl mx-auto">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6">Exam Results</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <ScoreCard 
          title="Session 1" 
          score={scores.sessionOne}
          subtitle="First Session Score"
        />
        <ScoreCard 
          title="Session 2" 
          score={scores.sessionTwo}
          subtitle="Second Session Score"
        />
        <ScoreCard 
          title="Total Score" 
          score={scores.total}
          subtitle="Over All Result"
        />
      </div>
      {userData && scores.total !== null && (
  <ResultMessage score={scores.total} userData={{ ...userData, scores }} />
)}

    </div>
  );
};

export default ScoreDashboard;