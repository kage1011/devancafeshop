import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ProductModule } from './product/product.module';
import { OrderGateway } from './order/order.gateway';

@Module({
  imports: [AuthModule, ProductModule],
  controllers: [AppController],
  providers: [AppService, OrderGateway],
})
export class AppModule {}
