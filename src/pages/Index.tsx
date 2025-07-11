
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AlertTriangle, TrendingUp, Users, MapPin, Activity, Shield, LogOut } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import MapDashboard from '@/components/MapDashboard';
import ComplaintForm from '@/components/ComplaintForm';
import Leaderboard from '@/components/Leaderboard';
import RealtimeStats from '@/components/RealtimeStats';

const Index = () => {
  const { user, signOut } = useAuth();
  const [activeComplaints, setActiveComplaints] = useState(342);
  const [resolvedToday, setResolvedToday] = useState(89);
  const [avgResponseTime, setAvgResponseTime] = useState('4.2 hrs');

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveComplaints(prev => prev + Math.floor(Math.random() * 3) - 1);
      setResolvedToday(prev => prev + Math.floor(Math.random() * 2));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-blue-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-green-600 rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                  TrueScore
                </h1>
                <p className="text-sm text-gray-600 -mt-1">Civic Ledger Edition</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="hidden sm:flex items-center space-x-4">
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                  <Activity className="w-3 h-3 mr-1" />
                  Live Dashboard
                </Badge>
                <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                  Google Cloud AI Day 2025
                </Badge>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">Welcome, {user?.email}</span>
                <Button variant="outline" size="sm" onClick={handleSignOut}>
                  <LogOut className="w-4 h-4 mr-1" />
                  Sign Out
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Active Complaints</CardTitle>
              <AlertTriangle className="w-4 h-4 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{activeComplaints}</div>
              <p className="text-xs text-gray-500 mt-1">+12% from yesterday</p>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Resolved Today</CardTitle>
              <TrendingUp className="w-4 h-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{resolvedToday}</div>
              <p className="text-xs text-gray-500 mt-1">+8% improvement</p>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Avg Response Time</CardTitle>
              <Users className="w-4 h-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{avgResponseTime}</div>
              <p className="text-xs text-gray-500 mt-1">-1.2 hrs vs last week</p>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Trust Score</CardTitle>
              <MapPin className="w-4 h-4 text-purple-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">78.5</div>
              <p className="text-xs text-gray-500 mt-1">+2.3 points this month</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Dashboard Tabs */}
        <Tabs defaultValue="map" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-white shadow-sm">
            <TabsTrigger value="map" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              Map Dashboard
            </TabsTrigger>
            <TabsTrigger value="report" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              Report Issue
            </TabsTrigger>
            <TabsTrigger value="leaderboard" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              Department Scores
            </TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              Real-time Analytics
            </TabsTrigger>
          </TabsList>

          <TabsContent value="map" className="space-y-6">
            <MapDashboard />
          </TabsContent>

          <TabsContent value="report" className="space-y-6">
            <ComplaintForm />
          </TabsContent>

          <TabsContent value="leaderboard" className="space-y-6">
            <Leaderboard />
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <RealtimeStats />
          </TabsContent>
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <p className="text-gray-600">
              Built for Google Cloud Agentic AI Day 2025 • Managing City Data Overload Challenge
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Team SPNI_HTML • Powered by Gemini AI & Supabase
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
