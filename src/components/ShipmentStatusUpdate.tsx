
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUpdateShipmentStatus } from "@/hooks/useShipments";
import { useState } from "react";

const ShipmentStatusUpdate = () => {
  const [shipmentId, setShipmentId] = useState("");
  const [newStatus, setNewStatus] = useState("");
  const updateMutation = useUpdateShipmentStatus();

  const statusOptions = [
    { value: "arrived", label: "Arrived" },
    { value: "cleared", label: "Cleared" },
    { value: "flagged", label: "Flagged" },
    { value: "rejected", label: "Rejected" },
    { value: "in_storage", label: "In Storage" },
    { value: "in_transit", label: "In Transit" },
    { value: "delivered", label: "Delivered" }
  ];

  const handleUpdateStatus = () => {
    if (!shipmentId || !newStatus) return;
    
    updateMutation.mutate({ 
      shipmentId, 
      status: newStatus 
    });
    
    // Reset form
    setShipmentId("");
    setNewStatus("");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Update Shipment Status</CardTitle>
        <CardDescription>Change the status of a shipment (triggers email notification)</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="shipmentId">Shipment ID</Label>
          <Input
            id="shipmentId"
            placeholder="Enter shipment ID"
            value={shipmentId}
            onChange={(e) => setShipmentId(e.target.value)}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="status">New Status</Label>
          <Select value={newStatus} onValueChange={setNewStatus}>
            <SelectTrigger>
              <SelectValue placeholder="Select new status" />
            </SelectTrigger>
            <SelectContent>
              {statusOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <Button 
          onClick={handleUpdateStatus}
          disabled={!shipmentId || !newStatus || updateMutation.isPending}
          className="w-full"
        >
          {updateMutation.isPending ? "Updating..." : "Update Status"}
        </Button>
      </CardContent>
    </Card>
  );
};

export default ShipmentStatusUpdate;
