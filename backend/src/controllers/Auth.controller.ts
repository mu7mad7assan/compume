import express, { NextFunction, Request, Response } from 'express';
import User from '../types/User.type';
import bcrypt from 'bcrypt';
import UserModel from '../models/User.models';
import jwt, { decode, JsonWebTokenError, JwtPayload } from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();



export const register = async (req: Request, res:Response): Promise<void> => {
  if (!req.body.firstName || !req.body.lastName || !req.body.userName || !req.body.email || !req.body.password) {
    res.status(400).json({ message: 'All fields is required' });
  }
  try {
    const user = await UserModel.findOne({email: req.body.email});
    if (user){
      res.json({message: 'this account is already taken'})
    }else {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hashSync(req.body.password, salt);
      const newUser = new UserModel({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        userName: req.body.userName,
        email: req.body.email,
        password: hashedPassword,
      });
      await newUser.save();
      res.status(201).json({
        message: 'New User created',
        data: newUser,
      });
    }
  } catch (error) {
    console.log(error);
  }
};


export const login = async(req: Request, res: Response) => {
  if (!req.body.email || !req.body.password) {
    res.status(400).json({message: 'All Fields required'});
  }
  try {
    const userRetrieved = await UserModel.findOne({email: req.body.email}).select('_id firstName lastName userName email password isAdmin');
    if (! userRetrieved) {
      res.status(400).json({message: 'No User Retrieved'});
    }
    const isPasswordCorrect: boolean = await bcrypt.compareSync(req.body.password, userRetrieved?.password as string);
    if (!isPasswordCorrect) {
      res.status(400).json({message: 'Password is not correct'});
    }
    const payload = {
      id: userRetrieved?._id.toString() as string,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET as string,
      {expiresIn: '1d'});
    return res.cookie('access_token', token, {
      httpOnly: true,
    })
      .status(200)
      .json({
      message: 'Login Success',
      data: {...userRetrieved, token},
    });
  }catch(error) {
    console.log(error);
  }
}


export const logout = async (req: Request, res: Response) => {
  res.clearCookie('access_token');
  return res.status(200).json({message: 'logOut Success'});
}


export const isLoggedIn = async (req: Request, res: Response) => {
  const token = req.cookies.access_token;
  if (! token) {
    return res.json(false);
  }
  return jwt.verify(token, process.env.JWT_SECRET as string, (error: any) => {
    if (error) {
      return res.json(false);
    }
    return res.json(true);
  })
}


export const isAuth = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.slice(7, authHeader.length);
    jwt.verify(token as string, process.env.JWT_SECRET as string, (error, decode) => {
      if (error) {
        res.status(401).send({ message: 'Invalid Token', error: error });
      } else {
        next();
      }
    })
  } else {
    res.send({message: 'No Token'});
  }

}