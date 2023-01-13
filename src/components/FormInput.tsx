interface FormInputProps {
  label: string;
  type?: string; // ? means this is optional
}

export function FormInput({ label, type = "text" }: FormInputProps) {
  return (
    <div className="flex-input">
      <label>
        {label + " "}
        <input type={type}></input>
      </label>
    </div>
  );
}
