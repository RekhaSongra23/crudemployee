import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { employee } from "./employee.schema";
import mongoose from "mongoose";
import { employeeDto } from "./employee.dto";

@Injectable()
export class employeeservice{
    constructor(@InjectModel (employee.name) private readonly employeemodel:mongoose.Model<employee>){}
    

    async findEmployee():Promise<employee[]>{
        const empfind=await this.employeemodel.find();
        return empfind;

    }
    async findEmployeeById(id:mongoose.Types.ObjectId):Promise<employee>{
        const empfindid=await this.employeemodel.findById(id);
        return empfindid;
    }
    async updateEmployee(id:mongoose.Types.ObjectId,employeeDto:employeeDto):Promise<employee>{
        const empupdate=await this.employeemodel.findByIdAndUpdate(id,employeeDto);
        return empupdate;
    }

    async deleteEmployee(id:mongoose.Types.ObjectId):Promise<employee>{
        const empdelete=await this.employeemodel.findByIdAndDelete(id);
        return empdelete;
    }
}