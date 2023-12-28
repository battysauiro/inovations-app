export class Plan {
  id: string;
  livemode: boolean;
  created_at: number;
  name: string;
  amount: number;
  currency: string;
  interval: string;
  frequency: number;
  expiry_count: number;
  trial_period_days: number | null;
  object: string;
}
