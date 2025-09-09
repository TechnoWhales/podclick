declare module 'react-lines-ellipsis' {
  import React from 'react'
  export type LinesEllipsisProps = {
    text: string;
    maxLine?: number | string;
    ellipsis?: string | React.ReactNode;
    trimRight?: boolean;
    basedOn?: 'letters' | 'words';
    component?: string;
    onReflow?: (obj: { clamped: boolean; text: string }) => void;
    style?: React.CSSProperties;
    win?: Window;
    lineHeight?: number | string;
    className?: string;
    children?: never;
  }

  const LinesEllipsis: (props: LinesEllipsisProps) => React.JSX.Element
  export default LinesEllipsis
}
