import { TFeedback } from './'

export interface FeedbackTypeAndPagination {
    type: TFeedback
    limit: number
    offset: number
}
