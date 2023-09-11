import { NextFunction, Request, Response } from "express"
import prisma from "../libs/prisma.js"

interface RequestBody {
    name: string
}
//@desc api to create user
//@route /api/
export const createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name }: RequestBody = req.body
        const stringFormat = /^[^0-9]*$/
        if (!name.trim()) {
            res.status(422)
            throw new Error("name is required");
        } else if (!stringFormat.test(name)) {
            res.status(403)
            throw new Error("name should have a data type of string. It should not contain an Integer,boolean or other data types");
        }
        const existingUser = await prisma.user.findUnique({
            where: {
                name: name
            }
        })
        if (existingUser) {
            res.status(403)
            throw new Error("user name already exist");

        }
        const newUser = await prisma.user.create({
            data: {
                name: name
            }
        })
        return res.status(201).json(newUser)

    } catch (error) {
        console.log(error);
        next(error)

    } finally {
        prisma.$disconnect
    }
}
//@desc api to fetch details of a particular user
//@route /api/user_id
export const get_AUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params
        const userDetails = await prisma.user.findFirst({
            where: {
                OR: [
                    {
                        id: id
                    }, {
                        name: id
                    }
                ]
            }
        })
        if (!userDetails) {
            res.status(404)
            throw new Error("user not found");
        }
        return res.status(200).json(userDetails)
    } catch (error) {
        console.log(error);
        next(error)
    } finally {
        prisma.$disconnect
    }
}
//@desc api to update a particular user details
//@route /api/user_id
export const update_AUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        /* ---defining varaibles gotten from the url parameters and the request body */
        const { name }: RequestBody = req.body
        /* reqex pattern to validate the request body format */
        const stringFormat = /^[^0-9]*$/
        /* ---id params--- */
        //const {username}=req.query
        const { id } = req.params
        if (!name.trim() ) {
            res.status(422)
            throw new Error("name is required");
        } else if (!stringFormat.test(name)) {
            res.status(403)
            throw new Error("name should have a data type of string. It should not contain an Integer,boolean or other data types");
        }
        /* ---checking if the user is a vaild user in our database ie if the user id or name exists */
        const is_A_Valid_User = await prisma.user.findFirst({
            where: {
                OR: [
                    { id: id }, { name: id }
                ]
            }
        })
        /* if no valid user return a 404 error */
        if (!is_A_Valid_User) {
            res.status(404)
            throw new Error("user does not exist");
        }
        /* if the new name the user wants to use already exist,we return a 403 error since user names should be unique */
        const existingUserNameAlready = await prisma.user.findUnique({
            where: {
                name: name
            }
        })
        if (existingUserNameAlready) {
            res.status(403)
            throw new Error("user name already exist. Ensure you choose a unique user name");

        }
        /* if the new user name is unique, the old name should be updated to the new one */
        const updatedUser = await prisma.user.update({
            where: {
                id
            },
            data: {
                name: name
            }
        })
        return res.status(201).json(`updated successfully`)
    } catch (error) {
        console.log(error);
        next(error)

    } finally {
        prisma.$disconnect
    }
}
//@desc api to delete a particular user record
//@route /api/user_id
export const delete_AUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params
        const existingUser = await prisma.user.findFirst({
            where: {
                OR: [
                    {
                        id: id
                    }, {
                        name: id
                    }
                ]
            }
        })

        if (!existingUser) {
            res.status(404)
            throw new Error("user does not exist");
        }
        const deletedUser = await prisma.user.delete({
            where: {
                id: id
            }
        })
        return res.status(204).json(`deleted successfully`)
    } catch (error) {
        console.log(error);
        next(error)
    } finally {
        prisma.$disconnect
    }
}