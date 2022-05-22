import { model, Schema } from "mongoose";
import { IContactInvite } from "../interfaces/contact-invite";

const contactInviteSchema = new Schema<IContactInvite>({
  contato: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  ong: {
    type: Schema.Types.ObjectId,
    ref: "Ong",
  },
  data: { type: Date, required: true },
  accepted: { type: Boolean, default: false },
});

const ContactInvite = model<IContactInvite>(
  "ContactInvite",
  contactInviteSchema
);

export default ContactInvite;
