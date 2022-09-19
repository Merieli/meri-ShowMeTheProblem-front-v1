import { IFeedbackFilters, IConfiguredFilters } from '@/interfaces'
import { feedbackFilterColors, feedbackFilterLabels } from '@/views/Feedbacks/module'

export const applyFiltersStructure = (summary: IFeedbackFilters, filterActive?: string) => {
    return Object.keys(summary).map((typeOfFeedback) => {
        const checkActive = (): boolean => {
            if (typeOfFeedback === 'all' && filterActive == undefined) return true

            if (filterActive != undefined && typeOfFeedback === filterActive) return true

            return false
        }

        const currentFilter: IConfiguredFilters = {
            label: feedbackFilterLabels[typeOfFeedback as keyof IFeedbackFilters],
            color: feedbackFilterColors[typeOfFeedback as keyof IFeedbackFilters],
            amount: summary[typeOfFeedback as keyof IFeedbackFilters],
            active: checkActive(),
            type: typeOfFeedback,
        }

        return currentFilter
    })
}
