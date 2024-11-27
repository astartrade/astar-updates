import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: NextRequest) {
  const { firstname, lastname, email } = await req.json();

  // console.log(`Creating contact for: ${firstname} ${lastname} (${email})`);

  try {
    // Brevo API endpoint to create a contact
    const url = "https://api.brevo.com/v3/contacts";

    // Your Brevo API Key
    const apiKey = process.env.BREVO_API_KEY;

    if (!apiKey) {
      throw new Error("Brevo API key is not defined in environment variables.");
    }

    // API request payload
    const data = {
      email,
      attributes: {
        FIRSTNAME: firstname,
        LASTNAME: lastname,
      },
      updateEnabled: true,
    };

    // API request headers
    const headers = {
      "Content-Type": "application/json",
      "api-key": apiKey,
    };

    // Send POST request to Brevo
    const response = await axios.post(url, data, { headers });

    // Log the response for debugging
    // console.log("Brevo Response:", response.data);

    return NextResponse.json(
      { message: "Success: Contact created in Brevo" },
      { status: 200 },
    );
  } catch (error: any) {
    console.error(
      "Error creating contact:",
      error?.response?.data || error.message,
    );

    return NextResponse.json(
      { message: `Error: ${error?.response?.data?.message || error.message}` },
      { status: 500 },
    );
  }
}
