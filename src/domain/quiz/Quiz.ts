export interface Quiz {
    type: "single" | "multi";
    question: string;
    answer: string | string[];
    options: string[];
}

export interface SelectOption {
    label: string;
    name: string;
    isAnswer: boolean;
}