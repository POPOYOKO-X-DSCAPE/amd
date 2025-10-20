import { Stack } from "@packages/ui";
import { css } from "@styles";
import { useId } from "react";

interface InputTextProps {
  label?: string;
  value?: string;
  placeholder?: string;
  onChange?: (value: string) => void;
}

const styles = {
  label: css({}),
  input: css({}),
};

export const InputText = ({
  label,
  value,
  placeholder,
  onChange,
}: InputTextProps) => {
  const id = useId();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(event.target.value);
  };

  return (
    <Stack>
      {label && (
        <label htmlFor={id} className={styles.label}>
          {label}
        </label>
      )}
      <input
        id={id}
        type="text"
        value={value || ""}
        placeholder={placeholder}
        onChange={handleChange}
        className={styles.input}
      />
    </Stack>
  );
};

export default InputText;
