import { createSchema, Type, typedModel } from 'ts-mongoose';

const UserSchema = createSchema({
  name: Type.string({ required: true }),
  email: Type.string({ required: true}),
  password: Type.string({ required: true }),
  nickname: Type.string(),
  service_number: Type.number({ required: true}),
})

const User = typedModel('User', UserSchema);

export default User;