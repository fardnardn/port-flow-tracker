
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Users, Package, TrendingUp, AlertTriangle, Settings, UserPlus } from "lucide-react";

const AdminDashboard = () => {
  // Mock data
  const systemStats = {
    totalUsers: 245,
    activeShipments: 18,
    monthlyGrowth: 12.5,
    pendingIssues: 3
  };

  const recentUsers = [
    { id: 1, name: "Sarah Johnson", role: "Customer", email: "sarah@company.com", status: "Active", joinDate: "2024-05-30" },
    { id: 2, name: "Mike Wilson", role: "Driver", email: "mike@logistics.com", status: "Pending", joinDate: "2024-05-29" },
    { id: 3, name: "Lisa Chen", role: "Port Staff", email: "lisa@port.gov", status: "Active", joinDate: "2024-05-28" }
  ];

  const systemLogs = [
    { timestamp: "2024-05-31 14:30", event: "Shipment SHP-001 status updated to 'In Transit'", severity: "info" },
    { timestamp: "2024-05-31 13:15", event: "Customs clearance completed for SHP-002", severity: "success" },
    { timestamp: "2024-05-31 12:45", event: "Driver authentication failed - suspicious activity", severity: "warning" },
    { timestamp: "2024-05-31 11:20", event: "New user registration: John Smith (Customer)", severity: "info" }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'success': return 'bg-green-100 text-green-800';
      case 'warning': return 'bg-yellow-100 text-yellow-800';
      case 'error': return 'bg-red-100 text-red-800';
      default: return 'bg-blue-100 text-blue-800';
    }
  };

  return (
    <DashboardLayout title="System Administration" userRole="admin" userName="Admin User">
      <div className="space-y-6">
        {/* System Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{systemStats.totalUsers}</div>
              <p className="text-xs text-muted-foreground">+12 this month</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Shipments</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{systemStats.activeShipments}</div>
              <p className="text-xs text-muted-foreground">Currently in system</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Monthly Growth</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{systemStats.monthlyGrowth}%</div>
              <p className="text-xs text-muted-foreground">Shipment volume increase</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Issues</CardTitle>
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{systemStats.pendingIssues}</div>
              <p className="text-xs text-muted-foreground">Require attention</p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Manage system operations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4">
              <Button>
                <UserPlus className="h-4 w-4 mr-2" />
                Add New User
              </Button>
              <Button variant="outline">
                <Settings className="h-4 w-4 mr-2" />
                System Settings
              </Button>
              <Button variant="outline">
                <Package className="h-4 w-4 mr-2" />
                View All Shipments
              </Button>
              <Button variant="outline">
                <AlertTriangle className="h-4 w-4 mr-2" />
                Review Issues
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Users */}
          <Card>
            <CardHeader>
              <CardTitle>Recent User Registrations</CardTitle>
              <CardDescription>Latest users who joined the system</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Join Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.name}</TableCell>
                      <TableCell className="capitalize">{user.role.replace('_', ' ')}</TableCell>
                      <TableCell>
                        <Badge variant={user.status === 'Active' ? 'default' : 'secondary'}>
                          {user.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{user.joinDate}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* System Activity Log */}
          <Card>
            <CardHeader>
              <CardTitle>System Activity Log</CardTitle>
              <CardDescription>Recent system events and activities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {systemLogs.map((log, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 rounded-lg bg-gray-50">
                    <Badge className={getSeverityColor(log.severity)}>
                      {log.severity}
                    </Badge>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{log.event}</p>
                      <p className="text-xs text-gray-500">{log.timestamp}</p>
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

export default AdminDashboard;
