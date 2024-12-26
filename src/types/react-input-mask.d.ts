declare module "react-input-mask" {
    import * as React from "react";

    export interface InputMaskProps
        extends React.InputHTMLAttributes<HTMLInputElement> {
        mask: string;
        maskChar?: string | null;
        alwaysShowMask?: boolean;
        formatChars?: Record<string, string>;
        children?: (inputProps: React.InputHTMLAttributes<HTMLInputElement>) => React.ReactNode;
    }

    const InputMask: React.FC<InputMaskProps>;

    export default InputMask;
}
