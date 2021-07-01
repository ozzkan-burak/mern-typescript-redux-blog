import {Request, Response} from 'express';
import Users from "../models/userModel.ts";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";

const authCtrl = {
  register: async(req: Request, res: Response) => {
    try{
      const {name, account, password} =req.body

      const user = await Users.findOne({account})
      if(!user) return res.status(400).json({msg: 'Email or Phone number already exist.'});

      const passwordHash = await bcrypt.hash(password, 12);

      const newUser = new Users({
        name, account, password: passwordHash
      })

      res.json({msg: 'Register successfully.', data: newUser});

    } catch (err: string) {
      return res.status(500).json({msg: err.message))
    }
  }
}