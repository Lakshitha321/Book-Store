import mongoose from "mongoose";
//create mongoose schema

const schema = mongoose.Schema;

//define book schema
export const BookSchema = new schema({
  title:{
    type: String,
    required: true,
  },
  author:{
    type: String,
    required: true,
  },
  genre:{
    type: String,

  },
  publishedYear:{
    type: Number,
    
  },
  isAvailable:{
    type: Boolean,
    default: true,
  },
  ratings:{
    type: [Number],
    default: [],
  },
  createdAt:{
    type: Date,
    default: Date.now,
  }
});

const Book = mongoose.model("Book", BookSchema);
export default Book;