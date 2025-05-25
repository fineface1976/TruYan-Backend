import { Controller, Post, Body } from '@nestjs/common';
import * as Flutterwave from 'flutterwave-node-v3';

@Controller('flutterwave')
export class FlutterwaveController {
  private flw = new Flutterwave(process.env.FLW_PUBLIC_KEY, process.env.FLW_SECRET_KEY);

  @Post('withdraw')
  async withdraw(@Body() data: { amount: number; account: string }) {
    try {
      const response = await this.flw.Transfer.initiate({
        account_bank: '044', // Example bank code
        account_number: data.account,
        amount: data.amount,
        currency: 'NGN',
      });
      return { success: true, data: response };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
}
