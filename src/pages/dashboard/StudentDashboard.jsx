import React from 'react';
import { BookOpen, Award, TrendingUp, Clock, Download, Eye, Play, FileText, Users } from 'lucide-react';

const StudentDashboard = () => {

  // Mock data
  const recentLessons = [
    {
      id: '1',
      title: 'Introduction to React Hooks',
      course: 'React Fundamentals',
      duration: '15 min',
      progress: 85,
      thumbnail: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=400',
      type: 'video'
    },
    {
      id: '2',
      title: 'State Management with Redux',
      course: 'Advanced React',
      duration: '22 min',
      progress: 60,
      thumbnail: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=400',
      type: 'video'
    },
    {
      id: '3',
      title: 'JavaScript ES6 Features',
      course: 'Modern JavaScript',
      duration: '18 min',
      progress: 30,
      thumbnail: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=400',
      type: 'quiz'
    }
  ];

  const enrolledCourses = [
    {
      id: '1',
      title: 'React Fundamentals',
      progress: 100,
      totalLessons: 12,
      completedLessons: 12,
      instructor: 'Sarah Johnson',
      certificate: true,
      thumbnail: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=400',
      level: 'Beginner',
      rating: 4.8
    },
    {
      id: '2',
      title: 'Advanced React',
      progress: 65,
      totalLessons: 18,
      completedLessons: 12,
      instructor: 'Mike Chen',
      certificate: false,
      thumbnail: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=400',
      level: 'Advanced',
      rating: 4.9
    },
    {
      id: '3',
      title: 'UI/UX Design Principles',
      progress: 25,
      totalLessons: 15,
      completedLessons: 4,
      instructor: 'Emily Davis',
      certificate: false,
      thumbnail: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=400',
      level: 'Intermediate',
      rating: 4.7
    }
  ];

  const upcomingDeadlines = [
    {
      id: '1',
      title: 'React Quiz Final',
      course: 'React Fundamentals',
      dueDate: '2024-01-25',
      type: 'quiz'
    },
    {
      id: '2',
      title: 'Project Submission',
      course: 'Advanced React',
      dueDate: '2024-01-28',
      type: 'assignment'
    }
  ];

  return (
    // <div className="p-4 sm:p-6 lg:p-8 bg-gray-50 min-h-screen">
    //   <div className="max-w-7xl mx-auto">
    //     {/* Welcome Section */}
    //     <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-2xl p-6 sm:p-8 text-white mb-6 sm:mb-8">
    //       <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between">
    //         <div className="mb-4 lg:mb-0">
    //           <h1 className="text-2xl sm:text-3xl font-bold mb-2">Welcome back, {user?.name}!</h1>
    //           <p className="text-blue-100 text-base sm:text-lg">Continue your learning journey</p>
    //           <div className="mt-4 flex flex-wrap gap-2">
    //             <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
    //               {user?.enrolledCourses?.length || 0} Active Courses
    //             </span>
    //             <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
    //               {user?.certificates?.length || 0} Certificates
    //             </span>
    //           </div>
    //         </div>
    //         <div className="hidden lg:block">
    //           <div className="w-24 h-24 sm:w-32 sm:h-32 bg-white/10 rounded-full flex items-center justify-center">
    //             <BookOpen size={window.innerWidth < 640 ? 32 : 48} className="text-white" />
    //           </div>
    //         </div>
    //       </div>
    //     </div>

    //     {/* Stats Cards */}
    //     <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
    //       <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100">
    //         <div className="flex items-center justify-between">
    //           <div>
    //             <p className="text-xs sm:text-sm font-medium text-gray-600">Enrolled</p>
    //             <p className="text-xl sm:text-3xl font-bold text-gray-900 mt-1 sm:mt-2">{user?.enrolledCourses?.length || 0}</p>
    //           </div>
    //           <div className="bg-blue-50 p-2 sm:p-3 rounded-lg">
    //             <BookOpen className="text-blue-600" size={window.innerWidth < 640 ? 16 : 24} />
    //           </div>
    //         </div>
    //       </div>

    //       <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100">
    //         <div className="flex items-center justify-between">
    //           <div>
    //             <p className="text-xs sm:text-sm font-medium text-gray-600">Completed</p>
    //             <p className="text-xl sm:text-3xl font-bold text-gray-900 mt-1 sm:mt-2">{user?.completedCourses?.length || 0}</p>
    //           </div>
    //           <div className="bg-green-50 p-2 sm:p-3 rounded-lg">
    //             <Award className="text-green-600" size={window.innerWidth < 640 ? 16 : 24} />
    //           </div>
    //         </div>
    //       </div>

    //       <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100">
    //         <div className="flex items-center justify-between">
    //           <div>
    //             <p className="text-xs sm:text-sm font-medium text-gray-600">Certificates</p>
    //             <p className="text-xl sm:text-3xl font-bold text-gray-900 mt-1 sm:mt-2">{user?.certificates?.length || 0}</p>
    //           </div>
    //           <div className="bg-purple-50 p-2 sm:p-3 rounded-lg">
    //             <Award className="text-purple-600" size={window.innerWidth < 640 ? 16 : 24} />
    //           </div>
    //         </div>
    //       </div>

    //       <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100">
    //         <div className="flex items-center justify-between">
    //           <div>
    //             <p className="text-xs sm:text-sm font-medium text-gray-600">Study Time</p>
    //             <p className="text-xl sm:text-3xl font-bold text-gray-900 mt-1 sm:mt-2">24h</p>
    //           </div>
    //           <div className="bg-orange-50 p-2 sm:p-3 rounded-lg">
    //             <Clock className="text-orange-600" size={window.innerWidth < 640 ? 16 : 24} />
    //           </div>
    //         </div>
    //       </div>
    //     </div>

    //     <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 sm:gap-8">
    //       {/* Enrolled Courses */}
    //       <div className="xl:col-span-2 bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100">
    //         <div className="flex items-center justify-between mb-4 sm:mb-6">
    //           <h2 className="text-lg sm:text-xl font-bold text-gray-900">My Courses</h2>
    //           <button className="text-blue-600 hover:text-blue-700 font-medium text-sm sm:text-base">View All</button>
    //         </div>
            
    //         <div className="space-y-4">
    //           {enrolledCourses.map((course) => (
    //             <div key={course.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
    //               <div className="flex flex-col sm:flex-row gap-4">
    //                 <img 
    //                   src={course.thumbnail} 
    //                   alt={course.title}
    //                   className="w-full sm:w-20 h-32 sm:h-20 rounded-lg object-cover"
    //                 />
    //                 <div className="flex-1">
    //                   <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-3">
    //                     <div>
    //                       <h3 className="font-semibold text-gray-900 mb-1">{course.title}</h3>
    //                       <p className="text-sm text-gray-600">by {course.instructor}</p>
    //                       <div className="flex items-center gap-2 mt-1">
    //                         <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
    //                           {course.level}
    //                         </span>
    //                         <span className="text-xs text-yellow-600">★ {course.rating}</span>
    //                       </div>
    //                     </div>
    //                     {course.certificate && (
    //                       <div className="bg-green-50 text-green-700 px-3 py-1 rounded-full text-xs sm:text-sm font-medium mt-2 sm:mt-0 self-start">
    //                         Certificate Ready
    //                       </div>
    //                     )}
    //                   </div>
                      
    //                   <div className="mb-3">
    //                     <div className="flex justify-between text-sm text-gray-600 mb-1">
    //                       <span>Progress</span>
    //                       <span>{course.completedLessons}/{course.totalLessons} lessons</span>
    //                     </div>
    //                     <div className="w-full bg-gray-200 rounded-full h-2">
    //                       <div 
    //                         className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
    //                         style={{ width: `${course.progress}%` }}
    //                       />
    //                     </div>
    //                   </div>
                      
    //                   <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3">
    //                     <button className="w-full sm:w-auto bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
    //                       Continue Learning
    //                     </button>
    //                     {course.certificate && (
    //                       <button className="w-full sm:w-auto flex items-center justify-center gap-2 text-green-600 hover:text-green-700 text-sm font-medium">
    //                         <Download size={16} />
    //                         Download Certificate
    //                       </button>
    //                     )}
    //                   </div>
    //                 </div>
    //               </div>
    //             </div>
    //           ))}
    //         </div>
    //       </div>

    //       {/* Sidebar */}
    //       <div className="space-y-6">
    //         {/* Continue Learning */}
    //         <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100">
    //           <h3 className="text-lg font-bold text-gray-900 mb-4">Continue Learning</h3>
    //           <div className="space-y-3">
    //             {recentLessons.map((lesson) => (
    //               <div key={lesson.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
    //                 <div className="relative">
    //                   <img 
    //                     src={lesson.thumbnail} 
    //                     alt={lesson.title}
    //                     className="w-12 h-12 rounded-lg object-cover"
    //                   />
    //                   <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 rounded-lg">
    //                     {lesson.type === 'video' ? (
    //                       <Play className="text-white" size={16} />
    //                     ) : (
    //                       <FileText className="text-white" size={16} />
    //                     )}
    //                   </div>
    //                 </div>
    //                 <div className="flex-1 min-w-0">
    //                   <p className="font-medium text-gray-900 text-sm truncate">{lesson.title}</p>
    //                   <p className="text-xs text-gray-600">{lesson.course} • {lesson.duration}</p>
    //                   <div className="w-full bg-gray-200 rounded-full h-1 mt-1">
    //                     <div 
    //                       className="bg-blue-600 h-1 rounded-full transition-all" 
    //                       style={{ width: `${lesson.progress}%` }}
    //                     />
    //                   </div>
    //                 </div>
    //               </div>
    //             ))}
    //           </div>
    //         </div>

    //         {/* Upcoming Deadlines */}
    //         <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100">
    //           <h3 className="text-lg font-bold text-gray-900 mb-4">Upcoming Deadlines</h3>
    //           <div className="space-y-3">
    //             {upcomingDeadlines.map((deadline) => (
    //               <div key={deadline.id} className="border border-orange-200 rounded-lg p-3 bg-orange-50">
    //                 <div className="flex items-start justify-between">
    //                   <div className="flex-1">
    //                     <p className="font-medium text-gray-900 text-sm">{deadline.title}</p>
    //                     <p className="text-xs text-gray-600">{deadline.course}</p>
    //                     <p className="text-xs text-orange-600 mt-1">
    //                       Due: {new Date(deadline.dueDate).toLocaleDateString()}
    //                     </p>
    //                   </div>
    //                   <span className={`px-2 py-1 rounded-full text-xs font-medium ${
    //                     deadline.type === 'quiz' 
    //                       ? 'bg-blue-100 text-blue-700' 
    //                       : 'bg-purple-100 text-purple-700'
    //                   }`}>
    //                     {deadline.type}
    //                   </span>
    //                 </div>
    //               </div>
    //             ))}
    //           </div>
    //         </div>

    //         {/* Certificates */}
    //         <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100">
    //           <h3 className="text-lg font-bold text-gray-900 mb-4">My Certificates</h3>
    //           {user?.certificates?.length ? (
    //             <div className="space-y-3">
    //               {user.certificates.map((cert) => (
    //                 <div key={cert.id} className="border border-gray-200 rounded-lg p-4">
    //                   <div className="flex items-center gap-3 mb-3">
    //                     <div className="bg-yellow-50 p-2 rounded-lg">
    //                       <Award className="text-yellow-600" size={20} />
    //                     </div>
    //                     <div className="flex-1">
    //                       <p className="font-medium text-gray-900 text-sm">{cert.courseName}</p>
    //                       <p className="text-xs text-gray-600">
    //                         Completed: {cert.completionDate.toLocaleDateString()}
    //                       </p>
    //                     </div>
    //                   </div>
    //                   <div className="flex gap-2">
    //                     <button className="flex items-center gap-1 text-blue-600 hover:text-blue-700 text-xs font-medium">
    //                       <Eye size={14} />
    //                       View
    //                     </button>
    //                     <button className="flex items-center gap-1 text-green-600 hover:text-green-700 text-xs font-medium">
    //                       <Download size={14} />
    //                       Download
    //                     </button>
    //                   </div>
    //                 </div>
    //               ))}
    //             </div>
    //           ) : (
    //             <div className="text-center py-6">
    //               <Award className="mx-auto text-gray-400 mb-3" size={32} />
    //               <p className="text-gray-500 text-sm">No certificates yet</p>
    //               <p className="text-gray-400 text-xs">Complete courses to earn certificates</p>
    //             </div>
    //           )}
    //         </div>
    //       </div>
    //     </div>

    //     {/* Quick Actions */}
    //     <div className="mt-6 sm:mt-8 grid grid-cols-2 lg:grid-cols-4 gap-4">
    //       <button className="bg-white border border-gray-200 rounded-xl p-4 sm:p-6 hover:shadow-md transition-shadow text-left group">
    //         <div className="bg-blue-50 w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center mb-3 sm:mb-4 group-hover:bg-blue-100 transition-colors">
    //           <BookOpen className="text-blue-600" size={window.innerWidth < 640 ? 20 : 24} />
    //         </div>
    //         <h3 className="font-semibold text-gray-900 mb-1 sm:mb-2 text-sm sm:text-base">Browse Courses</h3>
    //         <p className="text-xs sm:text-sm text-gray-600">Discover new learning opportunities</p>
    //       </button>

    //       <button className="bg-white border border-gray-200 rounded-xl p-4 sm:p-6 hover:shadow-md transition-shadow text-left group">
    //         <div className="bg-green-50 w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center mb-3 sm:mb-4 group-hover:bg-green-100 transition-colors">
    //           <Users className="text-green-600" size={window.innerWidth < 640 ? 20 : 24} />
    //         </div>
    //         <h3 className="font-semibold text-gray-900 mb-1 sm:mb-2 text-sm sm:text-base">Study Groups</h3>
    //         <p className="text-xs sm:text-sm text-gray-600">Join discussion forums</p>
    //       </button>

    //       <button className="bg-white border border-gray-200 rounded-xl p-4 sm:p-6 hover:shadow-md transition-shadow text-left group">
    //         <div className="bg-purple-50 w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center mb-3 sm:mb-4 group-hover:bg-purple-100 transition-colors">
    //           <Award className="text-purple-600" size={window.innerWidth < 640 ? 20 : 24} />
    //         </div>
    //         <h3 className="font-semibold text-gray-900 mb-1 sm:mb-2 text-sm sm:text-base">Achievements</h3>
    //         <p className="text-xs sm:text-sm text-gray-600">View your progress</p>
    //       </button>

    //       <button className="bg-white border border-gray-200 rounded-xl p-4 sm:p-6 hover:shadow-md transition-shadow text-left group">
    //         <div className="bg-orange-50 w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center mb-3 sm:mb-4 group-hover:bg-orange-100 transition-colors">
    //           <TrendingUp className="text-orange-600" size={window.innerWidth < 640 ? 20 : 24} />
    //         </div>
    //         <h3 className="font-semibold text-gray-900 mb-1 sm:mb-2 text-sm sm:text-base">Progress</h3>
    //         <p className="text-xs sm:text-sm text-gray-600">Track your learning</p>
    //       </button>
    //     </div>
    //   </div>
    // </div>
    <>Student Dashboard Coming Soon....</>
  );
};

export default StudentDashboard;    