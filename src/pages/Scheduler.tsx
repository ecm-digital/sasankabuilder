import { useState } from 'react';
import { Calendar, CheckCircle2, Circle, Clock } from 'lucide-react';

interface Stage {
    id: string;
    name: string;
    date: string;
    status: 'completed' | 'in-progress' | 'pending';
    description: string;
}

export function Scheduler() {
    const [stages, setStages] = useState<Stage[]>([
        { id: '1', name: 'Pozwolenie na budowę', date: '2024-03-01', status: 'completed', description: 'Uzyskanie prawomocnego pozwolenia' },
        { id: '2', name: 'Fundamenty', date: '2024-04-15', status: 'in-progress', description: 'Wykop i wylanie ław fundamentowych' },
        { id: '3', name: 'Stan zero', date: '2024-05-01', status: 'pending', description: 'Izolacja i podłoga na gruncie' },
        { id: '4', name: 'Ściany parteru', date: '2024-05-20', status: 'pending', description: 'Murowanie ścian nośnych' },
        { id: '5', name: 'Strop', date: '2024-06-10', status: 'pending', description: 'Szolowanie i zbrojenie stropu' },
    ]);

    const getStatusColor = (status: Stage['status']) => {
        switch (status) {
            case 'completed': return 'bg-green-100 text-green-700';
            case 'in-progress': return 'bg-blue-100 text-blue-700';
            case 'pending': return 'bg-gray-100 text-gray-500';
        }
    };

    const getStatusIcon = (status: Stage['status']) => {
        switch (status) {
            case 'completed': return <CheckCircle2 className="h-5 w-5 text-green-600" />;
            case 'in-progress': return <Clock className="h-5 w-5 text-blue-600" />;
            case 'pending': return <Circle className="h-5 w-5 text-gray-400" />;
        }
    };

    return (
        <div className="space-y-6">
            <header className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Harmonogram Budowy</h1>
                    <p className="text-gray-500">Planuj i śledź postępy prac</p>
                </div>
                <button className="px-4 py-2 bg-sasanka-dark text-white rounded-lg hover:bg-gray-800 transition-colors flex items-center space-x-2">
                    <Calendar className="h-5 w-5" />
                    <span>Dodaj Etap</span>
                </button>
            </header>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="relative">
                    {/* Timeline Line */}
                    <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-200"></div>

                    <div className="space-y-0">
                        {stages.map((stage) => (
                            <div key={stage.id} className="relative flex items-start p-6 hover:bg-gray-50 transition-colors">
                                <div className="absolute left-8 top-10 w-3 h-3 -ml-1.5 rounded-full bg-white border-2 border-gray-300 z-10"></div>

                                <div className="ml-12 flex-1 grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                                    <div className="md:col-span-1">
                                        <span className="text-sm font-semibold text-gray-500">{stage.date}</span>
                                    </div>

                                    <div className="md:col-span-2">
                                        <h3 className="text-lg font-bold text-gray-900">{stage.name}</h3>
                                        <p className="text-gray-600 text-sm">{stage.description}</p>
                                    </div>

                                    <div className="flex justify-end items-center space-x-4">
                                        <div className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center space-x-1 ${getStatusColor(stage.status)}`}>
                                            {getStatusIcon(stage.status)}
                                            <span>
                                                {stage.status === 'completed' && 'Zakończone'}
                                                {stage.status === 'in-progress' && 'W trakcie'}
                                                {stage.status === 'pending' && 'Oczekuje'}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
