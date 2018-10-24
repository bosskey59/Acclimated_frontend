import React from 'react'
import { Tooltip, OverlayTrigger } from 'react-bootstrap';

const LinkWithTooltip = ({ id, children, href, tooltip }) => {
  return (
    <OverlayTrigger
      overlay={<Tooltip id={id}>{tooltip}</Tooltip>}
      placement="right"
      delayShow={300}
      delayHide={150}
    >
      <a href={href}>{children}</a>
    </OverlayTrigger>
  );
}

export default LinkWithTooltip
