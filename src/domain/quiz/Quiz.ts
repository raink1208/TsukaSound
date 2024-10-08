export interface Quiz {
    type: "single" | "multi";
    question: string;
    questionId: number;
    answer: string | string[];
    options: string[];
}

export interface SelectOption {
    label: string;
    name: string;
    isAnswer: boolean;
}
