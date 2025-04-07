"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { signInSchema } from "@/schemas/signInSchema";
import { signIn } from "next-auth/react";

const page = () => {
  const { toast } = useToast();
  const router = useRouter();

  //zod implementation
  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      identifier: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof signInSchema>) => {
    //Sign in Next Auth se h
    const result = await signIn("credentials", {
      redirect:false,
      identifier: data.identifier,
      password: data.password,
    });
    console.log(result);
    if(result?.error){
      if(result.error=='CredentialsSignIn'){
        toast({
          title:"Login Failed",
          description:"Incorrect Username or Password",
          variant:"destructive"
        })
      }
      toast({
        title:"Login Failed and not Credential Error",
        description:"Incorrect Username or Password",
        variant:"destructive"
      })
    }

    if(result?.url){
      router.replace('/dashboard')
      toast({
        title:"Login Successful",
        description:"User Logged in",
      })
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
            Join Mystery Message
          </h1>
          <p className="mb-4">Sign up to start Your anonymous adventure</p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              name="identifier"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email/Username</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter email / username "
                      {...field} //uper isliye kiya coz username chahiye tha state k liye
                    />
                  </FormControl>
                  {/* <FormDescription>This is your email part.</FormDescription> */}
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password </FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Password" {...field} />
                  </FormControl>
                  {/* <FormDescription>
                    This is your public display name.
                  </FormDescription> */}
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit">
              Sign in
            </Button>
          </form>
        </Form>

        <div className="text-center mt-4">
          <p>
            Not Registered ?{" "}
            <Link href="/sign-up" className="text-blue-600 hover:text-blue-800">
              Sign up{" "}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default page;
