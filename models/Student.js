const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Student Schema 
const StudentSchema = new mongoose.Schema({
    // ----- BIOLOGICAL DETAILS ----- //
biological_details : {
    name: {
        type: String,
        required: false,
      },
      gender: {
        type: String,
        required: false,
      },
      surname: {
        type: String,
        required: false,
      },
      dob: {
        type: Date,
        required: false,
      },
},
  
      // ----- CONTACT DETAILS ----- //
    contact_details : {
        physical_address : {
            street : {
                type : String,
                default : false
            },
            village : {
                type : String,
                default : false
            }
        },
        postal_address : {
          po_box : {
              type : String,
              default : false
          },
          village : {
              type : String,
              default : false
          }
        },
    },
 

    // ----- PARENT / NEXT OF KIN ----- //
    parent_details : {
        name : {
            type : String,
            default : false
        },
        relationship : {
            type : String,
            default : false
        },
        surname : {
            type : String,
            default : false
        },
        dob : {
            type : Date,
            default : false
        },

        // ----- CONTACT DETAILS ----- //
        physical_address : {
            street : {
                type : String,
                default : false
            },
            village : {
                type : String,
                default : false
            }
        },
        postal_address : {
          po_box : {
              type : String,
              default : false
          },
          village : {
              type : String,
              default : false
          }
        
        },
    },

        // ----- Phone Details ----- //
    phone_details : {
        telephone_home : {
            type : String,
            default : false
        },
        telephone_work : {
            type : String,
            default : false
        },
        mobile : {
            type : String,
            default : false
        },
        email : {
            type : String,
            default : false
        }
    },

        // ----- ACADEMIC ENROLLMENT ----- //
        academic_enrollment : {
            class : {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Class",
                required: false,
            },
            class_teacher : {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Teacher",
                required: false,
            },
            student_number : {
                type : String,
                default : false
            },
            no_of_subjects : {
                type : Number,
                default : false
            }
        },


  notifications: [
    {
      title: String,
      description: String,
    },
  ],
  
  isDeleted: {
    type: Boolean,
    default: false,
  },

  createdAt: {
    type: Date,
    default: Date.now(),
  },

  resetPasswordToken: String,
  restPasswordExpires: Date,

});

//Encrypt Password
UserSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

//sign JWT and return
UserSchema.methods.getSignedJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

//Check user entered password
UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};
module.exports = mongoose.model("Student", StudentSchema);
