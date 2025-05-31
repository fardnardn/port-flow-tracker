
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { FileText, AlertTriangle, CheckCircle, Clock, Upload } from "lucide-react";
import StatusBadge from "@/components/StatusBadge";
import { useState } from "react";

const CustomsDashboard = () => {
  const [selectedShipment, setSelectedShipment] = useState<string | null>(null);

  // Mock data
  const customsStats = {
    pendingClearance: 5,
    clearedToday: 12,
    flaggedItems: 2,
    avgProcessingTime: 4.2
  };

  const pendingShipments = [
    {
      id: "SHP-001",
      customer: "ABC Electronics",
      description: "Electronics Components",
      value: "$45,000",
      origin: "China",
      arrivalDate: "2024-05-30",
      priority: "High",
      documents: ["Bill of Lading", "Commercial Invoice"],
      missingDocs: ["Certificate of Origin"]
    },
    {
      id: "SHP-002",
      customer: "Global Manufacturing",
      description: "Automotive Parts",
      value: "$28,500",
      origin: "Germany",
      arrivalDate: "2024-05-29",
      priority: "Medium",
      documents: ["Bill of Lading", "Commercial Invoice", "Certificate of Origin"],
      missingDocs: []
    },
    {
      id: "SHP-003",
      customer: "Textile Solutions",
      description: "Textile Materials",
      value: "$15,750",
      origin: "India",
      arrivalDate: "2024-05-28",
      priority: "Low",
      documents: ["Bill of Lading"],
      missingDocs: ["Commercial Invoice", "Certificate of Origin"]
    }
  ];

  const recentActions = [
    {
      shipmentId: "SHP-004",
      action: "Cleared",
      timestamp: "2024-05-31 13:45",
      officer: "You",
      notes: "All documents verified, no issues found"
    },
    {
      shipmentId: "SHP-005",
      action: "Flagged",
      timestamp: "2024-05-31 12:30",
      officer: "John Smith",
      notes: "Requires additional inspection for high-value electronics"
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

  const handleClearShipment = (shipmentId: string) => {
    console.log("Clearing shipment:", shipmentId);
    // TODO: Implement clearance logic
  };

  const handleFlagShipment = (shipmentId: string) => {
    console.log("Flagging shipment:", shipmentId);
    // TODO: Implement flagging logic
  };

  return (
    <DashboardLayout title="Customs Clearance" userRole="customs" userName="Robert Martinez">
      <div className="space-y-6">
        {/* Customs Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Clearance</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{customsStats.pendingClearance}</div>
              <p className="text-xs text-muted-foreground">Awaiting review</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Cleared Today</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{customsStats.clearedToday}</div>
              <p className="text-xs text-muted-foreground">Successfully processed</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Flagged Items</CardTitle>
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{customsStats.flaggedItems}</div>
              <p className="text-xs text-muted-foreground">Requiring attention</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Processing</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{customsStats.avgProcessingTime}h</div>
              <p className="text-xs text-muted-foreground">Per shipment</p>
            </CardContent>
          </Card>
        </div>

        {/* Pending Clearance */}
        <Card>
          <CardHeader>
            <CardTitle>Pending Customs Clearance</CardTitle>
            <CardDescription>Shipments awaiting customs approval</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Shipment ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Value</TableHead>
                  <TableHead>Origin</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Documents</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pendingShipments.map((shipment) => (
                  <TableRow key={shipment.id}>
                    <TableCell className="font-medium">{shipment.id}</TableCell>
                    <TableCell>{shipment.customer}</TableCell>
                    <TableCell>{shipment.description}</TableCell>
                    <TableCell>{shipment.value}</TableCell>
                    <TableCell>{shipment.origin}</TableCell>
                    <TableCell>
                      <Badge className={getPriorityColor(shipment.priority)}>
                        {shipment.priority}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex flex-wrap gap-1">
                          {shipment.documents.map((doc, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              ✓ {doc}
                            </Badge>
                          ))}
                        </div>
                        {shipment.missingDocs.length > 0 && (
                          <div className="flex flex-wrap gap-1">
                            {shipment.missingDocs.map((doc, index) => (
                              <Badge key={index} variant="secondary" className="text-xs text-red-600">
                                ✗ {doc}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button 
                          size="sm" 
                          onClick={() => handleClearShipment(shipment.id)}
                          disabled={shipment.missingDocs.length > 0}
                        >
                          <CheckCircle className="h-4 w-4" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleFlagShipment(shipment.id)}
                        >
                          <AlertTriangle className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          Review
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
          {/* Inspection Form */}
          <Card>
            <CardHeader>
              <CardTitle>Inspection Notes</CardTitle>
              <CardDescription>Add inspection comments and notes</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium">Shipment ID</label>
                <input 
                  className="w-full mt-1 p-2 border rounded" 
                  placeholder="e.g., SHP-001"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Inspection Notes</label>
                <Textarea 
                  className="mt-1"
                  placeholder="Enter detailed inspection notes..."
                  rows={4}
                />
              </div>
              <div className="flex space-x-2">
                <Button className="flex-1">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Approve & Clear
                </Button>
                <Button variant="outline" className="flex-1">
                  <AlertTriangle className="h-4 w-4 mr-2" />
                  Flag for Review
                </Button>
              </div>
              <Button variant="outline" className="w-full">
                <Upload className="h-4 w-4 mr-2" />
                Upload Additional Documents
              </Button>
            </CardContent>
          </Card>

          {/* Recent Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Actions</CardTitle>
              <CardDescription>Latest customs processing activities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActions.map((action, index) => (
                  <div key={index} className="border-l-4 border-blue-500 pl-4 py-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{action.shipmentId}</span>
                      <Badge variant={action.action === 'Cleared' ? 'default' : 'secondary'}>
                        {action.action}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{action.notes}</p>
                    <p className="text-xs text-gray-400 mt-1">
                      {action.timestamp} by {action.officer}
                    </p>
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

export default CustomsDashboard;
