import { useState, useEffect } from 'react';
import { Plus, Trash2, DollarSign, FileDown, Sparkles, X } from 'lucide-react';
import { generateEstimatePDF } from '../utils/pdfGenerator';
import { analyzeEstimate } from '../lib/gemini';
import Markdown from 'markdown-to-jsx';
import { collection, addDoc, deleteDoc, doc, onSnapshot, writeBatch } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { ESTIMATE_TEMPLATE } from '../data/estimateTemplate';

interface EstimateItem {
    id: string;
    category: string;
    name: string;
    quantity: number;
    unit: string;
    price: number;
}

export function Estimator() {
    const [items, setItems] = useState<EstimateItem[]>([]);
    const [isAiModalOpen, setIsAiModalOpen] = useState(false);
    const [aiAnalysis, setAiAnalysis] = useState('');
    const [isAnalyzing, setIsAnalyzing] = useState(false);

    const handleAnalyze = async () => {
        setIsAnalyzing(true);
        setAiAnalysis('');
        const result = await analyzeEstimate(items);
        setAiAnalysis(result);
        setIsAnalyzing(false);
    };

    useEffect(() => {
        if (isAiModalOpen && !aiAnalysis && !isAnalyzing) {
            handleAnalyze();
        }
    }, [isAiModalOpen]);

    // Subscribe to Firestore updates
    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, 'estimates'), (snapshot) => {
            const fetchedItems = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })) as EstimateItem[];
            setItems(fetchedItems);
        });

        return () => unsubscribe();
    }, []);

    const [newItem, setNewItem] = useState<Partial<EstimateItem>>({
        category: 'Materiały',
        unit: 'szt'
    });

    const addItem = async () => {
        if (!newItem.name || !newItem.price) return;

        try {
            await addDoc(collection(db, 'estimates'), {
                category: newItem.category || 'Inne',
                name: newItem.name,
                quantity: newItem.quantity || 1,
                unit: newItem.unit || 'szt',
                price: Number(newItem.price),
            });
            setNewItem({ category: 'Materiały', unit: 'szt', name: '', price: 0, quantity: 1 });
        } catch (error) {
            console.error("Error adding document: ", error);
            alert("Błąd podczas dodawania pozycji. Sprawdź konsolę.");
        }
    };

    const loadTemplate = async () => {
        if (!confirm('To doda przykładowy kosztorys (ponad 30 pozycji) do Twojej listy. Czy kontynuować?')) return;

        try {
            const batch = writeBatch(db);
            ESTIMATE_TEMPLATE.forEach(item => {
                const docRef = doc(collection(db, 'estimates'));
                batch.set(docRef, item);
            });
            await batch.commit();
            alert('Kosztorys został załadowany!');
        } catch (error) {
            console.error("Error loading template:", error);
            alert("Błąd ładowania szablonu.");
        }
    };

    const removeItem = async (id: string) => {
        try {
            await deleteDoc(doc(db, 'estimates', id));
        } catch (error) {
            console.error("Error removing document: ", error);
        }
    };

    const totalCost = items.reduce((sum, item) => sum + (item.quantity * item.price), 0);

    return (
        <div className="space-y-6">
            <header className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Kosztorys</h1>
                    <p className="text-gray-500">Planuj koszty materiałów i robocizny</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                    <button
                        onClick={loadTemplate}
                        className="bg-blue-50 text-blue-600 px-4 py-3 rounded-xl shadow-sm hover:bg-blue-100 transition-colors flex items-center justify-center space-x-2"
                    >
                        <Sparkles className="h-5 w-5" />
                        <span>Wgraj przykładowy kosztorys</span>
                    </button>
                    <button
                        onClick={() => setIsAiModalOpen(true)}
                        className="bg-purple-600 text-white px-4 py-3 rounded-xl shadow-sm hover:bg-purple-700 transition-colors flex items-center justify-center space-x-2"
                    >
                        <Sparkles className="h-5 w-5" />
                        <span>Analizuj z AI</span>
                    </button>
                    <button
                        onClick={() => generateEstimatePDF(items)}
                        className="bg-white text-gray-700 px-4 py-3 rounded-xl shadow-sm border border-gray-200 hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2"
                    >
                        <FileDown className="h-5 w-5" />
                        <span>Pobierz PDF</span>
                    </button>
                    <div className="bg-white px-6 py-3 rounded-xl shadow-sm border border-gray-100 flex items-center space-x-3">
                        <div className="bg-green-100 p-2 rounded-lg">
                            <DollarSign className="h-6 w-6 text-green-700" />
                        </div>
                        <div>
                            <p className="text-xs text-gray-500 uppercase font-semibold">Suma całkowita</p>
                            <p className="text-2xl font-bold text-gray-900">{totalCost.toLocaleString('pl-PL')} PLN</p>
                        </div>
                    </div>
                </div>
            </header>

            {/* Add Item Form */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Dodaj pozycję</h3>
                <div className="grid grid-cols-1 md:grid-cols-6 gap-4 items-end">
                    <div className="md:col-span-1">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Kategoria</label>
                        <select
                            className="w-full rounded-lg border-gray-300 border p-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            value={newItem.category}
                            onChange={e => setNewItem({ ...newItem, category: e.target.value })}
                        >
                            <option>Stan Surowy</option>
                            <option>Materiały</option>
                            <option>Robocizna</option>
                            <option>Wykończenie</option>
                            <option>Instalacje</option>
                        </select>
                    </div>
                    <div className="sm:col-span-2 lg:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Nazwa</label>
                        <input
                            type="text"
                            className="w-full rounded-lg border-gray-300 border p-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            placeholder="np. Cement"
                            value={newItem.name || ''}
                            onChange={e => setNewItem({ ...newItem, name: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Ilość</label>
                        <input
                            type="number"
                            className="w-full rounded-lg border-gray-300 border p-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            value={newItem.quantity || ''}
                            onChange={e => setNewItem({ ...newItem, quantity: Number(e.target.value) })}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Cena jedn.</label>
                        <input
                            type="number"
                            className="w-full rounded-lg border-gray-300 border p-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            value={newItem.price || ''}
                            onChange={e => setNewItem({ ...newItem, price: Number(e.target.value) })}
                        />
                    </div>
                    <div>
                        <button
                            onClick={addItem}
                            className="w-full bg-sasanka-green text-white p-2 rounded-lg hover:bg-green-600 transition-colors flex items-center justify-center space-x-1"
                        >
                            <Plus className="h-5 w-5" />
                            <span>Dodaj</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Items List */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left min-w-[800px]">
                        <thead className="bg-gray-50 border-b border-gray-100">
                            <tr>
                                <th className="px-6 py-4 font-semibold text-gray-600">Nazwa</th>
                                <th className="px-6 py-4 font-semibold text-gray-600">Kategoria</th>
                                <th className="px-6 py-4 font-semibold text-gray-600 text-right">Ilość</th>
                                <th className="px-6 py-4 font-semibold text-gray-600 text-right">Cena jedn.</th>
                                <th className="px-6 py-4 font-semibold text-gray-600 text-right">Suma</th>
                                <th className="px-6 py-4 font-semibold text-gray-600 w-10"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {items.map((item) => (
                                <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 font-medium text-gray-900">{item.name}</td>
                                    <td className="px-6 py-4">
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                            {item.category}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">{item.quantity} {item.unit}</td>
                                    <td className="px-6 py-4 text-right text-gray-600">{item.price.toFixed(2)} PLN</td>
                                    <td className="px-6 py-4 text-right font-semibold text-gray-900">
                                        {(item.quantity * item.price).toFixed(2)} PLN
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <button
                                            onClick={() => removeItem(item.id)}
                                            className="text-gray-400 hover:text-red-500 transition-colors"
                                        >
                                            <Trash2 className="h-5 w-5" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {items.length === 0 && (
                        <div className="p-12 text-center text-gray-500">
                            Brak pozycji w kosztorysie. Dodaj pierwszą pozycję powyżej.
                        </div>
                    )}
                </div>

            </div>
            {/* AI Modal */}
            {isAiModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[80vh] flex flex-col">
                        <div className="flex justify-between items-center p-6 border-b border-gray-100">
                            <div className="flex items-center space-x-2">
                                <div className="p-2 bg-purple-100 rounded-lg">
                                    <Sparkles className="h-6 w-6 text-purple-600" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900">Asystent Sasanka</h3>
                            </div>
                            <button
                                onClick={() => setIsAiModalOpen(false)}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                <X className="h-6 w-6" />
                            </button>
                        </div>

                        <div className="p-6 overflow-y-auto flex-1 prose prose-purple max-w-none">
                            {isAnalyzing ? (
                                <div className="flex flex-col items-center justify-center py-12 space-y-4">
                                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
                                    <p className="text-gray-500">Analizuję Twój kosztorys...</p>
                                </div>
                            ) : (
                                <Markdown>{aiAnalysis}</Markdown>
                            )}
                        </div>

                        <div className="p-6 border-t border-gray-100 bg-gray-50 rounded-b-2xl flex justify-end">
                            <button
                                onClick={() => setIsAiModalOpen(false)}
                                className="px-6 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                            >
                                Zamknij
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
