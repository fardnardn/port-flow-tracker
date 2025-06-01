import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Ship, Shield, Users, Truck } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useProfile } from "@/hooks/useProfile";

const Index = () => {
  const { user, signOut } = useAuth();
  const { data: profile } = useProfile();

  const getDashboardLink = () => {
    if (!profile) return "/";
    switch (profile.role) {
      case 'admin': return "/admin/dashboard";
      case 'customer': return "/customer/dashboard";
      case 'driver': return "/driver/dashboard";
      case 'port_staff': return "/port-staff/dashboard";
      case 'customs': return "/customs/dashboard";
      default: return "/";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Ship className="h-8 w-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900">TrackPort</h1>
          </div>
          <div className="space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">
                  Welcome, {profile?.full_name || user.email}
                </span>
                <Link to={getDashboardLink()}>
                  <Button variant="outline">Dashboard</Button>
                </Link>
                <Button variant="ghost" onClick={signOut}>
                  Sign Out
                </Button>
              </div>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outline">Login</Button>
                </Link>
                <Link to="/signup">
                  <Button>Get Started</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            Complete Port Shipment
            <span className="text-blue-600"> Management System</span>
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Streamline your port operations from shipment arrival to customer delivery. 
            Track, manage, and coordinate all aspects of port logistics with real-time updates.
          </p>
          {!user && (
            <Link to="/signup">
              <Button size="lg" className="text-lg px-8 py-6">
                Start Managing Shipments
              </Button>
            </Link>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Designed for Every Role in Port Operations
        </h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="text-center">
              <Shield className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <CardTitle>Customs Clearance</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Streamlined customs processing with document management and approval workflows.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="text-center">
              <Users className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <CardTitle>Port Operations</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Manage shipment arrivals, storage assignments, and port facility coordination.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="text-center">
              <Truck className="h-12 w-12 text-orange-600 mx-auto mb-4" />
              <CardTitle>Delivery Management</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Coordinate driver assignments and track deliveries from port to customer.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="text-center">
              <Ship className="h-12 w-12 text-purple-600 mx-auto mb-4" />
              <CardTitle>Customer Portal</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Real-time shipment tracking and notifications for customers throughout the process.
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Process Flow Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Complete Shipment Lifecycle
          </h3>
          <div className="flex flex-col md:flex-row justify-center items-center space-y-8 md:space-y-0 md:space-x-8">
            <div className="text-center">
              <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <span className="text-blue-600 font-bold">1</span>
              </div>
              <h4 className="font-semibold mb-2">Arrival</h4>
              <p className="text-gray-600 text-sm">Shipment registered at port</p>
            </div>
            <div className="hidden md:block text-gray-400">→</div>
            
            <div className="text-center">
              <div className="bg-green-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <span className="text-green-600 font-bold">2</span>
              </div>
              <h4 className="font-semibold mb-2">Customs</h4>
              <p className="text-gray-600 text-sm">Clearance and inspection</p>
            </div>
            <div className="hidden md:block text-gray-400">→</div>
            
            <div className="text-center">
              <div className="bg-orange-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <span className="text-orange-600 font-bold">3</span>
              </div>
              <h4 className="font-semibold mb-2">Storage</h4>
              <p className="text-gray-600 text-sm">Warehouse assignment</p>
            </div>
            <div className="hidden md:block text-gray-400">→</div>
            
            <div className="text-center">
              <div className="bg-purple-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <span className="text-purple-600 font-bold">4</span>
              </div>
              <h4 className="font-semibold mb-2">Delivery</h4>
              <p className="text-gray-600 text-sm">Customer delivery</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Ship className="h-6 w-6" />
            <span className="text-xl font-bold">TrackPort</span>
          </div>
          <p className="text-gray-400">
            Streamlining port operations worldwide
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
