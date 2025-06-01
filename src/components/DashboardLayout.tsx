
import { Button } from "@/components/ui/button";
import { Bell, User, Ship, LogOut } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useProfile } from "@/hooks/useProfile";

interface DashboardLayoutProps {
  children: React.ReactNode;
  title: string;
  userRole: string;
}

const DashboardLayout = ({ children, title, userRole }: DashboardLayoutProps) => {
  const { signOut } = useAuth();
  const { data: profile } = useProfile();

  const handleLogout = () => {
    signOut();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b shadow-sm">
        <div className="px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Link to="/" className="flex items-center space-x-2">
              <Ship className="h-8 w-8 text-blue-600" />
              <span className="text-2xl font-bold text-gray-900">TrackPort</span>
            </Link>
            <div className="border-l pl-4">
              <h1 className="text-xl font-semibold text-gray-900">{title}</h1>
              <p className="text-sm text-gray-500 capitalize">{userRole.replace('_', ' ')} Dashboard</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm">
              <Bell className="h-5 w-5" />
            </Button>
            
            <div className="flex items-center space-x-2">
              <User className="h-5 w-5 text-gray-400" />
              <span className="text-sm font-medium">{profile?.full_name || 'User'}</span>
            </div>
            
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6">
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
