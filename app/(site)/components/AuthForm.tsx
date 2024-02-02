"use client";
import React, { useCallback } from "react";
import { useState } from "react";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import Input from "./inputs/Input";
import Button from "./Button";
import AuthSocialButton from "./AuthSocialButton";
import { BsGithub, BsGoogle } from "react-icons/bs";
type Varient = "LOGIN" | "REGISTER";

const AuthForm = () => {
  const [variant, setVariant] = useState<Varient>("LOGIN");
  const [isLoading, setIsLoading] = useState(false);

  const toggleVarient = useCallback(() => {
    if (variant === "LOGIN") {
      setVariant("REGISTER");
    } else {
      setVariant("LOGIN");
    }
  }, [variant]);

  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    if (variant === "LOGIN") {
      //axios register
    }
    if (variant === "REGISTER") {
      //nextauth login
    }
  };
  const socialAction = (action: string) => {
    setIsLoading(true);
    //nextauth social login
  };

  return (
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {variant === "REGISTER" && (
            <Input
              id="name"
              label="Name"
              name="name"
              register={register}
              errors={errors}
              disabled={isLoading}
            />
          )}
          <Input
            id="email"
            label="Email address"
            type="email"
            name="email"
            register={register}
            errors={errors}
            disabled={isLoading}
          />
          <Input
            id="Password"
            label="Password"
            type="password"
            register={register}
            errors={errors}
            name="password"
            disabled={isLoading}
          />
          <Button disabled={isLoading} fullWidht type="submit">
            {variant === "LOGIN" ? "Sign in" : "Register"}
          </Button>
        </form>
        <div className="mt-6">
          <div className="relative">
            <div
              className="
            absolute inset-0 flex items-center"
            >
              <div
                className="
              w-full border-t border-gray-300"
              />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-2 text-gray-500">
                他のログイン方法
              </span>
            </div>
          </div>
          <div className="mt-6 flex gap-2">
            <AuthSocialButton
              icon={BsGithub}
              onClick={() => socialAction("github")}
            />
            <AuthSocialButton
              icon={BsGoogle}
              onClick={() => socialAction("google")}
            />
          </div>
        </div>
        <div className="flex gap-2 justify-center text-sm mt-6 px-2 text-gray-500">
          {variant === "LOGIN"
            ? "新しくアカウントを作成しますか？ "
            : "すでにアカウントをお持ちですか？"}

          <div onClick={toggleVarient} className="underline cursor-pointer">
            {variant === "LOGIN" ? "ここをクリック" : "ログイン"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
