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

    async show() {
        //const hasType = () => (type ? type : '')

        //const query = { type, limit, offset }

        const params = {
            url: this.url.show,
            payload: {
                headers: {
                    Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImVhYjc1OWY4LWYyMzgtNGZmOS1hZTkxLWVlMTU1ODk4MjMyOSIsImVtYWlsIjoiaWdvckBpZ29yLm1lIiwibmFtZSI6Iklnb3IgSGFsZmVsZCIsImlhdCI6MTYxMDc0MzgyNn0.2R-hm8yCSAtpcvniI1R9CNF_ZzguRaMZoU2pTrwijds`,
                },
                params: {
                    type: 'idea',
                    limit: 5,
                    offset: 0,
                },
            },
        }
        console.log(
            this.url.show,
            params.payload.params.limit,
            params.payload.params.type,
            params.payload.params.offset
        )
        return httpClient
            .post(params.url, params.payload)
            .then((response) => {
                console.log(response)
                return response.data
            })
            .catch((e) => console.error(e))
    }
}
