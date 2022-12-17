import { createSchema, Type, typedModel } from 'ts-mongoose';

const RoomsSchema = createSchema({
  code: Type.string({ required: true }),
  admin: Type.string({ required: true }),
  title: Type.string(),
  description: Type.string(),
  key: Type.string({ required: true }),
  is_hidden: Type.boolean(),
  created_at: Type.date({ required: true })
})

const Rooms = typedModel('Rooms', RoomsSchema);

export default Rooms;