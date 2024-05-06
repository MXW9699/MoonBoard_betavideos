import React, { ReactElement, useMemo, useState } from 'react';

export default function Collapsable({
  title,
  children,
}: {
  title: String;
  children: any;
}) {
  const [collapsed, setCollapsed] = useState(false);

  const MemoizedChildren = useMemo(
    () => <div style={collapsed ? { display: 'none' } : {}}>{children}</div>,
    [children, collapsed]
  );

  return (
    <div>
      <h1 onClick={() => setCollapsed((prev) => !prev)}>
        {title} {collapsed ? '[+]' : '[-]'}
      </h1>
      {MemoizedChildren}
    </div>
  );
}
