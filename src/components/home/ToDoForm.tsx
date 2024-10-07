"use client";

import React, { useEffect, useState } from "react";
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
import TodoList from "./TodoList";
import { Todos } from "@prisma/client";

const ToDoForm = () => {
  const [todos, setTodos] = useState<Todos[]>([]);

  const form = useForm<z.infer<typeof todoSchema>>({
    resolver: zodResolver(todoSchema),
    defaultValues: {
      title: "",
    },
  });

  const getTodos = async () => {
    const res = await fetch("/api/todos");
    const data = await res.json();
    setTodos(data);
  };

  const handleAddTodo = async (value: z.infer<typeof todoSchema>) => {
    console.log(value);
    const res = await fetch("/api/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(value),
    });

    const newTodo = await res.json();

    console.log(newTodo);

    setTodos([...todos, newTodo]);
  };

  console.log(todos);

  useEffect(() => {
    getTodos();
  }, []);

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
      <TodoList todos={todos} />
    </div>
  );
};

export default ToDoForm;
