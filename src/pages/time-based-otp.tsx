import { useState } from "react";
import QRCode from "react-qr-code";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import totp from "@/lib/totp";
import { useCountdown } from "@/hooks/useCountdown";
import SEO from "@/components/ui/seo";
import Header from "@/components/layout/header";

const TimeBasedOTP = () => {
  const [secret, setSecret] = useState<string>("");
  const [totpURL, setTotpURL] = useState<string>("");
  const [serverOTP, setServerOTP] = useState<string>("");
  const [isVerified, setIsVerified] = useState<boolean>(false);

  const { count, startCounter } = useCountdown({
    initialCount: 30,
    syncToTOTP: true,
    onComplete: async () => {
      const nextOTP = await totp.getCurrentOTP(secret);
      setServerOTP(nextOTP);
    },
  });

  const handleGenerateQR = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const username = formData.get("username") as string;

    const secretKey = totp.generateSecret();
    const totpURL = totp.generateTOTPURL({
      username,
      secret: secretKey,
      issuer: "Demo-TOTP-App",
    });

    const serverOTP = await totp.getCurrentOTP(secretKey);
    startCounter();
    setSecret(secretKey);
    setTotpURL(totpURL);
    setServerOTP(serverOTP);
    setIsVerified(false);
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const otp = formData.get("otp") as string;

    const isValid = await totp.verifyOTP(secret, otp);
    setIsVerified(isValid);
  };

  return (
    <>
      <SEO
        title="Time based OTP Demo"
        description="Demo application for Time based One-Time Password (TOTP) generation and verification."
      />

      <Header subpage="Time-base OTP (TOTP)" />

      <div className="space-y-8">
        <p>
          Time-based One-Time Password (TOTP) is a temporary passcode generated
          by an algorithm that uses the current time as one of its factors. It
          is commonly used for two-factor authentication (2FA) to enhance
          security.
        </p>

        <div>
          <p className="text-lg font-serif font-medium mb-3 mt-6">
            1. Generate TOTP QR Code
          </p>
          <p>Fill in the username and generate a QR code.</p>

          <Form onSubmit={handleGenerateQR} className="mt-4">
            <Field>
              <FieldLabel>Username</FieldLabel>
              <Input
                type="text"
                name="username"
                placeholder="johndoe"
                required
              />
              <FieldError>Please enter a username.</FieldError>
            </Field>

            <Button type="submit" className="w-full">
              Generate QR Code
            </Button>
          </Form>
        </div>

        <div>
          <p className="text-lg font-serif font-medium mb-3 mt-6">
            2. QR Code & Secret
          </p>
          <p>
            Scan the generated QR code with your authenticator app (e.g., Google
            Authenticator, Microsoft Authenticator) to add the TOTP account.
          </p>
          <div className="space-y-4 mt-4">
            <div className="mx-auto size-40 border rounded-xl flex items-center justify-center shadow-xs">
              {totpURL ? (
                <QRCode value={totpURL} size={128} className="mx-auto" />
              ) : null}
            </div>
            <div className="space-y-1.5">
              <p className="text-xs font-medium">Secret</p>
              <Input type="text" readOnly defaultValue={secret} />
            </div>
          </div>
        </div>

        <div>
          <p className="text-lg font-serif font-medium mb-3 mt-6">
            3. Verify OTP
          </p>
          <p>Enter the OTP from your authenticator app to verify.</p>

          <Form onSubmit={handleVerifyOTP} className="mt-4">
            <Field>
              <FieldLabel>OTP</FieldLabel>
              <Input type="text" name="otp" placeholder="123456" required />
              <FieldError>Please enter a valid OTP.</FieldError>
              {isVerified ? (
                <p className="text-xs font-medium text-green-600">
                  OTP is valid!
                </p>
              ) : null}
            </Field>

            <Button type="submit" className="w-full">
              Verify OTP
            </Button>
          </Form>
        </div>

        <div>
          <p className="text-lg font-serif font-medium mb-3 mt-6">
            4. Server OTP
          </p>
          <p>
            This is the OTP generated on the server side, which should match the
            OTP from your authenticator app.
          </p>
          <div className="flex items-center justify-center relative mt-4">
            <div className="bg-zinc-100 font-mono border rounded-md px-3 py-1.5">
              <p className="text-2xl">
                {serverOTP ? (
                  <span>{serverOTP}</span>
                ) : (
                  <span className="text-zinc-600">000000</span>
                )}
              </p>
            </div>
            <p className="text-sm font-mono font-medium absolute right-0">
              {count}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default TimeBasedOTP;
