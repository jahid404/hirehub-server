import bcrypt from "bcryptjs";
import prisma from "../../shared/prisma";
import config from "../../config";
import { excludeFields } from "../../utils/excludeFields";

const getAllUsersFromDB = async () => {
    const result = await prisma.user.findMany({
        select: {
            id: true,
            email: true,
            createdAt: true,
            updatedAt: true,
        },
    });

    return result;
};

const getSingleUserFromDB = async (id: string) => {
    const result = await prisma.user.findUniqueOrThrow({
        where: { id },
        select: {
            id: true,
            email: true,
            createdAt: true,
            updatedAt: true,
        },
    });
    return result;
};

export const UserService = {
    getAllUsersFromDB,
    getSingleUserFromDB,
};
