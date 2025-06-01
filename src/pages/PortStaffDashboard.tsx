import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Ship, Package, MapPin, Plus, Search } from "lucide-react";
import StatusBadge from "@/components/StatusBadge";
import { useState } from "react";

const PortStaffDashboard = () => {
  const [showNewShipmentForm, setShowNewShipmentForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Mock data
  const portStats = {
    shipmentsToday: 8,
    pendingStorage: 3,
    availableDocks: 5,
    totalCapacity: 85
  };

  const recentShipments = [
    {
      id: "SHP-001",
      vessel: "MSC Cristina",
      customer: "ABC Electronics",
      description: "Electronics Components",
      status: "In Storage",
      arrivalTime: "08:30 AM",
      dock: "Terminal A-3",
      storageLocation: "Warehouse B-12"
    },
    {
      id: "SHP-002",
      vessel: "Atlantic Star",
      customer: "Global Manufacturing",
      description: "Automotive Parts",
      status: "Cleared",
      arrivalTime: "10:15 AM",
      dock: "Terminal B-1",
      storageLocation: "Warehouse C-05"
    },
    {
      id: "SHP-003",
      vessel: "Pacific Dawn",
      customer: "Textile Solutions",
      description: "Textile Materials",
      status: "Arrived",
      arrivalTime: "11:45 AM",
      dock: "Terminal C-2",
      storageLocation: "Pending"
    }
  ];

  const filteredShipments = recentShipments.filter(shipment =>
    shipment.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    shipment.vessel.toLowerCase().includes(searchTerm.toLowerCase()) ||
    shipment.customer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DashboardLayout title="Port Operations" userRole="port_staff">
      <div className="space-y-6">
        {/* Port Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Shipments Today</CardTitle>
              <Ship className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{portStats.shipmentsToday}</div>
              <p className="text-xs text-muted-foreground">New arrivals</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Storage</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{portStats.pendingStorage}</div>
              <p className="text-xs text-muted-foreground">Awaiting assignment</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Available Docks</CardTitle>
              <MapPin className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{portStats.availableDocks}</div>
              <p className="text-xs text-muted-foreground">Ready for use</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Capacity Used</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{portStats.totalCapacity}%</div>
              <p className="text-xs text-muted-foreground">Storage utilization</p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Manage port operations efficiently</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4">
              <Button onClick={() => setShowNewShipmentForm(!showNewShipmentForm)}>
                <Plus className="h-4 w-4 mr-2" />
                Register New Shipment
              </Button>
              <Button variant="outline">
                <MapPin className="h-4 w-4 mr-2" />
                Assign Storage Location
              </Button>
              <Button variant="outline">
                <Package className="h-4 w-4 mr-2" />
                Update Shipment Status
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* New Shipment Form */}
        {showNewShipmentForm && (
          <Card>
            <CardHeader>
              <CardTitle>Register New Shipment</CardTitle>
              <CardDescription>Enter shipment details for port processing</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="vessel">Vessel Name</Label>
                  <Input id="vessel" placeholder="e.g., MSC Cristina" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="customer">Customer/Consignee</Label>
                  <Input id="customer" placeholder="Customer name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Cargo Description</Label>
                  <Input id="description" placeholder="Brief description of goods" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dock">Assigned Dock</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select dock" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="terminal-a-1">Terminal A - Dock 1</SelectItem>
                      <SelectItem value="terminal-a-2">Terminal A - Dock 2</SelectItem>
                      <SelectItem value="terminal-b-1">Terminal B - Dock 1</SelectItem>
                      <SelectItem value="terminal-c-1">Terminal C - Dock 1</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="md:col-span-2 flex space-x-4">
                  <Button type="submit">Register Shipment</Button>
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => setShowNewShipmentForm(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Recent Shipments */}
        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
              <div>
                <CardTitle>Recent Shipments</CardTitle>
                <CardDescription>Manage incoming and processing shipments</CardDescription>
              </div>
              <div className="flex items-center space-x-2">
                <Search className="h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search shipments..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-64"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Shipment ID</TableHead>
                  <TableHead>Vessel</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Arrival Time</TableHead>
                  <TableHead>Dock</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredShipments.map((shipment) => (
                  <TableRow key={shipment.id}>
                    <TableCell className="font-medium">{shipment.id}</TableCell>
                    <TableCell>{shipment.vessel}</TableCell>
                    <TableCell>{shipment.customer}</TableCell>
                    <TableCell>{shipment.description}</TableCell>
                    <TableCell>
                      <StatusBadge status={shipment.status} />
                    </TableCell>
                    <TableCell>{shipment.arrivalTime}</TableCell>
                    <TableCell>{shipment.dock}</TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm">
                        Manage
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default PortStaffDashboard;
