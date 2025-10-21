import { Form, FormProvider, useFormStore } from "@ariakit/react";
import { Stack } from "@packages/ui";
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

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const values = form.getState().values;
    onSubmit?.(values);
  };

  return (
    <FormProvider store={form}>
      <Form className={`${styles.form} ${className}`} onSubmit={handleSubmit}>
        {children}
      </Form>
    </FormProvider>
  );
};
