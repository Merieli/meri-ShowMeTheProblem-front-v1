import { IFeedbackApiClientUrls } from '@/interfaces/IFeedbackApiClientUrls'
import httpClient from '@/services'

export class FeedbackModel {
    private defaultPagination

    constructor(private readonly url: IFeedbackApiClientUrls) {
        this.defaultPagination = {
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

    async show({ type, limit, offset } = this.defaultPagination) {
        const hasType = () => (type ? type : '')

        const query = { hasType, limit, offset }

        const params = {
            url: this.url.create,
            payload: {
                params: {
                    query,
                },
            },
        }
        return httpClient.post(params.url, params.payload)
    }
}
