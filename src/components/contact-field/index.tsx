import { FormInput, FormLabel } from "@ariakit/react";
import { Stack } from "@packages/ui";
import { css } from "@styles";

interface ContactFieldProps {
  label?: string;
  placeholder?: string;
  name: string;
  type?: "text" | "email" | "textarea";
}

const styles = {
  field: css({
    display: "flex",
    flexDirection: "column",
    gap: "13px",
  }),
  label: css({
    textStyle: "body.s",
  }),
  input: css({
    backgroundColor: "s.bg.gentle.initial",
    outline: "none",
    paddingX: "s.s",
    paddingY: "s.m",
    "&:focus": {
      outline: "none",
      boxShadow: "none",
    },
  }),
};

export const ContactField = ({
  label,
  placeholder,
  name,
  type = "text",
}: ContactFieldProps) => {
  return (
    <Stack className={styles.field}>
      {label && (
        <FormLabel name={name} className={styles.label}>
          {label}
        </FormLabel>
      )}

      {type === "textarea" ? (
        <FormInput
          name={name}
          placeholder={placeholder}
          render={<textarea rows={4} className={styles.input} />}
        />
      ) : (
        <FormInput
          name={name}
          type={type}
          placeholder={placeholder}
          className={styles.input}
        />
      )}
    </Stack>
  );
};
