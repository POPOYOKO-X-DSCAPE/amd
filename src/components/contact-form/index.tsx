import { Form, FormProvider, useFormStore } from "@ariakit/react";
import { css } from "@styles";

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
    padding: "64px 0",
    gap: "24px",
  }),
};

export const ContactForm = ({
  children,
  onSubmit,
  className,
}: ContactFormProps) => {
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
        "https://www.form-to-email.com/api/s/YU96Ghm9aVa8",
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
        form.reset();
      } else {
      }
    } catch (error) {}
  };

  return (
    <FormProvider store={form}>
      <Form className={`${styles.form} ${className}`} onSubmit={handleSubmit}>
        {children}
      </Form>
    </FormProvider>
  );
};
