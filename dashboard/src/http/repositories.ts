import { UserRepository, FeedbackRepository } from '@/models';

const userApiClient = new UserRepository();
const feedbackApiClient = new FeedbackRepository();

const repositories = {
    user: userApiClient,
    feedback: feedbackApiClient,
};

export default repositories;
