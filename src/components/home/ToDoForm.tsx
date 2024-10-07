"use client";

import React from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { todoSchema } from "@/lib/todoSchema";
import { zodResolver } from "@hookform/resolvers/zod";

const ToDoForm = () => {
  const form = useForm<z.infer<typeof todoSchema>>({
    resolver: zodResolver(todoSchema),
    defaultValues: {
      title: "",
    },
  });

  const handleAddTodo = (value: z.infer<typeof todoSchema>) => {
    console.log(value);
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleAddTodo)} className="space-y-4">
          <FormField
            name="title"
            control={form.control}
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Add new to do" />
                </FormControl>
                {fieldState.error && (
                  <FormMessage>{fieldState.error.message}</FormMessage>
                )}
                {/* <FormDescription>This</FormDescription> */}
              </FormItem>
            )}
          />
          <Button type="submit">ADD</Button>
        </form>
      </Form>
    </div>
  );
};

export default ToDoForm;
