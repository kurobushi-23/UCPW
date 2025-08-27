import { AlertTriangle, Trash2, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useState, useEffect } from 'react';
import { DeleteConfirmationModalProps } from '@/types';

export function DeleteConfirmationModal({
    isOpen,
    onClose,
    onConfirm,
    title,
    description,
    itemName,
    itemType = 'item',
    isLoading = false,
    variant = 'danger',
    confirmText = 'Hapus',
    cancelText = 'Batal',
    showItemPreview = false,
    itemPreview
}: DeleteConfirmationModalProps) {
    const [countdown, setCountdown] = useState(0);
    const [canConfirm, setCanConfirm] = useState(false);

    // Auto countdown untuk prevent accidental deletion
    useEffect(() => {
        if (isOpen && variant === 'danger') {
            setCountdown(3);
            setCanConfirm(false);

            const timer = setInterval(() => {
                setCountdown((prev) => {
                    if (prev <= 1) {
                        setCanConfirm(true);
                        clearInterval(timer);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);

            return () => clearInterval(timer);
        } else {
            setCanConfirm(true);
        }
    }, [isOpen, variant]);

    const handleConfirm = async () => {
        if (!canConfirm || isLoading) return;
        await onConfirm();
    };

    const defaultTitle = title || `Hapus ${itemType}`;
    const defaultDescription = description ||
        `Apakah Anda yakin ingin menghapus ${itemType.toLowerCase()} ${itemName ? `"${itemName}"` : 'ini'}? Tindakan ini tidak dapat dibatalkan.`;

    const variantStyles = {
        danger: {
            iconBg: 'bg-red-100',
            iconColor: 'text-red-600',
            buttonBg: 'bg-red-600 hover:bg-red-700',
            borderColor: 'border-red-200'
        },
        warning: {
            iconBg: 'bg-orange-100',
            iconColor: 'text-orange-600',
            buttonBg: 'bg-orange-600 hover:bg-orange-700',
            borderColor: 'border-orange-200'
        }
    };

    const styles = variantStyles[variant];

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader className="text-center">
                    <div className={`mx-auto flex h-12 w-12 items-center justify-center rounded-full ${styles.iconBg} mb-4`}>
                        <AlertTriangle className={`h-6 w-6 ${styles.iconColor}`} />
                    </div>

                    <DialogTitle className="text-lg font-semibold text-gray-900">
                        {defaultTitle}
                    </DialogTitle>

                    <DialogDescription className="text-sm text-gray-500 mt-2">
                        {defaultDescription}
                    </DialogDescription>
                </DialogHeader>

                {/* Item Preview */}
                {showItemPreview && itemPreview && (
                    <div className={`border rounded-lg p-3 bg-gray-50 ${styles.borderColor} mt-4`}>
                        <div className="flex items-center space-x-3">
                            {itemPreview.image && (
                                <div className="flex-shrink-0">
                                    <img
                                        src={itemPreview.image}
                                        alt=""
                                        className="h-12 w-12 rounded-lg object-cover"
                                    />
                                </div>
                            )}
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-900 truncate">
                                    {itemPreview.title}
                                </p>
                                {itemPreview.subtitle && (
                                    <p className="text-xs text-gray-500 truncate">
                                        {itemPreview.subtitle}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {/* Warning Message */}
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mt-4">
                    <div className="flex">
                        <AlertTriangle className="h-5 w-5 text-yellow-400 flex-shrink-0" />
                        <div className="ml-3">
                            <p className="text-sm text-yellow-700">
                                <strong>Peringatan:</strong> Tindakan ini akan menghapus data secara permanen dan tidak dapat dikembalikan.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 space-y-2 space-y-reverse sm:space-y-0 mt-6">
                    <Button
                        variant="outline"
                        onClick={onClose}
                        disabled={isLoading}
                        className="w-full sm:w-auto"
                    >
                        <X className="h-4 w-4 mr-2" />
                        {cancelText}
                    </Button>

                    <Button
                        onClick={handleConfirm}
                        disabled={!canConfirm || isLoading}
                        className={`w-full sm:w-auto text-white ${styles.buttonBg} ${!canConfirm ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        {isLoading ? (
                            <>
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                Menghapus...
                            </>
                        ) : (
                            <>
                                <Trash2 className="h-4 w-4 mr-2" />
                                {!canConfirm && countdown > 0 ? `${confirmText} (${countdown})` : confirmText}
                            </>
                        )}
                    </Button>
                </div>

                {/* Helper text for countdown */}
                {variant === 'danger' && countdown > 0 && (
                    <p className="text-xs text-gray-500 text-center mt-2">
                        Tombol hapus akan aktif dalam {countdown} detik untuk mencegah penghapusan yang tidak disengaja.
                    </p>
                )}
            </DialogContent>
        </Dialog>
    );
}

