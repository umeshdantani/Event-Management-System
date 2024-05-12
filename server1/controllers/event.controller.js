import eventModel from '../models/event.js'

const displayEvent = async (req, res) => {
    try {
        const result = await eventModel.find()
        res.status(200).json({ msg: result });
    } catch (error) {
        res.status(500).json({ errmsg: error });
    }
}

const addEvent = async (req, res) => {
    // console.log('filename: ',req.file.filename);
    try {
        const { eventName, eventDescription, attendeeCount, Categories, eventType, venueType, eventDetailsData } = req.body;
        const newEvent = new eventModel({
            eventName: eventName,
            eventDescription: eventDescription,
            attendeeCount: attendeeCount,
            Categories: Categories,
            eventType: eventType,
            venueType: venueType,
            eventDetailsData: {
                eventDetailEventName: eventDetailsData.eventDetailEventName,
                eventDetailEventLocation: eventDetailsData.eventDetailEventLocation,
                eventDetailDate: eventDetailsData.eventDetailDate
            },
            // fileType: req.file.filename
        });
        // newEvent._id=1;
        await newEvent.save()
        res.status(200).json({ msg: newEvent });
    }
    catch (error) {
        console.log(error);
    }
}

const updateEvent = async (req, res) => {
    try {
        const updateEvent = await eventModel.findByIdAndUpdate({ _id: req.params.id }, req.body, { new: true });
        res.status(200).json({ msg: updateEvent });
    } catch (error) {
        res.status(500).json({ errmsg: error });
    }
}

const deleteEvent = async (req, res) => {
    try {
        const result = await eventModel.findByIdAndDelete({ _id: req.params.id })
        res.status(200).json({ msg: result });
    }
    catch (error) {
        res.status(500).json({ errmsg: error });
    }
}

export { displayEvent, addEvent, updateEvent, deleteEvent }