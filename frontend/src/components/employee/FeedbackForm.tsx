
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Star, ArrowLeft } from 'lucide-react';

const FeedbackForm = () => {
  const { sessionId } = useParams();
  const navigate = useNavigate();
  
  // Mock session data
  const sessionData = {
    id: sessionId,
    title: 'Leadership Development Workshop',
    date: '2024-01-15',
    instructor: 'John Smith'
  };

  // Mock form questions
  const formQuestions = [
    {
      id: 1,
      type: 'rating',
      question: 'How would you rate the overall quality of this training session?',
      required: true
    },
    {
      id: 2,
      type: 'rating',
      question: 'How effective was the instructor in delivering the content?',
      required: true
    },
    {
      id: 3,
      type: 'multiple-choice',
      question: 'Which aspect of the training was most valuable to you?',
      options: ['Content Quality', 'Instructor Expertise', 'Interactive Activities', 'Materials Provided'],
      required: true
    },
    {
      id: 4,
      type: 'checkbox',
      question: 'Which topics would you like to see covered in future sessions? (Select all that apply)',
      options: ['Advanced Leadership Techniques', 'Team Building', 'Communication Skills', 'Conflict Resolution', 'Strategic Planning'],
      required: false
    },
    {
      id: 5,
      type: 'text',
      question: 'What did you like most about this training session?',
      required: false
    },
    {
      id: 6,
      type: 'textarea',
      question: 'What suggestions do you have for improving future training sessions?',
      required: false
    },
    {
      id: 7,
      type: 'rating',
      question: 'How likely are you to recommend this training to a colleague?',
      required: true
    }
  ];

  const [responses, setResponses] = useState<{[key: number]: any}>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleRatingChange = (questionId: number, rating: number) => {
    setResponses(prev => ({
      ...prev,
      [questionId]: rating
    }));
  };

  const handleInputChange = (questionId: number, value: string) => {
    setResponses(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const handleMultipleChoiceChange = (questionId: number, value: string) => {
    setResponses(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const handleCheckboxChange = (questionId: number, option: string, checked: boolean) => {
    setResponses(prev => {
      const currentValue = prev[questionId] || [];
      if (checked) {
        return {
          ...prev,
          [questionId]: [...currentValue, option]
        };
      } else {
        return {
          ...prev,
          [questionId]: currentValue.filter((item: string) => item !== option)
        };
      }
    });
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    // Check required fields
    const requiredQuestions = formQuestions.filter(q => q.required);
    const missingRequired = requiredQuestions.some(q => !responses[q.id]);
    
    if (missingRequired) {
      alert('Please fill in all required fields');
      setIsSubmitting(false);
      return;
    }

    

    // Mock API call
    setTimeout(() => {
      console.log('Feedback submitted:', responses);
      alert('Thank you! Your feedback has been submitted successfully.');
      navigate('/employee/dashboard');
    }, 1000);
  };

  const renderStarRating = (questionId: number) => {
    const rating = responses[questionId] || 0;
    return (
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => handleRatingChange(questionId, star)}
            className={`p-1 ${star <= rating ? 'text-yellow-400' : 'text-gray-300'} hover:text-yellow-400 transition-colors`}
          >
            <Star className="h-6 w-6 fill-current" />
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Button 
            variant="outline" 
            onClick={() => navigate('/employee/dashboard')}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-gray-900">Training Feedback Form</CardTitle>
              <div className="text-gray-600">
                <p><strong>Session:</strong> {sessionData.title}</p>
                <p><strong>Date:</strong> {sessionData.date}</p>
                <p><strong>Instructor:</strong> {sessionData.instructor}</p>
              </div>
            </CardHeader>
          </Card>
        </div>

        <Card>
          <CardContent className="p-6">
            <div className="space-y-8">
              {formQuestions.map((question, index) => (
                <div key={question.id} className="border-b border-gray-200 pb-6 last:border-b-0">
                  <div className="mb-4">
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      {index + 1}. {question.question}
                      {question.required && <span className="text-red-500 ml-1">*</span>}
                    </h3>
                  </div>

                  {question.type === 'rating' && (
                    <div className="flex items-center space-x-4">
                      {renderStarRating(question.id)}
                      <span className="text-sm text-gray-500">
                        {responses[question.id] ? `${responses[question.id]} star${responses[question.id] !== 1 ? 's' : ''}` : 'Click to rate'}
                      </span>
                    </div>
                  )}

                  {question.type === 'multiple-choice' && (
                    <RadioGroup
                      value={responses[question.id] || ''}
                      onValueChange={(value) => handleMultipleChoiceChange(question.id, value)}
                    >
                      {question.options?.map((option) => (
                        <div key={option} className="flex items-center space-x-2">
                          <RadioGroupItem value={option} id={`${question.id}-${option}`} />
                          <Label htmlFor={`${question.id}-${option}`}>{option}</Label>
                        </div>
                      ))}
                    </RadioGroup>
                  )}

                  {question.type === 'checkbox' && (
                    <div className="space-y-3">
                      {question.options?.map((option) => (
                        <div key={option} className="flex items-center space-x-2">
                          <Checkbox
                            id={`${question.id}-${option}`}
                            checked={(responses[question.id] || []).includes(option)}
                            onCheckedChange={(checked) => handleCheckboxChange(question.id, option, checked as boolean)}
                          />
                          <Label htmlFor={`${question.id}-${option}`}>{option}</Label>
                        </div>
                      ))}
                    </div>
                  )}

                  {question.type === 'text' && (
                    <Input
                      value={responses[question.id] || ''}
                      onChange={(e) => handleInputChange(question.id, e.target.value)}
                      placeholder="Enter your response..."
                      className="max-w-md"
                    />
                  )}

                  {question.type === 'textarea' && (
                    <Textarea
                      value={responses[question.id] || ''}
                      onChange={(e) => handleInputChange(question.id, e.target.value)}
                      placeholder="Enter your detailed response..."
                      rows={4}
                    />
                  )}
                </div>
              ))}
            </div>

            <div className="flex justify-end mt-8 pt-6 border-t border-gray-200">
              <Button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="bg-blue-600 hover:bg-blue-700 px-8"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FeedbackForm;
