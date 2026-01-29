import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

interface EstimateItem {
    id: string;
    category: string;
    name: string;
    quantity: number;
    unit: string;
    price: number;
}

export const generateEstimatePDF = (items: EstimateItem[]) => {
    const doc = new jsPDF();

    // -- Header --
    // Title
    doc.setFontSize(22);
    doc.setTextColor(40, 100, 40); // Sasanka Green-ish
    doc.text('Sasanka Builder', 14, 20);

    // Subtitle
    doc.setFontSize(14);
    doc.setTextColor(100);
    doc.text('Kosztorys Budowlany', 14, 28);

    // Date
    doc.setFontSize(10);
    doc.setTextColor(150);
    const date = new Date().toLocaleDateString('pl-PL');
    doc.text(`Data: ${date}`, 180, 20, { align: 'right' });

    // -- Total Calculation --
    const totalCost = items.reduce((sum, item) => sum + (item.quantity * item.price), 0);

    // -- Table --
    const tableColumn = ["Lp.", "Kategoria", "Nazwa", "Ilość", "J.m.", "Cena jedn.", "Wartość"];
    const tableRows: any[] = [];

    items.forEach((item, index) => {
        const itemData = [
            index + 1,
            item.category,
            item.name,
            item.quantity,
            item.unit,
            `${item.price.toFixed(2)} zł`,
            `${(item.quantity * item.price).toFixed(2)} zł`,
        ];
        tableRows.push(itemData);
    });

    // Add Table
    autoTable(doc, {
        head: [tableColumn],
        body: tableRows,
        startY: 35,
        theme: 'grid',
        headStyles: { fillColor: [40, 100, 40], textColor: 255 }, // Green header
        styles: { fontSize: 10, cellPadding: 3 },
    });

    // -- Footer / Total --
    // @ts-ignore
    const finalY = doc.lastAutoTable.finalY || 150;

    doc.setFontSize(12);
    doc.setTextColor(0);
    doc.setFont('helvetica', 'bold');
    doc.text(`RAZEM: ${totalCost.toLocaleString('pl-PL')} PLN`, 196, finalY + 10, { align: 'right' });

    // Save
    doc.save(`kosztorys_sasanka_${date.replace(/\./g, '-')}.pdf`);
};
