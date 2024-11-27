import { Toaster } from "react-hot-toast";

import GoogleCaptchaWrapper from "@/components/GoogleCaptchaWrapper";

export default function JOINLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <GoogleCaptchaWrapper>
      <Toaster />
      {children}
    </GoogleCaptchaWrapper>
  );
}
