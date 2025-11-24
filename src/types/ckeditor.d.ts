declare module '@ckeditor/ckeditor5-react' {
  import * as React from 'react';
  type EditorConstructor = any;
  type CKEditorProps = {
    editor: EditorConstructor;
    data?: string;
    config?: any;
    onReady?: (editor: any) => void;
    onChange?: (event: any, editor: any) => void;
    onBlur?: (event: any, editor: any) => void;
    onFocus?: (event: any, editor: any) => void;
  } & React.HTMLAttributes<HTMLElement>;
  export class CKEditor extends React.Component<CKEditorProps> {}
  export default CKEditor;
}

declare module '@ckeditor/ckeditor5-build-classic' {
  const ClassicEditor: any;
  export default ClassicEditor;
}
