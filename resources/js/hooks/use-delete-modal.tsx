import { DeleteConfirmationModal } from '@/components/ui/delete-modal';
import { DeleteConfirmationModalProps } from '@/types';
import { useState } from 'react';

// Hook untuk menggunakan delete confirmation
export function useDeleteConfirmation() {
    const [isOpen, setIsOpen] = useState(false);
    const [deleteConfig, setDeleteConfig] = useState<Partial<DeleteConfirmationModalProps>>({});

    const showDeleteConfirmation = (config: Partial<DeleteConfirmationModalProps>) => {
        setDeleteConfig(config);
        setIsOpen(true);
    };

    const hideDeleteConfirmation = () => {
        setIsOpen(false);
        setDeleteConfig({});
    };

    return {
        isOpen,
        deleteConfig,
        showDeleteConfirmation,
        hideDeleteConfirmation,
        DeleteConfirmationModal: (props: Partial<DeleteConfirmationModalProps>) => (
            <DeleteConfirmationModal
                {...deleteConfig}
                {...props}
                isOpen={isOpen}
                onClose={hideDeleteConfirmation}
                onConfirm={deleteConfig.onConfirm ?? (() => {})}
            />
        ),
    };
}
