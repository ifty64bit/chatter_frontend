import Button from "@/components/Button";
import * as Dialog from "@radix-ui/react-dialog";

interface DialogProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    title: string;
    children: React.ReactNode;
    agreeText?: string;
    cancelText?: string;
}

function DialogBox({
    isOpen,
    setIsOpen,
    title,
    children,
    agreeText,
    cancelText,
}: DialogProps) {
    return (
        <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
            <Dialog.Portal className="">
                <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-30" />
                <Dialog.Content className="absolute bg-white min-w-[280px] max-w-lg left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 p-4 rounded-lg">
                    <div id="title" className="py-2 mb-4 border-b font-semibold">
                        {title}
                    </div>

                    {children}

                    <div className="flex gap-2 md:gap-4 justify-end mt-4">
                        <Button onClick={() => setIsOpen(false)}>
                            {agreeText || "Ok"}
                        </Button>
                        <Button
                            variant="danger"
                            onClick={() => setIsOpen(false)}
                        >
                            {cancelText || "Cancle"}
                        </Button>
                    </div>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
}

export default DialogBox;
