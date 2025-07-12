
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, AlertCircle, CheckCircle, Clock, Filter } from 'lucide-react';

const MapDashboard = () => {
  const [selectedZone, setSelectedZone] = useState(null);
  const [filterType, setFilterType] = useState('all');

  // Mock zone data with TrueScore metrics
  const zones = [
    {
      id: 'zone-1',
      name: 'Koramangala',
      coordinates: { lat: 12.9352, lng: 77.6245 },
      activeIssues: 23,
      resolvedIssues: 45,
      trustScore: 82.5,
      status: 'good',
      topIssues: ['Waste Management', 'Road Maintenance', 'Street Lights'],
      lastUpdated: '2 mins ago'
    },
    {
      id: 'zone-2',
      name: 'Whitefield',
      coordinates: { lat: 12.9698, lng: 77.7500 },
      activeIssues: 38,
      resolvedIssues: 28,
      trustScore: 64.2,
      status: 'attention',
      topIssues: ['Water Supply', 'Traffic Signals', 'Drainage'],
      lastUpdated: '5 mins ago'
    },
    {
      id: 'zone-3',
      name: 'Indiranagar',
      coordinates: { lat: 12.9784, lng: 77.6408 },
      activeIssues: 15,
      resolvedIssues: 52,
      trustScore: 89.1,
      status: 'excellent',
      topIssues: ['Parking', 'Noise Pollution', 'Street Cleaning'],
      lastUpdated: '1 min ago'
    },
    {
      id: 'zone-4',
      name: 'HSR Layout',
      coordinates: { lat: 12.9116, lng: 77.6473 },
      activeIssues: 31,
      resolvedIssues: 31,
      trustScore: 71.8,
      status: 'moderate',
      topIssues: ['Power Outage', 'Waste Collection', 'Road Repairs'],
      lastUpdated: '3 mins ago'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'excellent': return 'bg-green-500';
      case 'good': return 'bg-blue-500';
      case 'moderate': return 'bg-yellow-500';
      case 'attention': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'excellent': return 'bg-green-50 text-green-700 border-green-200';
      case 'good': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'moderate': return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'attention': return 'bg-red-50 text-red-700 border-red-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Map Visualization */}
      <div className="lg:col-span-2">
        <Card className="h-[250px] sm:h-[350px] md:h-[500px] lg:h-[600px]">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <MapPin className="w-5 h-5 text-blue-600" />
              <span>Zone-wise Complaint Map</span>
            </CardTitle>
            <div className="flex space-x-2">
              <Button
                variant={filterType === 'all' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilterType('all')}
              >
                All Issues
              </Button>
              <Button
                variant={filterType === 'critical' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilterType('critical')}
              >
                Critical Only
              </Button>
            </div>
          </CardHeader>
          <CardContent className="h-full">
            {/* Mock Map Interface */}
            <div className="relative w-full h-full bg-gradient-to-br from-blue-50 to-green-50 rounded-lg border-2 border-dashed border-gray-200 flex items-center justify-center">
              <div className="text-center space-y-4">
                <MapPin className="w-16 h-16 text-gray-400 mx-auto" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-600">Interactive Map Dashboard</h3>
                  <p className="text-gray-500">Leaflet.js + GeoJSON Integration</p>
                  <p className="text-sm text-gray-400 mt-2">
                    Real implementation would show Bangalore ward boundaries<br />
                    with color-coded complaint clustering and heat maps
                  </p>
                </div>
              </div>
              
              {/* Mock Zone Markers */}
              <div className="absolute inset-0">
                {zones.map((zone, index) => (
                  <div
                    key={zone.id}
                    className={`absolute w-6 h-6 rounded-full cursor-pointer transform -translate-x-1/2 -translate-y-1/2 ${getStatusColor(zone.status)} animate-pulse`}
                    style={{
                      left: `${20 + index * 20}%`,
                      top: `${30 + index * 15}%`
                    }}
                    onClick={() => setSelectedZone(zone)}
                  >
                    <div className="w-full h-full rounded-full bg-white bg-opacity-30"></div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Zone Details & Stats */}
      <div className="space-y-6">
        {/* Zone Selection */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Zone Overview</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {zones.map((zone) => (
              <div
                key={zone.id}
                className={`p-4 rounded-lg border cursor-pointer transition-all hover:shadow-md ${
                  selectedZone?.id === zone.id 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => setSelectedZone(zone)}
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold">{zone.name}</h3>
                  <Badge variant="outline" className={getStatusBadge(zone.status)}>
                    {zone.status}
                  </Badge>
                </div>
                <div className="grid grid-cols-3 gap-2 text-sm">
                  <div className="text-center">
                    <div className="font-bold text-red-600">{zone.activeIssues}</div>
                    <div className="text-gray-500">Active</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-green-600">{zone.resolvedIssues}</div>
                    <div className="text-gray-500">Resolved</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-blue-600">{zone.trustScore}</div>
                    <div className="text-gray-500">TrueScore</div>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Selected Zone Details */}
        {selectedZone && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <span>{selectedZone.name}</span>
                <Badge variant="outline" className={getStatusBadge(selectedZone.status)}>
                  TrueScore: {selectedZone.trustScore}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <AlertCircle className="w-4 h-4 text-red-500" />
                  <span className="text-sm">Active: {selectedZone.activeIssues}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-sm">Resolved: {selectedZone.resolvedIssues}</span>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold text-sm mb-2">Top Issue Categories:</h4>
                <div className="space-y-1">
                  {selectedZone.topIssues.map((issue, index) => (
                    <Badge key={index} variant="secondary" className="mr-1">
                      {issue}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <Clock className="w-4 h-4" />
                <span>Updated {selectedZone.lastUpdated}</span>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Legend */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Map Legend</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-green-500 rounded-full"></div>
              <span className="text-sm">Excellent (80+ TrueScore)</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
              <span className="text-sm">Good (70-79 TrueScore)</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
              <span className="text-sm">Moderate (60-69 TrueScore)</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-red-500 rounded-full"></div>
              <span className="text-sm">Needs Attention (&lt;60)</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MapDashboard;
