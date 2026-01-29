import { useState } from 'react';
import { ChevronDown, ChevronUp, Construction, AlertTriangle, Lightbulb } from 'lucide-react';
import { CONSTRUCTION_ADVICE } from '../data/constructionAdvice';

export function ConstructionHelper() {
    const [openItems, setOpenItems] = useState<number[]>([]);

    const toggleItem = (id: number) => {
        setOpenItems(prev =>
            prev.includes(id)
                ? prev.filter(item => item !== id)
                : [...prev, id]
        );
    };

    return (
        <div className="space-y-6 max-w-4xl mx-auto">
            <header>
                <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                    <Construction className="h-8 w-8 text-sasanka-dark" />
                    Pomocnik Budowy
                </h1>
                <p className="text-gray-500 mt-2">
                    Szczegółowy przewodnik po każdym etapie budowy Twojej Sasanki.
                    Dowiedz się na co zwrócić uwagę i jakich błędów unikać.
                </p>
            </header>

            <div className="space-y-4">
                {CONSTRUCTION_ADVICE.map((stage) => (
                    <div
                        key={stage.id}
                        className="bg-white border border-gray-200 rounded-xl overflow-hidden transition-all shadow-sm hover:shadow-md"
                    >
                        <button
                            onClick={() => toggleItem(stage.id)}
                            className="w-full flex items-center justify-between p-5 text-left bg-white hover:bg-gray-50 transition-colors"
                        >
                            <div className="flex items-center gap-4">
                                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${openItems.includes(stage.id) ? 'bg-sasanka-dark text-white' : 'bg-gray-100 text-gray-500'}`}>
                                    {stage.id}
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900">{stage.title}</h3>
                            </div>
                            {openItems.includes(stage.id)
                                ? <ChevronUp className="h-5 w-5 text-gray-400" />
                                : <ChevronDown className="h-5 w-5 text-gray-400" />
                            }
                        </button>

                        {/* Expandable Content */}
                        {openItems.includes(stage.id) && (
                            <div className="p-5 pt-0 bg-white border-t border-gray-100">
                                <div className="mt-4 text-gray-600 leading-relaxed">
                                    {stage.description}
                                </div>

                                <div className="grid md:grid-cols-2 gap-6 mt-6">
                                    {/* Tips */}
                                    <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                                        <h4 className="font-semibold text-green-800 flex items-center gap-2 mb-3">
                                            <Lightbulb className="h-4 w-4" />
                                            Wskazówki
                                        </h4>
                                        <ul className="space-y-2">
                                            {stage.tips.map((tip, i) => (
                                                <li key={i} className="text-sm text-green-700 flex items-start gap-2">
                                                    <span className="mt-1.5 w-1 h-1 rounded-full bg-green-500 flex-shrink-0" />
                                                    {tip}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* Warnings */}
                                    <div className="bg-amber-50 p-4 rounded-lg border border-amber-100">
                                        <h4 className="font-semibold text-amber-800 flex items-center gap-2 mb-3">
                                            <AlertTriangle className="h-4 w-4" />
                                            Uważaj na to!
                                        </h4>
                                        <ul className="space-y-2">
                                            {stage.warnings.map((warn, i) => (
                                                <li key={i} className="text-sm text-amber-800 flex items-start gap-2">
                                                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-500 flex-shrink-0" />
                                                    {warn}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
