import { useState } from 'react';
import { Book, FileText, Folder, Search, Download } from 'lucide-react';

interface Document {
    id: string;
    title: string;
    category: 'Technical' | 'Legal' | 'Manuals' | 'Inspirations';
    type: 'pdf' | 'doc' | 'img';
    date: string;
    size: string;
}

export function KnowledgeBase() {
    const [activeCategory, setActiveCategory] = useState<string>('All');
    const [searchQuery, setSearchQuery] = useState('');

    const documents: Document[] = [
        { id: '1', title: 'Projekt Architektoniczny - Rzut Parteru', category: 'Technical', type: 'pdf', date: '2024-01-15', size: '2.4 MB' },
        { id: '2', title: 'Pozwolenie na Budowę - Decyzja', category: 'Legal', type: 'pdf', date: '2024-02-10', size: '1.1 MB' },
        { id: '3', title: 'Instrukcja Montażu Okien', category: 'Manuals', type: 'pdf', date: '2024-03-05', size: '4.5 MB' },
        { id: '4', title: 'Specyfikacja Materiałowa - Beton', category: 'Technical', type: 'doc', date: '2024-01-20', size: '0.5 MB' },
        { id: '5', title: 'Wizualizacje Elewacji', category: 'Inspirations', type: 'img', date: '2023-12-10', size: '12.0 MB' },
    ];

    const categories = ['All', 'Technical', 'Legal', 'Manuals', 'Inspirations'];

    const filteredDocs = documents.filter(doc => {
        const matchesCategory = activeCategory === 'All' || doc.category === activeCategory;
        const matchesSearch = doc.title.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const getCategoryColor = (cat: string) => {
        switch (cat) {
            case 'Technical': return 'bg-blue-100 text-blue-700';
            case 'Legal': return 'bg-red-100 text-red-700';
            case 'Manuals': return 'bg-yellow-100 text-yellow-700';
            case 'Inspirations': return 'bg-purple-100 text-purple-700';
            default: return 'bg-gray-100 text-gray-700';
        }
    };

    return (
        <div className="space-y-6">
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Baza Wiedzy</h1>
                    <p className="text-gray-500">Centrum dokumentacji i informacji o projekcie</p>
                </div>
                <div className="flex items-center space-x-3">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Szukaj dokumentu..."
                            className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sasanka-green focus:border-transparent"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <button className="px-4 py-2 bg-sasanka-green text-white rounded-lg hover:bg-green-600 transition-colors flex items-center space-x-2">
                        <Book className="h-5 w-5" />
                        <span>Nowy Dokument</span>
                    </button>
                </div>
            </header>

            {/* Categories */}
            <div className="flex space-x-2 overflow-x-auto pb-2">
                {categories.map(cat => (
                    <button
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${activeCategory === cat
                            ? 'bg-sasanka-dark text-white'
                            : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
                            }`}
                    >
                        {cat === 'All' ? 'Wszystkie' : cat}
                    </button>
                ))}
            </div>

            {/* Documents Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredDocs.map((doc) => (
                    <div key={doc.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow group">
                        <div className="flex items-start justify-between mb-4">
                            <div className={`p-3 rounded-lg ${getCategoryColor(doc.category)} bg-opacity-50`}>
                                <FileText className="h-6 w-6" />
                            </div>
                            <span className={`text-xs px-2 py-1 rounded-full font-medium ${getCategoryColor(doc.category)}`}>
                                {doc.category}
                            </span>
                        </div>

                        <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-sasanka-green transition-colors">
                            {doc.title}
                        </h3>

                        <div className="flex items-center justify-between mt-4 text-sm text-gray-500">
                            <span>{doc.date}</span>
                            <span>{doc.size}</span>
                        </div>

                        <div className="mt-4 pt-4 border-t border-gray-50 flex justify-end">
                            <button className="text-gray-400 hover:text-sasanka-green transition-colors">
                                <Download className="h-5 w-5" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {filteredDocs.length === 0 && (
                <div className="text-center py-12 bg-white rounded-xl border border-gray-100 border-dashed">
                    <Folder className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900">Brak dokumentów</h3>
                    <p className="text-gray-500">Nie znaleziono dokumentów dla wybranych kryteriów.</p>
                </div>
            )}
        </div>
    );
}
