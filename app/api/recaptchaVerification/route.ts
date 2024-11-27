import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: NextRequest) {
  // console.log("REQUESTING VERIFICATION USING AXIOS");

  const { token } = await req.json();

  const secretKey = process.env.RECAPTCHA_SECRET_KEY;

  if (!secretKey) {
    return NextResponse.json({
      success: false,
      error: "RECAPTCHA_SECRET_KEY is not defined",
    });
  }

  const params = new URLSearchParams();

  params.append("secret", secretKey);
  params.append("response", token);

  try {
    const response = await axios.post(
      `https://www.google.com/recaptcha/api/siteverify`,
      params,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      },
    );

    const data = response.data;

    if (data.success) {
      // console.log(data);
      return NextResponse.json({ status: 200 });
    } else {
      return NextResponse.json({
        success: false,
        error: "Verification failed",
      });
    }
  } catch (error) {
    console.error("Error:", error);

    let errorMessage = "An unknown error occurred";

    if (axios.isAxiosError(error) && error.response) {
      errorMessage = error.response.data.error || error.message;
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }

    return NextResponse.json({ success: false, error: errorMessage });
  }
}
