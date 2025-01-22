import { createPortal } from "react-dom";
import { useRef, useEffect } from "react";
import CartApplyJobs from "../Apply/CartApplyJobs";
export default function Modal({ open, close,id }) {
  const dialog = useRef();

  useEffect(() => {
    if (open) {
      dialog.current.showModal();
    } else {
      dialog.current.close();
    }
  }, [open]);
  return createPortal(
    <dialog ref={dialog}>
      <CartApplyJobs id={id} close={close}></CartApplyJobs>
    </dialog>,
    document.body 
  );
}
