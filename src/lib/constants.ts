export type AppState = 'start' | 'picking' | 'selected' | 'confirmed';

export type veefinSchema = {
    username: string; 
    email: string;
    companyname: string;
    selections: Record<string, string[]>;
}