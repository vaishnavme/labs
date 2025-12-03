import React from "react";
import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };

    console.log("Form Data:", data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-96">
        <CardHeader className="text-left">
          <CardTitle>Sign In</CardTitle>
          <CardDescription>
            Enter your email and password to access your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form onSubmit={handleSubmit}>
            <Field>
              <FieldLabel>Email</FieldLabel>
              <Input
                name="email"
                type="email"
                placeholder="Enter your email"
                required
              />
              <FieldError>Please enter a valid email address</FieldError>
            </Field>

            <Field>
              <FieldLabel>Password</FieldLabel>
              <Input
                name="password"
                type="password"
                placeholder="Enter your password"
                required
              />
              <FieldError>Password is required</FieldError>
            </Field>

            <Button type="submit" className="w-full">
              Sign In
            </Button>
          </Form>

          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link
              href="/totp/signup"
              className="text-primary hover:underline font-medium"
            >
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
