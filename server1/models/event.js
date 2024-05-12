import mongoose from "mongoose";

//defind Schema
const eventSchema = new mongoose.Schema({
    // _id:Number,
    eventName:{type:String,required:true,trim:true},
    eventDescription:{type:String,required:true},
    attendeeCount:{type:Number,required:true,min:1,max:1000},
    Categories:{type:String,required:true},
    eventType:{type:Array,required:true},
    venueType:{type:String,required:true},
    eventDetailsData:{
        eventDetailEventName:{type:String,required:true},
        eventDetailEventLocation:{type:String,required:true},
        eventDetailDate:{type: Date, trim: true,required:true},
    }
})

const eventModel=mongoose.model("event",eventSchema)

// const eventModel = function (eventModel1, doc, next) {
//     counterModel.findByIdAndUpdate(        
//       eventModel1,                          
//       { $inc: { seq: 1 } },                
//       { new: true, upsert: true },         
//       function(error, counter) {          
//         if(error) return next(error);
  
//         doc.id = counter.seq;
//         next();
//       }
//     );                                   
//   }

export default eventModel;