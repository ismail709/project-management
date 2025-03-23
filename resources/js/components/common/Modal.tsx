import { X } from 'lucide-react';
import { useEffect, useRef } from 'react';

export default function Modal({ isOpen, onClose, title, children }) {
    const modalRef = useRef(null);

    // Close modal when clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (isOpen) {
                if (modalRef.current && !modalRef.current.contains(event.target)) {
                    onClose();
                }
            }
        }
    
        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black/60">
            <div ref={modalRef} className="relative w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
                {/* Close Button */}
                <button onClick={onClose} className="absolute top-3 right-3 text-gray-600 hover:text-gray-900 cursor-pointer">
                    <X size={20} />
                </button>

                {/* Modal Title */}
                {title && <h2 className="mb-4 font-semibold">{title}</h2>}

                {/* Modal Content */}
                <div>{children}</div>
            </div>
        </div>
    );
}
