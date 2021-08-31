import  mongoose  from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "plase add your name"],
    trim: true,
    maxLEngth: [20, "Your name is up to 20 chars long."]
    },
    account: {
      type: String,
      required: [true, "Plase add your email or phone"],
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Plase add your password"],
      trim: true
    },
    avatar: {
      type: String,
      default: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYtfZRhbGQtq2BapB2MXJfWIO2QriO5Wx3qQ&usqp=CAU'
    },
    role: {
      type: String,
      default: 'user'
    },
    type: {
      type: String,
      default: 'normal'
    }
  },
    {
      timestamps: true
    }
  )

  export  default mongoose.model('User', userSchema)