import HttpService from "./HttpService";

export default class TimelineService extends HttpService {
    getTimeline(url, login) {
        return this.get(url);
    }
}