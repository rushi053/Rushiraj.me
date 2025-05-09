'use client';

import { 
  createContext, 
  useContext, 
  useState, 
  useEffect, 
  ReactNode 
} from 'react';
import { supabase } from '@/lib/supabase';
import { Session, User } from '@supabase/supabase-js';
import { useRouter, usePathname } from 'next/navigation';

// Define the context type
type AuthContextType = {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signOut: () => Promise<void>;
};

// Create the context with a default value
const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  loading: true,
  signOut: async () => {},
});

// Custom hook to use the auth context
export const useAuth = () => useContext(AuthContext);

// Provider component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Get the current session when the component mounts
    const getSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (error) {
        console.error('Error getting session:', error.message);
      } else {
        setSession(data.session);
        setUser(data.session?.user || null);
      }
      setLoading(false);
    };

    getSession();

    // Set up a listener for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, currentSession) => {
        setSession(currentSession);
        setUser(currentSession?.user || null);
        setLoading(false);
      }
    );

    // Cleanup function to remove the listener
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Protected route logic - redirect to login if not authenticated on admin pages
  useEffect(() => {
    if (!loading && !user && pathname?.startsWith('/admin') && pathname !== '/admin/login') {
      router.push('/admin/login');
    }
  }, [loading, user, pathname, router]);

  // Sign out function
  const signOut = async () => {
    await supabase.auth.signOut();
    router.push('/admin/login');
  };

  // Context value
  const value = {
    user,
    session,
    loading,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}; 