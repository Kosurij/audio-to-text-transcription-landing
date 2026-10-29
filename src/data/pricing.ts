export interface Plan {
  name: string;
  description: string;
  monthlyPrice: number;
  annualPrice?: number;
  minutes: string;
  minutesPeriod: string;
  cta: string;
  benefitHeading: string;
  benefits: string[];
  popular?: boolean;
  guarantee?: boolean;
}

const paidBenefits = [
  'Priority processing',
  'Priority support',
];

const discountedAccuracyBenefit = 'High Accuracy uses 33% fewer minutes';

export const plans: Plan[] = [
  {
    name: 'Free',
    description: 'Everything you need to start transcribing',
    monthlyPrice: 0,
    minutes: '200',
    minutesPeriod: 'week',
    cta: 'Get started',
    benefitHeading: 'What you can do:',
    benefits: [
      'Balanced and High Accuracy modes',
      'Record browser tabs or your microphone',
      'Upload 14 audio and video formats up to 500 MB',
      'Transcribe in 90+ languages',
      'Create AI-powered summaries',
      'Edit, export and revisit transcripts',
    ],
  },
  {
    name: 'Basic',
    description: 'For regular transcription',
    monthlyPrice: 6.99,
    annualPrice: 74.99,
    minutes: '2,400',
    minutesPeriod: '30 days',
    cta: 'Get started',
    benefitHeading: 'Everything in Free, plus:',
    benefits: ['3× the minutes', ...paidBenefits],
    guarantee: true,
  },
  {
    name: 'Pro',
    description: 'For frequent and longer recordings',
    monthlyPrice: 12.99,
    annualPrice: 119.99,
    minutes: '7,200',
    minutesPeriod: '30 days',
    cta: 'Get started',
    benefitHeading: 'Everything in Free, plus:',
    benefits: ['9× the minutes', discountedAccuracyBenefit, ...paidBenefits],
    popular: true,
    guarantee: true,
  },
  {
    name: 'Max',
    description: 'For high-volume transcription workflows',
    monthlyPrice: 19.99,
    annualPrice: 189.99,
    minutes: '14,000',
    minutesPeriod: '30 days',
    cta: 'Get started',
    benefitHeading: 'Everything in Free, plus:',
    benefits: ['17.5× the minutes', discountedAccuracyBenefit, ...paidBenefits],
    guarantee: true,
  },
];

// Card amounts and structured offers share one catalog so billing information stays aligned.
export const planOffers = plans.flatMap(plan => plan.annualPrice === undefined ? [{
  '@type': 'Offer', name: plan.name, price: '0', priceCurrency: 'USD',
  availability: 'https://schema.org/InStock',
}] : (['month', 'year'] as const).map(interval => {
  const price = (interval === 'year' ? plan.annualPrice! : plan.monthlyPrice).toFixed(2);
  return {
    '@type': 'Offer', name: `${plan.name} — ${interval === 'year' ? 'yearly' : 'monthly'}`,
    price, priceCurrency: 'USD', availability: 'https://schema.org/InStock',
    priceSpecification: {
      '@type': 'UnitPriceSpecification', price, priceCurrency: 'USD',
      billingDuration: interval === 'year' ? 'P1Y' : 'P1M',
    },
  };
}));
