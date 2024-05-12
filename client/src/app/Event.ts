export class Event {
    public _id?:String;
    public eventName : String;
    public eventDescription: String;
    public attendeeCount:any;
    public Categories:String;
    public eventType:Array<any>;
    public venueType:String;
    public eventDetailsData:any;
    public eventDetailEventName:String;
    public eventDetailEventLocation:String;
    public eventDetailDate:Date
    constructor(){
        this.eventName='',
        this.eventDescription='',
        // this.attendeeCount=0,
        this.Categories='',
        this.eventType=[],
        this.venueType='',
        this.eventDetailsData={}
        this.eventDetailEventName='',
        this.eventDetailEventLocation='',
        this.eventDetailDate=new Date
    }
}
