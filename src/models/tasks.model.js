var mongoose = require("mongoose");
const { EStatus } = require("../helpers/enum.helper");
var Schema = mongoose.Schema;
taskSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: "This is description...",
    },
    status: {
        type: String,
        default: EStatus.INACTIVE,
    }
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

module.exports = mongoose.model("Tasks", taskSchema);