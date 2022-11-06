import { IConfiguredFilters, IFeedback, IFeedbacksPagination } from './';

export interface IFeedbacks {
    data: IFeedback[];
    filters: IConfiguredFilters[];
    pagination: IFeedbacksPagination;
    currentType: string;
}
