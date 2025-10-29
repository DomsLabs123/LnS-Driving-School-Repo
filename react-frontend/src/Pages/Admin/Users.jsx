import React, { useState, useEffect } from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowUpDown, 
  Loader2, 
  UserCircle2, 
  ShieldCheck 
} from 'lucide-react';
import { getListUser } from '@/lib/services/AdmnServices/AdminServices';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'asc' });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getListUser();
        if (response.users && Array.isArray(response.users)) {
          setUsers(response.users);
        } else {
          console.error('Unexpected data structure:', response);
          setError('Invalid data format received');
        }
        setLoading(false);
      } catch (err) {
        console.error('Error fetching users:', err);
        setError('Failed to fetch users');
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
    setUsers((prev) => {
      const sortedUsers = [...prev].sort((a, b) => {
        if (a[key] < b[key]) return sortConfig.direction === 'asc' ? -1 : 1;
        if (a[key] > b[key]) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
      return sortedUsers;
    });
  };

 

  const getStatusVariant = (status) => {
    switch(status?.toLowerCase()) {
      case 'pending':
        return 'secondary'; // Gray/muted color for pending
      case 'on-going':
        return 'destructive'; // Red for ongoing
      case 'finished':
        return 'success'; // Green for finished
      default:
        return 'default';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <Card className="w-96 border-red-500">
          <CardHeader>
            <CardTitle className="text-red-500 flex items-center gap-2">
              <ShieldCheck className="w-6 h-6" />
              Error
            </CardTitle>
          </CardHeader>
          <CardContent className="text-red-600">{error}</CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-50 min-h-screen">
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center text-gray-800 flex items-center justify-start gap-3">
            <UserCircle2 className="w-10 h-10 text-blue-600" />
            Users Directory
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-gray-100">
                <TableRow>
                  <TableHead 
                    className="cursor-pointer hover:bg-gray-200 transition-colors"
                    onClick={() => handleSort('name')}
                  >
                    <div className="flex items-center gap-2">
                      Name 
                      <ArrowUpDown className="w-4 h-4 text-gray-500" />
                    </div>
                  </TableHead>
                  <TableHead 
                    className="cursor-pointer hover:bg-gray-200 transition-colors"
                    onClick={() => handleSort('email')}
                  >
                    <div className="flex items-center gap-2">
                      Email 
                      <ArrowUpDown className="w-4 h-4 text-gray-500" />
                    </div>
                  </TableHead>
                  <TableHead>Course Taken</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Role</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id} className="hover:bg-gray-100 transition-colors">
                    <TableCell className="font-medium text-gray-900">
                      {user.name}
                    </TableCell>
                    <TableCell className="text-gray-600">
                      {user.email}
                    </TableCell>
                    <TableCell>
                      TDC Online Exam
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant={getStatusVariant(user.status)}
                        className="text-xs px-3 py-1"
                      >
                        {user.status || 'Unknown'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge 
                        className="text-xs px-3 py-1 bg-transparent border-none text-slate-900 hover:bg-slate-50" 
                      >
                        {user.role || 'student'}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Users;