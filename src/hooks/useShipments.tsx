
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { useToast } from '@/hooks/use-toast';

export interface Shipment {
  id: string;
  customer_id: string;
  driver_id?: string;
  shipment_number: string;
  status: string;
  description: string;
  arrival_date: string;
  storage_location?: string;
  shipping_company?: string;
  delivery_address?: string;
  created_at: string;
  updated_at: string;
}

export const useShipments = () => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['shipments', user?.id],
    queryFn: async () => {
      if (!user) return [];
      
      console.log('Fetching shipments for user:', user.id);
      
      const { data, error } = await supabase
        .from('shipments')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching shipments:', error);
        throw error;
      }
      
      console.log('Fetched shipments:', data);
      return data as Shipment[];
    },
    enabled: !!user,
  });
};

export const useUpdateShipmentStatus = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ shipmentId, status }: { shipmentId: string; status: string }) => {
      console.log('Updating shipment status:', { shipmentId, status });
      
      const { data, error } = await supabase
        .from('shipments')
        .update({ 
          status,
          updated_at: new Date().toISOString()
        })
        .eq('id', shipmentId)
        .select()
        .single();

      if (error) {
        console.error('Error updating shipment status:', error);
        throw error;
      }
      
      console.log('Updated shipment:', data);
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['shipments'] });
      toast({
        title: "Status Updated",
        description: `Shipment ${data.shipment_number} status updated to ${data.status.replace('_', ' ')}`,
      });
    },
    onError: (error: any) => {
      console.error('Mutation error:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to update shipment status",
        variant: "destructive",
      });
    },
  });
};
