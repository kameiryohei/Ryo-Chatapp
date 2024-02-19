import Modal from "@/app/(site)/components/Modal";

interface ImageModalProps {
  isOpen?: boolean;
  onClose: () => void;
  src?: string | null;
}

const ImageModal: React.FC<ImageModalProps> = ({ isOpen, onClose, src }) => {
  if (!src) {
    return null;
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="w-90 h-90">
        <img className="object-cover" alt="Image" src={src} />
      </div>
    </Modal>
  );
};

export default ImageModal;
