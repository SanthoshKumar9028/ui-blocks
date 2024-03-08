import { FC, ReactNode, useState } from "react";

export interface AccordionProps {
  title?: string;
  children?: ReactNode;
}

const Accordion: FC<AccordionProps> = ({ title, children }) => {
  const [open, setOpen] = useState(false);

  return (
    <section>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h4>{title}</h4>
        <button onClick={() => setOpen((prv) => !prv)}>
          {open ? "close" : "open"}
        </button>
      </div>
      {open && <div>{children}</div>}
    </section>
  );
};

export default Accordion;
