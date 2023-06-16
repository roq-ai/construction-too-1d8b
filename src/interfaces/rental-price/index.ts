import { ToolInterface } from 'interfaces/tool';
import { GetQueryInterface } from 'interfaces';

export interface RentalPriceInterface {
  id?: string;
  price: number;
  tool_id: string;
  created_at?: any;
  updated_at?: any;

  tool?: ToolInterface;
  _count?: {};
}

export interface RentalPriceGetQueryInterface extends GetQueryInterface {
  id?: string;
  tool_id?: string;
}
