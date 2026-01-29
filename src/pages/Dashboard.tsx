

export function Dashboard() {
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="text-gray-500 text-sm font-medium">Aktywne Projekty</h3>
                    <p className="text-3xl font-bold text-gray-900 mt-2">3</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="text-gray-500 text-sm font-medium">Szacowany Koszt (Total)</h3>
                    <p className="text-3xl font-bold text-gray-900 mt-2">1.2M PLN</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="text-gray-500 text-sm font-medium">Zadania na dziś</h3>
                    <p className="text-3xl font-bold text-gray-900 mt-2">5</p>
                </div>
            </div>
        </div>
    );
}
