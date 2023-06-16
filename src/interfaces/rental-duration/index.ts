import { ToolInterface } from 'interfaces/tool';
import { GetQueryInterface } from 'interfaces';

export interface RentalDurationInterface {
  id?: string;
  duration: number;
  tool_id: string;
  created_at?: any;
  updated_at?: any;

  tool?: ToolInterface;
  _count?: {};
}

export interface RentalDurationGetQueryInterface extends GetQueryInterface {
  id?: string;
  tool_id?: string;
}
