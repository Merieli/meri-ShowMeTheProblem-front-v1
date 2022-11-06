export interface IFeedbackFilters {
    all: number;
    issue: number;
    idea: number;
    other: number;
}

export type TFeedback = 'idea' | 'issue' | 'all' | 'other';
