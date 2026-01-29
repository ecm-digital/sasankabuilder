import { useState } from 'react';
import { Plus, Trash2, DollarSign } from 'lucide-react';
import { useLocalStorage } from '../hooks/useLocalStorage';

interface EstimateItem {
    id: string;
    category: string;
    name: string;
    quantity: number;
    unit: string;
    price: number;
}

export function Estimator() {
    const [items, setItems] = useLocalStorage<EstimateItem[]>('sasanka-estimator-items', [
        { id: '1', category: 'Stan Surowy', name: 'Beton B25', quantity: 15, unit: 'm3', price: 320 },
        { id: '2', category: 'Stan Surowy', name: 'Bloczki betonowe', quantity: 500, unit: 'szt', price: 4.5 },
    ]);

    const [newItem, setNewItem] = useState<Partial<EstimateItem>>({
        category: 'Materiały',
        unit: 'szt'
    });

    const addItem = () => {
        if (!newItem.name || !newItem.price) return;

        setItems([
            ...items,
            {
                id: Math.random().toString(36).substr(2, 9),
                category: newItem.category || 'Inne',
                name: newItem.name,
                quantity: newItem.quantity || 1,
                unit: newItem.unit || 'szt',
                price: Number(newItem.price),
            }
        ]);
        setNewItem({ category: 'Materiały', unit: 'szt', name: '', price: 0, quantity: 1 });
    };

    const removeItem = (id: string) => {
        setItems(items.filter(item => item.id !== id));
    };

    const totalCost = items.reduce((sum, item) => sum + (item.quantity * item.price), 0);

    return (
        <div className="space-y-6">
            <header className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Kosztorys</h1>
                    <p className="text-gray-500">Planuj koszty materiałów i robocizny</p>
                </div>
                <div className="bg-white px-6 py-3 rounded-xl shadow-sm border border-gray-100 flex items-center space-x-3">
                    <div className="bg-green-100 p-2 rounded-lg">
                        <DollarSign className="h-6 w-6 text-green-700" />
                    </div>
                    <div>
                        <p className="text-xs text-gray-500 uppercase font-semibold">Suma całkowita</p>
                        <p className="text-2xl font-bold text-gray-900">{totalCost.toLocaleString('pl-PL')} PLN</p>
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
        </div>
    );
}
