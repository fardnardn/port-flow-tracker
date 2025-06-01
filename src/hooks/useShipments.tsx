
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
      
      const { data, error } = await supabase
        .from('shipments')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
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
      const { data, error } = await supabase
        .from('shipments')
        .update({ 
          status,
          updated_at: new Date().toISOString()
        })
        .eq('id', shipmentId)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['shipments'] });
      toast({
        title: "Status Updated",
        description: `Shipment ${data.shipment_number} status updated to ${data.status}`,
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to update shipment status",
        variant: "destructive",
      });
    },
  });
};
