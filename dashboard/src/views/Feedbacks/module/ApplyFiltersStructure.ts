import { IFeedbackFilters, IStateFilters } from '@/interfaces'
import { feedbackFilterColors, feedbackFilterLabels } from '@/views/Feedbacks/module'

export const applyFiltersStructure = (summary: IFeedbackFilters) => {
    return Object.keys(summary).map((typeOfFeedback) => {
        const currentFilter: IStateFilters = {
            label: feedbackFilterLabels[typeOfFeedback as keyof IFeedbackFilters],
            color: feedbackFilterColors[typeOfFeedback as keyof IFeedbackFilters],
            amount: summary[typeOfFeedback as keyof IFeedbackFilters],
            active: false,
            type: typeOfFeedback,
        }

        if (currentFilter.type === 'all') {
            currentFilter.active = true
        }

        return currentFilter
    }, [])
}
