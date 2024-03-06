import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { UserRole } from "./employee.dto";

@Schema({ timestamps: true })

export class employee {
  @Prop({ unique: true })
  username: string;

  @Prop()
  password: string;

  @Prop({})
  jobrole: string;

  @Prop({})
  experience: string;

  @Prop(UserRole)
  role:UserRole;
}
export const employeeSchema=SchemaFactory.createForClass(employee);