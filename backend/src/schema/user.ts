import { createSchema, Type, typedModel } from 'ts-mongoose';

const UserSchema = createSchema({
  email: Type.string({ required: true, unique: true }),
  password: Type.string({ required: true }),
  salt: Type.string({required: true}),
  name: Type.string({ required: true }),
  createdAt: Type.date({ required: true}),
  birth: Type.date()
})

const User = typedModel('User', UserSchema);

export default User;