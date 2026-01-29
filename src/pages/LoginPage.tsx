import { useAuth } from '../contexts/AuthContext';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export function LoginPage() {
    const { signInWithGoogle } = useAuth();

    return (
        <div className="min-h-screen bg-gradient-to-br from-sasanka-light/20 to-white flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden">
                <div className="p-8 sm:p-12">
                    <div className="text-center mb-10">
                        <div className="bg-sasanka-dark w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                            <span className="text-2xl font-bold text-white">S</span>
                        </div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">Sasanka Builder</h1>
                        <p className="text-gray-500">Twój osobisty asystent budowy</p>
                    </div>

                    <div className="space-y-4 mb-10">
                        <div className="flex items-center space-x-3 text-gray-700">
                            <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                            <span>Prywatny harmonogram budowy</span>
                        </div>
                        <div className="flex items-center space-x-3 text-gray-700">
                            <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                            <span>Własne kosztorysy i wyceny</span>
                        </div>
                        <div className="flex items-center space-x-3 text-gray-700">
                            <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                            <span>Bezpieczna galeria zdjęć</span>
                        </div>
                    </div>

                    <button
                        onClick={signInWithGoogle}
                        className="w-full bg-sasanka-dark hover:bg-gray-800 text-white font-semibold py-4 px-6 rounded-xl transition-all flex items-center justify-center space-x-3 shadow-lg hover:shadow-xl group"
                    >
                        <svg className="h-5 w-5" viewBox="0 0 24 24">
                            <path
                                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                fill="#4285F4"
                            />
                            <path
                                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                fill="#34A853"
                            />
                            <path
                                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                fill="#FBBC05"
                            />
                            <path
                                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                fill="#EA4335"
                            />
                        </svg>
                        <span>Zaloguj się przez Google</span>
                        <ArrowRight className="h-5 w-5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>

                    <p className="mt-8 text-center text-xs text-gray-400">
                        Logując się akceptujesz nasz Regulamin i Politykę Prywatności.
                        <br />Twoje dane są prywatne i bezpieczne.
                    </p>
                </div>
            </div>
        </div>
    );
}
