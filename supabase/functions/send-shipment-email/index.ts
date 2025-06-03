
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface EmailRequest {
  shipment_id: string;
  shipment_number: string;
  old_status: string;
  new_status: string;
  customer_email: string;
}

const getEmailTemplate = (shipmentNumber: string, oldStatus: string, newStatus: string) => {
  const statusMessages = {
    arrived: "Your shipment has arrived at TrackPort and is being processed.",
    cleared: "Your shipment has successfully cleared customs and is ready for next steps.",
    flagged: "Your shipment requires additional documentation. Please contact our support team.",
    rejected: "Your shipment was rejected by customs. Please contact support for assistance.",
    in_storage: "Your shipment is now securely stored at our port facility.",
    in_transit: "Your shipment is on the way! Your driver will contact you with delivery details.",
    delivered: "Your shipment has been successfully delivered. Thank you for choosing TrackPort!"
  };

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>TrackPort - Shipment Update</title>
    </head>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="background: #f8f9fa; padding: 20px; border-radius: 10px;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #2563eb; margin: 0;">🚢 TrackPort</h1>
          <p style="color: #6b7280; margin: 5px 0;">Port Shipment Management</p>
        </div>
        
        <div style="background: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          <h2 style="color: #1f2937; margin-top: 0;">Shipment Status Update</h2>
          
          <p>Dear Customer,</p>
          
          <p>We have an update on your shipment:</p>
          
          <div style="background: #eff6ff; padding: 20px; border-radius: 6px; margin: 20px 0; border-left: 4px solid #2563eb;">
            <p style="margin: 0;"><strong>Shipment Number:</strong> ${shipmentNumber}</p>
            <p style="margin: 10px 0;"><strong>Previous Status:</strong> <span style="text-transform: capitalize;">${oldStatus.replace('_', ' ')}</span></p>
            <p style="margin: 10px 0 0 0;"><strong>New Status:</strong> <span style="color: #2563eb; font-weight: bold; text-transform: capitalize;">${newStatus.replace('_', ' ')}</span></p>
          </div>
          
          <p>${statusMessages[newStatus as keyof typeof statusMessages] || 'Your shipment status has been updated.'}</p>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="https://bpedxafynasznabadyib.supabase.co" 
               style="background: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
              Track Your Shipment
            </a>
          </div>
          
          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">
          
          <p style="color: #6b7280; font-size: 14px;">
            If you have any questions, please contact our support team at support@trackport.com
          </p>
          
          <p style="color: #6b7280; font-size: 14px;">
            Best regards,<br>
            The TrackPort Team
          </p>
        </div>
      </div>
    </body>
    </html>
  `;
};

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { shipment_id, shipment_number, old_status, new_status, customer_email }: EmailRequest = await req.json();

    console.log('Sending email for shipment status change:', {
      shipment_id,
      shipment_number,
      old_status,
      new_status,
      customer_email
    });

    // Use Supabase's built-in SMTP functionality (configured in dashboard)
    const emailHtml = getEmailTemplate(shipment_number, old_status, new_status);
    
    // For now, we'll log the email content since SMTP needs to be configured
    console.log('Email content prepared for:', customer_email);
    console.log('Email HTML:', emailHtml);

    // TODO: Configure SMTP settings in Supabase Dashboard > Authentication > SMTP Settings
    // Once configured, you can send emails using the Supabase admin API

    return new Response(JSON.stringify({ 
      success: true, 
      message: 'Email notification logged. Configure SMTP in Supabase dashboard to send emails.' 
    }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-shipment-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
