type ModalProps = {
    title: string | undefined,
    message: string | undefined
}

const Modal = ({title, message}:ModalProps) => {

    return ( 
        <>
            <dialog id="custom_modal" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">{title}</h3>
                    <p className="py-4">{message}</p>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </>
    );
}
 
export default Modal;