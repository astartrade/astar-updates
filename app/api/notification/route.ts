import { NextResponse, NextRequest } from "next/server";
// import nodemailer from 'nodemailer';

const nodemailer = require("nodemailer");

export async function GET() {
  return NextResponse.json(
    {
      message: ".....",
    },
    { status: 200 },
  );
}

// Handles POST requests to /api/notification
export async function POST(req: NextRequest) {
  const { REAL_EMAIL_PASSWORD, NEXT_PUBLIC_FROM_EMAIL, API_SECRET_TOKEN } =
    process.env;

  if (!REAL_EMAIL_PASSWORD || !NEXT_PUBLIC_FROM_EMAIL || !API_SECRET_TOKEN) {
    return NextResponse.json(
      { error: "Environment variables are not set" },
      { status: 500 },
    );
  }

  const messageData = await req.json();

  // console.log("REQUEST DATA", messageData);

  if (!messageData.name || !messageData.email || !messageData.message) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 },
    );
  }

  const currentYear = new Date().getFullYear();

  const emailTemplate = `
       <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Template</title>
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
</head>
<body style="font-size:12px;font-weight:500;line-height:16px" class="bg-gray-100 dark:bg-gray-900 text-[12px]">
    <section class="max-w-2xl px-6 py-8 mx-auto bg-white dark:bg-gray-900">


        <main class="mt-8">
            <h2 class="text-gray-700 dark:text-gray-200">Enquiries from Website</h2>


             <p class="mt-2 leading-loose text-gray-600 dark:text-gray-300">
           ${messageData.message}
            </p>

            <p class="mt-4 text-gray-600 dark:text-gray-300">
               ${messageData.email}
            </p>

            <p class="mt-8 text-gray-600 dark:text-gray-300">
                Best regards, <br>
                 ${messageData.name}
            </p>
        </main>
        
        <footer class="mt-16  ">

           

        </footer>
    </section>
</body>
</html>

      `;
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 2525,
    auth: {
      user: "astar.trade9@gmail.com",
      pass: REAL_EMAIL_PASSWORD,
    },
  });


  try {
    await transporter.sendMail({
      from: `"ASTAR TRADING - CONTACT FORM" <${NEXT_PUBLIC_FROM_EMAIL}>`,
      to: `info@astar-trading.com`,
      replyTo: NEXT_PUBLIC_FROM_EMAIL,
      subject: `Enquiry Form`,
      html: emailTemplate,
    });
    console.log("Email sent successfully");

    return NextResponse.json(
      { message: "Success: email was sent" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error sending email:", error);

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
