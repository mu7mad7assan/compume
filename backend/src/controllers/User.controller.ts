import {Request, Response} from 'express';
import User from '../models/User.models';
import bcrypt from 'bcrypt';


export const userUpdate = async (req: Request, res: Response) => {
  if (!req.body.userName || !req.body.email || !req.body.password) {
    res.status(400).json({ message: 'All fields is required' });
  }
  try {
    const user = await User.findById(req.params.id);
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hashSync(req.body.password, salt);
    if(user) {
      user.userName = req.body.userName;
      user.email = req.body.email;
      user.password = hashedPassword;
      const updatedUser =await user.save();
      res.status(200).send({message: 'User Updated Successfully', user: updatedUser});
    } else {
      res.status(404).send({message: 'User Not found'});
    }
  } catch (error) {
      console.log(error)
  }
}