"use client"
import React from 'react';
import { useForm } from 'react-hook-form';
import emailjs from '@emailjs/browser';
import {Toaster, toast} from 'sonner';

export default function Form() {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const sendEmail = (params) => {
    const toastId=toast.loading("Sending your message, please wait")
    emailjs
      .send(
        process.env.NEXT_PUBLIC_SERVICE_ID, 
        process.env.NEXT_PUBLIC_TEMPLATE_ID, form.current,
        params, 
        {
          publicKey: process.env.NEXT_PUBLIC_PUBLIC_KEY,
          limitRate: {
            throttle: 10000, //no more than 1 email per 10 seconds
          }
        })
      .then(
        () => {
          toast.success(
            "I have received your email",
            {id: toastId}
          );
        },
        (error) => {
          console.log('FAILED...', error.text);
          toast.error("There was an error {" + error.text + "} occured. Please try again later");
        },
      );
  };

  const onSubmit = (data) => {
    const templateParams = {
      to_name: "Angie",
      from_name: data.Name,
      reply_to: data.Email,
      message: data.Message,
      tel: data.Tel
    }
    sendEmail(templateParams)
  };
  console.log(errors);
  
  return (
    <>
    <Toaster richColors={true}/>
    <form onSubmit={handleSubmit(onSubmit)}>
      <select {...register("Title", { required: true })}>
        <option value="Mr">Mr</option>
        <option value="Mrs">Mrs</option>
        <option value="Miss">Miss</option>
        <option value="Dr">Dr</option>
      </select>
      <input className=" " type="text" placeholder="Name" {...register("Name", 
      {
        required: "This field is required!", 
        max: {
          value: 100,
          message: "Name should not exceed 100 characters."
        },
        min:{
          value: 2,
          message: "Name should at least be 2 characters long."
        }
      })} />
      {errors.Name && <span>{errors.Name.message}</span>}
      <input className=" " type="text" placeholder="Email" {...register("Email", 
        {
          required: "Email is required!",
          pattern: /^\S+@\S+$/i
        })} />
      {errors.Email && <span>{errors.Email.message}</span>}
      <input className=" " type="tel" placeholder="Tel" {...register("Tel", 
      {
        required:false, 
        max: {
          value: 20,
          message: "Telephone number should not exceed 20 characters."
        }
      })} />
      {errors.Tel && <span>{errors.Tel.message}</span>}
      <input className=" " type="text" placeholder="Message" {...register("Message", 
        {
          required: "Message is required!",
          min:{
            value: 20,
            message: "Message should be at least 20 characters long."
          },
          max:{
            value: 1000,
            message: "Message should not exceed 1000 characters."
          }
        })} />
      {errors.Message && <span>{errors.Message.message}</span>}

      <input className="hover:bg-sky-700"  type="submit" />
    </form>
    </>
  );
}