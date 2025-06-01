
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface EmailRequest {
  to: string;
  subject: string;
  shipmentNumber: string;
  status: string;
  customerName: string;
}

const getEmailTemplate = (shipmentNumber: string, status: string, customerName: string) => {
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
          
          <p>Dear ${customerName},</p>
          
          <p>We have an update on your shipment:</p>
          
          <div style="background: #eff6ff; padding: 20px; border-radius: 6px; margin: 20px 0; border-left: 4px solid #2563eb;">
            <p style="margin: 0;"><strong>Shipment Number:</strong> ${shipmentNumber}</p>
            <p style="margin: 10px 0 0 0;"><strong>New Status:</strong> <span style="color: #2563eb; font-weight: bold; text-transform: capitalize;">${status.replace('_', ' ')}</span></p>
          </div>
          
          <p>${statusMessages[status as keyof typeof statusMessages] || 'Your shipment status has been updated.'}</p>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${Deno.env.get("SITE_URL") || 'https://trackport.com'}" 
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
    const { to, subject, shipmentNumber, status, customerName }: EmailRequest = await req.json();

    // Initialize Supabase client for sending emails via SMTP
    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    // Use Supabase's built-in email functionality
    // This will use your SMTP credentials configured in Supabase
    const emailResponse = await fetch(`${Deno.env.get("SUPABASE_URL")}/functions/v1/send-email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")}`,
      },
      body: JSON.stringify({
        to: [to],
        subject: subject,
        html: getEmailTemplate(shipmentNumber, status, customerName),
        from: "TrackPort <notifications@trackport.com>",
      }),
    });

    if (!emailResponse.ok) {
      throw new Error(`Email service error: ${emailResponse.statusText}`);
    }

    const result = await emailResponse.json();
    console.log("Email sent successfully:", result);

    return new Response(JSON.stringify(result), {
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
