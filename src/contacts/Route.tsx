import { lazy } from 'react';

// Import all your components
import Login from '../pages/auth/Login';
import Signup from '../pages/auth/SignUp';
import Dashboard from '../components/Dashboard';
import Mytask from '../components/Mytask';
import Project from '../components/Project';
import AIAssistant from '../components/AIAssistant';
import Reports from '../components/Reports';
import Profile from '../pages/Profile';
import Settings from '../pages/Settings';
import TaskDetail from '../pages/TaskDetail';
import Maintenance from '../pages/Maintenance';
import Integrations from '../pages/Integrations';

// Route constants - useful for navigation
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  SIGNUP: '/signup',
  MY_TASKS: '/my-tasks',
  PROJECTS: '/projects',
  AI_ASSISTANT: '/ai-assistant',
  REPORTS: '/reports',
  PROFILE_EDIT: '/profile/edit',
  SETTINGS: '/settings',
  SETTINGS: '/settings',
  TASK_DETAIL: '/details',
  MAINTENANCE: '/maintenance',
  INTEGRATIONS: '/integrations'
};

// Route configuration array
export const routeConfig = [
  {
    path: ROUTES.HOME,
    element: <Dashboard />,
    label: 'Dashboard',
    isProtected: true // Add this for future auth implementation
  },
  {
    path: ROUTES.LOGIN,
    element: <Login />,
    label: 'Login',
    isProtected: false
  },
  {
    path: ROUTES.SIGNUP,
    element: <Signup />,
    label: 'Sign Up',
    isProtected: false
  },
  {
    path: ROUTES.MY_TASKS,
    element: <Mytask />,
    label: 'My Tasks',
    isProtected: true
  },
  {
    path: ROUTES.PROJECTS,
    element: <Project />,
    label: 'Projects',
    isProtected: true
  },
  {
    path: ROUTES.AI_ASSISTANT,
    element: <AIAssistant />,
    label: 'AI Assistant',
    isProtected: true
  },
  {
    path: ROUTES.REPORTS,
    element: <Reports />,
    label: 'Reports',
    isProtected: true
  },
  {
    path: ROUTES.PROFILE_EDIT,
    element: <Profile />,
    label: 'Edit Profile',
    isProtected: true
  },
  {
    path: ROUTES.SETTINGS,
    element: <Settings />,
    label: 'Settings',
    isProtected: true
  },
  {
    path: ROUTES.TASK_DETAIL,
    element: <TaskDetail />,
    label: 'Task Details',
    isProtected: true
  },
  {
    path: ROUTES.MAINTENANCE,
    element: <Maintenance />,
    label: 'Maintenance',
    isProtected: false
  },
  {
    path: ROUTES.INTEGRATIONS,
    element: <Integrations />,
    label: 'Integrations',
    isProtected: true
  }
];

// Optional: Group routes by category for better organization
export const routeGroups = {
  AUTH: [
    ROUTES.LOGIN,
    ROUTES.SIGNUP
  ],
  MAIN: [
    ROUTES.HOME,
    ROUTES.MY_TASKS,
    ROUTES.PROJECTS,
    ROUTES.AI_ASSISTANT,
    ROUTES.REPORTS
  ],
  USER: [
    ROUTES.PROFILE_EDIT,
    ROUTES.SETTINGS
  ]
};