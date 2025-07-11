
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Trophy, TrendingUp, TrendingDown, Clock, Users, Target, Award } from 'lucide-react';

const Leaderboard = () => {
  const [timeFilter, setTimeFilter] = useState('month');
  const [departments, setDepartments] = useState([]);

  // Mock department data with TrueScore metrics
  const mockDepartments = [
    {
      id: 'dept-1',
      name: 'Water Board',
      shortName: 'Water',
      trueScore: 89.2,
      trend: '+5.3',
      totalIssues: 234,
      resolvedIssues: 209,
      avgResponseTime: '3.2 hrs',
      avgResolutionTime: '2.1 days',
      publicSatisfaction: 91,
      rank: 1,
      previousRank: 2,
      category: 'Utilities',
      color: 'blue'
    },
    {
      id: 'dept-2',
      name: 'BBMP Waste Management',
      shortName: 'Waste',
      trueScore: 85.7,
      trend: '+2.1',
      totalIssues: 456,
      resolvedIssues: 391,
      avgResponseTime: '4.5 hrs',
      avgResolutionTime: '1.8 days',
      publicSatisfaction: 88,
      rank: 2,
      previousRank: 1,
      category: 'Sanitation',
      color: 'green'
    },
    {
      id: 'dept-3',
      name: 'BESCOM Power',
      shortName: 'Power',
      trueScore: 82.4,
      trend: '+1.8',
      totalIssues: 189,
      resolvedIssues: 156,
      avgResponseTime: '2.8 hrs',
      avgResolutionTime: '6.2 hrs',
      publicSatisfaction: 85,
      rank: 3,
      previousRank: 3,
      category: 'Utilities',
      color: 'yellow'
    },
    {
      id: 'dept-4',
      name: 'BBMP Roads',
      shortName: 'Roads',
      trueScore: 76.3,
      trend: '-1.2',
      totalIssues: 567,
      resolvedIssues: 432,
      avgResponseTime: '6.7 hrs',
      avgResolutionTime: '4.5 days',
      publicSatisfaction: 79,
      rank: 4,
      previousRank: 4,
      category: 'Infrastructure',
      color: 'orange'
    },
    {
      id: 'dept-5',
      name: 'Traffic Police',
      shortName: 'Traffic',
      trueScore: 71.8,
      trend: '+3.4',
      totalIssues: 298,
      resolvedIssues: 214,
      avgResponseTime: '8.1 hrs',
      avgResolutionTime: '3.2 days',
      publicSatisfaction: 74,
      rank: 5,
      previousRank: 6,
      category: 'Safety',
      color: 'red'
    },
    {
      id: 'dept-6',
      name: 'Parks & Gardens',
      shortName: 'Parks',
      trueScore: 68.9,
      trend: '-0.8',
      totalIssues: 123,
      resolvedIssues: 85,
      avgResponseTime: '5.4 hrs',
      avgResolutionTime: '7.1 days',
      publicSatisfaction: 72,
      rank: 6,
      previousRank: 5,
      category: 'Recreation',
      color: 'emerald'
    }
  ];

  useEffect(() => {
    setDepartments(mockDepartments);
  }, [timeFilter]);

  const getRankChange = (current, previous) => {
    if (current < previous) return 'up';
    if (current > previous) return 'down';
    return 'same';
  };

  const getTrueScoreColor = (score) => {
    if (score >= 85) return 'text-green-600';
    if (score >= 75) return 'text-blue-600';
    if (score >= 65) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getTrueScoreBadge = (score) => {
    if (score >= 85) return 'bg-green-50 text-green-700 border-green-200';
    if (score >= 75) return 'bg-blue-50 text-blue-700 border-blue-200';
    if (score >= 65) return 'bg-yellow-50 text-yellow-700 border-yellow-200';
    return 'bg-red-50 text-red-700 border-red-200';
  };

  return (
    <div className="space-y-6">
      {/* Header Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h2 className="text-2xl font-bold flex items-center space-x-2">
            <Trophy className="w-6 h-6 text-yellow-500" />
            <span>Department TrueScore Leaderboard</span>
          </h2>
          <p className="text-gray-600 mt-1">Real-time performance rankings based on citizen satisfaction</p>
        </div>
        
        <div className="flex space-x-2">
          <Button
            variant={timeFilter === 'week' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setTimeFilter('week')}
          >
            This Week
          </Button>
          <Button
            variant={timeFilter === 'month' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setTimeFilter('month')}
          >
            This Month
          </Button>
          <Button
            variant={timeFilter === 'quarter' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setTimeFilter('quarter')}
          >
            This Quarter
          </Button>
        </div>
      </div>

      {/* Top 3 Podium */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {departments.slice(0, 3).map((dept, index) => (
          <Card key={dept.id} className={`relative overflow-hidden ${
            index === 0 ? 'border-yellow-200 bg-gradient-to-b from-yellow-50 to-white' :
            index === 1 ? 'border-gray-200 bg-gradient-to-b from-gray-50 to-white' :
            'border-orange-200 bg-gradient-to-b from-orange-50 to-white'
          }`}>
            <CardHeader className="text-center pb-2">
              <div className={`w-12 h-12 mx-auto rounded-full flex items-center justify-center ${
                index === 0 ? 'bg-yellow-500' :
                index === 1 ? 'bg-gray-400' :
                'bg-orange-500'
              }`}>
                <span className="text-white font-bold text-lg">{index + 1}</span>
              </div>
              <CardTitle className="flex items-center justify-center space-x-2">
                <span>{dept.name}</span>
                {index === 0 && <Trophy className="w-5 h-5 text-yellow-500" />}
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-3">
              <div>
                <div className={`text-3xl font-bold ${getTrueScoreColor(dept.trueScore)}`}>
                  {dept.trueScore}
                </div>
                <div className="text-sm text-gray-500">TrueScore</div>
                <Badge variant="outline" className="mt-1">
                  {dept.trend.startsWith('+') ? '↗' : '↘'} {dept.trend}
                </Badge>
              </div>
              
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <div className="font-bold">{Math.round((dept.resolvedIssues / dept.totalIssues) * 100)}%</div>
                  <div className="text-gray-500">Resolution Rate</div>
                </div>
                <div>
                  <div className="font-bold">{dept.avgResponseTime}</div>
                  <div className="text-gray-500">Avg Response</div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Detailed Rankings Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Award className="w-5 h-5 text-blue-600" />
            <span>Complete Department Rankings</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {departments.map((dept) => (
              <div key={dept.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center font-bold text-blue-600">
                        #{dept.rank}
                      </div>
                      {getRankChange(dept.rank, dept.previousRank) === 'up' && (
                        <TrendingUp className="w-4 h-4 text-green-500" />
                      )}
                      {getRankChange(dept.rank, dept.previousRank) === 'down' && (
                        <TrendingDown className="w-4 h-4 text-red-500" />
                      )}
                    </div>
                    
                    <div>
                      <h3 className="font-semibold text-lg">{dept.name}</h3>
                      <Badge variant="secondary" className="text-xs">
                        {dept.category}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className={`text-2xl font-bold ${getTrueScoreColor(dept.trueScore)}`}>
                      {dept.trueScore}
                    </div>
                    <Badge variant="outline" className={getTrueScoreBadge(dept.trueScore)}>
                      TrueScore
                    </Badge>
                  </div>
                </div>

                {/* Progress Bars */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Resolution Rate</span>
                      <span>{Math.round((dept.resolvedIssues / dept.totalIssues) * 100)}%</span>
                    </div>
                    <Progress 
                      value={(dept.resolvedIssues / dept.totalIssues) * 100} 
                      className="h-2"
                    />
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Public Satisfaction</span>
                      <span>{dept.publicSatisfaction}%</span>
                    </div>
                    <Progress 
                      value={dept.publicSatisfaction} 
                      className="h-2"
                    />
                  </div>
                </div>

                {/* Detailed Metrics */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <Target className="w-4 h-4 text-gray-400" />
                    <div>
                      <div className="font-medium">{dept.totalIssues}</div>
                      <div className="text-gray-500">Total Issues</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <div>
                      <div className="font-medium">{dept.avgResponseTime}</div>
                      <div className="text-gray-500">Response Time</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4 text-gray-400" />
                    <div>
                      <div className="font-medium">{dept.avgResolutionTime}</div>
                      <div className="text-gray-500">Resolution Time</div>
                    </div>
                  </div>
                  
                  <div>
                    <div className={`font-medium ${dept.trend.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                      {dept.trend.startsWith('+') ? '↗' : '↘'} {dept.trend}
                    </div>
                    <div className="text-gray-500">Trend</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Scoring Methodology */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">TrueScore Methodology</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <div>
            <h4 className="font-medium mb-1">📊 Scoring Components</h4>
            <ul className="list-disc list-inside space-y-1 text-gray-600 ml-4">
              <li><strong>Resolution Rate (30%)</strong> - Percentage of issues resolved</li>
              <li><strong>Response Time (25%)</strong> - Average time to acknowledge complaints</li>
              <li><strong>Resolution Time (20%)</strong> - Average time to fully resolve issues</li>
              <li><strong>Public Satisfaction (15%)</strong> - Citizen feedback scores</li>
              <li><strong>Trend Analysis (10%)</strong> - Month-over-month improvement</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium mb-1">🤖 AI-Powered Updates</h4>
            <p className="text-gray-600">
              Gemini AI continuously analyzes sentiment from social media, complaint descriptions, 
              and follow-up feedback to adjust TrueScores in real-time.
            </p>
          </div>
          
          <div className="pt-2 border-t">
            <p className="text-xs text-gray-500">
              Scores are updated every 15 minutes. Data reflects {timeFilter} performance.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Leaderboard;
