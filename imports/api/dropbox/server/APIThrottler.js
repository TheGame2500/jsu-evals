import { ThrottledRequester } from 'meteor/srtucker22:throttled-requester';

export const APIThrottler = new ThrottledRequester(7, 1000);
