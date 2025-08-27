/* eslint-disable react-hooks/exhaustive-deps */
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { type SharedData } from '@/types';
import { useForm, usePage } from '@inertiajs/react';
import { Milestone } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';

interface AuthModalProps {
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    children?: React.ReactNode;
}

const AuthModal: React.FC<AuthModalProps> = ({ open, onOpenChange, children }) => {
    const { auth, errors } = usePage<SharedData>().props;
    const [isOpen, setIsOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('masuk');

    // Form states
    const [loginData, setLoginData] = useState({
        email: '',
        password: '',
    });

    const [registerData, setRegisterData] = useState({
        name: '',
        email: '',
        password: '',
    });

    // Form hooks
    const loginForm = useForm(loginData);
    const registerForm = useForm(registerData);

    // Sync local state with form data
    useEffect(() => {
        loginForm.setData(loginData);
    }, [loginData]);

    useEffect(() => {
        registerForm.setData(registerData);
    }, [registerData]);

    // Close modal when user successfully authenticates
    useEffect(() => {
        if (auth.user && isOpen) {
            setIsOpen(false);
            // Reset forms
            setLoginData({ email: '', password: '' });
            setRegisterData({ name: '', email: '', password: '' });
            setActiveTab('masuk');
        }
    }, [auth.user, isOpen]);

    // Clear errors when switching tabs
    useEffect(() => {
        loginForm.clearErrors();
        registerForm.clearErrors();
    }, [activeTab]);

    const handleLogin = useCallback(
        (e: React.FormEvent) => {
            e.preventDefault();
            loginForm.post(route('login'), {
                onSuccess: () => {
                    setIsOpen(false);
                    setLoginData({ email: '', password: '' });
                    window.location.reload();
                },
                preserveScroll: true,
            });
        },
        [loginForm],
    );

    const handleRegister = useCallback(
        (e: React.FormEvent) => {
            e.preventDefault();
            registerForm.post(route('register'), {
                onSuccess: () => {
                    setIsOpen(false);
                    setRegisterData({ name: '', email: '', password: '' });
                    window.location.reload();
                },
                preserveScroll: true,
            });
        },
        [registerForm],
    );

    const handleLoginEmailChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setLoginData((prev) => ({ ...prev, email: e.target.value }));
    }, []);

    const handleLoginPasswordChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setLoginData((prev) => ({ ...prev, password: e.target.value }));
    }, []);

    const handleRegisterNameChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setRegisterData((prev) => ({ ...prev, name: e.target.value }));
    }, []);

    const handleRegisterEmailChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setRegisterData((prev) => ({ ...prev, email: e.target.value }));
    }, []);

    const handleRegisterPasswordChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setRegisterData((prev) => ({ ...prev, password: e.target.value }));
    }, []);

    useEffect(() => {
        if (typeof open === 'boolean') setIsOpen(open);
    }, [open]);

    // Saat modal dibuka/tutup, panggil onOpenChange jika ada
    const handleOpenChange = (val: boolean) => {
        setIsOpen(val);
        if (onOpenChange) onOpenChange(val);
    };

    return (
        <Dialog open={isOpen} onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>
                {children || (
                    <button className="flex cursor-pointer items-center rounded px-4 py-1 text-sm text-[#1b1b18] dark:text-[#EDEDEC]">
                        <Milestone className="mr-2 h-7 w-7 text-amber-600" />
                    </button>
                )}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[400px]">
                <DialogHeader>
                    <DialogTitle>Masuk atau Daftar</DialogTitle>
                    <DialogDescription>Pilih tab untuk masuk atau daftar</DialogDescription>
                </DialogHeader>

                <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-4">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="masuk">Masuk</TabsTrigger>
                        <TabsTrigger value="daftar">Daftar</TabsTrigger>
                    </TabsList>

                    <TabsContent value="masuk" className="space-y-0">
                        <form onSubmit={handleLogin} className="mt-4 flex h-52 flex-col justify-between gap-3">
                            <div className="flex flex-col gap-3">
                                <Input
                                    type="email"
                                    placeholder="Email"
                                    value={loginData.email}
                                    onChange={handleLoginEmailChange}
                                    className={errors.email ? 'border-red-500' : ''}
                                    autoComplete="email"
                                    disabled={loginForm.processing}
                                />
                                {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}

                                <Input
                                    type="password"
                                    placeholder="Password"
                                    value={loginData.password}
                                    onChange={handleLoginPasswordChange}
                                    className={errors.password ? 'border-red-500' : ''}
                                    autoComplete="current-password"
                                    disabled={loginForm.processing}
                                />
                                {errors.password && <p className="text-xs text-red-500">{errors.password}</p>}
                            </div>
                            <button
                                type="submit"
                                disabled={loginForm.processing}
                                className="mt-2 rounded-2xl bg-amber-600 px-3 py-2 text-white transition-colors hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                {loginForm.processing ? 'Memproses...' : 'Masuk'}
                            </button>
                        </form>
                    </TabsContent>

                    <TabsContent value="daftar" className="space-y-0">
                        <form onSubmit={handleRegister} className="mt-4 flex h-52 flex-col justify-between gap-3">
                            <div className="flex flex-col gap-3">
                                <Input
                                    type="text"
                                    placeholder="Nama"
                                    value={registerData.name}
                                    onChange={handleRegisterNameChange}
                                    className={errors.name ? 'border-red-500' : ''}
                                    autoComplete="name"
                                    disabled={registerForm.processing}
                                />
                                {errors.name && <p className="text-xs text-red-500">{errors.name}</p>}

                                <Input
                                    type="email"
                                    placeholder="Email"
                                    value={registerData.email}
                                    onChange={handleRegisterEmailChange}
                                    className={errors.email ? 'border-red-500' : ''}
                                    autoComplete="email"
                                    disabled={registerForm.processing}
                                />
                                {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}

                                <Input
                                    type="password"
                                    placeholder="Password"
                                    value={registerData.password}
                                    onChange={handleRegisterPasswordChange}
                                    className={errors.password ? 'border-red-500' : ''}
                                    autoComplete="new-password"
                                    disabled={registerForm.processing}
                                />
                                {errors.password && <p className="text-xs text-red-500">{errors.password}</p>}
                            </div>
                            <button
                                type="submit"
                                disabled={registerForm.processing}
                                className="mt-2 rounded-2xl bg-amber-600 px-3 py-2 text-white transition-colors hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                {registerForm.processing ? 'Memproses...' : 'Daftar'}
                            </button>
                        </form>
                    </TabsContent>
                </Tabs>
            </DialogContent>
        </Dialog>
    );
};

export default AuthModal;
