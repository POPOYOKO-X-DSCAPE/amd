import { Form, FormProvider, useFormStore } from "@ariakit/react";
import { Stack } from "@packages/ui";
import { css } from "@styles";
import { useState } from "react";
import usePageTransition from "../../hooks/usePageTransition";
import { Button } from "../button";

interface ContactFormProps {
  children: React.ReactNode;
  onSubmit?: (formData: Record<string, string>) => void;
  className?: string;
}

const styles = {
  form: css({
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    paddingY: "s.x2l",
    gap: "s.l",
    width: "100%",
    maxWidth: "70ch",
    _desktop: {
      paddingY: "s.x4l",
    },
  }),
  sentMessage: css({
    gap: "s.m",
    height: "600px",
    padding: "s.x4l",
  }),
};

export const ContactForm = ({ children, className }: ContactFormProps) => {
  const { transitionTo } = usePageTransition();

  const [status, setStatus] = useState<"initial" | "sent" | "error">("initial");
  const [error, setError] = useState<string>("");

  const form = useFormStore({
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const values = form.getState().values;

    try {
      const response = await fetch(
        "https://www.form-to-email.com/api/s/AhRu9-q_hVgz",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: values.name,
            email: values.email,
            message: values.message,
          }),
        }
      );

      if (response.ok) {
        setStatus("sent");
        form.reset();
      } else {
      }
    } catch (error) {
      setStatus("error");
      setError(String(error));
    }
  };

  return (
    <FormProvider store={form}>
      {status === "initial" ? (
        <Stack alignItems="center">
          <Form
            className={`${styles.form} ${className}`}
            onSubmit={handleSubmit}
          >
            {children}
          </Form>
        </Stack>
      ) : status === "error" ? (
        <Stack>{error}</Stack>
      ) : (
        <Stack
          alignItems="center"
          justifyContent="center"
          className={styles.sentMessage}
        >
          Your mail has been sent !
          <Button label="Back to home" onClick={() => transitionTo("/")} />
        </Stack>
      )}
    </FormProvider>
  );
};
