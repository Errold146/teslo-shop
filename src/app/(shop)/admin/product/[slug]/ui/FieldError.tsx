
interface FieldErrorProps {
    error?: { type?: string; message?: string };
    messages?: { [key: string]: string };
    defaultMessage?: string;
}

export const FieldError = ({
    error,
    messages,
    defaultMessage = 'Este campo es requerido'
}: FieldErrorProps) => {
    if (!error) return null;
    const msg = messages?.[error.type ?? ''] ?? defaultMessage;
    return <p className="text-red-500 text-sm mt-1">{msg}</p>;
};