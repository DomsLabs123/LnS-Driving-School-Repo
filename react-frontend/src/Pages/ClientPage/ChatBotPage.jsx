import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { SendHorizontal } from 'lucide-react';

const FAQChatbot = () => {
  const [messages, setMessages] = useState([
    { 
      type: 'bot', 
      content: "Hello! How can I help you today? You can ask me anything about our driving school, or click on one of these suggested questions:",
      suggestions: [
        "How much does TDC cost?",
        "What are the enrollment requirements?",
        "Do you offer manual and automatic?",
        "How do I pay for the course?",
        "Where are you located?",
        "What's your contact number?"
      ]
    }
  ]);
  const [input, setInput] = useState('');
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Enhanced FAQ data structure with keywords and categories
  const faqData = {
    topics: {
      costs: {
        keywords: ['cost', 'price', 'fee', 'payment', 'expensive', 'cheap', 'gcash', 'pay'],
        questions: {
          'tdc_cost': {
            question: 'How much does TDC cost?',
            keywords: ['tdc', 'theoretical', 'theory', 'cost', 'price'],
            answer: 'Our Theoretical Driving Course (TDC) is priced at P1,500. This includes a 15-hour lecture conducted online via Zoom.'
          },
          'refresher_cost': {
            question: 'How much is the refresher course?',
            keywords: ['refresher', 'refresh', 'review'],
            answer: 'Our Refresher Course for licensed drivers is priced at P3,000. This includes 8 hours of practical lessons.'
          },
          'payment_methods': {
            question: 'What are the payment methods?',
            keywords: ['payment', 'pay', 'gcash', 'cash', 'method'],
            answer: 'We accept payments via GCash. Please make sure to take a screenshot of your payment transaction for verification purposes.'
          }
        }
      },
      requirements: {
        keywords: ['require', 'need', 'document', 'necessary', 'must', 'should'],
        questions: {
          'enrollment_requirements': {
            question: 'What are the enrollment requirements?',
            keywords: ['enroll', 'registration', 'register', 'join', 'start'],
            answer: 'To enroll, you need: \n1. Valid ID \n2. 1x1 ID picture \n3. Screenshot of GCash payment \n4. Student Permit (for practical driving)'
          },
          'age_requirement': {
            question: "What's the minimum age requirement?",
            keywords: ['age', 'old', 'young', 'minimum'],
            answer: 'The minimum age requirement is 17 years old. You must have a Student Permit to start behind-the-wheel training.'
          },
          'practical_requirements': {
            question: 'What are the requirements for practical driving?',
            keywords: ['practical', 'driving', 'lesson', 'actual'],
            answer: 'For practical driving lessons, you need: \n1. Student permit/driver\'s license with LTO O.R. \n2. A-1 ID and O.R. as proof of payment \n3. Proper attire (no sleeveless shirts, short pants, slippers, or sandals)'
          }
        }
      },
      courses: {
        keywords: ['course', 'class', 'lesson', 'training', 'teach', 'learn'],
        questions: {
          'transmission_types': {
            question: 'Do you offer manual and automatic?',
            keywords: ['manual', 'automatic', 'transmission', 'stick', 'auto'],
            answer: 'Yes, we offer both Automatic and Manual Transmission driving lessons. You can choose your preferred transmission during registration.'
          },
          'pdc_duration': {
            question: 'How long is the practical driving course?',
            keywords: ['duration', 'long', 'hours', 'time', 'pdc', 'practical'],
            answer: 'Practical Driving Course duration varies by level: \n- Beginner: 20-30 Hours \n- Intermediate: 10-15 Hours \n- Refresher: 8 Hours'
          },
          'theoretical_course': {
            question: 'Is the theoretical course online?',
            keywords: ['theoretical', 'theory', 'tdc', 'online', 'zoom'],
            answer: 'Yes! Our Theoretical Driving Course (TDC) is fully online via Zoom, making it convenient for you to learn from home.'
          }
        }
      },
      logistics: {
        keywords: ['where', 'when', 'schedule', 'location', 'contact', 'address'],
        questions: {
          'location': {
            question: 'Where are you located?',
            keywords: ['location', 'address', 'office', 'where'],
            answer: 'Our office is located at 2nd floor, Elipe Bldg., Claro M. Recto Avenue, Kauswagan National Highway (2nd floor of Global Dominion), Cagayan de Oro, Philippines.'
          },
          'time':{
            question: 'What are your office hours?',
            keywords: ['office time', 'office open', ''],
            answer: 'We are open 8:30am to 5:30pm Monday to Saturday'

          },
          'contact': {
            question: "What's your contact number?",
            keywords: ['contact', 'phone', 'number', 'call', 'reach'],
            answer: 'You can reach us at 0995 427 6236. We are available Monday to Saturday, from 8:00 AM to 6:00 PM.'
          },
          'scheduling': {
            question: 'How do I schedule my lessons?',
            keywords: ['schedule', 'book', 'appointment', 'reserve'],
            answer: 'You can book your driving lessons through our website based on your preferred date and time. Our online booking system shows all available slots.'
          }
        }
      }
    }
  };

  const findBestMatch = (input) => {
    const normalizedInput = input.toLowerCase();
    const words = normalizedInput.split(' ');
    let bestMatch = {
      score: 0,
      answer: '',
      topic: '',
      suggestions: []
    };

    // Check each topic and its questions
    for (const [topicKey, topic] of Object.entries(faqData.topics)) {
      // Calculate topic relevance
      const topicScore = topic.keywords.reduce((score, keyword) => 
        score + (normalizedInput.includes(keyword) ? 1 : 0), 0);

      // Check each question in the topic
      for (const [questionKey, question] of Object.entries(topic.questions)) {
        let score = topicScore;

        // Add score for exact matches
        if (normalizedInput === question.question.toLowerCase()) {
          score += 10;
        }

        // Add score for keyword matches
        score += question.keywords.reduce((keywordScore, keyword) => 
          keywordScore + (words.includes(keyword) ? 2 : 
            (normalizedInput.includes(keyword) ? 1 : 0)), 0);

        if (score > bestMatch.score) {
          bestMatch = {
            score,
            answer: question.answer,
            topic: topicKey,
            suggestions: getSuggestions(topicKey)
          };
        }
      }
    }

    // If no good match is found
    if (bestMatch.score < 2) {
      return {
        answer: "I'm not quite sure about that. Could you rephrase your question? You can also try one of these common questions:",
        suggestions: suggestionSets.default
      };
    }

    return bestMatch;
  };

  const suggestionSets = {
    default: [
      "How much does TDC cost?",
      "What are the enrollment requirements?",
      "Do you offer manual and automatic?",
      "How do I pay for the course?",
      "Where are you located?",
      "What's your contact number?"
    ],
    costs: [
      "How much is the refresher course?",
      "What are the payment methods?",
      "How much is PDC?",
      "Do you accept GCash?"
    ],
    requirements: [
      "What's the minimum age requirement?",
      "What documents do I need?",
      "Do I need a student permit?",
      "What should I wear during lessons?"
    ],
    courses: [
      "How long is the practical driving course?",
      "Is the theoretical course online?",
      "Do you offer manual transmission?",
      "What's included in the refresher course?"
    ],
    logistics: [
      "Where is your office located?",
      "What are your office hours?",
      "How do I schedule my lessons?",
      "Can I choose my instructor?"
    ]
  };

  const getSuggestions = (topic) => {
    return suggestionSets[topic] || suggestionSets.default;
  };

  const updateMessages = (newMessages) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setMessages(newMessages);
      setIsTransitioning(false);
    }, 300);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { type: 'user', content: input };
    const response = findBestMatch(input);
    const botMessage = { 
      type: 'bot', 
      content: response.answer,
      suggestions: response.suggestions
    };

    updateMessages([userMessage, botMessage]);
    setInput('');
  };

  const handleSuggestionClick = (suggestion) => {
    const userMessage = { type: 'user', content: suggestion };
    const response = findBestMatch(suggestion);
    const botMessage = { 
      type: 'bot', 
      content: response.answer,
      suggestions: response.suggestions
    };

    updateMessages([userMessage, botMessage]);
  };

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Driving School Assistant</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-96 overflow-y-auto mb-4 space-y-4">
          <div className={`space-y-4 transition-opacity duration-300 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
            {messages.map((message, index) => (
              <div 
                key={index} 
                className={`space-y-2 animate-slideIn`}
                style={{
                  animationDelay: `${index * 150}ms`
                }}
              >
                <div
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`rounded-lg px-4 py-2 max-w-[80%] transition-all duration-300 ${
                      message.type === 'user'
                        ? 'bg-blue-500 text-white animate-slideInRight'
                        : 'bg-gray-100 text-gray-900 animate-slideInLeft'
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
                {message.type === 'bot' && message.suggestions && (
                  <div className="flex flex-wrap gap-2 animate-fadeIn">
                    {message.suggestions.map((suggestion, i) => (
                      <Button
                        key={i}
                        variant="outline"
                        size="sm"
                        onClick={() => handleSuggestionClick(suggestion)}
                        className="text-sm transition-all duration-300 hover:scale-105"
                        style={{
                          animationDelay: `${(index * 150) + (i * 100)}ms`
                        }}
                      >
                        {suggestion}
                      </Button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask a question..."
            className="flex-1"
          />
          <Button 
            type="submit"
            className="transition-transform duration-200 hover:scale-105"
          >
            <SendHorizontal className="h-4 w-4" />
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default FAQChatbot;