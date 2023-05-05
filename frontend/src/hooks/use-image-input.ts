import { ChangeEventHandler, useRef, useState } from "react";

export const useImageInput = (options?: { defaultImageUrl: string | undefined }) => {
  const ref = useRef<HTMLInputElement>(null);

  const [file, setFile] = useState<File>();
  const [imageUrl, setImageUrl] = useState(options?.defaultImageUrl);

  const reset = (input?: { defaultImageUrl: string | undefined }) => {
    setFile(undefined);
    setImageUrl(input?.defaultImageUrl);
  };

  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const files = e.target.files;

    if (files && files[0]) {
      setFile(files[0]);

      const reader = new FileReader();
      reader.onload = () => {
        setImageUrl(reader.result as string);
      };
      reader.readAsDataURL(files[0]);
    } else {
      setFile(undefined);
      setImageUrl(undefined);
    }

    e.target.value = "";
  };

  const onClick = () => {
    ref.current?.click();
  };

  return {
    ref,
    file,
    imageUrl,
    reset,
    onChange,
    onClick,
  };
};
