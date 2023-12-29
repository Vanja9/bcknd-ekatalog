import { SetMetadata } from "@nestjs/common"

export const AllowToRoles = (...roles: ("0" | "1")[]) => {
   return SetMetadata('allow_to_roles', roles)
}