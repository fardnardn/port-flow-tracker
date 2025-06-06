
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';

export interface Profile {
  id: string;
  full_name: string | null;
  company: string | null;
  role: 'customer' | 'driver' | 'port_staff' | 'customs' | 'admin';
  email: string | null;
  created_at: string;
  updated_at: string;
}

export const useProfile = () => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['profile', user?.id],
    queryFn: async () => {
      if (!user) {
        console.log('No user found, returning null');
        return null;
      }
      
      console.log('Fetching profile for user:', user.id);
      
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .maybeSingle();

      if (error) {
        console.error('Supabase error fetching profile:', error);
        throw error;
      }

      if (!data) {
        console.log('No profile found for user:', user.id);
        // Try to create a profile for this user
        const { data: newProfile, error: createError } = await supabase
          .from('profiles')
          .insert({
            id: user.id,
            full_name: user.user_metadata?.full_name || 'User',
            company: user.user_metadata?.company || '',
            role: user.user_metadata?.role || 'customer',
            // email: user.email || '',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          })
          .select()
          .single();

        if (createError) {
          console.error('Error creating profile:', createError);
          throw createError;
        }

        console.log('Created new profile:', newProfile);
        return newProfile as Profile;
      }

      console.log('Profile data:', data);
      return data as Profile;
    },
    enabled: !!user,
    retry: 2,
    retryDelay: 1000,
  });
};
