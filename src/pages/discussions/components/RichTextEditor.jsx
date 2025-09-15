// src/pages/Discussion/components/RichTextEditor.jsx
import React, { useRef } from "react";
// import ReactQuill from 'react-quill-new';
// import 'react-quill-new/dist/quill.snow.css';

import ReactQuill from "react-quill-new";
import "react-quill/dist/quill.snow.css";

const RichTextEditor = ({
  value,
  onChange,
  placeholder = "Write your message...",
  disabled = false,
  height = "200px",
}) => {
  const quillRef = useRef(null);

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }], // ✅ valid here
      ["blockquote", "code-block"],
      ["link", "image"],
      [{ align: [] }],
      [{ color: [] }, { background: [] }],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "list", // keep only "list"
    "blockquote",
    "code-block",
    "link",
    "image",
    "align",
    "color",
    "background",
  ];

  return (
    // <div className="rich-text-editor">
    //   <style jsx global>{`
    //     .rich-text-editor .ql-container {
    //       min-height: ${height};
    //       font-size: 14px;
    //     }
    //     .rich-text-editor .ql-editor {
    //       min-height: ${height};
    //       padding: 16px;
    //     }
    //     .rich-text-editor .ql-toolbar {
    //       border-top: 1px solid #e5e7eb;
    //       border-left: 1px solid #e5e7eb;
    //       border-right: 1px solid #e5e7eb;
    //       border-top-left-radius: 0.5rem;
    //       border-top-right-radius: 0.5rem;
    //     }
    //     .rich-text-editor .ql-container {
    //       border-bottom: 1px solid #e5e7eb;
    //       border-left: 1px solid #e5e7eb;
    //       border-right: 1px solid #e5e7eb;
    //       border-bottom-left-radius: 0.5rem;
    //       border-bottom-right-radius: 0.5rem;
    //     }
    //     .rich-text-editor .ql-editor.ql-blank::before {
    //       color: #9ca3af;
    //       font-style: normal;
    //     }
    //   `}</style>
    //   <ReactQuill
    //     ref={quillRef}
    //     theme="snow"
    //     value={value}
    //     onChange={onChange}
    //     modules={modules}
    //     formats={formats}
    //     placeholder={placeholder}
    //     readOnly={disabled}
    //   />
    // </div>
    <div className="rich-text-editor">
      <style>{`
    // .rich-text-editor .ql-container {
    //   min-height: ${height};
    //   font-size: 14px;
    // }
    // .rich-text-editor .ql-editor {
    //   min-height: ${height};
    //   padding: 16px;
    // }
    // .rich-text-editor .ql-toolbar {
    //   border-top: 1px solid #e5e7eb;
    //   border-left: 1px solid #e5e7eb;
    //   border-right: 1px solid #e5e7eb;
    //   border-top-left-radius: 0.5rem;
    //   border-top-right-radius: 0.5rem;
    // }
    // .rich-text-editor .ql-container {
    //   border-bottom: 1px solid #e5e7eb;
    //   border-left: 1px solid #e5e7eb;
    //   border-right: 1px solid #e5e7eb;
    //   border-bottom-left-radius: 0.5rem;
    //   border-bottom-right-radius: 0.5rem;
    // }
    // .rich-text-editor .ql-editor.ql-blank::before {
    //   color: #9ca3af;
    //   font-style: normal;
    // }
    .rich-text-editor .ql-container {
  min-height: var(--editor-height, 200px); /* fallback if height not passed */
  font-size: 14px;
  border-bottom: 1px solid var(--color-secondarybgcolor);
  border-left: 1px solid var(--color-secondarybgcolor);
  border-right: 1px solid var(--color-secondarybgcolor);
  border-bottom-left-radius: 0.5rem;
  border-bottom-right-radius: 0.5rem;
  background-color: var(--color-bgcolor);
  color: var(--color-headcolor);
}

.rich-text-editor .ql-editor {
  min-height: var(--editor-height, 200px);
  padding: 16px;
  color: var(--color-headcolor);
  background-color: var(--color-bgcolor);
}

.rich-text-editor .ql-toolbar {
  border-top: 1px solid var(--color-secondarybgcolor);
  border-left: 1px solid var(--color-secondarybgcolor);
  border-right: 1px solid var(--color-secondarybgcolor);
  border-top-left-radius: 0.5rem;
  border-top-right-radius: 0.5rem;
  background-color: var(--color-subbgcolor);
}

.rich-text-editor .ql-editor.ql-blank::before {
  color: var(--color-secondary);
  font-style: 'Poppins', sans-serif;
}

  `}</style>
      <ReactQuill
        ref={quillRef}
        theme="snow"
        value={value}
        onChange={onChange}
        modules={modules}
        formats={formats}
        placeholder={placeholder}
        readOnly={disabled}
      />
    </div>
  );
};

export default RichTextEditor;
