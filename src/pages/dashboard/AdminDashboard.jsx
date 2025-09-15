import { Users, BookOpen, Award, TrendingUp, Eye, MoreHorizontal, Plus, Search } from 'lucide-react';

const AdminDashboard = () => {

  // Mock data
  const stats = {
    totalUsers: 1247,
    totalCourses: 32,
    certificatesIssued: 856,
    activeStudents: 892
  };

  const recentUsers = [
    {
      id: '1',
      name: 'Alex Johnson',
      email: 'alex.johnson@example.com',
      role: 'student',
      joinDate: '2024-01-15',
      status: 'active',
      avatar: 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: '2',
      name: 'Sarah Wilson',
      email: 'sarah.wilson@example.com',
      role: 'instructor',
      joinDate: '2024-01-14',
      status: 'active',
      avatar: 'https://images.pexels.com/photos/2381069/pexels-photo-2381069.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: '3',
      name: 'David Chen',
      email: 'david.chen@example.com',
      role: 'student',
      joinDate: '2024-01-13',
      status: 'pending',
      avatar: 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=400'
    }
  ];

  const topCourses = [
    {
      id: '1',
      title: 'React Fundamentals',
      students: 145,
      completion: 89,
      rating: 4.8,
      instructor: 'Sarah Johnson'
    },
    {
      id: '2',
      title: 'Advanced JavaScript',
      students: 132,
      completion: 76,
      rating: 4.7,
      instructor: 'Mike Chen'
    },
    {
      id: '3',
      title: 'UI/UX Design Principles',
      students: 98,
      completion: 82,
      rating: 4.9,
      instructor: 'Emily Davis'
    }
  ];

  const recentActivity = [
    { id: '1', action: 'New user registered', user: 'John Doe', time: '2 minutes ago' },
    { id: '2', action: 'Course completed', user: 'Jane Smith', time: '5 minutes ago' },
    { id: '3', action: 'Certificate issued', user: 'Mike Johnson', time: '10 minutes ago' }
  ];

  return (
    // <div className="p-4 sm:p-6 lg:p-8 bg-gray-50 min-h-screen">
    //   <div className="max-w-7xl mx-auto">
    //     {/* Welcome Section */}
    //     <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-2xl p-6 sm:p-8 text-white mb-6 sm:mb-8">
    //       <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between">
    //         <div className="mb-4 lg:mb-0">
    //           <h1 className="text-2xl sm:text-3xl font-bold mb-2">Admin Dashboard</h1>
    //           <p className="text-indigo-100 text-base sm:text-lg">Manage your learning platform</p>
    //           <div className="mt-4 flex flex-wrap gap-2">
    //             <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
    //               {stats.totalUsers} Total Users
    //             </span>
    //             <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
    //               {stats.totalCourses} Courses
    //             </span>
    //           </div>
    //         </div>
    //         <div className="hidden lg:block">
    //           <div className="w-24 h-24 sm:w-32 sm:h-32 bg-white/10 rounded-full flex items-center justify-center">
    //             <TrendingUp size={window.innerWidth < 640 ? 32 : 48} className="text-white" />
    //           </div>
    //         </div>
    //       </div>
    //     </div>

    //     {/* Stats Cards */}
    //     <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
    //       <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100">
    //         <div className="flex items-center justify-between">
    //           <div>
    //             <p className="text-xs sm:text-sm font-medium text-gray-600">Total Users</p>
    //             <p className="text-xl sm:text-3xl font-bold text-gray-900 mt-1 sm:mt-2">{stats.totalUsers.toLocaleString()}</p>
    //             <p className="text-xs sm:text-sm text-green-600 mt-1">↑ 12% from last month</p>
    //           </div>
    //           <div className="bg-blue-50 p-2 sm:p-3 rounded-lg">
    //             <Users className="text-blue-600" size={window.innerWidth < 640 ? 16 : 24} />
    //           </div>
    //         </div>
    //       </div>

    //       <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100">
    //         <div className="flex items-center justify-between">
    //           <div>
    //             <p className="text-xs sm:text-sm font-medium text-gray-600">Total Courses</p>
    //             <p className="text-xl sm:text-3xl font-bold text-gray-900 mt-1 sm:mt-2">{stats.totalCourses}</p>
    //             <p className="text-xs sm:text-sm text-green-600 mt-1">↑ 3 new this month</p>
    //           </div>
    //           <div className="bg-green-50 p-2 sm:p-3 rounded-lg">
    //             <BookOpen className="text-green-600" size={window.innerWidth < 640 ? 16 : 24} />
    //           </div>
    //         </div>
    //       </div>

    //       <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100">
    //         <div className="flex items-center justify-between">
    //           <div>
    //             <p className="text-xs sm:text-sm font-medium text-gray-600">Certificates</p>
    //             <p className="text-xl sm:text-3xl font-bold text-gray-900 mt-1 sm:mt-2">{stats.certificatesIssued}</p>
    //             <p className="text-xs sm:text-sm text-green-600 mt-1">↑ 24 this week</p>
    //           </div>
    //           <div className="bg-purple-50 p-2 sm:p-3 rounded-lg">
    //             <Award className="text-purple-600" size={window.innerWidth < 640 ? 16 : 24} />
    //           </div>
    //         </div>
    //       </div>

    //       <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100">
    //         <div className="flex items-center justify-between">
    //           <div>
    //             <p className="text-xs sm:text-sm font-medium text-gray-600">Active Students</p>
    //             <p className="text-xl sm:text-3xl font-bold text-gray-900 mt-1 sm:mt-2">{stats.activeStudents}</p>
    //             <p className="text-xs sm:text-sm text-green-600 mt-1">↑ 8% from last week</p>
    //           </div>
    //           <div className="bg-orange-50 p-2 sm:p-3 rounded-lg">
    //             <TrendingUp className="text-orange-600" size={window.innerWidth < 640 ? 16 : 24} />
    //           </div>
    //         </div>
    //       </div>
    //     </div>

    //     <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 sm:gap-8">
    //       {/* Recent Users */}
    //       <div className="xl:col-span-2 bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100">
    //         <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 sm:mb-6 gap-4">
    //           <h2 className="text-lg sm:text-xl font-bold text-gray-900">Recent Users</h2>
    //           <div className="flex items-center gap-2 w-full sm:w-auto">
    //             <div className="relative flex-1 sm:flex-none">
    //               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
    //               <input
    //                 type="text"
    //                 placeholder="Search users..."
    //                 className="w-full sm:w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
    //               />
    //             </div>
    //             <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex items-center gap-2">
    //               <Plus size={16} />
    //               <span className="hidden sm:inline">Add User</span>
    //             </button>
    //           </div>
    //         </div>
            
    //         <div className="overflow-x-auto">
    //           <table className="w-full">
    //             <thead>
    //               <tr className="border-b border-gray-200">
    //                 <th className="text-left py-3 px-2 font-medium text-gray-600 text-sm">User</th>
    //                 <th className="text-left py-3 px-2 font-medium text-gray-600 text-sm hidden sm:table-cell">Role</th>
    //                 <th className="text-left py-3 px-2 font-medium text-gray-600 text-sm hidden md:table-cell">Join Date</th>
    //                 <th className="text-left py-3 px-2 font-medium text-gray-600 text-sm">Status</th>
    //                 <th className="text-right py-3 px-2 font-medium text-gray-600 text-sm">Actions</th>
    //               </tr>
    //             </thead>
    //             <tbody>
    //               {recentUsers.map((user) => (
    //                 <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50">
    //                   <td className="py-4 px-2">
    //                     <div className="flex items-center gap-3">
    //                       <img
    //                         src={user.avatar}
    //                         alt={user.name}
    //                         className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover"
    //                       />
    //                       <div>
    //                         <p className="font-medium text-gray-900 text-sm">{user.name}</p>
    //                         <p className="text-xs text-gray-600 truncate max-w-32 sm:max-w-none">{user.email}</p>
    //                         <p className="text-xs text-gray-500 capitalize sm:hidden">{user.role}</p>
    //                       </div>
    //                     </div>
    //                   </td>
    //                   <td className="py-4 px-2 hidden sm:table-cell">
    //                     <span className="capitalize text-sm font-medium text-gray-700">
    //                       {user.role}
    //                     </span>
    //                   </td>
    //                   <td className="py-4 px-2 text-sm text-gray-600 hidden md:table-cell">
    //                     {new Date(user.joinDate).toLocaleDateString()}
    //                   </td>
    //                   <td className="py-4 px-2">
    //                     <span className={`px-2 py-1 rounded-full text-xs font-medium ${
    //                       user.status === 'active' 
    //                         ? 'bg-green-100 text-green-700' 
    //                         : 'bg-yellow-100 text-yellow-700'
    //                     }`}>
    //                       {user.status}
    //                     </span>
    //                   </td>
    //                   <td className="py-4 px-2 text-right">
    //                     <button className="p-2 hover:bg-gray-100 rounded-lg">
    //                       <MoreHorizontal size={16} className="text-gray-500" />
    //                     </button>
    //                   </td>
    //                 </tr>
    //               ))}
    //             </tbody>
    //           </table>
    //         </div>
    //       </div>

    //       {/* Sidebar */}
    //       <div className="space-y-6">
    //         {/* Top Courses */}
    //         <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100">
    //           <div className="flex items-center justify-between mb-4 sm:mb-6">
    //             <h3 className="text-lg font-bold text-gray-900">Top Courses</h3>
    //             <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
    //               <Eye size={16} />
    //             </button>
    //           </div>
              
    //           <div className="space-y-4">
    //             {topCourses.map((course, index) => (
    //               <div key={course.id} className="border border-gray-200 rounded-lg p-4">
    //                 <div className="flex items-start justify-between mb-2">
    //                   <div className="flex items-center gap-3">
    //                     <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
    //                       <span className="text-blue-600 font-bold text-sm">#{index + 1}</span>
    //                     </div>
    //                     <div>
    //                       <h4 className="font-semibold text-gray-900 text-sm">{course.title}</h4>
    //                       <p className="text-xs text-gray-600">by {course.instructor}</p>
    //                     </div>
    //                   </div>
    //                   <div className="text-right">
    //                     <p className="text-sm font-semibold text-gray-900">⭐ {course.rating}</p>
    //                   </div>
    //                 </div>
                    
    //                 <div className="grid grid-cols-2 gap-4 text-xs text-gray-600 mt-3">
    //                   <div>
    //                     <span className="block text-gray-400">Students</span>
    //                     <span className="font-medium text-gray-900">{course.students}</span>
    //                   </div>
    //                   <div>
    //                     <span className="block text-gray-400">Completion</span>
    //                     <span className="font-medium text-gray-900">{course.completion}%</span>
    //                   </div>
    //                 </div>
    //               </div>
    //             ))}
    //           </div>
    //         </div>

    //         {/* Recent Activity */}
    //         <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100">
    //           <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Activity</h3>
    //           <div className="space-y-3">
    //             {recentActivity.map((activity) => (
    //               <div key={activity.id} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
    //                 <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
    //                 <div className="flex-1">
    //                   <p className="text-sm text-gray-900">{activity.action}</p>
    //                   <p className="text-xs text-gray-600">{activity.user}</p>
    //                   <p className="text-xs text-gray-500">{activity.time}</p>
    //                 </div>
    //               </div>
    //             ))}
    //           </div>
    //         </div>
    //       </div>
    //     </div>

    //     {/* Quick Actions */}
    //     <div className="mt-6 sm:mt-8 grid grid-cols-2 lg:grid-cols-4 gap-4">
    //       <button className="bg-white border border-gray-200 rounded-xl p-4 sm:p-6 hover:shadow-md transition-shadow text-left group">
    //         <div className="bg-blue-50 w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center mb-3 sm:mb-4 group-hover:bg-blue-100 transition-colors">
    //           <BookOpen className="text-blue-600" size={window.innerWidth < 640 ? 20 : 24} />
    //         </div>
    //         <h3 className="font-semibold text-gray-900 mb-1 sm:mb-2 text-sm sm:text-base">Create Course</h3>
    //         <p className="text-xs sm:text-sm text-gray-600">Add new course content</p>
    //       </button>

    //       <button className="bg-white border border-gray-200 rounded-xl p-4 sm:p-6 hover:shadow-md transition-shadow text-left group">
    //         <div className="bg-green-50 w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center mb-3 sm:mb-4 group-hover:bg-green-100 transition-colors">
    //           <Users className="text-green-600" size={window.innerWidth < 640 ? 20 : 24} />
    //         </div>
    //         <h3 className="font-semibold text-gray-900 mb-1 sm:mb-2 text-sm sm:text-base">Manage Users</h3>
    //         <p className="text-xs sm:text-sm text-gray-600">Add or edit user accounts</p>
    //       </button>

    //       <button className="bg-white border border-gray-200 rounded-xl p-4 sm:p-6 hover:shadow-md transition-shadow text-left group">
    //         <div className="bg-purple-50 w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center mb-3 sm:mb-4 group-hover:bg-purple-100 transition-colors">
    //           <Award className="text-purple-600" size={window.innerWidth < 640 ? 20 : 24} />
    //         </div>
    //         <h3 className="font-semibold text-gray-900 mb-1 sm:mb-2 text-sm sm:text-base">Certificates</h3>
    //         <p className="text-xs sm:text-sm text-gray-600">Manage certificate templates</p>
    //       </button>

    //       <button className="bg-white border border-gray-200 rounded-xl p-4 sm:p-6 hover:shadow-md transition-shadow text-left group">
    //         <div className="bg-orange-50 w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center mb-3 sm:mb-4 group-hover:bg-orange-100 transition-colors">
    //           <TrendingUp className="text-orange-600" size={window.innerWidth < 640 ? 20 : 24} />
    //         </div>
    //         <h3 className="font-semibold text-gray-900 mb-1 sm:mb-2 text-sm sm:text-base">Analytics</h3>
    //         <p className="text-xs sm:text-sm text-gray-600">View detailed reports</p>
    //       </button>
    //     </div>
    //   </div>
    // </div>
    <>
        Admin Dashboard Coming Soon...
    </>
  );
};

export default AdminDashboard;