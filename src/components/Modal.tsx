type Props = {
  children: React.ReactNode;
  showModal: boolean;
};

const Modal = ({ children, showModal }: Props) => {
  return (
    showModal && (
      <>
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden px-4 outline-none focus:outline-none">
          <div className="relative mx-auto my-6 w-auto max-w-3xl">
            {/* CONTENT */}
            <div className="relative mx-auto my-6 w-auto max-w-3xl">
              <div className="relative flex w-full flex-col rounded-lg border-0 bg-white p-6 shadow-lg outline-none focus:outline-none">
                {children}
              </div>
            </div>
          </div>
        </div>
        <div className="fixed inset-0 z-40 bg-black opacity-50" />
      </>
    )
  );
};
export default Modal;
