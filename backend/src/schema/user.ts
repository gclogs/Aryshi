import { createSchema, Type, typedModel } from 'ts-mongoose';

const UserSchema = createSchema({
  name: Type.string({ required: true }),
  email: Type.string({ required: true, unique: true }),
  nickname: Type.string(),
  service_number: Type.number({ required: true}),
  password: Type.string({ required: true }),
  salt: Type.string({ required: true })
})

const User = typedModel('User', UserSchema);

export default User;