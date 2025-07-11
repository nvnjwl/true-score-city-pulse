import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Camera, MapPin, Send, Upload, Sparkles, CheckCircle, LogIn } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

interface UploadedImage {
  id: string;
  name: string;
  size: number;
  url: string;
}

interface AIAnalysis {
  category: string;
  priority: string;
  department: string;
  similarIssues: number;
  estimatedResolution: string;
  confidence: number;
}

const ComplaintForm = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    location: '',
    priority: 'medium',
    contactEmail: '',
    contactPhone: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [aiAnalysis, setAiAnalysis] = useState<AIAnalysis | null>(null);
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([]);

  const categories = [
    'Waste Management',
    'Road Maintenance',
    'Water Supply',
    'Power Outage',
    'Street Lights',
    'Drainage',
    'Traffic Signals',
    'Noise Pollution',
    'Air Quality',
    'Public Transport',
    'Parks & Recreation',
    'Building Permits'
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const simulateGeminiAnalysis = () => {
    // Simulate Gemini AI analysis
    setTimeout(() => {
      setAiAnalysis({
        category: 'Road Maintenance',
        priority: 'High',
        department: 'BBMP Roads Division',
        similarIssues: 12,
        estimatedResolution: '3-5 business days',
        confidence: 94
      });
    }, 1500);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;
    
    const filesArray = Array.from(files);
    const newImages: UploadedImage[] = filesArray.map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      name: file.name,
      size: file.size,
      url: URL.createObjectURL(file)
    }));
    setUploadedImages(prev => [...prev, ...newImages]);
    
    // Trigger AI analysis when images are uploaded
    if (newImages.length > 0) {
      simulateGeminiAnalysis();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check if user is authenticated before submitting
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to submit a complaint. You'll be redirected to the login page.",
        variant: "destructive"
      });
      navigate('/auth');
      return;
    }

    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Complaint Submitted Successfully!",
        description: "Your issue has been logged and assigned ID: #TRS-2025-0342",
      });
      
      // Reset form
      setFormData({
        title: '',
        description: '',
        category: '',
        location: '',
        priority: 'medium',
        contactEmail: '',
        contactPhone: ''
      });
      setUploadedImages([]);
      setAiAnalysis(null);
    }, 2000);
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          handleInputChange('location', `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`);
          toast({
            title: "Location captured",
            description: "GPS coordinates have been added to your complaint",
          });
        },
        (error) => {
          toast({
            title: "Location access denied",
            description: "Please enter your location manually",
            variant: "destructive"
          });
        }
      );
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Main Form */}
      <div className="lg:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Send className="w-5 h-5 text-blue-600" />
              <span>Report a Civic Issue</span>
            </CardTitle>
            <p className="text-gray-600">
              Help us improve your city by reporting issues in your area
              {!user && (
                <span className="block text-sm text-orange-600 mt-1">
                  Note: You'll need to sign in to submit your report
                </span>
              )}
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Title */}
              <div className="space-y-2">
                <Label htmlFor="title">Issue Title *</Label>
                <Input
                  id="title"
                  placeholder="Brief description of the issue"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  required
                />
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description">Detailed Description *</Label>
                <Textarea
                  id="description"
                  placeholder="Provide detailed information about the issue, when it occurred, and any other relevant details"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  rows={4}
                  required
                />
              </div>

              {/* Category and Priority */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Category *</Label>
                  <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select issue category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Priority</Label>
                  <Select value={formData.priority} onValueChange={(value) => handleInputChange('priority', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low Priority</SelectItem>
                      <SelectItem value="medium">Medium Priority</SelectItem>
                      <SelectItem value="high">High Priority</SelectItem>
                      <SelectItem value="urgent">Urgent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Location */}
              <div className="space-y-2">
                <Label htmlFor="location">Location *</Label>
                <div className="flex space-x-2">
                  <Input
                    id="location"
                    placeholder="Enter address or coordinates"
                    value={formData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    required
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={getCurrentLocation}
                    className="px-3"
                  >
                    <MapPin className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Contact Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.email@example.com"
                    value={formData.contactEmail}
                    onChange={(e) => handleInputChange('contactEmail', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={formData.contactPhone}
                    onChange={(e) => handleInputChange('contactPhone', e.target.value)}
                  />
                </div>
              </div>

              {/* Image Upload */}
              <div className="space-y-2">
                <Label>Upload Photos</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                  <div className="text-center">
                    <Camera className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <Label htmlFor="images" className="cursor-pointer">
                      <Button type="button" variant="outline" asChild>
                        <span>
                          <Upload className="w-4 h-4 mr-2" />
                          Choose Photos
                        </span>
                      </Button>
                    </Label>
                    <Input
                      id="images"
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                    <p className="text-sm text-gray-500 mt-2">
                      Upload photos to help identify the issue (max 5 files, 10MB each)
                    </p>
                  </div>

                  {uploadedImages.length > 0 && (
                    <div className="mt-4 space-y-2">
                      <h4 className="font-medium">Uploaded Images:</h4>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                        {uploadedImages.map((image) => (
                          <div key={image.id} className="relative">
                            <img
                              src={image.url}
                              alt={image.name}
                              className="w-full h-20 object-cover rounded-lg"
                            />
                            <Badge className="absolute -top-2 -right-2 bg-green-500 text-white px-1 py-0">
                              <CheckCircle className="w-3 h-3" />
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700"
                disabled={isSubmitting || !formData.title || !formData.description || !formData.category || !formData.location}
              >
                {isSubmitting ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Processing...</span>
                  </div>
                ) : user ? (
                  <div className="flex items-center space-x-2">
                    <Send className="w-4 h-4" />
                    <span>Submit Complaint</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <LogIn className="w-4 h-4" />
                    <span>Sign In to Submit</span>
                  </div>
                )}
              </Button>
              
              {!user && (
                <div className="text-center">
                  <p className="text-sm text-gray-600">
                    Don't have an account?{' '}
                    <Button
                      type="button"
                      variant="link"
                      className="p-0 h-auto text-blue-600 hover:text-blue-700"
                      onClick={() => navigate('/auth')}
                    >
                      Sign up here
                    </Button>
                  </p>
                </div>
              )}
            </form>
          </CardContent>
        </Card>
      </div>

      {/* AI Analysis Sidebar */}
      <div className="space-y-6">
        {/* Gemini AI Analysis */}
        {aiAnalysis ? (
          <Card className="border-green-200 bg-green-50">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-green-800">
                <Sparkles className="w-5 h-5" />
                <span>Gemini AI Analysis</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <Label className="text-sm text-green-700">Suggested Category:</Label>
                <Badge className="block w-fit mt-1 bg-green-600 text-white">
                  {aiAnalysis.category}
                </Badge>
              </div>
              
              <div>
                <Label className="text-sm text-green-700">Priority Level:</Label>
                <Badge className="block w-fit mt-1 bg-orange-500 text-white">
                  {aiAnalysis.priority}
                </Badge>
              </div>
              
              <div>
                <Label className="text-sm text-green-700">Assigned Department:</Label>
                <p className="text-sm font-medium text-green-800">{aiAnalysis.department}</p>
              </div>
              
              <div>
                <Label className="text-sm text-green-700">Similar Issues:</Label>
                <p className="text-sm text-green-800">{aiAnalysis.similarIssues} found in database</p>
              </div>
              
              <div>
                <Label className="text-sm text-green-700">Est. Resolution:</Label>
                <p className="text-sm text-green-800">{aiAnalysis.estimatedResolution}</p>
              </div>
              
              <div className="pt-2 border-t border-green-200">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-green-700">AI Confidence:</span>
                  <Badge variant="outline" className="text-green-700 border-green-300">
                    {aiAnalysis.confidence}%
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        ) : uploadedImages.length > 0 ? (
          <Card className="border-blue-200 bg-blue-50">
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-blue-800 font-medium">Analyzing with Gemini AI...</p>
                <p className="text-sm text-blue-600 mt-1">Processing images and extracting insights</p>
              </div>
            </CardContent>
          </Card>
        ) : null}

        {/* Help & Guidelines */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Reporting Guidelines</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div>
              <h4 className="font-medium mb-1">📸 Photos Help!</h4>
              <p className="text-gray-600">Clear photos help our AI classify issues faster and route them to the right department.</p>
            </div>
            
            <div>
              <h4 className="font-medium mb-1">📍 Location Accuracy</h4>
              <p className="text-gray-600">Precise location helps field teams find and fix issues quickly.</p>
            </div>
            
            <div>
              <h4 className="font-medium mb-1">⚡ Real-time Updates</h4>
              <p className="text-gray-600">Track your complaint status and get updates via SMS/email.</p>
            </div>
            
            <div className="pt-2 border-t">
              <p className="text-xs text-gray-500">
                Your data is secure and used only for civic improvement purposes.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Community Impact</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Issues Reported Today:</span>
              <span className="font-bold">127</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Issues Resolved:</span>
              <span className="font-bold text-green-600">89</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Avg Response Time:</span>
              <span className="font-bold text-blue-600">4.2 hrs</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ComplaintForm;
