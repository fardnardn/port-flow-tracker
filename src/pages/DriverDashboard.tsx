
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Truck, MapPin, Clock, CheckCircle, Navigation, Camera } from "lucide-react";
import StatusBadge from "@/components/StatusBadge";

const DriverDashboard = () => {
  // Mock data
  const driverStats = {
    assignedDeliveries: 2,
    completedToday: 1,
    totalDistance: 45,
    avgRating: 4.8
  };

  const assignedDeliveries = [
    {
      id: "SHP-001",
      customer: "ABC Electronics",
      address: "123 Business Ave, Downtown",
      priority: "High",
      estimatedTime: "2:30 PM",
      distance: "12 km",
      status: "Ready for Pickup"
    },
    {
      id: "SHP-004",
      customer: "XYZ Manufacturing",
      address: "456 Industrial Blvd, East Side",
      priority: "Medium",
      estimatedTime: "4:00 PM",
      distance: "8 km",
      status: "Pending"
    }
  ];

  const completedDeliveries = [
    {
      id: "SHP-003",
      customer: "Tech Solutions Inc",
      completedAt: "11:45 AM",
      rating: 5,
      deliveryTime: "25 mins"
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <DashboardLayout title="Driver Operations" userRole="driver" userName="Mike Thompson">
      <div className="space-y-6">
        {/* Driver Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Assigned Deliveries</CardTitle>
              <Truck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{driverStats.assignedDeliveries}</div>
              <p className="text-xs text-muted-foreground">Today's schedule</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completed Today</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{driverStats.completedToday}</div>
              <p className="text-xs text-muted-foreground">Successfully delivered</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Distance Traveled</CardTitle>
              <MapPin className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{driverStats.totalDistance} km</div>
              <p className="text-xs text-muted-foreground">Today's total</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{driverStats.avgRating}/5</div>
              <p className="text-xs text-muted-foreground">Customer feedback</p>
            </CardContent>
          </Card>
        </div>

        {/* Assigned Deliveries */}
        <Card>
          <CardHeader>
            <CardTitle>Assigned Deliveries</CardTitle>
            <CardDescription>Your scheduled pickups and deliveries</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Shipment ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Address</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Est. Time</TableHead>
                  <TableHead>Distance</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {assignedDeliveries.map((delivery) => (
                  <TableRow key={delivery.id}>
                    <TableCell className="font-medium">{delivery.id}</TableCell>
                    <TableCell>{delivery.customer}</TableCell>
                    <TableCell className="max-w-xs truncate">{delivery.address}</TableCell>
                    <TableCell>
                      <Badge className={getPriorityColor(delivery.priority)}>
                        {delivery.priority}
                      </Badge>
                    </TableCell>
                    <TableCell>{delivery.estimatedTime}</TableCell>
                    <TableCell>{delivery.distance}</TableCell>
                    <TableCell>
                      <StatusBadge status={delivery.status} />
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          <Navigation className="h-4 w-4" />
                        </Button>
                        <Button size="sm">
                          Accept
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Active Delivery */}
          <Card>
            <CardHeader>
              <CardTitle>Current Delivery</CardTitle>
              <CardDescription>SHP-001 - ABC Electronics</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <MapPin className="h-5 w-5 text-blue-600" />
                <span className="text-sm">123 Business Ave, Downtown</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-green-600" />
                <span className="text-sm">Expected: 2:30 PM (15 mins remaining)</span>
              </div>
              <div className="flex space-x-2">
                <Button className="flex-1">
                  <Navigation className="h-4 w-4 mr-2" />
                  Get Directions
                </Button>
                <Button variant="outline">
                  <Camera className="h-4 w-4 mr-2" />
                  Proof of Delivery
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Completed Deliveries */}
          <Card>
            <CardHeader>
              <CardTitle>Today's Completed Deliveries</CardTitle>
              <CardDescription>Successfully delivered shipments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {completedDeliveries.map((delivery) => (
                  <div key={delivery.id} className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <div>
                      <p className="font-medium">{delivery.id}</p>
                      <p className="text-sm text-gray-600">{delivery.customer}</p>
                      <p className="text-xs text-gray-500">Completed at {delivery.completedAt}</p>
                    </div>
                    <div className="text-right">
                      <Badge variant="default">⭐ {delivery.rating}/5</Badge>
                      <p className="text-xs text-gray-500 mt-1">{delivery.deliveryTime}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DriverDashboard;
