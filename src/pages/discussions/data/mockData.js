// src/data/mockData.js

export const currentUser = {
  id: "1",
  name: "Sarah Johnson",
  email: "sarah.johnson@university.edu",
  avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?w=150",
  role: "student",
  group: "Group A",
};

export const users = [
  currentUser,
  {
    id: "2",
    name: "Dr. Michael Chen",
    email: "michael.chen@university.edu",
    avatar: "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?w=150",
    role: "instructor",
  },
  {
    id: "3",
    name: "Emily Rodriguez",
    email: "emily.rodriguez@university.edu",
    avatar: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?w=150",
    role: "student",
    group: "Group B",
  },
  {
    id: "4",
    name: "Admin User",
    email: "admin@university.edu",
    avatar: "https://images.pexels.com/photos/1680172/pexels-photo-1680172.jpeg?w=150",
    role: "admin",
  },
];

export const forums = [
  {
    id: "1",
    name: "General Sports Talk",
    description: "Discuss trending sports topics",
    threadCount: 24,
    icon: "MessageSquare",
    color: "bg-blue-500",
  },
  {
    id: "2",
    name: "Match Analysis",
    description: "Post-match reviews and strategies",
    threadCount: 12,
    icon: "BookOpen",
    color: "bg-green-500",
  },
  {
    id: "3",
    name: "Training & Fitness",
    description: "Tips, workouts, and recovery discussions",
    threadCount: 18,
    icon: "HelpCircle",
    color: "bg-purple-500",
  },
  {
    id: "4",
    name: "Transfers & Rumors",
    description: "Latest player transfers and rumors",
    threadCount: 8,
    icon: "FolderOpen",
    color: "bg-orange-500",
  },
];

export const threads = [
  {
    id: "1",
    title: "Championship Final: Predictions?",
    content:
      "<p>The big final is coming up this weekend! Who do you think will take the trophy? Let's discuss key players and tactics.</p>",
    author: users[1], // Dr. Michael Chen
    forumId: "1",
    createdAt: "2025-01-20T10:30:00Z",
    updatedAt: "2025-01-20T14:45:00Z",
    replyCount: 8,
    likes: 12,
    isLiked: true,
    availableFrom: "2025-01-20T00:00:00Z",
    availableTo: "2025-02-20T23:59:59Z",
    isPinned: true,
    tags: ["final", "predictions"],
    grade: 0,
    maxGrade: 10,
  },
  {
    id: "2",
    title: "Group A: Training Plan for Next Match",
    content:
      "<p>Players of Team A, please share your ideas for drills and training focus this week. Fitness and teamwork are key!</p>",
    author: users[0], // Sarah Johnson
    forumId: "2",
    createdAt: "2025-01-19T09:15:00Z",
    updatedAt: "2025-01-20T11:20:00Z",
    replyCount: 5,
    likes: 7,
    isLiked: false,
    group: "Group A",
    availableFrom: "2025-01-19T00:00:00Z",
    availableTo: "2025-03-01T23:59:59Z",
    isPinned: false,
    tags: ["training", "strategy"],
  },
  {
    id: "3",
    title: "Transfer Rumor: Star Striker Moving?",
    content:
      "<p>There are reports that our star striker might transfer to another club. Do you think it’s true? How will it affect the team?</p>",
    author: users[2], // Emily Rodriguez
    forumId: "3",
    createdAt: "2025-01-18T16:00:00Z",
    updatedAt: "2025-01-19T08:30:00Z",
    replyCount: 3,
    likes: 4,
    isLiked: false,
    isPinned: false,
    tags: ["transfer", "rumors"],
  },
];

export const replies = [
  {
    id: "1",
    content:
       "<p>I think Team A has the stronger defense, but Team B’s midfield could dominate. It will be a close final!</p>",
    author: users[0],
    threadId: "1",
    createdAt: "2025-01-20T11:00:00Z",
    likes: 5,
    isLiked: true,
    grade: 8,
    maxGrade: 10,
  },
  {
    id: "2",
    content:
     "<p>We should focus more on stamina training. Our players were visibly tired in the last 20 minutes of the game.</p>",
    author: users[0],
    author: users[0],
    threadId: "2",
    createdAt: "2025-01-19T10:30:00Z",
    likes: 3,
    isLiked: false,
  },
];

export const notifications = [
  {
    id: "1",
    type: "reply",
    title: "New Reply",
    message:
      'Dr. Michael Chen replied to "Championship Final: Predictions?"',
    createdAt: "2025-01-20T14:45:00Z",
    isRead: false,
    threadId: "1",
    userId: "2",
  },
  {
    id: "2",
    type: "grade",
    title: "Grade Assigned",
    message: "You received 8/10 points for your analysis",
    createdAt: "2025-01-20T13:30:00Z",
    isRead: false,
    threadId: "1",
    userId: "1",
  },
  {
    id: "3",
    type: "mention",
    title: "You were mentioned",
    message: 'Emily Rodriguez mentioned you in "Transfer Rumor"',
    createdAt: "2025-01-20T12:00:00Z",
    isRead: true,
    threadId: "3",
    userId: "2",
  },
];
