import React, { useState, useContext } from 'react';
import { Mail, Lock, User, Eye, EyeOff, UserPlus, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../../api/auth';
import { AuthContext } from '../../context/AuthContext';
import {showToast} from "../../components/toast.js";


const Register = () => {
  const navigate = useNavigate();
  const { user, token, setUserContext} = useContext(AuthContext);
  const schoolId = "TOML-7B0DC9";
  const schoolObjectId ="68ce4ebb10ca5e6bb67b0dca";

  const [formData, setFormData] = useState({
    schoolId,
    schoolObjectId,
    name: '',
    email: '',
    password: '',
    role: 'student'
  })
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [acceptTerms, setAcceptTerms] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (formData.password !== confirmPassword) {
      // setError('Passwords do not match')
      showToast('Passwords do not match', "top-center", 10000, "dark");
      return
    }

    if (!acceptTerms) {
      // setError('Please accept the terms and conditions')
      showToast('Please accept the terms and conditions', "top-center", 10000, "dark");
      return
    }

    try {
      setLoading(true)
      const newUser = await registerUser(formData);
      setUserContext(newUser);
      showToast('Registration Successful', "top-center", 10000, "dark");
      navigate('/courses')        // after success go to login
    } catch (err) {
      setError(err.message || "Registration failed");
      showToast("Registration failed", "top-center", 10000, "dark");
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const roleOptions = [
    { value: 'student', label: 'Student', description: 'Learn and take courses' },
    { value: 'instructor', label: 'Instructor', description: 'Create and teach courses' },
    // { value: 'mentor', label: 'Mentor', description: 'Guide and support students' },
    { value: 'admin', label: 'Admin', description: 'Manage the platform' },
  ]

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md mx-auto bg-white rounded-2xl shadow-2xl p-6 sm:p-8 border border-gray-100">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-primary to-gray-500 rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
            <UserPlus className="text-white" size={28} />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 font-outfit">
            Create Account
          </h2>
          <p className="text-gray-600 text-sm sm:text-base font-poppins">
            Join our learning community today
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded-lg mb-4 flex items-center gap-2 font-poppins">
            <AlertCircle size={16} className="flex-shrink-0" />
            <span className="text-sm">{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
          {/* <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-subtext mb-2 font-poppins"
            >
              SchoolId
            </label>
            <div className="relative">
              <User
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-subtext"
                size={18}
              />
              <input
                type="text"
                id="schoolId"
                name="schoolId"
                value={formData.schoolId}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2.5 border border-subtext font-poppins rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                placeholder="Enter your School Id"
                required
              />
            </div>
          </div> */}
          {/* Name */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-subtext mb-2 font-poppins"
            >
              Full Name
            </label>
            <div className="relative">
              <User
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-subtext"
                size={18}
              />
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2.5 border border-subtext font-poppins rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                placeholder="Enter your full name"
                required
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-subtext font-poppins mb-2"
            >
              Email Address
            </label>
            <div className="relative">
              <Mail
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-subtext"
                size={18}
              />
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2.5 border border-subtext rounded-lg focus:ring-2 font-poppins focus:ring-primary focus:border-transparent transition-all"
                placeholder="Enter your email"
                required
              />
            </div>
          </div>

          {/* Role */}
          <div>
            <label
              htmlFor="role"
              className="block text-sm font-medium text-subtext font-poppins mb-2"
            >
              Role
            </label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full px-4 py-2.5 border border-subtext text-subtext font-poppins rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
            >
              {roleOptions.map((option) => (
                <option key={option.value} value={option.value} className="">
                  {option.label} - {option.description}
                </option>
              ))}
            </select>
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-subtext font-poppins mb-2"
            >
              Password
            </label>
            <div className="relative">
              <Lock
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-subtext"
                size={18}
              />
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full pl-10 pr-12 py-2.5 border border-subtext rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                placeholder="Create a password"
                required
                minLength={6}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-subtext hover:text-gray-500"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-subtext font-poppins mb-2"
            >
              Confirm Password
            </label>
            <div className="relative">
              <Lock
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-subtext"
                size={18}
              />
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full pl-10 pr-12 py-2.5 border border-subtext font-poppins rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                placeholder="Confirm your password"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-subtext hover:text-gray-500"
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Terms */}
          <div className="flex items-start">
            <input
              type="checkbox"
              id="acceptTerms"
              checked={acceptTerms}
              onChange={(e) => setAcceptTerms(e.target.checked)}
              className="h-4 w-4 focus:ring-primary border-gray-300 rounded mt-0.5 text-primary"
            />
            <label
              htmlFor="acceptTerms"
              className="ml-2 text-sm text-subtext font-poppins"
            >
              I agree to the{" "}
              <span className="text-primary hover:text-headcolor font-poppins font-medium">
                Terms
              </span>{" "}
              and{" "}
              <span className="text-primary hover:text-headcolor font-medium font-poppins">
                Privacy Policy
              </span>
            </label>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-primary to-gray-500 text-white py-3 rounded-lg font-medium hover:from-gray-500 hover:to-primary focus:ring-2 focus:ring-primary transition-all font-outfit"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        {/* Switch to Login */}
        <p className="mt-6 text-center text-sm text-subtext font-poppins">
          Already have an account?{" "}
          <button
            onClick={() => navigate("/login")}
            className="text-blue-600 hover:text-headcolor text-primary hover:underline font-medium font-poppins"
          >
            Sign in
          </button>
        </p>
      </div>
    </div>
  );
}

export default Register



