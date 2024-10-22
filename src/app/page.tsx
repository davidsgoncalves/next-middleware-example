'use client'

import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '@/helpers/firebase';
import { useCookies } from 'react-cookie';
import { useRouter } from 'next/navigation';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

type FormData = {
  email: string;
  password: string;
};

const Login = () => {
  const { control, handleSubmit, formState: { errors } } = useForm<FormData>();
  const [, setCookie] = useCookies();
  const router = useRouter();

  const onSubmit = async (data: FormData) => {    
    try {
      const userCredential = await signInWithEmailAndPassword(auth, data.email, data.password) as any;

      const user = userCredential.user;

      const userRef = doc(db, `users/${user.uid}`);
      const docSnap = await getDoc(userRef);

      if (!docSnap.exists()) {
        await setDoc(userRef, {
          uid: user.uid,
          email: user.email,
        });
      }
      
      setCookie('accessToken', user.accessToken);
      setCookie('uid', user.uid);
      router.push('/wiki/home');
    } catch {
      alert('error');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <Controller
          name="email"
          control={control}
          rules={{ required: "Email is required" }}
          render={({ field }) => <TextField label="Email" id="email" {...field} />}
        />
        {errors.email && <p>{errors.email.message}</p>}
      </div>

      <div>
        <Controller
          name="password"
          control={control}
          rules={{ required: "Password is required" }}
          render={({ field }) => <TextField label="password" id="password" {...field} />}
        />
        {errors.password && <p>{errors.password.message}</p>}
      </div>

      <Button type="submit" variant="contained">login</Button>
    </form>
  );
};

export default Login;
