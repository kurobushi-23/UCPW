import { MoreHorizontal, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip';

interface DeleteActionButtonProps {
    onDelete: () => void;
    isLoading?: boolean;
    disabled?: boolean;
    variant?: 'button' | 'dropdown-item' | 'icon-button';
    size?: 'sm' | 'md' | 'lg';
    showIcon?: boolean;
    text?: string;
    tooltip?: string;
    destructive?: boolean;
}

export function DeleteActionButton({
    onDelete,
    isLoading = false,
    disabled = false,
    variant = 'button',
    size = 'md',
    showIcon = true,
    text = 'Hapus',
    tooltip = 'Hapus item ini',
    destructive = true
}: DeleteActionButtonProps) {
    const handleClick = (e: React.MouseEvent) => {
        e.stopPropagation(); // Prevent event bubbling
        onDelete();
    };

    const sizeClasses = {
        sm: 'h-7 w-7 text-xs',
        md: 'h-8 w-8 text-sm',
        lg: 'h-9 w-9 text-base'
    };

    // Icon Button Variant
    if (variant === 'icon-button') {
        const IconButton = (
            <Button
                variant="ghost"
                size="sm"
                onClick={handleClick}
                disabled={isLoading || disabled}
                className={`
                    ${sizeClasses[size]}
                    ${destructive
                        ? 'text-red-600 hover:text-red-700 hover:bg-red-50'
                        : 'text-gray-600 hover:text-gray-700 hover:bg-gray-50'
                    }
                    ${isLoading ? 'animate-pulse' : ''}
                `}
            >
                {isLoading ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current"></div>
                ) : (
                    <Trash2 className="h-4 w-4" />
                )}
            </Button>
        );

        if (tooltip) {
            return (
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            {IconButton}
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>{tooltip}</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            );
        }

        return IconButton;
    }

    // Dropdown Item Variant
    if (variant === 'dropdown-item') {
        return (
            <DropdownMenuItem
                onClick={handleClick}
                disabled={isLoading || disabled}
                className={`
                    cursor-pointer
                    ${destructive
                        ? 'text-red-600 focus:text-red-700 focus:bg-red-50'
                        : 'text-gray-700'
                    }
                `}
            >
                {isLoading ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2"></div>
                ) : showIcon ? (
                    <Trash2 className="h-4 w-4 mr-2" />
                ) : null}
                {isLoading ? 'Menghapus...' : text}
            </DropdownMenuItem>
        );
    }

    // Map local size to Button's accepted size prop
    const buttonSizeMap: Record<'sm' | 'md' | 'lg', 'sm' | 'default' | 'lg'> = {
        sm: 'sm',
        md: 'default',
        lg: 'lg'
    };

    // Regular Button Variant
    return (
        <Button
            variant={destructive ? "destructive" : "outline"}
            size={buttonSizeMap[size]}
            onClick={handleClick}
            disabled={isLoading || disabled}
            className="flex items-center"
        >
            {isLoading ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
            ) : showIcon ? (
                <Trash2 className="h-4 w-4 mr-2" />
            ) : null}
            {isLoading ? 'Menghapus...' : text}
        </Button>
    );
}

// Action Menu Component for Cards
interface ActionMenuProps {
    onEdit?: () => void;
    onDelete: () => void;
    onView?: () => void;
    isLoading?: boolean;
    editText?: string;
    deleteText?: string;
    viewText?: string;
    showEditIcon?: boolean;
    showDeleteIcon?: boolean;
    showViewIcon?: boolean;
}

export function ActionMenu({
    onEdit,
    onDelete,
    onView,
    isLoading = false,
    editText = 'Edit',
    deleteText = 'Hapus',
    viewText = 'Lihat Detail',
    showEditIcon = true,
    showDeleteIcon = true,
    showViewIcon = true
}: ActionMenuProps) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    className="h-8 w-8 p-0"
                    disabled={isLoading}
                >
                    <span className="sr-only">Buka menu</span>
                    <MoreHorizontal className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[160px]">
                {onView && (
                    <>
                        <DropdownMenuItem onClick={onView} className="cursor-pointer">
                            {showViewIcon && <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>}
                            {viewText}
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                    </>
                )}

                {onEdit && (
                    <DropdownMenuItem onClick={onEdit} className="cursor-pointer">
                        {showEditIcon && <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>}
                        {editText}
                    </DropdownMenuItem>
                )}

                {(onEdit || onView) && <DropdownMenuSeparator />}

                <DeleteActionButton
                    variant="dropdown-item"
                    onDelete={onDelete}
                    isLoading={isLoading}
                    text={deleteText}
                    showIcon={showDeleteIcon}
                />
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
