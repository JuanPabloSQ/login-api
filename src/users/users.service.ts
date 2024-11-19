import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(userData: {
    username: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    birthDate: Date;
  }): Promise<User> {
    const newUser = new this.userModel(userData);
    return newUser.save();
  }

  async findByUsername(username: string): Promise<User> {
    return this.userModel.findOne({ username });
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find();
  }

  async update(username: string, updateData: Partial<User>): Promise<User> {
    return this.userModel.findOneAndUpdate(
      { username }, 
      { $set: updateData }, 
      { new: true }, 
    );
  }
}

