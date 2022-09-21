import { TFeedback } from '@/interfaces'
import { IFeedbackApiClientUrls } from '@/interfaces/IFeedbackApiClientUrls'
import httpClient from '@/services'

export class FeedbackModel {
    private defaultPagination

    constructor(private readonly url: IFeedbackApiClientUrls) {
        this.defaultPagination = {
            type: '',
            limit: 5,
            offset: 0,
        }
    }

    async create(type: string, text: string, fingerprint: string, apiKey: string) {
        const params = {
            url: this.url.create,
            payload: {
                data: {
                    type,
                    text,
                    fingerprint,
                    apiKey,
                },
            },
        }
        return httpClient.post(params.url)
    }

    async showFilters(token: string) {
        const params = {
            url: this.url.getFilters,
            payload: {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
        }
        return httpClient.get(params.url, params.payload).then((response) => response.data)
    }

    async show(token: string, type?: TFeedback, limit?: string, offset?: string) {
        const params = {
            url: this.url.show,
            payload: {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                params: {
                    type,
                    limit,
                    offset,
                },
            },
        }
        return httpClient.get(params.url, params.payload).then((response) => response.data)
    }
}
