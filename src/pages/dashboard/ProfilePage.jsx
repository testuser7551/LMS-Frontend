import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import {
  User,
  Edit,
  BookOpen,
  Award,
  Trophy,
  Target,
  Users,
  Activity,
  Settings,
  Moon,
  Bell,
  Zap,
  Lock,
  Mail,
  Phone,
  Calendar,
  Star,
  Medal,
  Crown,
  Shield,
  Flame,
} from "lucide-react";
import EditProfileModal from "./EditProfileModal";

const ProfilePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const cardAnimation = isLoaded
    ? "animate-fade-in"
    : "opacity-0 translate-y-4";
  const { user } = useContext(AuthContext);

  return (
    <div className="min-h-screen bg-white font-['Poppins'] p-4 sm:p-6 lg:p-8 text-black">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header Section */}
        <div
          className={`bg-white  rounded-xl shadow-sm p-6 sm:p-8 transition-all duration-700 ${cardAnimation}`}
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 sm:w-20 sm:h-20  rounded-full flex items-center justify-center">
                <User className="w-8 h-8 sm:w-10 sm:h-10 text-black" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-black">
                {user?.name}
                </h1>
                <p className="text-black text-sm sm:text-base">
                  Professional Tennis Player
                </p>
                <p className="text-black text-sm font-medium">
                  Elite Level • 5 years experience
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-black text-white px-6 py-2.5 rounded-lg font-medium transition-all duration-200 hover:scale-105 hover:shadow-lg flex items-center space-x-2"
            >
              <Edit className="w-4 h-4" />
              <span>Edit Profile</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Course Progress */}
            <div
              className={`bg-white  rounded-xl shadow-sm p-6 transition-all duration-700 delay-100 ${cardAnimation}`}
            >
              <div className="flex items-center space-x-2 mb-6">
                <BookOpen className="w-6 h-6 text-black" />
                <h2 className="text-xl font-semibold text-black">
                  Course Progress
                </h2>
              </div>

              <div className="space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium text-black">
                      Overall Progress
                    </span>
                    <span className="text-black font-semibold">78%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-black h-3 rounded-full"
                      style={{ width: "78%" }}
                    ></div>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium text-black mb-3">
                    Ongoing Courses
                  </h3>
                  <div className="space-y-3">
                    {[
                      {
                        name: "Advanced Tennis Techniques",
                        progress: 65,
                      },
                      {
                        name: "Sports Psychology",
                        progress: 45,
                      },
                      {
                        name: "Fitness & Conditioning",
                        progress: 82,
                      },
                    ].map((course, index) => (
                      <div
                        key={index}
                        className="bg-gray-50 p-4 rounded-lg "
                      >
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-black font-medium">
                            {course.name}
                          </span>
                          <span className="text-sm font-semibold text-black">
                            {course.progress}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-black h-2 rounded-full"
                            style={{ width: `${course.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-medium text-black mb-3">
                    Completed Courses
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      "Tennis Fundamentals",
                      "Match Strategy",
                      "Equipment Mastery",
                      "Mental Training",
                    ].map((course, index) => (
                      <div
                        key={index}
                        className="flex items-center space-x-3 bg-gray-100 p-3 rounded-lg "
                      >
                        <Award className="w-5 h-5 text-black" />
                        <span className="text-black font-medium">
                          {course}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Achievements */}
              {/* Achievements & Badges */}
              <div className={`bg-white rounded-xl shadow-sm p-6 transition-all duration-700 delay-200 ${cardAnimation}`}>
              <div className="flex items-center space-x-2 mb-6">
                <Trophy className="w-6 h-6 text-yellow-600" />
                <h2 className="text-xl font-semibold text-black">Achievements & Badges</h2>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { icon: Trophy, name: 'Top Scorer', subtitle: 'Earned 3 times' },
                  { icon: Target, name: 'Endurance Master', subtitle: '100+ hours' },
                  { icon: Users, name: 'Team Player', subtitle: '5 challenges' },
                  { icon: Star, name: 'High Performer', subtitle: '90%+ average' }
                ].map((achievement, index) => (
                  <div key={index} className="text-center p-4 bg-white border border-gray-200 rounded-lg hover:shadow-lg transition-all duration-200 hover:scale-105 cursor-pointer">
                    <div className="w-12 h-12 mx-auto bg-gray-200 rounded-full flex items-center justify-center mb-3">
                      <achievement.icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-sm font-semibold text-black mb-1">{achievement.name}</h3>
                    <p className="text-xs text-gray-600">{achievement.subtitle}</p>
                  </div>
                ))}
              </div>
            </div>
             {/* Sports Stats */}
             <div
              className={`bg-white  rounded-xl shadow-sm p-6 transition-all duration-700 delay-400 ${cardAnimation}`}
            >
              <div className="flex items-center space-x-2 mb-6">
                <Activity className="w-6 h-6 text-black" />
                <h2 className="text-xl font-semibold text-black">
                  Sports Statistics
                </h2>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-4 gap-4">
                  {[
                    { label: "Total Courses", value: "15" },
                    { label: "Completed", value: "5" },
                    { label: "Mentors", value: "3" },
                    { label: "Instructor", value: "7" },
                  ].map((stat, index) => (
                    <div
                      key={index}
                      className="text-center p-3  rounded-lg"
                    >
                      <p className="text-2xl font-bold text-black">{stat.value}</p>
                      <p className="text-sm text-black">{stat.label}</p>
                    </div>
                  ))}
                </div>

                <div>
  <h3 className="font-medium text-black mb-3">Current Teams</h3>
  <div className="flex gap-2 flex-wrap ">
    {["Thunder Hawks", "City Champions", "Elite Squad"].map(
      (team, index) => (
        <div
          key={index}
          className="flex items-center space-x-3 p-2 bg-gray-200 rounded-full"
        >
          <Users className="w-4 h-4 text-black" />
          <span className="text-black font-medium">{team}</span>
        </div>
      )
    )}
  </div>
</div>

              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Personal Info */}
            <div
              className={`bg-white  rounded-xl shadow-sm p-6 transition-all duration-700 delay-300 ${cardAnimation}`}
            >
              <div className="flex items-center space-x-2 mb-6">
                <User className="w-6 h-6 text-black" />
                <h2 className="text-xl font-semibold text-black">
                  Personal Information
                </h2>
              </div>

              <div className="space-y-4">
                {[
                  { icon: User, label: "Full Name", value: "Alex Rodriguez" },
                  { icon: Calendar, label: "Date of Birth", value: "March 15, 1995" },
                  { icon: Target, label: "Focus", value: "Tennis" },
                  { icon: Mail, label: "Email", value: "alex.rodriguez@email.com" },
                  { icon: Phone, label: "Phone", value: "+1 (555) 123-4567" },
                  { icon: Phone, label: "Emergency Contact", value: "+1 (555) 987-6543" },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    <item.icon className="w-5 h-5 text-black" />
                    <div>
                      <p className="text-sm text-black">{item.label}</p>
                      <p className="font-medium text-black">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

           

            {/* Account Settings */}
            <div
              className={`bg-white  rounded-xl shadow-sm p-6 transition-all duration-700 delay-500 ${cardAnimation}`}
            >
              <div className="flex items-center space-x-2 mb-6">
                <Settings className="w-6 h-6 text-black" />
                <h2 className="text-xl font-semibold text-black">
                  Account Settings
                </h2>
              </div>

              <div className="space-y-4">
                {[
                  { icon: Bell, label: "Email Notifications", enabled: false },
                  { icon: Zap, label: "Training Reminders", enabled: true },
                ].map((setting, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <setting.icon className="w-5 h-5 text-black" />
                      <span className="font-medium text-black">
                        {setting.label}
                      </span>
                    </div>
                    <div
                      className={`w-12 h-6 ${
                        setting.enabled ? "bg-black" : "bg-gray-300"
                      } rounded-full relative cursor-pointer transition-colors`}
                    >
                      <div
                        className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${
                          setting.enabled ? "translate-x-6" : "translate-x-0.5"
                        }`}
                      ></div>
                    </div>
                  </div>
                ))}

                <button className="w-full flex items-center justify-center space-x-2 p-3 border-2 border-black rounded-lg hover:shadow-md  transition-all duration-200">
                  <Lock className="w-5 h-5 text-black" />
                  <span className="font-medium text-black">Change Password</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      <EditProfileModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default ProfilePage;
