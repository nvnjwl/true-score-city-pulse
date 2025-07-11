
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { Activity, Brain, Clock, TrendingUp, Users, Zap, RefreshCw } from 'lucide-react';

const RealtimeStats = () => {
  const [isLive, setIsLive] = useState(true);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  // Mock real-time data
  const [hourlyData, setHourlyData] = useState([
    { hour: '6 AM', complaints: 12, resolved: 8 },
    { hour: '7 AM', complaints: 23, resolved: 15 },
    { hour: '8 AM', complaints: 45, resolved: 32 },
    { hour: '9 AM', complaints: 38, resolved: 28 },
    { hour: '10 AM', complaints: 52, resolved: 41 },
    { hour: '11 AM', complaints: 34, resolved: 29 },
    { hour: '12 PM', complaints: 28, resolved: 23 }
  ]);

  const categoryData = [
    { name: 'Roads', value: 156, color: '#3B82F6' },
    { name: 'Water', value: 89, color: '#06B6D4' },
    { name: 'Waste', value: 134, color: '#10B981' },
    { name: 'Power', value: 67, color: '#F59E0B' },
    { name: 'Traffic', value: 45, color: '#EF4444' },
    { name: 'Others', value: 23, color: '#8B5CF6' }
  ];

  const trendData = [
    { day: 'Mon', trueScore: 72.4 },
    { day: 'Tue', trueScore: 74.1 },
    { day: 'Wed', trueScore: 73.8 },
    { day: 'Thu', trueScore: 76.2 },
    { day: 'Fri', trueScore: 78.5 },
    { day: 'Sat', trueScore: 79.3 },
    { day: 'Sun', trueScore: 81.2 }
  ];

  const geminiAnalytics = {
    sentimentBreakdown: {
      positive: 42,
      neutral: 38,
      negative: 20
    },
    keywordTrends: [
      { keyword: 'pothole', mentions: 234, trend: '+12%' },
      { keyword: 'water shortage', mentions: 189, trend: '+8%' },
      { keyword: 'garbage', mentions: 156, trend: '-5%' },
      { keyword: 'street light', mentions: 98, trend: '+15%' }
    ],
    duplicatesDetected: 47,
    autoClassified: 89
  };

  // Simulate real-time updates
  useEffect(() => {
    if (!isLive) return;

    const interval = setInterval(() => {
      setLastUpdate(new Date());
      
      // Update hourly data
      setHourlyData(prev => prev.map(item => ({
        ...item,
        complaints: item.complaints + Math.floor(Math.random() * 3) - 1,
        resolved: item.resolved + Math.floor(Math.random() * 2)
      })));
    }, 5000);

    return () => clearInterval(interval);
  }, [isLive]);

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', { 
      hour12: true, 
      hour: 'numeric', 
      minute: '2-digit' 
    });
  };

  return (
    <div className="space-y-6">
      {/* Header Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h2 className="text-2xl font-bold flex items-center space-x-2">
            <Activity className="w-6 h-6 text-blue-600" />
            <span>Real-time Analytics Dashboard</span>
          </h2>
          <p className="text-gray-600 mt-1">Live insights powered by Gemini AI</p>
        </div>
        
        <div className="flex items-center space-x-4">
          <Badge variant={isLive ? "default" : "secondary"} className="flex items-center space-x-1">
            <div className={`w-2 h-2 rounded-full ${isLive ? 'bg-green-400 animate-pulse' : 'bg-gray-400'}`}></div>
            <span>{isLive ? 'Live' : 'Paused'}</span>
          </Badge>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsLive(!isLive)}
          >
            {isLive ? 'Pause' : 'Resume'}
          </Button>
          
          <div className="text-sm text-gray-500">
            Last update: {formatTime(lastUpdate)}
          </div>
        </div>
      </div>

      {/* Key Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm">Active Issues</p>
                <p className="text-2xl font-bold">342</p>
                <p className="text-blue-200 text-xs">+12 in last hour</p>
              </div>
              <TrendingUp className="w-8 h-8 text-blue-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm">Resolved Today</p>
                <p className="text-2xl font-bold">189</p>
                <p className="text-green-200 text-xs">+8% vs yesterday</p>
              </div>
              <Users className="w-8 h-8 text-green-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm">AI Processed</p>
                <p className="text-2xl font-bold">89%</p>
                <p className="text-purple-200 text-xs">Auto-classified</p>
              </div>
              <Brain className="w-8 h-8 text-purple-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100 text-sm">Avg Response</p>
                <p className="text-2xl font-bold">4.2h</p>
                <p className="text-orange-200 text-xs">-1.2h improvement</p>
              </div>
              <Clock className="w-8 h-8 text-orange-200" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Hourly Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Activity className="w-5 h-5 text-blue-600" />
              <span>Hourly Activity</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={hourlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="hour" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="complaints" fill="#3B82F6" name="New Complaints" />
                <Bar dataKey="resolved" fill="#10B981" name="Resolved" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Issue Categories */}
        <Card>
          <CardHeader>
            <CardTitle>Issue Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* TrueScore Trend */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="w-5 h-5 text-green-600" />
            <span>Weekly TrueScore Trend</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis domain={['dataMin - 5', 'dataMax + 5']} />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="trueScore" 
                stroke="#10B981" 
                strokeWidth={3}
                dot={{ fill: '#10B981', strokeWidth: 2, r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Gemini AI Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sentiment Analysis */}
        <Card className="border-purple-200 bg-purple-50">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-purple-800">
              <Brain className="w-5 h-5" />
              <span>Gemini Sentiment Analysis</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Positive Sentiment</span>
                <span className="text-green-600 font-medium">{geminiAnalytics.sentimentBreakdown.positive}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-green-500 h-2 rounded-full" 
                  style={{ width: `${geminiAnalytics.sentimentBreakdown.positive}%` }}
                ></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Neutral Sentiment</span>
                <span className="text-gray-600 font-medium">{geminiAnalytics.sentimentBreakdown.neutral}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-gray-500 h-2 rounded-full" 
                  style={{ width: `${geminiAnalytics.sentimentBreakdown.neutral}%` }}
                ></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Negative Sentiment</span>
                <span className="text-red-600 font-medium">{geminiAnalytics.sentimentBreakdown.negative}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-red-500 h-2 rounded-full" 
                  style={{ width: `${geminiAnalytics.sentimentBreakdown.negative}%` }}
                ></div>
              </div>
            </div>

            <div className="pt-2 border-t border-purple-200">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-purple-700 font-medium">Duplicates Detected:</span>
                  <div className="text-2xl font-bold text-purple-800">{geminiAnalytics.duplicatesDetected}</div>
                </div>
                <div>
                  <span className="text-purple-700 font-medium">Auto-Classified:</span>
                  <div className="text-2xl font-bold text-purple-800">{geminiAnalytics.autoClassified}%</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Trending Keywords */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Zap className="w-5 h-5 text-yellow-600" />
              <span>Trending Keywords</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {geminiAnalytics.keywordTrends.map((keyword, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <div className="font-semibold">{keyword.keyword}</div>
                  <div className="text-sm text-gray-600">{keyword.mentions} mentions</div>
                </div>
                <Badge 
                  variant="outline" 
                  className={`${
                    keyword.trend.startsWith('+') 
                      ? 'text-green-700 border-green-300 bg-green-50' 
                      : 'text-red-700 border-red-300 bg-red-50'
                  }`}
                >
                  {keyword.trend}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* System Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <RefreshCw className="w-5 h-5 text-blue-600" />
            <span>System Health</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <div className="w-6 h-6 bg-green-500 rounded-full"></div>
              </div>
              <div className="font-semibold">Firebase</div>
              <div className="text-sm text-gray-500">Operational</div>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <div className="w-6 h-6 bg-green-500 rounded-full"></div>
              </div>
              <div className="font-semibold">Gemini API</div>
              <div className="text-sm text-gray-500">Active</div>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <div className="w-6 h-6 bg-green-500 rounded-full"></div>
              </div>
              <div className="font-semibold">Map Services</div>
              <div className="text-sm text-gray-500">Online</div>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <div className="w-6 h-6 bg-yellow-500 rounded-full"></div>
              </div>
              <div className="font-semibold">SMS Gateway</div>
              <div className="text-sm text-gray-500">Degraded</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RealtimeStats;
