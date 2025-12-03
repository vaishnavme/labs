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

export default function SignupPage() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data = {
      fullName: formData.get("fullName") as string,
      email: formData.get("email") as string,
      username: formData.get("username") as string,
      password: formData.get("password") as string,
    };

    console.log("Form Data:", data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-96">
        <CardHeader className="text-left">
          <CardTitle>Create an Account</CardTitle>
          <CardDescription>
            Enter your details to create your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form onSubmit={handleSubmit}>
            <Field>
              <FieldLabel>Full Name</FieldLabel>
              <Input
                name="fullName"
                type="text"
                placeholder="Enter your full name"
                required
              />
              <FieldError>Full name is required</FieldError>
            </Field>

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
              <FieldLabel>Username</FieldLabel>
              <Input
                name="username"
                type="text"
                placeholder="Enter your username"
                required
              />
              <FieldError>Username is required</FieldError>
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
              Create Account
            </Button>
          </Form>

          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link
              href="/totp/login"
              className="text-primary hover:underline font-medium"
            >
              Sign in
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
