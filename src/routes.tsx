import { lazy, Suspense } from 'react';
import { RouteObject } from 'react-router-dom';
import LoadingSpinner from './components/LoadingSpinner/LoadingSpinner';

// Lazy-loaded components
const Home = lazy(() => import('./views/Home'));
const About = lazy(() => import('./views/Profile'));
const NotFound = lazy(() => import('./views/NotFound'));
const Post = lazy(() => import('./views/Post')); // New Post View

const routes: RouteObject[] = [
  {
    path: '/',
    element: (
      <Suspense fallback={<LoadingSpinner />}>
        <Home />
      </Suspense>
    ),
  },
  {
    path: '/post/:postId', // Dynamic route for post details
    element: (
      <Suspense fallback={<LoadingSpinner />}>
        <Post />
      </Suspense>
    ),
  },
  {
    path: '/profile',
    element: (
      <Suspense fallback={<LoadingSpinner />}>
        <About />
      </Suspense>
    ),
  },
  {
    path: '*',
    element: (
      <Suspense fallback={<LoadingSpinner />}>
        <NotFound />
      </Suspense>
    ),
  },
];

export default routes;
