import React, { forwardRef } from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";

interface RichEditorProps {
  placeholder: string;
  onChange: (value: string) => void;
  value?: string;
}

// Menggunakan dynamic import untuk ReactQuill
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const RichEditor = forwardRef<HTMLDivElement, RichEditorProps>(
  ({ placeholder, onChange, value }, ref) => {
    return (
      <div ref={ref}>
        <ReactQuill
          theme="snow"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
        />
      </div>
    );
  }
);

// Menambahkan nama tampilan untuk RichEditor
RichEditor.displayName = "RichEditor";

export default RichEditor;
