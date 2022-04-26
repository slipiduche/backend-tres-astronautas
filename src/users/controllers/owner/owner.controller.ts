import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/auth/decorators/role.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Role } from 'src/auth/models/roles.model';
import { PayloadToken } from 'src/auth/models/token.model';
import { ProductsService } from 'src/products/services/products.service';

import { Request } from 'express';
import { OwnerService } from '../../services/owner/owner.service';

@UseGuards(JwtAuthGuard)
@ApiTags('profile')
@Controller('owner')
export class OwnerController {
  constructor(private ownerService: OwnerService) {}
  @Get('my-products')
  getMyProducts(@Req() req: Request) {
    const user = req.user as PayloadToken;
    return this.ownerService.findAllByUser(user.sub);
  }
}
