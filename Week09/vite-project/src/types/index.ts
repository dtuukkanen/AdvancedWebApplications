// Type TItem
export type TItem = {
    id: string;
    text: string;
    clicked: boolean;
};

// Interface ListProps
export interface ListProps {
    header: string;
    items: TItem[];
    updateList: (id: string) => void;
}