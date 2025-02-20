import { useState } from "react";
import {
  useForm as useHookForm,
  Controller,
  useFieldArray,
} from "react-hook-form";

export function useForm(defaultValues) {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    trigger,
    control,
    formState: { errors, isSubmitting },
  } = useHookForm({ defaultValues });

  const [processing, setProcessing] = useState(false);
  const [data, setData] = useState(defaultValues);
  const [apiErrors, setApiErrors] = useState({});

  const submit = async (callback) => {
    setProcessing(true);
    try {
      await callback(data);
    } finally {
      setProcessing(false);
    }
  };

  const setFormData = (key, value) => {
    if (typeof key !== "string") {
      console.error("setFormData error: key must be a string", key);
      return;
    }

    setData((prev) => ({ ...prev, [key]: value }));

    setValue(key, value);
  };

  const request = async (method, url, options = {}) => {
    setProcessing(true);
    setApiErrors({}); // Clear previous errors
    try {
      const isFormData = options.body instanceof FormData;
      const fetchOptions = {
        method,
        ...options,
      };

      if (!isFormData && method !== "GET") {
        fetchOptions.headers = {
          "Content-Type": "application/json",
          ...options.headers,
        };
        if (options.body) {
          fetchOptions.body = JSON.stringify(options.body);
        }
      }

      const response = await fetch(
        process.env.NEXT_PUBLIC_API_URL + url,
        fetchOptions
      );

      if (!response.ok) {
        const errorData = await response.json();
        if (errorData.errors) {
          setApiErrors(errorData.errors); // Store validation errors
        }
        throw new Error(errorData.message || `Error: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Request Error:", error.message);
    } finally {
      setProcessing(false);
    }
  };

  const post = (url, options) => request("POST", url, options);
  const put = (url, options) => request("PUT", url, options);
  const get = (url, options) => request("GET", url, options);

  return {
    useFieldArray,
    Controller,
    control,
    data,
    setData: setFormData,
    processing,
    register,
    handleSubmit,
    submit,
    reset,
    watch,
    errors,
    apiErrors,
    isSubmitting,
    post,
    put,
    get,
  };
}
