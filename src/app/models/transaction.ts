export interface Transaction {
    itemId: string;
    positive: boolean;
    diff: number;
    date: Date;
}
