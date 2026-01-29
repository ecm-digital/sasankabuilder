import { useState, useEffect, useRef } from 'react';
import { Calendar, CheckCircle2, Circle, Clock, Home, Camera, X, Loader2 } from 'lucide-react';
import { collection, onSnapshot, query, where, orderBy, getDocs, writeBatch, doc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../lib/firebase';

interface Stage {
    id: string;
    houseId: string;
    name: string;
    date: string;
    status: 'completed' | 'in-progress' | 'pending';
    description: string;
    order: number;
    photos?: string[];
}

const INITIAL_STAGES = [
    { name: 'Stan Zero', description: 'Fundamenty, izolacje, chudy beton', status: 'completed' },
    { name: 'Stan Surowy Otwarty', description: 'Ściany nośne, stropy, betonowanie schodów', status: 'completed' },
    { name: 'Dach', description: 'Więźba dachowa, pokrycie, obróbki blacharskie', status: 'completed' },
    { name: 'Stolarka Okienna', description: 'Montaż okien i drzwi wejściowych', status: 'completed' },
    { name: 'Instalacje Elektryczne', description: 'Rozprowadzenie kabli, montaż puszek', status: 'pending' },
    { name: 'Instalacje Sanitarne', description: 'Wod-kan, ogrzewanie podłogowe', status: 'pending' },
    { name: 'Tynki', description: 'Tynki wewnętrzne gipsowe/cementowe', status: 'pending' },
    { name: 'Wylewki', description: 'Posadzki betonowe (jastrych)', status: 'pending' },
    { name: 'Elewacja', description: 'Ocieplenie styropianem, tynk zewnętrzny', status: 'pending' },
    { name: 'Prace Wykończeniowe', description: 'Płytki, malowanie, montaż osprzętu', status: 'pending' },
] as const;

export function Scheduler() {
    const [selectedHouse, setSelectedHouse] = useState<string | null>(null);
    const [stages, setStages] = useState<Stage[]>([]);
    const [loading, setLoading] = useState(false);
    const [uploadingStageId, setUploadingStageId] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const houses = [
        { id: 'lokal-a', name: 'Lokal A', desc: 'Lewa połówka (83 m²)', color: 'bg-blue-50 border-blue-200' },
        { id: 'lokal-b', name: 'Lokal B', desc: 'Prawa połówka (83 m²)', color: 'bg-green-50 border-green-200' },
    ];

    useEffect(() => {
        if (!selectedHouse) return;

        setLoading(true);
        const q = query(
            collection(db, 'schedule'),
            where('houseId', '==', selectedHouse),
            orderBy('order', 'asc')
        );

        const unsubscribe = onSnapshot(q, async (snapshot) => {
            if (snapshot.empty) {
                // Seed data if empty
                await seedDatabase(selectedHouse);
            } else {
                const fetchedStages = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                })) as Stage[];
                setStages(fetchedStages);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, [selectedHouse]);

    const seedDatabase = async (houseId: string) => {
        // Double check to prevent race conditions
        const q = query(collection(db, 'schedule'), where('houseId', '==', houseId));
        const snap = await getDocs(q);
        if (!snap.empty) return;

        const batch = writeBatch(db);
        const today = new Date().toISOString().split('T')[0];

        INITIAL_STAGES.forEach((stage, index) => {
            const docRef = doc(collection(db, 'schedule'));
            batch.set(docRef, {
                houseId,
                name: stage.name,
                description: stage.description,
                status: stage.status,
                order: index,
                date: today,
                photos: []
            });
        });

        await batch.commit();
    };

    const handlePhotoUpload = async (event: React.ChangeEvent<HTMLInputElement>, stageId: string) => {
        if (!event.target.files || event.target.files.length === 0) return;

        const file = event.target.files[0];
        setUploadingStageId(stageId);

        try {
            // 1. Upload to Storage
            const storageRef = ref(storage, `stages/${stageId}/${Date.now()}_${file.name}`);
            await uploadBytes(storageRef, file);
            const downloadURL = await getDownloadURL(storageRef);

            // 2. Update Firestore
            const stageRef = doc(db, 'schedule', stageId);
            await updateDoc(stageRef, {
                photos: arrayUnion(downloadURL)
            });

        } catch (error) {
            console.error("Upload failed", error);
            alert("Błąd wysyłania zdjęcia. Sprawdź konsolę.");
        } finally {
            setUploadingStageId(null);
            if (fileInputRef.current) fileInputRef.current.value = '';
        }
    };

    const removePhoto = async (stageId: string, photoUrl: string) => {
        if (!confirm("Czy na pewno chcesz usunąć to zdjęcie?")) return;
        try {
            const stageRef = doc(db, 'schedule', stageId);
            await updateDoc(stageRef, {
                photos: arrayRemove(photoUrl)
            });
        } catch (error) {
            console.error("Remove failed", error);
        }
    };

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

    if (!selectedHouse) {
        return (
            <div className="space-y-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Wybierz Dom</h1>
                    <p className="text-gray-500">Którego bliźniaka chcesz planować?</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {houses.map(house => (
                        <button
                            key={house.id}
                            onClick={() => setSelectedHouse(house.id)}
                            className={`p-8 rounded-2xl border-2 text-left transition-all hover:shadow-lg ${house.color} hover:scale-[1.02]`}
                        >
                            <div className="bg-white w-12 h-12 rounded-full flex items-center justify-center mb-4 shadow-sm">
                                <Home className="h-6 w-6 text-gray-700" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">{house.name}</h3>
                            <p className="text-gray-600">{house.desc}</p>
                        </button>
                    ))}
                </div>
                {/* Info about initial state */}
                <div className="bg-blue-50 p-4 rounded-xl text-blue-800 text-sm flex justify-between items-center">
                    <span>ℹ️ Wybranie domu automatycznie załaduje szablon harmonogramu (Sasanka XL).</span>
                    <a href="https://sasanka.eu/sasanka-xl/" target="_blank" rel="noopener noreferrer" className="underline hover:text-blue-900">
                        Zobacz projekt
                    </a>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <button
                        onClick={() => setSelectedHouse(null)}
                        className="text-sm text-gray-400 hover:text-gray-600 mb-1 flex items-center gap-1"
                    >
                        ← Zmień dom
                    </button>
                    <h1 className="text-3xl font-bold text-gray-900">Harmonogram: {houses.find(h => h.id === selectedHouse)?.name}</h1>
                    <p className="text-gray-500">Planuj i śledź postępy prac</p>
                </div>
                <button className="px-4 py-2 bg-sasanka-dark text-white rounded-lg hover:bg-gray-800 transition-colors flex items-center space-x-2">
                    <Calendar className="h-5 w-5" />
                    <span>Dodaj Etap</span>
                </button>
            </header>

            {loading ? (
                <div className="text-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
                    <p className="text-gray-500">Ładowanie harmonogramu...</p>
                </div>
            ) : (
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="relative">
                        {/* Timeline Line */}
                        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-200"></div>

                        <div className="space-y-0">
                            {stages.map((stage) => (
                                <div key={stage.id} className="relative flex items-start p-6 hover:bg-gray-50 transition-colors border-b border-gray-50 last:border-0">
                                    <div className="absolute left-8 top-10 w-3 h-3 -ml-1.5 rounded-full bg-white border-2 border-gray-300 z-10"></div>

                                    <div className="ml-8 md:ml-12 flex-1 grid grid-cols-1 md:grid-cols-4 gap-2 md:gap-4 items-start md:items-center">
                                        <div className="md:col-span-1">
                                            <span className="text-sm font-semibold text-gray-500">{stage.date}</span>
                                        </div>

                                        <div className="md:col-span-2 space-y-3">
                                            <div>
                                                <h3 className="text-lg font-bold text-gray-900">{stage.name}</h3>
                                                <p className="text-gray-600 text-sm">{stage.description}</p>
                                            </div>

                                            {/* Photo Gallery */}
                                            <div className="flex flex-wrap gap-2">
                                                {stage.photos?.map((photo, i) => (
                                                    <div key={i} className="relative group w-16 h-16">
                                                        <img
                                                            src={photo}
                                                            alt="Stage progress"
                                                            className="w-full h-full object-cover rounded-lg border border-gray-200 cursor-pointer hover:opacity-90"
                                                            onClick={() => window.open(photo, '_blank')}
                                                        />
                                                        <button
                                                            onClick={(e) => { e.stopPropagation(); removePhoto(stage.id, photo); }}
                                                            className="absolute -top-1 -right-1 bg-white rounded-full p-0.5 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity text-red-500 hover:text-red-600"
                                                        >
                                                            <X className="h-3 w-3" />
                                                        </button>
                                                    </div>
                                                ))}

                                                <div className="relative">
                                                    <input
                                                        type="file"
                                                        id={`file-${stage.id}`}
                                                        className="hidden"
                                                        accept="image/*"
                                                        onChange={(e) => handlePhotoUpload(e, stage.id)}
                                                    />
                                                    <label
                                                        htmlFor={`file-${stage.id}`}
                                                        className={`w-16 h-16 flex items-center justify-center rounded-lg border-2 border-dashed border-gray-300 cursor-pointer hover:border-blue-500 hover:text-blue-600 transition-colors ${uploadingStageId === stage.id ? 'opacity-50 cursor-not-allowed' : ''}`}
                                                    >
                                                        {uploadingStageId === stage.id ? (
                                                            <Loader2 className="h-5 w-5 animate-spin text-blue-600" />
                                                        ) : (
                                                            <Camera className="h-5 w-5 text-gray-400" />
                                                        )}
                                                    </label>
                                                </div>
                                            </div>
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
            )}
        </div>
    );
}
