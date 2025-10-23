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
    fontFamily: "Helvetica LT Pro",
    fontWeight: 700,
    fontSize: "16px",
    letterSpacing: "0.8px",
  }),
  input: css({
    borderRadius: "b.radius.xl",
    backgroundColor: "s.bg.gentle.initial",
    outline: "none",
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
