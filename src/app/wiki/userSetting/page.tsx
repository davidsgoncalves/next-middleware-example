'use client'

import React from 'react';
import Navbar from "@/components/Navbar/Navbar";
import { Controller, useForm } from "react-hook-form";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useCookies } from 'react-cookie';
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/helpers/firebase";

const Page = () => {
  const { control, handleSubmit, formState: { errors } } = useForm<FormData>();
  const [cookies] = useCookies();

  const onSubmit = async (data) => {
    const userRef = doc(db, `users/${cookies.uid}`);

    await updateDoc(userRef, data);
  }

  return (
    <>
      <Navbar />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <Controller
            name="name"
            control={control}
            rules={{ required: "name is required" }}
            render={({ field }) => <TextField label="name" id="name" {...field} />}
          />
          {errors.name && <p>{errors.name.message}</p>}
        </div>

        <Button type="submit" variant="contained">salvar</Button>
      </form>
    </>
  );
};

export default Page;