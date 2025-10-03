export type AppState = 'start' | 'picking' | 'selected' | 'confirmed';

export type veefinSchema = {
    username: string; 
    email: string;
    companyname: string;
    selections: Record<string, string[]>;
}

export const sidebarContentMapper:{ [key: string]: { title: string; content: string } } = {
    "IMPORT LC":{
        title: "Import LC",
        content: `An Import Letter of Credit (Import LC) is a widely used trade finance instrument that helps international buyers and sellers conduct business securely. It is essentially a guarantee issued by the importer’s bank on behalf of the importer (buyer) in favor of the exporter (seller). The guarantee ensures that the exporter will be paid the agreed amount, provided that they submit the required shipping and commercial documents that comply with the terms and conditions outlined in the LC.

Here’s how it works: when an importer agrees to purchase goods from a foreign supplier, the supplier wants assurance of payment since cross-border transactions carry risks like non-payment, currency fluctuations, or political instability. To resolve this, the importer asks their bank to issue an Import LC. The bank then promises payment to the exporter once the exporter provides the correct documents (like the bill of lading, invoice, packing list, and certificate of origin). Importantly, banks deal with documents, not the actual goods, meaning payment is tied to proper paperwork rather than physical inspection.

For the importer, an LC builds trust with suppliers and enables smoother trade, sometimes even with longer credit terms. For the exporter, it reduces the risk of default, since the payment obligation shifts from the buyer to a reliable bank. However, Import LCs involve costs such as bank fees, and strict compliance with documentation is crucial—any discrepancy can delay or prevent payment.

In short, Import LC balances trust in international trade by protecting both buyers and sellers while routing obligations through banks.

Would you like me to also sketch a simple flow diagram of how Import LC transactions work? That often makes the process clearer.`
    },
    "default": {
        title: "Default Title",
        content: "Default content. Detailed information will be displayed here."
    }
}